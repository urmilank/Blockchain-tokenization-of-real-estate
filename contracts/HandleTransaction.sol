// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateTransaction {
    // Struct to represent a property listing
    struct Property {
        string propertyName;
        string propertyAddress;
        address seller;
        uint256 price;
        bool sold;
    }

    // Address of the contract owner who can add properties
    address public owner;

    // Array to store property listings
    Property[] public properties;

    // Events to log transaction steps
    event PropertyListed(
        uint256 indexed propertyId, 
        address indexed seller, 
        uint256 price, 
        string propertyName, 
        string propertyAddress
    );
    event PropertyPurchased(
        uint256 indexed propertyId, 
        address indexed buyer, 
        address indexed seller, 
        uint256 price
    );

    // Modifier to restrict property listing to owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can add properties");
        _;
    }

    // Constructor to set owner and pre-populate initial properties
    constructor() {
        owner = msg.sender;

        // Hardcoded initial property listings
        properties.push(Property({
            propertyName: "Green Haven Apartments",
            propertyAddress: "24/A, MG Road, Indiranagar, Bengaluru, Karnataka, 560038",
            seller: 0x9a05072791CcDe92d453517f880fB4eA5863eF53, // Example seller address
            price: 5 ether, // Example price
            sold: false
        }));
        properties.push(Property({
            propertyName: "Shanti Villa",
            propertyAddress: "Plot No. 12, Sector 5, Vashi, Navi Mumbai, Maharashtra, 400703",
            seller: 0x8a9c8B2abD416741Db405D8042765141275e09d1, // Another example seller address
            price: 2 ether, // Another example price
            sold: false
        }));
        properties.push(Property({
            propertyName: "Sunrise Residency",
            propertyAddress: "18/2, Lajpat Nagar, New Delhi, Delhi, 110024",
            seller: 0x5Da05E822d287E2827A929CA6e65A3C23070586A, // Another example seller address
            price: 3 ether, // Another example price
            sold: false
        }));
        properties.push(Property({
            propertyName: "Royal Orchid Heights ",
            propertyAddress: "45, Anna Nagar West, Chennai, Tamil Nadu, 600040",
            seller: 0x9AcD9d4656Fc3CE190136e5A6D4E1d5D01afe213, // Another example seller address
            price: 8 ether, // Another example price
            sold: false
        }));

        // Emit events for initial listings
        emit PropertyListed(0, properties[0].seller, properties[0].price, properties[0].propertyName, properties[0].propertyAddress);
        emit PropertyListed(1, properties[1].seller, properties[1].price, properties[1].propertyName, properties[1].propertyAddress);
    }

    // Function to add a new property listing (restricted to owner)
    function addProperty(
        string memory _propertyName, 
        string memory _propertyAddress, 
        address _seller, 
        uint256 _price
    ) public onlyOwner returns (uint256) {
        // Validate seller address
        require(_seller != address(0), "Invalid seller address");
        
        // Validate price
        require(_price > 0, "Price must be greater than zero");

        properties.push(Property({
            propertyName: _propertyName,
            propertyAddress: _propertyAddress,
            seller: _seller,
            price: _price,
            sold: false
        }));

        uint256 newPropertyId = properties.length - 1;
        emit PropertyListed(newPropertyId, _seller, _price, _propertyName, _propertyAddress);
        return newPropertyId;
    }

    // Function to buy a property
    function buyProperty(uint256 propertyId) public payable {
        // Validate property ID
        require(propertyId < properties.length, "Invalid property ID");
        
        // Check if property is already sold
        require(!properties[propertyId].sold, "Property already sold");
        
        // Check if sent amount matches property price
        require(msg.value == properties[propertyId].price, "Incorrect payment amount");

        // Mark property as sold
        properties[propertyId].sold = true;

        // Transfer funds to seller
        (bool success, ) = properties[propertyId].seller.call{value: msg.value}("");
        require(success, "Transfer to seller failed");

        // Emit purchase event
        emit PropertyPurchased(
            propertyId, 
            msg.sender, 
            properties[propertyId].seller, 
            msg.value
        );
    }

    // Function to list a new property (optional, public access)
    function listProperty(
        string memory _propertyName, 
        string memory _propertyAddress, 
        address _seller, 
        uint256 _price
    ) public returns (uint256) {
        properties.push(Property({
            propertyName: _propertyName,
            propertyAddress: _propertyAddress,
            seller: _seller,
            price: _price,
            sold: false
        }));

        uint256 newPropertyId = properties.length - 1;
        emit PropertyListed(newPropertyId, _seller, _price, _propertyName, _propertyAddress);
        return newPropertyId;
    }

    // Function to get total number of properties
    function getPropertyCount() public view returns (uint256) {
        return properties.length;
    }

    // Function to get property details
    function getPropertyDetails(uint256 propertyId) public view returns (
        string memory propertyName,
        string memory propertyAddress,
        address seller, 
        uint256 price, 
        bool sold
    ) {
        require(propertyId < properties.length, "Invalid property ID");
        Property memory property = properties[propertyId];
        return (property.propertyName, property.propertyAddress, property.seller, property.price, property.sold);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
