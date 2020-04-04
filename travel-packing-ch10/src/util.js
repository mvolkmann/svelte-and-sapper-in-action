import {v4 as uuidv4} from 'uuid';

export function getGuid() {
  return uuidv4();
}

export function handleKey(event) {
  const {code} = event;
  if (code === 'Enter' || code === 'Escape' || code === 'Tab') {
    event.target.blur();
  }
}

export function isSafari() {
  const {userAgent} = navigator;
  const isChrome = userAgent.indexOf('Chrome') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1;
  return isSafari && !isChrome;
}

export function sortOnName(array) {
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase())
  );
  return array;
}
