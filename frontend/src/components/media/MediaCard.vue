<template>
  <v-img
    @click="dialog = !dialog"
    class="rounded image-hover"
    cover
    :src="media.imageURL || placeholderImg"
    :style="{
      borderBottom: `5px ${statusColor(media)} solid`,
      borderRight: `5px ${statusColor(media)} solid`,
    }"
  >
    <div class="image-overlay-icon">
      <v-icon v-if="media.favourites" color="yellow-accent-4" icon="mdi-star" />
    </div>
    <ChipComponent
      v-if="
        mediaType !== EMediaType.CHARACTER &&
        mediaType !== EMediaType.MANGA &&
        mediaType !== EMediaType.MOVIE
      "
      class="bg-black image-text-overlay"
      color="white"
      size="x-small"
      text-color="white"
      :text="displayImageText(media)"
    />
    <ChipComponent
      class="bg-black image-title-overlay"
      color="white"
      size="x-small"
      :text="mediaType === EMediaType.CHARACTER ? formatString((media as TCharacter).name) : formatString((media as TAnime | TBook | TGame | TManga | TMovie).title)"
      text-color="white"
    />
    <MediaModal
      v-if="dialog"
      v-model="dialog"
      :delete-click="handleDeleteClick"
      :edit-click="handleEditClick"
      :media="media"
      :media-type="mediaType"
      :title="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TBook | TGame | TManga | TMovie).title"
      :view-click="handleViewClick"
    />
    <v-dialog
      v-if="deleteDialog"
      v-model="deleteDialog"
      class="delete-dialog-position"
      width="auto"
    >
      <v-card max-width="250">
        <div class="bg-primary-light text-color px-5 py-3 text-h6">
          Deleting
          {{
            props.mediaType === EMediaType.CHARACTER
              ? (props.media as TCharacter).name
              : (props.media as TAnime | TBook | TManga | TGame | TMovie).title
          }}
        </div>
        <v-card-text
          >Are you sure you want to delete this
          {{ props.mediaType }}?</v-card-text
        >
        <v-card-actions class="d-flex justify-space-around mb-2">
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
        </v-card-actions>
      </v-card>
    </v-dialog>
    <EditFormComponent
      v-if="formDialog"
      v-model="formDialog"
      @close="formDialog = !formDialog"
      @edit="handleCloseModal"
      :media="media"
      :media-type="mediaType"
      :title="`Edit ${mediaType}`"
    />
    <SnackbarComponent v-model="snackbar" :text="snackbarText" />
  </v-img>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { placeholderImg } from "@/utils/mediaUtils";
import ButtonText from "../ui/ButtonText.vue";
import ChipComponent from "../ui/ChipComponent.vue";
import EditFormComponent from "./EditFormComponent.vue";
import MediaModal from "@/components/media/MediaModal.vue";
import SnackbarComponent from "../ui/SnackbarComponent.vue";
import {
  EAnimeStatus,
  EBookStatus,
  ECharacterSource,
  EGameStatus,
  EMangaStatus,
  EMediaType,
  EMovieStatus,
  TAnime,
  TBook,
  TCharacter,
  TGame,
  TManga,
  TMovie,
} from "@/types";

const mediaStore = useMediaStore();
const {
  submitDeleteAnime,
  submitDeleteBook,
  submitDeleteCharacter,
  submitDeleteGame,
  submitDeleteManga,
  submitDeleteMovie,
} = mediaStore;

interface IMediaCardProps {
  media: TAnime | TBook | TCharacter | TGame | TManga | TMovie;
  mediaType: EMediaType;
}

const props = defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const formDialog = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const snackbarText = ref<string>("");

const displayImageText = (
  media: TAnime | TBook | TCharacter | TGame | TManga | TMovie
) => {
  let imageText = "";
  switch (props.mediaType) {
    case EMediaType.ANIME:
      imageText = `Ep ${(media as TAnime).episodesMin} / ${
        (media as TAnime).episodesMax
      }`;
      break;
    case EMediaType.BOOK:
      imageText = `${(media as TBook).author}`;
      break;
    case EMediaType.GAME:
      imageText = `${(media as TGame).playtime} hours`;
      break;
    default:
      break;
  }
  return imageText;
};

