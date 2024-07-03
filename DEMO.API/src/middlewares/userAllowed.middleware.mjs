import { Users } from "../models/users.models.mjs"

export const isUserAllowed = (req, res, next) => {

    if(!req.user) return res.status(401).send({msg: "NOT AUTHORIZED"});

    const { allowedTo } = req.user;
    console.log(`PATH: ${req.path}`);
    console.log(`allowedTo: ${allowedTo}`);
    if((req.path === '/api/UI-1' && allowedTo !== 1) || (req.path === '/api/UI-2' && allowedTo !== 2)) {
        return res.status(400).send({allowed: "NO", msg: "YOU ARE NOT AUTHORIZED TO VISIT THIS WEBSITE"});
    }
    next();
}