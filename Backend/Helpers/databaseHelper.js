const mssql = require('mssql');
const sqlConfig = require('../Config/index');


class Connection {
  constructor() {
    this.connectToDb();
  }
  connectToDb = async () => {
    try {
      this.pool = await mssql.connect(sqlConfig);
    } catch (error) {}
  };

  createRequestObj = async (requestObj, data) => {
    const keyNames = Object.keys(data);
    keyNames.map((name) => {
      let value = data[name];
      requestObj.input(name, value);
    });
    return requestObj;
  };
  executeRequest = async (storedProcedure, data = {}) => {
    const requestObj = await this.pool.request();
    const request = await this.createRequestObj(requestObj, data);
    const res= await (await request.execute(storedProcedure)).recordset
    return res
  };
}

module.exports ={
    exec: new Connection().executeRequest
}