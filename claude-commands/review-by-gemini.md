# Review Approach

Get a senior developer's perspective on your proposed implementation approach.

## Usage
`/review <implementation approach description>`

## Example
`/review I plan to use Redux for state management with separate slices for user auth, posts, and notifications`

## Command
Use the Gemini MCP to review and validate the implementation approach:

/mcp__gemini-mcp__review-approach proposedApproach="{{arg1}}" context="{{@.}}"