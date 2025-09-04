import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

const PinjamanDaerah: React.FC = () => {
  const [dscr, setDscr] = useState<number | null>(null);
  const [tunggakan, setTunggakan] = useState<number | null>(null);
  const [hasil, setHasil] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleSimulasi = () => {
  if (dscr === null || tunggakan === null) {
    setHasil("Mohon isi semua field terlebih dahulu");
    return;
  }


  if (dscr >= 2.5 && tunggakan === 0) {
      navigate("/PinjamanDaerahLanjutan");
    } else {
      setHasil("TIDAK DIREKOMENDASIKAN ❌");
    }
};

return (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    {/* Konten Utama */}
    <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
      <Header name="Simulasi Pinjaman Daerah" />

      <main className="px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-lg sm:text-xl font-bold">
          Screening General
        </h2>

        {/* Form Input */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
          {/* Input DSCR */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Masukkan Angka DSCR (Debt Service Coverage Ratio)
            </label>
            <input
              type="number"
              placeholder="Contoh: 3.0"
              value={dscr ?? ""}
              onChange={(e) => setDscr(parseFloat(e.target.value))}
              className="w-full border p-2 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Catatan: Sesuai PP 56/2018, DSCR minimal 2.5 untuk layak.
            </p>
          </div>

          {/* Input Tunggakan */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Masukkan Jumlah Tunggakan Pinjaman Daerah (Rp)
            </label>
            <input
              type="text"
              placeholder="Contoh: Rp1,000,000,000 atau Rp0"
              value={
                tunggakan !== null && tunggakan !== undefined
                  ? `Rp${tunggakan.toLocaleString("id-ID")}`
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setTunggakan(raw ? Number(raw) : 0);
              }}
              className="w-full border p-2 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Catatan: Jika ada tunggakan, maka tidak layak mengajukan
              pinjaman.
            </p>
          </div>

          {/* Tombol Simulasi */}
          <button
            onClick={handleSimulasi}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                hasil === "TIDAK DIREKOMENDASIKAN ❌"
                  ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                  : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={hasil === "TIDAK DIREKOMENDASIKAN ❌"}            >
            Jalankan Screening General
          </button>
        </div>

        {/* Hasil Simulasi */}
        {hasil && (
          <div className="space-y-4">
            <DashboardCard
              title="Hasil Rekomendasi :"
              value={hasil}
              subtitle={
                hasil.includes("TIDAK DIREKOMENDASIKAN")
                  ? "Program/ kegiatan saudara, disarankan untuk menggunakan skema pendanaan APBN atau bauran dukungan APBD. Platform ini belum merekomendasikan anda menggunakan pendanaan alternatif nonpemerintah (Pinjaman Daerah) atau bentuk pendanaan lainnya"
                  : "Berdasarkan input DSCR & tunggakan"
              }
              highlight
            />
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-gray-600 lg1100:w-auto"
            >
              ← Kembali ke Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  </div>
);
};

export default PinjamanDaerah;
