import { JadwalHari } from '@/components/jadwalHari.jsx'

const weekDays = [
  {day: "Mon", count: "2/5", active: true},
  {day: "Tue", count: "2/5", active: false},
  {day: "Wed", count: "2/5", active: false},
  {day: "Thu", count: "2/5", active: false},
  {day: "Fri", count: "2/5", active: false},
  {day: "Sat", count: "2/5", active: false},
  {day: "Sun", count: "0/5", active: false},
]

export function JadwalObat() {
  return (
    <div className="flex flex-col gap-6">
      {/* Blok 1: Header & Tombol Tambah */}
      <div className="flex justify-between items-end">
        <div>
          <div className="font-bold text-3xl text-gray-900 tracking-tight">Jadwal Obat</div>
          <div className="text-sm text-gray-500 mt-2 mb-8">
            Kelola dan Lihat Jadwal Obat
          </div>
        </div>

        {/* Tombol Tambah */}
        <button className="flex items-center gap-2 bg-[#2DCDDF] hover:bg-[#25B4C4] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <span className="text-lg">+
            Tambah Obat
          </span>
        </button>
      </div>

      {/* Blok 2: Tab Mingguan/Harian */}
      <div>
        <div className="inline-flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          {/* Tab Mingguan */}
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium bg-[#E8FAF7] text-[#1A9E83] text-sm">
            <span>🗓️</span> Mingguan
          </button>
          {/* Tab Harian */}
          <button className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors text-gray-500 text-sm">
            <span>🕒</span> Harian
          </button>
        </div>
      </div>

      {/* Blok 3: Kalender Pilihan Hari */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="font-semibold text-lg text-gray-900 mb-6">Tanggal 7 April 2026</div>

        <div className="flex justify-between gap-4">
          {weekDays.map((item, index) => (
            <div
              key={index}
              className={`flex flex-1 flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-colors shadow-sm ${
                item.active ? 'bg-[#D0F5EE] border-none' : 'bg-white border text-gray-200'
              }`}
            >
              <span className="font-semibold text-sm">{item.day}</span>
              <span className="text-sm mt-1">{item.count}</span>

              {/* Icon Pil Mini (Statis) */}
              <div className="rounded-full border border-gray-600 mt-2 px-3 py-0.5">
                <div className="rounded-full bg-gray-600 size-1.5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blok Daftar Obat */}
      <JadwalHari/>
    </div>
  )
}