import {
  BaseEntity, Entity, Column, OneToOne, PrimaryColumn, JoinColumn,
} from 'typeorm';
import UserEntity from '../ApplicationEntities/User.entity';
import DateExpiresAbstract from '../AbstractEntities/DateExpiresAbstract.entity';

@Entity()
export default class OAuthAccessTokens extends DateExpiresAbstract {
  @PrimaryColumn()
  id: string;

  @OneToOne((type) => UserEntity, (user_id) => user_id.id)
  @JoinColumn()
  user_id: number;

  @Column({})
  client_id: number;

  @Column({})
  name: string;

  @Column({
    default: false,
  })
  revoked: boolean;
}
