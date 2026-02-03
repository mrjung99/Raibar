import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tweet {
   @PrimaryGeneratedColumn()
   id: number

   @Column({
      type: 'text',
      nullable: false
   })
   text: string

   @CreateDateColumn()
   createdAt: Date

   @DeleteDateColumn()
   deletedAt: Date

   @ManyToOne(() => User, user => user.tweets, { onDelete: 'CASCADE', cascade: true })
   user: User
}
