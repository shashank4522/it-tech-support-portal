import React, { useState, useEffect } from 'react';
import { 
  Ticket, Clock, AlertTriangle, CheckCircle, UserCheck, Filter, 
  ArrowRight, ShieldAlert, Cpu, Terminal, Plus, X, MessageSquare, Send, Zap
} from 'lucide-react';

export default function TicketManager({ 
  tickets, 
  setTickets, 
  selectedTicket, 
  setSelectedTicket, 
  openNewTicketModal,
  onNavigateToDiagnostics,
  onNavigateToAD
}) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [newNote, setNewNote] = useState('');
  const [now, setNow] = useState(Date.now());

  // Tick every second for live SLA countdown display
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to compute SLA progress
  const getSlaDetails = (ticket) => {
    const createdTime = new Date(ticket.createdAt).getTime();
    const slaTargetTime = createdTime + ticket.slaMinutes * 60 * 1000;
    const totalDuration = ticket.slaMinutes * 60 * 1000;
    const elapsed = now - createdTime;
    const remaining = slaTargetTime - now;

    const percentageElapsed = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    let isBreached = remaining <= 0 && ticket.status !== 'Resolved' && ticket.status !== 'Closed';
    let remainingText = '';

    if (ticket.status === 'Resolved' || ticket.status === 'Closed') {
      remainingText = 'SLA Met';
    } else if (isBreached) {
      const overMins = Math.abs(Math.floor(remaining / (1000 * 60)));
      remainingText = `BREACHED by ${overMins}m`;
    } else {
      const minsLeft = Math.floor(remaining / (1000 * 60));
      const hoursLeft = Math.floor(minsLeft / 60);
      const displayMins = minsLeft % 60;
      remainingText = hoursLeft > 0 ? `${hoursLeft}h ${displayMins}m left` : `${displayMins}m left`;
    }

    let progressClass = 'sla-green';
    if (percentageElapsed > 80) progressClass = 'sla-red';
    else if (percentageElapsed > 50) progressClass = 'sla-amber';

    return { percentageElapsed, remainingText, isBreached, progressClass };
  };

  // Filter logic
  const filteredTickets = tickets.filter(ticket => {
    if (filterCategory !== 'All' && ticket.category !== filterCategory) return false;
    if (filterPriority !== 'All' && ticket.priority !== filterPriority) return false;
    if (filterStatus !== 'All' && ticket.status !== filterStatus) return false;
    return true;
  });

  // Calculate metrics
  const openCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const breachedCount = tickets.filter(t => getSlaDetails(t).isBreached).length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedTicket) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          timeline: [
            ...t.timeline,
            { time: "Just now", author: "Current Tech", text: newNote }
          ]
        };
      }
      return t;
    });
    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      timeline: [
        ...selectedTicket.timeline,
        { time: "Just now", author: "Current Tech", text: newNote }
      ]
    });
    setNewNote('');
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedTicket) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: newStatus,
          timeline: [
            ...t.timeline,
            { time: "Just now", author: "System", text: `Status updated to ${newStatus}` }
          ]
        };
      }
      return t;
    });
    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      status: newStatus,
      timeline: [
        ...selectedTicket.timeline,
        { time: "Just now", author: "System", text: `Status updated to ${newStatus}` }
      ]
    });
  };

  const handleInjectAiResolutionNote = () => {
    if (!selectedTicket) return;
    const resolutionText = `[ITIL Resolution Summary]: Diagnosed root cause associated with ${selectedTicket.category}. Performed remote script remediation and verified network path. Restored normal operations. Client confirmed issue resolved.`;
    setNewNote(resolutionText);
  };

  return (
    <div>
      {/* Top Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Ticket className="text-cyan-400" size={24} />
            Incident & Helpdesk Queue
          </h1>
          <p className="page-subtitle">Real-time ITIL SLA monitoring, ticket triage, and diagnostic automation</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}>
            {viewMode === 'list' ? '📊 Kanban View' : '📋 List View'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={openNewTicketModal}>
            <Plus size={16} /> New Incident
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-val">{tickets.length}</div>
            <div className="stat-label">Total Incidents Logged</div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <Ticket size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: '#f59e0b' }}>{openCount}</div>
            <div className="stat-label">Active / Open Queue</div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: breachedCount > 0 ? '#f43f5e' : '#10b981' }}>{breachedCount}</div>
            <div className="stat-label">SLA Breach Warnings</div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <AlertTriangle size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-val" style={{ color: '#34d399' }}>{resolvedCount}</div>
            <div className="stat-label">SLA Compliant Resolved</div>
          </div>
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <CheckCircle size={22} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600' }}>
            <Filter size={16} /> Filters:
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Priority:</span>
            <select className="form-control" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
              <option value="All">All Priorities</option>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
              <option value="P4">P4 - Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status:</span>
            <select className="form-control" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending User">Pending User</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category:</span>
            <select className="form-control" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Network & VPN">Network & VPN</option>
              <option value="Active Directory & IAM">Active Directory & IAM</option>
              <option value="Hardware & Printer">Hardware & Printer</option>
              <option value="Software & SaaS">Software & SaaS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List View */}
      {viewMode === 'list' ? (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Priority</th>
                  <th>Title & Description</th>
                  <th>Reporter / Dept</th>
                  <th>Category</th>
                  <th>SLA Target Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => {
                  const sla = getSlaDetails(ticket);
                  return (
                    <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                          {ticket.id}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${ticket.priority.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                          {ticket.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                          {ticket.description}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.82rem', fontWeight: '500' }}>{ticket.reporter.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ticket.reporter.department}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.78rem', padding: '0.2rem 0.5rem', background: '#1f2937', borderRadius: '4px' }}>
                          {ticket.category}
                        </span>
                      </td>
                      <td style={{ minWidth: '150px' }}>
                        <div className="sla-box">
                          <div className="sla-header">
                            <span style={{ color: sla.isBreached ? '#f43f5e' : 'var(--text-secondary)' }}>
                              {sla.remainingText}
                            </span>
                            <span>{Math.round(sla.percentageElapsed)}%</span>
                          </div>
                          <div className="sla-progress-track">
                            <div 
                              className={`sla-progress-fill ${sla.progressClass}`}
                              style={{ width: `${sla.percentageElapsed}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-${ticket.status.toLowerCase().replace(' ', '')}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedTicket(ticket); }}>
                          Inspect <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {['Open', 'In Progress', 'Pending User', 'Resolved'].map(columnStatus => {
            const colTickets = filteredTickets.filter(t => t.status === columnStatus);
            return (
              <div key={columnStatus} className="card" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700' }}>{columnStatus}</h3>
                  <span className="tab-badge">{colTickets.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {colTickets.map(ticket => {
                    const sla = getSlaDetails(ticket);
                    return (
                      <div 
                        key={ticket.id} 
                        className="card" 
                        style={{ padding: '0.85rem', cursor: 'pointer', background: 'var(--bg-card)' }}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: '700' }}>
                            {ticket.id}
                          </span>
                          <span className={`badge badge-${ticket.priority.toLowerCase()}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', lineClamp: 2 }}>
                          {ticket.title}
                        </div>
                        <div className="sla-box" style={{ marginTop: '0.5rem' }}>
                          <div className="sla-header">
                            <span style={{ fontSize: '0.7rem', color: sla.isBreached ? '#f43f5e' : 'var(--text-muted)' }}>
                              {sla.remainingText}
                            </span>
                          </div>
                          <div className="sla-progress-track">
                            <div className={`sla-progress-fill ${sla.progressClass}`} style={{ width: `${sla.percentageElapsed}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Details Modal / Slide-over Drawer */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content" style={{ maxWidth: '850px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                    {selectedTicket.id}
                  </span>
                  <span className={`badge badge-${selectedTicket.priority.toLowerCase()}`}>
                    {selectedTicket.priority}
                  </span>
                  <span className={`badge badge-${selectedTicket.status.toLowerCase().replace(' ', '')}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{selectedTicket.title}</h2>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTicket(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
              {/* Left Details */}
              <div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    Incident Description
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{selectedTicket.description}</p>
                </div>

                {/* Quick Diagnostics Action Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Automated Diagnostic Quick-Actions
                  </h4>
                  <div className="action-grid">
                    <div className="action-card" onClick={() => onNavigateToDiagnostics(selectedTicket.reporter.ip)}>
                      <Activity size={18} style={{ color: 'var(--accent-cyan)' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>Run Network Ping</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target: {selectedTicket.reporter.ip}</div>
                      </div>
                    </div>

                    <div className="action-card" onClick={() => onNavigateToAD(selectedTicket.reporter.name)}>
                      <UserCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>Inspect AD Account</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>User: {selectedTicket.reporter.name}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Steps Taken */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Diagnostics & Investigation Steps
                  </h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {selectedTicket.diagnosticSteps.map((step, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Timeline & Notes */}
                <div>
                  <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Activity Timeline & Audit Log
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', marginBottom: '0.85rem' }}>
                    {selectedTicket.timeline.map((item, idx) => (
                      <div key={idx} style={{ background: '#111827', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-blue)', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                          <span><strong>{item.author}</strong></span>
                          <span>{item.time}</span>
                        </div>
                        <div>{item.text}</div>
                      </div>
                    ))}
                  </div>

                  {/* Add Note Input */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add internal resolution note or log diagnostic update..." 
                      style={{ flex: 1 }}
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                    />
                    <button className="btn btn-secondary btn-sm" onClick={handleInjectAiResolutionNote} title="Auto-fill ITIL resolution note template">
                      <Zap size={14} /> AI Note
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={handleAddNote}>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar Metadata */}
              <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reporter Details</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '600', marginTop: '0.2rem' }}>{selectedTicket.reporter.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{selectedTicket.reporter.email}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{selectedTicket.reporter.department}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Workstation IP / Host</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>{selectedTicket.reporter.ip}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{selectedTicket.reporter.hostname}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Technician</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{selectedTicket.assignee}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Ticket Status Actions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedTicket.status !== 'In Progress' && (
                      <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange('In Progress')}>
                        Mark In Progress
                      </button>
                    )}
                    {selectedTicket.status !== 'Pending User' && (
                      <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange('Pending User')}>
                        Mark Pending User
                      </button>
                    )}
                    {selectedTicket.status !== 'Resolved' && (
                      <button className="btn btn-success btn-sm" onClick={() => handleStatusChange('Resolved')}>
                        <CheckCircle size={14} /> Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
