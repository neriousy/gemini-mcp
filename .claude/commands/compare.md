# Compare Technologies

Compare technologies, frameworks, or approaches for your specific needs. Provides detailed analysis, pros/cons, use cases, and decision frameworks without implementation details.

## Usage
`/compare <tech1> vs <tech2> [for specific use case]`

## Example
`/compare PostgreSQL vs MongoDB for e-commerce platform with complex relationships`

## How it works
Compares technologies with detailed analysis of strengths, weaknesses, use cases, and decision frameworks to help you choose the right tool.

## Command
Use the Gemini MCP server to compare technologies:

```
/mcp__gemini-mcp__compare-technologies comparison="{{arg1}}" useCase="{{@.}}"
```

**Decision**: Helps evaluate options objectively with pros, cons, and specific use case analysis.