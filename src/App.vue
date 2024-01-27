<script setup>
  import { useRoute } from "vue-router";
  import { computed, onBeforeMount, onMounted, watchEffect, ref } from "vue";
  import localStore from "./utils/localStore";
  import { useI18n } from "vue-i18n";
  import { ConfigProvider } from "ant-design-vue";
  import enUS from "ant-design-vue/es/calendar/locale/en_US";
  import viVn from "ant-design-vue/es/calendar/locale/vi_Vn";
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
    if (language.value == "en") {
      locale.value = "en";
    } else {
      locale.value = "vi";
    }
  });
</script>

<template>
  <ConfigProvider :locale="language === 'en' ? enUS : viVn">
    <component :is="layout">
      <router-view />
    </component>
  </ConfigProvider>
</template>

<style scoped></style>
