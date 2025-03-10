import { TUser } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const user = ref<TUser>();
  const setUser = (payload: TUser) => {
    user.value = payload;
  };

  const fetchUser = async (userData: any) => {
    try {
      setUser(userData);
    } catch (err) {
      console.log(err);
    }
  };

  return { user, setUser, fetchUser };
});
