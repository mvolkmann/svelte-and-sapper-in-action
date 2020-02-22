import uuidv1 from 'uuid/v1';

export function getGuid() {
  return uuidv1();
}

export function sortOnName(array) {
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase())
  );
  return array;
}
