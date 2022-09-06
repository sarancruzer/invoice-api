import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceReturnController } from './invoice-return.controller';
import { InvoiceReturnService } from './invoice-return.service';

describe('InvoiceReturnController', () => {
  let controller: InvoiceReturnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceReturnController],
      providers: [InvoiceReturnService],
    }).compile();

    controller = module.get<InvoiceReturnController>(InvoiceReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
