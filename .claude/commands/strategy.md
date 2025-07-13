# Strategic Planning

Create a high-level strategic roadmap for implementing complex features. Use pipe (|) to separate feature name from requirements. This command helps with architectural decisions, risk assessment, and phased implementation planning.

## Usage
`/strategy <feature name> | <detailed requirements>`

## Example
`/strategy Real-time chat system | WebSocket connections, message persistence, user presence, typing indicators, 10k concurrent users`

## How it works
For complex features, this command creates a phased implementation roadmap with architectural decisions, risk assessment, and resource planning.

## Command
Use the Gemini MCP server for strategic planning:

```
/mcp__gemini-mcp__strategic-plan feature="{{arg1}}" requirements="{{arg2}}" codebaseContext="{{@.}}"
```

**Format**: Remember to use the pipe `|` character to separate feature name from requirements.