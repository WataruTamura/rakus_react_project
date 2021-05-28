/* eslint-disable */ //⇦ESLintの警告を非常時にする
import HTMLReactParser from 'html-react-parser';

/**
 * When user select an image file from his local directory, upload it to Firebase Storage, get download URL,
 * and set the URL to the src property of img tag for displaying the thumbnail.
 * @param {string} id The identifier of input tag for uploading files
 */

/**
 * Convert Carriage Return and Line Feed into <br> tag.
 * @param {string} text The row text
 * @returns {void | string | never} The formatted text
 */
export const returnCodeToBr = (text) => {
  if (text === '') {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
  }
};

/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const dateToString = (dt) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2)
  );
};

/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt) => {
  return (
    dt.getFullYear() +
    '-' +
    ('00' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + dt.getDate()).slice(-2) +
    ' ' +
    ('00' + dt.getHours()).slice(-2) +
    ':' +
    ('00' + dt.getMinutes()).slice(-2) +
    ':' +
    ('00' + dt.getSeconds()).slice(-2)
  );
};

/**
 * Validate input email
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

/**
 * Show an alert if required input is blank
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args) => {
  let validator = true;
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === '') {
      validator = false;
    }
  }
  return validator;
};
