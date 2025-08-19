import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './students.entity';
import { CreateStudentDto } from './dto/create-students.dto';
import { UpdateStudentDto } from './dto/update-students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.repo.find();
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Student not found');
    Object.assign(found, dto);
    return this.repo.save(found);
  }

  async remove(id: string): Promise<void> {
    const res = await this.repo.delete({ id });
    if (res.affected === 0) throw new NotFoundException('Student not found');
  }
}