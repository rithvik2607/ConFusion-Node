const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

const Promos = require('../models/promotions');
const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.get((req,res,next) => {
  Promos.find({})
  .then((promos) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json(promos); 
  }, (err) =>  next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Promos.create(req.body)
  .then((promo) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promo);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  res.statusCode = 403;
  res.end('PUT function is not supported by /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Promos.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

promotionsRouter.route('/:promoId')
.get((req,res,next) => {
  Promos.findById(req.params.promoId)
  .then((promo) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promo);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  res.statusCode = 403;
  res.end('POST function is not supported by /promotions/'+ req.params.promoId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Promos.findByIdAndUpdate(req.params.promoId,{
    $set: req.body
  }, { new: true })
  .then((promo) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promo);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Promos.findByIdAndRemove(req.params.promoId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = promotionsRouter;

