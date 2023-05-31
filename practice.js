import bcrypt from "bcrypt";
import User from "../models/User";

const getjoin = (req, res) => {
    res.render("join", {pageTitle: "Join"});
};

const postjoin = async (req, res) => {
    const {name, email, username, password, password2, location} = req.body
    const pageTitle = "Join";
    if(password !== password2) {
        return res.status(400).render("join", {pageTitle,
            errorMessage: "Password is false"});
    }
    const Exists = await User.exists({ $or: [{username}, {email}] });
    if(Exists) {
        return res.status(400).render("join", {pageTitle,
        errorMessage: "This username/email is already taken."});
    }
    try {
    await User.create({
        name, email, username, password, location
});
res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", {pageTitle,
            errorMessage:"An account with this username does not exists."});
    }
};

export const getLogin = (req, res) => {
    res.render("login", {pageTitle:"Login"});
};

export const postLogin = async (req, res) => {
    const{username, password} = req.body;
    const pageTitle = "Login";
    const user = User.findOne({username})
    if(!user) {
        return res.status(400).render("login", {pageTitle,
        errorMessage:"An account with this username does not exists."})
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) {
        return res.status(400).render("login", {pageTitle,
        errorMessage:"Wrong password."});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const getEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle:"edit-profile"})}
export const postEdit = async (req, res) => {
    const {
        session: {
            user:{_id},
        },
        body:{name, location, email, username},
    } = req

    const updateUser = await User.findByIdAndUpdate(_id, {name, location, email, username},
    {new:true})
    req.session.user=updateUser
    return res.redirect("/users/edit")
}