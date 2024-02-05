<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CardComponent from "../../components/CardComponent.vue";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

const { t } = useI18n();
const chartOptions = ref({
  chart: {
    type: "column",
    height: 250,
  },
  title: {
    text: "Sales by day of the week",
    style: {
      fontWeight: "bold",
      color: "#4b5563",
      fontSize: "19px",
      fontFamily: "Poppins",
      textTransform: "Uppercase",
    },
    align: "left",
  },
  colors: ["#2ec867", "#619cf9", "#e9b310", "#234a72"],
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yAxis: {
    min: 0,
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
    },
  },
  legend: {
    align: "left",
    x: 70,
    verticalAlign: "top",
    y: 70,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "white",
    borderColor: "#CCC",
    borderWidth: 1,
    shadow: false,
  },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
  },

  series: [
    {
      name: t("Amount"),
      colorByPoint: true,
      data: [
        {
          name: "Jan",
          data: [3, 5, 1, 13],
        },
        ["Monday", 1458.72],
        ["Tuesday", 500.0],
        ["Wednesday", 500.0],
        ["Thursday", 500.0],
        ["Friday", 3039.72],
        ["Saturday", 500.0],
        ["Saturday", 500.0],
        ["Saturday", 500.0],
        ["Saturday", 500.0],
        ["Saturday", 500.0],
        ["Saturday", 500.0],
      ],
      showInLegend: false,
    },
  ],
});
const test = ref({
  chart: {
    type: "column",
    height: 280,
  },
  title: {
    text: "Sales by day of the week",
    style: {
      fontWeight: "bold",
      color: "#4b5563",
      fontSize: "19px",
      fontFamily: "Poppins",
      textTransform: "Uppercase",
    },
    align: "left",
  },
  colors: ["#2ec867", "#619cf9", "#e9b310", "#234a72"],
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yAxis: {
    min: 0,
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
    },
  },
  legend: {
    align: "left",
    x: 70,
    verticalAlign: "top",
    y: 20,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "white",
    borderColor: "#CCC",
    borderWidth: 1,
    shadow: false,
  },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      name: "Doorknocks",
      data: [3, 5, 1, 13, 3, 5, 1, 13, 3, 5, 1, 13],
    },
    {
      name: "Appointments",
      data: [14, 8, 8, 12, 14, 8, 8, 12, 14, 8, 8, 12],
    },
    {
      name: "Presentation",
      data: [0, 2, 6, 3, 0, 2, 6, 3, 0, 2, 6, 3],
    },
    {
      name: "Dials",
      data: [0, 2, 6, 3, 0, 2, 6, 3, 0, 2, 6, 3],
    },
  ],
});
</script>

<template>
  <CardComponent height="h-19rem">
    <template #content>
      <Chart :options="test"></Chart>
    </template>
  </CardComponent>
</template>