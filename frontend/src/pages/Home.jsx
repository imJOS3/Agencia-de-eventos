import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, Users, PackageCheck, DollarSign } from "lucide-react";

const data = [
  { name: "Ene", eventos: 8 },
  { name: "Feb", eventos: 10 },
  { name: "Mar", eventos: 14 },
  { name: "Abr", eventos: 7 },
  { name: "May", eventos: 12 },
];

const stats = [
  {
    title: "Eventos",
    value: 58,
    icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
    color: "from-blue-500 to-blue-700",
    route: "/eventos",
  },
  {
    title: "Clientes",
    value: 135,
    icon: <Users className="w-6 h-6 text-green-600" />,
    color: "from-green-500 to-green-700",
    route: "/clientes",
  },
  {
    title: "Inventario",
    value: 42,
    icon: <PackageCheck className="w-6 h-6 text-purple-600" />,
    color: "from-purple-500 to-purple-700",
    route: "/inventario",
  },
  {
    title: "Pagos",
    value: "$12,540",
    icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
    color: "from-yellow-400 to-yellow-600",
    route: "/pagos",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <main className="flex flex-col flex-grow p-8 space-y-10">
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Bienvenido al <span className="text-blue-600">Panel Principal</span>
        </h1>

        {/* Stats con efecto moderno */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <button
              key={i}
              onClick={() => navigate(stat.route)}
              className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-5 w-full text-left group"
            >
              {/* Fondo animado */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition duration-500`}
              ></div>

              {/* Icono */}
              <div className="p-4 bg-gray-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <h2 className="text-sm text-gray-500">{stat.title}</h2>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Eventos por Mes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="eventos" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Home;
