import expect from 'expect.js';
import Story from './Story';

describe('new Story', () => {

  it('should have a default title', () => {
    expect((new Story()).title).to.be('My Story');
  });

  it('should have a default description', () => {
    expect((new Story()).description).to.be('');
  });

  it('should have a title', () => {
    expect((new Story({ title: 'Foo' })).title).to.be('Foo');
  });

  it('should have a description', () => {
    expect((new Story({ description: 'FooBar' })).description).to.be('FooBar');
  })

});
