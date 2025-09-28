#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

const action = process.argv[2] || 'start';
const environment = process.argv[3] || 'dev';

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

function checkDockerInstalled() {
  return new Promise((resolve) => {
    exec('docker --version', (error) => {
      resolve(!error);
    });
  });
}

function checkDockerComposeInstalled() {
  return new Promise((resolve) => {
    exec('docker-compose --version', (error) => {
      resolve(!error);
    });
  });
}

async function installDocker() {
  const platform = os.platform();
  
  console.log('🐳 Docker not found. Installing Docker...');
  
  switch (platform) {
    case 'win32':
      console.log('📥 Please download and install Docker Desktop for Windows:');
      console.log('🔗 https://www.docker.com/products/docker-desktop');
      console.log('💡 After installation, restart your terminal and try again.');
      break;
      
    case 'darwin':
      console.log('📥 Installing Docker Desktop for Mac...');
      console.log('🔗 https://www.docker.com/products/docker-desktop');
      console.log('💡 Or install via Homebrew: brew install --cask docker');
      break;
      
    case 'linux':
      console.log('📥 Installing Docker on Linux...');
      console.log('🔗 Follow instructions: https://docs.docker.com/engine/install/');
      console.log('💡 Quick install: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh');
      break;
      
    default:
      console.log('📥 Please install Docker for your platform:');
      console.log('🔗 https://www.docker.com/get-started');
  }
  
  console.log('⏳ Please install Docker and run this script again.');
  process.exit(1);
}

async function ensureDockerInstalled() {
  const dockerInstalled = await checkDockerInstalled();
  const dockerComposeInstalled = await checkDockerComposeInstalled();
  
  if (!dockerInstalled) {
    await installDocker();
  }
  
  if (!dockerComposeInstalled) {
    console.log('⚠️  Docker Compose not found. Please install Docker Desktop (includes Docker Compose).');
    process.exit(1);
  }
  
  console.log('✅ Docker is installed and ready!');
}

async function startDatabase() {
  try {
    await ensureDockerInstalled();
    console.log(`🐳 Starting ${environment} database...`);
    await runCommand('docker-compose', ['up', 'database', '-d']);
    console.log('✅ Database started successfully!');
    console.log('📍 Connection: localhost:5432');
    console.log('👤 User: omnichannel_user');
    console.log('🗄️  Database: omnichannel');
  } catch (error) {
    console.error('❌ Failed to start database:', error.message);
    process.exit(1);
  }
}

async function stopDatabase() {
  try {
    console.log(`🛑 Stopping ${environment} database...`);
    await runCommand('docker-compose', ['stop', 'database']);
    console.log('✅ Database stopped successfully!');
  } catch (error) {
    console.error('❌ Failed to stop database:', error.message);
    process.exit(1);
  }
}

async function restartDatabase() {
  try {
    await stopDatabase();
    console.log('⏳ Waiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await startDatabase();
  } catch (error) {
    console.error('❌ Failed to restart database:', error.message);
    process.exit(1);
  }
}

async function showStatus() {
  try {
    console.log('📊 Database Status:');
    await runCommand('docker-compose', ['ps', 'database']);
  } catch (error) {
    console.error('❌ Failed to show status:', error.message);
    process.exit(1);
  }
}

async function showLogs() {
  try {
    console.log('📋 Database Logs:');
    await runCommand('docker-compose', ['logs', '-f', 'database']);
  } catch (error) {
    console.error('❌ Failed to show logs:', error.message);
    process.exit(1);
  }
}

async function installDockerGuide() {
  await installDocker();
}

// Main execution
async function main() {
  console.log('🐳 Omnichannel Database Manager');
  console.log(`Environment: ${environment} | Action: ${action}`);
  console.log(`Platform: ${os.platform()} ${os.arch()}`);
  console.log('');

  switch (action) {
    case 'install':
      await installDockerGuide();
      break;
    case 'start':
      await startDatabase();
      break;
    case 'stop':
      await stopDatabase();
      break;
    case 'restart':
      await restartDatabase();
      break;
    case 'status':
      await showStatus();
      break;
    case 'logs':
      await showLogs();
      break;
    default:
      console.log('❌ Unknown action. Available actions: install, start, stop, restart, status, logs');
      process.exit(1);
  }
}

main().catch(console.error);
