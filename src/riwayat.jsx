const adherenceBars = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 4 },
  { day: "Thu", value: 5 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 5 },
];

const medicationEntries = [
  {
    time: "08:00 AM",
    title: "Aspirin",
    dose: "100 mg",
    status: "Delayed",
    statusTone: "bg-amber-100 text-amber-700",
    rowTone: "bg-[#FFFDF2] border-amber-200/80",
    note: "Taken at 08:05 AM",
    detail: "5 min late",
    caregiver: "By: Self",
  },
  {
    time: "12:00 PM",
    title: "Metformin",
    dose: "500 mg",
    status: "Taken",
    statusTone: "bg-emerald-100 text-emerald-700",
    rowTone: "bg-[#F4FFFA] border-emerald-200/80",
    note: "Taken at 12:00 PM",
    detail: "On time",
    caregiver: "By: Self",
  },
  {
    time: "02:00 PM",
    title: "Vitamin D",
    dose: "1000 IU",
    status: "Taken",
    statusTone: "bg-emerald-100 text-emerald-700",
    rowTone: "bg-[#F4FFFA] border-emerald-200/80",
    note: "Taken at 02:00 PM",
    detail: "On time",
    caregiver: "By: Siti (daughter)",
  },
];

const bloodPressureCards = [
  { date: "Jun 11", time: "07:30 AM", value: "118 / 76", pulse: "72 bpm", status: "Normal", tone: "bg-emerald-100 text-emerald-700", trend: "↘" },
  { date: "Jun 11", time: "07:30 PM", value: "124 / 80", pulse: "75 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↘" },
  { date: "Jun 10", time: "07:45 AM", value: "132 / 84", pulse: "78 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↗" },
  { date: "Jun 10", time: "08:00 PM", value: "128 / 82", pulse: "74 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↘" },
  { date: "Jun 9", time: "07:30 AM", value: "136 / 86", pulse: "80 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↗" },
  { date: "Jun 9", time: "07:00 PM", value: "130 / 83", pulse: "76 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↗" },
  { date: "Jun 8", time: "07:30 AM", value: "122 / 79", pulse: "70 bpm", status: "Elevated", tone: "bg-yellow-100 text-yellow-700", trend: "↘" },
  { date: "Jun 8", time: "07:00 PM", value: "126 / 81", pulse: "73 bpm", status: "Stage 1", tone: "bg-amber-100 text-amber-700", trend: "↘" },
];

