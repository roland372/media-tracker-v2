<template>
  <Editor
    v-model="editorContentRef"
    :api-key="tinyMCEAPIKey"
    :init="{
      autoresize_bottom_margin: 50,
      browser_spellcheck: true,
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      contextmenu: false,
      deprecation_warnings: false,
      forced_root_block: '',
      height: 500,
      menubar: true,
      plugins: [
        'advlist anchor autolink autosave charmap code codesample help insertdatetime lists link image media nonbreaking pagebreak paste preview searchreplace save table template wordcount visualchars',
      ],
      toolbar:
        'undo redo | bold italic underline strikethrough | bullist numlist outdent indent | forecolor backcolor removeformat | link image media | alignleft aligncenter alignright alignjustify | superscript subscript codesample charmap | code help',
      toolbar_mode: 'floating',
    }"
  />
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";

interface ITinyMCEEditorProps {
  editorContent: string | undefined;
}

const props = defineProps<ITinyMCEEditorProps>();
const editorContentRef = ref<string | undefined>(props.editorContent);
const tinyMCEAPIKey = process.env.VUE_APP_TinyMCEAPIKey;

const emit = defineEmits(["editorChange"]);

const getEditorContent = () => {
  emit("editorChange", editorContentRef.value);
};

watch(editorContentRef, () => {
  getEditorContent();
});
</script>
<style>
.tox.tox-tinymce-aux,
.tox-fullscreen .tox.tox-tinymce-aux {
  z-index: 4000;
}
</style>
