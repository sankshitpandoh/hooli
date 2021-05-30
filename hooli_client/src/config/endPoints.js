let host = `${window.location.origin}`;
if(!host.endsWith("/")){
    host = `${host}/`;
}

let end_points = {
    login: `/api/login/user`,
    superLogin: `/api/login/super`,
    verifySession: `/api/login/verify`,
    logOut: `/user/logout`,
    uploadBulkPatients: `/api/patients/uploadBulk`,
    uploadSignlePatient: `/api/patients/uploadSingle`,
    getPatients: `/api/patients/getPatients`
}

module.exports = {
    end_points: end_points
}