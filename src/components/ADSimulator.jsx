import React, { useState } from 'react';
import { Key, Unlock, ShieldAlert, UserCheck, Search, CheckCircle, RefreshCw, Terminal, Plus, Trash2, Smartphone } from 'lucide-react';
import { INITIAL_AD_USERS } from '../data/mockData';

export default function ADSimulator({ initialSelectedUser }) {
  const [adUsers, setAdUsers] = useState(INITIAL_AD_USERS);
  const [selectedUser, setSelectedUser] = useState(
    initialSelectedUser ? adUsers.find(u => u.displayName.toLowerCase().includes(initialSelectedUser.toLowerCase())) || adUsers[1] : adUsers[1]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [tempPassword, setTempPassword] = useState(null);
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: "10:45:12 AM", eventId: 4740, desc: "An account was locked out. Target Domain: DC-01. User: david.wallace" },
    { id: 2, time: "09:12:05 AM", eventId: 4724, desc: "An attempt was made to reset an account's password. User: dwight.schrute" }
  ]);

  const filteredUsers = adUsers.filter(u => 
    u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.samAccountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. Unlock Account
  const handleUnlockAccount = () => {
    if (!selectedUser) return;
    const updated = adUsers.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, isLockedOut: false, status: 'Active', badPasswordCount: 0 };
      }
      return u;
    });
    setAdUsers(updated);
    setSelectedUser({ ...selectedUser, isLockedOut: false, status: 'Active', badPasswordCount: 0 });

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      eventId: 4767,
      desc: `A user account was unlocked. Target Domain: DC-01. User: ${selectedUser.samAccountName}. Caller Admin: current.admin`
    };
    setEventLogs([newLog, ...eventLogs]);
  };

  // 2. Reset Password
  const handleResetPassword = () => {
    if (!selectedUser) return;
    const newPass = `Temp$${Math.floor(1000 + Math.random() * 9000)}!`;
    setTempPassword(newPass);

    const updated = adUsers.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, status: 'Active', lastPasswordChange: new Date().toISOString().split('T')[0] };
      }
      return u;
    });
    setAdUsers(updated);
    setSelectedUser({ ...selectedUser, status: 'Active', lastPasswordChange: new Date().toISOString().split('T')[0] });

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      eventId: 4724,
      desc: `Password reset succeeded for user: ${selectedUser.samAccountName}. Temporary key generated.`
    };
    setEventLogs([newLog, ...eventLogs]);
  };

  // 3. Toggle Security Group
  const handleToggleGroup = (groupName) => {
    if (!selectedUser) return;
    const hasGroup = selectedUser.groups.includes(groupName);
    const updatedGroups = hasGroup 
      ? selectedUser.groups.filter(g => g !== groupName)
      : [...selectedUser.groups, groupName];

    const updated = adUsers.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, groups: updatedGroups };
      }
      return u;
    });
    setAdUsers(updated);
    setSelectedUser({ ...selectedUser, groups: updatedGroups });

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      eventId: hasGroup ? 4729 : 4728,
      desc: hasGroup 
        ? `A member was removed from a security group (${groupName}). Target: ${selectedUser.samAccountName}`
        : `A member was added to a security group (${groupName}). Target: ${selectedUser.samAccountName}`
    };
    setEventLogs([newLog, ...eventLogs]);
  };

  // 4. Reset MFA Device
  const handleResetMfa = () => {
    if (!selectedUser) return;
    const updated = adUsers.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, mfaEnabled: false, mfaMethod: 'None (Requires Registration)' };
      }
      return u;
    });
    setAdUsers(updated);
    setSelectedUser({ ...selectedUser, mfaEnabled: false, mfaMethod: 'None (Requires Registration)' });

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      eventId: 4625,
      desc: `MFA Auth Token cleared for user ${selectedUser.samAccountName}. User must register phone on next sign-in.`
    };
    setEventLogs([newLog, ...eventLogs]);
  };

  const availableGroups = ["Domain Admins", "VPN-Users", "Remote Desktop Users", "Finance-Payroll", "Security-Ops"];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Key className="text-cyan-400" size={24} />
            Active Directory & IAM Simulator
          </h1>
          <p className="page-subtitle">Manage Domain User accounts, perform account unlocks, force password resets, edit security groups, and audit DC Security Event logs</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>
        {/* Left Column: User Directory List */}
        <div className="card">
          <div style={{ marginBottom: '1rem' }}>
            <div className="search-box" style={{ width: '100%' }}>
              <Search size={14} className="search-box-icon" />
              <input 
                type="text" 
                placeholder="Search SAMAccount, Name, Dept..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '520px', overflowY: 'auto' }}>
            {filteredUsers.map(user => (
              <div 
                key={user.id}
                onClick={() => { setSelectedUser(user); setTempPassword(null); }}
                style={{ 
                  background: selectedUser?.id === user.id ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255,255,255,0.02)',
                  border: selectedUser?.id === user.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{user.displayName}</span>
                  {user.isLockedOut ? (
                    <span className="badge badge-p1">Locked</span>
                  ) : (
                    <span className="badge badge-resolved">{user.status}</span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                  {user.samAccountName}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {user.department} • {user.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: User Profile Inspector & Action Hub */}
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{selectedUser.displayName}</h2>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
                    {selectedUser.userPrincipalName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {selectedUser.isLockedOut ? (
                    <span className="badge badge-p1" style={{ fontSize: '0.85rem' }}>
                      <ShieldAlert size={14} /> Account Locked Out
                    </span>
                  ) : (
                    <span className="badge badge-resolved" style={{ fontSize: '0.85rem' }}>
                      <CheckCircle size={14} /> Account Active
                    </span>
                  )}
                </div>
              </div>

              {/* User Metadata Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', background: '#111827', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>DEPARTMENT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{selectedUser.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BAD LOGON COUNT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: selectedUser.badPasswordCount > 0 ? '#f43f5e' : 'var(--text-primary)' }}>
                    {selectedUser.badPasswordCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>LAST PASS CHANGE</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{selectedUser.lastPasswordChange}</div>
                </div>
              </div>

              {/* One-Click Action Hub */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  Administrative Action Hub
                </h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {selectedUser.isLockedOut && (
                    <button className="btn btn-warning" onClick={handleUnlockAccount}>
                      <Unlock size={16} /> 🔓 Unlock AD Account
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={handleResetPassword}>
                    <Key size={16} /> 🔑 Force Password Reset
                  </button>
                  <button className="btn btn-secondary" onClick={handleResetMfa}>
                    <Smartphone size={16} /> 📱 Reset MFA Authenticator
                  </button>
                </div>

                {tempPassword && (
                  <div style={{ marginTop: '0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: '600' }}>TEMPORARY PASSWORD GENERATED</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: '700', color: '#fff' }}>{tempPassword}</div>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>User must change password at next logon</span>
                  </div>
                )}
              </div>

              {/* Security Groups Manager */}
              <div>
                <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  Active Directory Security Group Membership
                </h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {availableGroups.map(grp => {
                    const isMember = selectedUser.groups.includes(grp);
                    return (
                      <button
                        key={grp}
                        className={`btn btn-sm ${isMember ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleToggleGroup(grp)}
                      >
                        {isMember ? <CheckCircle size={12} /> : <Plus size={12} />}
                        {grp}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Security Audit Event Log Terminal */}
            <div className="card">
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} className="text-cyan-400" /> Domain Controller Security Audit Event Stream
              </h3>
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="terminal-title">DC-01 Event Viewer Security Log (Filter: 4740, 4724, 4767)</div>
                </div>
                <div className="terminal-body" style={{ maxHeight: '160px' }}>
                  {eventLogs.map(log => (
                    <div key={log.id} style={{ marginBottom: '0.35rem' }}>
                      <span style={{ color: '#94a3b8' }}>[{log.time}]</span>{' '}
                      <span style={{ color: '#f59e0b', fontWeight: '700' }}>EventID {log.eventId}:</span>{' '}
                      <span style={{ color: '#e2e8f0' }}>{log.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
