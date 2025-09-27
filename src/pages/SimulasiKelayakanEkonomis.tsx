// src/pages/SimulasiKelayakanEkonomis.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

// Aturan BEP sesuai permintaan user
const BEP_RULES: Record<string, { minInvestasi: number; maxBep: number }> = {
  // Usaha Pertanian
  "padi": { minInvestasi: 17000000, maxBep: 6 },
  "jagung": { minInvestasi: 20000000, maxBep: 5 },
  "melon": { minInvestasi: 25000000, maxBep: 4 },
  "kubis": { minInvestasi: 10000000, maxBep: 5 },
  "pisang": { minInvestasi: 2000000, maxBep: 6 },
  "padi organik": { minInvestasi: 8000000, maxBep: 7 },
  "pepaya": { minInvestasi: 40000000, maxBep: 7 },

  // Usaha Peternakan
  "kambing penggemukan": { minInvestasi: 20000000, maxBep: 13 },
  "kambing pembibitan": { minInvestasi: 30000000, maxBep: 20 },
  "lele": { minInvestasi: 4000000, maxBep: 6 },
  "nila": { minInvestasi: 3000000, maxBep: 18 },
  "ayam kampung": { minInvestasi: 4000000, maxBep: 9 },

  // Usaha Perkebunan
  "kopi": { minInvestasi: 100000000, maxBep: 42 },
  "durian": { minInvestasi: 50000000, maxBep: 30 },
  "alpukat": { minInvestasi: 20000000, maxBep: 28 },

  // Usaha Perdagangan
  "sembako": { minInvestasi: 30000000, maxBep: 6 },
  "warung sayur": { minInvestasi: 8000000, maxBep: 3 },
  "kafe shop": { minInvestasi: 200000000, maxBep: 42 },
};

const SimulasiKelayakanEkonomis: React.FC = () => {
  const [investasi, setInvestasi] = useState(0);
  const [pendapatan, setPendapatan] = useState(0);
  const [penyusutan, setPenyusutan] = useState(0);
  const [bep, setBep] = useState(0);
  const [selectedUsaha, setSelectedUsaha] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const formatRupiah = (value: number) =>
    value ? `Rp${value.toLocaleString("id-ID")}` : "";

  const formatNumber = (value: number) => value.toLocaleString("id-ID");

  const parseNumber = (value: string) => {
    const raw = value.replace(/\./g, "");
    return raw ? Number(raw) : 0;
  };

  const handleCekStatus = () => {
    if (!selectedUsaha) {
      setStatus("Silakan pilih jenis usaha terlebih dahulu");
      setDebugInfo(null);
      return;
    }
    if (investasi <= 0) {
      setStatus("Silakan masukkan nilai investasi yang valid");
      setDebugInfo(null);
      return;
    }

    const pendapatanPersen = (pendapatan / investasi) * 100;
    const penyusutanPersen = (penyusutan / investasi) * 100;

    const aturan = BEP_RULES[selectedUsaha];

    if (!aturan) {
      setStatus("Jenis usaha tidak ditemukan dalam aturan BEP");
      return;
    }

    // Debug info
    setDebugInfo(
      `Investasi: ${formatRupiah(investasi)} (Min: ${formatRupiah(
        aturan.minInvestasi
      )}) | Pendapatan: ${formatRupiah(pendapatan)} (${pendapatanPersen.toFixed(
        2
      )}%) | Penyusutan: ${formatRupiah(
        penyusutan
      )} (${penyusutanPersen.toFixed(2)}%) | BEP Input: ${bep} bln | BEP Aturan: ${
        aturan.maxBep
      } bln`
    );

    // Validasi sesuai aturan BEP
    if (investasi < aturan.minInvestasi) {
      setStatus("Investasi tidak memenuhi syarat minimal ❌");
      return;
    }

    if (bep > aturan.maxBep) {
      setStatus("BEP lebih lama dari standar usaha ❌");
      return;
    }

    // --- Status Ekonomi Sehat ---
    if (pendapatanPersen > 75 && penyusutanPersen < 10) {
      setStatus("Status Ekonomi SEHAT ✅");
    }
    // --- Status Ekonomi Cukup Sehat ---
    else if (
      pendapatanPersen >= 5 &&
      pendapatanPersen <= 75 &&
      penyusutanPersen >= 10 &&
      penyusutanPersen <= 30
    ) {
      setStatus("Status Ekonomi CUKUP SEHAT ⚠️");
    }
    // --- Status Tidak Sehat ---
    else {
      setStatus("Status Ekonomi TIDAK SEHAT ❌");
    }
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
            {/* Dropdown Usaha */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Jenis Usaha
              </label>
              <select
                value={selectedUsaha}
                onChange={(e) => setSelectedUsaha(e.target.value)}
                className="w-full border p-3 rounded"
              >
                <option value="">Pilih Jenis Usaha</option>
                {Object.keys(BEP_RULES).map((usaha) => (
                  <option key={usaha} value={usaha}>
                    {usaha.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Investasi */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Nilai Investasi (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1.000.000"
                value={formatRupiah(investasi)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setInvestasi(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Input Pendapatan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Estimasi Pendapatan Bulanan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp500.000"
                value={formatRupiah(pendapatan)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPendapatan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Input Penyusutan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Estimasi Biaya Penyusutan Bulanan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp100.000"
                value={formatRupiah(penyusutan)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPenyusutan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Input BEP */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Asumsi Balik Modal (BEP) (bulan)
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6"
                value={bep === 0 ? "0" : formatNumber(bep)}
                onChange={(e) => setBep(parseNumber(e.target.value))}
                className="w-full border p-3 rounded"
              />
            </div>

            <button
              onClick={handleCekStatus}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                  status === "Silakan pilih jenis usaha terlebih dahulu"
                    ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                    : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={status === "Silakan pilih jenis usaha terlebih dahulu"}            >
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
              {debugInfo && (
                <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
                  {debugInfo}
                </div>
              )}
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
