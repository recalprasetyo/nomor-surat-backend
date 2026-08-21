import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guard/auth.guard';
import { LetterService } from './letter.service';
import { CreateLetterDto } from './dto/letter.dto';
import { GetUser } from 'common/decorators/get.decorator';

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
}
