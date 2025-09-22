#!/usr/bin/env node

const https = require('https');

const SUPABASE_URL = 'https://nnwtdnvdlprolvkzczng.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ud3RkbnZkbHByb2x2a3pjem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NDksImV4cCI6MjA3MjM5NTc0OX0.0u7UesxI5mycw2P9_EVARqXlAy-f5qf2WBVCAnYTkok';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ud3RkbnZkbHByb2x2a3pjem5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NDksImV4cCI6MjA3MjM5NTc0OX0.0u7UesxI5mycw2P9_EVARqXlAy-f5qf2WBVCAnYTkok';

const sql = `
-- Enable PostGIS extension if not already enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create area_category enum type if not exists
DO $$ BEGIN
    CREATE TYPE area_category AS ENUM (
        'gangnam', 'gangbuk', 'gangseo', 'gangdong',
        'gyeonggi', 'incheon', 'busan', 'daegu', 'gwangju', 'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create area_groups table
CREATE TABLE IF NOT EXISTS area_groups (
    id SERIAL PRIMARY KEY,
    group_id INTEGER UNIQUE NOT NULL,
    category_id INTEGER NOT NULL,
    category area_category NOT NULL,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    center_point GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_area_groups_group_id ON area_groups(group_id);
CREATE INDEX IF NOT EXISTS idx_area_groups_category_id ON area_groups(category_id);
CREATE INDEX IF NOT EXISTS idx_area_groups_category ON area_groups(category);
CREATE INDEX IF NOT EXISTS idx_area_groups_center_point ON area_groups USING GIST(center_point);
`;

function executeSQL(query) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query });

    const options = {
      hostname: 'nnwtdnvdlprolvkzczng.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/execute_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'return=representation'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204) {
          console.log('✅ SQL executed successfully');
          resolve(responseData);
        } else {
          console.error(`❌ Error: ${res.statusCode} - ${responseData}`);
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🚀 Creating area_groups table...');

  try {
    await executeSQL(sql);
    console.log('✅ Table created successfully!');

    // Now insert data
    const insertSQL = `
INSERT INTO area_groups (group_id, category_id, category, name, short_name, center_point)
VALUES
(1, 1, 'gangnam', '강남·서초', '강남', ST_GeogFromText('POINT(127.0495 37.5172)')),
(2, 1, 'gangnam', '강남역·역삼·삼성', '강남역', ST_GeogFromText('POINT(127.0276 37.4979)')),
(3, 1, 'gangnam', '신사·논현·압구정', '신사', ST_GeogFromText('POINT(127.0232 37.5164)')),
(4, 1, 'gangnam', '청담·삼성', '청담', ST_GeogFromText('POINT(127.0471 37.5194)')),
(5, 1, 'gangnam', '선릉·대치·도곡', '선릉', ST_GeogFromText('POINT(127.0507 37.5045)'))
ON CONFLICT (group_id) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    category = EXCLUDED.category,
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    center_point = EXCLUDED.center_point,
    updated_at = NOW();
    `;

    console.log('🚀 Inserting data...');
    await executeSQL(insertSQL);
    console.log('✅ Data inserted successfully!');

  } catch (error) {
    console.error('Failed to setup area_groups:', error);
    process.exit(1);
  }
}

main();