import { Router } from 'express';
import { AlarmeServico } from '../servicos/alarme.servico';
import { CriarAlarmeDTO, AtualizarAlarmeDTO } from '../dtos/alarme.dto';
import { validarCorpo } from '../middlewares/validacao.middleware';

const router = Router();
const alarmeServico = new AlarmeServico();

/**
 * @swagger
 * /alarmes:
 *   post:
 *     summary: Cria um novo alarme para o usuário autenticado
 *     tags: [Alarmes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarAlarmeDTO'
 *     responses:
 *       201:
 *         description: Alarme criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', validarCorpo(CriarAlarmeDTO), async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const alarme = await alarmeServico.criarAlarme(req.usuario.id, req.body);
    return res.status(201).json(alarme);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

/**
 * @swagger
 * /alarmes:
 *   get:
 *     summary: Lista todos os alarmes do usuário autenticado
 *     tags: [Alarmes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alarmes
 *       401:
 *         description: Não autorizado
 */
router.get('/', async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const alarmes = await alarmeServico.listarAlarmes(req.usuario.id);
    return res.status(200).json(alarmes);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

/**
 * @swagger
 * /alarmes/{id}:
 *   get:
 *     summary: Obtém um alarme específico pelo ID
 *     tags: [Alarmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do alarme
 *     responses:
 *       200:
 *         description: Detalhes do alarme
 *       404:
 *         description: Alarme não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const alarme = await alarmeServico.buscarAlarmePorId(req.params.id, req.usuario.id);
    
    if (!alarme) {
      return res.status(404).json({ mensagem: 'Alarme não encontrado' });
    }
    
    return res.status(200).json(alarme);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

/**
 * @swagger
 * /alarmes/{id}:
 *   put:
 *     summary: Atualiza um alarme específico
 *     tags: [Alarmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do alarme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarAlarmeDTO'
 *     responses:
 *       200:
 *         description: Alarme atualizado com sucesso
 *       404:
 *         description: Alarme não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', validarCorpo(AtualizarAlarmeDTO), async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const alarme = await alarmeServico.atualizarAlarme(req.params.id, req.usuario.id, req.body);
    
    if (!alarme) {
      return res.status(404).json({ mensagem: 'Alarme não encontrado' });
    }
    
    return res.status(200).json(alarme);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

/**
 * @swagger
 * /alarmes/{id}:
 *   delete:
 *     summary: Exclui um alarme específico
 *     tags: [Alarmes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do alarme
 *     responses:
 *       200:
 *         description: Alarme excluído com sucesso
 *       404:
 *         description: Alarme não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const resultado = await alarmeServico.excluirAlarme(req.params.id, req.usuario.id);
    
    if (!resultado) {
      return res.status(404).json({ mensagem: 'Alarme não encontrado' });
    }
    
    return res.status(200).json({ mensagem: 'Alarme excluído com sucesso' });
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

export default router;