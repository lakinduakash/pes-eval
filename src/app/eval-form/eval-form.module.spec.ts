import { EvalFormModule } from './eval-form.module';

describe('EvalFormModule', () => {
  let evalFormModule: EvalFormModule;

  beforeEach(() => {
    evalFormModule = new EvalFormModule();
  });

  it('should create an instance', () => {
    expect(evalFormModule).toBeTruthy();
  });
});
