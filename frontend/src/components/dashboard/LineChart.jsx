import { Line } from "react-chartjs-2";

const LineChart = ({ expenses }) => {
  if (!Array.isArray(expenses)) return null;

  const groupedByDate = expenses.reduce((acc, item) => {
    if (!item?.date) return acc; 
    const dateKey = new Date(item.date).toISOString().slice(0, 10); 
    if (!acc[dateKey]) acc[dateKey] = 0;
    acc[dateKey] += item.amount ?? 0; 
    return acc;
  }, {});

  const labels = Object.keys(groupedByDate);
  const dataPoints = Object.values(groupedByDate);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses Over Time",
        data: dataPoints,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses Over Time" },
    },
    scales: {
      x: {
        ticks: {
          display: false, // hides the labels
        },
        grid: {
          drawTicks: false,
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full min-h-0 p-4">
      <h2 className="text-lg font-bold mb-2">Line Chart</h2>
      <div className="flex-1 min-h-0">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default LineChart;
