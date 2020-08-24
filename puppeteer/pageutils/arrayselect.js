//Given two elements of certain selector, select the whole array of similar elements
//Sample for page : https://www.amazon.in/s?k=Phone
// let elem1 = "#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(2) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a > span"
// let elem2 = "#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(3) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a > span"

// let elem1 = "#row-0 > div > div > div > div > div > div.slider-item.slider-item-1"
// let elem2 = "#row-0 > div > div > div > div > div > div.slider-item.slider-item-2"
  function getSelector(elem1, elem2) {
    var shorterLength = Math.min(elem1.length, elem2.length);
    var nPos;
    for (var i = 0; i < shorterLength; i++) {
      if (elem1[i] !== elem2[i]) nPos = i;
    }
    if (elem1.length !== elem2.length) nPos = shorterLength;
    return elem1.substr(0, nPos) + "n" + elem1.substr(nPos + "n".length);

  }

// let x = getSelector(elem1, elem2);
// console.log(x);

  module.exports = getSelector;
