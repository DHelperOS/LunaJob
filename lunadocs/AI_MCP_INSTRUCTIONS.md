# AI MCP Configuration Instructions

## 🎯 Required MCP Services Configuration

This project requires the following MCP (Model Context Protocol) servers to be loaded and available:

### 1. Supabase MCP Server
- **Purpose**: Database operations, migrations, and Supabase-specific functionality
- **Project Reference**: `nnwtdnvdlprolvkzczng`
- **Configuration**: Located in `.mcp.json`

### 2. MUI MCP Server
- **Purpose**: Material UI component documentation and implementation guidance
- **Version**: Latest (@mui/mcp@latest)
- **Configuration**: Located in `.mcp.json`

## 📋 AI Assistant Instructions

When working with this Luna Job project, you MUST:

### 1. Load MCP Configuration
Always load and reference the MCP configuration file located at:
```
/Users/deneb/Desktop/Project/LunaJob/.mcp.json
```

### 2. Available MCP Servers

#### Supabase Luna Server (`supabase-Luna`)
Use this server for:
- Database queries and operations
- Schema migrations
- Authentication setup
- Real-time subscriptions
- Storage operations
- Edge functions

Commands available:
- `list_tables` - List all database tables
- `execute_sql` - Execute SQL queries
- `apply_migration` - Apply database migrations
- `list_migrations` - View migration history
- `get_logs` - Retrieve service logs
- `get_advisors` - Security and performance recommendations

#### MUI MCP Server (`mui-mcp`)
Use this server for:
- Material UI component documentation
- Component implementation examples
- Theme customization guidance
- Best practices for Material UI
- Accessibility guidelines

Commands available:
- `useMuiDocs` - Fetch specific MUI package documentation
- `fetchDocs` - Retrieve additional documentation

### 3. Usage Rules

#### For Supabase Operations:
1. Always check existing tables and schema before creating new ones
2. Use migrations for DDL operations (CREATE, ALTER, DROP)
3. Use execute_sql for DML operations (SELECT, INSERT, UPDATE, DELETE)
4. Review security advisors regularly
5. Never hardcode credentials - use the configured MCP server

#### For MUI Components:
1. When implementing UI components, first check MUI documentation via MCP
2. Follow Material Design principles
3. Use theme-aware styling
4. Ensure accessibility compliance
5. Prefer MUI components over custom implementations

### 4. Project-Specific Context

#### Luna Job Project Structure:
- **Frontend**: Next.js 15 with TypeScript
- **UI Library**: Material UI v7
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT-based with Supabase Auth
- **Styling**: Emotion + MUI theming

#### Key Directories:
- `/luna` - Main application directory
- `/luna/src/components` - Reusable UI components (migrated from next-ts)
- `/luna/src/auth` - Authentication logic
- `/luna/src/layouts` - Layout components
- `/dev/next-ts` - Reference implementation (Minimal Kit)

### 5. Best Practices

1. **Always use MCP servers** when available instead of writing code from scratch
2. **Check existing components** before creating new ones
3. **Follow the established patterns** in the codebase
4. **Use TypeScript** for type safety
5. **Maintain consistency** with existing code style

### 6. Example Usage

```typescript
// When creating a new component:
// 1. First check MUI docs via MCP for best practices
// 2. Look for existing similar components in /luna/src/components
// 3. Follow the pattern established in the codebase

// When working with database:
// 1. Use Supabase MCP to check existing schema
// 2. Create migrations for schema changes
// 3. Use typed queries with TypeScript

// Example workflow:
// User: "Create a new user profile component"
// AI should:
// - Use mui-mcp to get Card, Avatar, Typography docs
// - Check existing components for patterns
// - Use supabase-Luna to understand user data structure
// - Implement following established patterns
```

## 🔄 MCP Server Verification

To verify MCP servers are working:

1. **Test Supabase connection**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```
   Navigate to http://127.0.0.1:6274 and test the connection

2. **Test MUI MCP**:
   Request MUI documentation for a component to verify it's working

## 📝 Notes

- MCP configuration is project-specific and stored in `.mcp.json`
- Credentials are managed through environment variables
- Always use the latest versions of MCP servers
- Report any MCP connection issues immediately

## 🚨 Security

- Never expose Supabase access tokens in code
- Use environment variables for sensitive data
- Follow principle of least privilege for database operations
- Validate all user inputs before database operations

---

**Last Updated**: 2025-09-02
**Configuration File**: `/Users/deneb/Desktop/Project/LunaJob/.mcp.json`
**Project**: Luna Job (루나알바)