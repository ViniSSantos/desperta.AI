import { UsuarioServico } from '../../servicos/usuario.servico';
import { UsuarioRepositorio } from '../../repositorios/usuario.repositorio';

// Mock do repositório de usuário
jest.mock('../../repositorios/usuario.repositorio');

describe('UsuarioServico', () => {
  let usuarioServico: UsuarioServico;
  let mockUsuarioRepositorio: jest.Mocked<UsuarioRepositorio>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsuarioRepositorio = new UsuarioRepositorio() as jest.Mocked<UsuarioRepositorio>;
    usuarioServico = new UsuarioServico();
  });

  describe('registrar', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      // Configurar o mock
      const usuarioMock = {
        id: '123',
        nome: 'Teste',
        email: 'teste@exemplo.com',
        senha: 'senhahash',
        ativo: true,
        criado_em: new Date(),
        atualizado_em: new Date()
      };

      mockUsuarioRepositorio.criarUsuario = jest.fn().mockResolvedValue(usuarioMock);
      (UsuarioRepositorio as jest.Mock).mockImplementation(() => mockUsuarioRepositorio);

      // Executar o método
      const resultado = await usuarioServico.registrar({
        nome: 'Teste',
        email: 'teste@exemplo.com',
        senha: 'senha123'
      });

      // Verificar o resultado
      expect(resultado).toHaveProperty('usuario');
      expect(resultado).toHaveProperty('token');
      expect(resultado.usuario).not.toHaveProperty('senha');
    });

    it('deve lançar erro se o email já estiver em uso', async () => {
      // Configurar o mock para lançar um erro
      mockUsuarioRepositorio.criarUsuario = jest.fn().mockRejectedValue(new Error('Email já está em uso'));
      (UsuarioRepositorio as jest.Mock).mockImplementation(() => mockUsuarioRepositorio);

      // Verificar se o erro é lançado
      await expect(usuarioServico.registrar({
        nome: 'Teste',
        email: 'teste@exemplo.com',
        senha: 'senha123'
      })).rejects.toThrow('Email já está em uso');
    });
  });

  describe('login', () => {
    it('deve autenticar um usuário com sucesso', async () => {
      // Configurar o mock
      const usuarioMock = {
        id: '123',
        nome: 'Teste',
        email: 'teste@exemplo.com',
        senha: 'senhahash',
        ativo: true,
        criado_em: new Date(),
        atualizado_em: new Date()
      };

      mockUsuarioRepositorio.buscarPorEmail = jest.fn().mockResolvedValue(usuarioMock);
      mockUsuarioRepositorio.verificarSenha = jest.fn().mockResolvedValue(true);
      (UsuarioRepositorio as jest.Mock).mockImplementation(() => mockUsuarioRepositorio);

      // Executar o método
      const resultado = await usuarioServico.login({
        email: 'teste@exemplo.com',
        senha: 'senha123'
      });

      // Verificar o resultado
      expect(resultado).toHaveProperty('usuario');
      expect(resultado).toHaveProperty('token');
      expect(resultado.usuario).not.toHaveProperty('senha');
    });

    it('deve lançar erro se o usuário não for encontrado', async () => {
      // Configurar o mock para retornar null (usuário não encontrado)
      mockUsuarioRepositorio.buscarPorEmail = jest.fn().mockResolvedValue(null);
      (UsuarioRepositorio as jest.Mock).mockImplementation(() => mockUsuarioRepositorio);

      // Verificar se o erro é lançado
      await expect(usuarioServico.login({
        email: 'inexistente@exemplo.com',
        senha: 'senha123'
      })).rejects.toThrow('Usuário não encontrado');
    });

    it('deve lançar erro se a senha for inválida', async () => {
      // Configurar o mock
      const usuarioMock = {
        id: '123',
        nome: 'Teste',
        email: 'teste@exemplo.com',
        senha: 'senhahash',
        ativo: true,
        criado_em: new Date(),
        atualizado_em: new Date()
      };

      mockUsuarioRepositorio.buscarPorEmail = jest.fn().mockResolvedValue(usuarioMock);
      mockUsuarioRepositorio.verificarSenha = jest.fn().mockResolvedValue(false);
      (UsuarioRepositorio as jest.Mock).mockImplementation(() => mockUsuarioRepositorio);

      // Verificar se o erro é lançado
      await expect(usuarioServico.login({
        email: 'teste@exemplo.com',
        senha: 'senhaerrada'
      })).rejects.toThrow('Senha inválida');
    });
  });
});