const User = require('../models/user');

class UserDAO {
  async create(userData) {
    const User = new User(userData);
    return await User.save();
  }

  async getAll() {
    return await User.find();
  }

  async getById(id) {
    return await User.findById(id);
  }

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserDAO();
