import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceReturnService } from './invoice-return.service';
import { CreateInvoiceReturnDto } from './dto/create-invoice-return.dto';
import { UpdateInvoiceReturnDto } from './dto/update-invoice-return.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invoice-return')
@Controller('invoice-return')
export class InvoiceReturnController {
  constructor(private readonly invoiceReturnService: InvoiceReturnService) {}

  @Post()
  create(@Body() createInvoiceReturnDto: CreateInvoiceReturnDto) {
    return this.invoiceReturnService.create(createInvoiceReturnDto);
  }

  @Get()
  findAll() {
    return this.invoiceReturnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceReturnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceReturnDto: UpdateInvoiceReturnDto) {
    return this.invoiceReturnService.update(+id, updateInvoiceReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceReturnService.remove(+id);
  }
}
