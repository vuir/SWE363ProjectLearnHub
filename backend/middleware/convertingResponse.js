function responseHandler(controllerFn) {
    return async (req, res, next) => {
        const result = await controllerFn(req, res);

        if (!Array.isArray(result)) {
            return res.status(500).json({ message: "Invalid controller return format" });
        }

        const [status, data] = result;

        return res.status(status).json(data);
    };
}

module.exports = responseHandler;
