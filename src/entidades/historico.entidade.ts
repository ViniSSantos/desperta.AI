import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entidade';

@Entity('historicos')
export class Historico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuario_id: string;

  @ManyToOne(() => Usuario, usuario => usuario.historicos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'data_hora_ativacao', type: 'timestamp' })
  data_hora_ativacao: Date;

  @Column({ nullable: true })
  localizacao: string;

  @Column({ nullable: true, name: 'condicao_clima' })
  condicao_clima: string;

  @Column({ nullable: true, name: 'frase_id' })
  frase_id: string;

  @CreateDateColumn({ name: 'registrado_em' })
  registrado_em: Date;
}