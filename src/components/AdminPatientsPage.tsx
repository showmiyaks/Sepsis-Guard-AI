import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, User, Calendar, Activity, AlertCircle, X, Trash2, Edit, Eye, CheckCircle, XCircle, History, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_PATIENTS = [
  { id: 1, name: 'John Doe', age: 45, gender: 'Male', doctor: 'Dr. Sarah Smith', status: 'Active', risk: 'High', lastCheck: '10 mins ago' },
  { id: 2, name: 'Jane Roe', age: 32, gender: 'Female', doctor: 'Dr. James Wilson', status: 'Active', risk: 'Low', lastCheck: '25 mins ago' },
  { id: 3, name: 'Bob Brown', age: 58, gender: 'Male', doctor: 'Dr. Sarah Smith', status: 'Inactive', risk: 'Medium', lastCheck: '1 hour ago' },
  { id: 4, name: 'Alice Green', age: 29, gender: 'Female', doctor: 'Dr. Emily Brown', status: 'Active', risk: 'Low', lastCheck: '2 hours ago' },
];

export const AdminPatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterRisk, setFilterRisk] = useState('All');
  
  // State for actions
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === 'All' || patient.risk === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (action: string, patient: any) => {
    setActiveMenuId(null);
    setSelectedPatient(patient);
    
    switch(action) {
      case 'view':
        setIsViewModalOpen(true);
        break;
      case 'history':
        setIsHistoryModalOpen(true);
        break;
      case 'edit':
        setIsEditModalOpen(true);
        break;
      case 'toggleStatus':
        setPatients(patients.map(p => {
          if (p.id === patient.id) {
            return { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' };
          }
          return p;
        }));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
          setPatients(patients.filter(p => p.id !== patient.id));
        }
        break;
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Patients</h1>
          <p className="text-slate-500">View and manage patient records</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 z-10 relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search patients by name, ID, or doctor..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors ${isFilterOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            <Filter size={18} />
            Filters
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-20"
              >
                <p className="text-xs font-bold text-slate-400 uppercase px-3 py-2">Risk Level</p>
                {['All', 'High', 'Medium', 'Low'].map(risk => (
                  <button
                    key={risk}
                    onClick={() => { setFilterRisk(risk); setIsFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterRisk === risk ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {risk}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden" onClick={() => setActiveMenuId(null)}>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Age / Gender</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Doctor</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Check</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <motion.tr 
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{patient.name}</p>
                        <p className="text-xs text-slate-500">ID: #{1000 + patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                    {patient.doctor}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      patient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      patient.risk === 'High' ? 'bg-rose-50 text-rose-600' :
                      patient.risk === 'Medium' ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        patient.risk === 'High' ? 'bg-rose-500' :
                        patient.risk === 'Medium' ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`} />
                      {patient.risk}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">
                    {patient.lastCheck}
                  </td>
                  <td className="py-4 px-6 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === patient.id ? null : patient.id); }}
                      className={`p-2 rounded-lg transition-colors ${activeMenuId === patient.id ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                      <MoreVertical size={18} />
                    </button>

                    <AnimatePresence>
                      {activeMenuId === patient.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1 z-20 origin-top-right text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button 
                            onClick={() => handleAction('view', patient)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Eye size={16} /> View Details
                          </button>
                          <button 
                            onClick={() => handleAction('history', patient)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <History size={16} /> View History
                          </button>
                          <button 
                            onClick={() => handleAction('edit', patient)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Edit size={16} /> Edit Patient
                          </button>
                          <div className="h-px bg-slate-100 my-1" />
                          <button 
                            onClick={() => handleAction('toggleStatus', patient)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${patient.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                          >
                            {patient.status === 'Active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            {patient.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => handleAction('delete', patient)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Patient Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedPatient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsViewModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Patient Details</h2>
                  <p className="text-sm text-slate-500">View patient information</p>
                </div>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h3>
                    <p className="text-slate-500">ID: #{1000 + selectedPatient.id}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        selectedPatient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {selectedPatient.status}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        selectedPatient.risk === 'High' ? 'bg-rose-50 text-rose-600' :
                        selectedPatient.risk === 'Medium' ? 'bg-amber-50 text-amber-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {selectedPatient.risk} Risk
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <User className="text-slate-400" size={20} />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Demographics</p>
                      <p className="text-sm font-bold text-slate-900">{selectedPatient.age} Years / {selectedPatient.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Stethoscope className="text-slate-400" size={20} />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Assigned Doctor</p>
                      <p className="text-sm font-bold text-slate-900">{selectedPatient.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Activity className="text-slate-400" size={20} />
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Last Check</p>
                      <p className="text-sm font-bold text-slate-900">{selectedPatient.lastCheck}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && selectedPatient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsHistoryModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Patient History</h2>
                  <p className="text-sm text-slate-500">Recent alerts and check-ins</p>
                </div>
                <button 
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Routine Check-up</p>
                        <p className="text-xs text-slate-500 mt-1">Vitals recorded. No anomalies detected.</p>
                        <p className="text-xs font-bold text-slate-400 mt-2">{i} day{i > 1 ? 's' : ''} ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Patient Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedPatient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit Patient</h2>
                  <p className="text-sm text-slate-500">Update patient details</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" defaultValue={selectedPatient.name} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Age</label>
                    <input type="number" defaultValue={selectedPatient.age} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Gender</label>
                    <select defaultValue={selectedPatient.gender} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Assigned Doctor</label>
                    <select defaultValue={selectedPatient.doctor} className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600">
                      <option>Dr. Sarah Smith (Intensivist)</option>
                      <option>Dr. James Wilson (Cardiologist)</option>
                      <option>Dr. Emily Brown (Infectious Disease)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Add New Patient</h2>
                  <p className="text-sm text-slate-500">Enter patient's personal and medical details</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                    <input type="date" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Gender</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Contact Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Address</label>
                    <input type="text" placeholder="123 Main St, City, State" className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Assigned Doctor</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-600">
                      <option>Dr. Sarah Smith (Intensivist)</option>
                      <option>Dr. James Wilson (Cardiologist)</option>
                      <option>Dr. Emily Brown (Infectious Disease)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Register Patient
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
