<template lang="">
  <a-layout class="h-full">
    <div
      class="flex flex-wrap items-center justify-between w-full h-20 bg-gray-300 shrink-0 w-full px-2"
    >
      <div class="flex flex-wrap items-center flex-start max-w-full gap-2">
        <EditableElement
          :valueBind="project.ProjectName"
          @onChangeValue="editNameProject"
        />
        <a-button>
          <template #icon>
            <!-- <StarOutlined v-show="true" />
              <StarFilled v-show="false" /> -->
            <StarTwoTone v-show="true" />
          </template>
        </a-button>
        <a-dropdown trigger="['click']">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <LockOutlined />
                Riêng tư
              </a-menu-item>

              <a-menu-item key="2">
                <TeamOutlined />
                Không gian làm việc
              </a-menu-item>
              <a-menu-item key="3">
                <GlobalOutlined />
                Công khai
              </a-menu-item>
            </a-menu>
          </template>
          <a-button size="medium" type="text">
            <TeamOutlined />
          </a-button>
        </a-dropdown>
      </div>
      <div class="flex items-center flex-end gap-2">
        <a-button>
          <template #icon>
            <FilterFilled />
          </template>
          Bộ lọc
        </a-button>
        <a-avatar-group
          :max-count="2"
          max-popover-trigger="click"
          size="medium"
          :max-style="{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer',
          }"
        >
          <a-avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <a-avatar style="background-color: #f56a00">K</a-avatar>
          <a-tooltip title="Ant User" placement="top">
            <a-avatar style="background-color: #87d068">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </a-tooltip>
          <a-avatar style="background-color: #1890ff">
            <template #icon><AntDesignOutlined /></template>
          </a-avatar>
        </a-avatar-group>
        <a-button>
          <template #icon>
            <UserAddOutlined />
          </template>
          Chia sẻ
        </a-button>
        <a-button>
          <EllipsisOutlined />
        </a-button>
      </div>
    </div>

    <a-layout-content class="pt-2 h-full overflow-x-auto">
      <div class="inline-flex h-full items-start gap-6">
        <div class="w-72 bg-gray-200 flex flex-col rounded max-h-full">
          <div class="flex items-center justify-between px-3 py-2">
            <div class="text-sm font-semibold text-gray-700">Need work</div>
            <a-dropdown trigger="['click']">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <PlusOutlined />
                    Add card
                  </a-menu-item>

                  <a-menu-item key="2" style="color: red">
                    <DeleteOutlined />
                    Delete list
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                <template #icon>
                  <EllipsisOutlined />
                </template>
              </a-button>
            </a-dropdown>
          </div>
          <div class="flex flex-col overflow-hidden">
            <div class="flex-1 overflow-y-auto">
              <draggable
                v-model="listCard1"
                group="people"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
                tag="ul"
                drag-class="drag"
                ghost-class="ghost"
              >
                <template #item="{ element }">
                  <li
                    class="group relative bg-white p-3 m-2 shadow rounded border-b border-gray-300 hover:bg-gray-400 list-none pointer"
                  >
                    <span href="#" class="text-sm">{{ element.name }}</span>

                    <a-button
                      size="small"
                      shape="round"
                      class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
                    >
                      <template #icon><EditOutlined /></template>
                    </a-button>
                  </li>
                </template>
              </draggable>
              <!-- <ul>
                <li
                  v-for="item in Array.from({ length: 100 })"
                  class="group relative bg-white p-3 m-2 shadow rounded border-b border-gray-300 hover:bg-gray-400 list-none pointer"
                >
                  <a href="#" class="text-sm">card item</a>

                  <a-button
                    size="small"
                    shape="round"
                    class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
                  >
                    <template #icon><EditOutlined /></template>
                  </a-button>
                </li>
              </ul> -->
            </div>
            <a-button class="m-2">
              <template #icon>
                <PlusOutlined />
              </template>
              Add card
            </a-button>
          </div>
        </div>
        <div class="w-72 bg-gray-200 flex flex-col rounded max-h-full">
          <div class="flex items-center justify-between px-3 py-2">
            <div class="text-sm font-semibold text-gray-700">Working</div>
            <a-dropdown trigger="['click']">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <PlusOutlined />
                    Add card
                  </a-menu-item>

                  <a-menu-item key="2" style="color: red">
                    <DeleteOutlined />
                    Delete list
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                <template #icon>
                  <EllipsisOutlined />
                </template>
              </a-button>
            </a-dropdown>
          </div>
          <div class="flex flex-col overflow-hidden">
            <div class="flex-1 overflow-y-auto">
              <draggable
                v-model="listCard2"
                group="people"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
                tag="ul"
                drag-class="drag"
                ghost-class="ghost"
              >
                <template #item="{ element }">
                  <li
                    class="group relative bg-white p-3 m-2 shadow rounded border-b border-gray-300 hover:bg-gray-400 list-none pointer"
                  >
                    <span href="#" class="text-sm">{{ element.name }}</span>

                    <a-button
                      size="small"
                      shape="round"
                      class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
                    >
                      <template #icon><EditOutlined /></template>
                    </a-button>
                  </li>
                </template>
              </draggable>
              <!-- <ul>
                <li
                  v-for="item in Array.from({ length: 100 })"
                  class="group relative bg-white p-3 m-2 shadow rounded border-b border-gray-300 hover:bg-gray-400 list-none pointer"
                >
                  <a href="#" class="text-sm">card item</a>

                  <a-button
                    size="small"
                    shape="round"
                    class="hidden group-hover:block absolute right-1 text-gray-50 bg-gray-200 center-y"
                  >
                    <template #icon><EditOutlined /></template>
                  </a-button>
                </li>
              </ul> -->
            </div>
            <a-button class="m-2">
              <template #icon>
                <PlusOutlined />
              </template>
              Add card
            </a-button>
          </div>
        </div>
        <div class="w-72">
          <a-button block>
            <template #icon>
              <PlusOutlined />
            </template>
            Add another list
          </a-button>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
  import { ref, onBeforeMount, reactive, watchEffect, watch } from "vue";
  import { useRoute } from "vue-router";
  import draggable from "vuedraggable";
  import EditableElement from "../../../components/EditableElement.vue";
  import { projectService } from "@/api/services";
  // ========== start state ==========
  const route = useRoute();
  const project = ref({});
  const kanbans = ref([]);
  const tasks = ref([]);
  const projectId = ref();
  const listCard1 = ref([
    {
      name: "work 1",
      id: 1,
    },
    {
      name: "work 2",
      id: 2,
    },
    {
      name: "work 3",
      id: 6,
    },
    {
      name: "work 4",
      id: 3,
    },
    {
      name: "Gerard",
      id: 4,
    },
  ]);

  const listCard2 = ref([
    {
      name: "work_ 1 3",
      id: 1,
    },
    {
      name: "work 124",
      id: 2,
    },
    {
      name: "work 341",
      id: 6,
    },
    {
      name: "work 43",
      id: 3,
    },
  ]);
  // ========== end state ==========

  // ========== start lifecycle ==========
  watchEffect(() => {
    projectId.value = route.params?.projectId ?? "";
  });
  // watchEffect(() => {
  //   projectId.value = route.params?.projectId ?? "";
  // });
  onBeforeMount(async () => {
    if (projectId.value) {
      // call api
      try {
        // call project
        let resProject = await projectService.getProjectById(projectId.value);
        // console.log(resProject);
        if (resProject) {
          project.value = resProject.Data;
        }
        console.log(project.value);
      } catch (error) {
        console.log(error);
        message.error("Lấy thông tin dự án thất bại");
      }
    }
  });
  watch(projectId, async () => {
    try {
      // call project
      let resProject = await projectService.getProjectById(projectId.value);
      // console.log(resProject);
      if (resProject) {
        project.value = resProject.Data;
      }
      console.log(project.value);
    } catch (error) {
      console.log(error);
      message.error("Lấy thông tin dự án thất bại");
    }
  });
  // ========== end lifecycle ==========

  // ========== start methods ==========
  const editNameProject = async (projectName) => {
    console.log(projectName);
    try {
      await projectService.editProjectName(
        projectName,
        project.value.ProjectId
      );
      project.value.ProjectName = projectName;
    } catch (error) {
      console.log(error);
    }
  };
  // ========== end methods ==========
</script>
<style>
  .drag {
  }
  .ghost {
    background: lightgray;
    border-radius: 6px;
  }
</style>
