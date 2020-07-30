import {
  BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity, JoinColumn,
} from 'typeorm';
import DateAbstract from '../AbstractEntities/DateAbstract.entity';
import UserEntity from '../ApplicationEntities/User.entity';

@Entity()
export default class OAuthClients extends DateAbstract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => UserEntity, (userId) => userId.id)
  @JoinColumn()
  userId: number;

  @Column()
  name: string;

  @Column()
  secret: string;

  @Column({ nullable: true })
  provider: string;

  @Column()
  redirect: string;

  @Column({ default: true })
  personalAccessClient: boolean;

  @Column({ default: false })
  password_client: boolean;

  @Column({ default: false })
  revoked: boolean;
}
