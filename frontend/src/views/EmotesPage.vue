<template>
  <HeaderComponent title="Discord Emotes">
    <section class="d-flex align-center justify-start">
      <ButtonText @click="handleOpenEmoteModal" class="me-2" text="Add Emote" />
      <ButtonText text="Edit Emotes" />
    </section>
  </HeaderComponent>
  <HeaderComponent title="Favourite Emotes">
    <section class="d-flex flex-wrap justify-space-between">
      <div
        v-for="emote in favouriteEmotes"
        :key="emote.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <v-tooltip activator="parent" location="top">{{
          emote.name
        }}</v-tooltip>
        <div
          class="bg-amber pa-1 d-flex align-center justify-center flex-grow-1"
        >
          <img :src="emote.url" :alt="emote.name" style="height: 64px" />
        </div>
      </div>
    </section>
  </HeaderComponent>
  <HeaderComponent title="All Emotes">
    <section class="d-flex flex-wrap justify-space-between">
      <div
        v-for="emote in sortedEmotes"
        :key="emote.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <v-tooltip activator="parent" location="top">{{
          emote.name
        }}</v-tooltip>
        <div
          class="bg-amber pa-2 d-flex align-center justify-center flex-grow-1"
        >
          <img :src="emote.url" :alt="emote.name" style="height: 64px" />
        </div>
      </div>
    </section>
  </HeaderComponent>
  <v-dialog v-if="emoteModal" v-model="emoteModal" max-width="500"
    ><v-card>
      <div class="bg-primary px-5 py-3 text-h6">Add Emote</div>
      <v-card-text>
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
          label="Description"
          variant="outlined"
        />
        <section class="d-flex align-center ms-2 mt-n4 mb-n6">
          <div>Add to Favourites?</div>
          <v-checkbox v-model="emoteRef.favourites" hide-details />
        </section>
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-4 mb-2">
        <ButtonText
          @click="handleSubmitAddEmote"
          color="yellow"
          text="Add Emote"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortArrayByPropertyASC, favouriteMedia } from "@/utils/mediaUtils";
import { TEmote, TEmoteInput } from "@/types";

const mediaStore = useMediaStore();
const { emotes } = storeToRefs(mediaStore);
const sortedEmotes = ref<TEmote[]>(sortArrayByPropertyASC(emotes, "name"));
const favouriteEmotes: TEmote[] = favouriteMedia(sortedEmotes);

const emoteModal = ref<boolean>(false);
const emote: TEmoteInput = reactive({
  favourites: false,
  lastModified: Date.now(),
  name: "",
  url: "",
});
const emoteRef = ref<TEmoteInput>(emote);

const handleOpenEmoteModal = () => {
  emoteModal.value = !emoteModal.value;
};

const handleSubmitAddEmote = () => {
  console.log(emoteRef.value);
  emoteModal.value = false;
};
</script>
