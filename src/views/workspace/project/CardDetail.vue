<template lang="">
  <a-modal
    v-model:open="open"
    :footer="null"
    :afterClose="closeModal"
    :width="720"
  >
    <template #title>
      <div class="relative">
        <div class="flex items-center text-xl gap-3">
          <icon :component="ScheduleOutlined"> </icon>
          <div>{{ card.Title }}</div>
        </div>
        <span class="pl-8"
          >Trong danh sach
          <span class="underline pointer font-bold">Cần làm</span></span
        >
      </div>
    </template>

    <div class="body-card flex gap-2">
      <div class="w-4/5">
        <div class="card-detail-data flex flex-wrap gap-4 pl-8">
          <!-- thành viên -->
          <div class="card-detail-data__member inline-block">
            <h3>Thành viên</h3>
            <div class="flex">
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
              <a-button shape="circle" size="medium">
                <template #icon>
                  <PlusOutlined />
                </template>
              </a-button>
            </div>
          </div>
          <!-- nhãn -->
          <div class="inline-block">
            <h3>Nhãn</h3>
            <a-space :size="[0, 'small']" wrap>
              <a-tag color="processing">processing</a-tag>
              <a-tag color="success">success</a-tag>
              <a-tag color="error">error</a-tag>
              <a-tag color="warning">warning</a-tag>
              <a-tag color="magenta">magenta</a-tag>
              <a-tag color="red">red</a-tag>
              <a-tag color="volcano">volcano</a-tag>
              <a-tag :bordered="false" color="orange">orange</a-tag>
              <a-tag :bordered="false" color="gold">gold</a-tag>
              <a-tag :bordered="false" color="lime">lime</a-tag>
              <a-tag :bordered="false" color="green">green</a-tag>
              <a-tag :bordered="false" color="cyan">cyan</a-tag>
              <a-tag :bordered="false" color="blue">blue</a-tag>
              <a-tag :bordered="false" color="geekblue">geekblue</a-tag>
              <a-tag :bordered="false" color="purple">purple</a-tag>
              <a-button size="small">
                <template #icon>
                  <PlusOutlined />
                </template>
              </a-button>
            </a-space>
          </div>
          <!-- thông báo -->
          <!-- thời gian -->
          <div v-if="card.ExpireDate" class="inline-block">
            <h3>Ngày hết hạn</h3>
            <div class="flex flex-wrap gap-2">
              <a-checkbox value="1" />
              <a-button>
                <template #icon>
                  <CalendarOutlined />
                </template>
                5/12/2023 15:30
                <a-tag v-if="card.IsFinished" color="success" class="ml-2"
                  >đã hoàn thành</a-tag
                >
              </a-button>
            </div>
          </div>
        </div>
        <!-- mô tả -->
        <div class="card-detail-desc mt-4">
          <div class="flex items-center gap-3 mt-2 text-xl">
            <icon :component="MenuUnfoldOutlined"></icon>
            Mô tả
          </div>
          <div class="editable pl-8">
            <template v-if="isEditDesc">
              <QuillEditor
                ref="quillEditorRef"
                theme="snow"
                v-model:content="content"
                contentType="html"
              />
              <div class="flex my-2 gap-2">
                <a-button
                  type="primary"
                  :loading="isLoadingUpdateDesc"
                  @click="updateDesc"
                  >Lưu</a-button
                >
                <a-button @click="cancelUpdateDesc">Hủy</a-button>
              </div>
            </template>
            <template v-else>
              <div
                v-if="card.Description"
                class="pointer p-2 rounded"
                v-html="card.Description"
                @click="openQuillEditor"
              ></div>
              <div
                v-else
                class="bg-gray-300 rounded h-16 pointer hover:bg-gray-500 p-2"
                @click="openQuillEditor"
              >
                <span>Thêm mô tả chi tiết hơn...</span>
              </div>
            </template>
          </div>
        </div>
        <!-- đính kèm -->
        <div class="card-detail-attactment mt-4">
          <div class="flex items-center gap-3 mt-2 text-xl">
            <PaperClipOutlined />
            Các tệp đính kèm
            <a-button class="ml-auto">Thêm</a-button>
          </div>
          <div class="relative">
            <a-upload
              :file-list="fileList"
              :customRequest="handleCustomRequest"
              list-type="picture"
              @change="handleChange"
              @remove="handleRemove"
            >
              <a-button class="absolute top-n8 right-0">
                <upload-outlined></upload-outlined>
                upload
              </a-button>
            </a-upload>
          </div>
        </div>
        <!-- checklist -->
        <!-- v-for="cl in card.Checklists" :key="cl.Id" -->
        <div v-for="cl in card.Checklists" :key="cl.Id" class="check-list mt-4">
          <div class="flex items-center gap-3 mt-2 text-xl">
            <CheckSquareOutlined />
            {{ cl.ChecklistName }}
            <a-button class="ml-auto">Xóa</a-button>
          </div>
          <a-progress
            :stroke-color="{
              from: '#108ee9',
              to: '#87d068',
            }"
            :percent="50"
            status="active"
          />
          <ul class="list-none flex flex-col gap-2">
            <li
              v-for="j in cl.Jobs"
              :key="j.Id"
              class="flex items-center gap-2"
            >
              <a-checkbox v-model:checked="j.IsFinished" />
              <div class="hover:bg-gray-300 flex-1 p-2 rounded pointer">
                <span>{{ j.JobName }}</span>
              </div>
            </li>
            <li>
              <JobCreateItem :checklist="cl" :onSubmit="createJob" />
            </li>
          </ul>
        </div>

        <div class="card-detail-active mt-4">
          <div class="card-detail-active__nav flex items-center gap-6">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1">
                <template #tab>
                  <span class="font-20">
                    <CommentOutlined />
                    Bình luận
                  </span>
                </template>
                comment
              </a-tab-pane>
              <a-tab-pane key="2">
                <template #tab>
                  <span class="font-20">
                    <HistoryOutlined />
                    Hoạt động
                  </span>
                </template>
                history
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
      <div class="w-1/5 flex flex-col gap-2">
        <div>Thêm vào thẻ</div>
        <a-button class="truncate text-left">
          <template #icon>
            <UserOutlined />
          </template>
          Thành viên
        </a-button>
        <a-button class="truncate text-left">
          <template #icon>
            <TagOutlined />
          </template>
          Nhãn
        </a-button>
        <a-button
          class="truncate text-left"
          @click="openCreateChecklist = true"
        >
          <template #icon>
            <CheckSquareOutlined />
          </template>
          Việc cần làm
        </a-button>
        <a-button class="truncate text-left">
          <template #icon>
            <ClockCircleOutlined />
          </template>
          Thời gian
        </a-button>
        <a-button class="truncate text-left" @click="testGetFile">
          <template #icon>
            <PaperClipOutlined />
          </template>
          Đính kèm
        </a-button>
        <!-- <a-upload>
          <a-button size="middle" class="truncate text-left">
            <template #icon>
              <PaperClipOutlined />
            </template>
            Đính kèm
          </a-button>
        </a-upload> -->
      </div>
    </div>
  </a-modal>

  <!-- modal thêm checklist -->
  <a-modal
    v-model:open="openCreateChecklist"
    :width="400"
    :zIndex="1001"
    centered
    title="Tạo danh sách công việc"
    ok-text="Tạo"
    cancel-text="Hủy"
    :confirm-loading="isLoadingchecklistModal"
    @ok="createChecklist"
    @cancel="closechecklistModal"
  >
    <a-form
      ref="checklistModalRef"
      :model="checklistModal"
      layout="vertical"
      name="checklistModal"
    >
      <a-form-item
        name="CheckListName"
        label="Tiêu đề"
        :rules="[
          {
            required: true,
            message: 'Nhập tiêu đề danh sách công việc',
          },
        ]"
      >
        <a-input v-model:value="checklistModal.CheckListName" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
  import { watchEffect, ref, onBeforeMount, nextTick } from "vue";
  import {
    EditOutlined,
    ScheduleOutlined,
    AlignLeftOutlined,
    MenuUnfoldOutlined,
  } from "@ant-design/icons-vue";
  import JobItem from "./JobItem.vue";
  import JobCreateItem from "./JobCreateItem.vue";
  import {
    cardService,
    checklistService,
    jobService,
    fileService,
  } from "@/api/services";
  import { message } from "ant-design-vue";
  import { POSITION_GAP } from "@/utils/constants";
  import helper from "@/utils/helper";
  // ========== start state ==========
  const props = defineProps({
    isShow: Boolean,
    cardId: String,
  });
  const emit = defineEmits(["closeModal"]);

  const open = ref(false);
  const content = ref("");
  const card = ref({});
  const isEditDesc = ref(false);
  const isLoadingUpdateDesc = ref(false);
  const quillEditorRef = ref();

  const openCreateChecklist = ref(false);
  const isLoadingchecklistModal = ref(false);
  const checklistModal = ref({});
  const activeKey = ref(1);
  const fileList = ref([]);
  // ========== end state ==========

  // ========== start lifecycle ==========
  onBeforeMount(async () => {
    // get card detail
    try {
      let res = await cardService.getById(props.cardId);
      if (res.Success) {
        card.value = res.Data;
        content.value = res.Data.Description;
      }
    } catch (error) {
      message.error("Lấy thông tin thẻ công việc thất bại");
      console.log(error);
    }

    if (card.value?.Attachments) {
      for (const att of card.value?.Attachments) {
        try {
          let res = await fileService.getFile(att.Id);
          let url = URL.createObjectURL(res);
          const newFile = {
            uid: att.Id,
            name: att.FileName,
            status: "done",
            type: att.ContentType,
            url: url, // create URL for the original file
          };
          fileList.value.push(newFile);
        } catch (error) {
          const newFile = {
            uid: att.Id,
            name: att.FileName,
            type: att.ContentType,
            status: "error",
          };
          fileList.value.push(newFile);
          console.log(error);
        }
      }
    }
    try {
    } catch (error) {
      message.error("Lấy thông tin thẻ công việc thất bại");
      console.log(error);
    }
  }),
    watchEffect(() => {
      console.log(content.value);
    });
  watchEffect(() => {
    open.value = props.isShow;
  });
  // ========== end lifecycle ==========

  // ========== start methods ==========
  const closeModal = () => {
    emit("closeModal");
  };
  const cancelUpdateDesc = () => {
    isEditDesc.value = false;
  };
  const openQuillEditor = () => {
    isEditDesc.value = true;
    content.value = card.value.Description;
    nextTick(() => {
      quillEditorRef.value.focus();
      // console.log(quillEditorRef.value);
    });
  };
  const updateDesc = async () => {
    try {
      isLoadingUpdateDesc.value = true;
      await cardService.updateDesc(props.cardId, content.value);
      isEditDesc.value = false;
      card.value.Description = content.value;
    } catch (error) {
      message.error("update desc card failed");
      console.log(error);
    } finally {
      isLoadingUpdateDesc.value = false;
    }
  };

  const createChecklist = async () => {
    try {
      isLoadingchecklistModal.value = true;
      checklistModal.value.cardId = props.cardId;
      let lastChecklist =
        card.value?.Checklists?.[card.value?.Checklists?.length - 1];
      checklistModal.value.SortOrder =
        (lastChecklist?.SortOrder ?? 0) + POSITION_GAP;

      // call api
      let res = await checklistService.create(checklistModal.value);
      if (res.Success) {
        card.value.Checklists.push(res.Data);
      }
      openCreateChecklist.value = false;
    } catch (error) {
      message.error("create checklist failure");
      console.log(error);
    } finally {
      isLoadingchecklistModal.value = false;
    }
  };
  const closechecklistModal = () => {
    openCreateChecklist.value = false;
    checklistModal.value = {};
  };

  const createJob = async (jobInfo) => {
    try {
      let value = helper.deepClone(jobInfo) ?? {};
      let res = await jobService.create(value);
      if (res.Success) {
        let checklist = card.value.Checklists.find(
          (cl) => cl.Id === value.ChecklistId
        );
        if (checklist) {
          checklist.Jobs.push(res.Data);
        }
        return true;
      }
      return false;
    } catch (error) {
      message.error("create job failure");
      console.log(error);
      return false;
    }
  };
  const handleCustomRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      let res = await fileService.uploadFile(formData, props.cardId);
      console.log(file);
      console.log(typeof file);
      // push vào filelists
      // Create a new file object with the desired format
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file), // create URL for the original file
        thumbUrl: URL.createObjectURL(file), // create URL for the original file
      };
      fileList.value.push(newFile);

      console.log(fileList.value);
      onSuccess();
      message.success("Tải tệp lên thành công");
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };
  const handleChange = () => {};
  const testGetFile = async () => {
    try {
      let res = await fileService.getFile(
        "7c3def5b-d028-49f7-94ff-f792a777ee98"
      );
      let url = URL.createObjectURL(res);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (file) => {
    try {
      await fileService.removeFile(file.uid);
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    } catch (error) {
      console.log(error);
    }
    console.log(file);
  };
  // ========== end methods ==========
</script>
<style lang=""></style>
