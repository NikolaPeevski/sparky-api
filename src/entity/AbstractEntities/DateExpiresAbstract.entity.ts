import { Column } from 'typeorm';
import DateAbstract from './DateAbstract.entity';

export default class DateExpiresAbstract extends DateAbstract {
  @Column()
  expires_at: Date;
}
