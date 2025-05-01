export const logger = (req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} - ${res.statusCode}`);
    });
    next();
};
