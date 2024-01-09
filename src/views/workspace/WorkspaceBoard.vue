<template>
  <a-layout style="padding: 0 24px 24px; background-color: #fff; height: 100%">
    <a-divider></a-divider>
    <h2>{{ $t("workspaceBoard.Project") }}</h2>
    <a-divider></a-divider>
    <a-row :gutter="[24, 16]">
      <a-col :span="24">
        <a-input
          v-model:value="inputSearch"
          class="search-board"
          placeholder="Tìm kiếm bảng.."
          allow-clear
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-col>
      <template v-for="prj in porjectsList" :key="prj.Id">
        <a-col :span="6" class="">
          <router-link
            :to="{ name: 'ProjectDetail', params: { projectId: prj.Id } }"
          >
            <a-card hoverable>
              <template #cover>
                <img
                  :src="`${prj.ImageUrl ? prj.ImageUrl : IMAGE_DEFAULT}`"
                  style="height: 120px"
                />
              </template>
              <template #actions>
                <setting-outlined key="setting" @click.prevent />
                <edit-outlined key="edit" @click.prevent />
                <StarFilled
                  :style="{ color: `${prj.IsFavorite ? 'yellow' : ''}` }"
                  @click.prevent
                />
              </template>
              <a-card-meta>
                <template #title>
                  <span :title="prj.ProjectName">
                    {{ prj.ProjectName }}
                  </span>
                </template>
                <template #avatar>
                  <a-avatar
                    :src="`${prj.ImageUrl ? prj.ImageUrl : IMAGE_DEFAULT}`"
                  />
                </template>
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
      </template>
    </a-row>
    <a-row :gutter="[24, 16]"> </a-row>
  </a-layout>
</template>
<script setup>
  import { ref, reactive, onBeforeMount } from "vue";
  import { useRoute } from "vue-router";
  import { projectService } from "../../api/services";
  import { message } from "ant-design-vue";
  import { IMAGE_DEFAULT } from "@/utils/constants.js";
  // ========== start state ==========
  const route = useRoute();
  const inputSearch = ref("");
  const porjectsList = ref([]);
  // ========== end state ==========

  onBeforeMount(async () => {
    const { id } = route.params;
    if (id) {
      try {
        let res = await projectService.getListProjects({
          WorkspaceId: id,
        });
        if (res.Data) {
          porjectsList.value = res.Data.Data;
        }
      } catch (error) {
        console.log(error);
        message.error("Lấy danh sách dự án thất bại");
      }
    }
  });
</script>
<style scoped>
  .search-board {
    width: 240px;
    float: right;
  }
</style>
