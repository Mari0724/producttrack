import { ArrowRight, Users, User, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Index = () => {
  const { usuario } = useUser();
  console.log("usuario:", usuario);

  return (
    <div className="p-6 bg-[#fffaf0]">

      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-producttrack-olive mb-4 font-nunito">
          Bienvenido a ProductTrack
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Gestiona tu equipo de trabajo de manera eficiente y mantén toda la información actualizada
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        {/* Gestión de Equipo solo para EMPRESARIAL */}
        {usuario?.tipoUsuario === 'EMPRESARIAL' && (
          <div className="border-l-4 border-l-producttrack-olive bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="h-8 w-8 text-producttrack-olive" />
                <div>
                  <h3 className="text-lg font-semibold text-producttrack-olive">Gestión de Equipo</h3>
                  <p className="text-sm text-gray-500">Administra los miembros de tu equipo</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Crea, edita y gestiona los permisos de los miembros de tu equipo de trabajo.
              </p>
              <Link to="/equipo">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-producttrack-olive hover:bg-producttrack-olive/90 text-white rounded-md font-medium transition">
                  Ir a Gestión de Equipo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Mi Perfil */}
        <div className="border-l-4 border-l-producttrack-yellow bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <User className="h-8 w-8 text-producttrack-yellow" />
              <div>
                <h3 className="text-lg font-semibold text-producttrack-olive">Mi Perfil</h3>
                <p className="text-sm text-gray-500">Actualiza tu información personal</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Mantén actualizada tu información de contacto y configuración de cuenta.
            </p>
            <Link to="/perfil">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-producttrack-yellow text-producttrack-olive hover:bg-producttrack-yellow/10 rounded-md font-medium transition">
                Ver Mi Perfil
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Información de Empresa para EMPRESARIAL y EQUIPO */}
        {(usuario?.tipoUsuario === 'EMPRESARIAL' || usuario?.rol === 'EQUIPO') && (
          <div className="border-l-4 border-l-producttrack-wine bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Building2 className="h-8 w-8 text-producttrack-wine" />
                <div>
                  <h3 className="text-lg font-semibold text-producttrack-olive">Información de Empresa</h3>
                  <p className="text-sm text-gray-500">Datos corporativos</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Empresa:</strong> {String(usuario?.nombreEmpresa || 'Tech Solutions S.A.S')}</p>
                <p><strong>NIT:</strong> {String(usuario?.nit || '900.123.456-7')}</p>
                {/* Solo para EMPRESARIAL mostrar conteo de usuarios */}
                {usuario?.tipoUsuario === 'EMPRESARIAL' && (
                  <p><strong>Usuarios activos:</strong> 12</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Resumen del Sistema solo para EMPRESARIAL */}
      {usuario?.tipoUsuario === 'EMPRESARIAL' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-producttrack-olive mb-6 font-nunito">Resumen del Sistema</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-producttrack-olive/10 rounded-lg">
              <div className="text-2xl font-bold text-producttrack-olive">12</div>
              <div className="text-sm text-gray-600">Miembros del Equipo</div>
            </div>
            <div className="text-center p-4 bg-producttrack-yellow/20 rounded-lg">
              <div className="text-2xl font-bold text-producttrack-olive">8</div>
              <div className="text-sm text-gray-600">Editores</div>
            </div>
            <div className="text-center p-4 bg-producttrack-wine/10 rounded-lg">
              <div className="text-2xl font-bold text-producttrack-olive">3</div>
              <div className="text-sm text-gray-600">Comentaristas</div>
            </div>
            <div className="text-center p-4 bg-producttrack-lightgray rounded-lg">
              <div className="text-2xl font-bold text-producttrack-olive">1</div>
              <div className="text-sm text-gray-600">Lectores</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Index;
