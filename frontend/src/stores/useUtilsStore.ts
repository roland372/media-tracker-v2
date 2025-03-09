import { defineStore } from "pinia";
import { ref } from "vue";

export const useUtilsStore = defineStore("utils", () => {
  const isLoading = ref<boolean>(true);
  const setLoading = (payload: boolean): boolean => (isLoading.value = payload);

  type TSnackbarOptions = {
    color?: string;
    img?: string;
    text: string;
  };

  const snackbar = ref<boolean>(false);
  const snackbarOptions = ref<TSnackbarOptions>({
    color: "",
    img: "",
    text: "",
  });

  const setSnackbar = (
    value: boolean,
    options: TSnackbarOptions = {
      text: "",
      color: "",
      img: "",
    }
  ) => {
    snackbar.value = value;
    snackbarOptions.value = options;
  };

  return {
    isLoading,
    setLoading,
    snackbar,
    snackbarOptions,
    setSnackbar
  };
});
