const userModel = require("../models/userModel");

//GET BLOOD DONOR LIST
const getDonorsListController = async (req, res) => {
    try {
        const donorData = await userModel
            .find({ role: "donor"})
            .sort({ createAt: -1 });

            return res.status(200).send({
                success:true,
                Totalcount: donorData.length,
                message: "Donor List Fetched Successfully",
                donorData,
            });
       }    catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error ",
                error,
            });
        }
};
//GET HOSPITAL LIST 
const getHospitalListController = async (req, res) => {
    try {
        console.log('fetching hospital list')
        const hospitalData = await userModel
            .find({ role: "hospital"})
            .sort({ createAt: -1 });

            return res.status(200).send({
                success:true,
                Totalcount: hospitalData.length,
                message: "Hospital List Fetched Successfully",
                hospitalData,
            });
       }    catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error",
                error,
            });
        }
};
//GET ORG LIST
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel
            .find({ role: "organisation"})
            .sort({ createAt: -1 });

            return res.status(200).send({
                success:true,
                Totalcount: orgData.length,
                message: "Organisation List Fetched Successfully",
                orgData,
            });
       }    catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Error ",
                error,
            });
        }
};
// ========================================

//DELETE DONOR
const deleteDonorController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message:" Record Deleted Successfully",
        });
    }   catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error While Deleting records ",
            error,
        });
    }
}; 

//EXPORT
module.exports = {
    getDonorsListController , 
    getHospitalListController,
    getOrgListController,
    deleteDonorController,
};