<template>
  <HeaderComponent title="Profile">
    <section>
      <h3 class="mb-4 pt-2 text-color">Welcome {{ userRef.email }}</h3>
      <section class="d-sm-flex mx-md-16 px-md-16">
        <main
          :style="{ backgroundColor: userRef.color }"
          class="py-5 px-7 v-col-sm-4 rounded-t"
        >
          <img
            alt="Avatar"
            class="rounded-circle"
            :src="userRef.profileImg"
            style="width: 80px"
          />
          <div style="overflow-wrap: break-word">
            <h3>
              {{ userRef.username }}
            </h3>
            <p>
              {{ userRef.profileDesc }}
            </p>
          </div>
        </main>
        <aside
          class="bg-primary-dark text-color px-5 pt-2 pb-5 v-col-sm-8 rounded-b"
        >
          <section>
            <h3>Information</h3>
            <hr />
            <div class="pa-3">
              <h4>Email</h4>
              <p>{{ userRef.email }}</p>
            </div>
          </section>
          <section>
            <h3>Database</h3>
            <hr />
            <section
              class="d-flex align-center justify-space-evenly pa-3 text-no-wrap"
            >
              <section>
                <div v-for="media in mediaType.slice(0, 3)" :key="media.media">
                  <b class="text-decoration-underline">{{ media.media }}</b>
                  <div>{{ media.total }} {{ media.media }}</div>
                </div>
              </section>
              <section>
                <div v-for="media in mediaType.slice(3)" :key="media.media">
                  <b class="text-decoration-underline">{{ media.media }}</b>
                  <div>{{ media.total }} {{ media.media }}</div>
                </div>
              </section>
            </section>
          </section>
          <section>
            <h3>Color Themes</h3>
            <hr />
            <div class="d-flex align-center justify-start flex-wrap py-3">
              <ButtonText
                v-for="button in colorThemeButtons"
                @click="setAppTheme(button.theme)"
                :key="button.text"
                :class="button.class"
                :color="button.color"
                :size="button.size"
                :text="button.text"
              />
              <ButtonText
                @click="generateAndSetRandomTheme"
                class="mt-2 bg-rainbow"
                color="pink"
                size="small"
                text="Random"
              />
            </div>
          </section>
          <section>
            <h3>Export Data</h3>
            <hr />
            <div class="d-flex align-center justify-start flex-wrap py-3">
              <ButtonText
                v-for="button in backupButtons"
                @click="handleDownloadMedia(button.data, button.text)"
                :key="button.text"
                :class="button.class"
                :color="button.color"
                :size="button.size"
                :text="button.text"
              />
            </div>
          </section>
          <section>
            <h3>Settings</h3>
            <hr />
            <div
              class="d-flex align-center justify-space-evenly flex-wrap py-3"
            >
              <ButtonText
                :on-click="handleOpenSettings"
                class="me-2 mt-2"
                color="yellow"
                size="small"
                text="Edit Profile"
              />
              <ButtonText
                :on-click="handleLogout"
                class="me-2 mt-2"
                color="indigo"
                size="small"
                text="Log Out"
              />
            </div>
          </section>
        </aside>
      </section>
    </section>
    <v-dialog v-if="settingsModal" v-model="settingsModal" max-width="500">
      <v-card>
        <div class="bg-primary-light text-color px-5 py-3 text-h6">
          Edit Profile
        </div>
        <v-card-text>
          <v-text-field
            v-model="userRef.username"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Name"
            :rules="[(val) => !!val || 'Name is required.']"
            variant="outlined"
          />
          <v-text-field
            v-model="userRef.profileDesc"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Description"
            variant="outlined"
          />
          <div class="d-flex justify-space-around align-center">
            <v-text-field
              v-model="userRef.profileImg"
              class="me-2"
              density="compact"
              hide-details="auto"
              label="Avatar"
              variant="outlined"
            />
            <img
              alt="Avatar"
              class="rounded-circle"
              :src="userRef.profileImg"
              style="width: 48px"
            />
          </div>
          <!-- <div class="d-flex justify-space-around mb-n3">
            <v-file-input
              :v-model="avatarUpload"
              density="compact"
              label="Upload Avatar"
              prepend-icon=""
              show-size
              variant="outlined"
            />
            <ButtonText
              :on-click="handleSubmitUploadAvatar"
              class="my-2 ms-2"
              color="yellow"
              size="small"
              text="Upload"
              variant="flat"
            />
          </div> -->
          <div class="mt-n1">
            <small class="ms-3">Select Color</small>
            <div class="d-flex flex-wrap">
              <v-color-picker v-model="userRef.color" hide-inputs />
              <div class="ms-2">
                <b>New color:</b>
                <div :style="{ backgroundColor: userRef.color }" class="pa-1">
                  {{ userRef.color }}
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-4 mb-2">
          <ButtonText
            :on-click="handleSubmitEditProfile"
            color="yellow"
            text="Save Changes"
            variant="flat"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  TUserInput,
  TUser,
  TAnime,
  TManga,
  TGame,
  TCharacter,
  TNote,
  TEmote,
  TTheme,
} from "@/types/index";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { logout } from "@/utils/auth";
import {
  blueTheme,
  grayTheme,
  beigeTheme,
  // randomTheme,
  setAppTheme,
} from "@/utils/themes";

