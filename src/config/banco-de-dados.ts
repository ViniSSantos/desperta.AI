import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Usuario } from '../entidades/usuario.entidade';
import { Alarme } from '../entidades/alarme.entidade';
import { Historico } from '../entidades/historico.entidade';

config();

// Carregar variáveis do PostgreSQL local
const host = process.env.POSTGRES_HOST || 'localhost';
const port = parseInt(process.env.POSTGRES_PORTA || '5432');
const username = process.env.POSTGRES_USUARIO || 'desperta';
const password = process.env.POSTGRES_SENHA || 'senha_segura';
const database = process.env.POSTGRES_BD || 'desperta_ai';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: process.env.NODE_ENV !== 'producao',
  logging: process.env.NODE_ENV === 'desenvolvimento',
  entities: [Usuario, Alarme, Historico],
  migrations: ['src/migrations/*.ts'],
});

export const inicializarBancoDeDados = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conexão com PostgreSQL (Docker) estabelecida com sucesso');
  } catch (erro) {
    console.error('❌ Erro ao conectar no PostgreSQL Docker:', { host, username, database });
    console.error(erro);
    throw erro;
  }
};
