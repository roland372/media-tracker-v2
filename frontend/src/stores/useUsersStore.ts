import { TUser } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const users = ref<TUser>();
  const setUser = (payload: TUser) => {
    users.value = payload;
  };

  const fetchUser = async (userData: any) => {
    try {
      setUser(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return { users, setUser, fetchUser };
});