const mediaStore = useMediaStore();
const { userFromDB, anime, manga, games, characters, emotes, notes } =
  storeToRefs(mediaStore);
const { submitEditUser, setUserFromDB } = mediaStore;

const settingsModal = ref<boolean>(false);
const userProfile = reactive({
  _id: userFromDB.value?._id,
  color: userFromDB.value?.color,
  email: userFromDB.value?.email,
  googleId: userFromDB.value?.googleId,
  profileDesc: userFromDB.value?.profileDesc,
  profileImg: userFromDB.value?.profileImg,
  role: userFromDB.value?.role,
  username: userFromDB.value?.username,
});
const userRef = ref(userProfile);
// const avatarUpload = ref();
const mediaType = [
  { media: "Anime", total: anime.value.length },
  { media: "Manga", total: manga.value.length },
  { media: "Games", total: games.value.length },
  { media: "Characters", total: characters.value.length },
  { media: "Emotes", total: emotes.value.length },
  { media: "Notes", total: notes.value.length },
];

const backupButtons = [
  {
    class: "me-2 mt-2",
    color: "indigo",
    data: anime.value,
    size: "small",
    text: "Anime",
  },
  {
    class: "me-2 mt-2",
    color: "green",
    data: manga.value,
    size: "small",
    text: "Manga",
  },
  {
    class: "me-2 mt-2",
    color: "amber",
    data: games.value,
    size: "small",
    text: "Games",
  },
  {
    class: "me-2 mt-2",
    color: "red",
    data: characters.value,
    size: "small",
    text: "Characters",
  },
  {
    class: "me-2 mt-2",
    color: "white",
    data: emotes.value,
    size: "small",
    text: "Emotes",
  },
  {
    class: "mt-2",
    color: "cyan",
    data: notes.value,
    size: "small",
    text: "Notes",
  },
];

const colorThemeButtons = [
  {
    class: "me-2 mt-2",
    color: "indigo",
    size: "small",
    text: "Blue",
    theme: blueTheme,
  },
  {
    class: "me-2 mt-2",
    color: "grey-darken-3",
    size: "small",
    text: "Gray",
    theme: grayTheme,
  },
  {
    class: "me-2 mt-2",
    color: "amber-darken-1",
    size: "small",
    text: "Beige",
    theme: beigeTheme,
  },
];

const handleOpenSettings = () => {
  settingsModal.value = !settingsModal.value;
};

const handleSubmitEditProfile = () => {
  const updatedProfile: TUserInput = reactive({
    color: userRef.value.color,
    profileDesc: userRef.value.profileDesc,
    profileImg: userRef.value.profileImg,
    username: userRef.value.username,
  });

  submitEditUser(userRef.value?._id, updatedProfile);
  setUserFromDB(userRef.value as TUser);

  settingsModal.value = false;
};

const handleLogout = async () => {
  await logout();
  window.open("http://localhost:8080/login", "_self");
};

const handleDownloadMedia = (
  jsonData: TAnime[] | TManga[] | TGame[] | TCharacter[] | TNote[] | TEmote[],
  fileName: string
) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${fileName}.json`;
  link.href = url;
  link.click();
};

const generateAndSetRandomTheme = () => {
  const randomColor1 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColor2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColor3 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColor4 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColor5 = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const randomColor6 = "#" + Math.floor(Math.random() * 16777215).toString(16);

  const randomTheme: TTheme = {
    primaryDark: randomColor1,
    primaryMedium: randomColor2,
    primaryLight: randomColor3,
    secondaryMedium: randomColor4,
    secondaryLight: randomColor5,
    textColor: randomColor6,
  };

  setAppTheme(randomTheme);
};

// const handleSubmitUploadAvatar = () => {
//   console.log(avatarUpload);
// };
</script>
