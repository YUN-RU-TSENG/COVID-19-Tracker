import { Bar, mixins } from "vue-chartjs";

// reference: https://github.com/apertureless/vue-chartjs/blob/develop/src/examples/ReactivePropExample.js
export default {
  names: "HomeChart",
  extends: Bar,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};