import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [namaProgram, setNamaProgram] = useState("");
  const [nilaiProyek, setNilaiProyek] = useState<number | null>(null);
  const [jenisProyek, setJenisProyek] = useState<"fisik" | "nonfisik" | "">("");
  const [durasi, setDurasi] = useState<"1" | "2-3" | ">3" | "">("");
  const [risiko, setRisiko] = useState<"ada" | "tidak" | "">("");
  const [penjamin, setPenjamin] = useState<"ada" | "tidak" | "">("");
  const [hasil, setHasil] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSimulasi = () => {
    let rekomendasi = "TIDAK DIREKOMENDASIKAN ❌";

    if (nilaiProyek === null 
      || namaProgram === ""
      || jenisProyek === ""
      || durasi === ""
      || risiko === ""
      || penjamin === ""
    ) {
    setHasil("Mohon isi semua field terlebih dahulu");
    return;
  }

    if (
      jenisProyek === "fisik" &&
      (durasi === "2-3" || durasi === ">3") &&
      risiko === "ada" &&
      penjamin === "ada" &&
      (nilaiProyek ?? 0) > 10000000000
    ) {
      rekomendasi = "KPBU Direkomendasikan";
      navigate("/kpbu");
      return;
    } else if (
      jenisProyek === "fisik" &&
      (durasi === "1" || durasi === ">3") &&
      risiko === "ada" &&
      penjamin === "tidak" &&
      (nilaiProyek ?? 0) > 10000000000
    ) {
      rekomendasi = "Obligasi / Sukuk Direkomendasikan";
      navigate("/obligasi-sukuk");
      return;
    } else if (
      jenisProyek === "fisik" &&
      ( durasi === "2-3") &&
      risiko === "ada" &&
      penjamin === "tidak" &&
      ((nilaiProyek ?? 0) > 10000000000 && (nilaiProyek ?? 0) < 500000000000)
    ) {
      rekomendasi = "Obligasi / Sukuk atau Pinjaman Daerah Direkomendasikan";
      navigate("/obligasi-sukuk-pinjaman-daerah");
      return;
    } else if (
      jenisProyek === "fisik" &&
      (durasi === "1") &&
      risiko === "ada" &&
      penjamin === "tidak" &&
      (nilaiProyek ?? 0) < 500000000000
    ) {
      rekomendasi = "Pinjaman Daerah Direkomendasikan";
      navigate("/pinjaman-daerah");
      return;
    } else if (
      jenisProyek === "nonfisik" &&
      (durasi === "1" || durasi === "2-3") &&
      risiko === "tidak" &&
      penjamin === "tidak" &&
      (nilaiProyek ?? 0) < 500000000000
    ) {
      rekomendasi = "ZISWAF / Filantropi / CSR Direkomendasikan";
      navigate("/ziswaf-filantropi-csr");
      return;
    }
    else if (
      (jenisProyek === "fisik" || jenisProyek === "nonfisik") &&
      (durasi === ">3") &&
      risiko === "tidak" &&
      penjamin === "tidak" 
    ) {
      rekomendasi = "CSR Direkomendasikan";
      navigate("/csr-lanjutan");
      return;
    }
    else if (
      (jenisProyek === "fisik" || jenisProyek === "nonfisik") &&
      (durasi === "1" || durasi === "2-3") &&
      risiko === "tidak" &&
      penjamin === "tidak" &&
      (nilaiProyek ?? 0) >= 500000000000
    ) {
      rekomendasi = "Filantropi / CSR Direkomendasikan";
      navigate("/filantropi-csr");
      return;
    }  
    else if (
      jenisProyek === "fisik" &&
      (durasi === "1" || durasi === "2-3") &&
      risiko === "tidak" &&
      penjamin === "tidak" &&
      (nilaiProyek ?? 0) < 500000000000
    ) {
      rekomendasi = "Filantropi / CSR Direkomendasikan";
      navigate("/filantropi-csr");
      return;
    }
    setHasil(rekomendasi);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Konten utama */}
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi ini dapat menjadi Pedoman digital (awal) untuk mengetahui kriteria kelayakan pendanaan bersifat non pemerintah" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Simulasi Pendanaan Alternatif
          </h2>

          {/* Card Form Input */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            {/* Nama Program */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                1. Masukkan Nama Program
              </label>
              <input
                type="text"
                placeholder="Contoh: Program Infrastruktur Kota"
                value={namaProgram}
                onChange={(e) => setNamaProgram(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Nilai Proyek */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                2. Masukkan Nilai Proyek (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1,000,000,000"
                value={
                  nilaiProyek !== null && nilaiProyek !== undefined
                    ? `Rp${nilaiProyek.toLocaleString("id-ID")}`
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setNilaiProyek(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Jenis Proyek & Durasi */}
            <div className="grid grid-cols-1  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  3. Jenis Proyek / Program
                </label>
                <select
                  value={jenisProyek}
                  onChange={(e) => setJenisProyek(e.target.value as any)}
                  className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500 Rp400.000.000.000 "
                >
                  <option value="">-- Pilih Jenis Proyek --</option>
                  <option value="fisik">Fisik</option>
                  <option value="nonfisik">Non Fisik (Pemberdayaan masyarakat, penyaluran bantuan pangan, perbaikan lingkungan, penanganan stunting,  dan biaya jasa pendampingan/ layanan sarana prasarana)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  4. Durasi Pelaksanaan Program
                </label>
                <select
                  value={durasi}
                  onChange={(e) => setDurasi(e.target.value as any)}
                  className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Durasi --</option>
                  <option value="1">1 Tahun</option>
                  <option value="2-3">2-3 Tahun</option>
                  <option value=">3">&gt; 3 Tahun</option>
                </select>
              </div>
            </div>

            {/* Risiko & Penjamin */}
            <div className="grid grid-cols-1  gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  5. Risiko Gagal Bayar / Risiko Pendanaan Investasi
                </label>
                <select
                  value={risiko}
                  onChange={(e) => setRisiko(e.target.value as any)}
                  className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Risiko --</option>
                  <option value="tidak">Tidak Ada Risiko</option>
                  <option value="ada">Ada Risiko</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  6. Penjamin Risiko Gagal Bayar
                </label>
                <select
                  value={penjamin}
                  onChange={(e) => setPenjamin(e.target.value as any)}
                  className="w-full border p-2 sm:p-3 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Penjamin --</option>
                  <option value="tidak">Tidak Ada Penjamin</option>
                  <option value="ada">Ada Penjamin</option>
                </select>
              </div>
            </div>

            {/* Tombol */}
            <div className="pt-2">
              <button
                onClick={handleSimulasi}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                  hasil === "TIDAK DIREKOMENDASIKAN ❌"
                    ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                    : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={hasil === "TIDAK DIREKOMENDASIKAN ❌"}            >
                Jalankan Simulasi
              </button>
            </div>
          </div>

          {/* Hasil Simulasi */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Rekomendasi"
                value={hasil}
                highlight
              />

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 w-full lg1100:w-auto"
              >
                Refresh
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
