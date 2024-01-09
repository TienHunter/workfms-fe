<template>
  <div class="container-login">
    <div class="wrap-login">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        size="large"
        class="w-full"
        @finish="onFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item :wrapper-col="{ span: 24 }">
          <h2 class="login-title">{{ $t("loginPage.Login") }}</h2>
        </a-form-item>
        <a-form-item
          ref="usenameRef"
          name="username"
          :rules="[
            { required: true, message: $t('loginPage.UsernameRequired') },
          ]"
        >
          <a-input
            v-model:value="formState.username"
            :placeholder="$t('loginPage.UsernameHint')"
          />
        </a-form-item>

        <a-form-item
          ref="passwordRef"
          name="password"
          :rules="[
            { required: true, message: $t('loginPage.PasswordRequired') },
          ]"
        >
          <a-input-password
            v-model:value="formState.password"
            :placeholder="$t('loginPage.PasswordHint')"
          />
        </a-form-item>
        <!-- show error -->
        <a-form-item
          v-show="messageError"
          :wrapper-col="{ span: 24 }"
          class="mb-0 text-red"
        >
          <span>{{ messageError }}</span>
        </a-form-item>

        <!-- Đường dẫn "Quên mật khẩu" -->
        <a-form-item>
          <p class="flex justify-center">
            <a href="/forgot-password">{{ $t("loginPage.Forgotpassword") }}</a>
          </p>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" class="w-full" html-type="submit">{{
            $t("loginPage.Login")
          }}</a-button>
        </a-form-item>

        <!-- Đường dẫn "Quên mật khẩu" -->
        <a-form-item>
          <span class="w-full flex justify-center gap-2"
            >{{ $t("loginPage.YouDontHaveAccount") }}
            <a href="/register">{{ $t("loginPage.Register") }}</a></span
          >
        </a-form-item>
        <!-- Đường dẫn "Đăng nhập bằng Google" -->
        <a-form-item>
          <span class="flex justify-center"
            >---------- {{ $t("loginPage.Or") }} ----------</span
          >
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button class="flex justify-center" href="https://www.google.com">{{
            $t("loginPage.LoginWithGoogle")
          }}</a-button>
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
  const usenameRef = ref(null);
  const passwordRef = ref(null);
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
      // usenameRef.value.$el.querySelector("input").style.borderColor = "red";
      // passwordRef.value.$el.querySelector(".ant-input-affix-wrapper.ant-input-password").style.borderColor = "red";
      // passwordRef.value.$el.querySelector(".ant-form-item-control-input").nextSibling.style = "display:flex";
      // usenameRef.value.$el.querySelector("input").focus();
      // passwordRef.value.$el.querySelector(".ant-form-item-explain-error").sty = es.Message;
      // passwordRef.value.$el.querySelector(".ant-form-item-explain-error").innerHTML = es.Message;
    }
  };
  const handleFinishFailed = (errors) => {
    console.log(passwordRef.value.$el);

    // console.log(usename);
    console.log(errors);
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
