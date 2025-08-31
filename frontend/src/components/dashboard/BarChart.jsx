// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart = ({ expenses = [] }) => {
//   // Group expenses by category (empty if no data)
//   const groupedByCategory = expenses.reduce((acc, item) => {
//     if (!acc[item.category]) acc[item.category] = 0;
//     acc[item.category] += item.amount;
//     return acc;
//   }, {});

//   const labels = Object.keys(groupedByCategory);
//   const dataPoints = Object.values(groupedByCategory);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Expenses by Category",
//         data: dataPoints,
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//         ],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Expenses by Category" },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg shadow flex flex-col h-full min-h-0 p-4">
//       <h2 className="text-lg font-bold mb-2">Bar Chart</h2>
//       <div className="flex-1 min-h-0 relative">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default BarChart;
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ expenses = [] }) => {
  // Group expenses by category safely
  const groupedByCategory = expenses.reduce((acc, item) => {
    if (!item?.category) return acc; // skip if category is missing
    const categoryKey = String(item.category); // normalize to string
    if (!acc[categoryKey]) acc[categoryKey] = 0;
    acc[categoryKey] += Number(item.amount ?? 0); // fallback to 0 if amount undefined
    return acc;
  }, {});

  const labels = Object.keys(groupedByCategory);
  const dataPoints = Object.values(groupedByCategory);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: dataPoints,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses by Category" },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full min-h-0 p-4">
      <h2 className="text-lg font-bold mb-2">Bar Chart</h2>
      <div className="flex-1 min-h-0 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
