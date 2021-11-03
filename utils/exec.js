const { promisify } = require('util');
const exec = promisify(require('child_process').exec)


//get repository name
var repoName = async function getRepoName() {
    const resRepoName = await exec('basename $(git remote get-url origin) .git')
    return {resRepoName}
};

//get current branch name
var branchName = async function branchName(){
    const resBranchName = await exec('git rev-parse --abbrev-ref HEAD')
    return {resBranchName}
}

//get git service name
var gitService = async function serviceName(){
   try{
       const resGitService = await exec('git config --get remote.origin.url')
        return resGitService; 
    }catch(err){   
       return err     
    }
   
  
}

//get github repo username..
var githubUserName = async function githubUserName() {
    try {
        const resUserName = await exec('git ls-remote --get-url origin | cut -d@ -f1 | cut -d/ -f4')
        return resUserName;
    } catch (err) {
        return err
    }


}

module.exports = {
    repoName,
    branchName,
    gitService,
    githubUserName

}