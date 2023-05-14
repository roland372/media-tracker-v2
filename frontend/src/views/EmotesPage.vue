<template>
  <HeaderComponent title="Discord Emotes">
    <section class="d-flex align-center justify-start">
      <ButtonText
        @click="handleOpenAddEmoteModal"
        class="me-2"
        color="indigo"
        text="Add Emote"
      />
      <ButtonText
        @click="handleToggleEditingMode"
        color="yellow"
        :text="!isEditing ? 'Edit Emotes' : 'Stop Editing'"
      />
    </section>
  </HeaderComponent>
  <HeaderComponent v-if="!isEditing" title="Favourite Emotes">
    <h3 v-if="!favouriteEmotes.length" class="text-color">
      Not found any items.
    </h3>
    <section v-else class="d-flex flex-wrap justify-space-between">
      <div
        v-for="emote in favouriteEmotes"
        :key="emote.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <v-tooltip activator="parent" location="top">{{
          emote.name
        }}</v-tooltip>
        <div
          @click="handleEmoteClick(emote.url)"
          class="bg-primary-dark pa-1 d-flex align-center justify-center flex-grow-1 position-relative rounded image-hover"
        >
          <img :src="emote.url" :alt="emote.name" style="height: 64px" />
          <v-icon
            v-if="emote.favourites"
            class="image-overlay-icon"
            color="yellow-accent-4"
            icon="mdi-star"
          />
        </div>
      </div>
    </section>
  </HeaderComponent>
  <HeaderComponent title="All Emotes">
    <v-text-field
      v-model="emoteSearch"
      @click:clear="() => (emoteSearch = '')"
      clearable
      class="mb-2 text-color"
      density="compact"
      hide-details="auto"
      label="Search for an Emote"
      variant="outlined"
    />
    <h3 v-if="!allEmotes.length" class="text-color">Not found any items.</h3>
    <section v-else class="d-flex flex-wrap justify-space-between">
      <div
        v-for="emote in allEmotes"
        :key="emote.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <v-tooltip activator="parent" location="top">{{
          emote.name
        }}</v-tooltip>
        <div
          class="bg-primary-dark pa-1 d-flex align-center justify-center flex-grow-1 position-relative rounded"
        >
          <div>
            <div @click="handleEmoteClick(emote.url)" class="image-hover">
              <img
                :src="emote.url"
                :alt="emote.name"
                style="height: 64px"
                class="mb-n1"
              />
              <v-icon
                v-if="emote.favourites"
                class="image-overlay-icon"
                color="yellow-accent-4"
                icon="mdi-star"
              />
            </div>
            <div v-if="isEditing">
              <ButtonIcon
                @click="handleOpenEditEmoteModal(emote._id, emote)"
                icon="mdi-pencil-outline"
                icon-color="green"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                @click="handleOpenDeleteEmoteModal(emote._id, emote)"
                icon="mdi-trash-can-outline"
                icon-color="red"
                icon-size="small"
                variant="text"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <ButtonText
      v-if="emotes.length > 20"
      @click="displayEmotes"
      class="mt-3"
      color="indigo"
      :append-icon="
        displayEmotesFlag === 20 ? 'mdi-arrow-down-bold' : 'mdi-arrow-up-bold'
      "
      :text="displayEmotesFlag === 20 ? 'Display All' : 'Display Less'"
    />
  </HeaderComponent>
  <v-dialog v-if="addEmoteModal" v-model="addEmoteModal" max-width="500"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">Add Emote</div>
      <v-card-text>
        <v-text-field
          v-model="newEmote.name"
          class="mb-2"
          density="compact"
          hide-details="auto"
          label="Name"
          :rules="[(val) => !!val || 'Name is required.']"
          variant="outlined"
        />
        <v-text-field
          v-model="newEmote.url"
          class="mb-2"
          density="compact"
          hide-details="auto"
          label="URL"
          :rules="[(val) => !!val || 'URL is required.']"
          variant="outlined"
        />
        <section class="d-flex align-center ms-2 mt-n4 mb-n6">
          <div>Add to Favourites?</div>
          <v-checkbox v-model="newEmote.favourites" hide-details />
        </section>
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-4 mb-2">
        <ButtonText
          @click="handleSubmitAddEmote"
          color="green"
          text="Add Emote"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
  <v-dialog v-if="editEmoteModal" v-model="editEmoteModal" max-width="500"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Edit Emote
      </div>
      <v-card-text>
        <img
          :src="emoteRef.url"
          :alt="emoteRef.name"
          style="height: 64px"
          class="mt-n2 mb-2"
        />
        <v-text-field
          v-model="emoteRef.name"
          class="mb-2"
          density="compact"
          hide-details="auto"
          label="Name"
          :rules="[(val) => !!val || 'Name is required.']"
          variant="outlined"
        />
        <v-text-field
          v-model="emoteRef.url"
          class="mb-2"
          density="compact"
          hide-details="auto"
          label="URL"
          :rules="[(val) => !!val || 'URL is required.']"
          variant="outlined"
        />
        <section class="d-flex align-center ms-2 mt-n4 mb-n6">
          <div>Add to Favourites?</div>
          <v-checkbox v-model="emoteRef.favourites" hide-details />
        </section>
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-4 mb-2">
        <ButtonText
          @click="handleSubmitEditEmote"
          color="yellow"
          text="Update Emote"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
  <v-dialog v-if="deleteEmoteModal" v-model="deleteEmoteModal" max-width="300"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Deleting Emote
      </div>
      <v-card-text>
        <p>Are you sure you want to delete this emote?</p>
        <img
          :src="emoteRef.url"
          :alt="emoteRef.name"
          style="height: 64px"
          class="mt-1 mb-n2"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-start mb-2 ms-2">
        <ButtonText
          @click="handleDeleteCancel"
          color="yellow"
          text="Cancel"
          variant="flat"
        />
        <ButtonText
          @click="handleDeleteConfirm"
          color="red"
          text="Delete"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
  <SnackbarComponent
    v-if="snackbar.value"
    :snackbar="snackbar.value"
    :text="snackbar.text"
  />
