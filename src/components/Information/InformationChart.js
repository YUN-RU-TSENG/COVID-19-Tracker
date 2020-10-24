import { Line, mixins } from 'vue-chartjs'

// reference: https://github.com/apertureless/vue-chartjs/blob/develop/src/examples/ReactivePropExample.js
export default {
  names: 'InformationChart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    title: {
      type: String,
      require: true
    },
    chartData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        title: {
          padding: 4,
          fontSize: 16,
          display: true,
          position: 'top',
          text: this.title
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          onProgress: function (animation) {}
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
