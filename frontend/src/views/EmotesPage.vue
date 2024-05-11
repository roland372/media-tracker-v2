<template>
  <HeaderComponent title="Favourite Emotes">
    <v-text-field
      v-model="favEmoteSearch"
      @click:clear="() => (favEmoteSearch = '')"
      clearable
      class="mb-2 text-color"
      density="compact"
      hide-details="auto"
      label="Search for an Emote"
      variant="outlined"
    />
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
          class="bg-primary-dark pa-1 d-flex align-center justify-center flex-grow-1 position-relative rounded"
          style="cursor: pointer"
        >
          <img :alt="emote.name" :src="emote.url" style="height: 64px" />
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
            <div @click="handleEmoteClick(emote.url)" style="cursor: pointer">
              <img
                :alt="emote.name"
                class="mb-n1"
                :src="emote.url"
                style="height: 64px"
              />
              <v-icon
                v-if="emote.favourites"
                class="image-overlay-icon"
                color="yellow-accent-4"
                icon="mdi-star"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <ButtonText
      v-if="emotes.length > 20"
      @click="displayEmotes"
      :append-icon="
        displayEmotesFlag === 20 ? 'mdi-arrow-down-bold' : 'mdi-arrow-up-bold'
      "
      class="mt-3"
      color="indigo"
      :text="displayEmotesFlag === 20 ? 'Display All' : 'Display Less'"
    />
  </HeaderComponent>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import { copyImageToClipboard } from "copy-image-clipboard";
import ButtonText from "@/components/ui/ButtonText.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";

const mediaStore = useMediaStore();
const { setSnackbar } = mediaStore;
const { emotes } = storeToRefs(mediaStore);

const displayEmotesFlag = ref<number>(20);
const emoteSearch = ref<string>("");
const favEmoteSearch = ref<string>("");

const allEmotes = computed(() =>
  orderBy(emotes.value, ["name"], ["asc"])
    .filter((e) =>
      e.name.toLocaleLowerCase().includes(emoteSearch.value.toLocaleLowerCase())
    )
    .slice(0, displayEmotesFlag.value)
);

const favouriteEmotes = computed(() =>
  orderBy(
    filter(emotes.value, { favourites: true }).filter((e) =>
      e.name
        .toLocaleLowerCase()
        .includes(favEmoteSearch.value.toLocaleLowerCase())
    ),
    ["name"],
    ["asc"]
  )
);

const displayEmotes = () => {
  displayEmotesFlag.value === 20
    ? (displayEmotesFlag.value = emotes.value.length)
    : (displayEmotesFlag.value = 20);
};

const handleEmoteClick = (url: string): void => {
  copyImageToClipboard(url)
    .then(() => {
      setSnackbar(true, {
        color: "green",
        img: url,
        text: "Copied to Clipboard",
      });
    })
    .catch(() => {
      navigator.clipboard.writeText(url);
      setSnackbar(true, {
        color: "green",
        img: url,
        text: "Copied to Clipboard",
      });
    });
};
</script>
<style scoped>
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.delete-dialog-position {
  margin-top: -50vh;
}
</style>
