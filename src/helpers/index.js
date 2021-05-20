import HttpStatus from 'http-status';

export const successResponse = (req, res, data, code = HttpStatus.OK) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = HttpStatus.INTERNAL_SERVER_ERROR,
  error = {},
) => res.status(code).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

export const uniqueId = (length = 13) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const validateRequest = (data, schema) => {
  return new Promise((resolve, reject) => {
       // schema options
       const options = {
           abortEarly: false, // include all errors
           allowUnknown: true, // ignore unknown props
           stripUnknown: true // remove unknown props
       };

       // validate request body against schema
       const { error, value } = schema.validate(data, options);
       
       if (error) {
           // on fail return comma separated errors
           let errors = [];
           error.details.map((errorData) => {
               const errorObject = {
                   message: errorData.message,
                   field: errorData.path.join('_'),
                   type: errorData.type,
               };

               errors.push(errorObject);
           });
           reject(errors);
       } else {
           // on success replace req.body with validated value and trigger next middleware function
           resolve(value);
       }
  });
}