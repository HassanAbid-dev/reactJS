import React from "react";

const Card = ({ imageUrl, title, description }) => {
  return (
    <div>
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md">
        <img
          className="rounded-t-lg h-85 w-85 overflow-hidden"
          src={imageUrl}
          alt={title}
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700">{description}</p>
          <button className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
