import { useState } from "react";

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className=" rounded-lg mb-4 overflow-hidden ">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center mb-3 shover:bg-gray-200 transition-colors"
      >
        <span className="font-semibold text-xl">{title}</span>
        <span className="">{isOpen ? "▲" : "▼"}</span>
      </button>
      <hr class="border-gray-400 mb-6" />

      {/* Body */}
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Accordion;
