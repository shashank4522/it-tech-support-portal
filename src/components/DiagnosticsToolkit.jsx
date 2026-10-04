import React, { useState } from 'react';
import { 
  Activity, Globe, Server, Cpu, HardDrive, RefreshCw, 
  CheckCircle2, AlertCircle, Play, ShieldAlert, Terminal, Layers, Radio
} from 'lucide-react';
import { NETWORK_ENDPOINTS } from '../data/mockData';

export default function DiagnosticsToolkit({ targetIpFilter }) {
  const [activeSubTab, setActiveSubTab] = useState('ping'); // 'ping' | 'traceroute' | 'dns' | 'ports' | 'endpoints'

  // Ping state
  const [pingTarget, setPingTarget] = useState(targetIpFilter || '198.51.100.45');
  const [isPinging, setIsPinging] = useState(false);
  const [pingLogs, setPingLogs] = useState([]);
  const [pingStats, setPingStats] = useState(null);

  // Traceroute state
  const [traceTarget, setTraceTarget] = useState('vpn.company.com');
  const [isTracing, setIsTracing] = useState(false);
  const [traceHops, setTraceHops] = useState([]);

  // DNS Resolver state
  const [dnsTarget, setDnsTarget] = useState('corp.cyberdyne.com');
  const [dnsRecords, setDnsRecords] = useState(null);

  // Port Scanner state
  const [portTarget, setPortTarget] = useState('10.0.1.10');
  const [isScanning, setIsScanning] = useState(false);
  const [portResults, setPortResults] = useState(null);

  // Endpoint Services state
  const [endpoints, setEndpoints] = useState([
    { id: 'srv-1', name: 'AD-DC01 (Domain Controller)', ip: '10.0.1.10', cpu: 14, ram: 42, disk: 38, services: [
      { name: 'NTDS (Active Directory)', status: 'Running' },
      { name: 'DNS Server', status: 'Running' },
      { name: 'KDC (Kerberos)', status: 'Running' }
    ]},
    { id: 'srv-2', name: 'FIN-PRINT-SVR01 (Print Server)', ip: '10.0.4.55', cpu: 78, ram: 88, disk: 92, services: [
      { name: 'Spooler (Print Spooler)', status: 'Stopped', isError: true },
      { name: 'Server (LanmanServer)', status: 'Running' },
      { name: 'WinRM (Remote Mgmt)', status: 'Running' }
    ]},
    { id: 'srv-3', name: 'VPN-EDGE-01 (PaloAlto Gateway)', ip: '198.51.100.45', cpu: 32, ram: 55, disk: 24, services: [
      { name: 'PanGPS Service', status: 'Running' },
      { name: 'SSLVPN Tunnel Engine', status: 'Running' }
    ]}
  ]);

  // Execute Ping Test Simulation
  const handleRunPing = () => {
    setIsPinging(true);
    setPingLogs([]);
    setPingStats(null);

    let count = 0;
    const logs = [];
    const rtts = [];

    const interval = setInterval(() => {
      count++;
      const latency = Math.floor(Math.random() * 25) + 12;
      rtts.push(latency);
      logs.push(`Reply from ${pingTarget}: bytes=32 time=${latency}ms TTL=118`);
      setPingLogs([...logs]);

      if (count >= 4) {
        clearInterval(interval);
        setIsPinging(false);
        const min = Math.min(...rtts);
        const max = Math.max(...rtts);
        const avg = Math.round(rtts.reduce((a, b) => a + b, 0) / rtts.length);
        setPingStats({ sent: 4, received: 4, loss: 0, min, max, avg });
      }
    }, 500);
  };

  // Execute Traceroute Simulation
  const handleRunTraceroute = () => {
    setIsTracing(true);
    setTraceHops([]);

    const mockHops = [
      { hop: 1, ip: '192.168.1.1', host: 'gateway.local', latency: '1 ms' },
      { hop: 2, ip: '10.0.0.1', host: 'core-router-01.corp.internal', latency: '4 ms' },
      { hop: 3, ip: '172.16.10.4', host: 'firewall-internal.corp', latency: '7 ms' },
      { hop: 4, ip: '203.0.113.1', host: 'isp-edge-node-99.net', latency: '18 ms' },
      { hop: 5, ip: '198.51.100.45', host: 'vpn-gateway.company.com', latency: '22 ms' }
    ];

    let current = 0;
    const hopsArr = [];

    const interval = setInterval(() => {
      hopsArr.push(mockHops[current]);
      setTraceHops([...hopsArr]);
      current++;
      if (current >= mockHops.length) {
        clearInterval(interval);
        setIsTracing(false);
      }
    }, 600);
  };

  // Execute DNS Resolver Simulation
  const handleRunDns = () => {
    setDnsRecords({
      host: dnsTarget,
      records: [
        { type: 'A', value: '198.51.100.45', ttl: '300s', status: 'Valid' },
        { type: 'AAAA', value: '2001:db8:85a3::8a2e:370:7334', ttl: '300s', status: 'Valid' },
        { type: 'MX', value: 'mail.corp.cyberdyne.com (Priority: 10)', ttl: '3600s', status: 'Valid' },
        { type: 'TXT', value: '"v=spf1 include:outlook.com ~all"', ttl: '3600s', status: 'Valid' },
        { type: 'CNAME', value: 'autodiscover.outlook.com', ttl: '3600s', status: 'Valid' }
      ]
    });
  };

  // Execute Port Scanner Simulation
  const handleRunPortScan = () => {
    setIsScanning(true);
    setPortResults(null);

    setTimeout(() => {
      setIsScanning(false);
      setPortResults([
        { port: 22, service: 'SSH', status: 'OPEN', color: '#10b981' },
        { port: 53, service: 'DNS', status: 'OPEN', color: '#10b981' },
        { port: 80, service: 'HTTP', status: 'CLOSED / FILTERED', color: '#f59e0b' },
        { port: 443, service: 'HTTPS', status: 'OPEN', color: '#10b981' },
        { port: 3389, service: 'RDP (Remote Desktop)', status: 'OPEN', color: '#10b981' },
        { port: 8080, service: 'HTTP-ALT', status: 'CLOSED', color: '#f43f5e' }
      ]);
    }, 1200);
  };

  // Toggle/Restart Endpoint Service
  const handleRestartService = (serverIndex, serviceIndex) => {
    const updated = [...endpoints];
    updated[serverIndex].services[serviceIndex].status = 'Running';
    updated[serverIndex].services[serviceIndex].isError = false;
    setEndpoints(updated);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity className="text-cyan-400" size={24} />
            Live Network & Endpoint Diagnostics
          </h1>
          <p className="page-subtitle">Interactive ICMP Ping, Traceroute visualizer, DNS record inspector, Port scanner, and Endpoint service control</p>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="nav-bar" style={{ borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', background: 'var(--bg-card)' }}>
        <button className={`nav-tab ${activeSubTab === 'ping' ? 'active' : ''}`} onClick={() => setActiveSubTab('ping')}>
          <Radio size={16} /> ICMP Ping Test
        </button>
        <button className={`nav-tab ${activeSubTab === 'traceroute' ? 'active' : ''}`} onClick={() => setActiveSubTab('traceroute')}>
          <Layers size={16} /> Traceroute Visualizer
        </button>
        <button className={`nav-tab ${activeSubTab === 'dns' ? 'active' : ''}`} onClick={() => setActiveSubTab('dns')}>
          <Globe size={16} /> DNS Record Inspector
        </button>
        <button className={`nav-tab ${activeSubTab === 'ports' ? 'active' : ''}`} onClick={() => setActiveSubTab('ports')}>
          <Terminal size={16} /> Port Connectivity Scanner
        </button>
        <button className={`nav-tab ${activeSubTab === 'endpoints' ? 'active' : ''}`} onClick={() => setActiveSubTab('endpoints')}>
          <Server size={16} /> Endpoint Health & Services
        </button>
      </div>

      {/* SUB-TAB 1: ICMP PING TEST */}
      {activeSubTab === 'ping' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Radio size={18} className="text-cyan-400" /> Ping Diagnostic Configuration
            </h3>

            <div className="form-group">
              <label>Target IP Address / Hostname</label>
              <input 
                type="text" 
                className="form-control" 
                value={pingTarget} 
                onChange={e => setPingTarget(e.target.value)}
                placeholder="e.g. 198.51.100.45 or gateway.internal"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick Select Presets:</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                {NETWORK_ENDPOINTS.map(ep => (
                  <button 
                    key={ep.id} 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setPingTarget(ep.ip)}
                  >
                    {ep.name} ({ep.ip})
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleRunPing} 
              disabled={isPinging}
              style={{ width: '100%' }}
            >
              {isPinging ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
              {isPinging ? 'Transmitting ICMP Packets...' : 'Start Ping Diagnostic'}
            </button>
          </div>

          {/* Ping Console & Stats */}
          <div className="card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.85rem' }}>
              Terminal ICMP Output
            </h3>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="terminal-title">ping -t {pingTarget}</div>
              </div>
              <div className="terminal-body">
                {pingLogs.length === 0 ? (
                  <span style={{ color: '#64748b' }}>Click "Start Ping Diagnostic" to begin packet transmission...</span>
                ) : (
                  pingLogs.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))
                )}
              </div>
            </div>

            {pingStats && (
              <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PACKETS SENT</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399' }}>{pingStats.sent}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MIN RTT</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#38bdf8' }}>{pingStats.min}ms</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AVG RTT</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#38bdf8' }}>{pingStats.avg}ms</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PACKET LOSS</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399' }}>{pingStats.loss}%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TRACEROUTE VISUALIZER */}
      {activeSubTab === 'traceroute' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Multi-Hop Traceroute Map</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trace network routing path and latency metrics per hop</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleRunTraceroute} disabled={isTracing}>
              {isTracing ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
              {isTracing ? 'Tracing Route...' : 'Run Traceroute'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {traceHops.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Click "Run Traceroute" to inspect routing topology from local host to target destination.
              </div>
            ) : (
              traceHops.map(hop => (
                <div key={hop.hop} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#111827', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '36px', height: '36px', background: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>
                    {hop.hop}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>{hop.host}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>{hop.ip}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-resolved">{hop.latency}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DNS RECORD INSPECTOR */}
      {activeSubTab === 'dns' && (
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <input 
              type="text" 
              className="form-control" 
              style={{ flex: 1 }} 
              value={dnsTarget} 
              onChange={e => setDnsTarget(e.target.value)}
              placeholder="Domain to query DNS records..."
            />
            <button className="btn btn-primary" onClick={handleRunDns}>
              <Globe size={16} /> Query DNS Records
            </button>
          </div>

          {dnsRecords && (
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Resolved DNS Zone Records for <strong>{dnsRecords.host}</strong>
              </h4>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Record Type</th>
                      <th>Resolved Destination / IP Value</th>
                      <th>TTL</th>
                      <th>Validation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dnsRecords.records.map((rec, idx) => (
                      <tr key={idx}>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                            {rec.type}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{rec.value}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rec.ttl}</td>
                        <td>
                          <span className="badge badge-resolved">{rec.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: PORT SCANNER */}
      {activeSubTab === 'ports' && (
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <input 
              type="text" 
              className="form-control" 
              style={{ flex: 1 }} 
              value={portTarget} 
              onChange={e => setPortTarget(e.target.value)}
              placeholder="Target Host IP to scan TCP ports..."
            />
            <button className="btn btn-primary" onClick={handleRunPortScan} disabled={isScanning}>
              {isScanning ? <RefreshCw className="animate-spin" size={16} /> : <Terminal size={16} />}
              {isScanning ? 'Scanning Socket Ports...' : 'Scan Standard TCP Ports'}
            </button>
          </div>

          {portResults && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {portResults.map((p, idx) => (
                <div key={idx} style={{ background: '#111827', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '1.05rem', color: p.color }}>
                      Port {p.port}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', color: p.color, textTransform: 'uppercase' }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.service}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: ENDPOINT HEALTH & SERVICES */}
      {activeSubTab === 'endpoints' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {endpoints.map((server, sIdx) => (
            <div key={server.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{server.name}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>{server.ip}</div>
                </div>
                <span className="badge badge-resolved">Healthy</span>
              </div>

              {/* Resource Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>CPU Utilization</span>
                    <span>{server.cpu}%</span>
                  </div>
                  <div className="sla-progress-track">
                    <div className="sla-progress-fill sla-green" style={{ width: `${server.cpu}%` }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>RAM Memory</span>
                    <span>{server.ram}%</span>
                  </div>
                  <div className="sla-progress-track">
                    <div className="sla-progress-fill sla-green" style={{ width: `${server.ram}%` }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>System Disk C:</span>
                    <span>{server.disk}%</span>
                  </div>
                  <div className="sla-progress-track">
                    <div className={`sla-progress-fill ${server.disk > 90 ? 'sla-red' : 'sla-amber'}`} style={{ width: `${server.disk}%` }} />
                  </div>
                </div>
              </div>

              {/* Windows Services list */}
              <div>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Managed Windows Services
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {server.services.map((svc, svcIdx) => (
                    <div key={svcIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                      <div>
                        <span style={{ fontWeight: '500' }}>{svc.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: svc.isError ? '#f43f5e' : '#34d399', fontWeight: '600', fontSize: '0.75rem' }}>
                          {svc.status}
                        </span>
                        {svc.isError && (
                          <button className="btn btn-warning btn-sm" onClick={() => handleRestartService(sIdx, svcIdx)}>
                            <RefreshCw size={12} /> Restart
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
