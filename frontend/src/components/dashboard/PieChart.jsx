// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ expenses }) => {
//   console.log("expenses data: ", expenses);
//   if (!Array.isArray(expenses)) return null;

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
//         ],
//       },
//     ],
//   };
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Expenses by Category (Pie Chart)" },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg shadow flex flex-col h-full min-h-0 p-4">
//       <h2 className="text-lg font-bold mb-2">Pie Chart</h2>
//       <div className="flex-1 min-h-0">
//         <Pie
//           data={data}
//           options= {options}
//         />
//       </div>
//     </div>
//   );
// };

// export default PieChart;


import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expenses }) => {
  console.log("expenses data: ", expenses);
  if (!Array.isArray(expenses)) return null;

  // Safe reduce: skip items with missing category or amount
  const groupedByCategory = expenses.reduce((acc, item) => {
    if (!item?.category) return acc; // skip if category is undefined
    const key = String(item.category); // normalize category key
    acc[key] = (acc[key] || 0) + Number(item.amount ?? 0); // fallback to 0 if amount undefined
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
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses by Category (Pie Chart)" },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-full min-h-0 p-4">
      <h2 className="text-lg font-bold mb-2">Pie Chart</h2>
      <div className="flex-1 min-h-0">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
