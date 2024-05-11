<template>
  <HeaderComponent title="Notes">
    <section class="d-flex align-center justify-space-between">
      <ButtonText
        @click="handleOpenAddNoteModal"
        class="me-2"
        color="indigo"
        text="Add Note"
      />
      <!-- <ButtonText color="yellow" text="Settings" /> -->
    </section>
    <h3 v-if="!notes.length" class="text-color">Not found any items.</h3>
    <section v-else class="v-row my-1">
      <div
        v-for="note in orderBy(notes, ['updatedAt'], ['desc'])"
        :key="note.color"
        class="v-col-lg-4 v-col-sm-6 v-col-12 text-wrap"
        style="word-wrap: break-word"
      >
        <section
          class="text-start bg-primary-dark text-color pa-3 fill-height d-flex flex-column justify-space-between rounded"
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
              {{ formatDate(note.updatedAt) }}
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
                @click="handleOpenDeleteNoteModal(note._id, note)"
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
    :eager="true"
    max-width="1000"
    persistent
    :retain-focus="false"
    ><v-card>
      <div
        class="bg-primary-light text-color px-5 py-3 text-h6 d-flex justify-space-between align-center"
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
      <v-form @submit.prevent="handleSubmitAddNote" validate-on="input">
        <v-card-text class="mx-n2">
          <section class="d-flex align-center justify-space-between mb-2">
            <v-text-field
              v-model="newNote.title"
              autofocus
              class="me-2"
              density="compact"
              hide-details="auto"
              label="Title"
              :rules="stringRules('Title')"
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
                class="overflow-x-hidden"
                :modes="['hexa']"
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
            color="green"
            text="Add Note"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form> </v-card
  ></v-dialog>
  <v-dialog
    v-if="editNoteModal"
    v-model="editNoteModal"
    :eager="true"
    max-width="1000"
    persistent
    :retain-focus="false"
    ><v-card>
      <div
        class="bg-primary-light text-color px-5 py-3 text-h6 d-flex justify-space-between align-center"
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
      <v-form @submit.prevent="handleSubmitEditNote" validate-on="input">
        <v-card-text class="mx-n2">
          <section class="d-flex align-center justify-space-between mb-2">
            <v-text-field
              v-model="noteRef.title"
              class="me-2"
              density="compact"
              hide-details="auto"
              label="Title"
              :rules="stringRules('Title')"
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
                class="overflow-x-hidden"
                :modes="['hexa']"
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
            color="yellow"
            text="Update Note"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form> </v-card
  ></v-dialog>
  <v-dialog
    v-if="deleteNoteModal"
    v-model="deleteNoteModal"
    class="delete-dialog-position"
    max-width="300"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Deleting Note
      </div>
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
      <div
        class="bg-primary-light text-color px-5 py-3 text-h6 d-flex justify-space-between align-center"
      >
        <div>{{ noteRef.title }}</div>
        <ButtonIcon
          @click="viewNoteModal = false"
          class="me-n3"
          icon="mdi-close"
          icon-color="white"
          icon-size="large"
          variant="text"
        />
      </div>
      <v-card-text class="mx-n2 mb-2">
        <section>
          <section
            v-html="noteRef?.note?.replace(/<(ul|ol)>/g, viewNoteText)"
          />
        </section>
      </v-card-text> </v-card
  ></v-dialog>
</template>
<script setup lang="ts">
import { onMounted, onUpdated, ref, reactive } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { orderBy } from "lodash";
import { stringRules } from "@/utils/validations/formValidations";
import { formatDate } from "@/utils/mediaUtils";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import TinyMCEEditor from "@/components/media/TinyMCEEditor.vue";
import { TNote, TNoteInput } from "@/types";

const mediaStore = useMediaStore();
const { userFromDB } = mediaStore;
const { notes } = storeToRefs(mediaStore);

const newNote: TNoteInput = reactive({
  color: "#FFFFFF",
  note: "",
  owner: userFromDB?.email as string,
  title: "New Note",
});

const addNoteModal = ref<boolean>(false);
const deleteNoteModal = ref<boolean>(false);
const editNoteModal = ref<boolean>(false);
const noteID = ref<string>("");
const noteRef = ref<TNoteInput>(newNote);
const viewNoteModal = ref<boolean>(false);
const viewNoteText = '<ul style="margin-left: 1rem;">';

const handleDeleteCancel = () => {
  deleteNoteModal.value = false;
};

const handleDeleteConfirm = async () => {
  noteID.value = "";
  deleteNoteModal.value = false;
};

const handleGetEditorContent = (emittedValue: string) => {
  noteRef.value.note = emittedValue;
};

const handleOpenAddNoteModal = () => {
  noteRef.value = newNote;
  addNoteModal.value = !addNoteModal.value;
};

const handleOpenDeleteNoteModal = (id: string, note: TNote) => {
  deleteNoteModal.value = !deleteNoteModal.value;
  noteRef.value = note;
  noteID.value = id;
};

const handleOpenEditNoteModal = (id: string, note: TNote) => {
  editNoteModal.value = !editNoteModal.value;

  const updatedNote: TNoteInput = reactive({
    color: note.color,
    note: note.note,
    owner: userFromDB?.email as string,
    title: note.title,
  });

  noteRef.value = updatedNote;
  noteID.value = id;
};

const handleOpenViewNoteModal = (id: string, note: TNote) => {
  viewNoteModal.value = !viewNoteModal.value;
  noteRef.value = note;
  noteID.value = id;
};

const handleSubmitAddNote = async () => {
  if (newNote.title) {
    addNoteModal.value = false;

    newNote.color = "#FFFFFF";
    newNote.note = "";
    newNote.title = "New Note";
  }
};

const handleSubmitEditNote = async () => {
  if (noteRef.value.title) {
    editNoteModal.value = false;
    noteRef.value.note = "";
  }
};

const setStyle = () => {
  document
    .querySelectorAll("ul")
    .forEach((el) => (el.style.marginLeft = "1rem"));
  document
    .querySelectorAll("ol")
    .forEach((el) => (el.style.marginLeft = "1rem"));
};

onMounted(async () => {
  setStyle();
});

onUpdated(() => {
  setStyle();
});
</script>
<style scoped>
.delete-dialog-position {
  margin-top: -50vh;
}
</style>
