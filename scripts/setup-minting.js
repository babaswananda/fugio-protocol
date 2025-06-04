#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧠 FUGIO Protocol - Minting Infrastructure Setup\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Install dependencies if not already installed
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Build packages
console.log('\n🔨 Building packages...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to build packages');
  process.exit(1);
}

// Create environment files
console.log('\n⚙️  Setting up environment files...');

const envTemplate = `# FUGIO Protocol Environment Configuration

# Database
DATABASE_URL="postgresql://fugio:fugio@localhost:5432/fugio"

# Blockchain
ETHEREUM_RPC_URL="https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
POLYGON_RPC_URL="https://polygon-rpc.com"
PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"

# AI Services
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
WORLDMODEL_VERSION="1.0.0"

# API Configuration
JWT_SECRET="your-jwt-secret-here"
API_PORT=8080
CORS_ORIGIN="http://localhost:3000"

# Ollama Configuration
OLLAMA_HOST="http://localhost:11434"
OLLAMA_DEFAULT_MODEL="llama2:latest"

# KiloCode CS Integration
KILOCODE_WS_PORT=8081
KILOCODE_EXTENSIONS_PATH="./extensions"

# IPFS (for NFT metadata)
IPFS_GATEWAY="https://ipfs.io/ipfs/"
PINATA_API_KEY="YOUR_PINATA_API_KEY"
PINATA_SECRET_KEY="YOUR_PINATA_SECRET_KEY"

# Monitoring
LOG_LEVEL="info"
ENABLE_METRICS=true
`;

// Write environment files
fs.writeFileSync('.env.example', envTemplate);
if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', envTemplate);
  console.log('   ✅ Created .env file (please update with your values)');
} else {
  console.log('   ⚠️  .env file already exists, skipping...');
}

// Create apps/web/.env.local
const webEnvTemplate = `# Next.js Environment Variables
NEXT_PUBLIC_API_URL="http://localhost:8080"
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_CONTRACT_ADDRESS="0x0000000000000000000000000000000000000000"
NEXT_PUBLIC_ENABLE_TESTNETS=true
`;

fs.writeFileSync('apps/web/.env.local', webEnvTemplate);
console.log('   ✅ Created web environment file');

// Create database schema
console.log('\n🗄️  Setting up database schema...');

const prismaSchema = `// FUGIO Protocol Database Schema
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Operator {
  id        String   @id @default(cuid())
  address   String   @unique
  publicKey String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  fugioAgents FugioAgent[]
  missions    Mission[]
  
  @@map("operators")
}

model FugioAgent {
  id                String   @id @default(cuid())
  tokenId           String   @unique
  name              String
  description       String?
  worldModelVersion String
  augmentConfig     Json
  ketoConfig        String[]
  codexMemoryId     String
  isActive          Boolean  @default(true)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  operator   Operator @relation(fields: [operatorId], references: [id])
  operatorId String
  
  codexMemory CodexMemory?
  missions    Mission[]
  
  @@map("fugio_agents")
}

model CodexMemory {
  id            String   @id @default(cuid())
  fugioId       String   @unique
  entries       Json[]
  totalEntries  Int      @default(0)
  lastAccessed  DateTime @default(now())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  fugioAgent FugioAgent @relation(fields: [fugioId], references: [id])
  
  @@map("codex_memories")
}

model Mission {
  id          String      @id @default(cuid())
  title       String
  description String
  status      MissionStatus @default(PENDING)
  priority    MissionPriority @default(MEDIUM)
  apiCalls    Json[]
  result      Json?
  createdAt   DateTime    @default(now())
  completedAt DateTime?
  updatedAt   DateTime    @updatedAt
  
  fugio      FugioAgent @relation(fields: [fugioId], references: [id])
  fugioId    String
  operator   Operator   @relation(fields: [operatorId], references: [id])
  operatorId String
  
  @@map("missions")
}

enum MissionStatus {
  PENDING
  ACTIVE
  COMPLETED
  FAILED
  CANCELLED
}

enum MissionPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
`;

// Create prisma directory and schema
const prismaDir = 'prisma';
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir);
}
fs.writeFileSync(path.join(prismaDir, 'schema.prisma'), prismaSchema);
console.log('   ✅ Created Prisma schema');

