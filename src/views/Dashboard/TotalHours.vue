<script setup>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

import CardComponent from "../../components/CardComponent.vue";

import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";

import { useDashboardService } from "../../services/DashboardService";

import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";

import day from "dayjs";

highchartsMore(Highcharts);

const props = defineProps({
  date: {
    type: Object,
    default: () => ({ startDate: day().format("YYYY-MM-DD"), endDate: "" }),
  },
});

const { t } = useI18n();
const toast = useToast();
const dashboardService = useDashboardService();

const total = ref(0);

const isLoading = ref(true);
const chartOptions = ref({
  title: {
    text: t("Total Hours Worked"),
    style: {
      fontWeight: "bold",
      color: "#4b5563",
      fontSize: "19px",
      fontFamily: "Poppins",
      textTransform: "Uppercase",
    },
    align: "left",
  },
  subtitle: {
    style: { fontSize: "12px" },
    align: "left",
  },
  colors: [
    "#234A72",
    "#346da7f7",
    "#306091f7",
    "#4c8cccf7",
    "#56a0e9f7",
    "#399dfff7",
    "#E9EEF9",
  ],
  yAxis: {
    title: {
      text: "Number of hours",
    },
  },

  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  series: [
    {
      name: "",
      data: [10, 25, 20, 30],
    },
  ],
});

const getSalesByDayWeek = async () => {
  const result =
    "?" +
    new URLSearchParams({
      start_date: props.date.startDate,
      end_date: props.date.endDate,
    }).toString();
  try {
    isLoading.value = true;
  } catch (err) {
    toast.add({
      severity: "error",
      detail:
        err?.response?.data?.message ||
        `${t("There was an error, please try again")}.`,
      sticky: true,
      styleClass: "error",
      closable: false,
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.date,
  (newDate, oldDate) => {
    if (JSON.stringify(newDate) !== JSON.stringify(oldDate)) {
      getSalesByDayWeek();
    }
  },
  { deep: true }
);

onMounted(() => {
  getSalesByDayWeek();
});
</script>

<template>
  <CardComponent>
    <template #content>
      <div class="h-full">
        <h2 class="font-bold uppercase" v-if="isLoading">
          {{ t("Total Hours Worked") }}
        </h2>
        <div
          v-if="isLoading"
          class="flex justify-content-center align-items-center flex-column mt-4"
        >
          <Skeleton class="w-full h-10rem"></Skeleton>
        </div>
        <!-- <h4 class="mt-4 text-center" v-else-if="!isLoading && !total">
          {{ t("No data") }}
        </h4> -->
        <Chart :options="chartOptions" v-else></Chart>
      </div>
    </template>
  </CardComponent>
</template>
