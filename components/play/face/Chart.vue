<script>
import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
	extends: HorizontalBar,
	mixins: [reactiveProp],
	props: {
		options: {
			type: Object,
			default: {
				legend: {
					display: false,
				},
				scales: {
					xAxes: [
						{
							ticks: {
								suggestedMin: 0,
								suggestedMax: 10,
								stepSize: 1,
							},
						},
					],
					yAxes: [
						{
							display: false,
						},
					],
				},
			},
		},
	},
	mounted() {
		// this.chartData is created in the mixin.
		// If you want to pass options please create a local options object
		this.renderChart(this.chartData, this.options);
	},
};
</script>
<style scoped>
#horizontalbar-chart {
	width: 8rem !important;
	height: 8rem !important;
	margin-top: 1rem;
}
@media screen and (max-width: 425px) {
	#horizontalbar-chart {
		width: 12rem !important;
		height: 12rem !important;
	}
}
</style>
