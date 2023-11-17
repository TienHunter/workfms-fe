<template lang="">
  <a-layout-header class="header flex items-center">
    <a-avatar
      class="pointer"
      :width="40"
      :height="40"
      src="/src/assets/images/logo.jpg">
    </a-avatar>

    <!-- <div class="logo pointer" @click=""></div> -->

    <a-dropdown trigger="['click']">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item class="pointer-none">
            <span class="font-large font-bold">
              <FormOutlined /> Không gian làm việc hiện tại</span
            >
          </a-menu-item>
          <a-menu-item class="pointer-none">
            <UserOutlined />
            1nd menu item
          </a-menu-item>
          <a-divider />
          <a-menu-item class="pointer-none">
            <span class="font-large font-bold">
              <FormOutlined /> Các không gian làm việc của bạn</span
            >
          </a-menu-item>
          <a-menu-item key="1">
            <UserOutlined />
            1nd menu item
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            3rd item
          </a-menu-item>
        </a-menu>
      </template>
      <a-button size="medium" type="text">
        Các không gian làm việc
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <a-divider
      type="vertical"
      style="border-color: #7cb305; border-size: 3px; border-width: 2px" />
    <a-dropdown trigger="['click']">
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <UserOutlined />
            Bảng công việc 1
          </a-menu-item>

          <a-menu-item key="2">
            <UserOutlined />
            Bảng công việc 2
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            Bảng công việc 3
          </a-menu-item>
        </a-menu>
      </template>
      <a-button size="medium" type="text">
        Gần đây
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <a-divider
      type="vertical"
      style="border-color: #7cb305; border-width: 2px" />
    <a-dropdown trigger="['click']">
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <UserOutlined />
            Bảng công việc 1
          </a-menu-item>

          <a-menu-item key="2">
            <UserOutlined />
            Bảng công việc 2
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            Bảng công việc 3
          </a-menu-item>
        </a-menu>
      </template>
      <a-button size="medium" type="text">
        Dấu sao
        <DownOutlined />
      </a-button>
    </a-dropdown>

    <a-dropdown trigger="['click']">
      <template #overlay>
        <a-menu @click="handleMenuClick" style="max-width: 300px">
          <a-menu-item key="1">
            <div class="flex flex-col">
              <h5>
                <RadiusUprightOutlined />
                Tạo bảng
              </h5>
              <p style="font-size: 12px">
                Một bảng được tạo thành từ các thẻ được sắp xếp trong danh sách.
                Sử dụng bảng để quản lý các dự án, theo dõi thông tin, hoặc tổ
                chức bất cứ việc gì.
              </p>
            </div>
          </a-menu-item>

          <a-menu-item key="2">
            <div class="flex flex-col">
              <h5><UsergroupAddOutlined /> Tạo không gian làm việc</h5>
              <p style="font-size: 12px">
                Một Không gian làm việc là tập hợp các bảng và mọi người. Sử
                dụng Không gian làm việc để tổ chức công ty của bạn, hỗ trợ
                người bận rộn, gia đình hoặc bạn bè.
              </p>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button size="medium" type="primary">
        Tạo mới
        <DownOutlined />
      </a-button>
    </a-dropdown>

    <div class="flex items-center ml-auto gap-16">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch" />

      <BellOutlined class="font-20 font-bold pointer" />
      <QuestionCircleOutlined class="font-20 font-bold pointer" />

      <a-dropdown trigger="['click']">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              <UserOutlined />
              <span>Hồ sơ</span>
            </a-menu-item>

            <a-menu-item key="2">
              <LogoutOutlined />
              Đăng xuất
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar
          size="medium"
          :style="{ backgroundColor: 'red', verticalAlign: 'middle' }"
          :gap="100"
          class="pointer">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script>
import {
  DownOutlined,
  UserOutlined,
  FormOutlined,
  RadiusUprightOutlined,
  UsergroupAddOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
export default {
  components: {
    DownOutlined,
    UserOutlined,
    FormOutlined,
    RadiusUprightOutlined,
    UsergroupAddOutlined,
    BellOutlined,
    QuestionCircleOutlined,
  },
  setup() {
    const handleMenuClick = (e) => {
      console.log("click", e);
    };
    return {
      handleMenuClick,
    };
  },
};
</script>
<style scoped>
.header {
  position: fixed;
  height: var(--height-header);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  border-bottom: 2px solid #ffccff;
  z-index: 99;
}
.logo {
  background-image: url(../../assets//images/logo.jpg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 40px;
  height: 40px;
}
</style>
