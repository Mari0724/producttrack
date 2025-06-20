import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

interface Registro {
  id: number;
  consulta: string;
  esAlimento?: boolean;
  respuesta: {
    mensaje: string;
    generadoPor: string;
  };
  fechaAnalisis: string;
  usuario: {
    nombreCompleto: string;
    tipoUsuario: "INDIVIDUAL";
  };
}

const NutriScanAuditoria = () => {
  const { usuario } = useUser();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<string>("");

  // Modal edición
  const [editando, setEditando] = useState<Registro | null>(null);
  const [nuevaConsulta, setNuevaConsulta] = useState("");
  const [nuevoEsAlimento, setNuevoEsAlimento] = useState(true);

  const cargarTodos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const res = await axios.get<Registro[]>("http://localhost:3000/nutriscan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistros(res.data);
    } catch (e) {
      const mensaje =
        e instanceof Error ? e.message : "Error desconocido al cargar registros.";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorUsuarioId = async () => {
    if (!usuarioId.trim()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const res = await axios.get<Registro[]>(
        `http://localhost:3000/nutriscan/usuario/${usuarioId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.length === 0 || res.data[0].usuario.tipoUsuario !== "INDIVIDUAL") {
        setError("Ese usuario no tiene acceso a esta función.");
        setRegistros([]);
        return;
      }

      setRegistros(res.data);
    } catch (e) {
      const mensaje =
        e instanceof Error ? e.message : "Error al buscar por ID de usuario.";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTodos();
  }, []);

  const eliminarRegistro = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de eliminar este análisis?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      await axios.delete(`http://localhost:3000/nutriscan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRegistros((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Error al eliminar.");
    }
  };

  const abrirModalEdicion = (registro: Registro) => {
    setEditando(registro);
    setNuevaConsulta(registro.consulta);
    setNuevoEsAlimento(registro.esAlimento ?? true);
  };

  const guardarCambios = async () => {
    if (!editando) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      await axios.put(
        `http://localhost:3000/nutriscan/${editando.id}`,
        { consulta: nuevaConsulta, esAlimento: nuevoEsAlimento },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRegistros((prev) =>
        prev.map((r) =>
          r.id === editando.id
            ? { ...r, consulta: nuevaConsulta, esAlimento: nuevoEsAlimento }
            : r
        )
      );
      setEditando(null);
    } catch {
      alert("Error al guardar cambios.");
    }
  };

  if (usuario?.rol !== "ADMIN" && usuario?.rol !== "DESARROLLADOR") {
    return (
      <div className="text-center mt-20 text-red-600">
        No tienes permiso para ver esta página 😢
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-wine-red">
        🧾 Auditoría de Análisis Nutricionales
      </h1>

      {/* Buscar por ID usuario */}
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="number"
          placeholder="Buscar por ID de usuario"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={buscarPorUsuarioId}
          className="bg-wine-red text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Buscar
        </button>
        <button
          onClick={() => {
            setUsuarioId("");
            cargarTodos();
          }}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Limpiar
        </button>
      </div>

      {loading ? (
        <p>Cargando análisis...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full text-left text-sm bg-white rounded">
            <thead className="bg-wine-red text-white font-semibold">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Consulta</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Tipo Usuario</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Respuesta GPT</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((reg) => (
                <tr key={reg.id} className="border-t">
                  <td className="px-4 py-2">{reg.id}</td>
                  <td className="px-4 py-2">{reg.consulta}</td>
                  <td className="px-4 py-2">{reg.usuario.nombreCompleto}</td>
                  <td className="px-4 py-2">{reg.usuario.tipoUsuario}</td>
                  <td className="px-4 py-2">
                    {new Date(reg.fechaAnalisis).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {reg.respuesta?.mensaje
                      ? reg.respuesta.mensaje.slice(0, 60) + "..."
                      : "Sin respuesta"}
                  </td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => eliminarRegistro(reg.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => abrirModalEdicion(reg)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Edición */}
      {editando && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Editar Análisis #{editando.id}</h2>
            <label className="block mb-2">
              Consulta:
              <input
                type="text"
                value={nuevaConsulta}
                onChange={(e) => setNuevaConsulta(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </label>
            <label className="block mb-4">
              ¿Es alimento?
              <select
                value={nuevoEsAlimento ? "true" : "false"}
                onChange={(e) => setNuevoEsAlimento(e.target.value === "true")}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </label>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setEditando(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-wine-red text-white px-4 py-2 rounded hover:bg-red-800"
                onClick={guardarCambios}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutriScanAuditoria;
