import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

const SimulasiKelayakanUmum: React.FC = () => {
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
        navigate("/pinjaman-daerah-kelayakan-umum");
        break;
      case "KPBU":
        navigate("/kpbu-kelayakan-umum");
        break;
      case "Obligasi":
        navigate("/obligasi-kelayakan-umum");
        break;
      case "Sukuk":
        navigate("/sukuk-kelayakan-umum");
        break;
      case "CSR":
        navigate("/csr-kelayakan-umum");
        break;
      case "Ziswaf":
        navigate("/ziswaf-kelayakan-umum");
        break;
      case "Filantropi":
        navigate("/filantropi-kelayakan-umum");
        break;
      default:
        setHasil("Mohon isi semua field terlebih dahulu");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Kelayakan Umum" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Pilih Skema Simulasi Kelayakan Umum
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
              <option value="">-- Pilih Skema Kelayakan Umum --</option>
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

          {/* Jika hasil tidak valid */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Simulasi Kelayakan Umum"
                value={hasil}
                subtitle="Skema yang dipilih tidak sesuai kategori simulasi kelayakan umum"
                highlight
              />

              <button
                onClick={() => (window.location.href = "/simulasi-kelayakan-umum")}
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

export default SimulasiKelayakanUmum;
