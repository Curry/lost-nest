import { Test, TestingModule } from '@nestjs/testing';
import { EveService } from './eve.service';

describe('EveService', () => {
  let service: EveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EveService],
    }).compile();

    service = module.get<EveService>(EveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
