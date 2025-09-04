import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

// ---- Indikator Risiko Pinjaman Daerah ----
const risikoPinjaman = [
  {
    kategori: "Kapasitas Fiskal Daerah",
    bobot: 25,
    max: 2,
    opsi: [
      { label: "Fiskal sangat lemah, risiko tinggi", value: 0 },
      { label: "Fiskal cukup, risiko sedang", value: 1 },
      { label: "Fiskal kuat, mampu bayar cicilan", value: 2 },
    ],
  },
  {
    kategori: "Durasi & Skema Pinjaman",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Skema tidak jelas, tenor/bunga bermasalah", value: 0 },
      { label: "Ada skema terbatas", value: 1 },
      { label: "Skema jelas (tenor, bunga, grace period)", value: 2 },
    ],
  },
  {
    kategori: "Risiko Pengembalian Investasi",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Proyek tidak menghasilkan manfaat ekonomi", value: 0 },
      { label: "Manfaat terbatas", value: 1 },
      { label: "Manfaat tinggi (ekonomi/fiskal)", value: 2 },
    ],
  },
  {
    kategori: "Legalitas & Kepatuhan Regulasi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak sesuai regulasi", value: 0 },
      { label: "Sebagian sesuai regulasi", value: 1 },
      { label: "Sesuai penuh UU & aturan pinjaman", value: 2 },
    ],
  },
  {
    kategori: "Transparansi & Tata Kelola",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Tidak transparan, tanpa audit", value: 0 },
      { label: "Transparansi terbatas", value: 1 },
      { label: "Transparan & diaudit", value: 2 },
    ],
  },
  {
    kategori: "Dampak Sosial-Ekonomi",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Tidak ada dampak sosial", value: 0 },
      { label: "Ada manfaat terbatas", value: 1 },
      { label: "Dampak tinggi bagi masyarakat", value: 2 },
    ],
  },
];


const PinjamanDaerahLanjutan: React.FC = () => {
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoPinjaman.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);


  // Hitung Risiko
  const handleRisiko = () => {
    let total = 0;
    risikoPinjaman.forEach((item, i) => {
      total += (nilaiRisiko[i] / item.max) * item.bobot;
    });

    let kategori = "Tinggi (Tidak Direkomendasikan ❌)";
    if (total >= 70) kategori = "Rendah (Layak ✅)";
    else if (total >= 50) kategori = "Sedang (Dipertimbangkan ⚠️)";

    setHasilRisiko({ total, kategori });
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Risiko Pinjaman Daerah" />
        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko */}
            <h2 className="text-lg sm:text-xl font-bold">Simulasi Risiko Pinjaman Daerah</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {risikoPinjaman.map((item, i) => (
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
              <button onClick={handleRisiko} className="bg-green-600 text-white w-full sm:w-auto px-4 py-2 rounded lg1100:w-auto">
                Hitung Risiko
              </button>
            </div>

            {hasilRisiko && (
              <div className="space-y-4">
              <DashboardCard
                title="Hasil Risiko Pinjaman Daerah"
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

export default PinjamanDaerahLanjutan;
