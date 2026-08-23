import api from "@/api";

import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
export const useGlobalStore = defineStore("user", () => {
  const user = ref({
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
  });

  const getDetails = async () => {
    let token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    try {
      const res = await api.get("/users");

      if (res.status == 200) {
        user.value.email = res.data.email;
        localStorage.setItem("email", res.data.email);
        return true;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    user.value.token = null;
  };

  return { user, getDetails, logout };
});
