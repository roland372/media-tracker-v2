<template>
  <HeaderComponent title="Notes">
    <section class="d-flex align-center justify-space-between">
      <ButtonText class="me-2" text="Add Emote" />
      <ButtonText color="yellow" text="Settings" />
    </section>
    <hr class="my-3 border-b" />
    <section class="v-row">
      <div
        v-for="note in sortedNotes"
        :key="note.id"
        class="v-col-lg-4 v-col-sm-6 v-col-12 text-wrap"
        style="word-wrap: break-word"
      >
        <section
          class="text-start bg-blue-lighten-5 pa-3 fill-height d-flex flex-column justify-space-between rounded"
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
                icon="mdi-open-in-new"
                icon-color="blue-darken-4"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
                icon="mdi-pencil-outline"
                icon-color="green-darken-1"
                icon-size="small"
                variant="text"
              />
              <ButtonIcon
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
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { sortMediaByDate } from "@/utils/mediaUtils";

const mediaStore = useMediaStore();
const { notes } = storeToRefs(mediaStore);
const sortedNotes = sortMediaByDate(notes);
const { submitAddNote, submitEditNote, submitDeleteNote } = mediaStore;

onMounted(() => {
  document
    .querySelectorAll("ul")
    .forEach((el) => (el.style.marginLeft = "1rem"));
});
</script>
<style scoped></style>
