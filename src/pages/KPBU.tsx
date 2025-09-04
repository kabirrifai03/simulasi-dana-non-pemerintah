import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";


const KPBU: React.FC = () => {
  // Screening General
  const [npv, setNpv] = useState<number | null>(null);
  const [danaCadangan, setdanaCadangan] = useState<number | null>(null);
  const [pekerja, setPekerja] = useState<number | null>(null);
  const [dokumenLengkap, setDokumenLengkap] = useState(false);
  const [lahanClear, setLahanClear] = useState(false);
  const [danaCadanganRaw, setDanaCadanganRaw] = useState("");
  const [npvRaw, setNpvRaw] = useState("");
  const [hasilScreening, setHasilScreening] = useState<string | null>(null);
  const navigate = useNavigate();

  // --- Fungsi Screening General ---
  const handleScreening = () => {
    if (npv === null || pekerja === null || danaCadangan === null) {
      setHasilScreening("Mohon isi semua field terlebih dahulu");
      return;
    }

    if (npv > 0 && pekerja >= 1000 && dokumenLengkap && lahanClear && danaCadangan > 0) {
      navigate("/kpbulanjutan");
    } else {
      setHasilScreening("TIDAK DIREKOMENDASIKAN ❌");
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi KPBU" />
        <main className="px-4 sm:px-6 py-6 space-y-6">
         <h2 className="text-lg sm:text-xl font-bold">Screening General</h2>
          {/* Screening General */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {/* NPV */}
              <div>
                <label className="block font-medium">NPV (Net Present Value)</label>
                <input
                  type="text"
                  placeholder="Contoh: Rp1,000,000,000 atau -Rp500,000,000"
                  value={npvRaw}
                  onChange={(e) => {
                    let raw = e.target.value;
                    let cleaned = raw.replace(/[^0-9-]/g, "");
                    if (cleaned === "") {
                      setNpvRaw("");
                      setNpv(null);
                    } else {
                      const num = Number(cleaned);
                      const formatted =
                        num < 0
                          ? `-Rp${Math.abs(num).toLocaleString("id-ID")}`
                          : `Rp${num.toLocaleString("id-ID")}`;
                      setNpvRaw(formatted);
                      setNpv(num);
                    }
                  }}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Jumlah Serapan Pekerja</label>
                <input
                  type="number"
                  placeholder="Minimal 1000 orang"
                  value={pekerja ?? ""}
                  onChange={(e) => setPekerja(Number(e.target.value))}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Dokumen Perizinan (AMDAL, PBG, KKPR)</label>
                <select
                  value={dokumenLengkap ? "ya" : "tidak"}
                  onChange={(e) => setDokumenLengkap(e.target.value === "ya")}
                  className="w-full border p-2 rounded"
                >
                  <option value="tidak">Belum Lengkap</option>
                  <option value="ya">Sudah Lengkap</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Status Pengadaan Tanah</label>
                <select
                  value={lahanClear ? "ya" : "tidak"}
                  onChange={(e) => setLahanClear(e.target.value === "ya")}
                  className="w-full border p-2 rounded"
                >
                  <option value="tidak">Belum Clear</option>
                  <option value="ya">Sudah 100% Clear</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Jumlah Dana Cadangan (Rp)</label>
                <input
                  type="text"
                  placeholder="Contoh: Rp1,000,000,000 atau Rp0"
                  value={danaCadanganRaw}
                  onChange={(e) => {
                    let raw = e.target.value;
                    let cleaned = raw.replace(/[^0-9-]/g, "");
                    if (cleaned === "") {
                      setDanaCadanganRaw("");
                      setdanaCadangan(null);
                    } else {
                      const num = Number(cleaned);
                      const formatted =
                        num < 0
                          ? `-Rp${Math.abs(num).toLocaleString("id-ID")}`
                          : `Rp${num.toLocaleString("id-ID")}`;
                      setDanaCadanganRaw(formatted);
                      setdanaCadangan(num);
                    }
                  }}
                  className="w-full border p-2 rounded"
                />
              </div>

              <button
                onClick={handleScreening}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                hasilScreening === "TIDAK DIREKOMENDASIKAN ❌"
                  ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                  : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={hasilScreening === "TIDAK DIREKOMENDASIKAN ❌"}            >
                Jalankan Screening General
              </button>
            </div>

            {hasilScreening && (
              <div className="space-y-4">
              <DashboardCard 
              title="Hasil Screening" 
              value={hasilScreening} 
              subtitle={
                hasilScreening.includes("TIDAK DIREKOMENDASIKAN")
                  ? "Program/ kegiatan saudara, disarankan untuk menggunakan skema pendanaan APBN atau bauran dukungan APBD. Platform ini belum merekomendasikan anda menggunakan pendanaan alternatif nonpemerintah (KPBU) atau bentuk pendanaan lainnya"
                  : "Berdasarkan input NPV, Jumlah Serapan Kerja, dll"
              }
              highlight />
                            <button
              onClick={() => (window.location.href = "/kpbu")}
              className="bg-gray-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-gray-600"
            >
              Refresh
            </button>
            </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default KPBU;
