<template lang="">
  <a-layout-header class="header flex items-center justify-between">
    <div class="flex items-center justify-start">
      <router-link :to="{ name: 'Dashboard', params: {} }">
        <a-avatar
          class="pointer"
          :width="40"
          :height="40"
          src="/src/assets/images/logo.jpg"
        >
        </a-avatar>
      </router-link>

      <!-- <div class="logo pointer" @click=""></div> -->

      <a-dropdown trigger="['click']">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item class="pointer-none">
              <span class="font-large font-bold">
                <FormOutlined /> {{ $t("header.CurrentWorkspace") }}</span
              >
            </a-menu-item>
            <a-menu-item class="pointer-none">
              <UserOutlined />
              1nd menu item
            </a-menu-item>
            <a-divider />
            <a-menu-item class="pointer-none">
              <span class="font-large font-bold">
                <FormOutlined />{{ $t("header.YourWorkspaces") }}</span
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
          {{ $t("header.Workspaces") }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-divider
        type="vertical"
        style="border-color: #7cb305; border-size: 3px; border-width: 2px"
      />
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
          {{ $t("header.Recently") }}
          <DownOutlined />
        </a-button>
      </a-dropdown>
      <a-divider
        type="vertical"
        style="border-color: #7cb305; border-width: 2px"
      />
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
          {{ $t("header.Star") }}
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
                  {{ $t("header.CreateProjectTitle") }}
                </h5>
                <p style="font-size: 12px">
                  {{ $t("header.CreateProjectSubTitle") }}
                </p>
              </div>
            </a-menu-item>

            <a-menu-item key="2">
              <div class="flex flex-col">
                <h5>
                  <UsergroupAddOutlined />{{
                    $t("header.CreateWorkspaceTitle")
                  }}
                </h5>
                <p style="font-size: 12px">
                  {{ $t("header.CreateWorkspaceSubTitle") }}
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
    </div>

    <div class="flex items-center justify-end gap-2">
      <a-input-search
        v-model:value="value"
        :placeholder="$t('common.SearchHint')"
        style="width: 200px"
        @search="onSearch"
      />

      <BellOutlined class="font-20 font-bold pointer" />
      <QuestionCircleOutlined class="font-20 font-bold pointer" />

      <a-dropdown trigger="['click']">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              <UserOutlined />
              {{ $t("loginPage.Profile") }}
            </a-menu-item>

            <a-menu-item key="2" @click="logout">
              <LogoutOutlined />
              {{ $t("loginPage.Logout") }}
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar
          size="medium"
          :style="{ backgroundColor: 'red', verticalAlign: 'middle' }"
          :gap="100"
          class="pointer"
        >
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
  import { ref, onBeforeMount } from "vue";
  import { useRoute } from "vue-router";
  import localStore from "@/utils/localStore.js";
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
      const route = useRoute();
      onBeforeMount(() => {});
      const handleMenuClick = (e) => {
        console.log("click", e);
      };

      const logout = () => {
        localStore.clear();
        // Redirect to the "signin" page
        window.location.href = "/login";
      };
      return {
        handleMenuClick,
        logout,
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
