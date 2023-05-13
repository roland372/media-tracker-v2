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
    <h3 v-if="!notes.length">Not found any items.</h3>
    <section v-else class="v-row my-1">
      <div
        v-for="note in orderBy(notes, ['lastModified'], ['desc'])"
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
                @click="handleOpenViewNoteModal(note._id, note)"
                icon="mdi-open-in-new"
                icon-color="blue-darken-4"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                @click="handleOpenEditNoteModal(note._id, note)"
                icon="mdi-pencil-outline"
                icon-color="green-darken-1"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                @click="handleOpenDeleteNoteModal(note._id)"
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
    :eager="true"
    :retain-focus="false"
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
                text="Select Color"
              />
            </template>
            <v-color-picker
              v-model="newNote.color"
              :modes="['hexa']"
              class="overflow-x-hidden"
            />
          </v-menu>
        </section>
        <TinyMCEEditor
          @editor-change="handleGetEditorContent"
          :editor-content="newNote.note"
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
  <v-dialog
    v-if="editNoteModal"
    v-model="editNoteModal"
    max-width="1000"
    persistent
    :eager="true"
    :retain-focus="false"
    ><v-card>
      <div
        class="bg-primary px-5 py-3 text-h6 d-flex justify-space-between align-center"
      >
        <div>Edit Note</div>
        <ButtonIcon
          @click="editNoteModal = false"
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
            v-model="noteRef.title"
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
                :color="noteRef.color"
                text="Select Color"
              />
            </template>
            <v-color-picker
              v-model="noteRef.color"
              :modes="['hexa']"
              class="overflow-x-hidden"
            />
          </v-menu>
        </section>
        <TinyMCEEditor
          @editor-change="handleGetEditorContent"
          :editor-content="noteRef.note"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-2 mt-n2 mb-2">
        <ButtonText
          @click="handleSubmitEditNote"
          color="green"
          text="Edit Note"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
  <v-dialog v-if="deleteNoteModal" v-model="deleteNoteModal" max-width="300"
    ><v-card>
      <div class="bg-primary px-5 py-3 text-h6">Deleting Note</div>
      <v-card-text>
        <p>Are you sure you want to delete this note?</p>
        <b>{{ noteRef.title }}</b>
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
  <v-dialog v-if="viewNoteModal" v-model="viewNoteModal" max-width="1000"
    ><v-card>
      <div class="bg-primary px-5 py-3 text-h6">
        <div>{{ noteRef.title }}</div>
      </div>
      <v-card-text class="mx-n2 mb-2">
        <section>
          <section v-html="noteRef?.note?.replace(/<ul>/g, viewNoteText)" />
        </section>
      </v-card-text> </v-card
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
import TinyMCEEditor from "@/components/media/TinyMCEEditor.vue";

import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { TNoteInput } from "@/types";
import { TNote } from "@/types";
import { orderBy } from "lodash";

const mediaStore = useMediaStore();
const { notes } = storeToRefs(mediaStore);
const { submitAddNote, submitEditNote, submitDeleteNote, userFromDB } =
  mediaStore;

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
  note: "",
  owner: userFromDB?.email as string,
  title: "New Note",
});

const noteID = ref<string>("");
const noteRef = ref<TNoteInput>(newNote);
const viewNoteText = '<ul style="margin-left: 1rem;">';

const handleGetEditorContent = (emittedValue: string) => {
  noteRef.value.note = emittedValue;
};

const handleOpenAddNoteModal = () => {
  addNoteModal.value = !addNoteModal.value;
};

const handleSubmitAddNote = async () => {
  newNote.note = noteRef.value.note;
  await submitAddNote(newNote);
  snackbar.value.text = "Note Added";
  snackbar.value.value = !snackbar.value.value;
  addNoteModal.value = false;

  newNote.color = "#FFFFFF";
  newNote.note = "";
  newNote.title = "New Note";
};

const handleOpenDeleteNoteModal = (id: string) => {
  deleteNoteModal.value = !deleteNoteModal.value;
  noteID.value = id;
};
const handleDeleteCancel = () => {
  deleteNoteModal.value = false;
};
const handleDeleteConfirm = async () => {
  await submitDeleteNote(noteID.value);
  snackbar.value.text = "Note Deleted";
  snackbar.value.value = !snackbar.value.value;
  noteID.value = "";
  deleteNoteModal.value = false;
};

const handleOpenEditNoteModal = (id: string, note: TNote) => {
  editNoteModal.value = !editNoteModal.value;

  const updatedNote: TNoteInput = reactive({
    color: note.color,
    lastModified: Date.now(),
    note: note.note,
    owner: userFromDB?.email as string,
    title: note.title,
  });

  noteRef.value = updatedNote;
  noteID.value = id;
};

const handleSubmitEditNote = async () => {
  await submitEditNote(noteID.value, noteRef.value);

  snackbar.value.text = "Note Edited";
  snackbar.value.value = !snackbar.value.value;
  editNoteModal.value = false;
  noteRef.value.note = "";
};

const handleOpenViewNoteModal = (id: string, note: TNote) => {
  viewNoteModal.value = !viewNoteModal.value;
  noteRef.value = note;
  noteID.value = id;
};

const setStyle = () => {
  document
    .querySelectorAll("ul")
    .forEach((el) => (el.style.marginLeft = "1rem"));
};

onMounted(() => {
  setStyle();
});
</script>
<style scoped></style>
