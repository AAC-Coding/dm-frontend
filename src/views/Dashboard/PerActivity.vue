<script setup>
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import CardComponent from "../../components/CardComponent.vue";

import { useToast } from "primevue/usetoast";

import DataTable from "primevue/datatable";
import Column from "primevue/column"; // optional
import Row from "primevue/row";

import { useDashboardService } from "../../services/DashboardService";

import day from "dayjs";

const props = defineProps({
  date: {
    type: Object,
    default: () => ({ startDate: day().format("YYYY-MM-DD"), endDate: "" }),
  },
});

const { t } = useI18n();
const toast = useToast();
const dashboardService = useDashboardService();
const tableData = ref({
  content: [],
  rows: 10,
});
const isLoading = ref(false);
const getPerActivityData = async () => {
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
      getPerActivityData();
    }
  },
  { deep: true }
);

onMounted(() => {
  getPerActivityData();
});
</script>

<template>
  <CardComponent>
    <template #content>
      <div class="h-full">
        <h2 class="font-bold uppercase">
          {{ t("Activity") }}
        </h2>
        <DataTable
          :value="tableData.content"
          paginator
          currentPageReportTemplate="{ currentPage }"
          :rows="tableData.rows"
          :loading="isLoading"
        >
          <Column
            field="activityType"
            :header="t('Activity Type')"
            class="w-1 text-sm"
          >
          </Column>
          <Column field="total" :header="t('Total')" class="w-1 text-sm">
          </Column>
        </DataTable>
      </div>
    </template>
  </CardComponent>
</template>
