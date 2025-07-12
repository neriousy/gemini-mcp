import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GeminiClient {
  private readonly timeout: number;

  constructor(timeout: number = 300000) { // 5 minutes default
    this.timeout = timeout;
  }

  private async executeCommand(model: string, prompt: string): Promise<string> {
    try {
      const escapedPrompt = this.escapeShellArgument(prompt);
      const command = `gemini -m ${model} -p ${escapedPrompt}`;
      const { stdout, stderr } = await execAsync(command, { timeout: this.timeout });

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
    const prompt = `Create a detailed implementation plan for this task:

**Task**: ${task}

${context ? `**Context**: ${context}\n` : ''}

Provide:
1. **Requirements Analysis** - What needs to be built
2. **Implementation Steps** - Specific actions in order
3. **Files to Modify/Create** - Exact file paths and purposes
4. **Technical Challenges** - Potential issues and solutions
5. **Testing Strategy** - How to verify the implementation

Keep steps actionable and specific.`;

    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async query(prompt: string): Promise<string> {
    return this.executeCommand('gemini-2.5-flash', prompt);
  }

  async analyzeCodebase(codebaseInfo: string, task?: string): Promise<string> {
    const prompt = `Analyze this codebase to understand its architecture and patterns:

${codebaseInfo}

${task ? `**Analysis Goal**: Understanding for implementing ${task}\n` : ''}

Provide architectural insights:

**Architecture & Patterns**
- Overall system design and key architectural patterns
- Data flow and component relationships

**Development Standards**  
- Code style conventions and naming patterns
- File organization and module structure

**Technology Stack**
- Core frameworks, libraries, and dependencies
- Build tools and development workflow

**Integration Guidelines**
- How new features fit into existing architecture
- Common patterns for extending functionality
- Critical files and entry points

Focus on actionable insights for development decisions.`;

    return this.executeCommand('gemini-2.5-pro', prompt);
  }

  async strategicPlan(feature: string, requirements: string, codebaseContext?: string): Promise<string> {
    const prompt = `Design a strategic roadmap for implementing this feature:

**Feature**: ${feature}
**Requirements**: ${requirements}

${codebaseContext ? `**Codebase Context**: ${codebaseContext}\n` : ''}

Create a high-level strategy:

**Implementation Phases**
- Break down into logical development phases
- Define clear milestones and deliverables

**Architecture Decisions**  
- Key design choices and trade-offs
- Integration strategy with existing systems

**Risk Assessment**
- Technical risks and mitigation approaches
- Dependencies that could impact delivery

**Resource Planning**
- Skills and expertise required
- Estimated complexity and timeline

Focus on strategic decisions, not implementation details.`;

    return this.executeCommand('gemini-2.5-pro', prompt);
  }


  async reviewApproach(proposedApproach: string, context?: string): Promise<string> {
    const prompt = `Review this implementation approach as a senior developer:

**Proposed Approach**:
${proposedApproach}

${context ? `**Context**: ${context}\n` : ''}

Provide a structured evaluation:

**Approach Assessment**
- Strengths of the proposed solution
- Potential weaknesses or concerns

**Alternative Considerations**
- Other approaches worth exploring
- Trade-offs between different solutions

**Technical Review**
- Code quality and maintainability concerns
- Performance and scalability implications
- Security considerations

**Recommendation**
- Overall verdict: Proceed / Modify / Reconsider
- Specific improvements or changes needed

Be direct and actionable in your feedback.`;

    return this.executeCommand('gemini-2.5-flash', prompt);
  }
}

// Create a default instance with longer timeout for complex tasks
export const geminiClient = new GeminiClient(600000); // 10 minutes
