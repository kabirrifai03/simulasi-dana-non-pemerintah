import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { UserProvider } from "./context/UserContext";
import PinjamanDaerah from "./pages/PinjamanDaerah";
import ObligasiSukuk from "./pages/ObligasiSukuk";
import KPBU from "./pages/KPBU";
import ZiswafCSR from "./pages/ZiswafCSR";



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
          <Route path="/ziswaf" element={<ZiswafCSR />} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
