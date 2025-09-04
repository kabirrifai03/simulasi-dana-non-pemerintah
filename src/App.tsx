import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { UserProvider } from "./context/UserContext";
import PinjamanDaerah from "./pages/PinjamanDaerah";
import ObligasiSukuk from "./pages/ObligasiSukuk";
import KPBU from "./pages/KPBU";
import KPBULanjutan from "./pages/KPBULanjutan";
import SukukLanjutan from "./pages/SukukLanjutan";
import ObligasiLanjutan from "./pages/ObligasiLanjutan";
import PinjamanDaerahLanjutan from "./pages/PinjamanDaerahLanjutan";
import ZiswafFilantropiCSR from "./pages/ZiswafFilantropiCSR";
import CSRLanjutan from "./pages/CSRLanjutan";
import FilantropiLanjutan from "./pages/FilantropiLanjutan";
import ZiswafLanjutan from "./pages/ZiswafLanjutan";
import SimulasiRisiko from "./pages/SimulasiRisiko";
import SimulasiKelayakanUmum from "./pages/SimulasiKelayakanUmum";
import ZiswafRisiko from "./pages/ZiswafRisiko";
import ZiswafKelayakanUmum from "./pages/ZiswafKelayakanUmum";
import CSRRisiko from "./pages/CSRRisiko";
import CSRKelayakanUmum from "./pages/CSRKelayakanUmum";
import FilantropiRisiko from "./pages/FilantropiRisiko";
import FilantropiKelayakanUmum from "./pages/FilantropiKelayakanUmum";
import KPBURisiko from "./pages/KPBURisiko";
import KPBUKelayakanUmum from "./pages/KPBUKelayakanUmum";
import SukukRisiko from "./pages/SukukRisiko";
import SukukKelayakanUmum from "./pages/SukukKelayakanUmum";
import ObligasiRisiko from "./pages/ObligasiRisiko";
import ObligasiKelayakanUmum from "./pages/ObligasiKelayakanUmum";
import PinjamanDaerahRisiko from "./pages/PinjamanDaerahRisiko";
import PinjamanDaerahKelayakanUmum from "./pages/PinjamanDaerahKelayakanUmum";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <MainPage />
            }
          />
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>404: Halaman Tidak Ditemukan</h1>
              </div>
            }
          />
          <Route path="/pinjaman-daerah" element={<PinjamanDaerah />} />
          <Route path="/obligasi-sukuk" element={<ObligasiSukuk />} />
          <Route path="/kpbu" element={<KPBU />} />
          <Route path="/ziswaf-filantropi-csr" element={<ZiswafFilantropiCSR />} />
]         <Route path="/ziswaf-lanjutan" element={<ZiswafLanjutan />} />
]         <Route path="/ziswaf-risiko" element={<ZiswafRisiko />} />
]         <Route path="/ziswaf-kelayakan-umum" element={<ZiswafKelayakanUmum />} />
          <Route path="/csr-lanjutan" element={<CSRLanjutan />} />
]         <Route path="/csr-risiko" element={<CSRRisiko />} />
]         <Route path="/csr-kelayakan-umum" element={<CSRKelayakanUmum />} />
]         <Route path="/filantropi-lanjutan" element={<FilantropiLanjutan />} />
]         <Route path="/filantropi-risiko" element={<FilantropiRisiko />} />
]         <Route path="/filantropi-kelayakan-umum" element={<FilantropiKelayakanUmum />} />
          <Route path="/kpbulanjutan" element={<KPBULanjutan />} />
]         <Route path="/kpbu-risiko" element={<KPBURisiko />} />
]         <Route path="/kpbu-kelayakan-umum" element={<KPBUKelayakanUmum />} />
          <Route path="/sukuk-lanjutan" element={<SukukLanjutan />} />
]         <Route path="/sukuk-risiko" element={<SukukRisiko />} />
]         <Route path="/sukuk-kelayakan-umum" element={<SukukKelayakanUmum />} />

          <Route path="/obligasi-lanjutan" element={<ObligasiLanjutan />} />
]         <Route path="/obligasi-risiko" element={<ObligasiRisiko />} />
]         <Route path="/obligasi-kelayakan-umum" element={<ObligasiKelayakanUmum />} />
          
          <Route path="/PinjamanDaerahLanjutan" element={<PinjamanDaerahLanjutan />} />
]         <Route path="/pinjaman-daerah-risiko" element={<PinjamanDaerahRisiko />} />
]         <Route path="/pinjaman-daerah-kelayakan-umum" element={<PinjamanDaerahKelayakanUmum />} />

]         <Route path="/simulasi-risiko" element={<SimulasiRisiko />} />
]         <Route path="/simulasi-kelayakan-umum" element={<SimulasiKelayakanUmum />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
