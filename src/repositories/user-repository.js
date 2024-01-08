const { StatusCodes } = require("http-status-codes");
const CrudRepository = require("./crud-repository");
const AppError = require("../utils/errors/app-error");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    const response = await User.findOne({ where: { email: email } });

    return response;
  }
}

module.exports = UserRepository;
