import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { path: "/", label: "Dashboard", icon: "⊞" },
  { path: "/jadwal", label: "Jadwal", icon: "📅" },
  { path: "/obat", label: "Obat", icon: "💊" },
  { path: "/riwayat", label: "Riwayat", icon: "🕐" },
];

function isNavActive(pathname, path) {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

export function AppSidebar() {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="size-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-lg text-gray-600">
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
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all ${
                  isNavActive(pathname, item.path)
                    ? "bg-[#4DD9C0] text-white"
                    : "text-gray-500 hover:bg-[#E8FAF7] hover:text-[#4DD9C0]"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
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
  )
}