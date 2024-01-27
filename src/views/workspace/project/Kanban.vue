<template>
  <div
    class="w-72 bg-gray-500 flex flex-col rounded max-h-full shadow-lg rounded overflow-hidden"
  >
    <div class="flex items-center justify-between px-3 py-2 bg-blue-200 handle">
      <div class="text-sm font-bold text-gray-700">{{ list.Title }}</div>
      <a-dropdown trigger="['click']">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <PlusOutlined />
              {{ $t("card.AddCard") }}
            </a-menu-item>

            <a-menu-item key="2" style="color: red">
              <DeleteOutlined />
              {{ $t("kanban.RemoveKanban") }}
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
      <div class="flex-1 overflow-y-auto px-2">
        <draggable
          :list="cards"
          group="cards"
          item-key="card"
          tag="ul"
          @start="drag = true"
          @end="drag = false"
          ghost-class="sortable-ghost"
          animation="150"
          @change="onChange"
        >
          <template #item="{ element }">
            <CardItem :card="element" :editTitleCard="editTitleCard" />
          </template>
        </draggable>
      </div>
      <div class="m-2">
        <CreateItem
          tag="textarea"
          :placeholder="$t('card.CardTitleHint')"
          :textSubmit="$t('card.AddCard')"
          :textCancel="$t('command.Cancel')"
          :textButton="$t('card.AddCard')"
          :onSubmit="addCard"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    ref,
    onBeforeMount,
    reactive,
    watchEffect,
    watch,
    computed,
  } from "vue";
  import draggable from "vuedraggable";
  import CreateItem from "./CreateItem.vue";
  import CardItem from "./CardItem.vue";
  import { cardService } from "@/api/services";
  import helper from "@/utils/helper";
  import { message } from "ant-design-vue";
  import { POSITION_GAP } from "../../../utils/constants";
  const props = defineProps({
    list: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["createdCard", "editTitleCard", "moveCard"]);
  const cards = computed(() => props.list.Cards ?? []);
  const drag = ref(false);
  // const cards = ref(props.list.Cards);

  // ========== start methods ==========
  const addCard = async (value) => {
    console.log(props.list);
    try {
      let lastCard = props.list?.Cards?.[props.list?.Cards?.length - 1];
      let sortOrder = lastCard
        ? lastCard.SortOrder + POSITION_GAP
        : POSITION_GAP;
      let newCard = {
        KanbanId: props.list.Id,
        SortOrder: sortOrder,
        Title: value,
      };

      let res = await cardService.create(newCard);
      if (res?.Success) {
        emit("createdCard", {
          index: props.list.SortOrder,
          card: res.Data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editTitleCard = async (value, card) => {
    try {
      // console.log("kaban", value, card);
      const tmp = helper.deepClone(card);
      tmp.Title = value;
      // call api edit title card
      await cardService.editTitle(tmp);
      // success emit value, indexCard, indexKanban -> gap loi khi nhieu nguoi dung (de sau)
      emit("editTitleCard", {
        value: value,
        CardId: card.Id,
        KanbanId: props.list.Id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (e) => {
    let item = e.added || e.moved;
    if (!item) {
      return;
    }
    let index = item.newIndex;
    let prevCard = cards.value[index - 1];
    let nextCard = cards.value[index + 1];
    let card = cards.value[index];
    let sortOrder = POSITION_GAP;
    if (prevCard && nextCard) {
      sortOrder = (prevCard.SortOrder + nextCard.SortOrder) / 2;
    } else if (prevCard) {
      sortOrder = prevCard.SortOrder + prevCard.SortOrder / 2;
    } else if (nextCard) {
      sortOrder = nextCard.SortOrder / 2;
    }
    card.SortOrder = sortOrder;
    card.KanbanId = props.list.Id;
    // call api update new item
    try {
      let valueUpdate = {
        Id: card.Id,
        KanbanId: props.list.Id,
        SortOrder: sortOrder,
      };
      await cardService.move(valueUpdate);
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi cập nhật thẻ");
    }
    // sau khi xong thi emit de call lai kanbanList
    // emit("moveCard");
    // console.log("change:", e, props.list);
  };
  // ========== end methods ==========
</script>
<style></style>
