<template>
  <div class="p-20">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
  </div>
</template>
<script setup>
  import { ref } from "vue";
  import { message } from "ant-design-vue";
  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const fileList = ref([]);
  const headers = {
    authorization: "authorization-text",
  };
</script>
