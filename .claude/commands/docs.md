# Generate Documentation

Create comprehensive documentation strategies and structures. Provides organization, content areas, writing guidelines, and quality standards without writing actual documentation content.

## Usage
`/docs <what to document>`

## Example
`/docs REST API endpoints for user management system`

## How it works
Creates documentation structure and content strategy with organization guidelines, essential sections, and quality standards without writing actual content.

## Command
Use the Gemini MCP server for documentation planning:

```
/mcp__gemini-mcp__generate-docs subject="{{arg1}}" context="{{@.}}"
```

**Focus**: Provides structure and organization, you write the actual content based on the outline.