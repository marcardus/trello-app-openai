import { useEffect } from "react";
import useAuthStore from "@/store/AuthStore";

const Profile: React.FC = () => {
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p className="text-center">No autenticado</p>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Bienvenido, {user.name}</h2>
      <p>{user.email}</p>
      <button onClick={logout} className="bg-red-500 text-white p-2 mt-4">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