const statusColor = (
  media: TAnime | TBook | TCharacter | TGame | TManga | TMovie
) => {
  let color = "";
  if ((media as TCharacter).source) {
    switch ((media as TCharacter).source) {
      case ECharacterSource.ANIME:
        color = "green";
        break;
      case ECharacterSource.GAME:
        color = "blue";
        break;
      case ECharacterSource.MANGA:
        color = "yellow";
        break;
    }
  } else {
    switch ((media as TAnime | TBook | TGame | TManga | TMovie).status) {
      case EAnimeStatus.WATCHING:
      case EBookStatus.READING:
      case EGameStatus.PLAYING:
      case EMangaStatus.READING:
      case EMovieStatus.WATCHING:
        color = "green";
        break;
      case EAnimeStatus.COMPLETED:
      case EBookStatus.COMPLETED:
      case EGameStatus.COMPLETED:
      case EMangaStatus.COMPLETED:
      case EMovieStatus.COMPLETED:
        color = "blue";
        break;
      case EAnimeStatus.ON_HOLD:
      case EBookStatus.ON_HOLD:
      case EGameStatus.ON_HOLD:
      case EMangaStatus.ON_HOLD:
      case EMovieStatus.ON_HOLD:
        color = "yellow";
        break;
      case EAnimeStatus.DROPPED:
      case EBookStatus.DROPPED:
      case EGameStatus.DROPPED:
      case EMangaStatus.DROPPED:
      case EMovieStatus.DROPPED:
        color = "red";
        break;
      case EAnimeStatus.PLAN_TO_WATCH:
      case EBookStatus.PLAN_TO_READ:
      case EGameStatus.PLAN_TO_PLAY:
      case EMangaStatus.PLAN_TO_READ:
      case EMovieStatus.PLAN_TO_WATCH:
        color = "white";
        break;
    }
  }
  return color;
};

const formatString = (string: string) => {
  if (string.length > 25) {
    return string.slice(0, 12) + "...";
  }
  return string;
};

const handleDeleteCancel = () => {
  deleteDialog.value = !deleteDialog.value;
};

const handleDeleteClick = async () => {
  dialog.value = !dialog.value;
  deleteDialog.value = !deleteDialog.value;
};

const handleCloseModal = () => {
  formDialog.value = !formDialog.value;
  snackbarText.value = `${props.mediaType} Updated`;
  snackbar.value = true;
};

const handleDeleteConfirm = async () => {
  switch (props.mediaType) {
    case EMediaType.ANIME:
      await submitDeleteAnime(props.media._id);
      break;
    case EMediaType.BOOK:
      await submitDeleteBook(props.media._id);
      break;
    case EMediaType.CHARACTER:
      await submitDeleteCharacter(props.media._id);
      break;
    case EMediaType.GAME:
      await submitDeleteGame(props.media._id);
      break;
    case EMediaType.MANGA:
      await submitDeleteManga(props.media._id);
      break;
    case EMediaType.MOVIE:
      await submitDeleteMovie(props.media._id);
      break;
  }
  deleteDialog.value = !deleteDialog.value;
  snackbarText.value = props.mediaType + " Deleted";
  snackbar.value = true;
};

const handleEditClick = () => {
  dialog.value = !dialog.value;
  formDialog.value = !formDialog.value;
};

const handleViewClick = () => {
  dialog.value = !dialog.value;
};
</script>
<style>
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}

.image-text-overlay {
  position: absolute;
  left: 0;
  top: 0;
}

.image-title-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
}

.image-manga-chapters {
  position: absolute;
  left: 0;
  top: 0;
}

.image-manga-volumes {
  position: absolute;
  left: 0;
  top: 20px;
}

.delete-dialog-position {
  margin-top: -50vh;
}
</style>
