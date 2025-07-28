// utils/auth.js
import { supabase } from "./supabaseClient";
import useAuthStore from "./stores/useAuthStore";

export const loginWithEmail = async (email, password) => {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  await supabase.auth.signOut();
  useAuthStore.getState().clearUser();
};
