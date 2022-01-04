<script>
import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
	extends: HorizontalBar,
	mixins: [reactiveProp],
	props: {
		options: {
			type: Object,
			default() {
				return {
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
				};
			},
		},
	},
	mounted() {
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
@media screen and (max-height: 800px) {
	#horizontalbar-chart {
		width: 5rem !important;
		height: 3rem !important;
	}
}
@media screen and (max-width: 425px) {
	#horizontalbar-chart {
		width: 7rem !important;
		height: 5rem !important;
	}
}
</style>
