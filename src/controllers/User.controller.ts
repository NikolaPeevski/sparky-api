import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller('/users')
@Authorized()
export class UserController {
  @Get()
  @ResponseSchema('string', {
    contentType: 'application/json',
    description: 'A list of created user objects',
    statusCode: '200',
  })
  getAll(): string {
    return 'This action returns all users';
  }

  @Get('/:id')
  getOne(@Param('id') id: number): string {
    return `This action returns user #${id}`;
  }

  @Post()
  post(@Body() user: any): string {
    return 'Saving user...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: any): string {
    return 'Updating a user...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number): string {
    return `Removing user ${id}...`;
  }

  @Get('/:id')
  async getOrCreate(@Param('id') id: number): Promise<void> {
    // const connection = new ConnectionService();
    // await connection.initConnection();
  }
}
