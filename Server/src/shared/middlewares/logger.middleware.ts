export const loggerMiddleware = (req, resp, next) => {
  console.log(`[logger.middleware]:: url: ${req.url}; headers: ${JSON.stringify(req.headers)};
                 body: ${JSON.stringify(req.body)}; `);
  return next();
}