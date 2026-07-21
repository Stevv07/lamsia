const BASE_URL = "http://127.0.0.1:8000"

export async function getDashboard() {
  const response = await fetch(`${BASE_URL}/riwayatjadwals/`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data dashboard");
  }

  const data = await response.json();

  return {
    statistics: getStatistics(data),
    weekly_adherence: [],
    latest_alerts: [],
  }
}

function getStatistics(data) {
  const now = new Date();

  const today = now.toISOString().split("T")[0];

  // awal minggu (Senin)
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  let takenToday = 0;
  let totalToday = 0;
  let missedThisWeek = 0;

  let totalHistory = 0;
  let takenHistory = 0;

  let nextMedicine = null;

  data.forEach((schedule) => {
    schedule.riwayatjadwals.forEach((history) => {
      const historyDate = new Date(history.waktu_riwayat);

      totalHistory++;

      if (history.riwayat_konsumsi) {
        takenHistory++;
      }

      // ======================
      // Obat hari ini
      // ======================
      if (history.waktu_riwayat.startsWith(today)) {
        totalToday++;

        if (history.riwayat_konsumsi) {
          takenToday++;
        }
      }

      // ======================
      // Terlewat minggu ini
      // ======================
      if (
        history.is_terlewat &&
        historyDate >= startOfWeek &&
        historyDate <= endOfWeek
      ) {
        missedThisWeek++;
      }
    });

    // ======================
    // Obat selanjutnya
    // ======================
    const [hour, minute] = schedule.waktu_minum.split(":").map(Number);

    const medicineTime = new Date(now);
    medicineTime.setHours(hour, minute, 0, 0);

    if (medicineTime > now) {
      const remainingMinutes = Math.floor(
        (medicineTime - now) / 1000 / 60
      );

      if (
        !nextMedicine ||
        remainingMinutes < nextMedicine.remaining_minutes
      ) {
        nextMedicine = {
          medicine_name: schedule.obat.nama_obat,
          remaining_minutes: remainingMinutes,
          is_finished: false,
        };
      }
    }
  });

  if (!nextMedicine) {
    nextMedicine = {
      is_finished: true,
      remaining_minutes: 0,
    };
  }

  return {
    taken_today: takenToday,

    total_today: totalToday,

    missed_this_week: missedThisWeek,

    next_medicine: nextMedicine,

    adherence: {
      percentage:
        totalHistory === 0
          ? 0
          : Math.round((takenHistory / totalHistory) * 100),
    },
  };
}
