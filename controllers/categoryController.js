/**
 * Created by Nikhil on 26/05/17.
 */
const utils = require('../utils');

const dynamoDB = utils.connectToDB();
const tableName = 'RDV_Event_Categories';

function getCategories(req, res) {
  const params = {
    TableName: tableName
  };
  dynamoDB.scan(params, function(err, data) {
    if (err)
      return utils.error(res, 500, "Internal Server Error");
    return res.json({
      categories: data.Items,
    })
  });
}

function addCategory(req, res) {
  const category = req.body.category;
  if (!category)
    return utils.error(res, 400, "Invalid Data");
  if (!category.key)
    return utils.error(res, 400, "Enter Key");
  if (!category.name)
    return utils.error(res, 400, "Enter Name");
  const cleanCategory = {};
  cleanCategory.key = category.key;
  cleanCategory.name = category.name;
  const params = {
    TableName: tableName,
    Item: cleanCategory,
    ConditionExpression: 'attribute_not_exists(#a)',
    ExpressionAttributeNames: {
      "#a": "key",
    },
  };
  dynamoDB.put(params, function (err, data) {
    if (err) {
      console.log(err);
      if (err.statusCode >= 500)
        return utils.error(res, 500, "Internal Server Error");
      else
        return utils.error(res, 400, "Category with Key already exists");
    } else {
      return res.json({error: false, message: "Category added successfully!"});
    }
  })
}

function deleteCategory (req, res) {
  const key = req.params.key;
  if (!key)
    return utils.error(res, 400, "Invalid Key");
  const params = {
    TableName: tableName,
    Key: {
      "key": key,
    },
    ConditionExpression: 'attribute_exists(#a)',
    ExpressionAttributeNames: {
      "#a": "key",
    },
  };
  dynamoDB.delete(params, function (err, data) {
    if (err) {
      if (err.statusCode >= 500)
        return utils.error(res, 500, "Internal Server Error");
      else
        return utils.error(res, 400, "Category with Key does not exist");
    } else {
      return res.json({error: false, message: "Category deleted successfully!"});
    }
  })
}

module.exports = {
  getCategories: getCategories,
  addCategory: addCategory,
  deleteCategory: deleteCategory,
};