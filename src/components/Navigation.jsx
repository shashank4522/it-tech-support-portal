import React from 'react';
import { Ticket, Activity, Key, BookOpen, Bot, FileText } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, ticketCounts }) {
  const tabs = [
    { id: 'tickets', label: 'Helpdesk Tickets', icon: Ticket, badge: ticketCounts.open },
    { id: 'diagnostics', label: 'Network & Endpoint Diagnostics', icon: Activity },
    { id: 'ad_simulator', label: 'Active Directory & IAM', icon: Key },
    { id: 'runbooks', label: 'Runbooks & CLI Deck', icon: BookOpen },
    { id: 'ai_copilot', label: 'AI Incident Copilot', icon: Bot },
    { id: 'resume_builder', label: 'Resume & Interview Suite', icon: FileText, highlight: true }
  ];

  return (
    <nav className="nav-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={tab.highlight ? { color: isActive ? '#38bdf8' : '#38bdf8', fontWeight: '600' } : {}}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="tab-badge">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
