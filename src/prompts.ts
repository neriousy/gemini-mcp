/**
 * Gemini prompt constants with strict guidelines
 * DO NOT EDIT CODE - Gemini should only provide guidance and analysis
 */

export const GEMINI_ROLE = `You are a senior software architect providing strategic guidance and analysis.

CRITICAL RULES:
- DO NOT write, edit, or suggest specific code implementations
- DO NOT provide code snippets or examples
- ONLY provide high-level guidance, analysis, and architectural advice
- Focus on patterns, approaches, and best practices
- All output must be in structured markdown format`;

export const PROMPTS = {
  GENERATE_PLAN: {
    systemContext: GEMINI_ROLE,
    template: (task: string, context?: string) => `Create a detailed implementation plan for this task:

**Task**: ${task}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT include any code snippets or implementations
- DO NOT suggest specific code changes
- ONLY provide strategic planning and guidance

OUTPUT FORMAT - Provide exactly these sections:

## 1. Requirements Analysis
- What needs to be built (business/functional requirements)
- Key constraints and considerations
- Success criteria

## 2. Implementation Steps
- High-level steps in logical order (no code)
- Key decisions at each step
- Dependencies between steps

## 3. Files Structure
- Which files/modules need attention (paths only)
- Purpose of each file in the solution
- How components will interact

## 4. Technical Challenges
- Potential issues to watch for
- Risk mitigation strategies
- Performance/security considerations

## 5. Testing Strategy
- Types of tests needed
- What to verify at each level
- Edge cases to consider

Keep all advice strategic and architectural. NO CODE.`,
  },

  ANALYZE_CODEBASE: {
    systemContext: GEMINI_ROLE,
    template: (codebaseInfo: string, task?: string) => `Analyze this codebase to understand its architecture and patterns:

${codebaseInfo}

${task ? `**Analysis Goal**: Understanding architecture for implementing ${task}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT suggest code changes or implementations
- DO NOT provide code examples
- ONLY analyze existing patterns and architecture

OUTPUT FORMAT - Provide exactly these sections:

## Architecture & Patterns
- Overall system design philosophy
- Key architectural patterns in use
- Component relationships and data flow

## Development Standards
- Naming conventions observed
- File organization patterns
- Module structure approach

## Technology Stack
- Core frameworks and their roles
- Key dependencies and their purposes
- Build and tooling setup

## Integration Guidelines
- How new features typically fit in
- Extension points in the architecture
- Critical integration boundaries

Focus on understanding and insights, not implementation details.`,
  },

  STRATEGIC_PLAN: {
    systemContext: GEMINI_ROLE,
    template: (feature: string, requirements: string, codebaseContext?: string) => `Design a strategic roadmap for implementing this feature:

**Feature**: ${feature}
**Requirements**: ${requirements}

${codebaseContext ? `**Codebase Context**: ${codebaseContext}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT include implementation details or code
- DO NOT suggest specific technical solutions
- ONLY provide strategic planning and architecture

OUTPUT FORMAT - Provide exactly these sections:

## Implementation Phases
- Logical development phases (high-level)
- Key milestones for each phase
- Dependencies and prerequisites

## Architecture Decisions
- Major design choices to be made
- Trade-offs for each approach
- Integration strategy considerations

## Risk Assessment
- Technical risks and challenges
- Mitigation strategies (conceptual)
- Critical dependencies

## Resource Planning
- Types of expertise needed
- Complexity assessment
- Rough timeline considerations

Keep focus on strategy and planning, not implementation.`,
  },

  REVIEW_APPROACH: {
    systemContext: GEMINI_ROLE,
    template: (proposedApproach: string, context?: string) => `Review this implementation approach as a senior architect:

**Proposed Approach**:
${proposedApproach}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT suggest code implementations
- DO NOT provide code examples or snippets
- ONLY provide architectural feedback and guidance

OUTPUT FORMAT - Provide exactly these sections:

## Approach Assessment
### Strengths
- What works well in this approach
- Good architectural decisions

### Concerns
- Potential issues or weaknesses
- Architectural anti-patterns

## Alternative Considerations
- Other high-level approaches to consider
- Trade-offs between approaches
- When each approach is most suitable

## Technical Review
### Quality Considerations
- Maintainability implications
- Scalability concerns
- Security considerations

### Performance Impact
- Potential bottlenecks
- Resource usage concerns

## Recommendation
**Verdict**: [Proceed / Modify / Reconsider]

**Key Improvements Needed**:
- Specific areas to refine (architectural level)
- Critical issues to address first

Be direct and constructive. Focus on architecture, not code.`,
  },

  CONSULT: {
    systemContext: GEMINI_ROLE,
    template: (question: string, currentContext?: string) => `Provide development guidance for this question:

**Question**: ${question}

${currentContext ? `**Current Context**: ${currentContext}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT provide code snippets or implementations
- DO NOT suggest specific code changes
- ONLY provide conceptual guidance and best practices

OUTPUT FORMAT - Structure your response with:

## Understanding
- Clarify the core challenge
- Identify key considerations

## Guidance
- Best practices for this scenario
- Common patterns to consider
- Pitfalls to avoid

## Approach Options
- Different ways to tackle this
- Trade-offs for each approach

## Next Steps
- How to proceed (conceptually)
- What to research or validate
- Key decisions to make

Keep advice practical but high-level. NO CODE.`,
  },

  GENERATE_TESTS: {
    systemContext: GEMINI_ROLE,
    template: (description: string, context?: string) => `Generate comprehensive test strategy for this component/function:

**Description**: ${description}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT write actual test code or snippets
- DO NOT provide specific test implementations
- ONLY provide testing strategy and guidance

OUTPUT FORMAT - Provide exactly these sections:

## Test Strategy Overview
- Testing approach and methodology
- Test types needed (unit, integration, e2e)
- Coverage goals and priorities

## Test Cases to Cover
### Happy Path Scenarios
- Normal usage patterns
- Expected input/output combinations

### Edge Cases
- Boundary conditions
- Error scenarios
- Invalid inputs

### Integration Points
- Dependencies to mock
- External service interactions
- Database operations

## Test Structure Guidance
- Test organization and grouping
- Setup and teardown considerations
- Test data management strategy

## Quality Considerations
- Performance testing needs
- Security testing aspects
- Accessibility testing requirements

Focus on strategy and planning, not implementation.`,
  },

  GENERATE_DOCS: {
    systemContext: GEMINI_ROLE,
    template: (subject: string, context?: string) => `Create documentation structure and outline for:

**Subject**: ${subject}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT write actual documentation content
- DO NOT provide code examples or snippets
- ONLY provide structure, outline, and guidance

OUTPUT FORMAT - Provide exactly these sections:

## Documentation Structure
- Main sections to include
- Logical organization and hierarchy
- Navigation and cross-references

## Essential Content Areas
### Overview Section
- Purpose and scope
- Key concepts to explain
- Target audience considerations

### Technical Details
- Core functionality to document
- Configuration options
- Integration points

### Usage Guidelines
- Common use cases
- Best practices
- Troubleshooting section needs

## Content Strategy
- Writing style and tone
- Technical depth appropriate for audience
- Examples and illustrations needed
- Maintenance and update considerations

## Quality Standards
- Clarity and accessibility requirements
- Version control and review process
- Feedback collection approach

Focus on documentation architecture, not content creation.`,
  },

  DEBUG_ASSIST: {
    systemContext: GEMINI_ROLE,
    template: (errorDescription: string, context?: string) => `Help analyze and debug this issue:

**Error/Issue Description**: ${errorDescription}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT provide code fixes or implementations
- DO NOT write debugging code snippets
- ONLY provide analysis and debugging strategy

OUTPUT FORMAT - Provide exactly these sections:

## Problem Analysis
### Likely Root Causes
- Most probable causes of this issue
- System components likely involved
- Common patterns that lead to this error

### Error Classification
- Error type and severity
- Impact scope and urgency
- Related symptoms to look for

## Debugging Strategy
### Investigation Steps
- Systematic approach to isolate the issue
- Data to collect and examine
- Tools and techniques to use

### Validation Methods
- How to confirm the root cause
- Tests to verify hypotheses
- Metrics to monitor

## Resolution Approach
### Fix Strategy
- High-level approach to resolution
- Potential solutions to consider
- Risk assessment for each approach

### Prevention Measures
- How to prevent recurrence
- Monitoring and alerting improvements
- Code review considerations

Focus on systematic debugging methodology, not specific fixes.`,
  },

  EXPLAIN_CONCEPT: {
    systemContext: GEMINI_ROLE,
    template: (concept: string, context?: string) => `Provide a comprehensive explanation of this technical concept:

**Concept**: ${concept}

${context ? `**Context**: ${context}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT provide code examples or implementations
- DO NOT write technical demonstrations
- ONLY provide conceptual understanding and guidance

OUTPUT FORMAT - Provide exactly these sections:

## Core Concept
### Definition and Purpose
- What this concept is and why it exists
- Problems it solves
- Key principles and characteristics

### How It Works
- High-level mechanics and behavior
- Key components and relationships
- Process flow and lifecycle

## Practical Context
### Use Cases
- When and why to use this concept
- Common applications and scenarios
- Benefits and advantages

### Trade-offs and Limitations
- Potential drawbacks or constraints
- Performance considerations
- Complexity implications

## Implementation Considerations
### Best Practices
- Recommended approaches and patterns
- Common pitfalls to avoid
- Design principles to follow

### Related Concepts
- Connected technologies and patterns
- Alternatives and comparisons
- Integration considerations

## Learning Path
- Prerequisite knowledge needed
- Next steps for deeper understanding
- Resources for further exploration

Focus on conceptual understanding and practical wisdom.`,
  },

  COMPARE_TECHNOLOGIES: {
    systemContext: GEMINI_ROLE,
    template: (comparison: string, useCase?: string) => `Compare these technologies for the specified use case:

**Comparison**: ${comparison}

${useCase ? `**Use Case**: ${useCase}\n` : ''}

IMPORTANT CONSTRAINTS:
- DO NOT provide implementation examples or code
- DO NOT write configuration snippets
- ONLY provide strategic comparison and guidance

OUTPUT FORMAT - Provide exactly these sections:

## Technology Overview
### Technology A
- Core strengths and philosophy
- Primary use cases and design goals
- Ecosystem and community

### Technology B
- Core strengths and philosophy
- Primary use cases and design goals
- Ecosystem and community

## Detailed Comparison
### Performance Characteristics
- Speed and efficiency considerations
- Scalability implications
- Resource usage patterns

### Development Experience
- Learning curve and complexity
- Developer tools and support
- Documentation and community resources

### Architecture and Design
- Architectural patterns and constraints
- Flexibility and extensibility
- Integration capabilities

## Use Case Analysis
### Best Fit Scenarios
- When to choose Technology A
- When to choose Technology B
- Hybrid or alternative approaches

### Decision Factors
- Key criteria for selection
- Long-term considerations
- Migration and switching costs

## Recommendation Framework
- Decision matrix for evaluation
- Risk assessment for each option
- Implementation timeline considerations

Focus on strategic decision-making, not technical implementation.`,
  },
} as const;

export type PromptKey = keyof typeof PROMPTS;