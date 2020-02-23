const {ObjectId} = require('mongodb');
import {getCollection} from '../../../_helpers';

// This adds an item to a category.
export async function post(req, res) {
  const {categoryId} = req.params;
  const item = req.body;
  try {
    const collection = await getCollection();
    const itemPath = `items.${item.id}`;
    await collection.updateOne(
      {_id: ObjectId(categoryId)},
      {$set: {[itemPath]: item}}
    );
    res.end();
  } catch (e) {
    console.error('categories/[categoryId]/items/index.json.js post:', e);
    res.status(500).json({error: e.message});
  }
}
