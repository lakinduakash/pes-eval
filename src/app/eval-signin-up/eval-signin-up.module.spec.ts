import {EvalSignInUpModule} from './eval-signin-up.module';

describe('EvalSigninUpModule', () => {
  let evalSigninUpModule: EvalSignInUpModule;

  beforeEach(() => {
    evalSigninUpModule = new EvalSignInUpModule();
  });

  it('should create an instance', () => {
    expect(evalSigninUpModule).toBeTruthy();
  });
});
