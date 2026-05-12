import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --teal: #4DD9C0;
    --teal-light: #E8FAF7;
    --teal-mid: #B2EEE6;
    --orange-light: #FFF0E6;
    --orange: #F5A623;
    --bg: #EEF7F9;
    --white: #FFFFFF;
    --text-dark: #1A2533;
    --text-mid: #4A5568;
    --text-soft: #8899AA;
    --border: #E2EDF2;
    --taken-bg: #D0F5EE;
    --taken-text: #1A9E83;
    --shadow: 0 2px 12px rgba(30,80,100,0.07);
    --shadow-md: 0 4px 24px rgba(30,80,100,0.11);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-dark); }

  .app { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    width: 220px; min-height: 100vh; background: var(--white);
    display: flex; flex-direction: column; padding: 28px 0 24px;
    box-shadow: 2px 0 12px rgba(30,80,100,0.05);
    position: fixed; top: 0; left: 0; bottom: 0;
  }

  .brand { display: flex; align-items: center; gap: 12px; padding: 0 24px 32px; }
  .brand-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--bg); border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--teal);
  }
  .brand-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 18px; line-height: 1.1; }
  .brand-sub { font-size: 11px; color: var(--text-soft); font-weight: 400; margin-top: 2px; }

  .nav { flex: 1; padding: 0 12px; }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 16px; border-radius: 12px;
    cursor: pointer; font-size: 15px; font-weight: 500;
    color: var(--text-mid); margin-bottom: 4px;
    transition: all 0.18s ease;
  }
  .nav-item:hover { background: var(--teal-light); color: var(--teal); }
  .nav-item.active { background: var(--teal); color: white; font-weight: 600; }
  .nav-item .icon { width: 20px; text-align: center; font-size: 16px; }

  .device-status {
    margin: 0 12px; background: var(--teal-light); border-radius: 14px;
    padding: 14px 16px;
  }
  .device-status-title { font-size: 12px; font-weight: 600; color: var(--text-mid); margin-bottom: 8px; }
  .device-status-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-mid); margin-bottom: 5px; }
  .device-status-row:last-child { margin-bottom: 0; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); }

  /* Main */
  .main { margin-left: 220px; flex: 1; padding: 36px 36px 36px; }

  .page-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 32px; color: var(--text-dark); }
  .page-subtitle { font-size: 15px; color: var(--text-soft); margin-top: 6px; margin-bottom: 28px; }

  /* Stat Cards */
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--white); border-radius: 18px; padding: 22px 22px 20px;
    box-shadow: var(--shadow); transition: transform 0.18s ease, box-shadow 0.18s ease;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .stat-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 14px;
  }
  .stat-icon.green { background: var(--teal-light); color: var(--teal); }
  .stat-icon.orange { background: var(--orange-light); color: var(--orange); }
  .stat-icon.blue { background: #EBF3FF; color: #4A90D9; }
  .stat-icon.teal { background: var(--teal-light); color: var(--teal); }
  .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 28px; color: var(--text-dark); }
  .stat-label { font-size: 13px; color: var(--text-soft); margin-top: 4px; }

  /* Bottom Grid */
  .bottom-grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }

  /* Schedule Card */
  .schedule-card {
    background: var(--white); border-radius: 18px; padding: 24px;
    box-shadow: var(--shadow);
  }
  .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .card-header-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--teal-light); color: var(--teal);
    display: flex; align-items: center; justify-content: center; font-size: 17px;
  }
  .card-header-icon.orange { background: var(--orange-light); color: var(--orange); }
  .card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 17px; }

  .schedule-row {
    display: flex; align-items: center; padding: 13px 0;
    border-bottom: 1px solid var(--border); gap: 16px;
  }
  .schedule-row:last-child { border-bottom: none; }
  .sched-time { font-size: 14px; color: var(--text-soft); width: 80px; font-weight: 500; }
  .sched-name { flex: 1; font-size: 15px; font-weight: 500; color: var(--text-dark); }
  .badge {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
  }
  .badge.taken { background: var(--taken-bg); color: var(--taken-text); }
  .badge.pending { background: var(--orange-light); color: var(--orange); }
  .badge .check { font-size: 13px; }

  /* Alerts Card */
  .alerts-card {
    background: var(--white); border-radius: 18px; padding: 24px;
    box-shadow: var(--shadow);
  }
  .alert-item { padding: 13px 0; border-bottom: 1px solid var(--border); }
  .alert-item:last-child { border-bottom: none; }
  .alert-row { display: flex; align-items: flex-start; gap: 10px; }
  .alert-icon { font-size: 16px; margin-top: 1px; color: var(--orange); flex-shrink: 0; }
  .alert-icon.check { color: var(--teal); }
  .alert-icon.battery { color: #4A90D9; }
  .alert-text { font-size: 14px; color: var(--text-dark); font-weight: 500; line-height: 1.4; }
  .alert-time { font-size: 12px; color: var(--text-soft); margin-top: 4px; }

  @media (max-width: 1100px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .bottom-grid { grid-template-columns: 1fr; }
  }
`;

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SidebarGroup } from "./components/ui/sidebar";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "jadwal", label: "Jadwal", icon: "📅" },
  { id: "obat", label: "Obat", icon: "💊" },
  { id: "riwayat", label: "Riwayat", icon: "🕐" },
];

const scheduleData = [
  { time: "08:00 AM", name: "Aspirin 100mg", status: "taken" },
  { time: "12:00 PM", name: "Metformin 500mg", status: "taken" },
  { time: "02:00 PM", name: "Vitamin D", status: "taken" },
  { time: "06:00 PM", name: "Lisinopril 10mg", status: "taken" },
  { time: "10:00 PM", name: "Atorvastatin 20mg", status: "taken" },
];

const alerts = [
  {
    icon: "⚠️",
    type: "warning",
    text: "Terlewat minum obat pada pukul 10:00 pagi hari ini",
    time: "2 jam lalu",
  },
  {
    icon: "🔋",
    type: "battery",
    text: "Level baterai berada di 85%",
    time: "5 jam lalu",
  },
  {
    icon: "✓",
    type: "check",
    text: "Semua obat pagi telah diminum",
    time: "2 jam lalu",
  },
];

export default function LamsiaDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Sidebar */}
        {/* <Sidebar />
          <SidebarHeader/>
          <SidebarContent>
            <SidebarGroup>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter/> */}
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-avatar">💊</div>
              <div>
                <div className="brand-name">LAMSIA</div>
                <div className="brand-sub">Smart Medicine Box</div>
              </div>
            </div>

            <nav className="nav">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item${activeNav === item.id ? " active" : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>

            <div className="device-status">
              <div className="device-status-title">Device Status</div>
              <div className="device-status-row">
                <span>📶</span> Terkoneksi
              </div>
              <div className="device-status-row">
                <span>🔋</span> 85% Battery
              </div>
            </div>
          </aside>
        {/* <Sidebar /> */}

        {/* Main Content */}
        <main className="main">
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">
            Selamat datang kembali! Berikut adalah tinjauan obat Anda
          </div>

          {/* Stat Cards */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-icon green">✓</div>
              <div className="stat-value">3/4</div>
              <div className="stat-label">Obat yang diambil hari ini</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">⚠</div>
              <div className="stat-value">2</div>
              <div className="stat-label">Obat terlewat minggu ini</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">🕐</div>
              <div className="stat-value">2 Jam</div>
              <div className="stat-label">Obat Selanjutnya</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon teal">📈</div>
              <div className="stat-value">92%</div>
              <div className="stat-label">Rasio Kepatuhan</div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">
            {/* Schedule */}
            <div className="schedule-card">
              <div className="card-header">
                <div className="card-header-icon">🔗</div>
                <div className="card-title">Jadwal hari ini</div>
              </div>
              {scheduleData.map((item, i) => (
                <div className="schedule-row" key={i}>
                  <div className="sched-time">{item.time}</div>
                  <div className="sched-name">{item.name}</div>
                  <div className={`badge ${item.status}`}>
                    <span className="check">✓</span>
                    {item.status === "taken" ? "Taken" : "Pending"}
                  </div>
                </div>
              ))}
            </div>

            {/* Alerts */}
            <div className="alerts-card">
              <div className="card-header">
                <div className="card-header-icon orange">🔔</div>
                <div className="card-title">Peringatan Terbaru</div>
              </div>
              {alerts.map((alert, i) => (
                <div className="alert-item" key={i}>
                  <div className="alert-row">
                    <span
                      className={`alert-icon ${
                        alert.type === "check"
                          ? "check"
                          : alert.type === "battery"
                          ? "battery"
                          : ""
                      }`}
                    >
                      {alert.icon}
                    </span>
                    <div>
                      <div className="alert-text">{alert.text}</div>
                      <div className="alert-time">{alert.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
