import axios from "axios";
import {end_points} from '../config/endPoints';

const cleanUpdata = (dataArr) => {
    return new Promise ((resolve, reject) => {
        let finalRes = dataArr.filter((data, index) => {
            if (data) {
                if (data['First Name'] && data['Last Name'] && data['Address'] && data['Age'] && data['Hospital']) {
                    return data;
                } else {
                console.log("rejected entry at index because of missing / corrupt data", index);
                }
            } else {
                console.log("rejected entry at index", index);
            }
        });
        resolve({cleanData: finalRes})
    })
}

const uploadPatients = (data) => {
    return new Promise ((resolve, reject) => {
        try {
            let config = {
                headers: {
                    'Authorization': data.authToken || "",
                    'Content-type': 'application/json'
                }
            };
            axios.post(end_points.uploadBulkPatients, {
                data: data.dataArray
            }, config).then((res) => {
                if (res && res.status === 200 ) {
                    resolve({success: true});
                } else {
                    reject({success: false});
                }
            }).catch((err) => {
                console.log("Error in uploading data::::", err);
                reject({success: false});
            })
        } catch (err) {
            console.log("Error in uploading data::::", err);
            reject({success: false});
        }
    })
}

const getPatients = (data) => {
    return new Promise ((resolve, reject) => {
        try {
            let config = {
                headers: {
                    'Authorization': data.authToken || "",
                    'Content-type': 'application/json'
                }
            };
            axios.post(end_points.getPatients, {
                page: data.page
            }, config).then((res) => {
                if (res && res.status === 200 && res.data && res.data.usersList ) {
                    resolve({success: true, usersList: res.data.usersList, moreData: res.data.moreData || false});
                } else {
                    reject({success: false});
                }

            }).catch((err) => {
                console.log("Error in getting patients data::::", err);
                reject({success: false});
            })
        } catch (err) {
            console.log("Error in getting patients data::::", err);
            reject({success: false});
        }
    })
}

const deletePatient = (data, token) => {
    return new Promise ((resolve, reject) => {
        try {
            let config = {
                headers: {
                    'Authorization': token || "",
                    'Content-type': 'application/json'
                }
            };
            axios.post(end_points.deletePatient, {
                patientId: data
            }, config).then((res) => {
                if (res && res.status === 200  ) {
                    resolve({success: true});
                } else {
                    reject({success: false});
                }

            }).catch((err) => {
                console.log("Error in deleting patient::::::", err);
                reject({success: false});
            })
        } catch (err) {
            console.log("Error in deleting patient::::::", err);
            reject({success: false});
        }
    })
}

const chartData = (token) => {
    return new Promise ((resolve, reject) => {
        try {
            let config = {
                headers: {
                    'Authorization': token || "",
                    'Content-type': 'application/json'
                }
            };
            axios.post(end_points.getChartData,{}, config).then((res) => {
                if (res && res.status === 200 && res.data.ageData ) {
                    resolve(
                        {
                            success: true, 
                            ageData: res.data.ageData || [], 
                            modeOfPayment: res.data.modeOfPayment || [],
                            totalPatients: res.data.totalUsers,
                            totalMoney: res.data.totalMoney,
                        
                        });
                } else {
                    reject({success: false});
                }

            }).catch((err) => {
                console.log("Error in getting chart data::::::", err);
                reject({success: false});
            })
        } catch (err) {
            console.log("Error in getting chart data::::::", err);
            reject({success: false});
        }
    })
}

export {
    cleanUpdata,
    uploadPatients,
    getPatients,
    deletePatient,
    chartData

}
