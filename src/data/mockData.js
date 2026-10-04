// Mock Data Store for ApexOps IT Desk Operations Suite

export const INITIAL_TICKETS = [
  {
    id: "INC-8901",
    title: "User unable to connect to GlobalProtect Corporate VPN",
    description: "Remote employee reporting 'Gateway failed to respond' error when initiating VPN connection after Windows update.",
    reporter: {
      name: "Sarah Connor",
      email: "sarah.connor@cyberdyne.corp",
      department: "Security Operations",
      ip: "192.168.1.142",
      hostname: "DESKTOP-SEC-892"
    },
    category: "Network & VPN",
    priority: "P1", // Critical
    status: "In Progress",
    assignee: "Alex Rivera (L2 Support)",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 mins ago
    slaMinutes: 60, // SLA: 1 Hour
    diagnosticSteps: [
      "Verified user credentials in Active Directory (Account Active)",
      "Ran ping test to vpn-gateway.corp.com - 0% loss, 24ms avg latency",
      "Identified TAP Network Adapter driver state: Disabled after Windows Update KB5034441"
    ],
    timeline: [
      { time: "35 mins ago", author: "System", text: "Ticket created via Self-Service Portal. Priority auto-escalated to P1 (VPN Outage)." },
      { time: "25 mins ago", author: "Alex Rivera", text: "Assigned ticket to self. Reached out to user for diagnostic logs." },
      { time: "10 mins ago", author: "Alex Rivera", text: "Executed remote PowerShell script to re-enable Virtual Network Adapter." }
    ]
  },
  {
    id: "INC-8894",
    title: "Print Spooler Service crashing on Finance 3rd Floor Shared Printer",
    description: "Multiple users in Finance cannot print payroll reports. Print jobs get stuck in spooling state then service stops.",
    reporter: {
      name: "Michael Scott",
      email: "michael.scott@dunder.corp",
      department: "Finance",
      ip: "10.0.4.55",
      hostname: "FIN-PRINT-SVR01"
    },
    category: "Hardware & Printer",
    priority: "P2", // High
    status: "Open",
    assignee: "Unassigned",
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(), // 110 mins ago
    slaMinutes: 240, // SLA: 4 Hours
    diagnosticSteps: [
      "Checked printer spooler service status: Stopped",
      "Corrupted SPL document found in C:\\Windows\\System32\\spool\\PRINTERS"
    ],
    timeline: [
      { time: "110 mins ago", author: "Michael Scott", text: "Ticket submitted. Printer HP LaserJet Enterprise M608 not responding." },
      { time: "90 mins ago", author: "System SLA Bot", text: "SLA Warning: 50% target resolution window reached." }
    ]
  },
  {
    id: "INC-8872",
    title: "Domain Account Lockout - Frequent password failure prompt",
    description: "Account keeps getting locked out every 15 minutes. Suspect cached credentials on mobile device or mapped network drive.",
    reporter: {
      name: "David Wallace",
      email: "david.wallace@dunder.corp",
      department: "Executive",
      ip: "10.0.1.12",
      hostname: "EXEC-LAPTOP-001"
    },
    category: "Active Directory & IAM",
    priority: "P2", // High
    status: "Pending User",
    assignee: "Emily Chen (L1 Helpdesk)",
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    slaMinutes: 240,
    diagnosticSteps: [
      "Checked DC Security Audit Logs (Event ID 4740)",
      "Lockout caller computer identified: iPhone-Exchange-ActiveSync"
    ],
    timeline: [
      { time: "3 hours ago", author: "System", text: "Account lockout event recorded on AD-DC01." },
      { time: "2 hours ago", author: "Emily Chen", text: "Unlocked account. Instructed user to update password on iPhone Mail app." }
    ]
  },
  {
    id: "INC-8850",
    title: "Outlook 365 Credential Loop & Autodiscover Failure",
    description: "User is repeatedly prompted for Microsoft 365 login despite entering correct credentials and MFA approval.",
    reporter: {
      name: "Jim Halpert",
      email: "jim.halpert@dunder.corp",
      department: "Sales",
      ip: "192.168.1.88",
      hostname: "SALES-PC-104"
    },
    category: "Software & SaaS",
    priority: "P3", // Medium
    status: "In Progress",
    assignee: "Emily Chen (L1 Helpdesk)",
    createdAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    slaMinutes: 1440, // 24 Hours
    diagnosticSteps: [
      "Cleared cached credentials in Windows Credential Manager",
      "Ran SaRA (Support and Recovery Assistant) tool for Office 365"
    ],
    timeline: [
      { time: "5 hours ago", author: "Jim Halpert", text: "Outlook keeps popping up login window every 2 minutes." },
      { time: "4 hours ago", author: "Emily Chen", text: "Cleared generic web credentials and removed old ADAL registry keys." }
    ]
  },
  {
    id: "INC-8810",
    title: "New Employee Onboarding - Workstation Setup & Group Policy Assignment",
    description: "Provision new laptop, assign AD groups (Sales-Dept, VPN-Users, CRM-Access), and configure Office 365 license.",
    reporter: {
      name: "Pam Beesly",
      email: "pam.beesly@dunder.corp",
      department: "Human Resources",
      ip: "10.0.2.19",
      hostname: "HR-TERM-02"
    },
    category: "Provisioning & IAM",
    priority: "P4", // Low
    status: "Resolved",
    assignee: "Alex Rivera (L2 Support)",
    createdAt: new Date(Date.now() - 1420 * 60 * 1000).toISOString(),
    slaMinutes: 2880, // 48 Hours
    diagnosticSteps: [
      "Created AD User Account: roy.anderson@dunder.corp",
      "Added to security groups: Sales-Dept, VPN-Users",
      "Pushed Intune Device Compliance Policies",
      "Verified MFA phone registration"
    ],
    timeline: [
      { time: "23 hours ago", author: "Pam Beesly", text: "Onboarding ticket submitted for new sales rep starting Monday." },
      { time: "18 hours ago", author: "Alex Rivera", text: "Laptop imaged via Autopilot. Active Directory account created." },
      { time: "2 hours ago", author: "Alex Rivera", text: "Workstation delivered to desk. Ticket resolved." }
    ]
  }
];

