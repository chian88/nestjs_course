import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    public getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    public deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    public updateTaskById(
        @Param('id') id: string,
        @Body() updateTaskStatus: UpdateTaskStatusDto
    ): Task {
        const { status } = updateTaskStatus;
        return this.tasksService.updateTaskById(id, status);
    }

    @Post()
    public createTask(
        @Body() createTaskDto: CreateTaskDto
    ) {
        return this.tasksService.createTask(createTaskDto);
    }


}
