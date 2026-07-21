// ============== //
// IMPORT LIBRARY //
// ============== //
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
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
import { Card } from '@/components/ui/card.jsx';
import {
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Clock,
  Info,
  LayoutList,
  LayoutGrid,
  Pill,
  Plus,
  RefreshCw,
  Trash2,
  Search,
  Package
} from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';

// ================================ //
// KOMPONEN DETAIL UNTUK YANG BARIS //
// ================================ //
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="text-slate-500 min-w-40 md:min-w-60">{label}</span>
      <span className="text-slate-700 font-medium">{value}</span>
    </div>
  )
}

// ================================ //
// KOMPONEN DETAIL UNTUK YANG KARTU //
// ================================ //
function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-700 mt-0.5">{value}</p>
    </div>
  )
}

// ================================================= //
// KOMPONEN UNTUK MENAMPILKAN OBAT DALA BENTUK BARIS //
// ================================================= //
function DaftarObatBaris({ med, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="border-slate-200 overflow-hidden">
      <div className="flex items-center gap-4 p-5">
        <div className={`flex shrink-0 items-center justify-center size-12 rounded-full ${med.color.split(" ")[0]}`}>
          <Pill className={`size-6 ${med.color.split(" ")[1]}`}/>
        </div>
        <div className="flex-1 min-w-0 items-center">
          <div className="flex flex-wrap items-center gap-2 mb-1 text-center">
            <h3 className="font-bold text-slate-800 text-lg leading-tight">
              {med.name}
            </h3>
            <Badge className={`text-xs ${med.color}`}>{med.form}</Badge>
            <Badge variant='outline' className="text-xs text-slate-500">{med.dosage}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Clock className="size-5"/>
              {med.times.join(", ")}
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="size-5"/>
              {med.repeat}
            </span>
            <span className="flex items-center gap-1">
              <Package className="size-5"/>
              Kompartemen {med.kompartemen}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setExpanded((v) => !v)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 5 rounded-lg hover:bg-blue-50 transition-colors">
            {expanded ? <ChevronUp className="size-4"/> : <ChevronDown className="size-4"/>}
            {expanded ? "Less" : "Details"}
          </button>
          <button onClick={() => onDelete(med.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Remove medication">
            <Trash2 className="size-4"/>
          </button>
        </div>
      </div>

      {/* Expanded Details Panel */}
      {expanded && (
        <div className="relative border-slate-100 bg-slate-50 px-2 py-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div className="space-y-3">
            <DetailRow icon={<CalendarDays className="size-4 text-slate-400"/>} label="Start date" value={med.startDate || "-"}/>
            <DetailRow icon={<Clock className="size-4 text-slate-400"/>} label="Duration" value={med.duration || "-"}/>
            <DetailRow icon={<RefreshCw className="size-4 text-slate-400"/>} label="Repeat" value={med.repeat || "-"}/>
            <DetailRow icon={<Package className="size-4 text-slate-400"/>} label="Quantity" value={med.quantity || "-"}/>
          </div>
        </div>
      )}
    </Card>
  )
}

// ================================================== //
// KOMPONEN UNTUK MENAMPILKAN OBAT DALAM BENTUK KARTU //
// ================================================== //
function DaftarObatKartu({ med, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <div className="flex flex-col h-72 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden">
        <div className={`h-2 w-full shrink-0 ${med.color.split(" ")[0]}`} />

        <div className="flex flex-1 flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              {med.name} — Details
            </h3>

            <DetailField label="Prescribed by" value={med.prescribedBy || "-"} />
            <DetailField label="Start date" value={med.startDate || "-"} />
            <DetailField label="Duration" value={med.duration || "-"} />

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                <span>Side effects</span>
              </div>
              <p className="text-sm font-medium text-slate-700 mt-0.5">
                {med.sideEffects || "-"}
              </p>
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200 px-5 py-3">
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ChevronLeft className="size-4" />
              Back to summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-72 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className={`h-2 w-full shrink-0 ${med.color.split(" ")[0]}`} />

      <div className="flex flex-1 flex-col p-5 gap-3 min-h-0">
        <div className="flex items-center gap-3">
          <div className={`flex shrink-0 size-11 rounded-full items-center justify-center ${med.color.split(" ")[0]}`}>
            <Pill className={`size-5 ${med.color.split(" ")[1]}`} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-400 italic truncate">
              {med.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge className={`text-xs ${med.color.split(" ")[0]}`}>
            {med.form}
          </Badge>
          <Badge variant="outline" className="text-xs text-slate-500">
            {med.dosage}
          </Badge>
        </div>

        <div className="space-y-1.5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{med.times.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{med.repeat}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{med.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="size-3.5 text-slate-400"/>
            <span>Kompartemen {med.kompartemen}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="flex flex-1 items-center justify-center py-2.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors gap-1"
        >
          <Info className="size-3.5" /> Full details
        </button>
        <div className="w-px bg-slate-100" />
        <button
          type="button"
          onClick={() => onDelete(med.id)}
          className="flex flex-1 items-center justify-center py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors gap-1"
        >
          <Trash2 className="size-3.5" /> Hapus
        </button>
      </div>
    </div>
  );
}

// =================================================== //
// KOMPONEN UTAMA YANG AKAN DITAMPILKAN DI WEBSITE NYA //
// =================================================== //
export function DataObat() {
  const [meds, setMeds] = useState([]);
  const [usedKompartemen, setUsedKompartemen] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("row");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk input form
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [formType, setFormType] = useState("");
  const [kompartemen, setKompartemen] = useState("")
  const [quantity, setQuantity] = useState("");
  const [pengulangan, setPengulangan] = useState("Every day");
  const [loading, setLoading] = useState(false);

  // State untuk menyimpan waktu
  const [pagiTime, setPagiTime] = useState(null);
  const [siangTime, setSiangTime] = useState(null);
  const [soreTime, setSoreTime] = useState(null);
  const [malamTime, setMalamTime] = useState(null);

  // State untuk fitur search
  const filtered = meds.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data obat ini secara permanen?")

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/medicines/${parseInt(id)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMeds((prev) => prev.filter((m) => m.id !== id));
        alert("Obat berhasil dihapus dari database");
      } else {
        const errorData = await response.json();
        alert(`Gagal menghapus data dari server: ${JSON.stringify(errorData.detail)}`);
      }
    } catch (error) {
      alert("Gagal terhubung ke server backend");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !dosage || !formType || !quantity || !kompartemen) {
      alert("Mohon isi semua field yang diperlukan");
      return;
    }

    setLoading(true);

    // mengumpulkan waktu minum yang diisi pengguna
    const waktu = [];
    if (pagiTime) waktu.push(`${dayjs(pagiTime).format("HH.mm:ss")}`)
    if (siangTime) waktu.push(`${dayjs(siangTime).format("HH.mm:ss")}`)
    if (soreTime) waktu.push(`${dayjs(soreTime).format("HH.mm:ss")}`)
    if (malamTime) waktu.push(`${dayjs(malamTime).format("HH.mm:ss")}`)

    if (waktu.length === 0)
    {
      waktu.push("08:00:00") // Default waktu kalau si pengguna enggak input data waktunya
    }

    const payload = {
      nama_obat: name,
      takaran_obat: formType,
      dosis: parseInt(dosage),
      kompartemen: parseInt(kompartemen),
      pengulangan: pengulangan,
      waktu: waktu,
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/obats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchMeds();

        setIsModalOpen(false);

        setName("");
        setDosage("");
        setFormType("");
        setQuantity("");
        setPengulangan("Setiap Hari");
        setKompartemen("");
        setPagiTime(null);
        setSiangTime(null);
        setSoreTime(null);
        setMalamTime(null);
        alert("Obat baru berhasil disimpan ke database");
      } else {
        const errorData = await response.json();
        alert(`Gagal menyimpan data ke server: ${errorData.detail}`);
      }
    } catch (error) {
      alert("Gagal terhubung ke server backend");
    } finally {
      setLoading(false);
    }
  };

  const fetchMeds = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/obats/");
      if (response.ok) {
        const dataDariBackend = await response.json();

        const mappedMeds = dataDariBackend.map((item) => ({
          id: String(item.id),
          name: item.nama_obat,
          form: item.takaran_obat,
          dosage: `${item.jadwal[0]?.dosis ?? "-"}`,
          quantity: "-",
          kompartemen: item.kompartemen,
          repeat: item.jadwal[0]?.pengulangan ?? "-",
          times: item.jadwal.map(j =>
            j.waktu_minum.substring(0,5)
          ),
          startDate: dayjs().format("YYYY-MM-DD"),
          duration: "Ongoing",
          color: "bg-blue-100 text-blue-700",
        }));

        setMeds(mappedMeds);

        setUsedKompartemen(
          dataDariBackend.map((item) => String(item.kompartemen))
        );
      } else {
        console.error("Gagal mengambil data obat dari server");
      }
    } catch (error) {
      console.error("Terjadi kesalahan koneksi saat mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Daftar Obat"
        subtitle="Kelola dan lihat daftar obat Anda"
      >
        {/* Tombol Tambah */}
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 cursor-pointer rounded-lg bg-[#2DCDDF] hover:bg-[#25B4C4] text-white px-2 py-2.5">
          <Plus className="size-4 mr-2" />
          Tambah Obat
        </button>
      </PageHeader>

      {/* Search and View Icon */}
      <div className="flex items-center gap-3 mb-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate"/>
          <Input
            placeholder="Cari Obat"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
          <button
            onClick={() => setView("row")}
            title="Row view"
            className={`p-2 rouded-md transition-colors ${view === "row" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutList className="size-4" />
          </button>
          <button
            onClick={() => setView("card")}
            title="Card view"
            className={`p-2 rounded-md transition-colors ${view === "card" ? "bg-white shadow text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutGrid className="size-4" />
          </button>
        </div>
      </div>

      {/* Daftar Obat */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Pill className="size-12 mx-auto mb-3 opacity-30"/>
          <p className="text-lg font-medium">Tidak ada obat yang ditemukan</p>
          <p className="text-sm">Coba cari berdasarkan kata kunci yang lain</p>
        </div>
      ) : view === "row" ? (
        <div className="space-y-4">
          {filtered.map((m) => (
            <DaftarObatBaris key={m.id} med={m} onDelete={handleDelete}/>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((m) => (
            <DaftarObatKartu key={m.id} med={m} onDelete={handleDelete} />
          ))}
        </div>
      )}

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Nama Obat
                </label>
                <input
                  type="text"
                  required
                  valie={name}
                  onChange={(e) => setName(e.target.value)}
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
                      required
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      placeholder="Masukkan Dosis"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2DCDDF] focus:border-transparent transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Satuan
                    </label>
                    <Select value={formType} onValueChange={(value) => setFormType(value)}>
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

              {/* Jumlah Obat dan Kompartemen Obat */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Jumlah Obat
                  </label>
                  <input
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Masukkan Jumlah Obat"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2DCDDF] focus:border-transparent transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Kompartemen Obat
                  </label>
                  <Select value={kompartemen} onValueChange={(value) => setKompartemen(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kompartemen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Kompartemen</SelectLabel>
                        <SelectItem
                          value="1"
                          disabled={usedKompartemen.includes("1")}
                        >
                          Kompartemen 1
                        </SelectItem>
                        <SelectItem
                          value="2"
                          disabled={usedKompartemen.includes("2")}
                        >
                          Kompartemen 2
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pengulangan */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Pengulangan
                </label>

                <Select
                  value={pengulangan}
                  onValueChange={setPengulangan}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Every day">
                      Every day
                    </SelectItem>

                    <SelectItem value="2 hari sekali">
                      2 hari sekali
                    </SelectItem>

                    <SelectItem value="3 hari sekali">
                      3 hari sekali
                    </SelectItem>

                    <SelectItem value="Seminggu sekali">
                      Seminggu sekali
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Input waktu minum */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Waktu Minum
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Pagi</span>
                      <TimePicker value={pagiTime} onChange={(newValue) => setPagiTime(newValue)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Siang</span>
                      <TimePicker value={siangTime} onChange={(newValue) => setSiangTime(newValue)}/>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Sore</span>
                      <TimePicker value={soreTime} onChange={(newValue) => setSoreTime(newValue)}/>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-600">Malam</span>
                      <TimePicker value={malamTime} onChange={(newValue) => setMalamTime(newValue)} />
                    </div>
                  </div>
                </LocalizationProvider>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 mt-4 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-4 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-4 border rounded-lg bg-[#2DCDDF] hover:bg-[#25B4C4] text-white text-sm font-medium disabled-opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan Obat"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  )
}