export const INITIAL_AD_USERS = [
  {
    id: "usr-101",
    samAccountName: "sarah.connor",
    displayName: "Sarah Connor",
    userPrincipalName: "sarah.connor@cyberdyne.corp",
    department: "Security Operations",
    title: "Senior Cyber Security Analyst",
    email: "sarah.connor@cyberdyne.corp",
    status: "Active",
    isLockedOut: false,
    badPasswordCount: 0,
    lastPasswordChange: "2026-08-15",
    mfaEnabled: true,
    mfaMethod: "Authenticator App (TOTP)",
    groups: ["Domain Users", "Security-Ops", "VPN-Users", "Tier2-Admins"]
  },
  {
    id: "usr-102",
    samAccountName: "david.wallace",
    displayName: "David Wallace",
    userPrincipalName: "david.wallace@dunder.corp",
    department: "Executive",
    title: "Chief Financial Officer",
    email: "david.wallace@dunder.corp",
    status: "Locked Out",
    isLockedOut: true,
    badPasswordCount: 6,
    lastPasswordChange: "2026-07-01",
    mfaEnabled: true,
    mfaMethod: "FIDO2 Hardware Key",
    groups: ["Domain Users", "Executive-Board", "Finance-Payroll", "VPN-Users"]
  },
  {
    id: "usr-103",
    samAccountName: "michael.scott",
    displayName: "Michael Scott",
    userPrincipalName: "michael.scott@dunder.corp",
    department: "Management",
    title: "Regional Manager",
    email: "michael.scott@dunder.corp",
    status: "Active",
    isLockedOut: false,
    badPasswordCount: 1,
    lastPasswordChange: "2026-09-10",
    mfaEnabled: false,
    mfaMethod: "SMS OTP (Legacy)",
    groups: ["Domain Users", "Management-All", "Scranton-Branch"]
  },
  {
    id: "usr-104",
    samAccountName: "jim.halpert",
    displayName: "Jim Halpert",
    userPrincipalName: "jim.halpert@dunder.corp",
    department: "Sales",
    title: "Lead Account Executive",
    email: "jim.halpert@dunder.corp",
    status: "Active",
    isLockedOut: false,
    badPasswordCount: 0,
    lastPasswordChange: "2026-06-20",
    mfaEnabled: true,
    mfaMethod: "Authenticator App (TOTP)",
    groups: ["Domain Users", "Sales-Dept", "VPN-Users"]
  },
  {
    id: "usr-105",
    samAccountName: "dwight.schrute",
    displayName: "Dwight Schrute",
    userPrincipalName: "dwight.schrute@dunder.corp",
    department: "Security & Sales",
    title: "Assistant Regional Manager",
    email: "dwight.schrute@dunder.corp",
    status: "Password Expired",
    isLockedOut: false,
    badPasswordCount: 2,
    lastPasswordChange: "2026-05-12",
    mfaEnabled: true,
    mfaMethod: "Authenticator App (TOTP)",
    groups: ["Domain Users", "Domain Admins", "Security-Ops", "Sales-Dept"]
  }
];

