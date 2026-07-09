import { Alerts } from "@/components/alerts";
import { ChartKepatuhanBulanan } from "@/components/chart-kepatuhan-bulanan";
import { KartuStatistik } from "@/components/KartuStatistik";

export function Dashboard() {
  return (
    <>
      <div className="font-bold text-3xl text-gray-900 tracking-tight">Dashboard</div>
      <div className="text-sm text-gray-500 mt-2 mb-8">
        Selamat datang kembali! Berikut adalah tinjauan obat Anda
      </div>

      <KartuStatistik />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mt-6 items-start">
        <ChartKepatuhanBulanan />
        <Alerts />
      </div>
    </>
  );
}