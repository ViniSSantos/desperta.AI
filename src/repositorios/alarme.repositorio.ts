import { Repository } from 'typeorm';
import { AppDataSource } from '../config/banco-de-dados';
import { Alarme } from '../entidades/alarme.entidade';
import { CriarAlarmeDTO, AtualizarAlarmeDTO } from '../dtos/alarme.dto';

export class AlarmeRepositorio {
  private repo: Repository<Alarme>;

  constructor() {
    this.repo = AppDataSource.getRepository(Alarme);
  }

  async criarAlarme(usuario_id: string, alarmeDTO: CriarAlarmeDTO): Promise<Alarme> {
    const novoAlarme = this.repo.create({
      ...alarmeDTO,
      usuario_id
    });
    
    return this.repo.save(novoAlarme);
  }

  async buscarTodosPorUsuario(usuario_id: string): Promise<Alarme[]> {
    return this.repo.find({ 
      where: { usuario_id },
      order: { horario: 'ASC' }
    });
  }

  async buscarPorId(id: string, usuario_id: string): Promise<Alarme | null> {
    return this.repo.findOne({ 
      where: { id, usuario_id } 
    });
  }

  async atualizarAlarme(id: string, usuario_id: string, alarmeDTO: AtualizarAlarmeDTO): Promise<Alarme | null> {
    const alarme = await this.buscarPorId(id, usuario_id);
    
    if (!alarme) {
      return null;
    }
    
    Object.assign(alarme, alarmeDTO);
    return this.repo.save(alarme);
  }

  async excluirAlarme(id: string, usuario_id: string): Promise<boolean> {
    const resultado = await this.repo.delete({ id, usuario_id });
    return resultado.affected ? resultado.affected > 0 : false;
  }
}