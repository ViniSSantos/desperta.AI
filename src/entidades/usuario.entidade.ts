import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Alarme } from './alarme.entidade';
import { Historico } from './historico.entidade';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizado_em: Date;

  @OneToMany(() => Alarme, alarme => alarme.usuario)
  alarmes: Alarme[];

  @OneToMany(() => Historico, historico => historico.usuario)
  historicos: Historico[];
}