import { UserEntity } from '../../users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ nullable: true })
  description?: string

  @Column('text')
  permissions: string

  @OneToMany(() => UserEntity, (users) => users.role)
  user: UserEntity[] 

  @CreateDateColumn()
  createdOn: Date

  @UpdateDateColumn()
  modifiedOn: Date
}
