<template>
  <HeaderComponent title="Notes">
    <section class="d-flex align-center justify-space-between">
      <ButtonText
        @click="handleOpenAddNoteModal"
        class="me-2"
        text="Add Note"
      />
      <ButtonText color="yellow" text="Settings" />
    </section>
    <hr class="my-3 border-b" />
    <section class="v-row">
      <div
        v-for="note in sortedNotes"
        :key="note.color"
        class="v-col-lg-4 v-col-sm-6 v-col-12 text-wrap"
        style="word-wrap: break-word"
      >
        <section
          class="text-start bg-blue-lighten-5 pa-3 fill-height d-flex flex-column justify-space-between rounded"
          :style="{ borderTop: '5px solid' + note.color }"
        >
          <section>
            <section>
              <h2>
                {{
                  note.title.length > 30
                    ? note.title.slice(0, 30) + "..."
                    : note.title
                }}
              </h2>
            </section>
            <hr class="border-b" />
            <section
              v-html="
                note?.note?.length > 200
                  ? note?.note
                      ?.slice(0, 200)
                      ?.replace(
                        /<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/g,
                        ''
                      ) + '...'
                  : note?.note?.replace(
                      /<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/g,
                      ''
                    ) + ''
              "
              class="py-3"
            />
          </section>
          <section class="d-flex align-center justify-space-between flex-wrap">
            <div class="text-grey">
              {{
                new Date(note.lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </div>
            <div>
              <ButtonIcon
                @click="handleOpenViewNoteModal"
                icon="mdi-open-in-new"
                icon-color="blue-darken-4"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                @click="handleOpenEditNoteModal"
                icon="mdi-pencil-outline"
                icon-color="green-darken-1"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                @click="handleOpenDeleteNoteModal"
                icon="mdi-trash-can-outline"
                icon-color="red-darken-4"
                icon-size="small"
                variant="text"
              />
            </div>
          </section>
        </section>
      </div>
    </section>
  </HeaderComponent>
  <v-dialog
    v-if="addNoteModal"
    v-model="addNoteModal"
    max-width="1000"
    persistent
    ><v-card>
      <div
        class="bg-primary px-5 py-3 text-h6 d-flex justify-space-between align-center"
      >
        <div>Add Note</div>
        <ButtonIcon
          @click="addNoteModal = false"
          class="me-n3"
          icon="mdi-close"
          icon-color="white"
          icon-size="large"
          variant="text"
        />
      </div>
      <v-card-text class="mx-n2">
        <section class="d-flex align-center justify-space-between mb-2">
          <v-text-field
            v-model="newNote.title"
            class="me-2"
            density="compact"
            hide-details="auto"
            label="Title"
            :rules="[(val) => !!val || 'Title is required.']"
            variant="outlined"
          />
          <v-menu open-on-hover :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <ButtonText
                v-bind="props"
                :color="newNote.color"
                text="Select color"
              />
            </template>
            <v-color-picker
              v-model="newNote.color"
              :modes="['hexa']"
              class="overflow-x-hidden"
            />
          </v-menu>
        </section>
        <v-text-field
          v-model="newNote.note"
          density="compact"
          hide-details="auto"
          label="Note"
          variant="outlined"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-2 mt-n2 mb-2">
        <ButtonText
          @click="handleSubmitAddNote"
          color="green"
          text="Add Note"
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
import { ref, reactive, onMounted } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortMediaByDate } from "@/utils/mediaUtils";
import { TNoteInput } from "@/types";
import { TNote } from "@/types";

const mediaStore = useMediaStore();
const { notes } = storeToRefs(mediaStore);
const sortedNotes: TNote[] = sortMediaByDate(notes);
const { submitAddNote, submitEditNote, submitDeleteNote } = mediaStore;

const addNoteModal = ref<boolean>(false);
const editNoteModal = ref<boolean>(false);
const deleteNoteModal = ref<boolean>(false);
const viewNoteModal = ref<boolean>(false);

const snackbar = ref({
  text: "",
  value: false,
});

const newNote: TNoteInput = reactive({
  color: "#FFFFFF",
  lastModified: Date.now(),
  note: "Note",
  title: "New Note",
});

const handleOpenAddNoteModal = () => {
  addNoteModal.value = !addNoteModal.value;
};

const handleSubmitAddNote = async () => {
  await submitAddNote(newNote);
  snackbar.value.text = "Note Added";
  snackbar.value.value = !snackbar.value.value;
  addNoteModal.value = false;

  newNote.color = "#FFFFFF";
  newNote.note = "Note";
  newNote.title = "New Note";
};

const handleOpenEditNoteModal = () => {
  editNoteModal.value = !editNoteModal.value;
};

const handleOpenDeleteNoteModal = () => {
  deleteNoteModal.value = !deleteNoteModal.value;
};

const handleOpenViewNoteModal = () => {
  viewNoteModal.value = !viewNoteModal.value;
};

onMounted(() => {
  document
    .querySelectorAll("ul")
    .forEach((el) => (el.style.marginLeft = "1rem"));
});
</script>
<style scoped></style>
