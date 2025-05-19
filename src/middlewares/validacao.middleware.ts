import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validarCorpo = (tipo: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const objeto = plainToClass(tipo, req.body);
    const erros = await validate(objeto);

    if (erros.length > 0) {
      const mensagensErro = erros.map(erro => {
        return {
          propriedade: erro.property,
          mensagens: Object.values(erro.constraints || {})
        };
      });

      res.status(400).json({ erros: mensagensErro });
      return;
    }

    next();
  };
};