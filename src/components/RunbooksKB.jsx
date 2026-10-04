import React, { useState } from 'react';
import { BookOpen, Terminal, CheckCircle2, ArrowRight, Play, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import { TROUBLESHOOTING_RUNBOOKS, CLI_COMMAND_LIBRARY } from '../data/mockData';

export default function RunbooksKB() {
  const [selectedRunbook, setSelectedRunbook] = useState(TROUBLESHOOTING_RUNBOOKS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  
  // Terminal state
  const [executingCmd, setExecutingCmd] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState('');

  const currentStep = selectedRunbook.steps[activeStepIndex];

  const handleCopyCommand = (cmdText, id) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunCommand = (cmd) => {
    setExecutingCmd(cmd.id);
    setTerminalOutput(`PS C:\\WINDOWS\\system32> ${cmd.command}\n\nExecuting script on target host...`);

    setTimeout(() => {
      setTerminalOutput(`PS C:\\WINDOWS\\system32> ${cmd.command}\n\n${cmd.mockOutput}`);
      setExecutingCmd(null);
    }, 900);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BookOpen className="text-cyan-400" size={24} />
            Guided Runbooks & PowerShell CLI Deck
          </h1>
          <p className="page-subtitle">Interactive decision-tree troubleshooting workflows and copyable terminal resolution scripts</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Left: Interactive Decision-Tree Wizard */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem' }}>
            Interactive Diagnostic Decision Tree
          </h3>

          {/* Runbook Selector */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {TROUBLESHOOTING_RUNBOOKS.map(rb => (
              <button
                key={rb.id}
                className={`btn btn-sm ${selectedRunbook.id === rb.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setSelectedRunbook(rb); setActiveStepIndex(0); }}
              >
                {rb.title.split(' ')[0]} {rb.category}
              </button>
            ))}
          </div>

          <div style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '600', textTransform: 'uppercase' }}>
              {selectedRunbook.category} • Est. Time: {selectedRunbook.estimatedTime}
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: '0.2rem 0 0.4rem 0' }}>{selectedRunbook.title}</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{selectedRunbook.summary}</p>
          </div>

          {/* Wizard Step Progression */}
          {currentStep ? (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--accent-blue)', borderRadius: 'var(--radius-md)', padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-progress">Step {currentStep.step} of {selectedRunbook.steps.length}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decision Tree Node</span>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.4rem' }}>{currentStep.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>{currentStep.action}</p>

              {/* Step PowerShell Command */}
              <div style={{ background: '#050811', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #1e293b', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <code>{currentStep.command}</code>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopyCommand(currentStep.command, `step-${currentStep.step}`)}>
                  {copiedId === `step-${currentStep.step}` ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>

              {/* Branching Actions */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn btn-success btn-sm" 
                  onClick={() => {
                    if (typeof currentStep.passNext === 'number') {
                      setActiveStepIndex(currentStep.passNext - 1);
                    } else {
                      alert(`Workflow Completed: ${currentStep.passNext}`);
                    }
                  }}
                  style={{ flex: 1 }}
                >
                  <CheckCircle2 size={14} /> Pass / Continue Step
                </button>

                <button 
                  className="btn btn-warning btn-sm" 
                  onClick={() => alert(`Escalation / Fallback Advice: ${currentStep.failNext}`)}
                  style={{ flex: 1 }}
                >
                  Fail / Alternative Path
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#34d399', fontWeight: '600' }}>
              🎉 Troubleshooting Workflow Completed!
            </div>
          )}
        </div>

        {/* Right: PowerShell & Bash CLI Command Deck */}
        <div className="card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={18} className="text-cyan-400" /> Enterprise PowerShell CLI Command Deck
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem', maxHeight: '280px', overflowY: 'auto' }}>
            {CLI_COMMAND_LIBRARY.map(cmd => (
              <div key={cmd.id} style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{cmd.name}</span>
                  <span className="badge badge-progress" style={{ fontSize: '0.7rem' }}>{cmd.category}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{cmd.description}</div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => handleRunCommand(cmd)} disabled={executingCmd === cmd.id}>
                    {executingCmd === cmd.id ? <RefreshCw className="animate-spin" size={12} /> : <Play size={12} />}
                    Run Script
                  </button>

                  <button className="btn btn-secondary btn-sm" onClick={() => handleCopyCommand(cmd.command, cmd.id)}>
                    {copiedId === cmd.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === cmd.id ? 'Copied!' : 'Copy Script'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Console Execution Window */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Interactive PowerShell Host Execution Output
            </h4>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="terminal-title">Windows PowerShell 7.4 (x64) - Remote Execution Host</div>
              </div>
              <div className="terminal-body" style={{ maxHeight: '180px' }}>
                {terminalOutput ? (
                  terminalOutput
                ) : (
                  <span style={{ color: '#64748b' }}>Click "Run Script" on any command above to simulate execution output...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