function AdherenceChart() {
  const maxHeight = 96;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-8">
        <div className="font-bold text-2xl text-slate-900">This Week's Adherence</div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-5">
        <div className="h-72">
          <div className="relative h-full">
            <div className="absolute inset-0 grid grid-cols-7 items-end gap-8 px-6 pb-8">
              {adherenceBars.map((item) => (
                <div key={item.day} className="flex h-full flex-col items-center justify-end gap-2">
                  <div
                    className="w-10 rounded-t-md bg-[#EF4444] shadow-[0_8px_20px_rgba(239,68,68,0.18)]"
                    style={{ height: `${(item.value / maxHeight) * 100}%` }}
                  />
                  <div className="text-sm text-slate-400">{item.day}</div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
              {[0, 2, 4, 6, 8].map((tick) => {
                const top = `${100 - (tick / maxHeight) * 100}%`;
                return (
                  <div key={tick} className="absolute left-0 right-0 border-t border-dashed border-slate-200" style={{ top }}>
                    <span className="absolute left-0 -translate-y-1/2 -translate-x-2 text-xs text-slate-400">
                      {tick}
                    </span>
                  </div>
                );
              })}
              <div className="absolute left-6 right-6 bottom-8 border-t border-slate-300" />
              <div className="absolute left-6 top-0 bottom-8 border-l border-slate-300" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-emerald-500" /> Taken</div>
          <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-[#EF4444]" /> Missed</div>
        </div>
      </div>
    </div>
  );
}

function LogTabButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="inline-flex items-center gap-2 rounded-2xl bg-[#246BFF] px-5 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,107,255,0.28)]">
        <span>↺</span>
        Medication Log
      </button>
      <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-600 shadow-sm">
        <span>♡</span>
        Blood Pressure Log
      </button>
    </div>
  );
}

function MedicationLogCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-xl">⟲</div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Detailed Medication Log</div>
            <div className="text-sm text-slate-500">Time taken, delays, and caregiver — filter by date below</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" />Taken</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-400" />Delayed</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-400" />Missed</span>
        </div>
      </div>

      <div className="mx-6 mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 md:grid-cols-[160px_160px_1fr] md:items-center">
          <div>
            <div className="text-sm font-medium text-slate-500">From</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-500">dd/mm/yyyy</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">To</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-500">dd/mm/yyyy</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-500">Reset</button>
            <div className="text-sm text-slate-500">Showing 4 days</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-xl font-bold text-slate-900">Today</div>
              <div className="text-sm text-slate-500">Jun 11, 2026</div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">✓ 3 taken</span>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-600">⊗ 2 missed</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">◔ 1 delayed</span>
            </div>
            <div className="ml-auto text-slate-400">⌃</div>
          </div>

          <div className="mt-4 divide-y divide-amber-200 overflow-hidden rounded-2xl border border-amber-200">
            {medicationEntries.map((entry) => (
              <div key={entry.time} className={`${entry.rowTone} px-4 py-4`}>
                <div className="grid gap-4 md:grid-cols-[120px_1fr_110px] md:items-center">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-2xl">
                      ⟡
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{entry.time}</div>
                      <div className="text-sm text-slate-500">scheduled</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {entry.title} <span className="font-normal text-slate-500">— {entry.dose}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>○ {entry.note}</span>
                      <span>△ {entry.detail}</span>
                      <span>{entry.caregiver}</span>
                    </div>
                  </div>

                  <div className="justify-self-end">
                    <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${entry.statusTone}`}>
                      {entry.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Use this section for the full medication history list if you want the log to continue beyond the visible rows.
        </div>
      </div>
    </div>
  );
}

function BloodPressureLogCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 text-xl">♡</div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Blood Pressure Log</div>
            <div className="text-sm text-slate-500">Filter by date range below</div>
          </div>
        </div>
        <button className="rounded-xl border border-rose-200 px-4 py-3 font-medium text-rose-500">+ Log Reading</button>
      </div>

      <div className="mx-6 mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 md:grid-cols-[160px_160px_1fr] md:items-center">
          <div>
            <div className="text-sm font-medium text-slate-500">From</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-500">dd/mm/yyyy</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">To</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-500">dd/mm/yyyy</div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-500">Reset</button>
            <div className="text-sm text-slate-500">Showing 8 readings</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-3xl border border-rose-100 bg-linear-to-r from-rose-50 to-pink-50 p-6">
          <div className="text-sm text-slate-500">Latest in range · Jun 11 07:30 AM</div>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <div className="text-5xl leading-none">♡</div>
            <div>
              <div className="text-5xl font-bold tracking-tight text-slate-900">
                118 <span className="text-slate-500">/ 76</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-500">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Normal</span>
                <span>↯ 72 bpm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bloodPressureCards.map((card) => (
            <div key={`${card.date}-${card.time}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{card.date}</div>
                  <div className="text-sm text-slate-400">{card.time}</div>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${card.tone}`}>{card.status}</span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="text-3xl font-bold tracking-tight text-slate-900">{card.value}</div>
                <div className="text-xl text-rose-500">{card.trend}</div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>↯ {card.pulse}</span>
                <span className="italic">After rest</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">Normal &lt; 120/80</span>
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">Elevated 120–129 / &lt; 80</span>
          <span className="rounded-full bg-amber-100 px-4 py-2 text-amber-700">Stage 1 130–139 / 80–89</span>
          <span className="rounded-full bg-rose-100 px-4 py-2 text-rose-700">Stage 2 ≥ 140 / ≥ 90</span>
          <span className="rounded-full bg-rose-200 px-4 py-2 text-rose-700">Crisis &gt; 180 / &gt; 120</span>
        </div>
      </div>
    </div>
  );
}

export function RiwayatPage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">History</div>
          <div className="mt-3 text-lg text-slate-600">Medication records &amp; health readings</div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm">
            ⌄ Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-[#246BFF] px-5 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,107,255,0.28)]">
            ⬇ Export Report
          </button>
        </div>
      </div>

      <AdherenceChart />
      <LogTabButtons />
      <MedicationLogCard />
      <LogTabButtons />
      <BloodPressureLogCard />
    </div>
  );
}