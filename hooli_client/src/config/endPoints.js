let host = `${window.location.origin}`;
if(!host.endsWith("/")){
    host = `${host}/`;
}

let end_points = {
    login: `/api/login/user`,
    superLogin: `/api/login/super`,
    verifySession: `/api/login/verify`,
    logOut: `/api/login/logout`,
    uploadBulkPatients: `/api/patients/uploadBulk`,
    uploadSignlePatient: `/api/patients/uploadSingle`,
    getPatients: `/api/patients/getPatients`,
    deletePatient: `/api/patients/deletePatient`,
    getChartData: '/api/patients/getChartData'
}

module.exports = {
    end_points: end_points
}