import { Repository } from 'typeorm';
import { AppDataSource } from '../config/banco-de-dados';
import { Usuario } from '../entidades/usuario.entidade';
import { CriarUsuarioDTO } from '../dtos/usuario.dto';
import * as bcrypt from 'bcryptjs';

export class UsuarioRepositorio {
  private repo: Repository<Usuario>;

  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  async criarUsuario(usuarioDTO: CriarUsuarioDTO): Promise<Usuario> {
    // Verificar se o email já existe
    const usuarioExistente = await this.repo.findOne({ where: { email: usuarioDTO.email } });
    
    if (usuarioExistente) {
      throw new Error('Email já está em uso');
    }

    // Criptografar a senha
    const hashSenha = await bcrypt.hash(usuarioDTO.senha, 10);
    
    // Criar o novo usuário
    const novoUsuario = this.repo.create({
      ...usuarioDTO,
      senha: hashSenha
    });
    
    return this.repo.save(novoUsuario);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { id } });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.repo.findOne({ where: { email } });
  }

  async verificarSenha(usuario: Usuario, senha: string): Promise<boolean> {
    return bcrypt.compare(senha, usuario.senha);
  }
}