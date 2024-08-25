const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        // VALIDATION
        const user = await userModel.findOne({ email });

        if (user === null) {
            return res.status(404).send({ success: false, message: 'User Not Found' });
        }


        if (req.body.inventoryType=== 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            // Calculate IN Blood Quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: "in",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' },
                    },
                },
            ]);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            // Calculate OUT Blood Quantity
            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: "out",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

            // IN & OUT Calc
            const availableQuantityOfBloodGroup = totalIn - totalOut;

            // Quantity validation
            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }

              // Assign hospital ID to the request body
              req.body.hospital = user?._id;
        } else {
                // Assign donor ID to the request body
                req.body.donor = user?._id;
        }
    
            // Save record
        const inventory = new inventoryModel(req.body);
        await inventory.save();
    
        return res.status(201).send({
            success: true,
            message: 'New Blood Record Added',
        });
    
    } catch (error) {
        // need-fix
        console.log('Error in createInventoryController:', error);
        alert(error)
        return res.status(500).send({
            success: false,
            message: "Error In Creating New Blood Inventory",
            error,
          });
    }
};

////------------------------------------------------
    
    // GET ALL BLOOD RECORDS
    const getInventoryController = async (req, res) => {
        try {
            const { userId } = req.body;
    
            const inventory = await inventoryModel
                .find({ organisation: userId })
                .populate('donor')
                .populate('hospital')
                .sort({ createdAt: -1 });
    
            return res.status(200).send({
                success: true,
                message: 'Got All Records Successfully',
                inventory,
            });
    
        } catch (error) {
            console.error('Error in getInventoryController:', error);
            return res.status(500).send({
                success: false,
                message: 'Error in Fetching All Records',
                error,
            });
        }
    };

    // GET HOSPITAL BLOOD RECORDS
    const getInventoryHospitalController = async (req, res) => {
        try {
            const { userId } = req.body;
    
            const inventory = await inventoryModel
                .find(req.body.filter) 
                .populate('donor')
                .populate('hospital')
                .populate('organisation')
                .sort({ createdAt: -1 });
    
            return res.status(200).send({
                success: true,
                message: 'Got hospital consumer records successfully',
                inventory,
            });
    
        } catch (error) {
            console.error('Error in getInventoryController:', error);
            return res.status(500).send({
                success: false,
                message: 'Error in getting consumer inventory',
                error,
            });
        }
    };

    //GET BLOOD RECORD OF 3
    const getRecentInventoryController = async (req,res) =>{
        try {
            const inventory = await inventoryModel
            .find({
                organisation:req.body.userId
            })
            .limit(3)
            .sort({createdAt: -1});
            return res.status(200).send({
                success:true,
                message:'recent Inventory Data',
                inventory,
            });
        }   catch (error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:'Error In Fetching Recent Inventory ',
                error
            })
        }
    }

    //GET DONOR RECORDS
    const getDonorsController = async (req , res) => {
        try{
          const organisation = req.body.userId
          //find donors
          const donorId = await  inventoryModel.distinct('donor',{
            organisation,
          });
          //console.log(donorId);
          const donors = await userModel.find({ _id: { $in: donorId} });

          return res.status(200).send({
            success:true,
            message: "Donor Records Fetched Succesfully",
            donors,
          });
        } catch (error) {
          console.log(error)
          return res.status(500).send({
            success:false,
            message:'Error in Fetching Donor records',
            error
          })
        }
    };
    
    const getHospitalsController = async (req, res) => {
        try {
            const organisation = req.body.userId;
            const hospitalId = await inventoryModel.distinct("hospital", { organisation });
            const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    
            return res.status(200).send({
                success: true,
                message: "Hospital Data Fetched Successfully",
                hospitals,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error In getting Hospital Data",
                error,
            });
        }
    };
    
    // GET ORG FOR HOSPITAL
    const getOrganisationforHospitalsController = async ( req,res) => {
        try {
            const hospital = req.body.userId
            const orgId = await inventoryModel.distinct("organisation",{hospital});
            //find org
            const organisations = await userModel.find({
                _id: {$in: orgId},
            });
            return res.status(200).send ({
                success:true,
                message:"Hospital Organisation Data Fetched Successfully",
                organisations,
            });
        } catch(error) {
            console.log(error)
            return res.status(500).send({
                success:false,
                message:"Error In Fetching  Hospital Organisation Data",
                error
            });
        }
    };

    module.exports = { 
        createInventoryController, 
        getInventoryController ,
        getDonorsController,
        getHospitalsController,
        getOrganisationforHospitalsController,
        getOrganisationController,
        getInventoryHospitalController,
        getRecentInventoryController,
    };