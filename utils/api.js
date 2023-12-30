const HttpStatusCode = {
  OK: 200,
  ALREADY_REPORTED: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNSUPPORTED_ACTION: 405,
  VALIDATION_FAILED: 422,
  SESSION_INVALID: 470,
  SERVER_ERROR: 500,
  CREATED: 201,
  INTERNAL_ERROR: 430,
};

const statusmsg = (statusCode) => {
  switch (statusCode) {
    case HttpStatusCode.BAD_REQUEST:
      return "400 Bad Request";
    case HttpStatusCode.UNAUTHORIZED:
      return "401 Unauthorized";
    case HttpStatusCode.FORBIDDEN:
      return "403 Forbidden";
    case HttpStatusCode.NOT_FOUND:
      return "404 Non Found";
    case HttpStatusCode.UNSUPPORTED_ACTION:
      return "405 Unsupported Action";
    case HttpStatusCode.VALIDATION_FAILED:
      return "422 Validation Failed";
    case HttpStatusCode.SERVER_ERROR:
      return "500 Server Error";
    case HttpStatusCode.CREATED:
      return "201 Created";
    case HttpStatusCode.ALREADY_REPORTED:
      return "208 Already Exist";
    default:
      return "500 Server Error";
  }
};


const setJsonResponse = (res,body,option) => {
  const options = option || {};
  options.status = options.status || HttpStatusCode.OK;
  res.status(options.status).send(body || null)
}

exports.api = {
  ok(res, data) {
    setJsonResponse(res, data, {
      status: HttpStatusCode.OK,
    });
  },

  redirect(res, redirect) {
    const redirectUrl = `${redirect.redirectUrl}`;
    res.status(301).redirect(redirectUrl);
  },

  badRequest(res, error) {
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusmsg(HttpStatusCode.BAD_REQUEST),
      errors,
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.BAD_REQUEST,
    });
  },

  unauthorized(res) {
    const body = {
      message: statusmsg(HttpStatusCode.UNAUTHORIZED),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.UNAUTHORIZED,
    });
  },

  sessionInvalid(res) {
    const body = {
      message: statusmsg(HttpStatusCode.SESSION_INVALID),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.SESSION_INVALID,
    });
  },

  internalError(res) {
    const body = {
      message: statusmsg(HttpStatusCode.INTERNAL_ERROR),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.INTERNAL_ERROR,
    });
  },

  forbidden(res) {
    const body = {
      message: statusmsg(HttpStatusCode.FORBIDDEN),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.FORBIDDEN,
    });
  },

  notFound(res) {
    const body = {
      message: statusmsg(HttpStatusCode.NOT_FOUND),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.NOT_FOUND,
    });
  },

  unsupportedAction(res) {
    const body = {
      message: statusmsg(HttpStatusCode.UNSUPPORTED_ACTION),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.UNSUPPORTED_ACTION,
    });
  },

  invalid(res,error) {
    console.log(error)
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusmsg(HttpStatusCode.VALIDATION_FAILED),
      errors
    };
    setJsonResponse(res, body, {
      status: HttpStatusCode.VALIDATION_FAILED,
    });
  },

  serverError(res) {
    const body = {
      message: statusmsg(HttpStatusCode.SERVER_ERROR),
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.SERVER_ERROR,
    });
  },

  alreadyExist(res, error) {
    const errors = Array.isArray(error) ? error : [error];
    const body = {
      message: statusmsg(HttpStatusCode.ALREADY_REPORTED),
      errors,
    };

    setJsonResponse(res, body, {
      status: HttpStatusCode.ALREADY_REPORTED,
    });
  },
}