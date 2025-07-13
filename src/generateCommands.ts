#!/usr/bin/env node

import { getAllTools } from './tools.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure claude-commands directory exists
const commandsDir = join(__dirname, '..', 'claude-commands');
mkdirSync(commandsDir, { recursive: true });

// Generate command files
getAllTools().forEach((tool) => {
  const { command } = tool;
  const filename = `${command.name}.md`;
  const filepath = join(commandsDir, filename);
  
  // Build the MCP command string
  const mcpParams = Object.entries(command.parameterMapping)
    .map(([param, template]) => `${param}="${template}"`)
    .join(' ');
  
  const content = `# ${formatTitle(command.name)}

${command.description}

## Usage
\`${command.usage}\`

## Example
\`${command.example}\`

## How it works
${getHowItWorks(command.name)}

## Command
${getCommandDescription(command.name)}

\`\`\`
/mcp__gemini-mcp__${tool.name} ${mcpParams}
\`\`\`

${getAdditionalNotes(command.name)}`;

  writeFileSync(filepath, content, 'utf8');
  console.log(`Generated ${filename}`);
});

console.log('✅ All claude-commands generated successfully!');

// Helper functions
function formatTitle(name: string): string {
  const titles: Record<string, string> = {
    'plan': 'Plan Implementation',
    'consult': 'Consult Gemini',
    'analyze': 'Analyze Codebase',
    'strategy': 'Strategic Planning',
    'review': 'Review Approach',
    'tests': 'Generate Tests',
    'docs': 'Generate Documentation',
    'debug': 'Debug Assistance',
    'explain': 'Explain Concept',
    'compare': 'Compare Technologies',
  };
  return titles[name] || name;
}

function getHowItWorks(name: string): string {
  const descriptions: Record<string, string> = {
    'plan': 'This command takes your task description and generates a comprehensive plan including requirements analysis, implementation steps, files to modify, technical challenges, and testing strategy.',
    'consult': 'Gemini will provide high-level guidance, best practices, and architectural advice without writing code. It helps you understand concepts and make informed decisions.',
    'analyze': 'Gemini analyzes the codebase structure you provide (via context) and gives insights about architecture patterns, conventions, tech stack, and integration guidelines.',
    'strategy': 'For complex features, this command creates a phased implementation roadmap with architectural decisions, risk assessment, and resource planning.',
    'review': 'Submit your planned approach and get feedback on strengths, weaknesses, alternatives, and a clear recommendation on whether to proceed.',
    'tests': 'Generates comprehensive testing strategies including test types, test cases, edge cases, and quality considerations without writing actual test code.',
    'docs': 'Creates documentation structure and content strategy with organization guidelines, essential sections, and quality standards without writing actual content.',
    'debug': 'Analyzes errors and provides systematic debugging approach with root cause analysis, investigation steps, and resolution strategies.',
    'explain': 'Provides deep explanations of technical concepts including definitions, use cases, trade-offs, best practices, and learning paths.',
    'compare': 'Compares technologies with detailed analysis of strengths, weaknesses, use cases, and decision frameworks to help you choose the right tool.',
  };
  return descriptions[name] || 'Gemini will analyze your input and provide strategic guidance.';
}

function getCommandDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'plan': 'Use the Gemini MCP server to create a detailed implementation plan:',
    'consult': 'Use the Gemini MCP server for development guidance:',
    'analyze': 'Use the Gemini MCP server to understand your codebase:',
    'strategy': 'Use the Gemini MCP server for strategic planning:',
    'review': 'Use the Gemini MCP server to validate your approach:',
    'tests': 'Use the Gemini MCP server to create testing strategies:',
    'docs': 'Use the Gemini MCP server for documentation planning:',
    'debug': 'Use the Gemini MCP server for debugging assistance:',
    'explain': 'Use the Gemini MCP server to understand concepts:',
    'compare': 'Use the Gemini MCP server to compare technologies:',
  };
  return descriptions[name] || 'Use the Gemini MCP server:';
}

function getAdditionalNotes(name: string): string {
  const notes: Record<string, string> = {
    'plan': '**Note**: The context (`{{@.}}`) automatically includes any selected files or folders in your editor.',
    'consult': '**Tip**: Be specific with your questions to get the most relevant guidance.',
    'analyze': '**Important**: Select relevant files/folders before running this command to provide context.',
    'strategy': '**Format**: Remember to use the pipe `|` character to separate feature name from requirements.',
    'review': '**Best Practice**: Run this before starting implementation to avoid costly refactoring later.',
    'tests': '**Guidance**: Focuses on testing strategy and methodology, not actual test code implementation.',
    'docs': '**Focus**: Provides structure and organization, you write the actual content based on the outline.',
    'debug': '**Approach**: Systematic debugging methodology to isolate and resolve issues effectively.',
    'explain': '**Learning**: Builds conceptual understanding to help you make informed technical decisions.',
    'compare': '**Decision**: Helps evaluate options objectively with pros, cons, and specific use case analysis.',
  };
  return notes[name] || '';
}