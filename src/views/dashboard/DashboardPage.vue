<template lang="">
  <a-layout class="body-dashboard">
    <a-layout-sider
      width="240"
      theme="light"
      :style="{ overflow: 'auto', height: '100vh' }"
    >
      <a-menu
        mode="inline"
        :style="{ height: '100%' }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="/dashboard/board-overview">
          <router-link :to="{ name: 'BoardOverview' }">
            <pie-chart-outlined />
            <span>{{ $t("dashboard.Project") }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'BoardOverview' }">
            <desktop-outlined />
            <span>{{ $t("dashboard.Home") }}</span>
          </router-link>
        </a-menu-item>
        <a-divider style="border-color: #666; border-width: 1px" />

        <div class="flex items-center justify-between px-2">
          <span>{{ $t("dashboard.Workspaces") }}</span>
          <a-button type="text" @click="visible = true">
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </div>
        <a-sub-menu v-for="workspace in workspaces" :key="workspace.Id">
          <template #title>
            <span>
              <user-outlined />
              <span>{{ workspace.WorkspaceName }}</span>
            </span>
          </template>
          <a-menu-item :key="`/dashboard/ws/${workspace.Id}/hone`">
            <router-link
              :to="{
                name: 'BoardOfWorkspace',
                params: { id: workspace.Id },
              }"
            >
              {{ $t("dashboard.Project") }}
            </router-link>
          </a-menu-item>

          <a-menu-item :key="`${workspace.Id}_memeber`">
            <router-link
              :to="{ name: 'WorkspaceMember', params: { id: workspace.Id } }"
            >
              {{ $t("dashboard.Member") }}
            </router-link>
          </a-menu-item>
          <a-menu-item :key="`${workspace.Id}_setting`">
            <router-link
              :to="{ name: 'WorkspaceMember', params: { id: workspace.Id } }"
            >
              {{ $t("dashboard.Setting") }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content
      style="padding: 16px; overflow: auto; background-color: #fff"
    >
      <router-view />
    </a-layout-content>
  </a-layout>
  <div>
    <a-modal
      v-model:open="visible"
      :mask-closable="false"
      :confirm-loading="confirmLoading"
      :title="$t('workspace.CreateWorkspace')"
      :ok-text="$t('command.Create')"
      :cancel-text="$t('command.Cancel')"
      @ok="onOk"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item
          name="WorkspaceName"
          :label="$t('workspace.WorkspaceName')"
          :rules="[
            {
              required: true,
              message: $t('workspace.WorkspaceNameRequired'),
            },
          ]"
        >
          <a-input v-model:value="formState.WorkspaceName" />
        </a-form-item>
        <a-form-item name="Description" :label="$t('workspace.Description')">
          <a-textarea v-model:value="formState.Description" />
        </a-form-item>
        <a-form-item name="Type" class="collection-create-form_last-form-item">
          <a-radio-group v-model:value="formState.Type">
            <a-radio :value="Enums.WorkspaceType.Public">{{
              $t("common.Public")
            }}</a-radio>
            <a-radio :value="Enums.WorkspaceType.Private">{{
              $t("common.Private")
            }}</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
  import {
    ref,
    watchEffect,
    onBeforeMount,
    onMounted,
    reactive,
    toRaw,
    computed,
  } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  import { PlusOutlined } from "@ant-design/icons-vue";
  import workspaceService from "../../api/services/workspaceService";
  import Enums from "../../enums";
  import { message } from "ant-design-vue";

  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const selectedKeys = ref([""]);
  const confirmLoading = ref(false);
  const formRef = ref();
  const visible = ref(false);
  const formState = reactive({
    WorkspaceName: "",
    Description: "",
    Type: Enums.WorkspaceType.Private,
  });

  const workspaces = computed(() => store.state.moduleWorkspaces.workspaces);

  onBeforeMount(() => {
    selectedKeys.value = [route.fullPath];
  });
  onBeforeMount(async () => {
    // call workspace list

    // try {
    //   let res = await workspaceService.getAll();
    //   console.log(res);
    //   if (res?.Data?.Data) {
    //     workspaces.value = res.Data.Data;
    //   }
    //   console.log(workspaces.value);
    // } catch (error) {
    //   console.log(error);
    //   message.error("Láy danh sách không gian làm việc thất bại");
    // }
    await store.dispatch("moduleWorkspaces/getWorkspaces");
  });
  onMounted(() => {
    console.log("on mounted");
  });
  const onOk = () => {
    confirmLoading.value = true;
    formRef.value
      .validateFields()
      .then(async (values) => {
        // console.log("Received values of form: ", values);
        // console.log("formState: ", toRaw(formState));
        try {
          let res = await workspaceService.create(values);
          if (res.Success) {
            console.log(res);
            formRef.value.resetFields();
            visible.value = false;
            // add new workspace to vuex
            store.dispatch("moduleWorkspaces/addToWorkspaces", res.Data);
            // redirect sang khong gian lam viec
            router.push({
              name: "WorkspaceMember",
              params: { id: res.Data.Id },
            });
          }
        } catch (error) {
          const { ErrorMessage, Code } = error ?? {};
          console.log(error);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  };
</script>
<style scoped>
  .body-dashboard {
    padding-top: 48px;
  }
</style>
