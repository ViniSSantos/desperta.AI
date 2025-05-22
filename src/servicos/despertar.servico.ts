import axios from 'axios';
import { obterConexaoMongo } from '../config/mongodb';
import { HistoricoRepositorio } from '../repositorios/historico.repositorio';
import { DespertarDTO, RespostaDespertarDTO } from '../dtos/despertar.dto';

export class DespertarServico {
  private historicoRepositorio: HistoricoRepositorio;

  constructor() {
    this.historicoRepositorio = new HistoricoRepositorio();
  }

  async obterInformacoesDespertar(despertarDTO: DespertarDTO): Promise<RespostaDespertarDTO> {
    try {
      // Obter hora e data local
      const agora = new Date();
      const hora_local = agora.toLocaleTimeString('pt-BR');
      const data_local = agora.toLocaleDateString('pt-BR');

      // Obter clima
      let clima = {
        temperatura: 0,
        condicao: 'Não disponível',
        cidade: 'Desconhecida'
      };

      /*
      if (despertarDTO.latitude && despertarDTO.longitude) {
        clima = await this.obterInformacoesClima(despertarDTO.latitude, despertarDTO.longitude);
      }
      */

      let latitude = despertarDTO.latitude;
      let longitude = despertarDTO.longitude;
      if (!latitude || !longitude) {
        try{
          const geolocalizacao = await axios.get('https://ipwho.is/');

          if(geolocalizacao.data.success){
            latitude = geolocalizacao.data.latitude.toString();
            longitude = geolocalizacao.data.longitude.toString();
          }

        } catch(geoError){
          console.warn('⚠️ Não foi possível obter localização via IP. Usando dados padrão.');
        }
      }

      if (latitude && longitude) {
        clima = await this.obterInformacoesClima(latitude, longitude);
      }

      // Obter frase motivacional
      const frase = await this.obterFraseMotivacional();

      // Registrar ativação no histórico
      const localizacao = despertarDTO.latitude && despertarDTO.longitude 
        ? `${despertarDTO.latitude},${despertarDTO.longitude}` 
        : undefined;

      await this.historicoRepositorio.registrarAtivacao(
        despertarDTO.usuario_id,
        clima.condicao,
        localizacao,
        frase.id
      );

      // Registrar log de acesso no MongoDB
      await this.registrarLogAcesso(despertarDTO.usuario_id);

      return {
        hora_local,
        data_local,
        clima,
        frase_motivacional: frase.texto
      };
    } catch (erro) {
      console.error('Erro ao obter informações de despertar:', erro);
      throw new Error('Falha ao obter informações de despertar');
    }
  }

  private async obterInformacoesClima(latitude: string, longitude: string): Promise<any> {
    try {
      const apiKey = process.env.CLIMA_API_CHAVE;
      const apiUrl = process.env.CLIMA_API_URL || 'https://api.openweathermap.org/data/2.5/weather';
      
      if (!apiKey) {
        // Retornar dados simulados se a chave da API não estiver configurada
        return {
          temperatura: Math.floor(Math.random() * 15) + 15, // Temperatura entre 15 e 30
          condicao: 'Parcialmente Nublado',
          cidade: 'São Paulo'
        };
      }

      const resposta = await axios.get(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`);
      
      return {
        temperatura: Math.round(resposta.data.main.temp),
        condicao: resposta.data.weather[0].description,
        cidade: resposta.data.name
      };
    } catch (erro) {
      console.error('Erro ao obter clima:', erro);
      return {
        temperatura: 22,
        condicao: 'Informação não disponível',
        cidade: 'Desconhecida'
      };
    }
  }

  private async obterFraseMotivacional(): Promise<{ id: string; texto: string }> {
    try {
      const conexao = obterConexaoMongo();
      const db = conexao.db();
      const colecao = db.collection('frases_motivacionais');
      
      // Contar o número total de documentos
      const totalFrases = await colecao.countDocuments();
      
      // Selecionar uma frase aleatória
      const indiceAleatorio = Math.floor(Math.random() * totalFrases);
      const frase = await colecao.find().skip(indiceAleatorio).limit(1).toArray();
      
      if (frase.length === 0) {
        return {
          id: 'padrao',
          texto: 'Cada dia é uma nova oportunidade para mudar sua vida.'
        };
      }
      
      return {
        id: frase[0]._id.toString(),
        texto: frase[0].texto
      };
    } catch (erro) {
      console.error('Erro ao obter frase motivacional:', erro);
      return {
        id: 'erro',
        texto: 'A persistência é o caminho do êxito.'
      };
    }
  }

  private async registrarLogAcesso(usuario_id: string): Promise<void> {
    try {
      const conexao = obterConexaoMongo();
      const db = conexao.db();
      const colecao = db.collection('logs_acesso');
      
      await colecao.insertOne({
        usuario_id,
        data_hora: new Date(),
        tipo: 'despertar'
      });
    } catch (erro) {
      console.error('Erro ao registrar log de acesso:', erro);
    }
  }
}