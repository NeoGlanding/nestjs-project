import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client'
import { AuthDTO, SignInDTO } from './dto/authDto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import HTTPException from './HTTPException';

let prisma = new PrismaClient();

@Injectable({})
export class AuthService {

    async getAll() {
        let data = await prisma.user.findMany({
            select: {
                email: true
            }
        });
        return data;
    }

    async signin(dto: SignInDTO) {
        let {email, password} = dto;

        try {
            // Find email
            const user = await prisma.user.findUnique({
                where: {email},
                select: {hash: true, email: true, name: true}
            });

            // IF User Not Found
            if (!user) throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found'
            }, HttpStatus.NOT_FOUND);

            // Compare Hash password
            let hash = await argon.verify(user.hash, dto.password);

            if (!hash) throw HTTPException(401, "Invalid Password")

            // Send back user
            delete user.hash
            return user
        } catch (error) {
            throw error
        }


    }

    async signup(dto: AuthDTO) {
        try {
            let {email, name} = dto;
            // Generate hash password
            let hashedPassword = await argon.hash(dto.password);
            // Save to database
            let user = await prisma.user.create({
                data: {email, name, hash: hashedPassword},
                select: {
                    email: true,
                    name: true
                }
            });
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") throw new ForbiddenException("Credentials Taken")
                else throw error
            }
        }

    }
}
