<script setup>
  import { useRoute } from "vue-router";
  import { computed, onBeforeMount, onMounted, watchEffect, ref } from "vue";
  import localStore from "./utils/localStore";
  import { useI18n } from "vue-i18n";
  import { ConfigProvider } from "ant-design-vue";
  const route = useRoute();
  const { locale } = useI18n({ useScope: "global" });
  const layout = computed(() => (route.meta?.layout || "default") + "-layout");
  const language = ref("");
  onBeforeMount(() => {
    language.value = localStore.getItem("app_language");
    if (!language.value) {
      localStore.setItem("app_language", "vi");
      language.value = "vi";
    }
  });
  onMounted(() => {
    locale.value = language.value; // Gán ngôn ngữ cho biến locale
  });
</script>

<template>
  <ConfigProvider :locale="{ language }">
    <component :is="layout">
      <router-view />
    </component>
  </ConfigProvider>
</template>

<style scoped></style>
