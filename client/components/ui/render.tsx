import React from "react";
import Link from "next/link";

function Render() {
  return (
    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 text-center flex justify-center items-center">
      <div className="max-w-[700px]">
        <h1 className="text-5xl font-bold mb-2">Lorem ipsum dolor sit amet</h1>
        <p className="text-lg mb-6">
          Lorem ipsum dolor sit amet consectetur adipiscing elit leo massa,
          cursus purus senectus dictumst id integer pretium vulputate quisque,
        </p>
        <Link
          href="/categories"
          className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add Query
        </Link>
      </div>
    </div>
  );
}

export default Render;
