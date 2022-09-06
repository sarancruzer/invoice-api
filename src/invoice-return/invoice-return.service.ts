import { Injectable } from '@nestjs/common';
import { CreateInvoiceReturnDto } from './dto/create-invoice-return.dto';
import { UpdateInvoiceReturnDto } from './dto/update-invoice-return.dto';

@Injectable()
export class InvoiceReturnService {
  create(createInvoiceReturnDto: CreateInvoiceReturnDto) {
    return 'This action adds a new invoiceReturn';
  }

  findAll() {
    return `This action returns all invoiceReturn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceReturn`;
  }

  update(id: number, updateInvoiceReturnDto: UpdateInvoiceReturnDto) {
    return `This action updates a #${id} invoiceReturn`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceReturn`;
  }
}
