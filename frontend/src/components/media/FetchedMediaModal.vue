<template>
  <v-dialog
    v-model="showModalRef"
    @click:outside="handleCloseModal"
    max-width="500"
    ><v-card>
      <div class="bg-primary px-5 py-3 text-h6">
        {{ title }}
      </div>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-start ms-2 mb-2">
        <ButtonText
          @click="submitClick"
          color="yellow"
          text="Add"
          variant="flat"
        />
        <ButtonText
          @click="viewMoreClick"
          color="green"
          text="View More"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from "vue";
import ButtonText from "../ui/ButtonText.vue";

interface IFetchedMediaComponentProps {
  showModal: boolean;
  title: string;
  submitClick: () => void;
  viewMoreClick: () => void;
}

const props = defineProps<IFetchedMediaComponentProps>();
const emit = defineEmits(["closeModal"]);
const showModalRef = ref<boolean>(props.showModal);
const handleCloseModal = () => {
  emit("closeModal");
};

onMounted(() => {
  window.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  });
});
</script>
