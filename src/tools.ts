import z from 'zod';
import { PromptKey } from './prompts.js';

export interface ToolConfig {
  name: string;
  description: string;
  promptKey: PromptKey;
  model: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  parameters: {
    [key: string]: {
      schema: z.ZodTypeAny;
      description: string;
      required: boolean;
    };
  };
  // Claude command configuration
  command: {
    name: string;
    description: string;
    usage: string;
    example: string;
    parameterMapping: {
      [key: string]: string; // Maps tool param to command template variable
    };
  };
}

export const TOOLS: Record<string, ToolConfig> = {
  'generate-plan': {
    name: 'generate-plan',
    description: 'Use Gemini to generate a detailed plan for Claude Code to implement a task',
    promptKey: 'GENERATE_PLAN',
    model: 'gemini-2.5-pro',
    parameters: {
      task: {
        schema: z.string(),
        description: 'The task or feature that needs to be implemented',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Additional context about the project, codebase, or requirements',
        required: false,
      },
    },
    command: {
      name: 'plan',
      description: 'Generate a detailed implementation plan using Gemini\'s strategic planning capabilities. This command helps you break down complex tasks into actionable steps with clear architecture and testing strategies.',
      usage: '/plan <task description>',
      example: '/plan Add user authentication with JWT tokens to the Express API',
      parameterMapping: {
        task: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'gemini-consult': {
    name: 'gemini-consult',
    description: 'Consult with Gemini when Claude needs help, additional context, or is stuck on a problem',
    promptKey: 'CONSULT',
    model: 'gemini-2.5-flash',
    parameters: {
      question: {
        schema: z.string(),
        description: 'The question, problem, or situation where Claude needs help or additional context',
        required: true,
      },
      currentContext: {
        schema: z.string().optional(),
        description: 'Current context about what Claude is working on, error messages, or relevant code',
        required: false,
      },
    },
    command: {
      name: 'consult',
      description: 'Get quick development guidance and advice from Gemini. Use this when you need architectural advice, best practices, or are stuck on a problem. Gemini will provide high-level guidance without code snippets.',
      usage: '/consult <question or problem>',
      example: '/consult What\'s the best way to handle form validation in React with TypeScript?',
      parameterMapping: {
        question: '{{arg1}}',
        currentContext: '{{@.}}',
      },
    },
  },

  'analyze-codebase': {
    name: 'analyze-codebase',
    description: 'Analyze codebase structure and patterns to understand how it works before implementing changes',
    promptKey: 'ANALYZE_CODEBASE',
    model: 'gemini-2.5-pro',
    parameters: {
      codebaseInfo: {
        schema: z.string(),
        description: 'Information about the codebase structure, files, and patterns',
        required: true,
      },
      task: {
        schema: z.string().optional(),
        description: 'Optional: specific task this analysis is for',
        required: false,
      },
    },
    command: {
      name: 'analyze',
      description: 'Analyze project architecture and patterns to understand how the codebase works. Provide codebase information in the current context (selected files/folders) and optionally specify a focus area. Gemini will analyze patterns, conventions, and architecture.',
      usage: '/analyze [optional: specific focus area]',
      example: '/analyze state management patterns in the React components',
      parameterMapping: {
        codebaseInfo: '{{@.}}',
        task: '{{arg1}}',
      },
    },
  },

  'strategic-plan': {
    name: 'strategic-plan',
    description: 'Create a high-level strategic roadmap for implementing complex features',
    promptKey: 'STRATEGIC_PLAN',
    model: 'gemini-2.5-pro',
    parameters: {
      feature: {
        schema: z.string(),
        description: 'The feature or system to be implemented',
        required: true,
      },
      requirements: {
        schema: z.string(),
        description: 'Detailed requirements and specifications',
        required: true,
      },
      codebaseContext: {
        schema: z.string().optional(),
        description: 'Optional: relevant codebase context and constraints',
        required: false,
      },
    },
    command: {
      name: 'strategy',
      description: 'Create a high-level strategic roadmap for implementing complex features. Use pipe (|) to separate feature name from requirements. This command helps with architectural decisions, risk assessment, and phased implementation planning.',
      usage: '/strategy <feature name> | <detailed requirements>',
      example: '/strategy Real-time chat system | WebSocket connections, message persistence, user presence, typing indicators, 10k concurrent users',
      parameterMapping: {
        feature: '{{arg1}}',
        requirements: '{{arg2}}',
        codebaseContext: '{{@.}}',
      },
    },
  },

  'review-approach': {
    name: 'review-approach',
    description: 'Review and validate a proposed implementation approach before coding begins',
    promptKey: 'REVIEW_APPROACH',
    model: 'gemini-2.5-flash',
    parameters: {
      proposedApproach: {
        schema: z.string(),
        description: 'The implementation approach or plan to review',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Optional: additional context about the project or requirements',
        required: false,
      },
    },
    command: {
      name: 'review',
      description: 'Get a senior architect\'s perspective on your implementation approach. Describe your planned approach and Gemini will assess strengths, weaknesses, alternatives, and provide a recommendation. Great for validating your design before coding.',
      usage: '/review <detailed implementation approach>',
      example: '/review I plan to use Redux Toolkit with RTK Query for state management, organizing features in slices with normalized data structures for optimal performance',
      parameterMapping: {
        proposedApproach: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'generate-tests': {
    name: 'generate-tests',
    description: 'Generate comprehensive test strategies and plans for components, functions, or features',
    promptKey: 'GENERATE_TESTS',
    model: 'gemini-2.5-pro',
    parameters: {
      description: {
        schema: z.string(),
        description: 'Description of the component, function, or feature to generate tests for',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Optional: additional context about the testing environment or requirements',
        required: false,
      },
    },
    command: {
      name: 'tests',
      description: 'Generate comprehensive test strategies for your components or functions. Provides testing methodology, test cases, edge cases, and quality considerations without writing actual test code.',
      usage: '/tests <component/function description>',
      example: '/tests UserAuthenticationService with login, logout, and password reset methods',
      parameterMapping: {
        description: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'generate-docs': {
    name: 'generate-docs',
    description: 'Create documentation structure and content strategy for APIs, components, or systems',
    promptKey: 'GENERATE_DOCS',
    model: 'gemini-2.5-pro',
    parameters: {
      subject: {
        schema: z.string(),
        description: 'What needs to be documented (API, component, system, etc.)',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Optional: additional context about the audience or documentation requirements',
        required: false,
      },
    },
    command: {
      name: 'docs',
      description: 'Create comprehensive documentation strategies and structures. Provides organization, content areas, writing guidelines, and quality standards without writing actual documentation content.',
      usage: '/docs <what to document>',
      example: '/docs REST API endpoints for user management system',
      parameterMapping: {
        subject: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'debug-assist': {
    name: 'debug-assist',
    description: 'Analyze errors and provide systematic debugging strategies and root cause analysis',
    promptKey: 'DEBUG_ASSIST',
    model: 'gemini-2.5-flash',
    parameters: {
      errorDescription: {
        schema: z.string(),
        description: 'Description of the error, issue, or bug to debug',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Optional: additional context about the system, environment, or error conditions',
        required: false,
      },
    },
    command: {
      name: 'debug',
      description: 'Get systematic debugging assistance for complex issues. Provides root cause analysis, investigation strategies, and resolution approaches without writing debugging code.',
      usage: '/debug <error or issue description>',
      example: '/debug TypeError: Cannot read property \'map\' of undefined in React component during API data rendering',
      parameterMapping: {
        errorDescription: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'explain-concept': {
    name: 'explain-concept',
    description: 'Provide deep explanations of technical concepts, patterns, and technologies',
    promptKey: 'EXPLAIN_CONCEPT',
    model: 'gemini-2.5-pro',
    parameters: {
      concept: {
        schema: z.string(),
        description: 'The technical concept, pattern, or technology to explain',
        required: true,
      },
      context: {
        schema: z.string().optional(),
        description: 'Optional: specific context or use case for the explanation',
        required: false,
      },
    },
    command: {
      name: 'explain',
      description: 'Get comprehensive explanations of technical concepts. Provides definitions, use cases, trade-offs, best practices, and learning paths without code examples.',
      usage: '/explain <technical concept>',
      example: '/explain event loop in Node.js and how it handles asynchronous operations',
      parameterMapping: {
        concept: '{{arg1}}',
        context: '{{@.}}',
      },
    },
  },

  'compare-technologies': {
    name: 'compare-technologies',
    description: 'Compare different technologies, frameworks, or approaches for specific use cases',
    promptKey: 'COMPARE_TECHNOLOGIES',
    model: 'gemini-2.5-pro',
    parameters: {
      comparison: {
        schema: z.string(),
        description: 'Technologies to compare (e.g., "React vs Vue", "PostgreSQL vs MongoDB")',
        required: true,
      },
      useCase: {
        schema: z.string().optional(),
        description: 'Optional: specific use case or context for the comparison',
        required: false,
      },
    },
    command: {
      name: 'compare',
      description: 'Compare technologies, frameworks, or approaches for your specific needs. Provides detailed analysis, pros/cons, use cases, and decision frameworks without implementation details.',
      usage: '/compare <tech1> vs <tech2> [for specific use case]',
      example: '/compare PostgreSQL vs MongoDB for e-commerce platform with complex relationships',
      parameterMapping: {
        comparison: '{{arg1}}',
        useCase: '{{@.}}',
      },
    },
  },
};

// Helper function to get tool by name
export function getTool(name: string): ToolConfig | undefined {
  return TOOLS[name];
}

// Helper function to get all tools
export function getAllTools(): ToolConfig[] {
  return Object.values(TOOLS);
}

// Helper function to build parameter schema for a tool
export function buildParameterSchema(tool: ToolConfig): Record<string, z.ZodTypeAny> {
  const schema: Record<string, z.ZodTypeAny> = {};
  
  for (const [key, param] of Object.entries(tool.parameters)) {
    schema[key] = param.schema;
  }
  
  return schema;
}