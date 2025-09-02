# Luna Job MCP Configuration Guide

## 🔧 MCP Configuration Location
**IMPORTANT**: Always load MCP configuration from:
```
/Users/deneb/Desktop/Project/LunaJob/.mcp.json
```

## 📦 Active MCP Servers

### 1. Supabase Luna (`supabase-Luna`)
- **Project Ref**: nnwtdnvdlprolvkzczng
- **Purpose**: Database, auth, storage, edge functions
- **Tools**: list_tables, execute_sql, apply_migration, get_logs, get_advisors

### 2. MUI MCP (`mui-mcp`)
- **Package**: @mui/mcp@latest
- **Purpose**: Material UI documentation and components
- **Tools**: useMuiDocs, fetchDocs

## 🎯 Usage Guidelines

### Database Operations (Supabase)
```sql
-- Always use migrations for schema changes
-- Use execute_sql for queries
-- Check advisors for security/performance
```

### UI Development (MUI)
```typescript
// Check MUI docs first via MCP
// Use existing components from /luna/src/components
// Follow Material Design principles
```

## 📋 Quick Commands

1. **Check database schema**: Use `list_tables` via supabase-Luna
2. **Get MUI component docs**: Use `useMuiDocs` via mui-mcp
3. **Apply migrations**: Use `apply_migration` via supabase-Luna
4. **Check security**: Use `get_advisors` with type="security"

## ⚠️ Critical Rules

1. **ALWAYS** load `.mcp.json` configuration at project start
2. **NEVER** hardcode credentials - use MCP servers
3. **CHECK** existing components before creating new ones
4. **USE** MCP servers for documentation before coding
5. **FOLLOW** established patterns in the codebase

## 🔄 Verification

Test MCP connections:
```bash
npx @modelcontextprotocol/inspector
```

---
**Config File**: `/Users/deneb/Desktop/Project/LunaJob/.mcp.json`
**Last Updated**: 2025-09-02