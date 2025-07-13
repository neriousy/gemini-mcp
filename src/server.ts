import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { geminiClient } from './gemini.js';
import { getAllTools, buildParameterSchema } from './tools.js';

export const server = new McpServer({
  name: 'gemini',
  version: '0.0.1',
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register all tools dynamically
getAllTools().forEach((tool) => {
  const parameterSchema = buildParameterSchema(tool);
  
  server.tool(
    tool.name,
    tool.description,
    parameterSchema,
    async (params) => {
      try {
        let response: string;
        
        // Route to appropriate gemini method based on tool name
        switch (tool.name) {
          case 'generate-plan':
            response = await geminiClient.generatePlan(
              params.task as string,
              params.context as string | undefined
            );
            break;
            
          case 'gemini-consult':
            response = await geminiClient.consult(
              params.question as string,
              params.currentContext as string | undefined
            );
            break;
            
          case 'analyze-codebase':
            response = await geminiClient.analyzeCodebase(
              params.codebaseInfo as string,
              params.task as string | undefined
            );
            break;
            
          case 'strategic-plan':
            response = await geminiClient.strategicPlan(
              params.feature as string,
              params.requirements as string,
              params.codebaseContext as string | undefined
            );
            break;
            
          case 'review-approach':
            response = await geminiClient.reviewApproach(
              params.proposedApproach as string,
              params.context as string | undefined
            );
            break;
            
          case 'generate-tests':
            response = await geminiClient.generateTests(
              params.description as string,
              params.context as string | undefined
            );
            break;
            
          case 'generate-docs':
            response = await geminiClient.generateDocs(
              params.subject as string,
              params.context as string | undefined
            );
            break;
            
          case 'debug-assist':
            response = await geminiClient.debugAssist(
              params.errorDescription as string,
              params.context as string | undefined
            );
            break;
            
          case 'explain-concept':
            response = await geminiClient.explainConcept(
              params.concept as string,
              params.context as string | undefined
            );
            break;
            
          case 'compare-technologies':
            response = await geminiClient.compareTechnologies(
              params.comparison as string,
              params.useCase as string | undefined
            );
            break;
            
          default:
            throw new Error(`Unknown tool: ${tool.name}`);
        }
        
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
              text: `Error with Gemini ${tool.name}: ${
                error instanceof Error ? error.message : 'Unknown error'
              }`,
            },
          ],
        };
      }
    }
  );
});