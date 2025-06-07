import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForms = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {isLoginView ? (
          <LoginForm switchView={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm switchView={() => setIsLoginView(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthForms;
