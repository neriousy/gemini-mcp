# Review Approach

Get a senior architect's perspective on your implementation approach. Describe your planned approach and Gemini will assess strengths, weaknesses, alternatives, and provide a recommendation. Great for validating your design before coding.

## Usage
`/review <detailed implementation approach>`

## Example
`/review I plan to use Redux Toolkit with RTK Query for state management, organizing features in slices with normalized data structures for optimal performance`

## How it works
Submit your planned approach and get feedback on strengths, weaknesses, alternatives, and a clear recommendation on whether to proceed.

## Command
Use the Gemini MCP server to validate your approach:

```
/mcp__gemini-mcp__review-approach proposedApproach="{{arg1}}" context="{{@.}}"
```

**Best Practice**: Run this before starting implementation to avoid costly refactoring later.