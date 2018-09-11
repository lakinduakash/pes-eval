import { EvalListModule } from './eval-list.module';

describe('EvalListModule', () => {
  let evalListModule: EvalListModule;

  beforeEach(() => {
    evalListModule = new EvalListModule();
  });

  it('should create an instance', () => {
    expect(evalListModule).toBeTruthy();
  });
});
