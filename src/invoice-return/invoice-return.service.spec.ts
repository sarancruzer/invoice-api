import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceReturnService } from './invoice-return.service';

describe('InvoiceReturnService', () => {
  let service: InvoiceReturnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceReturnService],
    }).compile();

    service = module.get<InvoiceReturnService>(InvoiceReturnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
