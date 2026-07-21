import { useEffect, useState } from "react";
import { JadwalHari } from "@/components/jadwalHari.jsx";
import { PageHeader } from '@/components/pageHeader.jsx';
import { CalendarDays } from "lucide-react";
import { getWeeklySchedule, getDailySchedule } from "@/services/scheduleService";

export function JadwalObat() {
  const today = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState("weekly");

  const [selectedDate, setSelectedDate] = useState(today);
  const [weekData, setWeekData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  // Mengambil data mingguan
  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        // versi lama
        // const data = await getWeeklySchedule(selectedDate);

        // versi baru
        const response = await fetch("http://127.0.0.1:8000/jadwals/");
        const data = await response.json();
        setWeekData(data);
      } catch (error) {
        console.error("Gagal mengambil data mingguan", error);
      }
    };

    fetchWeekly();
  }, [selectedDate]);

  // Mengambil data harian
  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const data = await getDailySchedule(selectedDate);
        setDailyData(data.items);
      } catch (error) {
        console.error("Gagal mengambil data harian", error);
      }
    };

    fetchDaily();
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-6">
      {/* Blok 1: Header */}
      <PageHeader
        title="Jadwal Obat"
        subtitle="Kelola dan Lihat Jadwal Obat"
      />

      {/* Tab */}
      <div>
        <div className="inline-flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          {/* Tab Mingguan */}
          <button
            onClick={() => setActiveTab("weekly")}
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium bg-[#E8FAF7] text-[#1A9E83] text-sm">
            <span>🗓️</span> Mingguan
          </button>
          {/* Tab Harian */}
          <button
            onClick={() => setActiveTab("daily")}
            className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors text-gray-500 text-sm">
            <span>🕒</span> Harian
          </button>
        </div>
      </div>

      {activeTab === "weekly" ? (
        <>
        {/* Kalender Mingguan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="font-semibold text-lg text-gray-900 mb-6">
            {new Date(selectedDate).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="flex justify-between gap-4">
            {weekData.map((item) => {
              const progress =
                item.total === 0
                  ? 0
                  : (item.taken / item.total) * 100;

              const progressColor =
                progress === 100
                  ? "#22C55E"
                  : "#2DCDDF";

              return (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(item.date)}
                  className={`flex flex-1 flex-col items-center justify-center rounded-xl p-3 shadow-sm transition-all cursor-pointer ${
                    selectedDate === item.date
                      ? "bg-[#D0F5EE] border border-[#2DCDDF]"
                      : "bg-white border border-gray-200 hover:border-[#2DCDDF]"
                  }`}
                >
                  {/* Nama Hari */}
                  <span className="font-semibold text-sm text-gray-800">
                    {item.day}
                  </span>

                  {/* Progress Angka */}
                  <span className="text-sm mt-1 text-gray-500">
                    {item.taken}/{item.total}
                  </span>

                  {/* Progress Bar */}
                  <div className="w-full mt-3">
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: progressColor,
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

          {/* Blok Daftar Obat */}
          <JadwalHari data={weekData} />
        </>
      ) :
        // Blok Jadwal Harian
        <div className="bg-white rounded-2xl p-6 shadow-sm h-svh">
            <div className="items-center justify-center flex flex-col gap-2">
              <CalendarDays className="size-20"/>
              <div className="font-semibold text-lg text-gray-900">Senin, 7 April 2026</div>
              <div className="font-medium text-base text-gray-900">Jadwa konsumsi obat hari ini</div>
              <JadwalHari data={dailyData} />
            </div>
        </div> 
      }
    </div>
  )
}
