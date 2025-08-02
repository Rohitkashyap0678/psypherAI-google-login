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
    key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    prompt: "pk_test_ZW5qb3llZC1tb25hcmNoLTY0LmNsZXJrLmFjY291bnRzLmRldiQ",
    required: true,
  },
  {
    key: "CLERK_SECRET_KEY",
    prompt: "sk_test_iKZJaYhlDYzzQtStqVWVrw50uq3ivDjIyNB0efrU81",
    required: true,
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    prompt: "https://bjrcekzvvfwxbppgouaw.supabase.co",
    required: true,
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    prompt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcmNla3p2dmZ3eGJwcGdvdWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NjEzNDIsImV4cCI6MjA2OTUzNzM0Mn0.yq8vQQ2_QPKozVz_UgRSdGkPDeAZVESq1cjGm6eQyxY): ",
    required: true,
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    prompt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcmNla3p2dmZ3eGJwcGdvdWF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Mzk2MTM0MiwiZXhwIjoyMDY5NTM3MzQyfQ.pGB_rZfu5MUDeXGJkRKWkyHnc40OZjuUajEBbfGxdrI",
    required: false,
  },
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