module.exports = (app) => {
  const items = require('../mongoDB/limit');
  
  app.post('/', items.create);
  app.get('/', items.findAll);
  app.get('/:itemsId', items.findOne);
}