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
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // helper buat format rupiah
  const formatRupiah = (value: number) =>
    value ? `Rp${value.toLocaleString("id-ID")}` : "";

  const handleCekStatus = () => {
  if (investasi <= 0) {
    setStatus("Silakan masukkan nilai investasi yang valid");
    setDebugInfo(null);
    return;
  }

  const pendapatanPersen = (pendapatan / investasi) * 100;
  const penyusutanPersen = (penyusutan / investasi) * 100;

  // Debug info
  setDebugInfo(
    `Investasi: ${formatRupiah(investasi)} | Pendapatan: ${formatRupiah(
      pendapatan
    )} (${pendapatanPersen.toFixed(2)}%) | Penyusutan: ${formatRupiah(
      penyusutan
    )} (${penyusutanPersen.toFixed(2)}%) | BEP: ${bep} bulan`
  );

  // --- Status Ekonomi Sehat ---
  if (pendapatanPersen > 75 && penyusutanPersen < 10 && bep < 12) {
    setStatus("Status Ekonomi SEHAT ✅");
  }
  // --- Status Ekonomi Cukup Sehat ---
  else if (
    pendapatanPersen >= 5 &&
    pendapatanPersen <= 75 &&
    penyusutanPersen >= 10 &&
    penyusutanPersen <= 30 &&
    bep >= 12 &&
    bep <= 24
  ) {
    setStatus("Status Ekonomi CUKUP SEHAT ⚠️");
  }
  // --- Status Tidak Sehat ---
  else if (pendapatanPersen < 5 || penyusutanPersen > 30 || bep > 24) {
    setStatus("Status Ekonomi TIDAK SEHAT ❌");
  }
  // --- Default ---
  else {
    setStatus("Status tidak dapat ditentukan dengan kriteria yang ada");
  }
};

  // Format angka jadi 1.000 dst (tanpa Rp)
const formatNumber = (value: number) =>
  value.toLocaleString("id-ID");

// Parse string ke angka murni
const parseNumber = (value: string) => {
  const raw = value.replace(/\./g, ""); // hapus titik
  return raw ? Number(raw) : 0;
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
                type="text"
                inputMode="numeric" // biar keyboard angka di HP
                placeholder="6"
                value={bep === 0 ? "0" : formatNumber(bep)}
                onChange={(e) => setBep(parseNumber(e.target.value))}
                className="w-full border p-3 rounded"
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
            <div className="space-y-4">
            <DashboardCard
              title="Hasil Analisis"
              value={status}
              subtitle="Berdasarkan indikator input"
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

export default SimulasiKelayakanEkonomis;
