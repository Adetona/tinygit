var inquirer = require('inquirer');
const storage = require('node-persist');
const { repoName, branchName, gitService, githubUserName} = require('../utils/exec')
const axios = require('axios')
const emoji = require('node-emoji');
var keychain = require('keychain');
const keytar = require('keytar')
var osType = process.platform;

async function config(res, args){
  
    let values = args._optionValues
  
    if (Object.keys(values).length < 1){
        console.log("Please specify the right provider's name. eg: tinygit config -github <token> or  tinygit config -gitlab <token>")
       
    }
   

    if (args._optionValues.Gitlab){

        if (args._optionValues.Gitlab == true) {
            console.log('Please add your Gitlab access token. Create token here: https://gitlab.com/-/profile/personal_access_tokens')
        } else {    
           
            if (osType == "darwin"){
                await keytar.setPassword("tinygitlab", "tinygitlab", args._optionValues.Gitlab)
                console.log(`Gitlab token successfully saved. Tinygit is ready for use ${emoji.get('rocket')}`) 
              
            }else{
                await storage.init( /* options ... */)
                await storage.setItem('tinygitlab', args._optionValues.Gitlab)
                console.log(`Gitlab token successfully saved. Tinygit is ready for use ${emoji.get('rocket')}`) 
            }
            
        }

    }
      
      
    if (args._optionValues.Github){
      
        if (args._optionValues.Github == true) {
            console.log('Please add your Gitlab access token. Create token here: https://gitlab.com/-/profile/personal_access_tokens')
        }else{

           
            if (osType == "darwin") {
                await keytar.setPassword("tinygithub", "tinygithub", args._optionValues.Github)
                console.log(`Github token successfully saved. Tinygit is ready for use ${emoji.get('rocket')}`) 
            } else {
                await storage.init( /* options ... */)
                await storage.setItem('tinygithub', args._optionValues.Github)
                console.log(`Github token successfully saved. Tinygit is ready for use ${emoji.get('rocket')}`) 
            }
           
         
            

        }

    }
        
}


async function prService(res, args) {

    let gitServiceName = await gitService()
 
    if (gitServiceName.stdout){
     if(gitServiceName.stdout.includes("gitlab")){
         console.log('Preparing your PR...')
      
         let gitlabBranchName = await branchName()
         gitlabBranchName = gitlabBranchName.resBranchName.stdout

         let gitRepoName = await repoName()         
         gitRepoName = gitRepoName.resRepoName.stdout; 

        var token = null; 
       
         if (osType == "darwin") {
           token =  await keytar.getPassword("tinygitlab", "tinygitlab")
         }else{
             await storage.init( /* options ... */)
              token = await storage.getItem('gitlab')
         }
        
        
         let repoId = await projectId(token, gitRepoName)

     

         var data = {
             "source_branch": gitlabBranchName.trim(),
             "target_branch": args._optionValues.Branch,
             "title": args._optionValues.Title
         }

        let pr = await gitlabPr(token, repoId, data)
       
         
         if (pr.response && pr.response.status == 409){
             console.log("ooops! PR already exist or you are making a PR to a non-existent branch. Please check and try again")   
         }else{
           
             if(pr.data){
                 console.log(`Your PR is ready ${emoji.get('fire')} ${emoji.get('fire')}`)
                 console.log("")
                 console.log('Pull Request link:')
                 console.log("")
                 console.log(pr.data.web_url)
                 console.log("") 
             }
         }
    
      
     }

    if (gitServiceName.stdout.includes("github")) {
        console.log('Preparing your PR...')
        let gitRepoName = await repoName()
        gitRepoName = gitRepoName.resRepoName.stdout;
        
        var gitBbranchName = await branchName()

        var githubToken = null;
        if (osType == "darwin") {
            githubToken = await keytar.getPassword("tinygithub", "tinygithub")
        } else {
            await storage.init( /* options ... */)
            githubToken = await storage.getItem('gitlab')
        }

       
        
        var githubData = {          
            "head": gitBbranchName.resBranchName.stdout.trim(),
            "base": args._optionValues.Branch,
            "title": args._optionValues.Title
        }
    
        let githubPR = await githubPr(githubToken, gitRepoName, githubData)
       
        if (githubPR.data && githubPR.data.html_url){
            console.log(`Your PR is ready ${emoji.get('fire')} ${emoji.get('fire')}`)
            console.log("")
            console.log('Pull Request link:')
            console.log("")
            console.log(githubPR.data.html_url)
            console.log("") 
        }else{

            if (githubPR.response.status == 401){
                console.log('You have wrong token or token has expired. Create a token here: https://github.com/settings/tokens')
            }
            if (githubPR.response.status == 422){         
                console.log("ooops! PR already exist or you are making a PR to a non-existent branch. Please check and try again")
              
            }
           
           
        }
       

    }

    }else{ 
        console.log('You are running this command inside a directory that has no git repo. Please check and try again')
    }
}


async function projectId(token, gitRepoName) {
  
    try {     
        const response = await axios.get(`https://gitlab.com/api/v4/projects?search=${gitRepoName}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
     
     var searchIds = response.data.map(function (x) {
         var y;
            if (x.name == gitRepoName.trim()){            
             y = x
             
            }         
        return y
    
        });

        var gitlabProjectId = searchIds.filter(item => item);

       
        return gitlabProjectId[0].id
    } catch (error) {
        //console.error(error);
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
      //  console.log('error', error.response.data.error)
        return error
    }

  
}


async function githubPr(token, gitRepoName, data) {

    try {
        var githubUserName1 = await githubUserName()
       
        
        const url1 = `https://api.github.com/repos/${githubUserName1.stdout.trim()}/${gitRepoName.trim()}/pulls`
        const gitPr = await axios.post(url1, data, {
            headers: {
                "Authorization": `token ${token}`
            }
        })

        return gitPr
    } catch (error) {
        return error
    }


}


module.exports.config = config
module.exports.prService = prService
