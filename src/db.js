import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'produtosdb',
  password: 'postgres',
  port: 5432
});

pool.query(`
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255),
  preco NUMERIC,
  descricao TEXT
);
`);
