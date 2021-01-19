import { Column, BaseEntity } from 'typeorm';

// Since we can't do double extensions
export default abstract class DateAbstract extends BaseEntity {
  @Column()
  createdAtTime: Date;

  @Column()
  updatedAt: Date;
}
