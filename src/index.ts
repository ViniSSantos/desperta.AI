import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { inicializarBancoDeDados } from './config/banco-de-dados';
import { inicializarMongoDB } from './config/mongodb';
import { configurarSwagger } from './config/swagger';
import rotasUsuario from './rotas/usuario.rotas';
import rotasAlarme from './rotas/alarme.rotas';
import rotasDespertar from './rotas/despertar.rotas';
import rotasHistorico from './rotas/historico.rotas';
import { verificarToken } from './middlewares/autenticacao.middleware';

// Carregar variáveis de ambiente
config();

const iniciarServidor = async () => {
  try {
    // Inicializar conexão com PostgreSQL
    await inicializarBancoDeDados();
    console.log('Conexão com PostgreSQL estabelecida com sucesso');

    // Inicializar conexão com MongoDB
    await inicializarMongoDB();
    console.log('Conexão com MongoDB estabelecida com sucesso');

    const app = express();
    const porta = process.env.PORTA || 3000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Configurar Swagger
    configurarSwagger(app);

    // Rotas públicas
    app.use('/api/usuarios', rotasUsuario);
    app.use('/api/despertar', rotasDespertar);

    // Rotas protegidas
    app.use('/api/alarmes', verificarToken, rotasAlarme);
    app.use('/api/historicos', verificarToken, rotasHistorico);

    // Iniciar o servidor
    app.listen(porta, () => {
      console.log(`Servidor Desperta.AI rodando na porta ${porta}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar o servidor:', erro);
    process.exit(1);
  }
};

iniciarServidor();