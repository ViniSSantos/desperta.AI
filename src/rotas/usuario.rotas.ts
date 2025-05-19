import { Router } from 'express';
import { UsuarioServico } from '../servicos/usuario.servico';
import { CriarUsuarioDTO, LoginUsuarioDTO } from '../dtos/usuario.dto';
import { validarCorpo } from '../middlewares/validacao.middleware';

const router = Router();
const usuarioServico = new UsuarioServico();

/**
 * @swagger
 * /usuarios/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarUsuarioDTO'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email já em uso
 */
router.post('/registrar', validarCorpo(CriarUsuarioDTO), async (req, res) => {
  try {
    const resultado = await usuarioServico.registrar(req.body);
    return res.status(201).json(resultado);
  } catch (erro: any) {
    if (erro.message.includes('já está em uso')) {
      return res.status(409).json({ mensagem: erro.message });
    } else {
      return res.status(400).json({ mensagem: erro.message });
    }
  }
});

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuarioDTO'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validarCorpo(LoginUsuarioDTO), async (req, res) => {
  try {
    const resultado = await usuarioServico.login(req.body);
    return res.status(200).json(resultado);
  } catch (erro: any) {
    if (erro.message === 'Usuário não encontrado' || erro.message === 'Senha inválida') {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    } else {
      return res.status(400).json({ mensagem: erro.message });
    }
  }
});

export default router;