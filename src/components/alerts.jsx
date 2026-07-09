function formatTime(dateString) {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getIconColor(type) {
  switch (type) {
    case "check":
      return "text-[#4DD9C0]";

    case "battery":
      return "text-blue-500";

    case "warning":
      return "text-[#F5A623]";

    default:
      return "text-gray-500";
  }
}

export function Alerts({ alerts = []}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex w-10 h-10 items-center justify-center bg-[#FFF0E6] text-[#F5A623] rounded-xl text-lg">🔔</div>
        <div className="font-bold text-lg text-gray-900">Peringatan Terbaru</div>
      </div>
      <div className="flex flex-col gap-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada peringatan.
          </div>
        ) : (
          alerts.map((alert, i) => (
          <div className="p-4 bg-gray-50 rounded-xl" key={`${alert.type}-${alert.time}`}>
            <div className="flex items-start gap-3">
              <span
                className={`text-lg mt-0.5 ${getIconColor(alert.type)}`}
              >
                {alert.icon}
              </span>
              <div>
                <div className="text-sm text-gray-900 font-medium leading-snug">{alert.text}</div>
                <div className="text-xs text-gray-500 mt-1.5">{alert.time}</div>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}
