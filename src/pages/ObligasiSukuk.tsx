import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const ObligasiSukuk: React.FC = () => {
  const [persetujuan, setPersetujuan] = useState(false);
  const [danaCadangan, setDanaCadangan] = useState<number | null>(null);
  const [hasil, setHasil] = useState<string | null>(null);

  const handleSimulasi = () => {
    if (danaCadangan === null) {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }

    let rekomendasi = "REKOMENDASI TIDAK LAYAK ❌ (Obligasi / Sukuk)";

    if (persetujuan && danaCadangan > 0) {
      rekomendasi = "REKOMENDASI LAYAK ✅ (Obligasi / Sukuk)";
    }

    setHasil(rekomendasi);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Konten utama */}
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Obligasi & Sukuk" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">
            Simulasi Kelayakan Obligasi & Sukuk
          </h2>

          {/* Form Input */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
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
              className="bg-blue-600 text-white w-full lg1100:w-auto px-4 py-2 rounded hover:bg-blue-700"
            >
              Jalankan Simulasi
            </button>
          </div>

          {/* Hasil Simulasi */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Rekomendasi"
                value={hasil}
                subtitle="Berdasarkan persetujuan & dana cadangan"
                highlight
              />

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gray-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-gray-600"
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
