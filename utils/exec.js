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
var gitService = async function seviceName(){
    const resGitService = await exec('git config --get remote.origin.url')
    return resGitService; 
}

module.exports.repoName = repoName
module.exports.branchName = branchName
module.exports.gitService = gitService
