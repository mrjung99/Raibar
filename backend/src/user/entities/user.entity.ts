import { Profile } from "src/profile/entities/profile.entity"
import { Tweet } from "src/tweet/entities/tweet.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column({
      type: 'varchar',
      nullable: false,
      unique: true
   })
   username: string

   @Column({
      type: 'varchar',
      nullable: false,
      unique: true
   })
   email: string

   @Column({
      type: 'varchar',
      nullable: false
   })
   password: string

   @CreateDateColumn()
   createdAt: Date

   @DeleteDateColumn()
   deletedAt: Date

   @OneToOne(() => Profile, profile => profile.user, { cascade: ['insert'], onDelete: 'CASCADE', eager: true })
   @JoinColumn()
   profile?: Profile

   @OneToMany(() => Tweet, tweet => tweet.user)
   tweets: Tweet[]
}
