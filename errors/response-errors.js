const _ = require("underscore");

const customErrors = {
    
    ESS50001: {
        status: 500,
        error_code: 'ESS50001',
        error_summary: 'Internal Server Error',
        error_message: 'There was a problem with the server. Try again later.'
    },
    ESS40301: {
        status: 403,
        error_code: 'ESS40301',
        error_summary: 'Forbidden',
        error_message: 'Your request is not authorized to access the endpoint.'
    },
    ESS40401: {
        status: 404,
        error_code: 'ESS40401',
        error_summary: 'Not Found',
        error_message: 'The requested resource at specified endpoint could not be found.'
    },
    ESS42201: {
        status: 422,
        error_code: 'ESS42201',
        error_summary: 'Field Validation Failed',
        error_message: `Required field validation failed.`
    },
    ESS42207: {
        status: 422,
        error_code: `ESS42207`,
        error_summary: `File Upload Validation Failed`,
        error_message: `Only image files are allowed. Please try again.`
    },
    ESS42208: {
        status: 422,
        error_code: `ESS42208`,
        error_summary: `File Upload Validation Failed`,
        error_message: `Image could not be uploaded. Please try again.`
    },
    ESS42401: {
        status: 424,
        error_code: `ESS42401`,
        error_summary: `Unknown Data Exception`,
        error_message: `Something went wrong. Please try again.`
    }
};

const getError = (error_code, exception) => {
    let err = customErrors[error_code];
    if (exception){
        err.stack = exception.stack.toString();
    }
    return err;
};

const validationError = (joi_errors, next = null) => {
    let err = getError('ESS42201');
    err.error_message = `Required field validation failed for : ${ _.pluck(joi_errors, 'message')[0] || ''}`;
    return err;
};

module.exports = {
    getError: getError,
    validationError: validationError
};
