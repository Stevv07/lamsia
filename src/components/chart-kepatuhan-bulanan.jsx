const weeklyData = [
  { label: "Week 1", value: 88, tone: "text-[#F28C00]" },
  { label: "Week 2", value: 92, tone: "text-[#16A34A]" },
  { label: "Week 3", value: 85, tone: "text-[#F28C00]" },
  { label: "Week 4", value: 94, tone: "text-[#16A34A]" },
];

const chartWidth = 720;
const chartHeight = 220;
const padding = { top: 20, right: 12, bottom: 20, left: 44 };
const minValue = 70;
const maxValue = 100;

function valueToY(value) {
  const usableHeight = chartHeight - padding.top - padding.bottom;
  const normalized = (value - minValue) / (maxValue - minValue);
  return chartHeight - padding.bottom - normalized * usableHeight;
}

function pointList(values) {
  const step = (chartWidth - padding.left - padding.right) / (values.length - 1);

  return values
    .map((value, index) => {
      const x = padding.left + step * index;
      const y = valueToY(value);
      return `${x},${y}`;
    })
    .join(" ");
}

export function ChartKepatuhanBulanan() {
  const pathValues = weeklyData.map((item) => item.value);
  const points = pointList(pathValues);
  const targetY = valueToY(90);
  const chartStep = (chartWidth - padding.left - padding.right) / (weeklyData.length - 1);

  const areaPath = `M ${padding.left} ${chartHeight - padding.bottom} L ${points} L ${chartWidth - padding.right} ${chartHeight - padding.bottom} Z`;
  const linePath = `M ${padding.left} ${valueToY(pathValues[0])} ${pathValues
    .slice(1)
    .map((value, index) => {
      const x = padding.left + chartStep * (index + 1);
      const y = valueToY(value);
      return `L ${x} ${y}`;
    })
    .join(" ")}`;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2F6BFF] text-xl shadow-[0_8px_24px_rgba(47,107,255,0.12)]">
            ↗
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[22px] text-slate-900 tracking-tight leading-tight">
              Monthly Adherence Trend
            </div>
            <div className="text-sm text-slate-500 mt-1">
              June 2026 · weekly breakdown
            </div>
          </div>
        </div>

        <div className="shrink-0 rounded-full bg-[#E9F0FF] px-4 py-1.5 text-sm font-semibold text-[#2F6BFF]">
          Avg 89.75%
        </div>
      </div>

      <div className="relative rounded-3xl bg-linear-to-b from-white to-slate-50/60 overflow-hidden">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-70 block" role="img" aria-label="Monthly adherence chart">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[70, 78, 86, 94, 100].map((value) => {
            const y = valueToY(value);
            const isTop = value === 100;
            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={y}
                  y2={y}
                  stroke={isTop ? "#CBD5E1" : "#E2E8F0"}
                  strokeDasharray={isTop ? "4 5" : "5 5"}
                />
                <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-slate-400 text-[11px] font-medium">
                  {value}%
                </text>
              </g>
            );
          })}

          {[0, 1, 2, 3].map((index) => {
            const x = padding.left + ((chartWidth - padding.left - padding.right) / 3) * index;
            return (
              <line
                key={index}
                x1={x}
                x2={x}
                y1={padding.top}
                y2={chartHeight - padding.bottom}
                stroke="#E2E8F0"
                strokeDasharray="5 5"
              />
            );
          })}

          <line
            x1={padding.left}
            x2={chartWidth - padding.right}
            y1={targetY}
            y2={targetY}
            stroke="#10B981"
            strokeDasharray="6 6"
            strokeWidth="1.5"
          />
          <text x={chartWidth - 18} y={targetY - 8} textAnchor="end" className="fill-emerald-500 text-[11px] font-semibold">
            Target 90%
          </text>

          <path d={areaPath} fill="url(#chartFill)" />
          <path d={linePath} fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {pathValues.map((value, index) => {
            const x = padding.left + chartStep * index;
            const y = valueToY(value);
            return (
              <g key={weeklyData[index].label}>
                <circle cx={x} cy={y} r="8" fill="#3B82F6" opacity="0.18" />
                <circle cx={x} cy={y} r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="3" />
              </g>
            );
          })}

          {weeklyData.map((item, index) => {
            const x = padding.left + chartStep * index;
            return (
              <text key={item.label} x={x} y={chartHeight - 2} textAnchor="middle" className="fill-slate-400 text-[11px] font-medium">
                {item.label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
        {weeklyData.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className={`mt-2 text-[22px] font-bold tracking-tight ${item.tone}`}>{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
