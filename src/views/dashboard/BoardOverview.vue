<template>
  <a-row :gutter="[24, 16]">
    <!-- bảng đánh dấu sao -->

    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <StarOutlined />
            <span class="font-bold">Bảng đánh dấu sao</span>
          </span>
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
            <a-card-meta
              title="Bảng sao 1"
              description="This is the description">
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
            <a-card-meta
              title="Bảng sao 1"
              description="This is the description">
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-col>
    <!-- đã xem gần đây -->
    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <ClockCircleOutlined />
            <span class="font-bold">Đã xem gần đây</span>
          </span>
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
              <StarFilled key="other" />
            </template>
            <a-card-meta
              title="Bảng sao 1"
              description="This is the description">
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
              <StarFilled key="other" />
            </template>
            <a-card-meta
              title="Bảng sao 1"
              description="This is the description">
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
              <StarFilled key="other" />
            </template>
            <a-card-meta
              title="Bảng sao 1"
              description="This is the description">
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-col>

    <!-- Các không gian làm việc -->
    <a-col :span="24">
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <span class="flex items-center gap-16 font-20">
            <UsergroupAddOutlined />
            <span class="font-bold">Các không gian làm việc</span>
          </span>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="[24, 16]">
            <a-col :span="24"> <span>Dự án 1</span> </a-col>
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="[24, 16]">
            <a-col :span="24"> <span>Project3</span> </a-col>
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
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
                  <StarFilled key="other" />
                </template>
                <a-card-meta
                  title="Bảng sao 1"
                  description="This is the description">
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
<style></style>
