import { Router } from 'express';
import { HistoricoServico } from '../servicos/historico.servico';

const router = Router();
const historicoServico = new HistoricoServico();

/**
 * @swagger
 * /historicos:
 *   get:
 *     summary: Lista o histórico de ativações de alarme do usuário
 *     tags: [Histórico]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de registros para retornar
 *     responses:
 *       200:
 *         description: Lista de históricos
 *       401:
 *         description: Não autorizado
 */
router.get('/', async (req, res) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    
    const limite = req.query.limite ? parseInt(req.query.limite as string) : 10;
    const historicos = await historicoServico.obterHistoricoPorUsuario(req.usuario.id, limite);
    
    return res.status(200).json(historicos);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

export default router;