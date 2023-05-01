const express = require('express');
const toursController = require('../controllers/toursController');

const router = express.Router();

// router.param('id', toursController.checkId);

router
  .route('/top-5-cheap')
  .get(toursController.aliasingTopTours, toursController.getTours);

router.route('/tour-stats').get(toursController.getTourStats);

router
  .route('/')
  // .post(toursController.checkBody, toursController.postTours)
  .post(toursController.postTours)
  .get(toursController.getTours);
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
