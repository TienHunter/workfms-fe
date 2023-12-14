<template lang="">
  <a-layout class="h-full">
    <div
      class="flex flex-wrap items-center justify-between w-full h-20 bg-gray-500 shrink-0 w-full px-2"
    >
      <div class="flex flex-wrap items-center flex-start max-w-full gap-2">
        <EditableElement
          :valueBind="project.ProjectName"
          classHeading="max-w-xs"
          classInput=""
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
      <div data-draggable class="inline-flex h-full items-start gap-6">
        <draggable
          :list="kanbanList"
          class="inline-flex h-full items-start gap-6"
          handle=".handle"
          item-key="kanban"
          @start="drag = true"
          @end="drag = false"
          @change="onChangeKanban"
        >
          <template #item="{ element, index }">
            <Kanban
              :list="element"
              class="w-72 bg-gray-500 flex flex-col rounded max-h-full shadow-lg rounded overflow-hidden"
              @createdCard="createdCard"
              @editTitleCard="editTitleCard"
            >
            </Kanban>
          </template>
        </draggable>

        <div class="w-72">
          <CreateItem
            placeholder="Add another list"
            textSubmit="enter the list title"
            textCancel="Cancel"
            textButton="Add another list"
            :onSubmit="addKanban"
          />
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
  import CreateItem from "./CreateItem.vue";
  import Kanban from "./Kanban.vue";
  import { projectService, kanbanService } from "@/api/services";
  import { useStore } from "vuex";
  import { POSITION_GAP } from "../../../utils/constants";
  // ========== start state ==========
  const route = useRoute();
  const store = useStore();
  const project = ref({});
  const kanbanList = ref([]);
  // const tasks = ref([]);
  const projectId = ref();

  // ========== end state ==========

  // ========== start lifecycle ==========
  watchEffect(() => {
    projectId.value = route.params?.projectId ?? "";
  });
  // onBeforeMount(async () => {
  //   if (projectId.value) {
  //     // call api
  //     try {
  //       // call project
  //       let resProject = await projectService.getProjectById(projectId.value);
  //       // console.log(resProject);
  //       if (resProject) {
  //         project.value = resProject.Data;
  //       }
  //       // console.log(project.value);
  //     } catch (error) {
  //       console.log(error);
  //       message.error("Lấy thông tin dự án thất bại");
  //     }

  //     try {
  //       // call kanbans
  //       let resKanbans = await kanbanService.getListByProjectId(
  //         projectId.value
  //       );
  //       if (resKanbans.Success) {
  //         kanbanList.value = resKanbans.Data;
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //       message.error("get list cards failure");
  //     }
  //   }
  // });
  watchEffect(async () => {
    try {
      // call project
      // let resProject = await projectService.getProjectById(projectId.value);
      // console.log(resProject);
      if (projectId.value) {
        // call api
        try {
          // call project
          let resProject = await projectService.getProjectById(projectId.value);
          // console.log(resProject);
          if (resProject) {
            project.value = resProject.Data;
          }
          // console.log(project.value);
        } catch (error) {
          console.log(error);
          message.error("Lấy thông tin dự án thất bại");
        }

        try {
          // call kanbans
          let resKanbans = await kanbanService.getListByProjectId(
            projectId.value
          );
          if (resKanbans.Success) {
            kanbanList.value = resKanbans.Data;
          }
        } catch (error) {
          console.log(error.message);
          message.error("get list cards failure");
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Lấy thông tin dự án thất bại");
    }
  });
  // ========== end lifecycle ==========

  // ========== start methods ==========
  const editNameProject = async (emitValue) => {
    // projectName.value = emitValue;
    // console.log(projectName);
    if (emitValue) {
      try {
        await projectService.editProjectName({
          ProjectName: emitValue,
          Id: project.value.Id,
        });
        project.value.ProjectName = emitValue;
        store.dispatch(
          "moduleProjects/editProjectNameInProjectOnwer",
          project.value
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addKanban = async (value) => {
    try {
      let lastKanban = kanbanList.value?.[(kanbanList.value?.length ?? 0) - 1];
      let sortOrder = POSITION_GAP;
      if (lastKanban) {
        sortOrder += lastKanban.SortOrder;
      }
      let newKanban = {
        ProjectId: project.value.Id,
        SortOrder: sortOrder,
        Title: value,
      };
      let res = await kanbanService.create(newKanban);
      if (res?.Success) {
        kanbanList.value.push({
          ...res.Data,
          Cards: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createdCard = (value) => {
    // console.log(value);
    const { index, card } = value;
    kanbanList.value[index].Cards.push(card);
  };

  const editTitleCard = (params) => {
    console.log("project detail", params);
    const { value, CardId, KanbanId } = params;
    let kanban = kanbanList.value.find((k) => k.Id === KanbanId);
    if (kanban) {
      let card = kanban.Cards.find((c) => c.Id === CardId);
      if (card) {
        card.Title = value;
      }
    }
    // const card = kanbanList.value?.[indexKanban]?.Cards?.[indexCard];
    // if (card) {
    //   card.Title = value;
    // }
  };

  const onChangeKanban = async (e) => {
    let item = e.added || e.moved;
    if (!item) {
      return;
    }
    let index = item.newIndex;
    let prevKanban = kanbanList.value[index - 1];
    let nextKanban = kanbanList.value[index + 1];
    let currentKanban = kanbanList.value[index];
    let sortOrder = currentKanban.SortOrder;
    if (prevKanban && nextKanban) {
      sortOrder = (prevKanban.SortOrder + nextKanban.SortOrder) / 2;
    } else if (prevKanban) {
      sortOrder = prevKanban.SortOrder + prevKanban.SortOrder / 2;
    } else if (nextKanban) {
      sortOrder = nextKanban.SortOrder / 2;
    }
    currentKanban.SortOrder = sortOrder;
    // call api update new item
    try {
      let valueUpdate = {
        Id: currentKanban.Id,
        ProjectId: currentKanban.ProjectId,
        SortOrder: sortOrder,
      };
      await kanbanService.move(valueUpdate);
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi cập nhật kanban");
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
