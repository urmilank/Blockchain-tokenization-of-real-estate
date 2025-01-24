import React from "react";

const PropertyValuationCard = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h5 className="text-xl font-semibold text-blue-600 mb-4">
          Property Valuation
        </h5>

        {/* First Valuation */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <h6 className="text-gray-700 font-medium">
              2024 Jan 22{" "}
              <span className="text-sm text-gray-500">
                (487 days since prior valuation)
              </span>
            </h6>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              View Appraisal Document
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Asset Valuation</p>
              <p className="text-lg font-semibold text-gray-800">$69,000.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-lg font-semibold text-gray-800">$70,000.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Price</p>
              <p className="text-lg font-semibold text-gray-800">$53.85</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Annual Change</p>
              <p className="text-lg font-semibold text-gray-800">+26.47%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Capital ROI</p>
              <p className="text-lg font-semibold text-gray-800">13.30%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">REG Distributed</p>
              <p className="text-lg font-semibold text-gray-800">$6,497.78</p>
            </div>
          </div>
        </div>

        {/* Second Valuation */}
        <div>
          <div className="flex justify-between items-center">
            <h6 className="text-gray-700 font-medium">
              2022 Sep 22{" "}
              <span className="text-sm text-gray-500">(Initial Valuation)</span>
            </h6>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Property Financials Tab
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Asset Valuation</p>
              <p className="text-lg font-semibold text-gray-800">$51,000.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-lg font-semibold text-gray-800">$64,974.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Price</p>
              <p className="text-lg font-semibold text-gray-800">$49.98</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuationCard;
