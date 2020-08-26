import { Bar, mixins } from "vue-chartjs";

// reference: https://github.com/apertureless/vue-chartjs/blob/develop/src/examples/ReactivePropExample.js
export default {
  names: "HomeChart",
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    title: {
      type: String,
      require: true,
    }
  },
  data() {
    return {
      options: {
        title: {
          text: this.title,
          display: true,
          position: 'top',
          fontSize: 16,
          padding: 4
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onProgress: function(animation) {},
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
