import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpStatus,
  Req,
  Get,
  Query,
  Patch,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guard/auth.guard';
import { LetterService } from './letter.service';
import { CreateLetterDto } from './dto/letter.dto';
import { GetLetterDto } from './dto/get.dto';
import { GetUser } from 'common/decorators/get.decorator';
import { UpdateLetterDto } from './dto/update.dto';

@Controller('letter')
@UseGuards(JwtAuthGuard)
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post('generate')
  async generateLetterNumber(
    @Body() dto: CreateLetterDto,
    @GetUser('id') userId: string,
    @GetUser('name') drafterName: string,
    @Req() req: Request,
  ): Promise<any> {
    const data = await this.letterService.generateLetterNumber(
      userId,
      drafterName,
      dto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Letter number generated successfully',
      data: data,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }

  @Get()
  async getLetters(
    @Query() filterDto: GetLetterDto,
    @Req() req: Request,
  ): Promise<any> {
    const data = await this.letterService.getLetters(filterDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Letters retrieved successfully',
      data: data,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }

  @Patch(':id')
  async updateLetter(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLetterDto,
    @Req() req: Request,
  ) {
    const data = await this.letterService.updateLetter(id, updateDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Letter updated successfully',
      data: data,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }
}
