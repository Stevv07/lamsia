import { KartuStatistik } from "@/components/kartuStatistik";
import { JadwalHari } from "@/components/jadwalHari";
import { Alerts } from "@/components/alerts";
import { PageHeader } from "@/components/pageHeader";

export function BerandaDashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali! Berikut adalah tinjauan obat Anda"
      />

      <KartuStatistik />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-6">
        <JadwalHari />
        <Alerts />
      </div>
    </>
  );
}