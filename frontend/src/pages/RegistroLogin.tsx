import React, { useState } from "react";
import "./RegistroLogin.css";

const RegistroLogin: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  return (
    <div className={`container-form ${isLogin ? "login" : "register"}`}>
      <div className="information">
        <div className="info-childs">
          <h2>{isLogin ? "¡Bienvenido Nuevamente!" : "Bienvenidos"}</h2>
          <p>Para unirte por favor Inicia Sesión con tus datos.</p>
          <input
            type="button"
            value={isLogin ? "Registrarse" : "Iniciar Sesión"}
            onClick={handleToggle}
          />
        </div>
      </div>

      <div className="form-information">
        <div className="form-information-childs">
          <h2>{isLogin ? "Iniciar Sesión" : "Crear Una Cuenta"}</h2>
          <div className="icons">
            <i className="bx bxl-google-plus-circle"></i>
          </div>
          <p>{isLogin ? "Iniciar Sesión Con Su Cuenta" : "Utiliza tu email"}</p>

          <form className="form">
            {!isLogin && (
              <>
                <label>
                  <i className="bx bxs-user"></i>
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={handleUserTypeChange}
                    required
                  >
                    <option value="" disabled>
                      Tipo de Usuario
                    </option>
                    <option value="persona">Persona</option>
                    <option value="empresa">Empresa</option>
                  </select>
                </label>

                {userType === "persona" && (
                  <label>
                    <i className="bx bxs-user-pin"></i>
                    <input
                      type="text"
                      id="nombreUsuario"
                      name="nombreUsuario"
                      placeholder="Nombre de Usuario"
                    />
                  </label>
                )}

                {userType === "empresa" && (
                  <label>
                    <i className="bx bxs-building"></i>
                    <input
                      type="text"
                      id="nombreEmpresa"
                      name="nombreEmpresa"
                      placeholder="Nombre de la Empresa"
                    />
                  </label>
                )}
              </>
            )}

            <label>
              <i className="bx bxs-envelope"></i>
              <input
                type="email"
                id={isLogin ? "loginCorreo" : "correo"}
                name={isLogin ? "loginCorreo" : "correo"}
                placeholder="Correo Electrónico"
                required
              />
            </label>

            <label>
              <i className="bx bxs-lock"></i>
              <input
                type="password"
                id={isLogin ? "loginContrasena" : "contrasena"}
                name={isLogin ? "loginContrasena" : "contrasena"}
                placeholder="Contraseña"
                required
              />
            </label>

            <input
              type="submit"
              value={isLogin ? "Iniciar Sesión" : "Registrarme"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroLogin;
