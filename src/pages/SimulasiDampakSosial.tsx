// src/pages/SimulasiDampakSosial.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";

const SimulasiDampakSosial: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 3>(1);

  const [investasi, setInvestasi] = useState(0);

  // keluaran (c)
  const [tenagaKerja, setTenagaKerja] = useState(0);
  const [perempuan, setPerempuan] = useState(0);
  const [anakMuda, setAnakMuda] = useState(0);
  const [pangan, setPangan] = useState(0);
  const [co2, setCo2] = useState(0);
  const [lahan, setLahan] = useState(0);
  const [lumbung, setLumbung] = useState(0);

  // luaran (d) input user
  const [pendapatanBersih, setPendapatanBersih] = useState(0);
  const [pendapatanBelanja, setPendapatanBelanja] = useState(0);
  const [tabunganPerempuan, setTabunganPerempuan] = useState(0);
  const [belanjaProduktif, setBelanjaProduktif] = useState(0);
  const [biayaSampah, setBiayaSampah] = useState(0);

  // hasil simulasi
  const [hasil, setHasil] = useState<number | null>(null);
  const [totalManfaat, setTotalManfaat] = useState<number | null>(null); // ✅ tambahin ini

  const handleHitung = () => {
    // standar default (Rp)
    const standarCO2 = 30; // Rp 30 per Kg CO2
    const standarReboisasi = 1_000_000_000; // Rp 1M/ha
    const standarRevegetasi = 500_000_000; // Rp 500jt/ha
    const standarLumbung = 13_500; // Rp 13.500/kg

    // total manfaat sosial (c × d)
    let totalManfaat = 0;
    totalManfaat += tenagaKerja * pendapatanBersih;
    totalManfaat += perempuan * tabunganPerempuan;
    totalManfaat += anakMuda * belanjaProduktif;
    totalManfaat += pangan * pendapatanBelanja; 
    totalManfaat += co2 * standarCO2;
    totalManfaat += lahan * (standarReboisasi + standarRevegetasi) / 2; 
    totalManfaat += lumbung * standarLumbung;
    totalManfaat += biayaSampah;

    // rumus dampak sosial
    const dampak =
      investasi > 0 ? (totalManfaat - investasi) / investasi : 0;

    setTotalManfaat(totalManfaat);   // ✅ simpan total manfaat
    setHasil(dampak);
    setStep(3);
  };

  const formatRupiah = (value: number) =>
    value ? `Rp${value.toLocaleString("id-ID")}` : "Rp0";

  // Format angka jadi 1.000 dst (tanpa Rp)
const formatNumber = (value: number) =>
  value.toLocaleString("id-ID");

