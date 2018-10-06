import {ListPresentationModule} from './list-presentation.module';

describe('ListPresentationModule', () => {
  let listPresentationModule: ListPresentationModule;

  beforeEach(() => {
    listPresentationModule = new ListPresentationModule();
  });

  it('should create an instance', () => {
    expect(listPresentationModule).toBeTruthy();
  });
});
