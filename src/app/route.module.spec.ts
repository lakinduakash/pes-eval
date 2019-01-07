import {AppRouteModule} from './route.module';


describe('RouteModule', () => {
  let routeModule: AppRouteModule;

  beforeEach(() => {
    routeModule = new AppRouteModule();
  });

  it('should create an instance', () => {
    expect(routeModule).toBeTruthy();
  });
});
