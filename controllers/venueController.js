/**
 * Created by Nikhil on 26/05/17.
 */
const utils = require('../utils');

const dynamoDB = utils.connectToDB();
const tableName = 'RDV_Venues';

function getVenues(req, res) {
  const params = {
    TableName: tableName
  };
  dynamoDB.scan(params, function(err, data) {
    if (err)
      return utils.error(res, 500, "Internal Server Error");
    return res.json({
      venues: data.Items,
    })
  });
}

function addVenue(req, res) {
  const venue = req.body.venue;
  if (!venue || venue === '')
    return utils.error(res, 400, "Enter Venue");
  const params = {
    TableName: tableName,
    Item: {venue: venue},
    ConditionExpression: 'attribute_not_exists(#a)',
    ExpressionAttributeNames: {
      "#a": "venue",
    },
  };
  dynamoDB.put(params, function (err, data) {
    if (err) {
      console.log(err);
      if (err.statusCode >= 500)
        return utils.error(res, 500, "Internal Server Error");
      else
        return utils.error(res, 400, "Venue already exists");
    } else {
      return res.json({error: false, message: "Venue added successfully!"});
    }
  })
}

function deleteVenue (req, res) {
  const venue = req.params.venue;
  if (!venue || venue === '')
    return utils.error(res, 400, "Invalid Venue");
  const params = {
    TableName: tableName,
    Key: {
      "venue": venue,
    },
    ConditionExpression: 'attribute_exists(#a)',
    ExpressionAttributeNames: {
      "#a": "venue",
    },
  };
  dynamoDB.delete(params, function (err, data) {
    if (err) {
      if (err.statusCode >= 500)
        return utils.error(res, 500, "Internal Server Error");
      else
        return utils.error(res, 400, "Venue does not exist");
    } else {
      return res.json({error: false, message: "Venue deleted successfully!"});
    }
  })
}

module.exports = {
  getVenues: getVenues,
  addVenue: addVenue,
  deleteVenue: deleteVenue,
};