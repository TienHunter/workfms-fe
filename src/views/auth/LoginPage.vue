<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        size="large"
        class="w-full"
        @finish="onFinish">
        <a-form-item :wrapper-col="{ span: 24 }"
          ><h2 class="login-title">Login</h2></a-form-item
        >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input
            v-model:value="formState.username"
            placeholder="Username or Email" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password" />
        </a-form-item>
        <!-- show error -->
        <a-form-item
          v-show="messageError"
          :wrapper-col="{ span: 24 }"
          class="mb-0 text-red">
          <span>{{ messageError }}</span>
        </a-form-item>

        <!-- Đường dẫn "Quên mật khẩu" -->
        <a-form-item>
          <a href="/forgot-password" class="flex justify-center"
            >Forgot password ?</a
          >
        </a-form-item>

        <a-form-item>
          <a-button type="primary" class="w-full" html-type="submit"
            >Login</a-button
          >
        </a-form-item>

        <!-- Đường dẫn "Quên mật khẩu" -->
        <a-form-item>
          <span class="w-full flex justify-center"
            >Don't have on account? <a href="/register">Sign up</a></span
          >
        </a-form-item>
        <!-- Đường dẫn "Đăng nhập bằng Google" -->
        <a-form-item>
          <span class="flex justify-center">---------- Or ----------</span>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button class="flex justify-center" href="https://www.google.com"
            >Login with Google</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import localStore from "../../utils/localStore";
import authService from "../../api/services/authService";
import Enums from "../../enums";

const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
});
const messageError = ref("");
const onFinish = async (value) => {
  // call api
  value.LoginType = Enums.LoginType.LoginByUsername;
  let res = await authService.login(value);
  console.log(res);
  if (res.Success) {
    // set token vao cookie
    await localStore.setItem(Enums.localStorage.Token, res.Data);
    router.push({ name: "Dashboard" });
  } else {
    messageError.value = res.Message ?? "";
  }
};
</script>

<style scoped>
.container-login {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-image: url(../../assets//images//login.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
}
.wrap-login {
  background-color: #ffffffcc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 4px;
  width: 360px;
}
.login-title {
  display: flex;
  justify-content: center;
  font-size: 24px;
}
.w-full {
  width: 100%;
}
</style>
