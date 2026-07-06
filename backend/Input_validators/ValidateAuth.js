const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const registerUserZod = z.object({
  name: z.string().min(4, "Length of the name should be minimum 4").trim(),
  email: z.string().email("Enter a valid email").trim(),
  password: z.string().trim(),
  profileImageUrl: z.string().url("Enter a valid URL").trim().optional()
});


const validateUserSignup = (req, res, next) => {
  try {
    registerUserZod.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      }); 
    }
    // fallback for other errors
    return res.status(500).json({ success: false, message: "Internal server error" });
}
};

const loginUserZod = z.object({
    email : z.string().email("Enter a valid email"),
    password : z.string().min(8)
})

const validateUserLogin = (req, res, next) => {
  try {
    loginUserZod.parse(req.body);
    next();
  } catch (err) {
     return handleValidationError(res, error);
  }
};

const refreshTokenZod = z.object({
  refreshToken : z.string("Must be an string")
})

const validateRefreshToken = (req, res, next) => {
  try {
    refreshTokenZod.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }
};

const resendVerificationZod = z.object({
  email : z.string().email()
})

const validateResendEmail = (req,res,next)=>{

  try{

    resendVerificationZod.parse(req.body);
    next();

  }
  catch(err){

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map(e => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });

  }
}

module.exports = {
    validateUserLogin,
    validateUserSignup,
    validateRefreshToken,
    validateResendEmail
}
