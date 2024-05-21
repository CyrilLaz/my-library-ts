module.exports.ApiCounter = class {
  constructor(url) {
    this.instance = require("axios").create({
      baseURL: `${url}counter`,
    });
  }

  async incrementCount(id) {
    try {
      const { data } = await this.instance.post(`/${id}/incr`);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCount(id) {
    try {
      const { data } = await this.instance.get(`/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
};
