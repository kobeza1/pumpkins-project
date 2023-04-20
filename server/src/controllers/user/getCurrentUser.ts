export const getCurrentUser = (
    req: { user: { _id: String; name: String; email: String } },
    res: { json: Function }
) => {
    const { _id: id, name, email } = req.user;

    res.json({
        user: {
            id,
            name,
            email,
        },
    });
};