// Parse string ke angka murni
const parseNumber = (value: string) => {
  const raw = value.replace(/\./g, ""); // hapus titik
  return raw ? Number(raw) : 0;
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-0 lg1100:ml-64 flex-1 flex flex-col">
        <Header name="Simulasi Dampak Sosial Program" />

        <main className="px-4 sm:px-6 py-6 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Simulasi Hitung Dampak Sosial
          </h2>

          {/* Step 1: Nilai Investasi */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <label className="block text-gray-700 font-medium">
                Masukkan Nilai Investasi / Program / Proyek
              </label>
              <input
                type="text"
                placeholder="Contoh: Rp1.000.000.000"
                value={formatRupiah(investasi)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setInvestasi(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                disabled={investasi <= 0}
              >
                Selanjutnya ➡️
              </button>
            </div>
          )}

{/* Step 2: Keluaran (c) + Luaran (d) */}
{step === 2 && (
  <div className="bg-white p-6 rounded-lg shadow space-y-6">
    {/* Keluaran (c) */}
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">
        Isi Kolom List Keluaran
      </h3>
      <div className="space-y-4">
      {/* Tenaga Kerja */}
      <div>
        <label className="block text-gray-700 font-medium">
          Jumlah Tenaga Kerja Terserap
        </label>
        <p className="text-xs text-gray-500 mb-1">
          Format: angka (contoh: 150)
        </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
          placeholder="150"
          value={tenagaKerja === 0 ? "0" : formatNumber(tenagaKerja)}
          onChange={(e) => setTenagaKerja(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
      </div>

        {/* Perempuan */}
        <div>
          <label className="block text-gray-700 font-medium">
            Jumlah Perempuan Terlibat
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka (contoh: 50)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
          placeholder="50"
          value={perempuan === 0 ? "0" : formatNumber(perempuan)}
          onChange={(e) => setPerempuan(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>


        {/* Anak Muda */}
        <div>
          <label className="block text-gray-700 font-medium">
            Jumlah Anak Muda Terlibat
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka (contoh: 30)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
          placeholder="30"
          value={anakMuda === 0 ? "0" : formatNumber(anakMuda)}
          onChange={(e) => setAnakMuda(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>

        {/* Sisa Pangan */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Sisa dan Susut Pangan yang Diselamatkan
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka dalam ton/ha (contoh: 12)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
            placeholder="12"
          value={pangan === 0 ? "0" : formatNumber(pangan)}
          onChange={(e) => setPangan(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>

        {/* CO₂ */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Pengurangan Gas Rumah Kaca
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka dalam Kg/CO₂ (contoh: 5000)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
            placeholder="5000"
          value={co2 === 0 ? "0" : formatNumber(co2)}
          onChange={(e) => setCo2(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>

        {/* Lahan */}
        <div>
          <label className="block text-gray-700 font-medium">
            Jumlah Lahan Direboisasi/Direvegetasi
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka dalam ha (contoh: 10)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
            placeholder="10"
          value={lahan === 0 ? "0" : formatNumber(lahan)}
          onChange={(e) => setLahan(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>

        {/* Lumbung */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Produksi Pangan Wilayah Surplus
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: angka dalam ton (contoh: 7)
          </p>
        <input
          type="text"
          inputMode="numeric" // biar keyboard angka di HP
            placeholder="7"
          value={lumbung === 0 ? "0" : formatNumber(lumbung)}
          onChange={(e) => setLumbung(parseNumber(e.target.value))}
          className="w-full border p-3 rounded"
        />
        </div>
                      <button
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                disabled={investasi <= 0}
              >
                Selanjutnya ➡️
              </button>

      </div>
    </div>
    </div>
)}

{step === 3 && (
  <div className="bg-white p-6 rounded-lg shadow space-y-6">
    {/* Luaran (d) */}
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">
        Luaran (Sosial Ekonomi)
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        Beberapa nilai sudah memiliki standar default otomatis, sisanya silakan isi manual.
      </p>

      <div className="space-y-4">
        {/* Pendapatan Bersih */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Pendapatan Bersih Penerima Manfaat
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: harga Rp (contoh: Rp9.000.000)
          </p>
              <input
                type="text"
                placeholder="Contoh: Rp9.000.000"
                value={formatRupiah(pendapatanBersih)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPendapatanBersih(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
        </div>

        {/* Pendapatan Belanja */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Pendapatan yang Dapat Dibelanjakan
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: harga Rp (contoh: Rp5.000.000)
          </p>
              <input
                type="text"
                placeholder="Contoh: Rp5.000.000"
                value={formatRupiah(pendapatanBelanja)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setPendapatanBelanja(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
        </div>

        {/* Tabungan Perempuan */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Tabungan Perempuan
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: harga Rp (contoh: Rp2.000.000)
          </p>
              <input
                type="text"
                placeholder="Contoh: Rp2.000.000"
                value={formatRupiah(tabunganPerempuan)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setTabunganPerempuan(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
        </div>

        {/* Belanja Produktif */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimasi Belanja Produktif Anak Muda
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: harga Rp (contoh: Rp3.000.000)
          </p>
              <input
                type="text"
                placeholder="Contoh: Rp2.000.000"
                value={formatRupiah(belanjaProduktif)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setBelanjaProduktif(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
        </div>

        {/* Biaya Sampah */}
        <div>
          <label className="block text-gray-700 font-medium">
            Biaya Operasional Tipping Fee / Biaya Pembuangan  sampah ke TPA (Truk Dump) Bulanan
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Format: harga Rp (contoh: Rp100.000)
          </p>
              <input
                type="text"
                placeholder="Contoh: Rp2.000.000"
                value={formatRupiah(biayaSampah)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setBiayaSampah(raw ? Number(raw) : 0);
                }}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
              />
        </div>

        {/* Default values display */}
        <div className="bg-gray-50 border p-3 rounded text-sm text-gray-600">
          <p>📌 Standar Nilai:</p>
          <ul className="list-disc pl-5">
            <li>Rp30 per Kg CO₂</li>
            <li>Rp1.000.000.000 per ha Reboisasi</li>
            <li>Rp500.000.000 per ha Revegetasi</li>
            <li>Rp13.500 per Kg Muatan Lumbung</li>
          </ul>
        </div>
      </div>
    </div>

    <button
      onClick={handleHitung}
      className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
    >
      Hitung Dampak Sosial
    </button>
  </div>
)}

{hasil !== null && totalManfaat !== null && (
  <div className="space-y-4">
    <DashboardCard
      title="Hasil Simulasi Dampak Sosial"
      value={(hasil * 100).toFixed(2) + " %"}
      subtitle={`Persentase Dampak Sosial terhadap Investasi. Total Manfaat Sosial: Rp${totalManfaat.toLocaleString("id-ID")}`}
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

export default SimulasiDampakSosial;
