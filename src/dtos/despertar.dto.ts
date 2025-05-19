import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     DespertarDTO:
 *       type: object
 *       required:
 *         - usuario_id
 *       properties:
 *         usuario_id:
 *           type: string
 *           format: uuid
 *           description: ID do usuário que está sendo despertado
 *         latitude:
 *           type: string
 *           description: Latitude para obter o clima local (opcional)
 *         longitude:
 *           type: string
 *           description: Longitude para obter o clima local (opcional)
 */
export class DespertarDTO {
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  @IsUUID('4', { message: 'ID do usuário deve ser um UUID válido' })
  usuario_id: string;

  @IsOptional()
  @IsString({ message: 'Latitude deve ser uma string' })
  latitude?: string;

  @IsOptional()
  @IsString({ message: 'Longitude deve ser uma string' })
  longitude?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RespostaDespertarDTO:
 *       type: object
 *       properties:
 *         hora_local:
 *           type: string
 *           description: Hora local atual
 *         data_local:
 *           type: string
 *           description: Data local atual
 *         clima:
 *           type: object
 *           properties:
 *             temperatura:
 *               type: number
 *               description: Temperatura atual em graus Celsius
 *             condicao:
 *               type: string
 *               description: Condição climática atual
 *             cidade:
 *               type: string
 *               description: Cidade identificada pelas coordenadas
 *         frase_motivacional:
 *           type: string
 *           description: Frase motivacional para o despertar
 */
export class RespostaDespertarDTO {
  hora_local: string;
  data_local: string;
  clima: {
    temperatura: number;
    condicao: string;
    cidade: string;
  };
  frase_motivacional: string;
}