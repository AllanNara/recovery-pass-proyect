import tokenModel from "./models/Token.js";

export default class TokenDAO {
  constructor() {
    this.model = tokenModel;
  };

  async read(token) {
    try {
      const found = await this.model.findOne({ token });
      return found  
    } catch (error) {
      console.log({error});
      return null
    }
  }
  
  async create(obj) {
    try {
      const token = await this.model.create(obj);
      return token  
    } catch (error) {
      console.log({error});
      return null
    }
  } 

  async delete(id) {
    try {
      const deleted = await this.model.findByIdAndDelete(id);
      return deleted
    } catch (error) {
      console.log({error});
      return null
    }
  }

}