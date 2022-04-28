const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleId: {
    type     : String,
    required : 'Role ID can\'t be empty.',
    unique   : true,
    trim     : true,
  },
  role: {
    type      : String,
    required  : 'Role can\'t be empty.',
    uppercase : true,
    unique    : true,
    trim      : true,
  },
  scope: {
    type: [String],
  },
}, {
  timestamps: true,
});

const Role = mongoose.model('Role', roleSchema, 'app_roles');

module.exports = Role;