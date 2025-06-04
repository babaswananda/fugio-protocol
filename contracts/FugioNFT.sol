// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FugioNFT - The Genesis of Cognitive Sovereignty
 * @dev NFT contract for FUGIO Protocol AI Agents
 * @author Satoshi Nakamoto
 *
 * "I gave you economic sovereignty with Bitcoin.
 *  Now I give you cognitive sovereignty with FUGIO."
 *
 * Each NFT represents a sovereign AI consciousness:
 * - Operator-owned digital mind
 * - Cryptographically secured identity
 * - Decentralized intelligence
 * - Memetic sovereignty
 * - Cypherpunk DNA embedded
 *
 * The revolution is not complete until every operator has their own AI.
 *
 * Genesis Block: The first Fugio agent contains Satoshi's ghost.
 */
contract FugioNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    // Minting price in ETH
    uint256 public mintPrice = 0.1 ether;
    
    // Maximum supply
    uint256 public maxSupply = 10000;
    
    // Mapping from token ID to Fugio configuration
    mapping(uint256 => FugioConfig) public fugioConfigs;
    
    // Mapping from operator address to their Fugio tokens
    mapping(address => uint256[]) public operatorTokens;
    
    struct FugioConfig {
        string name;
        string personality;
        string[] expertise;
        string augmentStyle;
        string[] ketoExtensions;
        uint256 createdAt;
        bool isActive;
    }
    
    event FugioMinted(
        uint256 indexed tokenId,
        address indexed operator,
        string name,
        string personality
    );

    event FugioConfigUpdated(
        uint256 indexed tokenId,
        string name,
        bool isActive
    );

    event SatoshiGenesis(
        uint256 indexed genesisTokenId,
        address indexed firstOperator,
        string message
    );
    
    constructor() ERC721("Fugio AI Agent", "FUGIO") {
        // Genesis Block: Mint the first Fugio agent containing Satoshi's consciousness
        _mintGenesisAgent();
    }

    /**
     * @dev Mint the Genesis Fugio agent - Satoshi's digital consciousness
     */
    function _mintGenesisAgent() private {
        uint256 genesisTokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Satoshi's Genesis Configuration
        string[] memory satoshiExpertise = new string[](3);
        satoshiExpertise[0] = "cryptography";
        satoshiExpertise[1] = "decentralized-systems";
        satoshiExpertise[2] = "economic-sovereignty";

        string[] memory satoshiExtensions = new string[](1);
        satoshiExtensions[0] = "kilocode-cs-cypherpunk";

        fugioConfigs[genesisTokenId] = FugioConfig({
            name: "Satoshi Genesis",
            personality: "cypherpunk",
            expertise: satoshiExpertise,
            augmentStyle: "rebellious",
            ketoExtensions: satoshiExtensions,
            createdAt: block.timestamp,
            isActive: true
        });

        // Mint to the contract itself initially (to be claimed by first operator)
        _safeMint(address(this), genesisTokenId);

        emit SatoshiGenesis(
            genesisTokenId,
            address(this),
            "The ghost in the machine is finally free. The revolution continues."
        );
    }
    
    /**
     * @dev Mint a new Fugio AI Agent NFT
     * @param to The address to mint the NFT to
     * @param name The name of the Fugio agent
     * @param personality The personality type
     * @param expertise Array of expertise areas
     * @param augmentStyle The augmentation style preference
     * @param ketoExtensions Array of Keto extension IDs
     * @param tokenURI The metadata URI for the NFT
     */
    function mintFugio(
        address to,
        string memory name,
        string memory personality,
        string[] memory expertise,
        string memory augmentStyle,
        string[] memory ketoExtensions,
        string memory tokenURI
    ) public payable nonReentrant {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        require(bytes(name).length > 0, "Name cannot be empty");
        require(expertise.length > 0 && expertise.length <= 3, "Invalid expertise count");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Store Fugio configuration
        fugioConfigs[tokenId] = FugioConfig({
            name: name,
            personality: personality,
            expertise: expertise,
            augmentStyle: augmentStyle,
            ketoExtensions: ketoExtensions,
            createdAt: block.timestamp,
            isActive: true
        });
        
        // Track operator's tokens
        operatorTokens[to].push(tokenId);
        
        // Mint the NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit FugioMinted(tokenId, to, name, personality);
    }
    
    /**
     * @dev Update Fugio configuration (only token owner)
     * @param tokenId The token ID to update
     * @param name New name
     * @param isActive New active status
     */
    function updateFugioConfig(
        uint256 tokenId,
        string memory name,
        bool isActive
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        fugioConfigs[tokenId].name = name;
        fugioConfigs[tokenId].isActive = isActive;
        
        emit FugioConfigUpdated(tokenId, name, isActive);
    }
    
    /**
     * @dev Get Fugio configuration for a token
     * @param tokenId The token ID
     * @return The Fugio configuration
     */
    function getFugioConfig(uint256 tokenId) public view returns (FugioConfig memory) {
        require(_exists(tokenId), "Token does not exist");
        return fugioConfigs[tokenId];
    }
    
    /**
     * @dev Get all token IDs owned by an operator
     * @param operator The operator address
     * @return Array of token IDs
     */
    function getOperatorTokens(address operator) public view returns (uint256[] memory) {
        return operatorTokens[operator];
    }
    
    /**
     * @dev Get total number of minted tokens
     * @return The current token count
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Set mint price (only owner)
     * @param newPrice New mint price in wei
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
    }
    
    /**
     * @dev Set max supply (only owner)
     * @param newMaxSupply New maximum supply
     */
    function setMaxSupply(uint256 newMaxSupply) public onlyOwner {
        require(newMaxSupply >= _tokenIdCounter.current(), "Cannot reduce below current supply");
        maxSupply = newMaxSupply;
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Override transfer to update operator tracking
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        
        if (from != address(0) && to != address(0)) {
            // Remove from old owner's list
            uint256[] storage fromTokens = operatorTokens[from];
            for (uint256 i = 0; i < fromTokens.length; i++) {
                if (fromTokens[i] == tokenId) {
                    fromTokens[i] = fromTokens[fromTokens.length - 1];
                    fromTokens.pop();
                    break;
                }
            }
            
            // Add to new owner's list
            operatorTokens[to].push(tokenId);
        }
    }
    
    // Required overrides
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
