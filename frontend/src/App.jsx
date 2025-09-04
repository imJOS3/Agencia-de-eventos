import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import CalendarioEventos from "./pages/CalendarioEventos";
import Inventario from "./pages/Inventario";
import Proveedores from "./pages/Proveedores";
import Facturacion from "./pages/Facturacion";
import Pagos from "./pages/Pagos";
import Eventos from "./pages/Eventos";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/calendario" element={<CalendarioEventos />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/proveedores" element={<Proveedores />} />
      <Route path="/facturacion" element={<Facturacion />} />
      <Route path="/pagos" element={<Pagos />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
