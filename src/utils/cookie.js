module.exports.cookie =()=> {
    if(process.env.NODE_ENV === "production"){
        return{
            maxAge: 1000 * 3600 * 24 * 30, // for one month
            path: "/",
            secure: true, 
            sameSite: true,  // in production the back-end and front-end must be in same domain (some browsers don't allow third party cookies)
        }
    }
    else if(process.env.NODE_ENV === "testing"){
        return{
            maxAge: 1000 * 3600 * 24 * 30, // for one month
            path: "/",
            secure: true, 
            sameSite: false, 
        }
    }
    else{
        return{
            maxAge: 1000 * 3600 * 24 * 30, // for one month
            path: "/",
            secure: false,
            sameSite: "none",
        }
    }
}