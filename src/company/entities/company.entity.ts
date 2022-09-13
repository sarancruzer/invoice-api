import { IsEmail } from 'class-validator';
import { RoleEntity } from '../../role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';


@Entity({ name: 'company' })
export class CompanyEntity {

    @PrimaryGeneratedColumn("increment", {name: "id"}) 
    id: number;

    @Column({ type: 'varchar', name: "company_name", length: 25 })
    companyName: string;

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;  
    
    @Column({ type: "varchar", name: "mobile", length: 20})
    mobile: string;  
    
    @OneToMany(() => UserEntity, (user) => user.company)
    user: UserEntity

    @Column({ type: "varchar", name: "address_one" })
    addressOne: string; 

    @Column({ type: "varchar", name: "address_two" })
    addressTwo: string; 

    @Column({ type: "varchar", name: "city" })
    city: string; 

    @Column({ type: "varchar", name: "state" })
    state: string; 

    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number; 

   

      
}
