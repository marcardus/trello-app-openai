import { useState } from "react";
import useAuthStore from "@/store/AuthStore";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, register } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      await login(email, password);
    } else {
      await register(email, password, name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {type === "register" && (
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      )}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        {type === "login" ? "Iniciar Sesión" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;

