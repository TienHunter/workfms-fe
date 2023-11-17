<template lang="">
  <a-layout style="padding: 0 24px 24px; background-color: #fff; height: 100%">
    <a-divider></a-divider>
    <h2>Các cài đặt Không gian làm việc</h2>
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
        <h3>Ảnh đại diện</h3>
      </a-col>
      <a-col :span="18"> anhrsfasfasdf </a-col>
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
        <h3>Tên không gian làm việc</h3>
      </a-col>
      <a-col :span="18">fasfasf</a-col>
      <a-col :span="6">
        <h3>Mô tả</h3>
      </a-col>
      <a-col :span="18">fasfasf</a-col>
    </a-row>
    <a-divider></a-divider>

    <!-- view state -->
    <a-row :gutter="[24, 16]">
      <a-col :span="6">
        <h3>Khả năng xem</h3>
      </a-col>
      <a-col :span="18">fasfasf</a-col>
    </a-row>
    <a-divider></a-divider>
    <!-- remove workspace -->
    <a-row :gutter="[24, 16]">
      <a-col :span="6">
        <a-button type="primary" size="medium" danger
          >Xóa không gian làm việc</a-button
        >
      </a-col>
    </a-row>
  </a-layout>
</template>
<script>
export default {};
</script>
<style>
.edit-button {
  position: absolute;
  top: -16px;
  right: 32px;
}
</style>
