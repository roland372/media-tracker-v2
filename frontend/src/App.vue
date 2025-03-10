<template>
  <LoaderComponent v-if="isLoading" />
  <MainLayout v-else />
</template>
<script setup lang="ts">
import LoaderComponent from "@/components/ui/LoaderComponent.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { setDefaultTheme } from "@/utils/themes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const mediaStore = useMediaStore();
const { fetchAllMedia, fetchUser, setLoading } = mediaStore;
const { isLoading } = storeToRefs(mediaStore);

onMounted(async () => {
  // console.log("APP MOUNTED");
  setDefaultTheme();

  try {
    const auth = getAuth();
    onAuthStateChanged(auth, async () => {
      if (auth?.currentUser?.email) {
        const sheetId = process.env.VUE_APP_SHEET_ID;
        const sheetNames = ["Users", "Anime", "Books", "Characters", "Emotes", "Games", "Manga", "Movies"];
        const sheetData = {};

        const fetchSheet = async (sheetName) => {
          const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

          try {
            const response = await fetch(csvUrl);
            const csvText = await response.text();
            const data = csvToArray(csvText);
            sheetData[sheetName.toLowerCase()] = data;
          } catch (error) {
            console.error(`Error fetching CSV for ${sheetName}:`, error);
          }
        };

        const csvToArray = (csvText) => {
          const rows = csvText
            .split("\n")
            .map((row) => row.trim())
            .filter((row) => row !== "");

          if (rows.length < 2) return [];

          const headers = rows[0]
            .split(",")
            .map((header) => header.trim().replace(/^"|"$/g, ""));

          const parseRow = (row) => {
            const values = row.match(/(?:[^,""]|"(?:[^"]|"")*")+/g).map(value =>
              value.replace(/^"|"$/g, "").replace(/""/g, '"')
            );

            return headers.reduce((obj, header, idx) => {
              obj[header] = values[idx] || "";
              return obj;
            }, {});
          };

          return rows.slice(1).map(parseRow);
        };

        Promise.all(sheetNames.map(fetchSheet)).then(() => {
          const usersData = sheetData["users"] || [];
          const mediaData = {
            anime: sheetData["anime"] || [],
            books: sheetData["books"] || [],
            characters: sheetData["characters"] || [],
            emotes: sheetData["emotes"] || [],
            games: sheetData["games"] || [],
            manga: sheetData["manga"] || [],
            movies: sheetData["movies"] || [],
          };

          if (usersData.length > 0) {
            fetchUser(usersData[0]);
          }
          fetchAllMedia(mediaData);
        });


        setLoading(false);
      }
      setLoading(false);
    });
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
});
</script>
<style>
:root {
  --text-color: #ffffff;
  --link-color: #0dcaf0;

  --blue-500: #12232e;
  --blue-400: #203647;
  --blue-300: #284155;
  --blue-200: #023e8a;
  --blue-100: #4da8da;

  --gray-500: #1c1c1c;
  --gray-400: #343434;
  --gray-300: #555555;
  --gray-200: #696969;
  --gray-100: #7c7c7c;

  --bg-primary-dark: var(--blue-500);
  --bg-primary-medium: var(--blue-400);
  --bg-primary-light: var(--blue-200);
  --bg-secondary-medium: var(--blue-300);
  --bg-secondary-light: var(--blue-100);
}

body {
  background-color: var(--bg-primary-dark);
}

.bg-primary-dark {
  background-color: var(--bg-primary-dark);
}

.bg-primary-medium {
  background-color: var(--bg-primary-medium);
}

.bg-primary-light {
  background-color: var(--bg-primary-light);
}

.bg-secondary-medium {
  background-color: var(--bg-secondary-medium);
}

.bg-secondary-light {
  background-color: var(--bg-secondary-light);
}

.bg-rainbow {
  background: linear-gradient(90deg,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%);
}

.text-color {
  color: var(--text-color);
}

.link-color {
  color: var(--link-color);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: var(--bg-primary-light);
}

::-webkit-scrollbar-track {
  background-color: var(--bg-primary-dark);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--bg-secondary-light);
}

@media (max-width: 480px) {
  html {
    font-size: 0.75rem !important;
  }
}

@media (min-width: 480px) {
  html {
    font-size: 0.8rem !important;
  }
}

@media (min-width: 768px) {
  html {
    font-size: 0.85rem !important;
  }
}

@media (min-width: 992px) {
  html {
    font-size: 0.9rem !important;
  }
}

@media (min-width: 1200px) {
  html {
    font-size: 1rem !important;
  }
}
</style>
