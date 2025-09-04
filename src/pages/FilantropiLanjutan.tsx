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

const kelayakanIndikator: RisikoItem[] = [
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
  const [nilaiRisiko, setNilaiRisiko] = useState<number[]>(Array(risikoIndikator.length).fill(0));
  const [hasilRisiko, setHasilRisiko] = useState<{ total: number; kategori: string } | null>(null);

  const [nilaiKelayakan, setNilaiKelayakan] = useState<number[]>(Array(kelayakanIndikator.length).fill(0));
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

  const hitungKelayakan = () => {
    let total = 0;
    kelayakanIndikator.forEach((item, i) => {
      total += (nilaiKelayakan[i] / item.max) * item.bobot;
    });

    let kategori = "Tidak Layak ❌";
    if (total >= 80) kategori = "Layak Tinggi ✅";
    else if (total >= 60) kategori = "Layak Bersyarat ⚠️";

    setHasilKelayakan({ total, kategori });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Risiko & Kelayakan Pendanaan" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          {/* Risiko ZISWAF */}
            <h2 className="text-lg sm:text-xl font-bold">Checklist Risiko Filantropi</h2>
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
                className="bg-green-600 text-white px-4 py-2 rounded lg1100:w-auto"
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

          {/* Kelayakan Umum */}
            <h2 className="text-lg sm:text-xl font-bold">Checklist Kriteria Kelayakan Umum</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-6">
              {kelayakanIndikator.map((item, i) => (
                <div key={i}>
                  <label className="block text-gray-700 mb-2 font-medium">
                    {i + 1}. {item.kategori} 
                  </label>
                  <select
                    value={nilaiKelayakan[i]}
                    onChange={(e) => {
                      const copy = [...nilaiKelayakan];
                      copy[i] = parseInt(e.target.value);
                      setNilaiKelayakan(copy);
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
                onClick={hitungKelayakan}
                className="bg-purple-600 text-white w-full sm:w-auto px-4 py-2 rounded lg1100:w-auto"
              >
                Hitung Kelayakan
              </button>
            </div>
            {hasilKelayakan && (
              <div className="space-y-4">
              <DashboardCard
                title="Hasil Simulasi Kelayakan"
                value={`Total Skor: ${hasilKelayakan.total.toFixed(2)} / 100.00`}
                subtitle={`Kategori Kelayakan: ${hasilKelayakan.kategori}`}
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
