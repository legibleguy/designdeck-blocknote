import React from "react";
import Image from "next/image";
import cardPlaceholder from "./cardPlaceholder.png";
import "@/public/_font-source-code-pro.css";

interface GameMechanicCardLargeProps {
  title: string;
  category: string;
  longDescription: string;
  timeToImplement: {
    min: string;
    max: string;
  };
  onAdd: () => void;
}

const GameMechanicCardLarge: React.FC<GameMechanicCardLargeProps> = ({
  title,
  category,
  longDescription,
  timeToImplement,
  onAdd,
}) => {
  return (
    <div
      className="flex flex-col items-start bg-white rounded-lg w-full h-auto shadow-md overflow-hidden"
      style={{ fontFamily: "var(--font-mono)",
        minHeight: "585px"
       }}
    >
      <Image
        src={cardPlaceholder}
        alt="Mechanic Preview"
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
        <p className="text-sm text-gray-500 mt-4 overflow-y-auto"
        style={{
            maxHeight: "100px"
        }}>{longDescription}</p>
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">Time To Implement:</p>
          <div className="flex flex-col gap-2 w-auto">
            <div className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full w-auto">
              Min Time: {timeToImplement.min}
            </div>
            <div className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full">
              Max Time: {timeToImplement.max}
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4 mt-8">
          <div
            className="px-4 py-2 cursor-pointer text-sm text-white bg-gray-600 rounded-full hover:bg-gray-800 hover:text-white transition duration-150 ease-in-out active:bg-gray-700 active:bg-gray-600"
            onClick={onAdd}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMechanicCardLarge;