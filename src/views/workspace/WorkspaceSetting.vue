<template lang="">
  <a-layout style="padding: 0 24px 24px; background-color: #fff; height: 100%">
    <a-divider></a-divider>
    <h2>{{ $t("workspace.SettingWorkspace") }}</h2>
    <a-divider></a-divider>
    <!-- avatar -->
    <a-row :gutter="[24, 16]" class="relative">
      <a-col :span="24">
        <a-button type="text" :size="medium" class="float-right">
          <template #icon>
            <EditOutlined />
          </template> </a-button
      ></a-col>
      <a-col :span="6">
        <h3>{{ $t("workspace.Avatar") }}</h3>
      </a-col>
      <a-col :span="18"> {{ $t("common.Empty") }} </a-col>
    </a-row>
    <a-divider></a-divider>

    <!-- workspace name -->
    <!-- description -->
    <a-row :gutter="[24, 16]">
      <a-col :span="24">
        <a-button type="text" :size="medium" class="float-right">
          <template #icon>
            <EditOutlined />
          </template> </a-button
      ></a-col>
      <a-col :span="6">
        <h3>{{ $t("workspace.WorkspaceName") }}</h3>
      </a-col>
      <a-col :span="18">{{ workspace?.WorkspaceName }}</a-col>
      <a-col :span="6">
        <h3>Mô tả</h3>
      </a-col>
      <a-col :span="18">{{ workspace.Description }}</a-col>
    </a-row>
    <a-divider></a-divider>

    <!-- view state -->
    <a-row :gutter="[24, 16]">
      <a-col :span="6">
        <h3>{{ $t("workspace.ViewAbility") }}</h3>
      </a-col>
      <a-col :span="18">{{ getAccessibleWorkspace(workspace?.Type) }}</a-col>
    </a-row>
    <a-divider></a-divider>
    <!-- remove workspace -->
    <a-row :gutter="[24, 16]">
      <a-col :span="6">
        <a-button type="primary" size="medium" danger>{{
          $t("workspace.RemoveWorkspace")
        }}</a-button>
      </a-col>
    </a-row>
  </a-layout>
</template>
<script>
  import { computed } from "vue";
  import { useStore } from "vuex";
  import { useI18n } from "vue-i18n";
  import Enums from "../../enums";
  export default {
    setup() {
      // ========== start state ==========
      const store = useStore();
      const { t } = useI18n();

      const workspace = computed(() => store.state.moduleWorkspaces.workspace);
      // ========== end state ==========

      // ========== start method ==========
      const getAccessibleWorkspace = (key) => {
        switch (key) {
          case Enums.WorkspaceType.Private:
            return t("common.Private");
          case Enums.WorkspaceType.Public:
            return t("common.Public");
          default:
            return "";
        }
      };
      // ========== end method ==========

      return {
        workspace,
        getAccessibleWorkspace,
      };
    },
  };
</script>
<style>
  .edit-button {
    position: absolute;
    top: -16px;
    right: 32px;
  }
</style>