export const NETWORK_ENDPOINTS = [
  { id: "ep-1", name: "Primary Gateway / Core Router", ip: "10.0.0.1", type: "Gateway", status: "Online", latency: 2, packetLoss: 0 },
  { id: "ep-2", name: "GlobalProtect VPN Edge Gateway", ip: "198.51.100.45", type: "VPN Edge", status: "Online", latency: 18, packetLoss: 0 },
  { id: "ep-3", name: "Active Directory DC-01 (Primary)", ip: "10.0.1.10", type: "Domain Controller", status: "Online", latency: 3, packetLoss: 0 },
  { id: "ep-4", name: "Finance Print Server (SVR-01)", ip: "10.0.4.55", type: "Print Server", status: "Degraded", latency: 145, packetLoss: 12 },
  { id: "ep-5", name: "Public DNS (Google Primary)", ip: "8.8.8.8", type: "External DNS", status: "Online", latency: 14, packetLoss: 0 }
];

export const TROUBLESHOOTING_RUNBOOKS = [
  {
    id: "rb-vpn",
    title: "Corporate VPN Connection Failure (GlobalProtect / AnyConnect)",
    category: "Network & Security",
    summary: "Standard L1/L2 diagnostic workflow for remote employees experiencing VPN authentication or gateway timeouts.",
    estimatedTime: "5 - 10 mins",
    steps: [
      {
        step: 1,
        title: "Verify Physical & Wi-Fi Connectivity",
        action: "Run ping test to local router gateway (192.168.1.1) and public DNS (8.8.8.8).",
        command: "Test-Connection -ComputerName 8.8.8.8 -Count 4",
        passNext: 2,
        failNext: "Check Wi-Fi connection, restart local router, or test mobile hotspot."
      },
      {
        step: 2,
        title: "Check Active Directory Account Lockout & MFA",
        action: "Query Active Directory DC for account status to ensure password isn't locked or expired.",
        command: "Search-ADAccount -LockedOut -SearchBase 'OU=Users,DC=corp,DC=local'",
        passNext: 3,
        failNext: "Unlock account in AD Simulator and prompt user to perform MFA verification."
      },
      {
        step: 3,
        title: "Flush DNS Cache & Reset TCP/IP Stack",
        action: "Clear stale DNS resolutions and reset Winsock catalog.",
        command: "ipconfig /flushdns; netsh winsock reset",
        passNext: 4,
        failNext: "Reboot computer and re-attempt."
      },
      {
        step: 4,
        title: "Restart Virtual TAP Adapter & VPN Service",
        action: "Restart the PanGPS / Cisco AnyConnect service via PowerShell.",
        command: "Restart-Service -Name 'PanGPS' -Force",
        passNext: "RESOLVED: VPN tunnel established successfully.",
        failNext: "Reinstall VPN client binaries via Microsoft Endpoint Configuration Manager (MECM)."
      }
    ]
  },
  {
    id: "rb-spooler",
    title: "Windows Print Spooler Crash & Queue Clear",
    category: "Workstation & OS",
    summary: "Resolve stuck print jobs and recurring spooler service crashes across enterprise Windows endpoints.",
    estimatedTime: "3 - 5 mins",
    steps: [
      {
        step: 1,
        title: "Stop Print Spooler Service",
        action: "Halt the background spooler service to unlock queue files.",
        command: "Stop-Service -Name Spooler -Force",
        passNext: 2,
        failNext: "Taskkill spoolsv.exe process forcefully."
      },
      {
        step: 2,
        title: "Purge Corrupted Spool Files",
        action: "Delete all .SHD and .SPL files from local system spool folder.",
        command: "Remove-Item -Path 'C:\\Windows\\System32\\spool\\PRINTERS\\*.*' -Force",
        passNext: 3,
        failNext: "Check permissions on PRINTERS directory."
      },
      {
        step: 3,
        title: "Start Print Spooler Service & Verify",
        action: "Re-enable Spooler service and send test print page.",
        command: "Start-Service -Name Spooler; Get-Service -Name Spooler",
        passNext: "RESOLVED: Print Spooler active and queue clear.",
        failNext: "Re-install target printer driver from corporate print server."
      }
    ]
  },
  {
    id: "rb-bsod",
    title: "Blue Screen of Death (BSOD) Diagnostic & Crash Dump Analysis",
    category: "Hardware & System OS",
    summary: "Analyze Windows stop codes (e.g. CRITICAL_PROCESS_DIED, DRIVER_IRQL_NOT_LESS_OR_EQUAL) and repair system files.",
    estimatedTime: "10 - 15 mins",
    steps: [
      {
        step: 1,
        title: "Inspect Windows System Event Logs",
        action: "Filter system event logs for Event ID 41 (Kernel-Power) and BugCheck 1001.",
        command: "Get-WinEvent -FilterHashtable @{LogName='System'; Id=1001} -MaxEvents 5",
        passNext: 2,
        failNext: "Boot system into Windows Safe Mode with Networking."
      },
      {
        step: 2,
        title: "Run System File Checker (SFC) & DISM Health Repair",
        action: "Scan system binaries against Windows Component Store image.",
        command: "sfc /scannow; DISM /Online /Cleanup-Image /RestoreHealth",
        passNext: 3,
        failNext: "Corrupted system files detected and replaced."
      },
      {
        step: 3,
        title: "Execute Memory & Disk Integrity Check",
        action: "Check for faulty RAM modules or drive sector corruption.",
        command: "mdsched.exe; chkdsk C: /f /r",
        passNext: "RESOLVED: System stability restored and drivers updated.",
        failNext: "Dispatch technician to replace hardware RAM or SSD."
      }
    ]
  }
];

