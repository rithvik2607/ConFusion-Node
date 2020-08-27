const express = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
  res.end('Will send all the promotions to you');  
})
.post((req,res,next) => {
  res.statusCode = 403;
  res.end('POST function is not supported by /promotions');
})
.put((req,res,next) => {
  res.end('Will add the promotion: '+ req.body.name +' with details: '+ req.body.description);
})
.delete((req,res,next) => {
  res.end('Deleting all promotions');
});

promotionsRouter.route('/:promoId')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
  res.end('Will send the promotion: '+ req.params.promoId +' to you');  
})
.post((req,res,next) => {
  res.statusCode = 403;
  res.end('POST function is not supported by /promotions/'+ req.params.promoId);
})
.put((req,res,next) => {
  res.write('Updating the promotion: '+ req.params.promoId +'\n');
  res.end('Will update the promotion name as: '+ req.body.name +' and details as: '+ req.body.description);
})
.delete((req,res,next) => {
  res.end('Deleting the promotion: '+ req.params.promoId);
});

module.exports = promotionsRouter;

