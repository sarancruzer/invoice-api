import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeUpdate, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity({name: "users"})
export class Users {

    @PrimaryGeneratedColumn("uuid", {name: "id"}) 
    id: string;

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;

    @IsNotEmpty()
    @Column({ type: "text", name: "password" })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    
    // @BeforeUpdate()
    // async hashUpdatePassword() {
    //     this.password = bcrypt.hashSync(this.password, 10);
    // }

    @Column({ type: "varchar", name: "mobile_number", length: 20, nullable: true })
    mobileNumber: string;     
       
    @Column({ type: "integer", name: "google_auth", default: 0 })
    googleAuth: number;

    @Column({ type: "integer", name: "facebook_auth", default: 0 })
    facebookAuth: number;

    @Column({ type: "integer", name: "password_flag", default: 0 })
    passwordFlag: number;

    @Column({ type: "integer", name: "email_verify", default: 0 })
    emailVerify: number;

    @Column({ type: "integer", name: "mobile_verify", default: 0 })
    mobileVerify: number;

    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number;   
}
