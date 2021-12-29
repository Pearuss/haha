const testApi = require('./src/api-client/article-api');

console.log('testApi', testApi);
const fetch = async () => {
  try {
    const response = await testApi.getAll({});
    console.log('response', response);
  } catch (error) {
    console.log(error);
  }
};
fetch();
