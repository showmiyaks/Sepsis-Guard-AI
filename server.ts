import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database('sepsis_guard.db');
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// Initialize Database
db.exec(`
  DROP TABLE IF EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('doctor', 'patient', 'admin')) NOT NULL,
    phone TEXT,
    hospital_name TEXT,
    registration_number TEXT,
    specialization TEXT,
    age INTEGER,
    gender TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Demo Credentials
async function seedDatabase() {
  const adminUsername = 'admin';
  const doctorUsername = 'doctor';
  const patientUsername = 'patient';
  
  const existingAdmin = db.prepare('SELECT * FROM users WHERE username = ?').get(adminUsername);
  if (!existingAdmin) {
    const hash = await bcrypt.hash('admin123', 10);
    db.prepare(`
      INSERT INTO users (full_name, email, username, password_hash, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('System Admin', 'admin@sepsisguard.com', adminUsername, hash, 'admin');
  }

  const existingDoctor = db.prepare('SELECT * FROM users WHERE username = ?').get(doctorUsername);
  if (!existingDoctor) {
    const hash = await bcrypt.hash('doctor123', 10);
    db.prepare(`
      INSERT INTO users (full_name, email, username, password_hash, role, specialization, hospital_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('Dr. Demo', 'doctor@sepsisguard.com', doctorUsername, hash, 'doctor', 'Sepsis Specialist', 'SepsisGuard General Hospital');
  }

  const existingPatient = db.prepare('SELECT * FROM users WHERE username = ?').get(patientUsername);
  if (!existingPatient) {
    const hash = await bcrypt.hash('patient123', 10);
    db.prepare(`
      INSERT INTO users (full_name, email, username, password_hash, role, age, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('John Demo', 'patient@sepsisguard.com', patientUsername, hash, 'patient', 45, 'Male');
  }
}
seedDatabase();

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // --- Auth Middleware ---
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // --- API Routes ---

  app.post('/api/signup', async (req, res) => {
    const { 
      name, email, password, role, phone, 
      age, gender, emergency_contact, 
      hospital_name, registration_number, specialization 
    } = req.body;
    
    try {
      const hash = await bcrypt.hash(password, 10);
      const stmt = db.prepare(`
        INSERT INTO users (
          full_name, email, password_hash, role, phone, 
          age, gender, emergency_contact, 
          hospital_name, registration_number, specialization
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        name, email, hash, role, phone || null, 
        age || null, gender || null, emergency_contact || null, 
        hospital_name || null, registration_number || null, specialization || null
      );
      res.json({ success: true, userId: result.lastInsertRowid });
    } catch (err: any) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Allow login with either email or username
    const user: any = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(email, email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, name: user.full_name }, JWT_SECRET, { expiresIn: '24h' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    });

    const { password_hash, ...userWithoutPass } = user;
    res.json({ success: true, user: { ...userWithoutPass, name: user.full_name } });
  });

  app.post('/api/logout', (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.json({ success: true });
  });

  app.get('/api/profile', authenticate, (req: any, res) => {
    const user: any = db.prepare('SELECT id, full_name as name, email, role, phone, hospital_name, registration_number, specialization, age, gender, emergency_contact FROM users WHERE id = ?').get(req.user.id);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });

  app.put('/api/profile', authenticate, (req: any, res) => {
    const { name, phone, specialization, age, gender, hospital_name, registration_number, emergency_contact } = req.body;
    
    const stmt = db.prepare(`
      UPDATE users 
      SET full_name = ?, phone = ?, specialization = ?, age = ?, gender = ?, hospital_name = ?, registration_number = ?, emergency_contact = ?
      WHERE id = ?
    `);
    stmt.run(
      name, phone, specialization || null, age || null, gender || null, 
      hospital_name || null, registration_number || null, emergency_contact || null, 
      req.user.id
    );
    res.json({ success: true });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
