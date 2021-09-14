var inquirer = require('inquirer');
const storage = require('node-persist');
const {repoName, branchName, gitService} = require('../utils/exec')
const axios = require('axios')
const emoji = require('node-emoji');

async function config(res, args){
  
    let values = args._optionValues
  
    if (Object.keys(values).length < 1){
        console.log("Please specify the right provider's name. eg: tinygit config -github <token> or  tinygit config -gitlab <token>")
       
    }
 
    if (args._optionValues.Gitlab){

        if (args._optionValues.Gitlab == true) {
            console.log('Please add your Gitlab access token. Create token here: https://gitlab.com/-/profile/personal_access_tokens')
        } else {    
            await storage.init( /* options ... */)
            await storage.setItem('gitlab', args._optionValues.Gitlab)
            console.log('Gitlab token successfully saved!')
        }

    }
      
      
    if (args._optionValues.Github){
      
        if (args._optionValues.Github == true) {
            console.log('Please add your Gitlab access token. Create token here: https://gitlab.com/-/profile/personal_access_tokens')
        }else{
            console.log('ddd', args._optionValues.Github)
            await storage.init( /* options ... */)
            await storage.setItem('github', args._optionValues.Github)
            console.log("")
            console.log(`Github token successfully saved!. Tinygit is ready for use ${emoji.get('rocket')}`) 
            console.log("")
            console.log("Create PR with this command:")
            console.log("")
            console.log("tinygit pr -b <branch> -t <PR title> -d <PR description>")
            console.log("")
            

        }

    }
        
}


async function prService(res, args) {

    let gitServiceName = await gitService()
    
     if(gitServiceName.stdout.includes("gitlab")){
      
         let gitBbranchName = await branchName()
         let gitRepoName = await repoName()         
         gitRepoName = gitRepoName.resRepoName.stdout; 
         gitBbranchName = gitBbranchName.resBranchName.stdout
         await storage.init( /* options ... */)
         const token = await storage.getItem('gitlab')
  
         let repoId = await projectId(token, gitRepoName)

        // console.log('getreponame', gitRepoName)
//console.log('repoxx', repoId)
     

         const data = {
             "source_branch": gitBbranchName.trim(),
             "target_branch": args._optionValues.Branch,
             "title": args._optionValues.Title
             //"description": args._optionValues.description
         }

        let pr = await gitlabPr(token, repoId, data)
       
         console.log(`Your PR is ready ${emoji.get('fire')} ${emoji.get('fire')}`)
         console.log("") 
         console.log('Pull Request link:')
         console.log("")
         console.log (pr.data.web_url)
         console.log("") 
      
     }

    if (gitServiceName.stdout.includes("github")) {

        var gitBbranchName = await branchName()
        await storage.init( /* options ... */)
        const githubToken = await storage.getItem('github')
       // console.log('brc', args._optionValues.t)
        let data = { 
            
            "head": "dev-test",
            "base": "main",
            "title": "PR master"
    
        }
    
        let githubPR = await githubPr(githubToken, data)
       // console.log('github', githubPR.data.html_url)

        console.log(`Your PR is ready ${emoji.get('fire')} ${emoji.get('fire')}`)
        console.log("")
        console.log('Pull Request link:')
        console.log("")
        console.log(githubPR)
        console.log("") 

    }


}


async function projectId(token, gitRepoName) {
  
    try {     
        const response = await axios.get(`https://gitlab.com/api/v4/projects?search=${gitRepoName}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
     
     var ID = response.data.map(function (x) {
         var y;
            if (x.name == gitRepoName.trim()){
                
             y = x
             
            }
            
        return y
    
        });

        var ID2 = ID.map(function (x1) {
           // console.log('x11', x1)
            var hj;
           if(x1 && x1 != ""){
              // console.log("xcov", x1)
                hj = x1.id
           }

           return hj; 

        });

       // var j = ID.filter(item => item);
        //console.log('jkh', j[0].id)
       // console.log('rrr1', ID2)
        var j = ID.filter(item => item);

       // console.log('uycs1', j[0].id)
        return j[0].id
    } catch (error) {
        console.error(error);
    }
}


async function gitlabPr(token, repoId, data){

    try {
        const url1 = `https://gitlab.com/api/v4/projects/${repoId}/merge_requests`
        const gitPr = await axios.post(url1, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
     
        return gitPr
    } catch (error) {
      //  console.log('rxt', error)
      //  console.log('error', error.response.data.error)
        return error
    }

  
}


async function githubPr(token, data) {

    try {
       
       
        const url1 = `https://api.github.com/repos/Adetona/tinygit/pulls`
        const gitPr = await axios.post(url1, data, {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        console.log('gitpr', gitPr)

        return gitPr
    } catch (error) {
       
        //  console.log('error', error.response.data.error)
        return error
    }


}


module.exports.config = config
module.exports.prService = prService
