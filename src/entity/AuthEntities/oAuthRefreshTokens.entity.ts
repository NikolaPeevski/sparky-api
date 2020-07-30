import {
  BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, Entity, JoinColumn,
} from 'typeorm';
import OAuthAccessTokens from './oAuthAccessTokens.entity';

@Entity()
export default class OAuthRefreshTokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => OAuthAccessTokens, (accessTokenId) => accessTokenId.id)
  @JoinColumn()
  accessTokenId: string;

  @Column({
    default: false,
    nullable: true,
  })
  revoked: boolean;

  @Column()
  expiresAt: Date;
}
