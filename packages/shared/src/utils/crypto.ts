import { ethers } from 'ethers';
import crypto from 'crypto';

/**
 * Cryptographic utilities for FUGIO Protocol
 */

export class FugioCrypto {
  /**
   * Generate a new operator keypair
   */
  static generateOperatorKeys(): {
    privateKey: string;
    publicKey: string;
    address: string;
  } {
    const wallet = ethers.Wallet.createRandom();
    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }

  /**
   * Sign a message with operator private key
   */
  static async signMessage(
    message: string,
    privateKey: string
  ): Promise<string> {
    const wallet = new ethers.Wallet(privateKey);
    return await wallet.signMessage(message);
  }

  /**
   * Verify a signed message
   */
  static verifySignature(
    message: string,
    signature: string,
    address: string
  ): boolean {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch {
      return false;
    }
  }

  /**
   * Generate a secure API key for Fugio agent
   */
  static generateAPIKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hash sensitive data for storage
   */
  static hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Encrypt data with AES-256-GCM
   */
  static encryptData(data: string, key: string): {
    encrypted: string;
    iv: string;
    tag: string;
  } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-gcm', key);
    cipher.setAAD(Buffer.from('fugio-protocol'));
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
    };
  }

  /**
   * Decrypt data with AES-256-GCM
   */
  static decryptData(
    encryptedData: string,
    key: string,
    iv: string,
    tag: string
  ): string {
    const decipher = crypto.createDecipher('aes-256-gcm', key);
    decipher.setAAD(Buffer.from('fugio-protocol'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  /**
   * Generate a deterministic ID from operator address and timestamp
   */
  static generateFugioId(operatorAddress: string, timestamp: number): string {
    const data = `${operatorAddress}-${timestamp}`;
    return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
  }

  /**
   * Validate Ethereum address format
   */
  static isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}
