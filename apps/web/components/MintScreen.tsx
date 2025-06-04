'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Wallet,
  Brain,
  Settings,
  Zap,
  CheckCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { KETO_DEFAULT_EXTENSIONS } from '../lib/types';

interface MintScreenProps {
  onBack: () => void;
}

type MintStep = 'connect' | 'configure' | 'mint' | 'complete';

export default function MintScreen({ onBack }: MintScreenProps) {
  const [currentStep, setCurrentStep] = useState<MintStep>('connect');
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [fugioConfig, setFugioConfig] = useState({
    name: '',
    personality: 'analytical',
    expertise: [] as string[],
    augmentStyle: 'professional',
    ketoExtensions: [] as string[],
  });

  const steps = [
    { id: 'connect', title: 'Connect Wallet', icon: Wallet },
    { id: 'configure', title: 'Configure Agent', icon: Settings },
    { id: 'mint', title: 'Mint Fugio', icon: Brain },
    { id: 'complete', title: 'Complete', icon: CheckCircle },
  ];

  const handleConnectWallet = async () => {
    setIsLoading(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWalletConnected(true);
    setIsLoading(false);
    setCurrentStep('configure');
  };

  const handleMint = async () => {
    setIsLoading(true);
    setCurrentStep('mint');
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setCurrentStep('complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-operator-900 via-operator-800 to-fugio-900">
      {/* Header */}
      <div className="border-b border-operator-700 bg-operator-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-operator-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Protocol
            </button>
            
            <h1 className="text-2xl font-bold text-white">
              Mint Your Fugio Agent
            </h1>
            
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isActive ? 'border-fugio-500 bg-fugio-500 text-white' : 
                    isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                    'border-operator-600 bg-operator-800 text-operator-400'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-fugio-400' : 
                    isCompleted ? 'text-green-400' : 
                    'text-operator-500'
                  }`}>
                    {step.title}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-0.5 mx-4 transition-colors duration-300
                    ${isCompleted ? 'bg-green-500' : 'bg-operator-700'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-operator-800/50 backdrop-blur-sm border border-operator-700 rounded-xl p-8"
          >
            {currentStep === 'connect' && (
              <div className="text-center">
                <Wallet className="w-16 h-16 text-fugio-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Connect Your Wallet
                </h2>
                <p className="text-operator-400 mb-8 max-w-md mx-auto">
                  Connect your Ethereum wallet to mint your Fugio Agent NFT and deploy your personal AI instance.
                </p>
                
                <button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-fugio-600 to-bitcoin-600 text-white font-semibold rounded-lg hover:from-fugio-700 hover:to-bitcoin-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </>
                  )}
                </button>
              </div>
            )}

            {currentStep === 'configure' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Configure Your Fugio Agent
                </h2>
                
                <div className="space-y-8">
                  {/* Agent Name */}
                  <div>
                    <label className="block text-sm font-medium text-operator-300 mb-2">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      value={fugioConfig.name}
                      onChange={(e) => setFugioConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your Fugio agent name"
                      className="w-full px-4 py-3 bg-operator-900 border border-operator-600 rounded-lg text-white placeholder-operator-500 focus:border-fugio-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Personality */}
                  <div>
                    <label className="block text-sm font-medium text-operator-300 mb-2">
                      Personality Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['analytical', 'creative', 'rebellious', 'technical', 'casual', 'professional'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFugioConfig(prev => ({ ...prev, personality: type }))}
                          className={`
                            px-4 py-3 rounded-lg border transition-all duration-200 capitalize
                            ${fugioConfig.personality === type 
                              ? 'border-fugio-500 bg-fugio-500/20 text-fugio-400' 
                              : 'border-operator-600 bg-operator-800 text-operator-400 hover:border-operator-500'
                            }
                          `}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expertise Areas */}
                  <div>
                    <label className="block text-sm font-medium text-operator-300 mb-2">
                      Expertise Areas (Select up to 3)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['blockchain', 'ai-systems', 'protocol-design', 'defi', 'nfts', 'trading', 'development', 'security', 'research'].map((area) => (
                        <button
                          key={area}
                          onClick={() => {
                            setFugioConfig(prev => ({
                              ...prev,
                              expertise: prev.expertise.includes(area)
                                ? prev.expertise.filter(e => e !== area)
                                : prev.expertise.length < 3 
                                  ? [...prev.expertise, area]
                                  : prev.expertise
                            }));
                          }}
                          className={`
                            px-4 py-3 rounded-lg border transition-all duration-200 capitalize text-sm
                            ${fugioConfig.expertise.includes(area)
                              ? 'border-fugio-500 bg-fugio-500/20 text-fugio-400' 
                              : 'border-operator-600 bg-operator-800 text-operator-400 hover:border-operator-500'
                            }
                          `}
                        >
                          {area.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleMint}
                      disabled={!fugioConfig.name || fugioConfig.expertise.length === 0}
                      className="px-8 py-4 bg-gradient-to-r from-fugio-600 to-bitcoin-600 text-white font-semibold rounded-lg hover:from-fugio-700 hover:to-bitcoin-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Zap className="w-5 h-5" />
                      Mint Fugio Agent
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'mint' && (
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-6"
                >
                  <Brain className="w-16 h-16 text-fugio-500" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Minting Your Fugio Agent
                </h2>
                <p className="text-operator-400 mb-8">
                  Deploying your personal AI instance with WorldModel integration...
                </p>
                <div className="space-y-2 text-sm text-operator-500">
                  <p>✓ Generating operator keys</p>
                  <p>✓ Deploying Codex Memory Tree</p>
                  <p>✓ Configuring Augment Engine</p>
                  <p className="text-fugio-400">⟳ Minting NFT...</p>
                </div>
              </div>
            )}

            {currentStep === 'complete' && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Fugio Agent Deployed!
                </h2>
                <p className="text-operator-400 mb-8">
                  Your personal AI agent <strong className="text-fugio-400">{fugioConfig.name}</strong> is now live and ready to execute missions.
                </p>
                
                <div className="bg-operator-900 border border-operator-600 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-operator-500">Agent ID</p>
                      <p className="text-white font-mono">fugio_0x1a2b3c...</p>
                    </div>
                    <div>
                      <p className="text-operator-500">Token ID</p>
                      <p className="text-white font-mono">#1337</p>
                    </div>
                    <div>
                      <p className="text-operator-500">WorldModel</p>
                      <p className="text-white">Genesis v1.0.0</p>
                    </div>
                    <div>
                      <p className="text-operator-500">Status</p>
                      <p className="text-green-400">Active</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-fugio-600 to-bitcoin-600 text-white font-semibold rounded-lg hover:from-fugio-700 hover:to-bitcoin-700 transition-all duration-200 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Open Dashboard
                  </button>
                  
                  <button className="px-6 py-3 border border-fugio-500 text-fugio-400 font-semibold rounded-lg hover:bg-fugio-500 hover:text-white transition-all duration-200 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    View on Explorer
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
