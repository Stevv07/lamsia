import { KartuStatistik } from "@/components/kartuStatistik";
import { ChartKepatuhanBulanan } from "@/components/chart-kepatuhan-bulanan";
import { Alerts } from "@/components/alerts";
import { PageHeader } from "@/components/pageHeader";

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
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali! Berikut adalah tinjauan obat Anda"
      />

      <KartuStatistik statistics={dashboard.statistics}/>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-6 items-start">
        <ChartKepatuhanBulanan data={dashboard.weekly_adherence}/>
        <Alerts alerts={dashboard.latest_alerts}/>
      </div>
    </>
  );
}