import { HydroServingFrontendPage } from './app.po';

describe('hydro-serving-frontend App', () => {
  let page: HydroServingFrontendPage;

  beforeEach(() => {
    page = new HydroServingFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
