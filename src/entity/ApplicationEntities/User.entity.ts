import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Column, BeforeInsert,
} from 'typeorm';

import bcrypt from 'bcrypt';

import UserModel from '../../models/User.model';

@Entity({
  name: 'User',
})
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  username: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({
    nullable: true,
  })
  location: string;

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // async comparePassword(attempt: string): Promise<boolean> {
  //   return await bcrypt.compare(attempt, this.password);
  // }

  toResponseObject(showToken: boolean = true): UserModel {
    const {
      id, firstName, lastName, username,
    } = this;
    const responseObject: UserModel = {
      id,
      firstName,
      lastName,
      username,
    };
    return responseObject;
  }
}
