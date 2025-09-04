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

const risikoIndikator: RisikoItem[] = [
  {
    kategori: "Kepatuhan Syariah",
    bobot: 25,
    max: 2,
    opsi: [
      { label: "Tidak sesuai prinsip syariah", value: 0 },
      { label: "Sebagian sesuai, ada catatan", value: 1 },
      { label: "Sesuai fatwa DSN-MUI & syariah", value: 2 },
    ],
  },
  {
    kategori: "Legalitas & Regulasi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Tidak terdaftar resmi", value: 0 },
      { label: "Dokumen sebagian ada", value: 1 },
      { label: "Terdaftar resmi (BAZNAS/Kemenag/BWI/OJK)", value: 2 },
    ],
  },
  {
    kategori: "Transparansi & Akuntabilitas",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak ada laporan keuangan", value: 0 },
      { label: "Laporan ada tapi tidak diaudit", value: 1 },
      { label: "Laporan audited & transparan", value: 2 },
    ],
  },
  {
    kategori: "Keberlanjutan Program",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Hanya sekali pakai", value: 0 },
      { label: "Ada rencana jangka menengah", value: 1 },
      { label: "Program berkelanjutan (wakaf produktif/pemberdayaan)", value: 2 },
    ],
  },
  {
    kategori: "Dampak Sosial-Ekonomi",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Manfaat rendah/tidak jelas", value: 0 },
      { label: "Manfaat sedang untuk sebagian penerima", value: 1 },
      { label: "Dampak tinggi bagi mustahik/UMKM/petani kecil", value: 2 },
    ],
  },
  {
    kategori: "Reputasi Lembaga Pengelola",
    bobot: 10,
    max: 2,
    opsi: [
      { label: "Reputasi buruk, pernah bermasalah", value: 0 },
      { label: "Reputasi cukup, kredibilitas terbatas", value: 1 },
      { label: "Kredibilitas sangat baik (LAZ/UPZ/Nadzir terpercaya)", value: 2 },
    ],
  },
];


const ZiswafRisk: React.FC = () => {
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoIndikator.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);

  const [hasilKelayakan, setHasilKelayakan] = useState<{ total: number; kategori: string } | null>(null);

  const hitungRisiko = () => {
    let total = 0;
    risikoIndikator.forEach((item, i) => {
      total += (nilaiRisiko[i] / item.max) * item.bobot;
    });

    let kategori = "Tinggi (Tidak Direkomendasikan ❌)";
    if (total >= 70) kategori = "Rendah (Rekomendasi ✅)";
    else if (total >= 50) kategori = "Sedang (Dipertimbangkan dengan Mitigasi)";

    setHasilRisiko({ total, kategori });
  };



  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Risiko Pendanaan ZISWAF" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko ZISWAF */}
            <h2 className="text-lg sm:text-xl font-bold">Checklist Risiko ZISWAF</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
              {risikoIndikator.map((item, i) => (
                <div key={i}>
                  <label className="block text-gray-700 mb-2 font-medium">
                    {i + 1}. {item.kategori} 
                  </label>
                  <select
                    value={nilaiRisiko[i]}
                    onChange={(e) => {
                      const copy = [...nilaiRisiko];
                      copy[i] = parseInt(e.target.value);
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
                onClick={hitungRisiko}
                className="bg-green-600 text-white w-full sm:w-auto px-4 py-2 rounded lg1100:w-auto"
              >
                Hitung Risiko
              </button>
            </div>
            {hasilRisiko && (
                            <div className="space-y-4">

              <DashboardCard
                title="Hasil Simulasi Risiko"
                value={`Total Skor: ${hasilRisiko.total.toFixed(2)} / 100.00`}
                subtitle={`Kategori Risiko: ${hasilRisiko.kategori}`}
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

export default ZiswafRisk;
