const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    createInventoryController,
    getInventoryController,
    getDonorsController,
    getHospitalsController,
    getOrganisationController,
    getOrganisationforHospitalsController,
    getInventoryHospitalController,
    getRecentInventoryController,
} = require('../controllers/inventoryController');


const router = express.Router();

// Routes
// ADD INVENTORY || POST
// need-fix
router.post('/create-inventory', authMiddleware, createInventoryController);

// GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddleware, getInventoryController);

// GET RECENT BLOOD RECORDS
router.get(
    '/get-recent-inventory', 
    authMiddleware, 
    getRecentInventoryController
);

// GET HOSPITAL BLOOD RECORDS
router.post(
    '/get-inventory-hospital', 
    authMiddleware, 
    getInventoryHospitalController
);


// GET DONOR RECORDS
router.get('/get-donors', authMiddleware, getDonorsController);

//GET HOSPITAL RECORDS
router.get('/get-hospitals', authMiddleware, getHospitalsController);

//GET ORGANISATION RECORDS
router.get('/get-organisation', authMiddleware, getOrganisationController);

//GET ORGANISATION RECORDS
router.get(
    '/get-organisation-for-hospital', 
    authMiddleware, 
    getOrganisationforHospitalsController
);

module.exports = router;
