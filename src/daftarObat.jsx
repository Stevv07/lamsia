import dayjs from 'dayjs';
import { useState } from 'react';
import { PageHeader } from '@/components/pageHeader';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DaftarObat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Daftar Obat"
        subtitle="Kelola dan lihat daftar obat Anda"
      >
        {/* Tombol Tambah */}
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-[#2DCDDF] hover:bg-[#25B4C4] text-white px-5 py-2.5">
          <span className="text-lg">+</span> Tambah Obat
        </button>
      </PageHeader>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full rounded-2xl max-w-md p-6 shadow-xl bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tambah Obat Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                X
              </button>
            </div>
            {/* Field Untuk Data Obat nya */}
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Nama Obat
                </label>
                <input
                  type="text"
                  placeholder="Silahkan Masukkan Nama Obat"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2DCDDF] focus:border-transparent transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Dosis Obat
                    </label>
                    <input
                      type="number"
                      placeholder="Masukkan Dosis"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2DCDDF] focus:border-transparent transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Satuan
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Satuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Satuan</SelectLabel>
                          <SelectItem value="tablet">Tablet</SelectItem>
                          <SelectItem value="kapsul">Kapsul</SelectItem>
                          <SelectItem value="mg">mg</SelectItem>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="sendok">Sendok Takar</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Waktu Minum
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Pagi</span>
                      <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Siang</span>
                      <TimePicker />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Sore</span>
                      <TimePicker />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Malam</span>
                      <TimePicker />
                    </div>
                  </div>
                </LocalizationProvider>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}