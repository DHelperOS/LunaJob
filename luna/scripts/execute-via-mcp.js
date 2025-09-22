#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const SQL_FILE = path.join(__dirname, '../sql/setup_area_groups_complete.sql');
const sqlContent = fs.readFileSync(SQL_FILE, 'utf-8');

// MCP server 실행
const mcp = spawn('npx', [
  '-y',
  '@supabase/mcp-server-supabase@latest',
  '--project-ref=nnwtdnvdlprolvkzczng'
], {
  env: {
    ...process.env,
    SUPABASE_ACCESS_TOKEN: 'sbp_f18bef24edbdb4b152d57b2927c35276099c710d'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

// SQL 실행 요청 전송
const request = {
  jsonrpc: '2.0',
  method: 'tools/call',
  params: {
    name: 'execute_sql',
    arguments: {
      sql: sqlContent
    }
  },
  id: 1
};

mcp.stdin.write(JSON.stringify(request) + '\n');

let output = '';

mcp.stdout.on('data', (data) => {
  output += data.toString();
  console.log('Response:', data.toString());
});

mcp.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

mcp.on('close', (code) => {
  console.log('MCP server exited with code:', code);
  process.exit(code);
});

setTimeout(() => {
  console.log('Timeout reached, closing...');
  mcp.kill();
}, 10000);