#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Tier-Based Event Showcase Setup\n');
console.log('This script will help you set up your environment variables.\n');

const questions = [
  {
    key: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    prompt: 'Enter your Clerk Publishable Key (from Clerk Dashboard > API Keys): ',
    required: true
  },
  {
    key: 'CLERK_SECRET_KEY',
    prompt: 'Enter your Clerk Secret Key (from Clerk Dashboard > API Keys): ',
    required: true
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    prompt: 'Enter your Supabase URL (from Supabase Dashboard > Settings > API): ',
    required: true
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    prompt: 'Enter your Supabase Anon Key (from Supabase Dashboard > Settings > API): ',
    required: true
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    prompt: 'Enter your Supabase Service Role Key (from Supabase Dashboard > Settings > API): ',
    required: false
  }
];

const envVars = {};

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question.prompt, (answer) => {
      if (question.required && !answer.trim()) {
        console.log('❌ This field is required. Please try again.\n');
        askQuestion(question).then(resolve);
      } else {
        envVars[question.key] = answer.trim();
        resolve();
      }
    });
  });
}

async function setup() {
  try {
    console.log('📝 Please provide the following information:\n');

    for (const question of questions) {
      await askQuestion(question);
    }

    // Create .env.local file
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Setup completed successfully!');
    console.log(`📄 Environment variables saved to: ${envPath}`);
    console.log('\n🚀 Next steps:');
    console.log('1. Set up your Supabase database by running the SQL files in supabase/');
    console.log('2. Configure user tiers in Clerk (see README.md for details)');
    console.log('3. Run "npm run dev" to start the development server');
    console.log('\n📚 For detailed instructions, check the README.md file.\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup(); 