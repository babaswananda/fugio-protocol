// FUGIO Protocol Types for Web App

export interface Operator {
  id: string;
  address: string;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FugioAgent {
  id: string;
  operatorId: string;
  tokenId: string;
  name: string;
  description?: string;
  worldModelVersion: string;
  augmentConfig: Record<string, any>;
  ketoConfig: string[];
  codexMemoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AugmentConfig {
  style: {
    tone: 'professional' | 'casual' | 'technical' | 'creative' | 'rebellious';
    formality: number;
    creativity: number;
    verbosity: number;
  };
  personality: {
    traits: string[];
    values: string[];
    expertise: string[];
  };
  formatting: {
    useEmojis: boolean;
    codeStyle: 'minimal' | 'detailed' | 'commented';
    responseLength: 'brief' | 'moderate' | 'detailed';
  };
}

export const DEFAULT_AUGMENT_CONFIG: AugmentConfig = {
  style: {
    tone: 'professional',
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
    codeStyle: 'detailed',
    responseLength: 'moderate',
  },
};

export const WORLDMODEL_VERSIONS = {
  GENESIS: '1.0.0',
  EVOLUTION: '1.1.0',
  TRANSCENDENCE: '2.0.0',
} as const;

export const KETO_DEFAULT_EXTENSIONS = [
  'kilocode-cs-security',
  'kilocode-cs-compliance', 
  'kilocode-cs-logging',
  'kilocode-cs-validation',
];

export const OLLAMA_MODELS = {
  LLAMA2: 'llama2:latest',
  MISTRAL: 'mistral:latest',
  CODELLAMA: 'codellama:latest',
  VICUNA: 'vicuna:latest',
  NEURAL_CHAT: 'neural-chat:latest',
} as const;
