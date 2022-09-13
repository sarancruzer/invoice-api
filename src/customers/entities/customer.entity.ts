
import { IsEmail } from 'class-validator';
import { RoleEntity } from '../../role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { CompanyEntity } from 'src/company/entities/company.entity';


@Entity({ name: 'customers' })
export class CustomerEntity {

    @PrimaryGeneratedColumn("increment", {name: "id"}) 
    id: number;

    @Column({ type: 'varchar', name: "customer_name", length: 25 })
    customerName: string;

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;  
    
    @Column({ type: "varchar", name: "mobile", length: 20 })
    mobile: string;  
    
    @ManyToOne(() => CompanyEntity, (company) => company)
    @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
    company: CompanyEntity

    @Column({ type: "varchar", name: "address_one" })
    addressOne: string; 

    @Column({ type: "varchar", name: "address_two", nullable: true })
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
