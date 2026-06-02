const alerts = [
  {
    icon: "⚠️",
    type: "warning",
    text: "Terlewat minum obat pada pukul 10:00 pagi hari ini",
    time: "2 jam lalu",
  },
  {
    icon: "🔋",
    type: "battery",
    text: "Level baterai berada di 85%",
    time: "5 jam lalu",
  },
  {
    icon: "✓",
    type: "check",
    text: "Semua obat pagi telah diminum",
    time: "2 jam lalu",
  },
];

export function Alerts() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex w-10 h-10 items-center justify-center bg-[#FFF0E6] text-[#F5A623] rounded-xl text-lg">🔔</div>
        <div className="font-bold text-lg text-gray-900">Peringatan Terbaru</div>
      </div>
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <div className="p-4 bg-gray-50 rounded-xl" key={i}>
            <div className="flex items-start gap-3">
              <span
                className={`text-lg mt-0.5 ${
                  alert.type === "check"
                    ? "text-[#4DD9C0]"
                    : alert.type === "battery"
                    ? "text-blue-500"
                    : "text-[#F5A623]"
                }`}
              >
                {alert.icon}
              </span>
              <div>
                <div className="text-sm text-gray-900 font-medium leading-snug">{alert.text}</div>
                <div className="text-xs text-gray-500 mt-1.5">{alert.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
