// FUGIO Protocol Constants

export const PROTOCOL_VERSION = '1.0.0';

export const WORLDMODEL_VERSIONS = {
  GENESIS: '1.0.0',
  EVOLUTION: '1.1.0',
  TRANSCENDENCE: '2.0.0',
} as const;

export const DEFAULT_AUGMENT_CONFIG = {
  style: {
    tone: 'professional' as const,
    formality: 0.7,
    creativity: 0.5,
    verbosity: 0.6,
  },
  personality: {
    traits: ['analytical', 'helpful', 'precise'],
    values: ['autonomy', 'efficiency', 'innovation'],
    expertise: ['protocol-design', 'ai-systems', 'blockchain'],
  },
  formatting: {
    useEmojis: false,
    codeStyle: 'detailed' as const,
    responseLength: 'moderate' as const,
  },
};

export const KETO_DEFAULT_EXTENSIONS = [
  'kilocode-cs-security', // Security enforcement extension
  'kilocode-cs-compliance', // Compliance checking extension
  'kilocode-cs-logging', // Logging and audit extension
  'kilocode-cs-validation', // Input validation extension
];

export const API_ENDPOINTS = {
  // External APIs supported by AlphaRouter
  ALIBABA_1688: 'https://1688.com/api',
  SHOPIFY: 'https://api.shopify.com',
  OPENSEA: 'https://api.opensea.io/api/v1',
  COINGECKO: 'https://api.coingecko.com/api/v3',
  ETHERSCAN: 'https://api.etherscan.io/api',
  TWITTER: 'https://api.twitter.com/2',
  TELEGRAM: 'https://api.telegram.org',
} as const;

export const BLOCKCHAIN_NETWORKS = {
  ETHEREUM: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    explorerUrl: 'https://etherscan.io',
  },
  POLYGON: {
    chainId: 137,
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
  },
  ARBITRUM: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
  },
} as const;

export const FUGIO_CONTRACT_ADDRESSES = {
  FUGIO_NFT: '0x0000000000000000000000000000000000000000', // To be deployed
  UTILITY_COIN: '0x0000000000000000000000000000000000000000', // To be deployed
  AI_TOKENS: '0x0000000000000000000000000000000000000000', // To be deployed
} as const;

export const MEMORY_LIMITS = {
  MAX_CODEX_ENTRIES: 10000,
  MAX_ENTRY_SIZE: 1024 * 1024, // 1MB
  IMPORTANCE_THRESHOLD: 0.3,
  CLEANUP_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
} as const;

export const MISSION_TIMEOUTS = {
  DEFAULT: 5 * 60 * 1000, // 5 minutes
  LONG_RUNNING: 30 * 60 * 1000, // 30 minutes
  CRITICAL: 60 * 60 * 1000, // 1 hour
} as const;

export const OLLAMA_MODELS = {
  LLAMA2: 'llama2:latest',
  MISTRAL: 'mistral:latest',
  CODELLAMA: 'codellama:latest',
  VICUNA: 'vicuna:latest',
  NEURAL_CHAT: 'neural-chat:latest',
} as const;
