const ctrlWrapper = (ctrl: Function) => {
    const func = async (req: {}, res: {}, next: any) => {
        try {
            await ctrl(req, res, next);
        } catch (err) {
            next(err);
        }
    };
    return func;
};

module.exports = ctrlWrapper;
