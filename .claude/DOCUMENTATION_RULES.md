# Documentation Management Rules for Luna Job Project

## 📁 Documentation Storage Location

### MANDATORY RULE
**ALL documentation files MUST be saved in the `/lunadocs` folder**

### Directory Structure
```
/Users/deneb/Desktop/Project/LunaJob/
├── lunadocs/           # ← ALL DOCUMENTATION GOES HERE
│   ├── 1-database-design.md
│   ├── 2-ui-ux-design.md
│   ├── 3-system-architecture.md
│   ├── 4-api-specification.md
│   ├── 5-project-summary.md
│   ├── AI_MCP_INSTRUCTIONS.md
│   ├── LUNAJOB_DEVELOPMENT_GUIDELINES.md
│   ├── MIGRATED_COMPONENTS.md
│   ├── PROJECT_MCP.md
│   └── [any new documentation]
├── luna/               # Application code
├── dev/                # Development resources
└── .mcp.json          # MCP configuration

```

## 🚫 Prohibited Locations

NEVER save documentation in:
- Root directory (`/Users/deneb/Desktop/Project/LunaJob/*.md`)
- Luna directory (`/luna/*.md`)
- Dev directory (`/dev/*.md`)
- Any subdirectory other than `/lunadocs`

## ✅ Documentation Rules

1. **File Creation**: When creating ANY documentation file (.md, .txt, .doc), ALWAYS use:
   ```
   /Users/deneb/Desktop/Project/LunaJob/lunadocs/[filename]
   ```

2. **File Types**: Documentation includes:
   - Project documentation (.md)
   - API specifications
   - Architecture documents
   - Development guidelines
   - Migration guides
   - Setup instructions
   - Meeting notes
   - Planning documents
   - Technical specifications

3. **Naming Convention**:
   - Use descriptive names in UPPERCASE or Title Case
   - Use hyphens for spaces (e.g., `API-SPECIFICATION.md`)
   - Add numbers for sequential docs (e.g., `1-setup.md`, `2-configuration.md`)

4. **File Organization**:
   - Keep related documents together
   - Use consistent naming patterns
   - Add date prefixes for time-sensitive docs (e.g., `2025-09-02-meeting-notes.md`)

## 📝 Examples

### ✅ CORRECT:
```bash
# Creating new documentation
/Users/deneb/Desktop/Project/LunaJob/lunadocs/API-ENDPOINTS.md
/Users/deneb/Desktop/Project/LunaJob/lunadocs/DEPLOYMENT-GUIDE.md
/Users/deneb/Desktop/Project/LunaJob/lunadocs/USER-MANUAL.md
```

### ❌ INCORRECT:
```bash
# Wrong locations
/Users/deneb/Desktop/Project/LunaJob/README.md
/Users/deneb/Desktop/Project/LunaJob/luna/SETUP.md
/Users/deneb/Desktop/Project/LunaJob/docs/guide.md
```

## 🔄 Migration Checklist

When you find documentation outside `/lunadocs`:
1. Move the file to `/lunadocs`
2. Update any references to the old location
3. Delete the file from the old location
4. Verify no broken links

## 🎯 AI Assistant Compliance

As an AI assistant working on this project, you MUST:
1. **ALWAYS** check if creating documentation
2. **ALWAYS** use `/lunadocs` path for documentation
3. **NEVER** create .md files outside `/lunadocs`
4. **REPORT** if you find documentation in wrong locations
5. **MOVE** misplaced documentation to `/lunadocs`

## 📊 Current Documentation Status

### Properly Located in `/lunadocs`:
- ✅ 1-database-design.md
- ✅ 2-ui-ux-design.md
- ✅ 3-system-architecture.md
- ✅ 4-api-specification.md
- ✅ 5-project-summary.md
- ✅ AI_MCP_INSTRUCTIONS.md
- ✅ LUNAJOB_DEVELOPMENT_GUIDELINES.md
- ✅ MIGRATED_COMPONENTS.md
- ✅ PROJECT_MCP.md

### Exception (Application README only):
- `/luna/README.md` - Application-specific README (keep in place)

---

**Last Updated**: 2025-09-02
**Enforcement**: MANDATORY - All AI assistants must follow these rules
**Project**: Luna Job (루나알바)