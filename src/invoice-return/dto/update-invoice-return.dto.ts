import { PartialType } from '@nestjs/swagger';
import { CreateInvoiceReturnDto } from './create-invoice-return.dto';

export class UpdateInvoiceReturnDto extends PartialType(CreateInvoiceReturnDto) {}
