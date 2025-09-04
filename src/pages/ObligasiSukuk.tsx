import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const ObligasiSukuk: React.FC = () => {
  const [persetujuan, setPersetujuan] = useState(false);
  const [danaCadangan, setDanaCadangan] = useState<number | null>(null);
  const [jenis, setJenis] = useState(""); // Obligasi atau Sukuk
  const [hasil, setHasil] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSimulasi = () => {
    if (danaCadangan === null || jenis === "") {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }

    if (persetujuan && danaCadangan > 0) {
      if (jenis === "sukuk") {
        navigate("/sukuk-lanjutan");
      } else {
        navigate("/obligasi-lanjutan");
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
        <Header name="Simulasi Obligasi / Sukuk" />

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
                <option value="">Pilih jenis...</option>
                <option value="obligasi">Obligasi (tidak ada kepatuhan syariah)</option>
                <option value="sukuk">Sukuk (ada kepatuhan syariah)</option>
              </select>
            </div>

            {/* Persetujuan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Apakah dokumen persetujuan sudah lengkap?
              </label>
              <select
                value={persetujuan ? "ya" : "tidak"}
                onChange={(e) => setPersetujuan(e.target.value === "ya")}
                className="w-full border p-2 rounded"
              >
                <option value="tidak">Belum Ada Persetujuan</option>
                <option value="ya">
                  Sudah Ada Persetujuan (Menkeu, DPRD, Perda, OJK)
                </option>
              </select>
            </div>

            {/* Dana cadangan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Jumlah Dana Cadangan yang Disiapkan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1,000,000,000"
                value={
                  danaCadangan !== null && danaCadangan !== undefined
                    ? `Rp${danaCadangan.toLocaleString("id-ID")}`
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setDanaCadangan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                Catatan: Dana cadangan harus ada untuk layak.
              </p>
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
                    ? "Program/ kegiatan saudara, disarankan untuk menggunakan skema pendanaan APBN atau bauran dukungan APBD. Platform ini belum merekomendasikan anda menggunakan pendanaan alternatif nonpemerintah (Obligasi / Sukuk) atau bentuk pendanaan lainnya."
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
