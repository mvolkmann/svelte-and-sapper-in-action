import {v4 as uuidv4} from 'uuid';

export function getGuid() {
  return uuidv4();
}

export function sortOnName(array) {
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase())
  );
  return array;
}
