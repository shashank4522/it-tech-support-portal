import React, { useState } from 'react';
import { X, Plus, AlertTriangle, Clock } from 'lucide-react';

export default function NewTicketModal({ isOpen, onClose, onAddTicket, defaultP1 = false }) {
  const [title, setTitle] = useState(defaultP1 ? 'P1 CRITICAL: System-Wide Outage / Network Link Down' : '');
  const [description, setDescription] = useState(defaultP1 ? 'Emergency incident reported. Major service degradation affecting core connectivity.' : '');
  const [priority, setPriority] = useState(defaultP1 ? 'P1' : 'P3');
  const [category, setCategory] = useState(defaultP1 ? 'Network & VPN' : 'Software & SaaS');
  const [reporterName, setReporterName] = useState('Alex Turner');
  const [reporterEmail, setReporterEmail] = useState('alex.turner@corp.local');
  const [department, setDepartment] = useState('Engineering');
  const [ip, setIp] = useState('10.0.3.88');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    let slaMinutes = 1440; // default P3
    if (priority === 'P1') slaMinutes = 60;
    else if (priority === 'P2') slaMinutes = 240;
    else if (priority === 'P4') slaMinutes = 2880;

    const newTicket = {
      id: `INC-${Math.floor(8900 + Math.random() * 1000)}`,
      title,
      description,
      priority,
      category,
      status: 'Open',
      assignee: 'Unassigned',
      createdAt: new Date().toISOString(),
      slaMinutes,
      reporter: {
        name: reporterName,
        email: reporterEmail,
        department,
        ip,
        hostname: `WORKSTATION-${Math.floor(100 + Math.random() * 900)}`
      },
      diagnosticSteps: ['Ticket created via Operations Desk portal', 'Awaiting assignment to L1/L2 Support Specialist'],
      timeline: [
        { time: 'Just now', author: 'System', text: `Ticket created. Priority set to ${priority}. SLA Target: ${slaMinutes / 60} hours.` }
      ]
    };

    onAddTicket(newTicket);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {priority === 'P1' ? <AlertTriangle className="text-rose-500" size={20} /> : <Plus size={20} />}
            Log New Technical Support Incident
          </h2>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Incident Priority & SLA Target</label>
              <select className="form-control" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="P1">P1 - Critical (1 Hour SLA Target)</option>
                <option value="P2">P2 - High (4 Hours SLA Target)</option>
                <option value="P3">P3 - Medium (24 Hours SLA Target)</option>
                <option value="P4">P4 - Low (48 Hours SLA Target)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Network & VPN">Network & VPN</option>
                <option value="Active Directory & IAM">Active Directory & IAM</option>
                <option value="Hardware & Printer">Hardware & Printer</option>
                <option value="Software & SaaS">Software & SaaS</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Incident Title / Summary</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Cannot reach internal Git server on port 443"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Issue Description</label>
            <textarea 
              className="form-control" 
              rows={3}
              placeholder="Describe error messages, symptoms, software version, or affected users..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label>Reporter Name</label>
              <input type="text" className="form-control" value={reporterName} onChange={e => setReporterName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input type="text" className="form-control" value={department} onChange={e => setDepartment(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Workstation IP</label>
              <input type="text" className="form-control" value={ip} onChange={e => setIp(e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className={priority === 'P1' ? 'btn btn-p1-emergency' : 'btn btn-primary'}>
              Submit Incident Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
