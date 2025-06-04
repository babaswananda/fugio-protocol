import { z } from 'zod';

// Core FUGIO Protocol Types

export const OperatorSchema = z.object({
  id: z.string(),
  address: z.string(), // Ethereum address
  publicKey: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const FugioAgentSchema = z.object({
  id: z.string(),
  operatorId: z.string(),
  tokenId: z.string(), // NFT token ID
  name: z.string(),
  description: z.string().optional(),
  worldModelVersion: z.string(),
  augmentConfig: z.record(z.any()),
  ketoConfig: z.array(z.string()), // KiloCode extension IDs
  codexMemoryId: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CodexMemorySchema = z.object({
  id: z.string(),
  fugioId: z.string(),
  entries: z.array(z.object({
    id: z.string(),
    type: z.enum(['conversation', 'mission', 'knowledge', 'preference']),
    content: z.string(),
    metadata: z.record(z.any()),
    timestamp: z.date(),
    importance: z.number().min(0).max(1),
  })),
  totalEntries: z.number(),
  lastAccessed: z.date(),
});

export const MissionSchema = z.object({
  id: z.string(),
  fugioId: z.string(),
  operatorId: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['pending', 'active', 'completed', 'failed', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  apiCalls: z.array(z.object({
    endpoint: z.string(),
    method: z.string(),
    params: z.record(z.any()),
    response: z.any().optional(),
    timestamp: z.date(),
  })),
  result: z.any().optional(),
  createdAt: z.date(),
  completedAt: z.date().optional(),
});

export const AugmentConfigSchema = z.object({
  style: z.object({
    tone: z.enum(['professional', 'casual', 'technical', 'creative', 'rebellious']),
    formality: z.number().min(0).max(1),
    creativity: z.number().min(0).max(1),
    verbosity: z.number().min(0).max(1),
  }),
  personality: z.object({
    traits: z.array(z.string()),
    values: z.array(z.string()),
    expertise: z.array(z.string()),
  }),
  formatting: z.object({
    useEmojis: z.boolean(),
    codeStyle: z.enum(['minimal', 'detailed', 'commented']),
    responseLength: z.enum(['brief', 'moderate', 'detailed']),
  }),
});

export const KetoConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  extensionId: z.string(), // KiloCode CS extension ID
  settings: z.record(z.any()), // Extension-specific settings
  isActive: z.boolean(),
  version: z.string(),
});

// Export types
export type Operator = z.infer<typeof OperatorSchema>;
export type FugioAgent = z.infer<typeof FugioAgentSchema>;
export type CodexMemory = z.infer<typeof CodexMemorySchema>;
export type Mission = z.infer<typeof MissionSchema>;
export type AugmentConfig = z.infer<typeof AugmentConfigSchema>;
export type KetoConfig = z.infer<typeof KetoConfigSchema>;

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Event types for the protocol
export interface ProtocolEvent {
  type: string;
  fugioId: string;
  operatorId: string;
  data: any;
  timestamp: Date;
}
