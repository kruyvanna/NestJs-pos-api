import { Test, TestingModule } from '@nestjs/testing';
import { BalanceTransactionController } from './balance-transaction.controller';

describe('BalanceTransactionController', () => {
  let controller: BalanceTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceTransactionController],
    }).compile();

    controller = module.get<BalanceTransactionController>(BalanceTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
