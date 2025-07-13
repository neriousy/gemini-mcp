# Generate Tests

Generate comprehensive test strategies for your components or functions. Provides testing methodology, test cases, edge cases, and quality considerations without writing actual test code.

## Usage
`/tests <component/function description>`

## Example
`/tests UserAuthenticationService with login, logout, and password reset methods`

## How it works
Generates comprehensive testing strategies including test types, test cases, edge cases, and quality considerations without writing actual test code.

## Command
Use the Gemini MCP server to create testing strategies:

```
/mcp__gemini-mcp__generate-tests description="{{arg1}}" context="{{@.}}"
```

**Guidance**: Focuses on testing strategy and methodology, not actual test code implementation.