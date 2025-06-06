// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, unit = "", color = "text-green-600" }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full">
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className={`text-4xl font-bold ${color}`}>
            {value?.toLocaleString("en-US")} {unit}
        </p>
    </div>
);

export default StatCard;
