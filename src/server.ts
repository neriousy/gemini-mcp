import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { geminiClient } from './gemini.js';

export const server = new McpServer({
  name: 'gemini',
  version: '0.0.1',
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  'generate-plan',
  'Use Gemini to generate a detailed plan for Claude Code to implement a task',
  {
    task: z
      .string()
      .describe('The task or feature that needs to be implemented'),
    context: z
      .string()
      .optional()
      .describe(
        'Additional context about the project, codebase, or requirements'
      ),
  },
  async ({ task, context }) => {
    try {
      const plan = await geminiClient.generatePlan(task, context);
      return {
        content: [
          {
            type: 'text',
            text: plan,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error generating plan with Gemini: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  }
);

server.tool(
  'gemini-consult',
  'Consult with Gemini when Claude needs help, additional context, or is stuck on a problem',
  {
    question: z
      .string()
      .describe(
        'The question, problem, or situation where Claude needs help or additional context'
      ),
    currentContext: z
      .string()
      .optional()
      .describe(
        'Current context about what Claude is working on, error messages, or relevant code'
      ),
  },
  async ({ question, currentContext }) => {
    try {
      const consultPrompt = `Provide development guidance for this question:

**Question**: ${question}

${currentContext ? `**Current Context**: ${currentContext}\n` : ''}

Please provide:
- Practical advice and suggestions
- Alternative approaches to consider  
- Best practices and insights
- Actionable next steps

Focus on helpful, concrete guidance.`;

      const response = await geminiClient.query(consultPrompt);
      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error consulting with Gemini: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  }
);

server.tool(
  'analyze-codebase',
  'Analyze codebase structure and patterns to understand how it works before implementing changes',
  {
    codebaseInfo: z
      .string()
      .describe(
        'Information about the codebase structure, files, and patterns'
      ),
    task: z
      .string()
      .optional()
      .describe('Optional: specific task this analysis is for'),
  },
  async ({ codebaseInfo, task }) => {
    try {
      const analysis = await geminiClient.analyzeCodebase(codebaseInfo, task);
      return {
        content: [
          {
            type: 'text',
            text: analysis,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error analyzing codebase with Gemini: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  }
);

server.tool(
  'strategic-plan',
  'Create a high-level strategic roadmap for implementing complex features',
  {
    feature: z.string().describe('The feature or system to be implemented'),
    requirements: z
      .string()
      .describe('Detailed requirements and specifications'),
    codebaseContext: z
      .string()
      .optional()
      .describe('Optional: relevant codebase context and constraints'),
  },
  async ({ feature, requirements, codebaseContext }) => {
    try {
      const strategy = await geminiClient.strategicPlan(
        feature,
        requirements,
        codebaseContext
      );
      return {
        content: [
          {
            type: 'text',
            text: strategy,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating strategic plan with Gemini: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  }
);

server.tool(
  'review-approach',
  'Review and validate a proposed implementation approach before coding begins',
  {
    proposedApproach: z
      .string()
      .describe('The implementation approach or plan to review'),
    context: z
      .string()
      .optional()
      .describe(
        'Optional: additional context about the project or requirements'
      ),
  },
  async ({ proposedApproach, context }) => {
    try {
      const review = await geminiClient.reviewApproach(
        proposedApproach,
        context
      );
      return {
        content: [
          {
            type: 'text',
            text: review,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error reviewing approach with Gemini: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  }
);
