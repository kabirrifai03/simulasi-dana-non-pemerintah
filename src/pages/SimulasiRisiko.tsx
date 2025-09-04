import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

const SimulasiRisiko: React.FC = () => {
  const [pilihan, setPilihan] = useState("");
  const navigate = useNavigate();
  const [hasil, setHasil] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!pilihan) {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }

    switch (pilihan) {
      case "PinjamanDaerah":
        navigate("/pinjaman-daerah-risiko");
        break;
      case "KPBU":
        navigate("/kpbu-risiko");
        break;
      case "Obligasi":
        navigate("/obligasi-risiko");
        break;
      case "Sukuk":
        navigate("/sukuk-risiko");
        break;
      case "CSR":
        navigate("/csr-risiko");
        break;
      case "Ziswaf":
        navigate("/ziswaf-risiko");
        break;
      case "Filantropi":
        navigate("/filantropi-risiko");
        break;
      default:
        setHasil("Mohon isi semua field terlebih dahulu");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Risiko" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Pilih Skema Simulasi Risiko
          </h2>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Jenis Skema
            </label>
            <select
              value={pilihan}
              onChange={(e) => setPilihan(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Skema Risiko --</option>
              <option value="PinjamanDaerah">Pinjaman Daerah</option>
              <option value="KPBU">KPBU</option>
              <option value="Obligasi">Obligasi</option>
              <option value="Sukuk">Sukuk</option>
              <option value="CSR">CSR</option>
              <option value="Ziswaf">ZISWAF</option>
              <option value="Filantropi">Filantropi</option>
            </select>

            <button
              onClick={handleSubmit}
                className={`px-4 py-2 rounded lg1100:w-auto  ${
                  hasil === "Mohon isi semua field terlebih dahulu"
                    ? "bg-gray-400 text-gray-700 px-6 py-3 rounded  w-full lg1100:w-auto cursor-not-allowed"
                    : "bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full lg1100:w-auto "
                }`} 
                disabled={hasil === "Mohon isi semua field terlebih dahulu"}            >
              Jalankan Simulasi
            </button>
          </div>

          {/* Jika hasil tidak direkomendasikan */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Simulasi Risiko"
                value={hasil}
                subtitle="Skema yang dipilih tidak sesuai kategori simulasi risiko"
                highlight
              />

              <button
                onClick={() => (window.location.href = "/simulasi-risiko")}
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

export default SimulasiRisiko;
