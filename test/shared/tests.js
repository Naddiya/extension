import webdriver from 'selenium-webdriver';
import expect from 'expect';

function checkValue(value, done) {
  this.driver.findElement(webdriver.By.className('counter'))
    .getText().then((val) => {
      expect(val).toBe(value + '');
      done();
    });
}

export function hasValue(value) {
  it('should contain text "Clicked: ' + value + ' times"', function(done) {
    checkValue.call(this, value, done);
  });
}
export function hasValueWait(value, timeout = 10000) {
  it('should contain text "Clicked: ' + value + ' times"', function(done) {
    /*
    this.driver.wait(() =>
      this.driver.findElements(webdriver.By.className('counter'))
        .then((elems) => elems.length === 1)
      , 4000, 'element with such value doesn\'t exist')
      .then(() => done());
      */
    setTimeout(()=>{
      checkValue.call(this, value, done);
    }, timeout);
  });
}

export function hasClickedButton(idx, newValue, className) {
  it('should click button with idx=' + idx, function(done) {
    this.driver.findElement(
        webdriver.By.xpath(
          '//div[' + (className ? '@class="' + className + '" and ' : '') + './/span[text()="Clicked: "] and .//span[text()=" times"]]//button[' + idx + ']'
        ))
      .click().then(() => done());
  });
  hasValueWait(newValue);
}

export function clickButtons(initialValue, className) {
  [
    [ 1, initialValue + 1 ],
    [ 4, initialValue + 2 ],
    [ 5, initialValue + 3 ],
    [ 2, initialValue + 2 ]
  ].forEach((params) => {
    describe(' -> ' + params[1], function() {
      hasClickedButton(...params, className);
    });
  });
}

export function hasTitle(value) {
  it('should have title ' + value, function(done) {
    this.driver.getTitle().then((title) => {
      expect(title).toBe(value);
      done();
    });
  });
}