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

// ---- Indikator Risiko Obligasi ----
const risikoObligasi: RisikoItem[] = [
  {
    kategori: "Kapasitas Fiskal Penerbit",
    bobot: 25,
    max: 2,
    opsi: [
      { label: "Fiskal sangat lemah, risiko tinggi", value: 0 },
      { label: "Fiskal cukup, risiko sedang", value: 1 },
      { label: "Fiskal kuat, mampu bayar bunga & pokok", value: 2 },
    ],
  },
  {
    kategori: "Legalitas & Regulasi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak sesuai aturan OJK/Kemenkeu", value: 0 },
      { label: "Sebagian sesuai regulasi", value: 1 },
      { label: "Sesuai penuh UU & aturan pasar modal", value: 2 },
    ],
  },
  {
    kategori: "Struktur & Skema Obligasi",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Struktur tidak jelas, tenor/bunga bermasalah", value: 0 },
      { label: "Ada struktur tapi terbatas", value: 1 },
      { label: "Struktur lengkap (tenor, kupon, mekanisme pelunasan)", value: 2 },
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
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Rekam jejak buruk", value: 0 },
      { label: "Cukup baik, audit terbatas", value: 1 },
      { label: "Reputasi baik, audit transparan", value: 2 },
    ],
  },
  {
    kategori: "Dampak Sosial-Ekonomi Proyek",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Tidak ada dampak sosial", value: 0 },
      { label: "Ada manfaat terbatas", value: 1 },
      { label: "Dampak tinggi bagi masyarakat", value: 2 },
    ],
  },
];

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
  // Risiko Obligasi
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoObligasi.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);

  // Kelayakan Umum
  const [nilaiUmum, setNilaiUmum] = useState<number[]>(Array(kelayakanUmum.length).fill(0));
  const [hasilUmum, setHasilUmum] = useState<{ total: number; kategori: string } | null>(null);

  // --- Hitung Risiko Obligasi (maksimal 100) ---
  const handleRisiko = () => {
    let total = 0;
    risikoObligasi.forEach((item, i) => {
      total += (nilaiRisiko[i] / item.max) * item.bobot;
    });

    let kategori = "Tinggi (Tidak Direkomendasikan ❌)";
    if (total >= 70) kategori = "Rendah (Layak diterbitkan ✅)";
    else if (total >= 50) kategori = "Sedang (Dipertimbangkan dengan Mitigasi ⚠️)";

    setHasilRisiko({ total, kategori });
  };

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
        <Header name="Simulasi Risiko & Kelayakan Obligasi" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko Obligasi */}
            <h2 className="text-lg sm:text-xl font-bold">Simulasi Risiko Obligasi</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {risikoObligasi.map((item, i) => (
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
                className="bg-green-600 text-white px-4 py-2 rounded lg1100:w-auto"
              >
                Hitung Risiko
              </button>
            </div>

            {hasilRisiko && (
              <div className="space-y-4">
                <DashboardCard
                  title="Hasil Risiko Obligasi"
                  value={`Total Skor: ${hasilRisiko.total.toFixed(2)} / 100`}
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
