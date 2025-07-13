# Debug Assistance

Get systematic debugging assistance for complex issues. Provides root cause analysis, investigation strategies, and resolution approaches without writing debugging code.

## Usage
`/debug <error or issue description>`

## Example
`/debug TypeError: Cannot read property 'map' of undefined in React component during API data rendering`

## How it works
Analyzes errors and provides systematic debugging approach with root cause analysis, investigation steps, and resolution strategies.

## Command
Use the Gemini MCP server for debugging assistance:

```
/mcp__gemini-mcp__debug-assist errorDescription="{{arg1}}" context="{{@.}}"
```

**Approach**: Systematic debugging methodology to isolate and resolve issues effectively.