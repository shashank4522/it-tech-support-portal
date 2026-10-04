import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TicketManager from './components/TicketManager';
import DiagnosticsToolkit from './components/DiagnosticsToolkit';
import ADSimulator from './components/ADSimulator';
import RunbooksKB from './components/RunbooksKB';
import AICopilot from './components/AICopilot';
import ResumeBuilder from './components/ResumeBuilder';
import NewTicketModal from './components/NewTicketModal';
import { INITIAL_TICKETS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'diagnostics' | 'ad_simulator' | 'runbooks' | 'ai_copilot' | 'resume_builder'
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  
  // Navigation pass-through state
  const [targetIpFilter, setTargetIpFilter] = useState(null);
  const [adUserFilter, setAdUserFilter] = useState(null);

  // New ticket modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isP1Modal, setIsP1Modal] = useState(false);

  // Ticket stats
  const openCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const now = Date.now();
  const breachedCount = tickets.filter(t => {
    const created = new Date(t.createdAt).getTime();
    const remaining = (created + t.slaMinutes * 60 * 1000) - now;
    return remaining <= 0 && t.status !== 'Resolved' && t.status !== 'Closed';
  }).length;

  const handleAddTicket = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  const handleNavigateToDiagnostics = (ip) => {
    setSelectedTicket(null);
    setTargetIpFilter(ip);
    setActiveTab('diagnostics');
  };

  const handleNavigateToAD = (userName) => {
    setSelectedTicket(null);
    setAdUserFilter(userName);
    setActiveTab('ad_simulator');
  };

  return (
    <div className="app-container">
      <Header 
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        openP1Modal={() => { setIsP1Modal(true); setIsModalOpen(true); }}
        ticketStats={{ open: openCount, breached: breachedCount }}
      />

      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ticketCounts={{ open: openCount }}
      />

      <main className="main-content">
        {activeTab === 'tickets' && (
          <TicketManager 
            tickets={tickets}
            setTickets={setTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            openNewTicketModal={() => { setIsP1Modal(false); setIsModalOpen(true); }}
            onNavigateToDiagnostics={handleNavigateToDiagnostics}
            onNavigateToAD={handleNavigateToAD}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsToolkit targetIpFilter={targetIpFilter} />
        )}

        {activeTab === 'ad_simulator' && (
          <ADSimulator initialSelectedUser={adUserFilter} />
        )}

        {activeTab === 'runbooks' && (
          <RunbooksKB />
        )}

        {activeTab === 'ai_copilot' && (
          <AICopilot tickets={tickets} />
        )}

        {activeTab === 'resume_builder' && (
          <ResumeBuilder />
        )}
      </main>

      <NewTicketModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTicket={handleAddTicket}
        defaultP1={isP1Modal}
      />
    </div>
  );
}
