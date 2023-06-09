import multer from "multer"


export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
};


export const protectMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login");
    }
};


export const publicMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized")
        return res.redirect("/");
    }
};

export const avatarupload = multer({dest:"uploads/avatars/", limits: {fileSize: 3000000,},});
export const videoupload = multer({dest:"uploads/videos/", limits: {fileSize: 10000000,},});