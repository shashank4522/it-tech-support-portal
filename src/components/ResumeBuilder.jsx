import React, { useState } from 'react';
import { FileText, Copy, Check, Star, CheckCircle2, Award, HelpCircle } from 'lucide-react';
import { RESUME_BULLET_POINTS, INTERVIEW_CHEAT_SHEET } from '../data/mockData';

export default function ResumeBuilder() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText className="text-cyan-400" size={24} />
            Resume & Interview Portfolio Suite
          </h1>
          <p className="page-subtitle">Recruiter-ready resume bullet points, key technical skill matrices, and technical interview talking points tailored for IT Support Specialist roles</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Resume Bullet Points Section */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award className="text-cyan-400" size={20} /> Professional Resume Bullet Points (Copy & Paste to Resume)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Tailored bullet points featuring quantifiable metrics (SLA compliance, MTTR reduction, Active Directory automation) ready to showcase on your CV.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {RESUME_BULLET_POINTS.map((categoryGroup, groupIdx) => (
              <div key={groupIdx} style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                    {categoryGroup.category}
                  </span>
                  <span className="badge badge-progress" style={{ fontSize: '0.7rem' }}>{categoryGroup.role}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {categoryGroup.bullets.map((bulletText, bIdx) => {
                    const uniqueId = `${groupIdx}-${bIdx}`;
                    return (
                      <div key={bIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5', flex: 1 }}>
                          • {bulletText}
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={() => handleCopyBullet(bulletText, uniqueId)}>
                          {copiedIndex === uniqueId ? <Check size={12} /> : <Copy size={12} />}
                          {copiedIndex === uniqueId ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Competencies Matrix */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.85rem' }}>
            Demonstrated Technical Competencies Matrix
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>ITSM & SLA MANAGEMENT</div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>ITIL Incident Lifecycle (P1-P4)</li>
                <li>SLA Threshold & Breach Alerts</li>
                <li>MTTR & Escalation Workflows</li>
                <li>Audit Trail & Resolution Logs</li>
              </ul>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#34d399', marginBottom: '0.4rem' }}>ACTIVE DIRECTORY & IAM</div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>AD DS Account Unlock (Event 4740)</li>
                <li>Temporary Password Generation</li>
                <li>GPO & Security Group RBAC</li>
                <li>MFA Token & TOTP Reset</li>
              </ul>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#38bdf8', marginBottom: '0.4rem' }}>NETWORK DIAGNOSTICS</div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>ICMP Ping RTT & Jitter Metrics</li>
                <li>Multi-hop Traceroute Topology</li>
                <li>DNS Records (A, MX, CNAME, TXT)</li>
                <li>TCP Socket Port Scanning</li>
              </ul>
            </div>

            <div style={{ background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#c084fc', marginBottom: '0.4rem' }}>TROUBLESHOOTING & SCRIPTING</div>
              <ul style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>PowerShell Service Remediation</li>
                <li>Print Spooler & Queue Purging</li>
                <li>Windows BSOD Stop Code Analysis</li>
                <li>Interactive Diagnostic Runbooks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Interview Talking Points Cheat Sheet */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle className="text-cyan-400" size={20} /> Interview Prep: How to Discuss This Project in Technical Interviews
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Use these structured answers when recruiters or hiring managers ask technical scenario questions during interviews.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {INTERVIEW_CHEAT_SHEET.map((item, idx) => (
              <div key={idx} style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Q: {item.question}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  <strong>A:</strong> {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
