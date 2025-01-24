pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RealEstate is ERC721 {
    uint public propertyCount;
    mapping(uint => Property) public properties;

    struct Property {
        uint id;
        string name;
        address owner;
        uint price;
    }

    event PropertyTokenized(uint id, string name, address owner, uint price);

    constructor() ERC721("RealEstateToken", "RET") {}

    function tokenizeProperty(string memory _name, uint _price) public {
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _name, msg.sender, _price);
        _mint(msg.sender, propertyCount);
        emit PropertyTokenized(propertyCount, _name, msg.sender, _price);
    }
}