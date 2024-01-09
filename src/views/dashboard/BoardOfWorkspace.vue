<template lang="">
  <a-row :gutter="[24, 16]">
    <!--Header workspace -->
    <a-col :span="24">
      <a-row :gutter="[24, 16]" align="stretch">
        <a-col flex="60px">
          <a-avatar
            :size="60"
            shape="square"
            src="https://t3.ftcdn.net/jpg/04/31/21/20/360_F_431212015_tIZUXv099VuHyNa3i2phiMFyVSsGPc78.jpg"
          />
        </a-col>
        <a-col flex="auto">
          <a-row>
            <span class="font-bold font-20">Không gian làm việc của VDT</span>
            <a-button type="text">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
          </a-row>
          <a-row>
            <span>
              <LockOutlined />
              Riêng tư
            </span>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
    <!-- Đánh dấu sao-->
    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <StarOutlined />
            <span class="font-bold">Đánh dấu sao</span>
          </span>
        </a-col>
        <a-col :span="6">
          <router-link :to="{ name: 'NotFound' }">
            <a-card
              hoverable
              style="
                background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                height: calc(100% - 1px);
              "
            >
              <template #actions>
                <setting-outlined key="setting" />
                <edit-outlined key="edit" />
                <StarFilled style="color: yellow" />
              </template>
              <a-card-meta
                title="Bảng sao 1"
                description="This is the description"
              >
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </a-col>

    <!-- Các bảng mình tạo -->
    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <UserOutlined />
            <span class="font-bold">Các bảng của bạn</span>
          </span>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="[24, 16]">
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled style="color: yellow" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>

    <!-- các bảng được mời vào -->
    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <UsergroupAddOutlined />
            <span class="font-bold">các bảng được mời</span>
          </span>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="[24, 16]">
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled style="color: yellow" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                hoverable
                style="
                  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png);
                  height: calc(100% - 1px);
                "
              >
                <template #actions>
                  <setting-outlined key="setting" />
                  <edit-outlined key="edit" />
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description"
                >
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
  export default {};
</script>
<style lang=""></style>
