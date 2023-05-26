import { TTheme } from "@/types";

export const beigeTheme: TTheme = {
  primaryDark: "#a67a5b",
  primaryLight: "#e8dcb5",
  primaryMedium: "#c19770",
  secondaryMedium: "#d5b895",
  secondaryLight: "#faf0dc",
  textColor: "#000000",
};

export const blueTheme: TTheme = {
  primaryDark: "#12232e",
  primaryLight: "#023e8a",
  primaryMedium: "#203647",
  secondaryMedium: "#284155",
  secondaryLight: "#4da8da",
  textColor: "#ffffff",
};

const defaultTheme: TTheme = {
  primaryDark: "#12232e",
  primaryLight: "#023e8a",
  primaryMedium: "#203647",
  secondaryMedium: "#284155",
  secondaryLight: "#4da8da",
  textColor: "#ffffff",
};

export const grayTheme: TTheme = {
  primaryDark: "#1c1c1c",
  primaryLight: "#696969",
  primaryMedium: "#343434",
  secondaryMedium: "#555555",
  secondaryLight: "#7c7c7c",
  textColor: "#ffffff",
};

export const setDefaultTheme = () => {
  const localStorageTheme: string | null = localStorage.getItem("themes");

  if (localStorageTheme) {
    setAppTheme(JSON.parse(localStorageTheme));
  } else {
    localStorage.setItem("themes", JSON.stringify(defaultTheme));
    setAppTheme(defaultTheme);
  }
};

export const setThemeToLocalStorage = (theme: TTheme) => {
  localStorage.setItem("themes", JSON.stringify(theme));
};

export const setAppTheme = (theme: TTheme) => {
  document.documentElement.style.setProperty(
    "--bg-primary-dark",
    theme.primaryDark
  );
  document.documentElement.style.setProperty(
    "--bg-primary-light",
    theme.primaryLight
  );
  document.documentElement.style.setProperty(
    "--bg-primary-medium",
    theme.primaryMedium
  );
  document.documentElement.style.setProperty(
    "--bg-secondary-light",
    theme.secondaryLight
  );
  document.documentElement.style.setProperty(
    "--bg-secondary-medium",
    theme.secondaryMedium
  );
  document.documentElement.style.setProperty("--text-color", theme.textColor);
  setThemeToLocalStorage(theme);
};
