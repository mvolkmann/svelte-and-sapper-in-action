import {v4 as uuidv4} from 'uuid';

export async function fetchPlus(path, options = {}) {
  if (navigator.onLine) return fetch(path, options);

  alert(`You are current offline, so a request to ${path} cannot be made.`);
  return {offline: true};
}

export function getGuid() {
  return uuidv4();
}

export function sortOnName(array) {
  array.sort((el1, el2) =>
    el1.name.toLowerCase().localeCompare(el2.name.toLowerCase())
  );
  return array;
}
