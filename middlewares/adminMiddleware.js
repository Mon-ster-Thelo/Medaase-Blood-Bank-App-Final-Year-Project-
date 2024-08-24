const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.userId);

        // Check admin
        if (user?.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: 'Authentication Failed',
            });
        }

        // If the user is an admin, proceed to the next middleware
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(401).send({
            success: false,
            message: 'Auth Failed, ADMIN API',
            error,
        });
    }
};
