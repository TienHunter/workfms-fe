<template>
  <a-layout style="padding: 0 24px 24px; background-color: #fff; height: 100%">
    <a-divider></a-divider>
    <h2>Bảng</h2>
    <a-divider></a-divider>
    <a-row :gutter="[24, 16]">
      <a-col :span="24">
        <a-input
          v-model:value="inputSearch"
          class="search-board"
          placeholder="Tìm kiếm bảng.."
          allow-clear>
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-col>
      <a-col :span="8">
        <a-card
          hoverable
          style="
            background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
            height: calc(100% - 1px);
          ">
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <StarFilled style="color: yellow" />
          </template>
          <a-card-meta title="Bảng sao 1" description="This is the description">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card
          hoverable
          style="
            background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
            height: calc(100% - 1px);
          ">
          <template #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <StarFilled style="color: yellow" />
          </template>
          <a-card-meta title="Bảng sao 1" description="This is the description">
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[24, 16]"> </a-row>
  </a-layout>
</template>
<script setup>
import { ref, reactive } from "vue";
const inputSearch = ref("");
</script>
<style scoped>
.search-board {
  width: 240px;
  float: right;
}
</style>
