const { Client } = require('@modelcontextprotocol/sdk');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/transport/stdio.js');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function executeSQLViaMCP() {
  // SQL 파일 읽기
  const sqlContent = fs.readFileSync(
    path.join(__dirname, '../sql/setup_area_groups_complete.sql'),
    'utf-8'
  );

  // MCP 서버 프로세스 생성
  const proc = spawn('npx', [
    '-y',
    '@supabase/mcp-server-supabase@latest',
    '--project-ref=nnwtdnvdlprolvkzczng'
  ], {
    env: {
      ...process.env,
      SUPABASE_ACCESS_TOKEN: 'sbp_f18bef24edbdb4b152d57b2927c35276099c710d'
    }
  });

  const transport = new StdioClientTransport({
    command: proc,
    args: []
  });

  const client = new Client({
    name: 'sql-executor',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    // 연결
    await client.connect(transport);
    console.log('✅ MCP 서버에 연결됨');

    // SQL 실행 도구 호출
    const result = await client.callTool('execute_sql', {
      query: sqlContent
    });

    console.log('✅ SQL 실행 완료:', result);
  } catch (error) {
    console.error('❌ 오류:', error);
  } finally {
    await client.close();
  }
}

executeSQLViaMCP();