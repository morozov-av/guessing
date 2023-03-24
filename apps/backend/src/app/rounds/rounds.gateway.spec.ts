import { Test, TestingModule } from '@nestjs/testing';
import { RoundsGateway } from './rounds.gateway';

describe('RoundsGateway', () => {
  let gateway: RoundsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ RoundsGateway ]
    }).compile();

    gateway = module.get<RoundsGateway>(RoundsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
