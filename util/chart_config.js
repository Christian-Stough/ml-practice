// chartConfig.js
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BubbleController,
  BubbleElement,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  DoughnutController,
  PolarAreaController,
  ScatterController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BubbleController,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  DoughnutController,
  PolarAreaController,
  ScatterController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default Chart;
