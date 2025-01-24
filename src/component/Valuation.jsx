import React from "react";

const PropertyValuation = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="text-lg font-bold text-gray-800 mb-4">
        PROPERTY VALUATION
      </div>
      {/* Valuation Cards */}
      <div className="space-y-4">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-blue-800 font-bold text-lg">
              2024
              <br />
              <span className="text-sm font-medium">Jan 22</span>
            </div>
            <div className="text-sm text-gray-500">
              487 days since prior valuation
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">ASSET VALUATION</div>
              <div className="text-lg font-semibold">$84,000.00</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">TOTAL INVESTMENT</div>
              <div className="text-lg font-semibold">$84,900.00</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">ANNUAL CHANGE</div>
              <div className="text-lg font-semibold text-green-600">
                +17.65%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">CAPITAL ROI</div>
              <div className="text-lg font-semibold">13.29%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">TOKEN PRICE</div>
              <div className="text-lg font-semibold">$53.06</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">REG DISTRIBUTED</div>
              <div className="text-lg font-semibold">$7,882.22</div>
            </div>
          </div>
          <div className="text-blue-600 text-sm mt-4 underline cursor-pointer">
            View Appraisal Document
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-blue-100 shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-blue-800 font-bold text-lg">
              2022
              <br />
              <span className="text-sm font-medium">Sep 22</span>
            </div>
            <div className="text-sm text-gray-500">Initial Valuation</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">ASSET VALUATION</div>
              <div className="text-lg font-semibold">$68,000.00</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">TOTAL INVESTMENT</div>
              <div className="text-lg font-semibold">$78,816.00</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">TOKEN PRICE</div>
              <div className="text-lg font-semibold">$49.26</div>
            </div>
          </div>
          <div className="text-blue-600 text-sm mt-4 underline cursor-pointer">
            Values derived in: Property Financials Tab
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyValuation;
