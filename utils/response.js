
const response = async (res, data, message, status, totalCount) => {
    try {
        res.json({
            status_code: status ? status : 404,
            error: status == 200 ? false : true,
            message,
            data,
            totalCount: totalCount ? totalCount : undefined,
        })
    }
    catch(error) {
        res.json({
            status_code: 501,
            error: true,
            message: error.message
        })
    }
} 

module.exports = response;