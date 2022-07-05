import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy{

    constructor(){
        super({
           datasources : {
            db : {
                url : "postgresql://postgres:mianderson@localhost:5433/nest-prisma?schema=public"
            }
           }
        }
        )
    }

    onModuleInit() {
        this.$connect()
    }

    onModuleDestroy() {
        this.$disconnect()
    }
}
