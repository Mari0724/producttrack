import { useState } from "react";

type Props = {
switchView: () => void;
};

const LoginForm: React.FC<Props> = ({ switchView }) => {
const [correo, setCorreo] = useState("");
const [contrasena, setContrasena] = useState("");

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (!correo || !contrasena) {
alert("Por favor ingresa tu correo y contraseña.");
return;
}
console.log("Iniciando sesión con:", { correo, contrasena });
};

return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
<div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
<h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
Iniciar Sesión
</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input
type="email"
placeholder="Correo Electrónico"
value={correo}
onChange={(e) => setCorreo(e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
/>
<input
type="password"
placeholder="Contraseña"
value={contrasena}
onChange={(e) => setContrasena(e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
/>
<button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition" >
Iniciar Sesión
</button>
<button type="button" onClick={switchView} className="w-full text-sm text-center text-indigo-500 hover:underline mt-2" >
¿No tienes cuenta? Regístrate
</button>
</form>
</div>
</div>
);
};

export default LoginForm;