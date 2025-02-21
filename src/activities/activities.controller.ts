import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {

    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post()
    async create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto)
    }

    @Get()
    async getAll() {
        return this.activitiesService.getAll()
    }

    @Get(':id')
    async getByID(@Param('id') id: string) {
        return this.activitiesService.getById(id)
    }

    @Put()
    async update(@Param('id') id : string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activitiesService.update(id, updateActivityDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.activitiesService.delete(id)
    }

}
