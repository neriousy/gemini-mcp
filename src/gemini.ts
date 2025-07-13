import { exec } from 'child_process';
import { promisify } from 'util';
import { PROMPTS } from './prompts.js';

const execAsync = promisify(exec);

export class GeminiClient {
  private readonly timeout: number;

  constructor(timeout: number = 300000) {
    this.timeout = timeout;
  }

  private async executeCommand(model: string, prompt: string): Promise<string> {
    try {
      const escapedPrompt = this.escapeShellArgument(prompt);
      const command = `gemini -m ${model} -p ${escapedPrompt}`;
      const { stdout, stderr } = await execAsync(command, {
        timeout: this.timeout,
      });

      if (stderr) {
        console.error('Gemini stderr:', stderr);
      }

      return stdout;
    } catch (error) {
      console.error('Error running gemini command:', error);
      throw error;
    }
  }

  private escapeShellArgument(arg: string): string {
    return `'${arg.replace(/'/g, "'\"'\"'")}'`;
  }

  async generatePlan(task: string, context?: string): Promise<string> {
    const prompt = PROMPTS.GENERATE_PLAN.template(task, context);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async query(prompt: string): Promise<string> {
    return this.executeCommand('gemini-2.5-flash', prompt);
  }

  async analyzeCodebase(codebaseInfo: string, task?: string): Promise<string> {
    const prompt = PROMPTS.ANALYZE_CODEBASE.template(codebaseInfo, task);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async strategicPlan(
    feature: string,
    requirements: string,
    codebaseContext?: string
  ): Promise<string> {
    const prompt = PROMPTS.STRATEGIC_PLAN.template(
      feature,
      requirements,
      codebaseContext
    );
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async reviewApproach(
    proposedApproach: string,
    context?: string
  ): Promise<string> {
    const prompt = PROMPTS.REVIEW_APPROACH.template(proposedApproach, context);
    return this.executeCommand('gemini-2.5-flash', prompt);
  }

  async consult(question: string, currentContext?: string): Promise<string> {
    const prompt = PROMPTS.CONSULT.template(question, currentContext);
    return this.executeCommand('gemini-2.5-flash', prompt);
  }

  async generateTests(description: string, context?: string): Promise<string> {
    const prompt = PROMPTS.GENERATE_TESTS.template(description, context);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async generateDocs(subject: string, context?: string): Promise<string> {
    const prompt = PROMPTS.GENERATE_DOCS.template(subject, context);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async debugAssist(
    errorDescription: string,
    context?: string
  ): Promise<string> {
    const prompt = PROMPTS.DEBUG_ASSIST.template(errorDescription, context);
    return this.executeCommand('gemini-2.5-flash', prompt);
  }

  async explainConcept(concept: string, context?: string): Promise<string> {
    const prompt = PROMPTS.EXPLAIN_CONCEPT.template(concept, context);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async compareTechnologies(
    comparison: string,
    useCase?: string
  ): Promise<string> {
    const prompt = PROMPTS.COMPARE_TECHNOLOGIES.template(comparison, useCase);
    return this.executeCommand('gemini-2.5-pro', prompt);
  }
}

// Create a default instance with longer timeout for complex tasks
export const geminiClient = new GeminiClient(600000); // 10 minutes
