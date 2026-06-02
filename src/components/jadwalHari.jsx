const scheduleData = [
  { time: "08:00 AM", name: "Aspirin 100mg", status: "taken" },
  { time: "12:00 PM", name: "Metformin 500mg", status: "taken" },
  { time: "02:00 PM", name: "Vitamin D", status: "taken" },
  { time: "06:00 PM", name: "Lisinopril 10mg", status: "taken" },
  { time: "10:00 PM", name: "Atorvastatin 20mg", status: "taken" },
];

export function JadwalHari() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex w-10 h-10 items-center justify-center bg-[#E8FAF7] text-[#4DD9C0] rounded-xl text-lg">🔗</div>
        <div className="font-bold text-lg text-gray-900">Jadwal hari ini</div>
      </div>
      {scheduleData.map((item, i) => (
        <div className={`flex flex-wrap items-center py-3.5 gap-4 ${i !== scheduleData.length - 1 ? "border-b border-gray-100" : ""}`} key={i}>
          <div className="text-sm text-gray-500 w-24 font-medium">{item.time}</div>
          <div className="flex-1 text-sm font-semibold text-gray-900">{item.name}</div>
          <div className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold ${item.status === 'taken' ? "bg-[#D0F5EE] text-[#1A9E83]" : "bg-[#FFF0E6] text-[#F5A623]"}`}>
            <span className="text-sm">✓</span>
            {item.status === "taken" ? "Taken" : "Pending"}
          </div>
        </div>
      ))}
    </div>
  )
}