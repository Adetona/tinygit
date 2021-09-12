const axios = require('axios')
const { promisify } = require('util');
const { getRepoName, branchName} = require('./utils/exec')
const storage = require('node-persist');




//var createMR = async function all(req, res, next) {
module.exports.createMR = async function createMR(req, res) {
  
  await storage.init( /* options ... */)
  const token = await storage.getItem('token')
  /*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*/ 
  var id = "27484086";

  let repoName = await getRepoName()
  //console.log('parse rep', repoName)
  //repoName.repoName.stdout.trim(), This is for getting Project ID
let projectName = repoName.repoName.stdout.trim()
  
  async function projectId() {
    try {
      const response = await axios.get(`https://gitlab.com/api/v4/projects?search=${projectName}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return response 
    } catch (error) {
      console.error(error);
    }
  }

  let repoId = await projectId()
  repoId = repoId.data[0].id
  



  const url = `https://gitlab.com/api/v4/projects/${repoId}/merge_requests`

  

 let getbranchName = await branchName()
 
   const data = {
    "source_branch": getbranchName.resBranchName.stdout.trim(),
    "target_branch": "main",
    "title": "Talazo extension", 
    "description": "whatever"
  }

  axios.post(url, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((response) => {
     // console.log('777', response);
      res.json({ data: response.data })

    }, (error) => {
      let errMessage = error.response
       console.log('errx', errMessage.data)
      res.json({ status: errMessage.status, message: errMessage.data.message[0] })

    });
 
};

