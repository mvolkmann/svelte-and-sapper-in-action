import {getCollection} from '../_helpers';

// This gets all the categories.
export async function get(req, res) {
  try {
    const collection = await getCollection();
    const result = await collection.find().toArray();
    res.end(JSON.stringify(result));
  } catch (e) {
    console.error('categories/index.json.js get:', e);
    res.status(500).json({error: e.message});
  }
}

// This adds a category.
export async function post(req, res) {
  const category = req.body;
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(category);
    const [obj] = result.ops;
    res.end(JSON.stringify(obj));
  } catch (e) {
    console.error('categories/index.json.js post:', e);
    res.status(500).json({error: e.message});
  }
}
