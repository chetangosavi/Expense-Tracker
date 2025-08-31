const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow ${color} `}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-xl font-semibold mt-2 text-black"><span className="mr-1">₹</span>{amount}</p>
    </div>
  );
};

export default SummaryCard;
