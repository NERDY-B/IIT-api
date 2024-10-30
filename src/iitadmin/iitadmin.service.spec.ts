import { Test, TestingModule } from '@nestjs/testing';
import { IitadminService } from './iitadmin.service';

describe('IitadminService', () => {
  let service: IitadminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IitadminService],
    }).compile();

    service = module.get<IitadminService>(IitadminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
