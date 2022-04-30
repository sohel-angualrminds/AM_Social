const users = require("../Model/user");
const provideInfo = async (req, res, next) => {
    let result = await users.findOne({ _id: req.id });
    if (result) {
        req.firstName = result.firstName;
        req.lastName = result.lastName;
    } else {
        req.firstname = "annonymus";
        req.lastname = "";
    }
    next();
}
module.exports = provideInfo;