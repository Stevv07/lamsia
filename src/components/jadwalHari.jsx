export function JadwalHari({ data = [] }) {
  const statusConfig = {
    taken: {
      label: "Taken",
      className: "bg-[#D0F5EE] text-[#1A9E83]",
      icon: "✓",
    },
    pending: {
      label: "Pending",
      className: "bg-[#FFF0E6] text-[#F5A623]",
      icon: "🕒",
    },
    late: {
      label: "Late",
      className: "bg-yellow-100 text-yellow-700",
      icon: "⚠",
    },
    missed: {
      label: "Missed",
      className: "bg-red-100 text-red-600",
      icon: "✕",
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex w-10 h-10 items-center justify-center bg-[#E8FAF7] text-[#4DD9C0] rounded-xl text-lg">
          💊
        </div>

        <div className="font-bold text-lg text-gray-900">
          Jadwal hari ini
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-gray-400">
          Tidak ada jadwal obat pada hari ini.
        </div>
      ) : (
        data.map((item, index) => {
          const status =
            statusConfig[item.status] || statusConfig.pending;

          return (
            <div
              key={item.history_id}
              className={`flex flex-wrap items-center py-3.5 gap-4 ${
                index !== data.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              {/* Jam */}
              <div className="w-24 text-sm font-medium text-gray-500">
                {item.time}
              </div>

              {/* Nama Obat */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">
                  {item.medicine_name}
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {item.dosage} mg
                </div>
              </div>

              {/* Status */}
              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
              >
                <span>{status.icon}</span>
                {status.label}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}