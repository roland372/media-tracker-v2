<template>
  <HeaderComponent title="Profile">
    <section>
      <h3 class="mb-4 pt-2 text-color">Welcome {{ userRef.email }}</h3>
      <section class="d-sm-flex mx-md-16 px-md-16">
        <main
          :style="{ backgroundColor: userRef.color }"
          class="py-5 px-7 v-col-sm-4 rounded"
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
          class="bg-primary-dark text-color px-5 pt-2 pb-5 v-col-sm-8 rounded"
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
              class="v-row wrap align-center justify-space-evenly pa-3 text-no-wrap"
            >
              <section
                v-for="media in mediaType.filter((el) => !el.isAdmin)"
                :key="media.media"
                class="pb-1 v-col-6 v-col-sm-4"
              >
                <b class="text-decoration-underline">{{ media.media }}</b>
                <div>
                  {{ media.total }}
                  {{ media.media === "Music" ? "Songs" : media.media }}
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
                :key="button.text"
                @click="setAppTheme(button.theme)"
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
                v-for="button in backupButtons.filter((el) => !el.isAdmin)"
                :key="button.text"
                @click="handleDownloadMedia(button.data, button.text)"
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
                @click="handleOpenSettings"
                class="me-2 mt-2"
                color="yellow"
                size="small"
                text="Edit Profile"
              />
              <ButtonText
                @click="handleLogout"
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
        <div
          class="d-flex justify-space-between align-center bg-primary-light text-color px-5 py-3 text-h6"
        >
          Edit Profile
          <ButtonIcon
            @click="handleOpenSettings"
            class="me-n3"
            icon="mdi-close"
            icon-color="white"
            icon-size="large"
            variant="text"
          />
        </div>
        <v-form @submit.prevent="handleSubmitEditProfile" validate-on="input">
          <v-card-text>
            <v-text-field
              v-model="userRef.username"
              class="mb-2"
              density="compact"
              hide-details="auto"
              label="Name"
              :rules="stringRules('Name')"
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
                :rules="URLRules"
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
                @click="handleSubmitUploadAvatar"
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
                <v-color-picker
                  v-model="userRef.color"
                  hide-inputs
                  width="200"
                />
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
              color="yellow"
              text="Save Changes"
              type="submit"
              variant="flat"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { beigeTheme, blueTheme, grayTheme, setAppTheme } from "@/utils/themes";
import {
  stringRules,
  URLRegex,
  URLRules,
} from "@/utils/validations/formValidations";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import {
  TAnime,
  TBook,
  TCharacter,
  TEmote,
  TGame,
  TManga,
  TMovie,
  TMusic,
  TNote,
  TUser,
  TUserInput,
  TTheme,
} from "@/types/index";
import { EUserRole } from "../../../common/types";
import { getAuth, signOut } from "firebase/auth";

const mediaStore = useMediaStore();
const { fetchMediaCount, setSnackbar, setUserFromDB, submitEditUser } =
  mediaStore;
const {
  anime,
  books,
  characters,
  emotes,
  games,
  manga,
  movies,
  music,
  notes,
  userFromDB,
  mediaCount,
} = storeToRefs(mediaStore);

const isAdmin = userFromDB.value?.role === EUserRole.ADMIN;

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

// const avatarUpload = ref();
const settingsModal = ref<boolean>(false);
const userRef = ref(userProfile);

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
    color: "purple",
    data: books.value,
    size: "small",
    text: "Books",
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
    isAdmin: !isAdmin,
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
    color: "green",
    data: manga.value,
    size: "small",
    text: "Manga",
  },
  {
    class: "me-2 mt-2",
    color: "yellow",
    data: movies.value,
    size: "small",
    text: "Movies",
  },
  {
    class: "me-2 mt-2",
    color: "deep-purple",
    data: music.value,
    size: "small",
    text: "Music",
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

const mediaType = computed(() => [
  { media: "Anime", total: mediaCount.value?.anime },
  { media: "Books", total: mediaCount.value?.books },
  { media: "Characters", total: mediaCount.value?.characters },
  { media: "Emotes", total: mediaCount.value?.emotes, isAdmin: !isAdmin },
  { media: "Games", total: mediaCount.value?.games },
  { media: "Manga", total: mediaCount.value?.manga },
  { media: "Movies", total: mediaCount.value?.movies },
  { media: "Music", total: mediaCount.value?.music },
  { media: "Notes", total: mediaCount.value?.notes },
]);

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

const handleDownloadMedia = (
  jsonData:
    | TAnime[]
    | TBook[]
    | TCharacter[]
    | TEmote[]
    | TGame[]
    | TManga[]
    | TMovie[]
    | TMusic[]
    | TNote[],
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

const handleLogout = async () => {
  const auth = getAuth();
  await signOut(auth);

  setSnackbar(true, {
    color: "green",
    text: `Logged out`,
  });

  window.open("/login", "_self");
};

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

  if (
    updatedProfile.username &&
    URLRegex.test(String(updatedProfile.profileImg))
  ) {
    submitEditUser(updatedProfile);
    setUserFromDB(userRef.value as TUser);
    settingsModal.value = false;
  }
};

// const handleSubmitUploadAvatar = () => {
//   console.log(avatarUpload);
// };

onMounted(async () => {
  await fetchMediaCount();
});
</script>
