<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHelper } from "./helpers/helper";

import Toast from "primevue/toast";

import MobileSidebarLayout from "./layout/MobileSidebarLayout.vue";
import SidebarLayout from "./layout/SidebarLayout.vue";

const route = useRoute();
const helper = useHelper();

const isMobile = helper.isMobile();

const isShowLayout = computed(() => {
  if (route?.name) {
    if (route.name == "sign-in" || route.name == "sign-up" || route.name == "reset-password" || route.name == "reset-password-confirm") {
      return false;
    }
    return true;
  }
  return null;
});
</script>

<template>
  <div :class="{ blueBody: route.name == 'dashboard', 'h-full': true }">
    <Toast />
    <SidebarLayout v-if="isShowLayout && !isMobile">
      <RouterView />
    </SidebarLayout>
    <MobileSidebarLayout v-else-if="isShowLayout && isMobile">
      <RouterView />
    </MobileSidebarLayout>
    <RouterView v-else />
  </div>
</template>
<!-- <style src="primevue/resources/themes/lara-light-blue/theme.css"></style> -->
<style src="./assets/theme.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeflex/primeflex.css"></style>
<style src="primeicons/primeicons.css"></style>

<style lang="less">
@import "@/assets/main.less";
</style>
