/**
 * ************************************
 *
 * @module  browser.js
 * @author  smozingo
 * @date    8/21/17
 * @description setup file for jsdom - ensures that we can test components in a realistic browser environment
 *
 * ************************************
 */

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.HTMLElement = global.window.HTMLElement;
copyProps(window, global);

// require('babel-register')();
//
// const jsdom = require('jsdom').jsdom;
//
// const exposedProperties = ['window', 'navigator', 'document'];
//
// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
//
// global.navigator = {
//   userAgent: 'node.js'
// };
//
// documentRef = document;
