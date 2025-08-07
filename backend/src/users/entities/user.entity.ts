import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  //Basically our User Table
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
