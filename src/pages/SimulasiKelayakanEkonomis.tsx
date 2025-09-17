// src/pages/SimulasiKelayakanEkonomis.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const SimulasiKelayakanEkonomis: React.FC = () => {
  const [investasi, setInvestasi] = useState(0);
  const [pendapatan, setPendapatan] = useState(0);
  const [penyusutan, setPenyusutan] = useState(0);
  const [bep, setBep] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  // helper buat format rupiah
  const formatRupiah = (value: number) =>
    value ? `Rp${value.toLocaleString("id-ID")}` : "";

  const handleCekStatus = () => {
    if (investasi <= 0) {
      setStatus("Silakan masukkan nilai investasi yang valid");
      return;
    }

    const pendapatanPersen = (pendapatan / investasi) * 100;
    const penyusutanPersen = (penyusutan / investasi) * 100;

    // --- Status Ekonomi Sehat ---
    if (
      investasi <= 500_000_000 &&
      bep >= 5 &&
      bep <= 8 &&
      penyusutanPersen >= 3 &&
      penyusutanPersen <= 5 &&
      pendapatanPersen >= 60
    ) {
      setStatus("Status Ekonomi SEHAT ✅");
      return;
    }

    // --- Status Ekonomi Cukup Sehat ---
    if (
      investasi < 2_000_000_000 &&
      bep >= 9 &&
      bep <= 12 &&
      penyusutanPersen >= 6 &&
      penyusutanPersen <= 10 &&
      pendapatanPersen >= 20 &&
      pendapatanPersen <= 50
    ) {
      setStatus("Status Ekonomi CUKUP SEHAT, Dipertimbangkan ⚠️");
      return;
    }

    // --- Status Tidak Sehat ---
    if (
      investasi > 2_000_000_000 ||
      pendapatanPersen < 10 ||
      bep > 12 ||
      penyusutanPersen > 10
    ) {
      setStatus("Status Ekonomi TIDAK SEHAT ❌");
      return;
    }

    // --- Default ---
    setStatus("Status tidak dapat ditentukan dengan kriteria yang ada");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Cek Status Ekonomis Program" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">
            Simulasi Kelayakan Ekonomis
          </h2>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            {/* Nilai Investasi */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Nilai Investasi (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1.000.000.000"
                value={formatRupiah(investasi)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setInvestasi(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Pendapatan Bulanan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Estimasi Pendapatan Bulanan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp300.000.000"
                value={formatRupiah(pendapatan)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPendapatan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Penyusutan Bulanan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Estimasi Biaya Penyusutan Bulanan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp15.000.000"
                value={formatRupiah(penyusutan)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPenyusutan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BEP */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Asumsi Balik Modal (BEP) (bulan)
              </label>
              <input
                type="number"
                value={bep}
                onChange={(e) => setBep(Number(e.target.value))}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleCekStatus}
              className="bg-blue-600 text-white w-full sm:w-auto px-4 py-2 rounded"
            >
              Cek Status Ekonomis
            </button>
          </div>

          {status && (
            <DashboardCard
              title="Hasil Analisis"
              value={status}
              subtitle="Berdasarkan indikator input"
              highlight
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SimulasiKelayakanEkonomis;
