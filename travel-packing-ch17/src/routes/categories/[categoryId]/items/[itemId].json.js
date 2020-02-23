const {ObjectId} = require('mongodb');
const send = require('@polka/send-type');
import {getCollection} from '../../_helpers';

// This deletes an item from a category.
export async function del(req, res) {
  const {categoryId, itemId} = req.params;
  try {
    const collection = await getCollection();
    const itemPath = `items.${itemId}`;
    const result = await collection.updateOne(
      {_id: ObjectId(categoryId)},
      {$unset: {[itemPath]: ''}}
    );
    if (result.deletedCount === 0) {
      res
        .status(404)
        .send(
          `no item with id ${itemId} found in category with id ${categoryId}`
        );
    } else {
      res.end();
    }
  } catch (e) {
    console.error('categories/[categoryId]/items/[itemId].json.js del:', e);
    send(res, 500, {error: e});
  }
}

// This updates an item in a category.
export async function put(req, res) {
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
    console.error('categories/[categoryId]/items/[itemId].json.js put:', e);
    send(res, 500, {error: e});
  }
}
