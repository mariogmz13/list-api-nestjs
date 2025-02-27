import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
// import { title } from 'process';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('activities')
export class ActivitiesController {

    constructor(private readonly activitiesService: ActivitiesService) { }

    @Post()
    async create(@Body() createActivityDto: CreateActivityDto) {
        console.log(createActivityDto);

        try {
            const activity: CreateActivityDto = {
                title: createActivityDto.title,
                description: createActivityDto.description,
                complete: false,
                updated_at: new Date(),
                created_at: new Date(),
            }

            await this.activitiesService.create(activity)
            return {
                ok: true,
                message: 'Actividad Creada Correctamente'
            }
        } catch (error) {
            return {
                ok: false,
                message: error
            }
        }

    }

    @Get()
    async getAll() {
        
        try {
            return {
                ok: true,
                data: this.activitiesService.getAll()
            }

        } catch (error) {
            return {
                ok: false,
                message: error
            }
        }
    }

    @Get(':id')
    async getByID(@Param('id') id: string) {

        try {
            return {
                ok: true,
                data: this.activitiesService.getById(id)
            }

        } catch (error) {
            return {
                ok: false,
                message: error
            }
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {

        try {
            const activity: UpdateActivityDto = {
                title: updateActivityDto.title,
                description: updateActivityDto.description,
                complete: updateActivityDto.complete,
                updated_at: new Date(),
                created_at: updateActivityDto.created_at
            }
            await this.activitiesService.update(id, activity)

            return {
                ok: true,
                message: 'Actividad Modificada Correctamente'
            }

        } catch (error) {
            return {
                ok: false,
                message: error
            }
        }

        // return this.activitiesService.update(id, updateActivityDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

        try {
            await this.activitiesService.delete(id)
            return {
                ok: true,
                message: 'Actividad Eliminada Correctamente'
            }

        } catch (error) {
            return {
                ok: false,
                message: error
            }

        }

    }

}
