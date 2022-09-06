import { Module } from '@nestjs/common';
import { InvoiceReturnService } from './invoice-return.service';
import { InvoiceReturnController } from './invoice-return.controller';

@Module({
  controllers: [InvoiceReturnController],
  providers: [InvoiceReturnService]
})
export class InvoiceReturnModule {}
