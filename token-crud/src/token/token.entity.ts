import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  address: string;

  @Column()
  supply: string;

  @Column()
  checksum: string;

  @Column()
  deployerWallet: string;

  @Column()
  deployerInfo: string;

  @Column()
  deployerLabel: string;
}
