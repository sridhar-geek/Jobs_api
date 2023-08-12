const getAllJobs = async ( req, res ) => {
    res.send("getting all jobs for you")
}

const getJob = async ( req, res ) => {
    res.send("getting single jobs for you")
}

const createJob = async ( req, res ) => {
    res.send("creating job for you")
}

const updateJob = async ( req, res ) => {
    res.send("update the job for you")
}


const deleteJob = async ( req, res ) => {
    res.send("delete the current job")
}


module.exports ={
    createJob,
    getAllJobs,
    getJob,
    deleteJob,
    updateJob
}