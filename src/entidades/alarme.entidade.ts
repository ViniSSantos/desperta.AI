import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './usuario.entidade';

@Entity('alarmes')
export class Alarme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuario_id: string;

  @ManyToOne(() => Usuario, usuario => usuario.alarmes)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'time' })
  horario: string;

  @Column({ type: 'simple-array', name: 'dias_da_semana' })
  dias_da_semana: number[];

  @Column({ default: true })
  recorrente: boolean;

  @Column({ default: true })
  ativo: boolean;

  @Column({ nullable: true })
  descricao: string;

  @CreateDateColumn({ name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizado_em: Date;
}