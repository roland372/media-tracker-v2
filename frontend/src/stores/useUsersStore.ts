import { TUser } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const user = ref<TUser>();
  const isAuthenticated = ref(false);

  const setUser = (payload: TUser) => {
    user.value = payload;
  };

  const setAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
    if (!value) {
      user.value = undefined;
    }
  };

  const fetchUser = async (userData: TUser) => {
    try {
      setUser(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return { user, isAuthenticated, setUser, setAuthenticated, fetchUser };
});
