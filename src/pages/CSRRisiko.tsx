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
    kategori: "Kepatuhan Hukum & Regulasi",
    bobot: 25,
    max: 2,
    opsi: [
      { label: "Tidak sesuai regulasi", value: 0 },
      { label: "Sebagian sesuai", value: 1 },
      { label: "Sesuai regulasi & lengkap", value: 2 },
    ],
  },
  {
    kategori: "Reputasi & Transparansi Perusahaan",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Tidak ada laporan CSR", value: 0 },
      { label: "Ada laporan tapi terbatas", value: 1 },
      { label: "Laporan lengkap & transparan", value: 2 },
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
    kategori: "Keberlanjutan CSR",
    bobot: 15,
    max: 2,
    opsi: [
      { label: "Hanya sekali pakai", value: 0 },
      { label: "Ada rencana terbatas", value: 1 },
      { label: "Dukungan multi-year berkelanjutan", value: 2 },
    ],
  },
  {
    kategori: "Konflik Kepentingan / Branding",
    bobot: 20,
    max: 2,
    opsi: [
      { label: "Hanya promosi bisnis", value: 0 },
      { label: "Sebagian promosi, ada manfaat publik", value: 1 },
      { label: "Murni manfaat publik", value: 2 },
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
        <Header name="Simulasi Risiko Pendanaan CSR" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko ZISWAF */}
            <h2 className="text-lg sm:text-xl font-bold">Checklist Risiko CSR</h2>
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
