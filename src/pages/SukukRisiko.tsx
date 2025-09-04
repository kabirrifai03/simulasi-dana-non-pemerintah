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

// ---- Indikator Risiko Sukuk ----
const risikoSukuk: RisikoItem[] = [
  {
    kategori: "Kapasitas Fiskal Penerbit",
    bobot: 25,
    max: 2,
    opsi: [
      { label: "Rasio utang tinggi, fiskal lemah", value: 0 },
      { label: "Fiskal cukup, risiko sedang", value: 1 },
      { label: "Fiskal kuat, mampu bayar imbal hasil & pokok", value: 2 },
    ],
  },
  {
    kategori: "Legalitas & Regulasi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak sesuai aturan OJK/Kemenkeu", value: 0 },
      { label: "Sebagian sesuai regulasi", value: 1 },
      { label: "Sesuai penuh UU & aturan OJK/Kemenkeu", value: 2 },
    ],
  },
  {
    kategori: "Kepatuhan Syariah",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak sesuai fatwa DSN-MUI", value: 0 },
      { label: "Sebagian sesuai, ada catatan", value: 1 },
      { label: "Akad jelas & sesuai syariah", value: 2 },
    ],
  },
  {
    kategori: "Struktur & Skema Sukuk",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Skema tidak jelas, tenor/imbal hasil tidak pasti", value: 0 },
      { label: "Ada struktur tapi terbatas", value: 1 },
      { label: "Struktur lengkap (akad, tenor, underlying asset)", value: 2 },
    ],
  },
  {
    kategori: "Permintaan Pasar Investor",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak ada minat investor", value: 0 },
      { label: "Minat terbatas, rating rendah", value: 1 },
      { label: "Permintaan tinggi, rating baik", value: 2 },
    ],
  },
  {
    kategori: "Reputasi & Tata Kelola Penerbit",
    bobot: 5,
    max: 2,
    opsi: [
      { label: "Rekam jejak buruk", value: 0 },
      { label: "Cukup, ada audit terbatas", value: 1 },
      { label: "Kredibilitas baik, audit syariah transparan", value: 2 },
    ],
  },
  {
    kategori: "Dampak Sosial-Ekonomi Proyek",
    bobot: 5,
    max: 2,
    opsi: [
      { label: "Tidak ada dampak sosial", value: 0 },
      { label: "Ada manfaat terbatas", value: 1 },
      { label: "Dampak tinggi bagi masyarakat", value: 2 },
    ],
  },
];


const SukukLanjutan: React.FC = () => {
  // Risiko Sukuk
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoSukuk.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);


  // --- Hitung Risiko Sukuk (maksimal 100) ---
  const handleRisiko = () => {
    let total = 0;
    risikoSukuk.forEach((item, i) => {
      total += (nilaiRisiko[i] / item.max) * item.bobot;
    });

    let kategori = "Tinggi (Tidak Direkomendasikan ❌)";
    if (total >= 70) kategori = "Rendah (Layak diterbitkan ✅)";
    else if (total >= 50) kategori = "Sedang (Dipertimbangkan dengan Mitigasi ⚠️)";

    setHasilRisiko({ total, kategori });
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Risiko Sukuk" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko Sukuk */}
            <h2 className="text-lg sm:text-xl font-bold">Simulasi Risiko Sukuk</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {risikoSukuk.map((item, i) => (
                <div key={i}>
                  <label className="block mb-2">
                    {i + 1}. {item.kategori} 
                  </label>
                  <select
                    value={nilaiRisiko[i]}
                    onChange={(e) => {
                      const copy = [...nilaiRisiko];
                      copy[i] = Number(e.target.value);
                      setNilaiRisiko(copy);
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
                onClick={handleRisiko}
                className="bg-green-600 text-white w-full sm:w-auto px-4 py-2 rounded lg1100:w-auto"
              >
                Hitung Risiko
              </button>
            </div>

            {hasilRisiko && (
              <div className="space-y-4">
                <DashboardCard
                  title="Hasil Risiko Sukuk"
                  value={`Total Skor: ${hasilRisiko.total.toFixed(2)} / 100.00`}
                  subtitle={`Kategori: ${hasilRisiko.kategori}`}
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

export default SukukLanjutan;
