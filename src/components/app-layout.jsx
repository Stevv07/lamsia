import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

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

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#EEF7F9] font-sans">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
          {/* Main Content */}
          <main className="flex-1 max-h-screen overflow-y-auto">
            <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-[#E2EDF2] bg-[#EEF7F9] px-4 py-3 md:hidden">
              <SidebarTrigger className="size-9 shrink-0" />
              <div className="min-w-0">
                <div className="brand-name text-base leading-tight">LAMSIA</div>
                <div className="text-[10px] text-gray-500">Smart Medicine Box</div>
              </div>
            </header>
            <div className="p-2 md:p-8 lg:p-10">
              <Outlet />
            </div>
          </main>
      </SidebarProvider>
    </div>
  );
}
