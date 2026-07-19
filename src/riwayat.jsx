"use client"

import { useState } from 'react'
import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const description = "A bar chart"

const chartData = [
  { day: "Senin", Diambil: 5, Terlambat: 1 },
  { day: "Selasa", Diambil: 4, Terlambat: 0 },
  { day: "Rabu", Diambil: 2, Terlambat: 2 },
  { day: "Kamis", Diambil: 3, Terlambat: 3 },
  { day: "Jumat", Diambil: 1, Terlambat: 1 },
  { day: "Sabtu", Diambil: 6, Terlambat: 4 },
  { day: "Minggu", Diambil: 4, Terlambat: 3 },
]

const chartConfig = {
  Diambil: {
    label: "Diambil",
    color: "#246BFF"
  },
  Terlambat: {
    label: "Terlambat",
    color: "#EF4444"
  }
}

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

function DatePickerWithRange() {
  const [date, setDate] = useState({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
  })

  return (
    <div className="w-70">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date-picker-range" className="justify-start px-2.5 font-normal">
            <CalendarIcon data-icon="inline-start"/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pilih hari</span>
            )}
          </Button>
        </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
      </Popover>
    </div>
  )
}

function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>Senin - Minggu 2026</CardDescription>
        </div>
        <DatePickerWithRange className="items-center mx-auto"/>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="Diambil" fill="var(--color-Diambil)" radius={4} />
              <Bar dataKey="Terlambat" fill="var(--color-Terlambat)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row items-center mx-auto gap-8 text-sm">
        <div className="flex gap-2 font-medium items-center">
          <div className="size-3 rounded-full bg-[#246BFF]"></div><span>Diambil</span>
        </div>
        <div className="flex gap-2 font-medium items-center">
          <div className="size-3 rounded-lg bg-[#EF4444]"></div><span className="">Terlambat</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function LogTabButtons({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onChange('medication')}
        className={activeTab === 'medication' ? "inline-flex items-center gap-2 rounded-2xl bg-[#246BFF] px-5 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,107,255,0.28)] cursor-pointer" : "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-600 shadow-sm cursor-pointer"}>
        <span>↺</span>
        Medication Log
      </button>
      <button
        onClick={() => onChange('blood-pressure')}
        className={activeTab === 'blood-pressure' ? "inline-flex items-center gap-2 rounded-2xl bg-[#246BFF] px-5 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,107,255,0.28)] cursor-pointer" : "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-600 shadow-sm cursor-pointer"}>
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
            <div className="text-sm text-slate-500">Waktu ambil dan terlambat. Filter berdasarkan tanggal</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" />Taken</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-400" />Delayed</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-400" />Missed</span>
        </div>
      </div>

      <div className="mx-6 mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 items-center">
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-500 w-10">From</div>
            <LocalizationProvider className="m-auto" dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Pilih Tanggal Mulai" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium text-slate-500">To</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Pilih Tanggal Selesai" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex items-center justify-between col-span-2">
            <button className="rounded-xl cursor-pointer lg:mt-6 border border-slate-200 bg-white p-3 font-medium text-slate-500">Reset</button>
            <div className="lg:mt-5 text-sm text-slate-500">Showing 4 days</div>
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
            <div className="text-sm text-slate-500">Filter berdasarkan tanggal</div>
          </div>
        </div>
      </div>

      <div className="mx-6 mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-center">
          <div>
            <div className="text-sm font-medium text-slate-500">From</div>
            <LocalizationProvider className="m-auto" dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Pilih Tanggal Mulai" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">To</div>
            <LocalizationProvider className="m-auto" dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Pilih Tanggal Mulai" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex items-center justify-between col-span-2">
            <button className="rounded-xl cursor-pointer mt-5 border border-slate-200 bg-white px-4 py-3 font-medium text-slate-500">Reset</button>
            <div className="mt-4 text-sm text-slate-500">Showing 8 readings</div>
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
  const [activeTab, setActiveTab] = useState('medication');

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">History</div>
          <div className="mt-3 text-lg text-slate-600">Medication records &amp; health readings</div>
        </div>
      </div>

      <ChartBarMultiple />
      <LogTabButtons
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {
        activeTab === 'medication'
          ? <MedicationLogCard />
          : <BloodPressureLogCard />
      }
    </div>
  );
}