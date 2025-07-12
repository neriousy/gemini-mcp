# Strategic Planning

Create a high-level strategic roadmap for implementing complex features.

## Usage
`/strategy <feature name> | <requirements>`

## Example
`/strategy Real-time chat system | WebSocket connections, message persistence, user presence, typing indicators`

## Command
Use the Gemini MCP to create a strategic implementation roadmap:

/mcp__gemini-mcp__strategic-plan feature="{{arg1}}" requirements="{{arg2}}" codebaseContext="{{@.}}"