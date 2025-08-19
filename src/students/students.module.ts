import { Module } from '@nestjs/common';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
