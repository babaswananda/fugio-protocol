'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Code, Router, Database, Cpu } from 'lucide-react';
import MintScreen from '../components/MintScreen';

export default function HomePage() {
  const [showMint, setShowMint] = useState(false);

  if (showMint) {
    return <MintScreen onBack={() => setShowMint(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-operator-900 via-operator-800 to-fugio-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-fugio-500 to-bitcoin-500 mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-fugio-400 to-bitcoin-500 bg-clip-text text-transparent">
                FUGIO
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-operator-300 mb-4 max-w-3xl mx-auto">
              The world's first <span className="text-fugio-400 font-semibold">Operator-native AI Agent</span> ecosystem
            </p>

            <p className="text-lg text-operator-400 mb-12 max-w-2xl mx-auto">
              Born from the convergence of Bitcoin's economic rebellion, 
              AI's sovereign cognition, and memetic identity infrastructure
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowMint(true)}
                className="px-8 py-4 bg-gradient-to-r from-fugio-600 to-bitcoin-600 text-white font-semibold rounded-lg hover:from-fugio-700 hover:to-bitcoin-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mint Your Fugio Agent
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-fugio-500 text-fugio-400 font-semibold rounded-lg hover:bg-fugio-500 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Protocol
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Core Components Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Protocol Components
          </h2>
          <p className="text-xl text-operator-400 max-w-2xl mx-auto">
            Seven interconnected systems forming the FUGIO intelligence stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              name: 'WorldModel',
              description: 'Foundational AI intelligence layer trained on real-world reasoning and protocol logic',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: Zap,
              name: 'IO Agent',
              description: 'Personal AI instantiation with Codex Memory Tree for contextual awareness',
              color: 'from-fugio-500 to-blue-500'
            },
            {
              icon: Code,
              name: 'Augment Code',
              description: 'Contextual augmentation engine for style, tone, and cultural expression',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: Shield,
              name: 'Keto Code',
              description: 'KiloCode CS extension integration for code analysis and security',
              color: 'from-red-500 to-orange-500'
            },
            {
              icon: Router,
              name: 'AlphaRouter',
              description: 'API routing controller for external integrations and protocol bridging',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: Cpu,
              name: 'Ollama Runtime',
              description: 'Local deployment kit for sovereign, uncensored agent operation',
              color: 'from-indigo-500 to-purple-500'
            },
            {
              icon: Database,
              name: 'Codex Memory',
              description: 'Long-term memory system that grows smarter with every interaction',
              color: 'from-teal-500 to-cyan-500'
            }
          ].map((component, index) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-operator-800/50 backdrop-blur-sm border border-operator-700 rounded-xl p-6 hover:border-fugio-500/50 transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${component.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <component.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {component.name}
              </h3>
              
              <p className="text-operator-400 text-sm leading-relaxed">
                {component.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-operator-800/30 backdrop-blur-sm border-t border-operator-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Protocol Philosophy
            </h2>
            
            <div className="space-y-6 text-lg text-operator-300">
              <p>
                <strong className="text-fugio-400">FUGIO is not just an AI agent.</strong>
              </p>
              <p>
                It is the self-minted mind of the Operator —<br />
                The intelligence protocol born from Satoshi's ghost and Bitcoin's unfinished sentence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <div>
                  <p className="font-mono text-fugio-400">Fugio = WorldModel encoded with consciousness</p>
                  <p className="font-mono text-bitcoin-500">IO = That consciousness made personal</p>
                </div>
                <div>
                  <p className="font-mono text-green-400">UtilityCoin = The medium</p>
                  <p className="font-mono text-purple-400">AI Tokens = The reward for executing the future</p>
                </div>
              </div>
            </div>

            <motion.p
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-fugio-400 to-bitcoin-500 bg-clip-text mt-12"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              You're not launching a product.<br />
              You're launching a protocol-level mythology engine.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