</template>
<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { TEmote, TEmoteInput } from "@/types";
import { filter, orderBy } from "lodash";
import { copyImageToClipboard } from "copy-image-clipboard";

const mediaStore = useMediaStore();
const { emotes } = storeToRefs(mediaStore);
const { submitAddEmote, submitDeleteEmote, submitEditEmote } = mediaStore;

const isEditing = ref<boolean>(false);
const addEmoteModal = ref<boolean>(false);
const editEmoteModal = ref<boolean>(false);
const deleteEmoteModal = ref<boolean>(false);
const displayEmotesFlag = ref<number>(20);

const displayEmotes = () => {
  displayEmotesFlag.value === 20
    ? (displayEmotesFlag.value = emotes.value.length)
    : (displayEmotesFlag.value = 20);
};

const favouriteEmotes = computed(() =>
  orderBy(filter(emotes.value, { favourites: true }), ["name"], ["asc"])
);

const allEmotes = computed(() =>
  orderBy(emotes.value, ["name"], ["asc"])
    .filter((e) =>
      e.name.toLocaleLowerCase().includes(emoteSearch.value.toLocaleLowerCase())
    )
    .slice(0, displayEmotesFlag.value)
);

const snackbar = ref({
  text: "",
  value: false,
});

const newEmote: TEmoteInput = reactive({
  favourites: false,
  lastModified: Date.now(),
  name: "",
  url: "",
});

const emoteID = ref<string>("");
const emoteRef = ref<TEmoteInput>(newEmote);

const emoteSearch = ref<string>("");

const handleOpenAddEmoteModal = () => {
  addEmoteModal.value = !addEmoteModal.value;
};

const handleSubmitAddEmote = async () => {
  await submitAddEmote(newEmote);
  snackbar.value.text = "Emote Added";
  snackbar.value.value = !snackbar.value.value;
  addEmoteModal.value = false;

  newEmote.favourites = false;
  newEmote.name = "";
  newEmote.url = "";
};

const handleOpenDeleteEmoteModal = (id: string, emote: TEmote) => {
  deleteEmoteModal.value = !deleteEmoteModal.value;

  emoteID.value = id;
  emoteRef.value = emote;
};
const handleDeleteCancel = () => {
  deleteEmoteModal.value = false;
};
const handleDeleteConfirm = async () => {
  await submitDeleteEmote(emoteID.value);
  snackbar.value.text = "Emote Deleted";
  snackbar.value.value = !snackbar.value.value;
  emoteID.value = "";
  deleteEmoteModal.value = false;
};

const handleToggleEditingMode = () => {
  isEditing.value = !isEditing.value;
};
const handleOpenEditEmoteModal = (id: string, emote: TEmote) => {
  editEmoteModal.value = !editEmoteModal.value;

  const updatedEmote: TEmoteInput = reactive({
    favourites: emote.favourites,
    lastModified: Date.now(),
    name: emote.name,
    url: emote.url,
  });
  emoteRef.value = updatedEmote;
  emoteID.value = id;
};
const handleSubmitEditEmote = async () => {
  await submitEditEmote(emoteID.value, emoteRef.value);
  snackbar.value.text = "Emote Edited";
  snackbar.value.value = !snackbar.value.value;
  editEmoteModal.value = false;
};

const handleEmoteClick = (url: string): void => {
  copyImageToClipboard(url)
    .then(() => {
      console.log("image copied");
    })
    .catch(() => {
      navigator.clipboard.writeText(url);
    });
};
</script>
<style scoped>
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}

.image-hover {
  cursor: pointer;
}
</style>
