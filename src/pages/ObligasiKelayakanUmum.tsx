import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

interface RisikoItem {
  kategori: string;
  bobot: number;
  opsi: { label: string; value: number }[];
  max: number;
}


// ---- Indikator Kelayakan Umum ----
const kelayakanUmum = [
  {
    kategori: "Legalitas & Kepatuhan",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak ada izin / bermasalah hukum", value: 0 },
      { label: "Ada izin tapi belum lengkap", value: 1 },
      { label: "Izin lengkap & tidak bermasalah", value: 2 },
    ],
  },
  {
    kategori: "Keselarasan Program",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak sesuai prioritas pangan", value: 0 },
      { label: "Sebagian sesuai", value: 1 },
      { label: "Sejalan dengan prioritas pangan", value: 2 },
    ],
  },
  {
    kategori: "Finansial",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak ada skema finansial", value: 0 },
      { label: "Ada skema tapi risiko tinggi", value: 1 },
      { label: "Skema jelas & risiko terkendali", value: 2 },
    ],
  },
  {
    kategori: "Tata Kelola",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak transparan, tanpa audit", value: 0 },
      { label: "Transparansi terbatas", value: 1 },
      { label: "Transparan & ada audit", value: 2 },
    ],
  },
  {
    kategori: "Sosial & Lingkungan",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Dampak negatif / tidak jelas", value: 0 },
      { label: "Ada dampak positif terbatas", value: 1 },
      { label: "Dampak positif & berkelanjutan", value: 2 },
    ],
  },
  {
    kategori: "Reputasi & Kredibilitas",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Rekam jejak buruk", value: 0 },
      { label: "Rekam jejak cukup", value: 1 },
      { label: "Track record positif", value: 2 },
    ],
  },
];


const ObligasiLanjutan: React.FC = () => {

  // Kelayakan Umum
  const [nilaiUmum, setNilaiUmum] = useState<number[]>(Array(kelayakanUmum.length).fill(0));
  const [hasilUmum, setHasilUmum] = useState<{ total: number; kategori: string } | null>(null);

  // --- Hitung Kelayakan Umum (maksimal 100) ---
  const handleUmum = () => {
    let total = 0;
    kelayakanUmum.forEach((item, i) => {
      total += (nilaiUmum[i] / item.max) * item.bobot;
    });

    let kategori = "Tidak Layak ❌";
    if (total >= 80) kategori = "Layak Tinggi ✅";
    else if (total >= 60) kategori = "Layak Bersyarat ⚠️";

    setHasilUmum({ total, kategori });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Kelayakan Obligasi" />

        <main className="px-4 sm:px-6 py-6 space-y-6">

          {/* Kelayakan Umum */}
            <h2 className="text-lg sm:text-xl font-bold">Cek Kelayakan Umum Obligasi</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-6">
              {kelayakanUmum.map((item, i) => (
                <div key={i}>
                  <label className="block mb-2">
                    {i + 1}. {item.kategori} 
                  </label>
                  <select
                    value={nilaiUmum[i]}
                    onChange={(e) => {
                      const copy = [...nilaiUmum];
                      copy[i] = Number(e.target.value);
                      setNilaiUmum(copy);
                    }}
                    className="w-full border p-2 rounded"
                  >
                    {item.opsi.map((opsi, idx) => (
                      <option key={idx} value={opsi.value}>
                        {opsi.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={handleUmum}
                className="bg-purple-600 text-white w-full sm:w-auto px-4 py-2 rounded lg1100:w-auto"
              >
                Hitung Kelayakan
              </button>
            </div>

            {hasilUmum && (
              <div className="space-y-4">
                <DashboardCard
                  title="Hasil Kelayakan Umum"
                  value={`Total Skor: ${hasilUmum.total.toFixed(2)} / 100`}
                  subtitle={`Kategori: ${hasilUmum.kategori}`}
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

export default ObligasiLanjutan;
