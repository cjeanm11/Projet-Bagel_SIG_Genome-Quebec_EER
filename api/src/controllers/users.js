
exports.getUsers = function(req, res) {
    res.json({
        "users": ["userOne", "userTwo", "userThree"]}
    )
};

