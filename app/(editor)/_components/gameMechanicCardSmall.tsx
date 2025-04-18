import React from "react";
import "@/public/_font-source-code-pro.css";

interface GameMechanicCardSmallProps {
  title: string;
  category: string;
  description: string;
  onAdd: () => void;
}

const GameMechanicCardSmall: React.FC<GameMechanicCardSmallProps> = ({
  title,
  category,
  description,
  onAdd,
}) => {
  return (
    <div
      className="flex flex-col items-start p-4 gap-2 bg-white rounded-lg w-full h-52"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <div className="flex flex-col items-start gap-1">
        <h3
          className="text-lg font-medium text-black"
          style={{ fontWeight: 500 }}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600">{category}</p>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex justify-end items-center gap-4 mt-3">
        <div
          role="button"
          className="px-4 py-2 cursor-pointer text-sm text-gray-600 border border-gray-600 rounded-full hover:border-gray-800 hover:text-black transition duration-150 ease-in-out active:bg-gray-700 active:bg-gray-600"
        >
          Read More
        </div>
        <div
          role="button"
          className="px-4 py-2 cursor-pointer text-sm text-white bg-gray-600 rounded-full hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out active:bg-gray-700 active:bg-gray-600"
          onClick={onAdd}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default GameMechanicCardSmall;
