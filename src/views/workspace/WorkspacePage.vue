<template lang="">
  <a-layout class="body-dashboard">
    <a-layout-sider width="240" theme="light">
      <div class="flex items-center workspace-sidebar-title">
        <a-avatar shape="square" :size="32"> </a-avatar>
        <span class="font-bold"> {{ workspace.WorkspaceName }} </span>
      </div>
      <a-menu
        theme="light"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-divider style="border-color: #666; border-width: 1px; margin: 0px" />
        <a-menu-item :key="`/ws/${id}/boards`">
          <router-link :to="{ name: 'WorkspaceBoard' }">
            <pie-chart-outlined />
            <span>{{ $t("dashboard.Project") }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item :key="`/ws/${id}/member`">
          <router-link :to="{ name: 'WorkspaceMember' }">
            <UsergroupAddOutlined />
            <span>{{ $t("dashboard.Member") }}</span>
            <a-button
              type="text"
              class="add-memenber-workspace"
              @click.stop.prevent="onShowModalAddMemember"
            >
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </router-link>
        </a-menu-item>
        <a-menu-item :key="`/ws/${id}/setting`">
          <router-link :to="{ name: 'WorkspaceSetting' }">
            <AppstoreAddOutlined />
            <span>{{ $t("dashboard.Setting") }}</span>
          </router-link>
        </a-menu-item>
        <a-divider style="border-color: #666; border-width: 1px" />

        <div class="flex items-center justify-between px-2">
          <span class="text-bold">{{ $t("workspace.YourProjects") }}</span>
          <a-button type="text" @click="openCreateProjectModel">
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </div>
        <a-menu-item
          v-for="pj in projectsOwner"
          :key="`/ws/${id}/projects/${pj.Id}`"
        >
          <router-link
            :to="{ name: 'ProjectDetail', params: { projectId: pj.Id } }"
          >
            <pie-chart-outlined />
            <span> {{ pj.ProjectName }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="padding: 16px; overflow: hidden">
      <router-view />
    </a-layout-content>
  </a-layout>
  <a-modal
    v-model:open="isShowCreateProjectNodal"
    :mask-closable="false"
    :confirm-loading="isLoadingCreateProjectModal"
    :title="$t('project.CreateProject')"
    :ok-text="$t('command.Create')"
    :cancel-text="$t('command.Cancel')"
    @ok="onCreateProject"
  >
    <a-form
      ref="projectCreateFormRef"
      :model="projectModal"
      layout="vertical"
      name="form_in_modal"
    >
      <!-- title board -->
      <!-- <a-form-item name="ImageId" label="Phông nền">
        <a-input v-model:value="projectModal.ImageId" />
      </a-form-item> -->
      <a-form-item
        name="ProjectName"
        :label="$t('project.ProjectName')"
        :rules="[
          {
            required: true,
            message: $t('project.ProjectNameRequired'),
          },
        ]"
      >
        <a-input v-model:value="projectModal.ProjectName" />
      </a-form-item>

      <!-- select workspace -->
      <a-form-item
        name="WorkspaceId"
        :label="$t('project.Workspace')"
        :rules="[
          {
            required: true,
            message: $t('project.WorkspaceRequired'),
          },
        ]"
      >
        <a-select v-model:value="projectModal.WorkspaceId">
          <template v-for="ws in workspaces" :key="ws.Id">
            <a-select-option :value="ws.Id">{{
              ws.WorkspaceName
            }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>

      <!-- accessible abitily  -->
      <a-form-item name="Type" :label="$t('project.ViewAbility')">
        <a-select v-model:value="projectModal.Type" optionLabelProp="title">
          <template v-for="ab in accessibleBoards" :key="ab.value">
            <a-select-option :value="ab.value" :title="ab.title">
              <a-row>
                <a-col span="2" class="flex items-center">
                  <icon :component="ab.icon" />
                </a-col>

                <a-col span="20">
                  <div>{{ ab.title }}</div>
                  <span>{{ ab.desc }}</span>
                </a-col>
              </a-row>
            </a-select-option>
          </template>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- mời thêm thành viên -->
  <a-modal> </a-modal>
</template>
<script setup>
  import { ref, onBeforeMount, reactive, computed, watchEffect } from "vue";
  import { PlusOutlined } from "@ant-design/icons-vue";
  import { useRoute, useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  // import Icon from "@ant-design/icons-vue";
  import {
    LockOutlined,
    TeamOutlined,
    GlobalOutlined,
  } from "@ant-design/icons-vue";
  import { workspaceService, projectService } from "../../api/services/";
  import { useStore } from "vuex";
  import { message } from "ant-design-vue";
  import Enums from "../../enums";

  // ========== start state ==========
  // Your code here
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const { t } = useI18n();

  const workspaces = computed(() => store.state.moduleWorkspaces.workspaces);
  const workspace = computed(() => store.state.moduleWorkspaces.workspace);
  const projectsOwner = computed(
    () => store.state.moduleProjects.projectsOwner
  );
  const selectedKeys = ref([""]);
  const id = ref("");

  const projectCreateFormRef = ref();
  let projectModal = reactive({});
  const isShowCreateProjectNodal = ref(false);
  const isLoadingCreateProjectModal = ref(false);
  const accessibleBoards = ref([
    {
      icon: LockOutlined,
      value: 1,
      title: t("project.Private"),
      desc: t("project.PrivateDesc"),
    },
    {
      icon: TeamOutlined,
      value: 2,
      title: t("project.Workspace"),
      desc: t("project.WorkspaceDesc"),
    },
    {
      icon: GlobalOutlined,
      value: 3,
      title: t("project.Public"),
      desc: t("project.PublicDesc"),
    },
  ]);
  // ========== end state ==========

  // ========== start lifecycle ==========
  watchEffect(() => {
    id.value = route.params?.id ?? "";
    selectedKeys.value = [route.fullPath];
  });
  onBeforeMount(async () => {
    // get workspace by id
    await store.dispatch("moduleWorkspaces/getWorkspaceById", id.value);
    // get project own
    await store.dispatch("moduleProjects/getProjectListOwnerAsync", id.value);
  });
  // ========== end lifecycle ==========

  // ========== start methods ==========

  const openCreateProjectModel = async () => {
    isShowCreateProjectNodal.value = true;
    projectModal.WorkspaceId = workspace.Id;
    projectModal.Type = Enums.ProjectType.Private;
    if (workspaces.value.length === 0) {
      await store.dispatch("moduleWorkspaces/getWorkspaces");
    }
  };

  const onShowModalAddMemember = () => {
    console.log("click");
  };

  const onCreateProject = () => {
    isLoadingCreateProjectModal.value = true;
    projectCreateFormRef.value
      .validateFields()
      .then(async (values) => {
        console.log("Received values of form: ", values);
        // console.log("formState: ", toRaw(formState));
        try {
          let res = await projectService.create(values);
          if (res.Success) {
            console.log(res);
            projectCreateFormRef.value.resetFields();
            message.success("Create project successfully");

            // projectsOwner.value.push(res.Data);
            store.dispatch("addProjectsOwner", res.Data);
            router.push({
              name: "ProjectDetail",
              params: { id: id.value, projectId: res.Data.Id },
            });
          }
          isShowCreateProjectNodal.value = false;
        } catch (error) {
          const { ErrorMessage, Code } = error ?? {};
          message.error("Create project failed: ", ErrorMessage);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      })
      .finally(() => {
        isLoadingCreateProjectModal.value = false;
      });
  };
  // ========== end methods ==========
</script>
<style scoped>
  .body-dashboard {
    padding-top: 48px;
  }

  .add-memenber-workspace {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .workspace-sidebar-title {
    gap: 8px;
    padding: 16px 8px;
  }
</style>
