import { useState } from "react";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   * { margin: 0; padding: 0; box-sizing: border-box; }

//   :root {
//     --teal: #4DD9C0;
//     --teal-light: #E8FAF7;
//     --teal-mid: #B2EEE6;
//     --orange-light: #FFF0E6;
//     --orange: #F5A623;
//     --bg: #EEF7F9;
//     --white: #FFFFFF;
//     --text-dark: #1A2533;
//     --text-mid: #4A5568;
//     --text-soft: #8899AA;
//     --border: #E2EDF2;
//     --taken-bg: #D0F5EE;
//     --taken-text: #1A9E83;
//     --shadow: 0 2px 12px rgba(30,80,100,0.07);
//     --shadow-md: 0 4px 24px rgba(30,80,100,0.11);
//   }

//   body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-dark); }

//   /* Sidebar */
//   .sidebar {
//     width: 220px; min-height: 100vh; background: var(--white);
//     display: flex; flex-direction: column; padding: 28px 0 24px;
//     box-shadow: 2px 0 12px rgba(30,80,100,0.05);
//     position: fixed; top: 0; left: 0; bottom: 0;
//   }
//   .nav-item:hover { background: var(--teal-light); color: var(--teal); }
//   .nav-item.active { background: var(--teal); color: white; font-weight: 600; }
//   .nav-item .icon { width: 20px; text-align: center; font-size: 16px; }

//   .device-status-row:last-child { margin-bottom: 0; }
//   .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); }


//   /* Stat Cards */
//   .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
//   .stat-icon.teal { background: var(--teal-light); color: var(--teal); }

//   /* Bottom Grid */

//   /* Schedule Card */
//   .card-header-icon.orange { background: var(--orange-light); color: var(--orange); }

//   
//   .schedule-row:last-child { border-bottom: none; }
//   .badge.taken { background: var(--taken-bg); color: var(--taken-text); }
//   .badge.pending { background: var(--orange-light); color: var(--orange); }
//   .badge .check { font-size: 13px; }

//   /* Alerts Card */
//   .alert-item:last-child { border-bottom: none; }
//   .alert-icon.check { color: var(--teal); }
//   .alert-icon.battery { color: #4A90D9; }

//   @media (max-width: 1100px) {
//     .stat-grid { grid-template-columns: repeat(2, 1fr); }
//     .bottom-grid { grid-template-columns: 1fr; }
//   }
// `;

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
} from '@/components/ui/sidebar';

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
      {/* <style>{styles}</style> */}
      <div className="flex min-h-screen bg-[#EEF7F9] font-sans">
        {/* Sidebar */}
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-3 px-6 pb-8">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-lg text-gray-600">
                  💊
                </div>
                <div>
                  {/* brand-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 18px; line-height: 1.1; } */}
                  <div className="brand-name">LAMSIA</div>
                  {/* brand-sub { color: var(--text-soft); */}
                  <div className="text-xs font-normal mt-2">Smart Medicine Box</div>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <nav className="flex-1 px-3 space-y-1">
                  {navItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all ${
                        activeNav === item.id
                          ? "bg-[#4DD9C0] text-white"
                          : "text-gray-500 hover:bg-[#E8FAF7] hover:text-[#4DD9C0]"
                      }`}
                      onClick={() => setActiveNav(item.id)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </nav>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="mx-4 mb-4 rounded-xl p-4 bg-[#E8FAF7]">
                <div className="text-xs font-semibold mb-3 text-gray-700">Device Status</div>
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <span>📶</span> Terkoneksi
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>🔋</span> 85% Battery
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
        

          {/* Main Content */}
          <main className="flex-1 p-8 lg:p-10 max-h-screen overflow-y-auto">
            <div className="font-bold text-3xl text-gray-900 tracking-tight">Dashboard</div>
            <div className="text-sm text-gray-500 mt-2 mb-8">
              Selamat datang kembali! Berikut adalah tinjauan obat Anda
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#E8FAF7] text-[#4DD9C0]">✓</div>
                <div className="font-bold text-2xl text-gray-900">3/4</div>
                <div className="text-xs text-gray-500 mt-1">Obat yang diambil hari ini</div>
              </div>
              <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#FFF0E6] text-[#F5A623]">⚠</div>
                <div className="font-bold text-2xl text-gray-900">2</div>
                <div className="text-xs text-gray-500 mt-1">Obat terlewat minggu ini</div>
              </div>
              <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-blue-50 text-blue-500">🕐</div>
                <div className="font-bold text-2xl text-gray-900">2 Jam</div>
                <div className="text-xs text-gray-500 mt-1">Obat Selanjutnya</div>
              </div>
              <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#E8FAF7] text-[#4DD9C0]">📈</div>
                <div className="font-bold text-2xl text-gray-900">92%</div>
                <div className="text-xs text-gray-500 mt-1">Rasio Kepatuhan</div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
              {/* Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex w-10 h-10 items-center justify-center bg-[#E8FAF7] text-[#4DD9C0] rounded-xl text-lg">🔗</div>
                  <div className="font-bold text-lg text-gray-900">Jadwal hari ini</div>
                </div>
                {scheduleData.map((item, i) => (
                  <div className={`flex flex-wrap items-center py-3.5 gap-4 ${i !== scheduleData.length - 1 ? "border-b border-gray-100" : ""}`} key={i}>
                    <div className="text-sm text-gray-500 w-24 font-medium">{item.time}</div>
                    <div className="flex-1 text-sm font-semibold text-gray-900">{item.name}</div>
                    <div className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${item.status === 'taken' ? "bg-[#D0F5EE] text-[#1A9E83]" : "bg-[#FFF0E6] text-[#F5A623]"}`}>
                      <span className="text-sm">✓</span>
                      {item.status === "taken" ? "Taken" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex w-10 h-10 items-center justify-center bg-[#FFF0E6] text-[#F5A623] rounded-xl text-lg">🔔</div>
                  <div className="font-bold text-lg text-gray-900">Peringatan Terbaru</div>
                </div>
                <div className="flex flex-col gap-3">
                  {alerts.map((alert, i) => (
                    <div className="p-4 bg-gray-50 rounded-xl" key={i}>
                      <div className="flex items-start gap-3">
                        <span
                          className={`text-lg mt-0.5 ${
                            alert.type === "check"
                              ? "text-[#4DD9C0]"
                              : alert.type === "battery"
                              ? "text-blue-500"
                              : "text-[#F5A623]"
                          }`}
                        >
                          {alert.icon}
                        </span>
                        <div>
                          <div className="text-sm text-gray-900 font-medium leading-snug">{alert.text}</div>
                          <div className="text-xs text-gray-500 mt-1.5">{alert.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}
