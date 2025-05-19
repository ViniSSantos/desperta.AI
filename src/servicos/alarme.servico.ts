import { AlarmeRepositorio } from '../repositorios/alarme.repositorio';
import { CriarAlarmeDTO, AtualizarAlarmeDTO } from '../dtos/alarme.dto';
import { Alarme } from '../entidades/alarme.entidade';

export class AlarmeServico {
  private alarmeRepositorio: AlarmeRepositorio;

  constructor() {
    this.alarmeRepositorio = new AlarmeRepositorio();
  }

  async criarAlarme(usuario_id: string, alarmeDTO: CriarAlarmeDTO): Promise<Alarme> {
    try {
      return await this.alarmeRepositorio.criarAlarme(usuario_id, alarmeDTO);
    } catch (erro) {
      throw erro;
    }
  }

  async listarAlarmes(usuario_id: string): Promise<Alarme[]> {
    try {
      return await this.alarmeRepositorio.buscarTodosPorUsuario(usuario_id);
    } catch (erro) {
      throw erro;
    }
  }

  async buscarAlarmePorId(id: string, usuario_id: string): Promise<Alarme | null> {
    try {
      return await this.alarmeRepositorio.buscarPorId(id, usuario_id);
    } catch (erro) {
      throw erro;
    }
  }

  async atualizarAlarme(id: string, usuario_id: string, alarmeDTO: AtualizarAlarmeDTO): Promise<Alarme | null> {
    try {
      return await this.alarmeRepositorio.atualizarAlarme(id, usuario_id, alarmeDTO);
    } catch (erro) {
      throw erro;
    }
  }

  async excluirAlarme(id: string, usuario_id: string): Promise<boolean> {
    try {
      return await this.alarmeRepositorio.excluirAlarme(id, usuario_id);
    } catch (erro) {
      throw erro;
    }
  }
}