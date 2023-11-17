<template lang="">
  <a-layout class="body-dashboard">
    <a-layout-sider width="240" theme="light">
      <div class="flex items-center workspace-sidebar-title">
        <a-avatar shape="square" :size="32"> </a-avatar>
        <span class="font-bold"> Không gian làm việc của vũ đình tiến </span>
      </div>
      <a-menu
        theme="light"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
        v-model:selectedKeys="selectedKeys">
        <a-divider style="border-color: #666; border-width: 1px; margin: 0px" />
        <a-menu-item :key="`/ws/${id}/boards`">
          <router-link :to="{ name: 'WorkspaceBoard' }">
            <pie-chart-outlined />
            <span>Bảng</span>
          </router-link>
        </a-menu-item>
        <a-menu-item :key="`/ws/${id}/member`">
          <router-link :to="{ name: 'WorkspaceMember' }">
            <UsergroupAddOutlined />
            <span>Thành viên</span>
            <a-button
              type="text"
              class="add-memenber-workspace"
              @click.stop.prevent="onShowModalAddMemember">
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
          </router-link>
        </a-menu-item>
        <a-menu-item :key="`/ws/${id}/setting`">
          <router-link :to="{ name: 'WorkspaceSetting' }">
            <AppstoreAddOutlined />
            <span>Cài đặt</span>
          </router-link>
        </a-menu-item>
        <a-divider style="border-color: #666; border-width: 1px" />

        <div class="flex items-center justify-between px-2">
          <span class="text-bold">Các dự án của bạn</span>
          <a-button type="text">
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </div>
        <a-menu-item :key="`/ws/${id}/boards/1`">
          <router-link :to="{ name: 'WorkspaceBoard' }">
            <pie-chart-outlined />
            <span>project 3</span>
          </router-link>
        </a-menu-item>
        <a-menu-item :key="`/ws/${id}/boards/2`">
          <router-link :to="{ name: 'WorkspaceBoard' }">
            <pie-chart-outlined />
            <span>bảng 1</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="padding: 16px; overflow: auto">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import workspaceService from "../../api/services/workspaceService";
const collapsed = ref(false);
const selectedKeys = ref([""]);
const route = useRoute();
const router = useRouter();
const id = ref("");
const workspace = ref({});
onBeforeMount(() => {
  id.value = route.params?.id ?? "";
  selectedKeys.value = [route.fullPath];
});
onBeforeMount(async () => {
  try {
    let res = await workspaceService.getById(id.value);
    if (res?.Data) {
      workspace.value = res.Data;
    }
  } catch (error) {
    console.log(error);
  }
});
const boards = [
  {
    id: 1,
    name: "Bảng 1",
  },
  {
    id: 2,
    name: "Bảng 2",
  },
  {
    id: 3,
    name: "Bảng 3",
  },
  {
    id: 4,
    name: "Bảng 4",
  },
];
const onShowModalAddMemember = () => {
  console.log("click");
};
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
