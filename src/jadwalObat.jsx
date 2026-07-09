import { useEffect, useState } from "react";
import { JadwalHari } from "@/components/jadwalHari.jsx";
import { getWeeklySchedule, getDailySchedule } from "@/services/scheduleService";

export function JadwalObat() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [weekData, setWeekData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  // Mengambil data mingguan
  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const data = await getWeeklySchedule(selectedDate);
        setWeekData(data.week);
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
      {/* Header */}
      <div>
        <div className="font-bold text-3xl text-gray-900 tracking-tight">
          Jadwal Obat
        </div>

        <div className="text-sm text-gray-500 mt-2">
          Kelola dan Lihat Jadwal Obat
        </div>
      </div>

      {/* Tab */}
      <div>
        <div className="inline-flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium bg-[#E8FAF7] text-[#1A9E83] text-sm">
            🗓️ Mingguan
          </button>

          <button className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-gray-500 text-sm">
            🕒 Harian
          </button>
        </div>
      </div>

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

      {/* Jadwal Harian */}
      <JadwalHari data={dailyData} />
    </div>
  );
}