/**
 * Created by Nikhil on 27/05/17.
 */

const utils = require('../utils');
const jwt = require('jsonwebtoken');

const dynamoDB = utils.connectToDB();

function params(email) {
  return {
    TableName: '2017_RDV_Team',
    Key: {
      "email": email,
    }
  }
}

function authorize(type, perm='') {
  return function (req, res, next) {
    let token = req.headers['authorization'];
    if (!token)
      return utils.error(res, 401, "Auth Token Needed");
    token = token.replace('Bearer ', '');

    jwt.verify(token, '##Nikhil%Was%Here##', function(err, u) {
      if (err) {
        return utils.error(res, 401, "Invalid Auth Token");
      }
      else {
        dynamoDB.get(params(u.email), function (err, data) {
          if (err) {
            return utils.error(res, 500, "Internal Server Error");
          } else {
            if (!data.Item)
              return utils.error(res, 401, "Invalid Auth Token");
            let user = data.Item;
            req.user = user;
            if (type === 'self-update') {
              if (req.body.member && req.body.member.email === user.email)
                next();
              else
                return utils.error(res, 403, "You do not have the required permissions");
            }
            else if (!user.permissions)
              return utils.error(res, 403, "You do not have the required permissions");
            else if (user.permissions.can_manage_all)
              next();
            else if (user.permissions["can_manage_all_" + type])
              next();
            else if (user.permissions["can_" + perm])
              next();
            else if (type === 'event') {
              if (user.permissions["can_manage_event_" + req.body.event.category.key])
                next();
              else
                return utils.error(res, 403, "You do not have the required permissions");
            }
            else if (type === 'fest') {
              if (req.body.member && req.body.member.role === 'Activity Head' && user.permissions["can_add_achead"])
                next();
              else if (req.body.member && req.body.member.role.indexOf('Coordinator') !== -1 && user.permissions["can_add_coordi"])
                next();
              else
                return utils.error(res, 403, "You do not have the required permissions");
            }
            else
              return utils.error(res, 403, "You do not have the required permissions");
          }
        });
      }
    });
  }
}

module.exports = authorize;