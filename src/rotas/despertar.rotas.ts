import { Router } from 'express';
import { DespertarServico } from '../servicos/despertar.servico';
import { DespertarDTO } from '../dtos/despertar.dto';
import { validarCorpo } from '../middlewares/validacao.middleware';

const router = Router();
const despertarServico = new DespertarServico();

/**
 * @swagger
 * /despertar:
 *   post:
 *     summary: Obtém informações personalizadas para o despertar (hora, clima, frase motivacional)
 *     tags: [Despertar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DespertarDTO'
 *     responses:
 *       200:
 *         description: Informações de despertar obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RespostaDespertarDTO'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validarCorpo(DespertarDTO), async (req, res) => {
  try {
    const informacoes = await despertarServico.obterInformacoesDespertar(req.body);
    return res.status(200).json(informacoes);
  } catch (erro: any) {
    return res.status(400).json({ mensagem: erro.message });
  }
});

export default router;