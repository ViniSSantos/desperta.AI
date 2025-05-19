import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPagavel {
  id: string;
  email: string;
}

// Estender a interface Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPagavel;
    }
  }
}

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ mensagem: 'Token de autenticação não fornecido' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ mensagem: 'Formato de token inválido' });
      return;
    }

    const segredo = process.env.JWT_SEGREDO || 'segredo_padrao';
    
    const decodificado = jwt.verify(token, segredo) as TokenPagavel;
    req.usuario = decodificado;
    
    next();
  } catch (erro) {
    console.error('Erro ao verificar token:', erro);
    res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};