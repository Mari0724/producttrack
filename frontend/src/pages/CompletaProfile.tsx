import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, CheckCircle,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Lock,
  Image as ImageIcon,
} from "lucide-react";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    newPassword: "",
    confirmPassword: "",
    username: "",
    profilePhoto: null as File | null,
  });

  const preRegisteredData = {
    email: "carlos.rodriguez@techsolutions.com",
    companyName: "Tech Solutions S.A.S",
    role: "COMENTARISTA",
    fullName: "Carlos Rodríguez",
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      setIsSubmitting(false);
      return;
    }

    // Simulación de envío
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Tu información ha sido actualizada exitosamente.");
    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-yellow-800" />
        </div>
        <h1 className="text-3xl font-bold text-[#800000]">¡Completa tu perfil!</h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Para comenzar a usar ProductTrack, necesitamos que completes tu información personal.
        </p>
      </div>

      <div className="mb-6 p-4 border-l-4 border-yellow-500 bg-white shadow rounded">
        <h2 className="flex items-center text-yellow-800 font-semibold">
          <CheckCircle className="h-5 w-5 mr-2" /> Información ya registrada
        </h2>
        <p className="text-sm text-gray-600">
          Esta información fue proporcionada por tu empresa y no se puede modificar.
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <li className="flex items-center">
            <Mail className="h-4 w-4 text-gray-500 mr-2" />{" "}
            <strong>Correo:</strong> {preRegisteredData.email}
          </li>
          <li className="flex items-center">
            <Building2 className="h-4 w-4 text-gray-500 mr-2" />{" "}
            <strong>Empresa:</strong> {preRegisteredData.companyName}
          </li>
          <li className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-2" />{" "}
            <strong>Nombre:</strong> {preRegisteredData.fullName}
          </li>
          <li className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-2" />{" "}
            <strong>Rol:</strong> {preRegisteredData.role}
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Nombre de usuario *
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Dirección
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="profilePhoto">
            Foto de perfil
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleInputChange("profilePhoto", e.target.files?.[0] || null)
              }
              className="pl-10 w-full border rounded px-3 py-2 file:bg-[#800000] file:text-white file:border-none file:rounded file:py-1 file:px-2 file:cursor-pointer"
            />
          </div>
        </div>



        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center">
            <Lock className="h-5 w-5 mr-2" /> Cambiar Contraseña (Opcional)
          </h3>

          <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full border rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowNewPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {formData.newPassword && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirmar nueva contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="w-full border rounded px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">Las contraseñas no coinciden</p>
              )}
            </div>
          )}
        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#800000] hover:bg-[#700000] text-white py-3 rounded"
        >
          {isSubmitting ? "Completando perfil..." : "Completar Perfil"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <p className="text-sm text-gray-700">
          <strong>Nota:</strong> Los campos marcados con * son obligatorios. Una vez completes tu
          perfil, podrás acceder a todas las funcionalidades de ProductTrack según tu rol asignado.
        </p>
      </div>
    </div>
  );
};

export default CompleteProfile;