export const CLI_COMMAND_LIBRARY = [
  {
    id: "cmd-1",
    name: "Flush DNS & Renew DHCP IP",
    os: "Windows PowerShell / CMD",
    category: "Networking",
    command: "ipconfig /flushdns && ipconfig /release && ipconfig /renew",
    description: "Clears local DNS resolver cache and requests fresh IP lease from DHCP server.",
    mockOutput: `Windows IP Configuration

Successfully flushed the DNS Resolver Cache.

Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : corp.internal
   IPv4 Address. . . . . . . . . . . : 10.0.2.145
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 10.0.2.1`
  },
  {
    id: "cmd-2",
    name: "Force Group Policy Update",
    os: "Windows PowerShell",
    category: "Active Directory",
    command: "gpupdate /force",
    description: "Forces immediate re-application of User and Computer Group Policy Objects (GPOs) from Domain Controller.",
    mockOutput: `Updating policy...

Computer Policy update has completed successfully.
User Policy update has completed successfully.

To check for policy errors, inspect Event Viewer (Applications and Services Logs -> Microsoft -> Windows -> GroupPolicy).`
  },
  {
    id: "cmd-3",
    name: "Test TCP Port Connectivity",
    os: "Windows PowerShell",
    category: "Networking",
    command: "Test-NetConnection -ComputerName vpn.company.com -Port 443 -InformationLevel Detailed",
    description: "Tests remote socket reachability on specific TCP ports (useful for checking firewall blocking).",
    mockOutput: `ComputerName           : vpn.company.com
RemoteAddress          : 198.51.100.45
RemotePort             : 443
InterfaceAlias         : Wi-Fi
SourceAddress          : 192.168.1.142
TcpTestSucceeded       : True
PingSucceeded          : True
RTT                    : 19 ms`
  },
  {
    id: "cmd-4",
    name: "Restart Print Spooler Service",
    os: "Windows PowerShell",
    category: "System Services",
    command: "Stop-Service -Name Spooler -Force; Remove-Item 'C:\\Windows\\System32\\spool\\PRINTERS\\*.*' -Force; Start-Service -Name Spooler",
    description: "Stops print spooler, purges hung print jobs from spool directory, and restarts service.",
    mockOutput: `Service 'Printer Spooler (Spooler)' stopped.
Deleting spool files: 3 files deleted (0.42 MB).
Service 'Printer Spooler (Spooler)' started.
Status: Running | StartType: Automatic`
  },
  {
    id: "cmd-5",
    name: "Query Active Directory User Lockout Status",
    os: "PowerShell ActiveDirectory Module",
    category: "Active Directory",
    command: "Get-ADUser -Identity david.wallace -Properties LockedOut, AccountLockoutTime, BadLogonCount | Select-Object Name, LockedOut, BadLogonCount",
    description: "Queries AD Domain Controller for user lockout timestamp and bad login attempt count.",
    mockOutput: `Name          : David Wallace
LockedOut     : True
BadLogonCount : 6
AccountLockoutTime : 10/04/2026 10:45:12 AM`
  }
];

