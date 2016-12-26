import { AppFormPage } from './app.po';

describe('app-form App', function() {
  let page: AppFormPage;

  beforeEach(() => {
    page = new AppFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('af works!');
  });
});
