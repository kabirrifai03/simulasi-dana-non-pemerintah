import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";


const ZiswafFilantropiCSR: React.FC = () => {
  const [pilihan, setPilihan] = useState("");
  const navigate = useNavigate();
  const [hasil, setHasil] = useState<string | null>(null);
  

  const handleSubmit = () => {
  let rekomendasi = "TIDAK DIREKOMENDASIKAN";

    if (!pilihan) {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }

    if (pilihan === "CSR") {
      navigate("/csr-lanjutan");
    } else if (pilihan === "Filantropi") {
      navigate("/filantropi-lanjutan");
    } else if (pilihan === "ZISWAF") {
      navigate("/ziswaf-lanjutan");
    } else {
      rekomendasi = "TIDAK DIREKOMENDASIKAN ❌"
      setHasil(rekomendasi);

    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Klasifikasi ZISWAF / Filantropi / CSR" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Pilih Kategori Pendanaan Non Pemerintah
          </h2>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Jenis Pendanaan
            </label>
            <select
              value={pilihan}
              onChange={(e) => setPilihan(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Opsi --</option>
              <option value="CSR">
                Tanggung jawab perusahaan (2–5% dari laba perusahaan)
              </option>
              <option value="Filantropi">
                Donor/donatur, tanpa minimal batasan dana
              </option>
              <option value="ZISWAF">
                Kriteria syariah ketat, hanya untuk 8 asnaf
              </option>
              <option value="Lainnya">Bukan Ketiganya</option>
            </select>

            <button
              onClick={handleSubmit}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                hasil === "TIDAK DIREKOMENDASIKAN ❌"
                  ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                  : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={hasil === "TIDAK DIREKOMENDASIKAN ❌"}            >
              Submit
            </button>
          </div>


          {/* Hasil Simulasi */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Rekomendasi"
                value={hasil}
                subtitle="Program tidak masuk kategori ZISWAF, Filantropi, maupun CSR"
                highlight
              />

              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 w-full lg1100:w-auto"
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

export default ZiswafFilantropiCSR;
