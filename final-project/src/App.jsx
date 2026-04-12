import Header from './components/header';
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
