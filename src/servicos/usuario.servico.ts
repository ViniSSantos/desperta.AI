import jwt from 'jsonwebtoken';
import { UsuarioRepositorio } from '../repositorios/usuario.repositorio';
import { CriarUsuarioDTO, LoginUsuarioDTO } from '../dtos/usuario.dto';
import { Usuario } from '../entidades/usuario.entidade';

export class UsuarioServico {
  private usuarioRepositorio: UsuarioRepositorio;

  constructor() {
    this.usuarioRepositorio = new UsuarioRepositorio();
  }

  async registrar(usuarioDTO: CriarUsuarioDTO): Promise<{ usuario: Partial<Usuario>, token: string }> {
    try {
      const usuario = await this.usuarioRepositorio.criarUsuario(usuarioDTO);
      const token = this.gerarToken(usuario);
      const { senha, ...usuarioSemSenha } = usuario;
      return { usuario: usuarioSemSenha, token };
    } catch (erro) {
      throw erro;
    }
  }

  async login(loginDTO: LoginUsuarioDTO): Promise<{ usuario: Partial<Usuario>, token: string }> {
    try {
      const usuario = await this.usuarioRepositorio.buscarPorEmail(loginDTO.email);

      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      const senhaValida = await this.usuarioRepositorio.verificarSenha(usuario, loginDTO.senha);

      if (!senhaValida) {
        throw new Error('Senha inválida');
      }

      const token = this.gerarToken(usuario);
      const { senha, ...usuarioSemSenha } = usuario;
      return { usuario: usuarioSemSenha, token };
    } catch (erro) {
      throw erro;
    }
  }

  private gerarToken(usuario: Usuario): string {
    const payload = {
      id: usuario.id,
      email: usuario.email
    };

    const segredo = process.env.JWT_SEGREDO;
    if (!segredo) {
      throw new Error('JWT_SEGREDO não configurado');
    }

    const expiracao = process.env.JWT_EXPIRACAO || '1d';

    // Solução definitiva para resolver o overload bugado do jwt.sign
    return (jwt as any).sign(payload, segredo, { expiresIn: expiracao });
  }
}
