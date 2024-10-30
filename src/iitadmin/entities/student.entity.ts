import { BeforeInsert, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string[];

  @Column()
  className: string;

  @Column()
  EntryDate: string;

  @Column()
  FutureYear: string;

  @Column({ default: 'participant' })
  designation: string;

  @Column()
  guardian: string[];

  @Column()
  guardianMail: string[];

  @Column()
  guardianNo: number;

  @Column({ default: 'N/A' })
  tutor: string;

  // @BeforeInsert()
  // setYear(): void {
  //   const currentYear = new Date().getFullYear;
  //   this.year = Number(currentYear);
  // }
}
