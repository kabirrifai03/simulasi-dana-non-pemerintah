import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const KPBU: React.FC = () => {
  const [npv, setNpv] = useState<number | null>(null);
  const [pekerja, setPekerja] = useState<number | null>(null);
  const [dokumenLengkap, setDokumenLengkap] = useState(false);
  const [lahanClear, setLahanClear] = useState(false);
  const [danaCadangan, setDanaCadangan] = useState<number | null>(null);
  const [hasil, setHasil] = useState<string | null>(null);
  const [npvRaw, setNpvRaw] = useState("");

  const handleSimulasi = () => {
    if (npv === null || pekerja === null || danaCadangan === null) {
      setHasil("Mohon isi semua field terlebih dahulu");
      return;
    }

    let rekomendasi = "REKOMENDASI TIDAK LAYAK ❌ (KPBU)";

    if (
      npv > 0 &&
      pekerja >= 1000 &&
      dokumenLengkap &&
      lahanClear &&
      danaCadangan > 0
    ) {
      rekomendasi = "REKOMENDASI LAYAK ✅ (KPBU)";
    }

    setHasil(rekomendasi);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Konten utama */}
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi KPBU" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">
            Simulasi Kelayakan KPBU
          </h2>

          {/* Form Input */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            {/* NPV */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                NPV (Net Present Value)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1,000,000,000 atau -Rp500,000,000"
                value={npvRaw}
                onChange={(e) => {
                  let raw = e.target.value;

                  if (raw === "-") {
                    setNpvRaw("-Rp");
                    setNpv(null);
                    return;
                  }

                  let cleaned = raw.replace(/[^0-9-]/g, "");
                  if (cleaned.indexOf("-") > 0) cleaned = cleaned.replace("-", "");

                  if (cleaned === "") {
                    setNpvRaw("");
                    setNpv(null);
                  } else {
                    const num = Number(cleaned);
                    const formatted =
                      num < 0
                        ? `-Rp${Math.abs(num).toLocaleString("id-ID")}`
                        : `Rp${num.toLocaleString("id-ID")}`;
                    setNpvRaw(formatted);
                    setNpv(num);
                  }
                }}
                className="w-full border p-2 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                Catatan: NPV harus &gt; 0 agar layak.
              </p>
            </div>

            {/* Jumlah pekerja */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Jumlah Serapan Pekerja
              </label>
              <input
                type="number"
                placeholder="Minimal 1000 orang"
                value={pekerja ?? ""}
                onChange={(e) => setPekerja(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Dokumen */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Dokumen Perizinan (AMDAL, PBG, KKPR) lengkap?
              </label>
              <select
                value={dokumenLengkap ? "ya" : "tidak"}
                onChange={(e) => setDokumenLengkap(e.target.value === "ya")}
                className="w-full border p-2 rounded"
              >
                <option value="tidak">Belum Lengkap</option>
                <option value="ya">Sudah Lengkap</option>
              </select>
            </div>

            {/* Lahan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Status Pengadaan Tanah
              </label>
              <select
                value={lahanClear ? "ya" : "tidak"}
                onChange={(e) => setLahanClear(e.target.value === "ya")}
                className="w-full border p-2 rounded"
              >
                <option value="tidak">Belum Clear</option>
                <option value="ya">Sudah 100% Clear</option>
              </select>
            </div>

            {/* Dana cadangan */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Jumlah Dana Cadangan (Rp)
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1,000,000,000"
                value={
                  danaCadangan !== null && danaCadangan !== undefined
                    ? `Rp${danaCadangan.toLocaleString("id-ID")}`
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setDanaCadangan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Tombol */}
            <button
              onClick={handleSimulasi}
              className="bg-blue-600 text-white w-full lg1100:w-auto px-4 py-2 rounded hover:bg-blue-700"
            >
              Jalankan Simulasi
            </button>
          </div>

          {/* Hasil */}
          {hasil && (
            <div className="space-y-4">
              <DashboardCard
                title="Hasil Rekomendasi"
                value={hasil}
                subtitle="Berdasarkan NPV, pekerja, dokumen, lahan, dan dana cadangan"
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

export default KPBU;
