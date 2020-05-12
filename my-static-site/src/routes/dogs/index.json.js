import dogs from './dogs.json';
const names = Object.values(dogs).map(dog => dog.name).sort();

export function get(req, res) {
  res.end(JSON.stringify(names));
}
