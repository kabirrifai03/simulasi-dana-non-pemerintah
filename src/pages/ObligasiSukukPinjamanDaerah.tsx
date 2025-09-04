import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const ObligasiSukuk: React.FC = () => {
  const [persetujuan, setPersetujuan] = useState(false);
  const [danaCadangan, setDanaCadangan] = useState<number | null>(null);
  const [jenis, setJenis] = useState("-- Pilih jenis --"); // default sama dengan option
  const [hasil, setHasil] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSimulasi = () => {
    if (jenis === "-- Pilih jenis --") {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }


    if (jenis != "eror") {
      if (jenis === "obligasi-sukuk") {
        navigate("/obligasi-sukuk");
      } else {
        navigate("/pinjaman-daerah");
      }
    } else {
      setHasil("TIDAK DIREKOMENDASIKAN ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Konten utama */}
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Obligasi / Sukuk dan Pinjaman Daerah" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">
            Screening General
          </h2>

          {/* Form Input */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            {/* Jenis pendanaan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Jenis Pendanaan
              </label>
              <select
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="-- Pilih jenis --">-- Pilih jenis --</option>
                <option value="obligasi-sukuk">Obligasi/Sukuk (kepatuhan syariah, dokumen persetujuan, dan dana cadangan yang disiapkan)</option>
                <option value="pinjaman-daerah">Pinjaman Daerah (Input DSCR, tunggakan utang maksimal 5% dari pendapatan asli daerah, dan input dana cadangan pemerintah untuk antisipasi)</option>
                <option value="eror">Bukan keduanya</option>
              </select>
            </div>


            {/* Tombol */}
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
                    ? "Program/ kegiatan saudara, disarankan untuk menggunakan skema pendanaan APBN atau bauran dukungan APBD. Platform ini belum merekomendasikan anda menggunakan pendanaan alternatif nonpemerintah (Obligasi / Sukuk atau Pinjaman Daerah) atau bentuk pendanaan lainnya."
                    : ""
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

export default ObligasiSukuk;
