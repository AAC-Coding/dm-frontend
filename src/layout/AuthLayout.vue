<script setup>
import { onMounted } from "vue";

import logo1 from "../assets/logo1.png";

import Card from "primevue/card";

import { useHelper } from "../helpers/helper";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const helper = useHelper();

const isMobile = helper.isMobile();

onMounted(() => {
  let googleLink = document.createElement("script");
  googleLink.setAttribute("src", "https://accounts.google.com/gsi/client");
  document.head.appendChild(googleLink);
});
</script>

<template>
  <div
    class="login-view-wrapper flex flex-column align-items-center w-full h-full relative px-3 md:justify-content-between md:px-0 sm:flex-row"
  >
    <div class="blur h-full w-full absolute"></div>
    <h6
      class="desktop text-color font-light absolute top-0 w-full text-center mt-3"
      v-if="!isMobile"
    >
      {{ t("A") }}
      <i class="font-bold">{{ t("John Wetmore") }} </i>

      {{ t("App") }}
    </h6>
    <div class="wrapper-logo">
      <img class="logo" :src="logo1" />
    </div>

    <slot></slot>
    <Card class="login-card w-full md:w-30rem primary-color md:mr-5 py-0">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #content>
        <slot name="content"></slot>
      </template>
    </Card>
    <div
      class="flex justify-content-between absolute bottom-0 w-full px-3 pb-4"
    >
      <h6
        class="desktop copyright font-light w-8rem md:w-27rem wrapper-legal-text"
      >
        {{ t("Copyright @ 2024 Wetmore Enterprises. All rights reserved") }}
      </h6>
      <h6
        class="mobile copyright font-light w-8rem md:w-27rem wrapper-legal-text"
      >
        {{ t("Copyright @ 2024 Wetmore Enterprises") }}
      </h6>
      <div class="desktop policies flex">
        <h6 class="mr-2 font-light">{{ t("Terms of use") }}</h6>
        <h6 class="mr-2 font-light">{{ t("License Agreement") }}</h6>
        <h6 class="mr-2 font-light">{{ t("Privacy Policy") }}</h6>
        <h6 class="mr-2 font-light">
          {{ t("Copyright Information") }}
        </h6>
        <h6 class="font-light">{{ t("Cookies") }}</h6>
      </div>
      <div class="mobile policies flex flex-column">
        <h6 class="font-light wrapper-legal-text">
          {{ t("Legal Information") }}
        </h6>
        <h6 class="font-light wrapper-legal-text">
          {{ t("All rights reserve") }}
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-view-wrapper {
  overflow: hidden;
  background-image: url("../assets/success.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .logo {
    width: 300px;
    height: 300px;
    margin-left: 226px;
  }
  .login-card {
    background-color: var(--primary-color);
  }
}

@media only screen and (min-width: 1300px) and (max-width: 1400px) {
  .login-view-wrapper {
    background-size: 100% 100%;
  }
}
@media only screen and (min-width: 1290px) and (max-width: 1300px) {
  .login-view-wrapper {
    background-size: 120% 120%;
  }
}
@media only screen and (min-width: 601px) and (max-width: 800px) {
  .login-view-wrapper {
    background-size: 90% 40%;
  }
}
@media (min-width: 1290px) {
  .login-view-wrapper {
    .mobile.policies,
    .mobile.copyrigh {
      visibility: hidden;
    }
  }
}

@media (max-width: 1240px) {
  .login-view-wrapper {
    flex-direction: column !important;
    justify-content: start !important;
    background-position: bottom;
    backdrop-filter: blur(3px);
    background-size: 90% 60%;
    .desktop.policies,
    .desktop.copyright {
      visibility: hidden;
    }
    .logo {
      width: 100px;
      height: 100px;
      margin-left: 0px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    h6.desktop {
      display: none;
    }
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1239px) {
  .login-view-wrapper {
    background-size: 90% 50%;
  }
}
@media only screen and (min-width: 900px) and (max-width: 999px) {
  .login-view-wrapper {
    background-size: 100% 50%;
  }
}
@media only screen and (min-width: 800px) and (max-width: 899px) {
  .login-view-wrapper {
    background-size: 105% 50%;
  }
}
@media only screen and (min-width: 700px) and (max-width: 799px) {
  .login-view-wrapper {
    background-size: 110% 50%;
  }
}

@media (max-width: 600px) {
  .background-image {
    background-size: 100vw 40vh;
  }
  .login-view-wrapper.register-auth-layout {
    background-image: none;
  }
  .login-view-wrapper {
    flex-direction: column !important;

    .login-card {
      background-color: var(--primary-color);
    }
    .wrapper-legal-text {
      font-size: 7px;
    }
  }
}
</style>
