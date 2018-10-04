import {EvalSigninUpModule} from './eval-signin-up.module';

describe('EvalSigninUpModule', () => {
  let evalSigninUpModule: EvalSigninUpModule;

  beforeEach(() => {
    evalSigninUpModule = new EvalSigninUpModule();
  });

  it('should create an instance', () => {
    expect(evalSigninUpModule).toBeTruthy();
  });
});
