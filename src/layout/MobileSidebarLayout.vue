<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import Avatar from "primevue/avatar";

import mobileLogo from "../assets/logo1.png";
import MobileMenu from "../components/MobileMenu.vue";

import { jwtDecode } from "jwt-decode";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const token = localStorage.getItem("do-more-token");
const decoded = jwtDecode(token);
const userName = decoded?.name;
const userFirstName = userName?.split(" ")[0];

const menuItems = [
  { icon: "pi pi-chart-line", label: "", route: "/" },
  { icon: "pi pi-list", label: "", route: "/activity-tracking" },
  { icon: "pi pi-wallet", label: "", route: "/deposits" },
  { icon: "pi pi-money-bill", label: "", route: "/carrier" },
];
const isShowDropdown = ref(false);
const outsideClick = (e) => {
  if (
    !e.target.classList.contains("dropdown-item") &&
    !e.target.offsetParent?.classList?.contains("p-avatar")
  )
    isShowDropdown.value = false;
};

const logout = () => {
  localStorage.setItem("do-more-token", "");
  router.push("/sign-in");
};
</script>
<style lang="less" scoped>
.user-text {
  z-index: -1;
  position: relative;
  left: 2px;
}
.wrapper-logout {
  top: 61px;
  right: 21px;
}
</style>

<template>
  <div
    class="flex justify-content-around flex-column h-full"
    @click="outsideClick"
  >
    <div class="flex justify-content-between px-3 pt-2 h-4rem">
      <img :src="mobileLogo" width="50" />
      <div class="flex align-items-center">
        <small
          class="user-text pr-2 background-primary text-white px-2 border-round-left"
          >{{ t("Happy Tracking,", { name: userFirstName }) }}</small
        >
        <Avatar
          image="https://banner2.cleanpng.com/20180622/pqa/aazfxwhhl.webp"
          class="cursor-pointer relative"
          size="large"
          shape="circle"
          @click="isShowDropdown = true"
        />
        <div
          class="wrapper-logout shadow-1 absolute w-10rem py-2"
          v-if="isShowDropdown"
        >
          <div
            class="flex cursor-pointer justify-content-center align-items-center dropdown-item"
            @click="logout"
          >
            <font-awesome-icon
              :icon="['fa', 'right-from-bracket']"
              class="logout-icon fa-1x mr-1 dropdown-item"
            />
            <small class="dropdown-item">{{ t("Logout") }}</small>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'pt-4 h-full px-2 overflow-y-scroll overflow-x-hidden mb-5 md:mb-0': true,
        blueBody: route.name == 'dashboard',
      }"
    >
      <slot></slot>
    </div>
    <div class="h-4rem">
      <MobileMenu class="absolute bottom-0 w-full" :items="menuItems" />
    </div>
  </div>
</template>
