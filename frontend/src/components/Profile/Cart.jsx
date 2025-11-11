import React from "react";
import { Calendar } from "lucide-react";

function RequestCard({ data }) {
  return (
    <>
      <div className="flex items-center gap-4 py-4 border-b border-gray-700">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-white font-semibold">
            {data.status}: Session with {data.name}
          </p>
          <p className="text-red-400 text-sm">Topic: {data.topic}</p>
          <p className="text-gray-400 text-xs">
            {data.date} • {data.time}
          </p>
        </div>
        <div className="ml-auto text-gray-400">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}

export default RequestCard;
