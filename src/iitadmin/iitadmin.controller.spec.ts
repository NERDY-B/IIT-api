import { Test, TestingModule } from '@nestjs/testing';
import { IitadminController } from './iitadmin.controller';
import { IitadminService } from './iitadmin.service';

describe('IitadminController', () => {
  let controller: IitadminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IitadminController],
      providers: [IitadminService],
    }).compile();

    controller = module.get<IitadminController>(IitadminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
