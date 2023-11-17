<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-form
        :model="formState"
        :rules="rules"
        name="basic"
        autocomplete="off"
        size="large"
        class="w-full"
        @finish="onFinish">
        <a-form-item :wrapper-col="{ span: 24 }"
          ><h2 class="login-title mb-0">Register</h2></a-form-item
        >
        <a-form-item name="fullname">
          <a-input v-model:value="formState.fullname" placeholder="Fullname" />
        </a-form-item>
        <a-form-item name="username">
          <a-input v-model:value="formState.username" placeholder="Username" />
        </a-form-item>
        <a-form-item name="email">
          <a-input v-model:value="formState.email" placeholder="Email" />
        </a-form-item>

        <a-form-item name="password">
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password" />
        </a-form-item>
        <a-form-item name="rePassword">
          <a-input-password
            v-model:value="formState.rePassword"
            placeholder="Repeat Password" />
        </a-form-item>
        <!-- show error -->
        <a-form-item
          v-show="messageError"
          :wrapper-col="{ span: 24 }"
          class="mb-0 text-red">
          <span>{{ messageError }}</span>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="w-full" html-type="submit"
            >Register</a-button
          >
        </a-form-item>

        <!-- Đường dẫn đăng nhập -->
        <a-form-item>
          <span class="w-full flex justify-center"
            >You have account ?<a href="/login">Sign on</a></span
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
import { reactive, ref, watch, toRaw } from "vue";
import { Form } from "ant-design-vue";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import authService from "../../api/services/authService";
import Enums from "../../enums";

const router = useRouter();
const formState = reactive({
  username: "",
  email: "",
  password: "",
  rePassword: "",
  fullname: "",
});
const messageError = ref("");
const validatePass2 = async (_rule, value) => {
  if (value === "") {
    // console.log(_rule);
    return Promise.reject("Please input the password again");
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

const rules = {
  fullname: [{ required: true, message: "Please input your fullname!" }],
  username: [
    { required: true, message: "Please input your username!" },
    // { validator: serverErrorsValidate },
  ],
  email: [
    { required: true, message: "Please input your Email!" },
    { type: "email", message: "Invalid email" },
    // { validator: serverErrorsValidate },
  ],
  password: [{ required: true, message: "Please input your password!" }],
  rePassword: [{ validator: validatePass2 }],
};
const serverErrors = ref({});
// const { resetFields, validate, validateInfos } = useForm(formState, rules);
const onFinish = async () => {
  //call api
  formState.LoginType = Enums.LoginType.LoginByUsername;
  messageError.value = "";
  let res = await authService.register(formState);
  if (res?.Success) {
    console.log(res);
    VueCookies.remove("token");
    router.push({ name: "Login" });
  } else {
    messageError.value = res.Message ?? "";
  }
};
const clearServerError = (fieldName) => {
  delete serverErrors.value[fieldName];
};

// // Tạo watchers tự động cho tất cả trường
const fields = ["username", "email"];
fields.forEach((field) => {
  watch(
    () => formState[field],
    () => clearServerError(field)
  );
});
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
