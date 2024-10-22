// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721A.sol";

contract HoodyNFT is ERC721A {
    string public baseURI;
    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 1000;
    uint256 public maxMintAmount = 20;

    constructor(string memory _initBaseURI) ERC721A("HoodyNFT", "NFT") {
        baseURI = _initBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Must mint at least 1 NFT");
        require(_mintAmount <= maxMintAmount, "Exceeds max mint amount");
        require(supply + _mintAmount <= maxSupply, "Exceeds max supply");
        require(msg.value >= cost * _mintAmount, "Not enough Ether");

        _safeMint(msg.sender, _mintAmount);
    }

    function setBaseURI(string memory _newBaseURI) public {
        baseURI = _newBaseURI;
    }

    function withdraw() public {
        require(payable(msg.sender).send(address(this).balance));
    }
}
