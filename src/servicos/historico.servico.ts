import { HistoricoRepositorio } from '../repositorios/historico.repositorio';
import { Historico } from '../entidades/historico.entidade';

export class HistoricoServico {
  private historicoRepositorio: HistoricoRepositorio;

  constructor() {
    this.historicoRepositorio = new HistoricoRepositorio();
  }

  async obterHistoricoPorUsuario(usuario_id: string, limite: number = 10): Promise<Historico[]> {
    try {
      return await this.historicoRepositorio.buscarHistoricoPorUsuario(usuario_id, limite);
    } catch (erro) {
      throw erro;
    }
  }
}