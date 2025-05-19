import { IsNotEmpty, IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CriarAlarmeDTO:
 *       type: object
 *       required:
 *         - horario
 *         - dias_da_semana
 *       properties:
 *         horario:
 *           type: string
 *           format: time
 *           example: "07:30"
 *           description: Horário do alarme no formato HH:MM
 *         dias_da_semana:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 2, 3, 4, 5]
 *           description: Dias da semana (1-7, onde 1 é segunda-feira)
 *         recorrente:
 *           type: boolean
 *           default: true
 *           description: Se o alarme é recorrente ou não
 *         descricao:
 *           type: string
 *           description: Descrição opcional do alarme
 */
export class CriarAlarmeDTO {
  @IsNotEmpty({ message: 'Horário é obrigatório' })
  @IsString({ message: 'Horário deve ser uma string no formato HH:MM' })
  horario: string;

  @IsNotEmpty({ message: 'Dias da semana são obrigatórios' })
  @IsArray({ message: 'Dias da semana devem ser um array' })
  dias_da_semana: number[];

  @IsOptional()
  @IsBoolean({ message: 'Recorrente deve ser um booleano' })
  recorrente?: boolean;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AtualizarAlarmeDTO:
 *       type: object
 *       properties:
 *         horario:
 *           type: string
 *           format: time
 *           example: "06:45"
 *           description: Horário do alarme no formato HH:MM
 *         dias_da_semana:
 *           type: array
 *           items:
 *             type: number
 *           example: [1, 3, 5]
 *           description: Dias da semana (1-7, onde 1 é segunda-feira)
 *         recorrente:
 *           type: boolean
 *           description: Se o alarme é recorrente ou não
 *         ativo:
 *           type: boolean
 *           description: Se o alarme está ativo ou não
 *         descricao:
 *           type: string
 *           description: Descrição opcional do alarme
 */
export class AtualizarAlarmeDTO {
  @IsOptional()
  @IsString({ message: 'Horário deve ser uma string no formato HH:MM' })
  horario?: string;

  @IsOptional()
  @IsArray({ message: 'Dias da semana devem ser um array' })
  dias_da_semana?: number[];

  @IsOptional()
  @IsBoolean({ message: 'Recorrente deve ser um booleano' })
  recorrente?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um booleano' })
  ativo?: boolean;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  descricao?: string;
}