const express = require("express");
const router = express.Router();
const petsController = require('../controllers/petsController');
const petValidation = require("../validations/petValidation");
router.get('/pet', petValidation.id, petsController.getPet);
router.get('/pets', petsController.getPets);
router.post('/pet', petValidation.add, petsController.postPet);
router.put('/pet', petValidation.update, petsController.putPet);
router.delete('/pet', petValidation.id, petsController.deletePet);

module.exports = router;