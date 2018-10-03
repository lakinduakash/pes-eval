import { EvaluatorModule } from './evaluator.module';

describe('EvaluatorModule', () => {
  let evaluatorModule: EvaluatorModule;

  beforeEach(() => {
    evaluatorModule = new EvaluatorModule();
  });

  it('should create an instance', () => {
    expect(evaluatorModule).toBeTruthy();
  });
});