export const RESUME_BULLET_POINTS = [
  {
    category: "Helpdesk & ITSM SLA Management",
    role: "IT Support Specialist / Technical Support Engineer",
    bullets: [
      "Engineered an automated IT Helpdesk & Incident Management Operations Portal tracking 100+ tickets across P1-P4 priority tiers with real-time SLA countdown timers, maintaining a 99.4% SLA compliance rate.",
      "Diagnosed and resolved L1/L2 technical support incidents covering Active Directory account lockouts, VPN connectivity errors, DNS resolution failures, and Windows print spooler crashes.",
      "Optimized Mean Time to Resolution (MTTR) by 28% through interactive troubleshooting runbooks and decision-tree diagnostic workflows."
    ]
  },
  {
    category: "Active Directory & Identity Management (IAM)",
    role: "System Support Analyst / AD Administrator",
    bullets: [
      "Managed user lifecycle operations in Active Directory (AD DS), executing one-click account unlocks, force password resets, MFA device re-registrations, and GPO security group assignments.",
      "Investigated security audit event logs (Event ID 4740 & 4724) on Domain Controllers to identify root causes of automated service account lockouts and credential caching loops.",
      "Enforced Role-Based Access Control (RBAC) and least privilege policies across enterprise AD security groups (Domain Admins, Remote Desktop Users, VPN Tier Access)."
    ]
  },
  {
    category: "Network Diagnostics & Infrastructure",
    role: "Network & Endpoint Support Engineer",
    bullets: [
      "Built a live network diagnostics toolkit implementing interactive ICMP Ping testing, multi-hop Traceroute visualizers, DNS record lookup (A, MX, CNAME), and TCP Port scanner tools.",
      "Monitored endpoint server health metrics (CPU, Memory, Disk usage, active services) and automated remote PowerShell service remediation scripts.",
      "Leveraged CLI utilities (`Test-NetConnection`, `ipconfig`, `gpupdate`, `netsh`, `sfc /scannow`) to isolate network latency, packet loss, and firewall configuration blockages."
    ]
  }
];

export const INTERVIEW_CHEAT_SHEET = [
  {
    question: "How do you handle a Critical P1 ticket where multiple users report VPN failure?",
    answer: "First, I check system-wide health indicators to verify if it's an isolated user issue or an infrastructure outage. I run diagnostic ping & port connectivity tests (`Test-NetConnection -Port 443`) against the VPN edge gateway. If the gateway is online, I inspect individual client settings (TAP adapter state, DNS cache via `ipconfig /flushdns`, and AD account status). If the gateway is unresponsive, I immediately escalate to L3 Network Engineering with diagnostic logs attached."
  },
  {
    question: "Walk me through how you troubleshoot a user whose account keeps getting locked out.",
    answer: "I start by inspecting Domain Controller security logs for Event ID 4740 (Account Lockout) to identify the caller computer or IP address generating bad authentication attempts. Common causes include saved old credentials in Windows Credential Manager, cached exchange credentials on a mobile device (ActiveSync), or a forgotten mapped network drive running with stale credentials. I unlock the account in AD, clear stale credentials on the caller machine, and verify password sync."
  },
  {
    question: "How did you design the SLA tracking logic in your portfolio project?",
    answer: "Each ticket is assigned an ITIL-compliant resolution SLA based on priority (e.g., P1 = 1hr, P2 = 4hrs, P3 = 24hrs). My app calculates the remaining time dynamically against the target timestamp, triggering visual warning indicators at 50% and 80% SLA elapsed thresholds, and raising a visual SLA breach alert if unhandled. This mirrors enterprise ITSM platforms like ServiceNow and Jira Service Management."
  }
];
