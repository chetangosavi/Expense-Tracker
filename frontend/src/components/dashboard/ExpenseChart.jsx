import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const data = {
    labels: ["Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30"],
    datasets: [
      {
        label: "Expenses",
        data: [200, 150, 300, 100, 250, 50],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Expenses Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default ExpenseChart;
