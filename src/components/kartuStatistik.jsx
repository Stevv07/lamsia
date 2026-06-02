export function KartuStatistik() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
        <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#E8FAF7] text-[#4DD9C0]">✓</div>
        <div className="font-bold text-2xl text-gray-900">3/4</div>
        <div className="text-xs text-gray-500 mt-1">Obat yang diambil hari ini</div>
      </div>
      <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
        <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#FFF0E6] text-[#F5A623]">⚠</div>
        <div className="font-bold text-2xl text-gray-900">2</div>
        <div className="text-xs text-gray-500 mt-1">Obat terlewat minggu ini</div>
      </div>
      <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
        <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-blue-50 text-blue-500">🕐</div>
        <div className="font-bold text-2xl text-gray-900">2 Jam</div>
        <div className="text-xs text-gray-500 mt-1">Obat Selanjutnya</div>
      </div>
      <div className="rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
        <div className="flex w-12 h-12 rounded-xl items-center justify-center text-xl mb-4 bg-[#E8FAF7] text-[#4DD9C0]">📈</div>
        <div className="font-bold text-2xl text-gray-900">92%</div>
        <div className="text-xs text-gray-500 mt-1">Rasio Kepatuhan</div>
      </div>
    </div>
  )
}