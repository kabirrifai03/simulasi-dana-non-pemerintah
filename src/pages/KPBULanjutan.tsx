import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

interface RisikoItem {
  kategori: string;
  bobot: number;
  opsi: { label: string; value: number }[];
  max: number; // nilai maksimum (untuk normalisasi)
}

// ---- Indikator Risiko KPBU ----
const risikoKPBU = [
  {
    kategori: "Kelayakan Finansial Proyek",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak ada IRR/NPV/Payback valid", value: 0 },
      { label: "Ada tapi belum memenuhi standar", value: 1 },
      { label: "IRR, NPV, cashflow jelas & sehat", value: 2 },
    ],
  },
  {
    kategori: "Kapasitas Fiskal Pemerintah",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak ada dukungan fiskal", value: 0 },
      { label: "Ada rencana dukungan terbatas", value: 1 },
      { label: "Ada dukungan fiskal/VGF jelas", value: 2 },
    ],
  },
  {
    kategori: "Kemampuan Mitra Swasta",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Belum ada mitra / rekam jejak buruk", value: 0 },
      { label: "Mitra ada tapi terbatas", value: 1 },
      { label: "Mitra kuat, modal & pengalaman KPBU", value: 2 },
    ],
  },
  {
    kategori: "Legalitas & Regulasi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak sesuai Perpres/aturan sektoral", value: 0 },
      { label: "Sebagian sesuai regulasi", value: 1 },
      { label: "Sesuai penuh regulasi & kontrak", value: 2 },
    ],
  },
  {
    kategori: "Pembagian Risiko (Risk Sharing)",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak ada kejelasan risk sharing", value: 0 },
      { label: "Ada draft alokasi risiko", value: 1 },
      { label: "Risk sharing jelas & disepakati", value: 2 },
    ],
  },
  {
    kategori: "Transparansi & Tata Kelola",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Tidak transparan, tender tertutup", value: 0 },
      { label: "Ada keterbukaan terbatas", value: 1 },
      { label: "Tender terbuka, audit transparan", value: 2 },
    ],
  },
  {
    kategori: "Dampak Sosial-Ekonomi",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Dampak sosial rendah / tidak jelas", value: 0 },
      { label: "Manfaat terbatas bagi sebagian pihak", value: 1 },
      { label: "Dampak tinggi: harga stabil, kerja, akses", value: 2 },
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

const ZiswafRisk: React.FC = () => {
    // Risiko
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoKPBU.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);

  // Kelayakan Umum
  const [nilaiUmum, setNilaiUmum] = useState<number[]>(Array(kelayakanUmum.length).fill(0));
  const [hasilUmum, setHasilUmum] = useState<{ total: number; kategori: string } | null>(null);


    // --- Fungsi Hitung Risiko ---
  const handleRisiko = () => {
    let total = 0;
    risikoKPBU.forEach((item, i) => {
      total += (nilaiRisiko[i] / item.max) * item.bobot;
    });

    let kategori = "Tinggi (Tidak Direkomendasikan ❌)";
    if (total >= 70) kategori = "Rendah (Rekomendasi ✅)";
    else if (total >= 50) kategori = "Sedang (Dipertimbangkan dengan Mitigasi)";

    setHasilRisiko({ total, kategori });
  };

  // --- Fungsi Hitung Kelayakan Umum ---
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
        <Header name="Simulasi Risiko & Kelayakan Pendanaan" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko */}
            <h2 className="text-lg sm:text-xl font-bold">Simulasi Risiko KPBU</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {risikoKPBU.map((item, i) => (
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
                title="Hasil Risiko KPBU"
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

          {/* Kelayakan Umum */}
            <h2 className="text-lg sm:text-xl font-bold">Cek Kelayakan Umum</h2>
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
                value={`Total Skor: ${hasilUmum.total.toFixed(2)} / 100.00`}
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

export default ZiswafRisk;
