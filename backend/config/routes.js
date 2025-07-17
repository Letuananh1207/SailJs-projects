/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET /api/ping": "PingController.ping",
  "GET /api/product": "ProductController.find",
  "POST /api/product/add": "ProductController.create",
  "POST /api/product/delete/:id": "ProductController.delete",
  "POST /api/product/update/:id": "ProductController.update",
  "POST /api/auth/register": "AuthController.register",
  "POST /api/auth/login": "AuthController.login",
  "GET /api/auth/profile": "AuthController.getProfile",
  "POST /api/auth/logout": "AuthController.logout",
  "GET /api/users": "UserController.find",
  "PUT /api/users/:id/permissions": "UserController.updatePermissions",
  "DELETE /api/users/:id/permissions/:resource":
    "UserController.removePermission",
  "GET /api/page-config": "PageConfigController.get",
  "GET /api/page-config/all": "PageConfigController.getAll",
  "GET /api/page-config/:id": "PageConfigController.findOne",
  "POST /api/page-config": "PageConfigController.create",
  "PUT /api/page-config/:id": "PageConfigController.update",
  "DELETE /api/page-config/:id": "PageConfigController.delete",
};
