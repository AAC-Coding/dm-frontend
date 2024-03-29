<script setup>
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column"; // optional
import Row from "primevue/row";

import CreateActivitiyType from "./CreateActivitiyType.vue";

import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

import { useActivitiesService } from "../../services/ActivitiesService";

import day from "dayjs";

const { t } = useI18n();
const toast = useToast();
const activitiesService = useActivitiesService();

let startDate = day().format("YYYY-MM-DD");
let endDate = "";

const visible = ref(false);
const visibleAlert = ref(false);
const currentPage = ref(0);
const isLoading = ref(false);
const currentRowId = ref(null);

const tableData = ref({
  content: [],
  rows: 10,
  rowsPerPagination: [10, 20, 50],
});

const currentRowData = ref({});
const currentActivityType = ref({});
//METHODS
const getPage = async (paginationOptions) => {
  const result = "?" + new URLSearchParams(paginationOptions).toString();
  try {
    const res = await activitiesService.getActivitiesType(result);
    tableData.value.content = res.data.activity_types.map((activityType) => {
      const { id, name, duration } = activityType;
      return {
        id,
        activityType: name,
        duration,
      };
    });
  } catch (err) {
    if (err.response) {
      toast.add({
        severity: "error",
        detail: `${t(err?.response?.data?.message)}.`,
        sticky: true,
        styleClass: "error",
        closable: false,
        life: 3000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};
const onPageChange = async (paginationData) => {
  currentPage.value = paginationData?.page;
  const lastRowData = tableData?.content[tableData?.content?.length - 1];
  getPage({ page: currentPage.value, per_page: 10, last_doc_id: lastRowData });
};

const deleteCarrier = async (id, closeCallback) => {
  try {
    await activitiesService.deleteActivityType(id);
    getPage({
      page: 0,
      per_page: 10,
    });
    closeCallback();
    toast.add({
      severity: "",
      summary: "",
      detail: `${t("Activity type deleted successfully")}.`,
      sticky: true,
      styleClass: "success",
      closable: false,
      life: 5000,
    });
  } catch (err) {
    if (err.response) {
      toast.add({
        severity: "error",
        detail: t(err.response?.data?.message),
        sticky: true,
        styleClass: "error",
        closable: false,
        life: 3000,
      });
    }
  }
};

const getStartEndDate = (event) => {
  startDate = event.startDate;
  endDate = event.endDate;
  isLoading.value = true;
  getPage({
    page: 0,
    per_page: 10,
    last_doc_id: null,
    start_date: startDate || day().format("YYYY-MM-DD"),
    end_date: endDate,
  });
};
const editRow = (data) => {
  visible.value = true;
  currentRowData.value = data;
};

const showDeleteAlert = (data) => {
  toast.add({
    severity: "custom",
    summary: t("Are you sure to delete activity type", {
      name: data.activityType,
    }),
    group: "activitiesView",
  });
  visibleAlert.value = true;
  currentActivityType.value = data;
};

watch(visible, (isVisible) => {
  if (!isVisible) {
    currentRowData.value = {};
  }
});

onMounted(() => {
  isLoading.value = true;
  getPage({
    page: 0,
    per_page: 10,
    last_doc_id: null,
    start_date: day().format("YYYY-MM-DD"),
  });
});
</script>

<template>
  <div class="h-full">
    <h1 class="uppercase text-color font-bold text-center mt-5 mb-2">
      {{ t("Activities type") }}
    </h1>
    <DataTable
      :value="tableData.content"
      paginator
      currentPageReportTemplate="{ currentPage }"
      :rows="tableData.rows"
      :rowsPerPageOptions="tableData.rowsPerPageOptions"
      :loading="isLoading"
      @page="onPageChange"
    >
      <template #header>
        <div class="flex justify-content-end">
          <Button
            class="h-2rem flex align-items-center"
            type="button"
            :label="t('Create Activity Type')"
            @click="visible = true"
          />
        </div>
      </template>
      <Column
        field="activityType"
        :header="t('Activity Type')"
        class="w-1 text-sm"
      >
      </Column>
      <Column field="duration" :header="t('Duration')" class="w-1 text-sm">
      </Column>
      <Column field="actions" :header="t('Actions')" class="w-1 text-sm">
        <template #body="{ data }">
          <div>
            <i
              class="pi pi-pencil mr-4 cursor-pointer"
              @click="editRow(data)"
            ></i>
            <i
              class="pi pi-trash cursor-pointer"
              @click="showDeleteAlert(data)"
            ></i>
          </div>
        </template>
      </Column>
    </DataTable>
    <Toast
      position="center"
      group="activitiesView"
      @close="visibleAlert = false"
      class="custom-toast"
    >
      <template #container="{ message, closeCallback }">
        <section
          class="flex p-3 gap-3 w-full wrapper-section"
          style="border-radius: 10px"
        >
          <div
            class="flex flex-column gap-3 w-full justify-content-center align-items-center"
          >
            <p class="m-0 font-semibold text-base text-color">
              {{ message.summary }}
            </p>
            <p class="m-0 text-base text-700">{{ message.detail }}</p>
            <div class="flex gap-3 mb-3">
              <Button
                label="Yes"
                text
                class="py-1 px-2 primary"
                @click="deleteCarrier(currentActivityType?.id, closeCallback)"
              ></Button>
              <Button
                label="No"
                text
                class="text-white py-1 px-2"
                @click="closeCallback"
              ></Button>
            </div>
          </div>
        </section>
      </template>
    </Toast>
    <CreateActivitiyType
      :visible="visible"
      :currentRowData="currentRowData"
      @onChangeVisibleState="visible = $event"
      @onGetPage="getPage($event)"
    />
  </div>
</template>
