import { ref } from "vue";
// import { useToast } from "primevue/usetoast";
import { useDashboardService } from "@/services/DashboardService";

// const toast = useToast();
const dashboardService = useDashboardService();

export function useActivityData() {
  const isLoading = ref(false);
  const chartData = ref([]);
  const total = ref(0);
  const error = ref("");

  const getPerActivityData = async (startDate, endDate) => {
    const result =
      "?" +
      new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      }).toString();
    const colors = ["#234b71", "#31c866", "#619cf8", "#e9b40f"];
    try {
      isLoading.value = true;
      const res = await dashboardService.getActivityCount(result);
      const keys = Object.keys(res.data);

      keys.forEach((key, index) => {
        chartData.value = [
          ...chartData.value,
          {
            name: key,
            y: res.data[key] || 0,
            color: colors[index],
          },
        ];
      });
      console.log("length", chartData.value.length, chartData[0], chartData[1]);
      // chartData.value = [
      //   {
      //     name: "Dials",
      //     y: res.data?.Dials || 0,
      //   },
      //   {
      //     name: "Doorknocks",
      //     y: res.data?.Doorknocks || 0,
      //   },
      //   {
      //     name: "Appointments",
      //     y: res.data?.Appointments || 0,
      //   },
      //   {
      //     name: "Presentations",
      //     y: res.data?.Presentations || 0,
      //   },
      //   {
      //     name: "Recruiting interviews",
      //     y: res.data?.recruiting_interview || 0,
      //   },
      // ];
      total.value = chartData.value.reduce((a, b) => a + b.y || 0, 0);
      chartOptions.value.series[0] = {
        ...chartOptions.value.series[0],
        data: chartData,
      };
      chartOptions.value.subtitle = {
        ...chartOptions.value.subtitle,
        text: `${t("Total")}:${total.value}`,
      };
    } catch (err) {
      // toast.add({
      //   severity: "error",
      //   detail:
      //     err?.response?.data?.message ||
      //     `${t("There was an error, please try again")}.`,
      //   sticky: true,
      //   styleClass: "error",
      //   closable: false,
      //   life: 3000,
      // });
      error.value = err;
    } finally {
      isLoading.value = false;
    }
    console.log("asfasdf", chartData.value);
    console.log("chart data 1 ", chartData.value);
  };
  return { isLoading, chartData, total, getPerActivityData, error };
}
