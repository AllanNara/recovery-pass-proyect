import userModel from "./models/User.js";

export default class UserDAO {
  constructor() {
    this.model = userModel;
  };

  async get(email) {
    try {
      const user = await this.model.findOne({ email });
      return user  
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async read(id) {
    try {
      const user = await this.model.findById(id);
      return user  
    } catch (error) {
      console.log(error);
      return null
    }
  }
  
  async create(obj) {
    try {
      const user = await this.model.create(obj);
      return user  
    } catch (error) {
      console.log(error);
      return null
    }
  } 

  async update(id, user) {
    try {
      const updateUser = await this.model.findByIdAndUpdate(id, user, { new: true });
      return updateUser  
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async delete(id) {
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      return deleted
    } catch (error) {
      console.log(error);
      return null
    }
  }

}