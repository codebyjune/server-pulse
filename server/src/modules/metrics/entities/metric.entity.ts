import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Metrics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('real')
  cpu: number;

  @Column('real')
  memory: number;

  @Column('real')
  disk: number;

  @Column('real')
  networkRx: number;

  @Column('real')
  networkTx: number;

  @CreateDateColumn()
  createdAt: Date;
}
