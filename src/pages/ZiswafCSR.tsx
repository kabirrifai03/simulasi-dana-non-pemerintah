import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const ZiswafCSR: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Konten Utama */}
      <div className="ml-0 md:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi ZISWAF / CSR" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">
            Simulasi Pendanaan ZISWAF / CSR
          </h2>

          {/* Info + Hasil Simulasi */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Skema <strong>ZISWAF / CSR / Filantropi</strong> direkomendasikan
              untuk proyek <strong>non-fisik</strong> dengan risiko rendah
              (tidak ada risiko gagal bayar), tanpa penjamin, dan nilai proyek
              kurang dari <strong>500 Miliar</strong>.
            </p>

            <DashboardCard
              title="Hasil Rekomendasi"
              value="REKOMENDASI LAYAK ✅ (ZISWAF / CSR)"
              subtitle="Skema filantropi & CSR cocok untuk proyek non-fisik skala kecil - menengah."
              highlight
            />

            {/* Tombol Kembali */}
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-gray-600"
            >
              ← Kembali ke Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ZiswafCSR;
