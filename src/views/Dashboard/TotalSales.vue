<script setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import CardComponent from "../../components/CardComponent.vue";

import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";

import DataTable from "primevue/datatable";
import Column from "primevue/column"; // optional
import Row from "primevue/row";

import { useDashboardService } from "../../services/DashboardService";

import Skeleton from "primevue/skeleton";
import { useToast } from "primevue/usetoast";

import day from "dayjs";

highchartsMore(Highcharts);

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  date: {
    type: Object,
    default: () => ({ startDate: day().format("YYYY-MM-DD"), endDate: "" }),
  },
});

const dashboardService = useDashboardService();

const tableData = ref({
  content: [
    {
      month: "January",
      id: 1,
      detail: [
        {
          activityType: "Dials",
          total: 100,
        },
        {
          activityType: "Doorknocks",
          total: 100,
        },
      ],
    },
    {
      month: "February",
      id: 2,
      detail: [
        {
          activityType: "Dials",
          total: 200,
        },
        {
          activityType: "Doorknocks",
          total: 200,
        },
      ],
    },
  ],
  rows: 10,
});
const expandedRows = ref([]);
const isLoading = ref(false);

const getTotalSalesData = async () => {
  const result =
    "?" +
    new URLSearchParams({
      year: day(props.date.startDate).format("YYYY"),
    }).toString();
  try {
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
      getTotalSalesData();
    }
  },
  { deep: true }
);

onMounted(() => {
  getTotalSalesData();
});
</script>

<template>
  <CardComponent>
    <template #content>
      <div class="h-full">
        <h2 class="font-bold uppercase">
          {{ t("Total for each activity by Month") }}
        </h2>
        <DataTable
          v-model:expandedRows="expandedRows"
          :value="tableData.content"
          currentPageReportTemplate="{ currentPage }"
          :rows="tableData.rows"
          :loading="isLoading"
          dataKey="id"
        >
          <Column expander style="width: 5rem" />
          <Column field="month" :header="t('Month')"></Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <DataTable :value="slotProps.data.detail">
                <Column
                  field="activityType"
                  :header="t('Activity Type')"
                ></Column>
                <Column field="total" :header="t('Total')"></Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </template>
  </CardComponent>
</template>
