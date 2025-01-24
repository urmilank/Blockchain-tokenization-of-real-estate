import HomesCard from "../components/HomesCard";
import { useState, useEffect } from "react";
import { contractInstance } from "../config/contractInstance.js";
import { ethers } from "ethers";
import Header from "../components/Header.jsx";
import { propertiesStore } from "../centralState.js";
import { useAtom } from "jotai";

export default function Homepage() {
  //Contains list of properties to be displayed
  const [properties, setProperties] = useAtom(propertiesStore);

  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyCount = await contractInstance.getPropertyCount();
        const tl = [];

        for (let i = 0; i < propertyCount; i++) {
          const property = await contractInstance.getPropertyDetails(i);
          tl.push({
            id: i,
            name: property.propertyName,
            address: property.propertyAddress,
            seller: property.seller,
            price: ethers.utils.formatEther(property.price),
            sold: property.sold,
          });
        }

        setProperties(tl);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <Header />

      {/*Hero Section*/}
      <div
        className="w-full bg-cover bg-center"
        style={{
          height: "20em",
          backgroundImage:
            "url(https://bungalowliving.imgix.net/home-page/header/header-hero-min.png)",
        }}
      >
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <h1 className="mb-6 text-2xl font-extrabold leading-none tracking-normal text-white md:text-4xl md:tracking-tight">
            Where Your Vision Meets Your Portfolio
            </h1>
            <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-white md:text-6xl md:tracking-tight">
              Great properties and a rental experience
            </h1>
            <div className="bg-white rounded-full shadow p-2 flex">
              <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                <i className="material-icons text-2xl"></i>
              </span>
              <input
                className="w-full rounded p-2"
                type="text"
                placeholder="search here"
              />
              <button className="bg-black hover:bg-gray-700 rounded-full text-white p-2 pl-6 pr-6">
                <p className="font-semibold text-xm">Search</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Displays property cards*/}
      <div className="py-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Properties near you</h2>
          <p className="font-serif text-sm dark:text-coolGray-400">
            Choose from our wide range of properties to invest.
          </p>
        </div>
        <div className="flex gap-6 mt-12 justify-center min-w-full">
          {selectedProperty === null ? (
            properties.map((property) => (
              <HomesCard
                key={property.id}
                property={property}
                buyButton={true}
                setSelectedProperty={setSelectedProperty}
              />
            ))
          ) : (
            <div className="flex max-h-80 gap-8 justify-center min-w-full">
              <HomesCard
                property={selectedProperty}
                buyButton={false}
                setSelectedProperty={() => {}}
              />
              <PropertyValuationCard
                selectedProperty={selectedProperty}
                setSelectedProperty={setSelectedProperty}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const PropertyValuationCard = ({ selectedProperty, setSelectedProperty }) => {
  if (!selectedProperty) return null; // Handle case where no property is selected.

  const [properties, setProperties] = useAtom(propertiesStore);

  const data = [
    {
      id: 0,
      evaluations: [
        {
          date: "2024 Jan 22",
          daysSincePrior: 487,
          assetValuation: "₹5,700,000",
          totalInvestment: "₹5,800,000",
          tokenPrice: "₹4,475",
          annualChange: "+26.47%",
          capitalROI: "13.30%",
          regDistributed: "₹540,000",
          link: "View Appraisal Document",
        },
        {
          date: "2022 Sep 22",
          daysSincePrior: null,
          assetValuation: "₹4,200,000",
          totalInvestment: "₹5,000,000",
          tokenPrice: "₹4,150",
          annualChange: null,
          capitalROI: null,
          regDistributed: null,
          link: "Initial Valuation Report",
        },
      ],
    },
    {
      id: 1,
      evaluations: [
        {
          date: "2024 Jan 22",
          daysSincePrior: 487,
          assetValuation: "₹6,200,000",
          totalInvestment: "₹6,500,000",
          tokenPrice: "₹4,950",
          annualChange: "+18.45%",
          capitalROI: "15.20%",
          regDistributed: "₹600,000",
          link: "View Appraisal Document",
        },
        {
          date: "2022 Sep 22",
          daysSincePrior: null,
          assetValuation: "₹4,800,000",
          totalInvestment: "₹5,200,000",
          tokenPrice: "₹4,300",
          annualChange: null,
          capitalROI: null,
          regDistributed: null,
          link: "Initial Valuation Report",
        },
      ],
    },
    {
      id: 2,
      evaluations: [
        {
          date: "2024 Jan 22",
          daysSincePrior: 487,
          assetValuation: "₹5,400,000",
          totalInvestment: "₹5,900,000",
          tokenPrice: "₹4,300",
          annualChange: "+22.30%",
          capitalROI: "12.75%",
          regDistributed: "₹580,000",
          link: "View Appraisal Document",
        },
        {
          date: "2022 Sep 22",
          daysSincePrior: null,
          assetValuation: "₹4,300,000",
          totalInvestment: "₹5,000,000",
          tokenPrice: "₹4,000",
          annualChange: null,
          capitalROI: null,
          regDistributed: null,
          link: "Initial Valuation Report",
        },
      ],
    },
    {
      id: 3,
      evaluations: [
        {
          date: "2024 Jan 22",
          daysSincePrior: 487,
          assetValuation: "₹4,900,000",
          totalInvestment: "₹5,100,000",
          tokenPrice: "₹4,050",
          annualChange: "+20.00%",
          capitalROI: "10.10%",
          regDistributed: "₹470,000",
          link: "View Appraisal Document",
        },
        {
          date: "2022 Sep 22",
          daysSincePrior: null,
          assetValuation: "₹3,900,000",
          totalInvestment: "₹4,800,000",
          tokenPrice: "₹3,850",
          annualChange: null,
          capitalROI: null,
          regDistributed: null,
          link: "Initial Valuation Report",
        },
      ],
    },
  ];

  const buyProperty = async () => {
    try {
      const transaction = await contractInstance.buyProperty(
        selectedProperty.id,
        {
          value: ethers.utils.parseEther(selectedProperty.price),
        }
      );

      console.log("Transaction sent:", transaction);

      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
      console.log("Transaction mined:", receipt);

      // Refresh the properties after purchase
      setSelectedProperty(null);
      location.reload();

      alert("Property purchased successfully!");
    } catch (error) {
      console.error("Error buying property:", error);
      alert("Failed to purchase property. See console for details.");
    }
  };

  // Find the property data based on selectedProperty.id
  const property = data.find((item) => item.id === selectedProperty.id);

  if (!property) return <p>Valuation data not available for this property.</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
        <h5 className="text-xl font-semibold text-blue-600 mb-4">
          Property Valuation for {selectedProperty.name || "Selected Property"}
        </h5>
        {property.evaluations.map((evaluation, index) => (
          <div
            key={index}
            className={`border-b pb-4 mb-4 ${
              index === property.evaluations.length - 1 ? "border-b-0 mb-0" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <h6 className="text-gray-700 font-medium">
                {evaluation.date}{" "}
                {evaluation.daysSincePrior && (
                  <span className="text-sm text-gray-500">
                    ({evaluation.daysSincePrior} days since prior valuation)
                  </span>
                )}
              </h6>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                {evaluation.link}
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Asset Valuation</p>
                <p className="text-lg font-semibold text-gray-800">
                  {evaluation.assetValuation}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Investment</p>
                <p className="text-lg font-semibold text-gray-800">
                  {evaluation.totalInvestment}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Token Price</p>
                <p className="text-lg font-semibold text-gray-800">
                  {evaluation.tokenPrice}
                </p>
              </div>
              {evaluation.annualChange && (
                <div>
                  <p className="text-sm text-gray-500">Annual Change</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {evaluation.annualChange}
                  </p>
                </div>
              )}
              {evaluation.capitalROI && (
                <div>
                  <p className="text-sm text-gray-500">Capital ROI</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {evaluation.capitalROI}
                  </p>
                </div>
              )}
              {evaluation.regDistributed && (
                <div>
                  <p className="text-sm text-gray-500">REG Distributed</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {evaluation.regDistributed}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex gap-4 mt-4">
          <button className="btn btn-success" onClick={buyProperty}>
            Buy Now
          </button>
          <button className="btn" onClick={() => setSelectedProperty(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
