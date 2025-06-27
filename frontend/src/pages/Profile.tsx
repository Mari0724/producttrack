import { useEffect, useState } from 'react';
import { useToast } from '../hooks/useToast';
import {
  User, Building2, Mail, Phone, Eye, EyeOff,
  MapPin, Edit, Save, Lock, Shield, FileText
} from 'lucide-react';
import { getUserProfile, updateUserProfile, changeUserPassword, uploadUserProfilePhoto } from '../services/profileService';
import type { AxiosErrorResponse } from "../types/AxiosError";

interface UserProfile {
  type: 'INDIVIDUAL' | 'EMPRESARIAL' | 'EQUIPO';
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName?: string;
  nit?: string;
  role?: string;
  fotoPerfil?: string; // <-- AGREGA ESTA LÍNEA
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'perfil' | 'seguridad'>('perfil');
  const [photo, setPhoto] = useState<File | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUsuario = parseInt(localStorage.getItem("idUsuario") || "0");
        const data = await getUserProfile(idUsuario);
        console.log("Perfil recibido:", data);
        setUserProfile({
          type: data.tipoUsuario ?? 'INDIVIDUAL',
          username: data.username,
          name: data.nombreCompleto,
          email: data.correo,
          phone: data.telefono || '',
          address: data.direccion || '',
          companyName: data.nombreEmpresa ?? '',
          nit: data.nit ?? '',
          role: data.rolEquipo || data.rol,
          fotoPerfil: data.fotoPerfil || ''
        });
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    fetchData();
  }, []);

  if (!userProfile) return <div className="text-center text-gray-500">Cargando perfil...</div>;



  const handleSaveProfile = async () => {
    const idUsuario = parseInt(localStorage.getItem("idUsuario") || "0");

    try {
      // 1. Subir foto si hay
      if (photo) {
        await uploadUserProfilePhoto(idUsuario, photo);
      }

      // 2. Actualizar datos básicos
      const dataToUpdate = {
        username: userProfile.username,
        nombreCompleto: userProfile.name,
        correo: userProfile.email,
        telefono: userProfile.phone,
        direccion: userProfile.address,
        nombreEmpresa: userProfile.companyName,
        nit: userProfile.nit
      };

      await updateUserProfile(idUsuario, dataToUpdate);
      const updatedData = await getUserProfile(idUsuario);
      setUserProfile({
        type: updatedData.tipoUsuario ?? 'INDIVIDUAL',
        username: updatedData.username,
        name: updatedData.nombreCompleto,
        email: updatedData.correo,
        phone: updatedData.telefono || '',
        address: updatedData.direccion || '',
        companyName: updatedData.nombreEmpresa ?? '',
        nit: updatedData.nit ?? '',
        role: updatedData.rolEquipo || updatedData.rol,
        fotoPerfil: updatedData.fotoPerfil || ''
      });

      // 3. Éxito
      toast.success("Perfil actualizado correctamente ✅");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar el perfil ❌");
    }
  };

  if (!userProfile) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  const isAdmin = userProfile.role === 'ADMIN';
  const isDev = userProfile.role === 'DESARROLLADOR';
  const isIndividual = userProfile.type === 'INDIVIDUAL' || isAdmin || isDev;
  const isEmpresa = userProfile.type === 'EMPRESARIAL' && !isIndividual;
  const isEquipo = userProfile.type === 'EQUIPO' && !isIndividual;

  return (
    <div className="px-4 sm:px-0 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-[#f5f5dc] rounded-full flex items-center justify-center">
            {isEmpresa ? (
              <Building2 className="h-8 w-8 text-[#667233]" />
            ) : (
              <User className="h-8 w-8 text-[#667233]" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#667233] font-nunito">
              {isEmpresa && 'Perfil de Empresa'}
              {isEquipo && 'Perfil de Equipo'}
              {isIndividual && 'Mi Perfil'}
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona tu información personal y configuración de cuenta
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#667233] hover:bg-[#556322] text-white py-2 px-4 rounded mt-4 sm:mt-0 flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </button>
        ) : (
          <button
            onClick={handleSaveProfile}
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded mt-4 sm:mt-0 flex items-center"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 flex gap-8">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`py-2 font-semibold ${activeTab === 'perfil'
            ? 'text-[#667233] border-b-2 border-[#667233]'
            : 'text-gray-500'
            }`}
        >
          Información Personal
        </button>
        <button
          onClick={() => setActiveTab('seguridad')}
          className={`py-2 font-semibold ${activeTab === 'seguridad'
            ? 'text-[#667233] border-b-2 border-[#667233]'
            : 'text-gray-500'
            }`}
        >
          Seguridad
        </button>
      </div>

      {/* Información Personal */}
      {activeTab === 'perfil' && (
        <div className="bg-white shadow rounded p-6 mb-6">
          <h2 className="text-[#667233] text-xl font-semibold mb-4">Información Personal</h2>

          <div className="flex justify-center mb-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#667233] bg-gray-100 shadow">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Foto de perfil"
                  className="object-cover w-full h-full"
                />
              ) : userProfile.fotoPerfil ? (
                <img
                  src={userProfile.fotoPerfil}
                  alt="Foto de perfil"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="text-gray-400 w-12 h-12 m-auto mt-8" />
              )}

            </div>
          </div>

          {isEditing && (
            <div className="flex justify-center mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="file:bg-[#667233] file:text-white file:py-1 file:px-4 file:rounded file:border-none"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                name="username"
                type="text"
                value={userProfile.username}
                onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
                disabled={!isEditing}
                placeholder="Nombre de usuario"
                className="pl-10 border w-full rounded py-2"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                name="name"
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                disabled={!isEditing}
                placeholder="Nombre completo"
                className="pl-10 border w-full rounded py-2"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                name="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                disabled={!isEditing}
                placeholder="Correo"
                className="pl-10 border w-full rounded py-2"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                name="phone"
                type="tel"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="Teléfono"
                className="pl-10 border w-full rounded py-2"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                name="address"
                type="text"
                value={userProfile.address}
                onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                disabled={!isEditing}
                placeholder="Dirección"
                className="pl-10 border w-full rounded py-2"
              />
            </div>

            {!isIndividual && (isEmpresa || isEquipo) && (
              <>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="companyName"
                    type="text"
                    value={userProfile.companyName}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, companyName: e.target.value })
                    }
                    disabled={isEquipo || !isEditing}
                    placeholder="Nombre de la empresa"
                    className={`pl-10 border w-full rounded py-2 ${isEquipo ? 'bg-gray-100 text-gray-500' : ''}`}
                  />
                  {isEquipo && <p className="text-xs text-gray-500 mt-1">Este campo no se puede modificar</p>}
                </div>

                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="nit"
                    type="text"
                    value={userProfile.nit}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, nit: e.target.value })
                    }
                    disabled={isEquipo || !isEditing}
                    placeholder="NIT"
                    className={`pl-10 border w-full rounded py-2 ${isEquipo ? 'bg-gray-100 text-gray-500' : ''}`}
                  />
                  {isEquipo && <p className="text-xs text-gray-500 mt-1">Este campo no se puede modificar</p>}
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {/* Seguridad */}
      {activeTab === 'seguridad' && (
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-[#667233] text-xl font-semibold mb-4">Configuración de Seguridad</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Contraseña</p>
              <p className="text-sm text-gray-500">Última actualización hace 30 días</p>
            </div>
            <button
              onClick={() => setIsPasswordDialogOpen(true)}
              className="flex items-center text-[#667233] border border-[#667233] px-4 py-2 rounded hover:bg-[#f6f6e3]"
            >
              <Lock className="mr-2 h-4 w-4" />
              Cambiar Contraseña
            </button>
          </div>
          <div className="bg-[#fefce8] p-4 rounded text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#667233] mt-1" />
              <div>
                <p className="font-medium text-[#667233]">Consejos de Seguridad</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Usa una contraseña fuerte con al menos 8 caracteres</li>
                  <li>Incluye letras mayúsculas, minúsculas, números y símbolos</li>
                  <li>No compartas tu contraseña con nadie</li>
                  <li>Cambia tu contraseña regularmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPasswordDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-[#667233] mb-2">Cambiar Contraseña</h2>
            <p className="text-sm text-gray-600 mb-4">Ingresa tu contraseña actual y la nueva contraseña.</p>

            <div className="mb-3 relative">
              <label className="block text-sm font-medium mb-1">Contraseña actual</label>
              <input
                type={showPassword.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full border rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>



            <div className="mb-3 relative">
              <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
              <input
                type={showPassword.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full border rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>



            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full border rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>


            <div className="flex justify-between">
              <button
                onClick={() => setIsPasswordDialogOpen(false)}
                className="px-4 py-2 rounded border w-full mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  const idUsuario = parseInt(localStorage.getItem("idUsuario") || "0");

                  if (passwordData.newPassword !== passwordData.confirmPassword) {
                    toast.error("Las contraseñas no coinciden ❌");
                    return;
                  }

                  try {
                    await changeUserPassword(idUsuario, passwordData.currentPassword, passwordData.newPassword);
                    toast.success("Contraseña cambiada correctamente ✅");
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    setIsPasswordDialogOpen(false);
                  } catch (error: unknown) {
                    if (
                      typeof error === "object" &&
                      error !== null &&
                      "response" in error
                    ) {
                      const axiosError = error as AxiosErrorResponse;

                      if (
                        axiosError.response &&
                        axiosError.response.data &&
                        typeof axiosError.response.data.message === "string"
                      ) {
                        toast.error(axiosError.response.data.message);
                        return;
                      }
                    }

                    toast.error("Error al cambiar la contraseña ❌");
                  }
                }}

                className="px-4 py-2 bg-[#667233] text-white rounded w-full ml-2"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}


export default Profile;
