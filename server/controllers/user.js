const User = require("../models/User");
const randomBytes = require("randombytes");

exports.register = asyncHandler(async (request, response, next) => {
    //Validation
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + " ", "");
      throw error;
    }
  
    let hashed = bcrypt.hashSync(request.body.password, 10);
    const user = new User({
      name: request.body.name,
      email: request.body.email,
      password: hashed,
    });
  
    try {
      const newUser = await user.save();
      console.log(newUser._id);
  
      let token = await new Token({
        userId: newUser._id,
        token: randomBytes(32).toString("hex"),
      }).save();
  
      response.status(201).json(newUser);
    } catch (err) {
      err.status = 400;
      next(err);
    }
  });
  
    