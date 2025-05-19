import { Repository } from 'typeorm';
import { AppDataSource } from '../config/banco-de-dados';
import { Historico } from '../entidades/historico.entidade';

export class HistoricoRepositorio {
  private repo: Repository<Historico>;

  constructor() {
    this.repo = AppDataSource.getRepository(Historico);
  }

  async registrarAtivacao(
    usuario_id: string, 
    condicao_clima?: string, 
    localizacao?: string, 
    frase_id?: string
  ): Promise<Historico> {
    const novoHistorico = this.repo.create({
      usuario_id,
      data_hora_ativacao: new Date(),
      condicao_clima,
      localizacao,
      frase_id
    });
    
    return this.repo.save(novoHistorico);
  }

  async buscarHistoricoPorUsuario(usuario_id: string, limite: number = 10): Promise<Historico[]> {
    return this.repo.find({ 
      where: { usuario_id },
      order: { data_hora_ativacao: 'DESC' },
      take: limite
    });
  }
}