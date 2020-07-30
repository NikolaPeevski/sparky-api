import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import DateAbstract from '../AbstractEntities/DateAbstract.entity';

@Entity()
export default class OAuthPersonalAccessClients extends DateAbstract {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({})
  clientId: number;
}
