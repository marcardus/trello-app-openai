import { create } from "zustand";
import { account } from "@/appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const user = await account.get();
      set({ user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      set({ user });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  },

  register: async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      await useAuthStore.getState().login(email, password);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      set({ user: null });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));

export default useAuthStore;

