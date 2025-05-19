import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/desperta_ai';
const cliente = new MongoClient(uri);

let conexaoMongo: MongoClient;

export const inicializarMongoDB = async (): Promise<void> => {
  try {
    conexaoMongo = await cliente.connect();
    console.log('Conexão com MongoDB estabelecida com sucesso');
    
    // Criar coleção de frases motivacionais se não existir
    const bd = conexaoMongo.db();
    const colecoes = await bd.listCollections({ name: 'frases_motivacionais' }).toArray();
    
    if (colecoes.length === 0) {
      await bd.createCollection('frases_motivacionais');
      
      // Inserir algumas frases motivacionais de exemplo
      await bd.collection('frases_motivacionais').insertMany([
        { texto: 'Cada dia é uma nova oportunidade para mudar sua vida.' },
        { texto: 'Não conte os dias, faça os dias contarem.' },
        { texto: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.' },
        { texto: 'A persistência realiza o impossível.' },
        { texto: 'Acredite em você mesmo e tudo será possível.' }
      ]);
    }
    
    // Criar coleção de logs de acesso se não existir
    const colecoesLogs = await bd.listCollections({ name: 'logs_acesso' }).toArray();
    if (colecoesLogs.length === 0) {
      await bd.createCollection('logs_acesso');
    }
    
  } catch (erro) {
    console.error('Erro ao conectar ao MongoDB:', erro);
    throw erro;
  }
};

export const obterConexaoMongo = (): MongoClient => {
  if (!conexaoMongo) {
    throw new Error('Conexão com MongoDB não foi inicializada');
  }
  return conexaoMongo;
};