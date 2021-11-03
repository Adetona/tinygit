# tinygit - tinygit is the fastest way to make PR via CLI. 

tinygit is a CLI tool for making pull request from your command line instead of visiting gitlab or github web interface.

## Installing

```sh
npm install tinygit -g
```

## Requirements

  - Git installed.
  - Node and NPM installed.
  
## How to configure

Once tinygit is successfully installed globally. Github and Gitlab require tokens to make a successful pull request.  

`Github`: You can generate a github token from this link: https://github.com/settings/tokens

`Gitlab`: You can generate a gitlab token from this link:  https://gitlab.com/-/profile/personal_access_tokens



## MacOs setup 

You can run the command from any terminal on your mac to set up the service. 

*github:*

```sh
tinygit config -github <token>
```

example:

```sh
tinygit config -github tokenhere
```

*gitlab:* 

```sh
tinygit config -gitlab <token>
```

example:

```sh
tinygit config -gitlab tokenhere
```

*ps:* 

a. All tokens are stored on your Mac's system keychain.

b. You can delete/update a token with the commands above.

## Windows setup

Unlike MacOs, you'd have to `cd` to the project repo to add a token. It has to be done every time you have a new repo. I wish there is a keychain(?) alternative for windows. If you know of a way to handle this for windows, please reach out - abiodun0x@gmail.com

 
## How to make PR

**step 1:**

`cd` to the directory where your repo resides. 

**step 2:** 

```sh
tinygit pr -b "branchname" -t "title of the PR"
```

*a longer command:*

```sh
tinygit pr -branch "branchname" -title "title of the PR"
```

`branch` - The branch you want to merge to. e.g: main, master etc

`title` - The title of the PR.  


It will generate a PR link for you if everything is OK. 

*****

if you found any issue or any suggestions, reach out here - abiodun0x@gmail.com


