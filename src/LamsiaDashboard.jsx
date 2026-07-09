import { KartuStatistik } from "@/components/KartuStatistik";
import { ChartKepatuhanBulanan } from "@/components/chart-kepatuhan-bulanan";
import { Alerts } from "@/components/alerts";

import { useDashboard } from "@/hooks/useDashboard";

export function BerandaDashboard() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  };

  if (error) {
    return (
      <div>Data dashboard tidak ditemukan</div>
    )
  }

  if (!dashboard) {
    return (
      <div>
        Data dashboard tidak tersedia
      </div>
    )
  }

  return (
    <>
      <div className="font-bold text-3xl text-gray-900 tracking-tight">Dashboard</div>
      <div className="text-sm text-gray-500 mt-2 mb-8">
        Selamat datang kembali! Berikut adalah tinjauan obat Anda
      </div>

      <KartuStatistik statistics={dashboard.statistics}/>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-6 items-start">
        <ChartKepatuhanBulanan data={dashboard.weekly_adherence}/>
        <Alerts alerts={dashboard.latest_alerts}/>
      </div>
    </>
  );
}