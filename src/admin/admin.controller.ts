import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private AdminService : AdminService){
        this.AdminService = AdminService ;
    }
    @Get('users/all')
    getallusers(){
        return this.AdminService.getallusers()
    }
}
