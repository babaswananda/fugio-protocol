#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { OllamaPackager } from './OllamaPackager';
import { OLLAMA_MODELS } from '@fugio/shared';

const program = new Command();

program
  .name('fugio-package')
  .description('FUGIO Protocol Ollama Packager - Deploy your Fugio agent locally')
  .version('1.0.0');

program
  .command('package')
  .description('Package a Fugio agent for local deployment')
  .option('-i, --interactive', 'Interactive mode')
  .option('-f, --fugio-id <id>', 'Fugio agent ID')
  .option('-m, --model <model>', 'Ollama model to use')
  .option('-o, --output <path>', 'Output directory')
  .action(async (options) => {
    console.log(chalk.blue.bold('\n🧠 FUGIO Protocol Ollama Packager\n'));

    let config: any = {};

    if (options.interactive || !options.fugioId) {
      // Interactive mode
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'fugioId',
          message: 'Enter your Fugio Agent ID:',
          default: options.fugioId,
          validate: (input) => input.length > 0 || 'Fugio ID is required',
        },
        {
          type: 'list',
          name: 'model',
          message: 'Select Ollama model:',
          choices: Object.entries(OLLAMA_MODELS).map(([key, value]) => ({
            name: `${key} (${value})`,
            value: value,
          })),
          default: options.model || OLLAMA_MODELS.LLAMA2,
        },
        {
          type: 'input',
          name: 'outputPath',
          message: 'Output directory:',
          default: options.output || './fugio-package',
        },
        {
          type: 'confirm',
          name: 'includeMemory',
          message: 'Include Codex Memory in package?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'includeAugment',
          message: 'Include Augment configuration?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'includeKeto',
          message: 'Include Keto extensions?',
          default: true,
        },
      ]);

      config = answers;
    } else {
      // Non-interactive mode
      config = {
        fugioId: options.fugioId,
        model: options.model || OLLAMA_MODELS.LLAMA2,
        outputPath: options.output || './fugio-package',
        includeMemory: true,
        includeAugment: true,
        includeKeto: true,
      };
    }

    const spinner = ora('Initializing Ollama Packager...').start();

    try {
      const packager = new OllamaPackager();
      
      spinner.text = 'Fetching Fugio agent configuration...';
      await packager.fetchFugioConfig(config.fugioId);
      
      spinner.text = 'Downloading Ollama model...';
      await packager.downloadModel(config.model);
      
      spinner.text = 'Packaging agent components...';
      await packager.packageComponents({
        includeMemory: config.includeMemory,
        includeAugment: config.includeAugment,
        includeKeto: config.includeKeto,
      });
      
      spinner.text = 'Creating deployment package...';
      const packagePath = await packager.createPackage(config.outputPath);
      
      spinner.succeed(chalk.green('Fugio agent packaged successfully!'));
      
      console.log(chalk.cyan('\n📦 Package Details:'));
      console.log(chalk.white(`   Location: ${packagePath}`));
      console.log(chalk.white(`   Model: ${config.model}`));
      console.log(chalk.white(`   Fugio ID: ${config.fugioId}`));
      
      console.log(chalk.yellow('\n🚀 Deployment Instructions:'));
      console.log(chalk.white('   1. Extract the package on your target machine'));
      console.log(chalk.white('   2. Install Ollama: https://ollama.ai'));
      console.log(chalk.white('   3. Run: ./start-fugio.sh'));
      
      console.log(chalk.green('\n✨ Your Fugio agent is ready for sovereign deployment!'));
      
    } catch (error) {
      spinner.fail(chalk.red('Packaging failed'));
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

program
  .command('list-models')
  .description('List available Ollama models')
  .action(() => {
    console.log(chalk.blue.bold('\n🤖 Available Ollama Models:\n'));
    
    Object.entries(OLLAMA_MODELS).forEach(([name, model]) => {
      console.log(chalk.cyan(`   ${name.padEnd(15)} ${chalk.white(model)}`));
    });
    
    console.log(chalk.gray('\nFor more models, visit: https://ollama.ai/library\n'));
  });

program
  .command('status')
  .description('Check Ollama installation status')
  .action(async () => {
    const spinner = ora('Checking Ollama status...').start();
    
    try {
      const packager = new OllamaPackager();
      const status = await packager.checkOllamaStatus();
      
      if (status.installed) {
        spinner.succeed(chalk.green('Ollama is installed and running'));
        console.log(chalk.cyan(`   Version: ${status.version}`));
        console.log(chalk.cyan(`   Models: ${status.models.length} installed`));
        
        if (status.models.length > 0) {
          console.log(chalk.white('\n   Installed models:'));
          status.models.forEach((model: string) => {
            console.log(chalk.gray(`     - ${model}`));
          });
        }
      } else {
        spinner.fail(chalk.red('Ollama is not installed or not running'));
        console.log(chalk.yellow('\n   Install Ollama: https://ollama.ai'));
      }
    } catch (error) {
      spinner.fail(chalk.red('Failed to check Ollama status'));
      console.error(chalk.red(`Error: ${error}`));
    }
  });

program
  .command('deploy')
  .description('Deploy a packaged Fugio agent locally')
  .option('-p, --package <path>', 'Path to Fugio package')
  .option('-d, --daemon', 'Run as daemon')
  .action(async (options) => {
    console.log(chalk.blue.bold('\n🚀 FUGIO Local Deployment\n'));
    
    const spinner = ora('Deploying Fugio agent...').start();
    
    try {
      const packager = new OllamaPackager();
      
      spinner.text = 'Extracting package...';
      await packager.extractPackage(options.package);
      
      spinner.text = 'Starting Ollama service...';
      await packager.startOllama();
      
      spinner.text = 'Loading Fugio agent...';
      await packager.loadAgent();
      
      spinner.succeed(chalk.green('Fugio agent deployed successfully!'));
      
      console.log(chalk.cyan('\n🧠 Agent Status:'));
      console.log(chalk.white('   Status: Running'));
      console.log(chalk.white('   Interface: http://localhost:11434'));
      console.log(chalk.white('   API: http://localhost:8080/api'));
      
      if (options.daemon) {
        console.log(chalk.yellow('\n   Running in daemon mode...'));
        // Keep process alive
        process.stdin.resume();
      } else {
        console.log(chalk.yellow('\n   Press Ctrl+C to stop the agent'));
      }
      
    } catch (error) {
      spinner.fail(chalk.red('Deployment failed'));
      console.error(chalk.red(`Error: ${error}`));
      process.exit(1);
    }
  });

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('\nUncaught Exception:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red('\nUnhandled Rejection:'), reason);
  process.exit(1);
});

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
