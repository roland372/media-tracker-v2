<template>
  <HeaderComponent title="Profile">
    <section>
      <h3 class="mb-4 pt-2">Welcome {{ userRef.email }}</h3>
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
        <aside class="bg-grey px-5 pt-2 pb-5 v-col-sm-8 rounded-b">
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
                :key="button.text"
                :class="button.class"
                :color="button.color"
                :size="button.size"
                :text="button.text"
              />
            </div>
          </section>
          <section>
            <h3>Backup</h3>
            <hr />
            <div class="d-flex align-center justify-start flex-wrap py-3">
              <ButtonText
                v-for="button in backupButtons"
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
                class="me-2 mt-2"
                color="blue"
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
        <div class="bg-primary px-5 py-3 text-h6">Edit Profile</div>
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
          <div class="d-flex justify-space-around mb-n3">
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
          </div>
          <div class="mt-n5">
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
import { TUserInput, TUser, EUserRole } from "@/types/index";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";

const settingsModal = ref<boolean>(false);
const userProfile: TUser = reactive({
  color: "#8484ED",
  email: "damfat94@gmail.com",
  googleId: "123",
  profileDesc: "description",
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/media-tracker-f3101.appspot.com/o/A43pMBPrXiYLnMdsSu8GLclowvl2.png?alt=media&token=799f8a41-978e-4ef9-b8c9-b8c7480f8e8c",
  role: EUserRole.ADMIN,
  username: "Roland",
});
const userRef = ref<TUser>(userProfile);
const avatarUpload = ref();
const mediaType = [
  { media: "Anime", total: "614" },
  { media: "Manga", total: "202" },
  { media: "Games", total: "398" },
  { media: "Characters", total: "476" },
  { media: "Emotes", total: "383" },
  { media: "Notes", total: "11" },
];

const backupButtons = [
  { class: "me-2 mt-2", color: "blue", size: "small", text: "Anime" },
  { class: "me-2 mt-2", color: "grey", size: "small", text: "Manga" },
  { class: "me-2 mt-2", color: "yellow", size: "small", text: "Games" },
  { class: "me-2 mt-2", color: "pink", size: "small", text: "Characters" },
  { class: "me-2 mt-2", color: "orange", size: "small", text: "Emotes" },
  { class: "mt-2", color: "green", size: "small", text: "Notes" },
];

const colorThemeButtons = [
  { class: "me-2 mt-2", color: "blue", size: "small", text: "Blue" },
  { class: "me-2 mt-2", color: "grey", size: "small", text: "Gray" },
  { class: "me-2 mt-2", color: "yellow", size: "small", text: "Beige" },
  { class: "mt-2", color: "pink", size: "small", text: "Random" },
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

  console.log(updatedProfile);
};

const handleSubmitUploadAvatar = () => {
  console.log(avatarUpload);
};
</script>
