describe('Secure', () => {

  beforeEach( () => {
    browser.get('secure');
  });

  it('should have correct feature heading', () => {
      expect(element(by.css('sd-app sd-secure h2')).getText())
      .toEqual('Secure');
  });
});
