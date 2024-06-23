import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  route: string;

  @Column('int')
  statusCode: number;

  @Column('int')
  responseTime: number; 

  @CreateDateColumn()
  timestamp: Date;
}
