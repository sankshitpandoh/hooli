let host = `${window.location.origin}`;
if(!host.endsWith("/")){
    host = `${host}/`;
}

let end_points = {
    login: `/api/login/user`,
    superLogin: `/login/super`,
    logOut: `/user/logout`
}

module.exports = {
    end_points: end_points
}