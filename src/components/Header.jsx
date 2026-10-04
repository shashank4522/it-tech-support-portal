import React from 'react';
import { ShieldCheck, Search, AlertTriangle, Activity, PlusCircle, Terminal, HelpCircle } from 'lucide-react';

export default function Header({ searchFilter, setSearchFilter, openP1Modal, ticketStats }) {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-icon">
          <Terminal size={22} />
        </div>
        <div>
          <div className="brand-title">ApexOps IT Desk</div>
          <div className="brand-tagline">Enterprise Tech Support & Incident Management Operations</div>
        </div>
      </div>

      <div className="header-status-bar">
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          <span>All Systems Operational</span>
        </div>

        {ticketStats.breached > 0 && (
          <div className="badge badge-p1" style={{ fontSize: '0.78rem' }}>
            <AlertTriangle size={14} /> {ticketStats.breached} SLA Breach
          </div>
        )}

        <div className="search-box">
          <Search size={14} className="search-box-icon" />
          <input
            type="text"
            placeholder="Search Tickets, AD, Runbooks, CLI..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="header-actions">
        <button className="btn-p1-emergency" onClick={openP1Modal}>
          <AlertTriangle size={16} />
          <span>+ Raise P1 Incident</span>
        </button>
      </div>
    </header>
  );
}
