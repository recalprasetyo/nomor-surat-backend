import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLetterDto } from './dto/letter.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class LetterService {
  constructor(private prisma: PrismaService) {}

  private getRomanMonth(month: number): string {
    const romanMonths = [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XI',
      'XII',
    ];
    return romanMonths[month - 1];
  }

  async generateLetterNumber(
    userId: string,
    drafterName: string,
    dto: CreateLetterDto,
  ) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = this.getRomanMonth(currentDate.getMonth() + 1);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear + 1, 0, 1);

        const lastLetter = await tx.letterRegister.findFirst({
          where: {
            type: dto.type,
            createdAt: {
              gte: startOfYear,
              lt: endOfYear,
            },
          },
          orderBy: {
            serialNumber: 'desc',
          },
        });

        const newSerialNumber = lastLetter ? lastLetter.serialNumber + 1 : 1;

        const paddedSerialNumber = String(newSerialNumber).padStart(3, '0');

        const referenceNumber = `${paddedSerialNumber}/${dto.code}-20/${currentMonth}/${currentYear}`;

        const newLetter = await tx.letterRegister.create({
          data: {
            serialNumber: newSerialNumber,
            referenceNumber: referenceNumber,
            type: dto.type,
            code: dto.code,
            drafter: drafterName,
            regarding: dto.regarding,
            note: dto.note,
            userId: userId,
          },
        });

        return newLetter;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'A letter with the same reference number already exists.',
          );
        }
      }
      throw new InternalServerErrorException(
        'An error occurred while generating the letter number.',
      );
    }
  }
}
