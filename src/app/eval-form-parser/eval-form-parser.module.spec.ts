import {EvalFormParserModule} from './eval-form-parser.module';

describe('EvalFormParserModule', () => {
  let evalFormParserModule: EvalFormParserModule;

  beforeEach(() => {
    evalFormParserModule = new EvalFormParserModule();
  });

  it('should create an instance', () => {
    expect(evalFormParserModule).toBeTruthy();
  });
});
