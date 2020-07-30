import { Column, BaseEntity } from 'typeorm';

// Since we can't do double extensions
export default abstract class DateAbstract extends BaseEntity {
  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
