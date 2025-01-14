const {
  getPaginationParams,
  formatPaginatedResponse,
} = require("./helpers/pagination");
// const { logger, write } = require("./logging/logger");

module.exports = {
  // write: write,
  // logger: logger,
  getPaginationParams: getPaginationParams,
  formatPaginatedResponse: formatPaginatedResponse,
  isEmpty: require("./validation/is-empty"),
  isIterable: require("./validation/is-iterable"),
  deleteFile: require("./helpers/delete-file"),
  formattedMsg: require("./helpers/formatted-msg"),
  cookieExtractor: require("./helpers/cookie-extractor"),
  successResponse: require("./responses/success-response"),
  errorResponse: require("./responses/error-response"),
  nodeMailer: require("./mail/node-mailer"),
  sendOtpMail: require("./mail/example-mail"),
  secondsAgo: require("./helpers/time-formats").secondsAgo,
  slugify: require("./helpers/string-formats").slugify,
  formatTitle: require("./helpers/string-formats").formatTitle,
};
