import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsDateString, IsDefined } from "class-validator";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDefined()
  firstName: string;

  @Column()
  @IsDefined()
  lastName: string;

  @Column()
  @IsEmail()
  @IsDefined()
  email: string;

  @Column()
  @IsDateString()
  @IsDefined()
  date: Date;
}