// Create deployment scripts
console.log('\n🚀 Creating deployment scripts...');

const startScript = `#!/bin/bash
# FUGIO Protocol Start Script

echo "🧠 Starting FUGIO Protocol..."

# Start database (if using Docker)
if command -v docker &> /dev/null; then
    echo "📊 Starting PostgreSQL..."
    docker run -d \\
        --name fugio-postgres \\
        -e POSTGRES_DB=fugio \\
        -e POSTGRES_USER=fugio \\
        -e POSTGRES_PASSWORD=fugio \\
        -p 5432:5432 \\
        postgres:15 || echo "PostgreSQL already running"
fi

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init || true
npx prisma generate

# Start API server
echo "🔌 Starting API server..."
npm run dev --workspace=@fugio/api &
API_PID=$!

# Start web interface
echo "🌐 Starting web interface..."
npm run dev --workspace=@fugio/web &
WEB_PID=$!

echo "✅ FUGIO Protocol is running!"
echo "   Web Interface: http://localhost:3000"
echo "   API Server: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap "echo 'Stopping services...'; kill $API_PID $WEB_PID; exit" INT
wait
`;

fs.writeFileSync('scripts/start.sh', startScript);
fs.chmodSync('scripts/start.sh', '755');
console.log('   ✅ Created start script');

const dockerComposeTemplate = `version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: fugio
      POSTGRES_USER: fugio
      POSTGRES_PASSWORD: fugio
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  postgres_data:
  ollama_data:
`;

fs.writeFileSync('docker-compose.yml', dockerComposeTemplate);
console.log('   ✅ Created Docker Compose file');

// Create README for setup
const setupReadme = `# FUGIO Protocol Setup

## Quick Start

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment:**
   - Copy \`.env.example\` to \`.env\`
   - Update the values with your API keys and configuration

3. **Start services:**
   \`\`\`bash
   ./scripts/start.sh
   \`\`\`

4. **Access the application:**
   - Web Interface: http://localhost:3000
   - API Server: http://localhost:8080

## Environment Variables

### Required
- \`OPENAI_API_KEY\`: Your OpenAI API key for WorldModel
- \`DATABASE_URL\`: PostgreSQL connection string
- \`ETHEREUM_RPC_URL\`: Ethereum RPC endpoint
- \`PRIVATE_KEY\`: Private key for contract deployment

### Optional
- \`OLLAMA_HOST\`: Ollama server URL (default: http://localhost:11434)
- \`KILOCODE_WS_PORT\`: KiloCode CS WebSocket port (default: 8081)
- \`LOG_LEVEL\`: Logging level (default: info)

## Development

### Build all packages:
\`\`\`bash
npm run build
\`\`\`

### Run tests:
\`\`\`bash
npm run test
\`\`\`

### Package for local deployment:
\`\`\`bash
npm run ollama:package
\`\`\`

## Deployment

### Using Docker:
\`\`\`bash
docker-compose up -d
\`\`\`

### Manual deployment:
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations: \`npx prisma migrate deploy\`
4. Start API server: \`npm run start --workspace=@fugio/api\`
5. Build and serve web app: \`npm run build --workspace=@fugio/web\`

## Troubleshooting

### Database connection issues:
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Run: \`npx prisma migrate reset\`

### Ollama not working:
- Install Ollama: https://ollama.ai
- Pull a model: \`ollama pull llama2\`
- Check status: \`npm run ollama:package status\`

### KiloCode CS integration:
- Ensure VS Code is running
- Install KiloCode CS extensions
- Check WebSocket connection on port 8081
`;

fs.writeFileSync('SETUP.md', setupReadme);
console.log('   ✅ Created setup documentation');

console.log('\n🎉 FUGIO Protocol minting infrastructure setup complete!');
console.log('\n📋 Next steps:');
console.log('   1. Update .env file with your API keys');
console.log('   2. Run: ./scripts/start.sh');
console.log('   3. Visit: http://localhost:3000');
console.log('\n🧠 Ready to mint your first Fugio agent!');
