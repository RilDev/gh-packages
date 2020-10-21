# gh-packages

_Like `gh-pages` but for packages!_

Publish your packages to NPM with one command.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
  - [Version Number Update](#version-number-update)
  - [User Command](#user-command)
- [Package.JSON Configuration](#packagejson-configuration)
  - [Basic Configuration](#basic-configuration)
  - [Intermediate Configuration](#intermediate-configuration)
  - [Advanced Configuration](#advanced-configuration)
- [Feature Request & Improvement](#feature-request--improvement)
- [Thanks](#thanks)
- [Todo](#todo)

## Installation

```
npm i gh-packages -D
```

In order to always have the latest version, you can run `gh-pages` with `npx`. It will run it without installing it on your machine.

```
npx gh-packages
```

If you choose to do it this way, remember to always add `npx` in front of every `gh-packages` commends.

## Usage

To publish your package to NPM simply run `gh-packages` inside your package's directory:

```
cd your-package
gh-packages
```

This command will patch your version number in your package.json, commit it and push it. It will then create a branch gh-packages and publish it to NPM. And finally, switch you back to you original branch.

This is what the log will look like:

```
rildev@WorkStation:~/Projects/gh-packages$ gh-packages
v0.0.3
[master 3c14106] update version number
 1 file changed, 1 insertion(+), 1 deletion(-)
 To github.com:RilDev/gh-packages.git
    1723500..3c14106  master -> master
    Switched to a new branch 'gh-packages'
    [gh-packages a00c88e] ready to publish
     2 files changed, 10 insertions(+), 9 deletions(-)
     remote:
     remote: Create a pull request for 'gh-packages' on GitHub by visiting:
     remote:      https://github.com/RilDev/gh-packages/pull/new/gh-packages
     remote:
     To github.com:RilDev/gh-packages.git
      * [new branch]      gh-packages -> gh-packages
      * npm notice
      * npm notice 📦  gh-packages@0.0.3
      * npm notice === Tarball Contents ===
      * npm notice 1.6kB cli.js
      * npm notice 597B  package.json
      * npm notice 646B  readme.md
      * npm notice === Tarball Details ===
      * npm notice name:          gh-packages
      * npm notice version:       0.0.3
      * npm notice package size:  1.4 kB
      * npm notice unpacked size: 2.8 kB
      * npm notice shasum:        6fd79be1b85ebb3e1d63f7496785b720e490853c
      * npm notice integrity:     sha512-38vwHPK66RdD0[...]8/U0PF4+xv6Ow==
      * npm notice total files:   3
      * npm notice
      * + gh-packages@0.0.3
      * Your branch is up to date with 'origin/master'.
      * Switched to branch 'master'
```

_Note: If you don't have an NPM account yet, you can create one here: [create NPM account](https://www.npmjs.com/signup)_

### Options

```
gh-packages [patch|minor|major] [-c|--command]
```

#### Version Number Update:

With `gh-packages` you can choose how the version number will be updated: patch, minor or major.

You can read about semantic versioning here: [semver.org](https://semver.org/)

__Patch Update:__ A patch is used to indicate a small change like a bug fix or an improvement to the documentation. For instance, assuming the current version is `0.0.3`, if I update the `readme.md` file, I will do a patch update. The new version would be `0.0.4`.

By default, `gh-packages` will perform a patch update.

```
gh-packages
```

or

```
gh-packages patch
```

__Minor Update:__ A minor update indicates a new functionality, like a new option for a CLI for example. If the version number was `0.0.3` before the minor update, it will become `0.1.0`.

```
gh-packages minor
```

__Major Update:__ A major update is a new functionality that will break existing functionalities. If you decide to rename options or that you remove an option, then it would be a major update. If the version number was `0.0.3` before the update, it will become `1.0.0`.

```
gh-packages major
```

#### User Command:

It is possible to define a `bash` command by using the `--command` or `-c` flag that will be executed on the `gh-packages` branch.

```
gh-packages -c 'rm -r docs && mv styles.css styles.min.css'
```

This functionality makes it a breeze to `rename` files and to `delete` unnecessary code. Making the package bundle smaller.

### Package.JSON Configuration

After you are done experimenting with the command line, it is good to parameter permanently your options in the `package.json` file.

#### Basic Configuration

You can add a new script to the `package.json` file this way:

```
"scripts": {
  ...,
  "package": "gh-packages"
}
```

__Note:__ Don't forget to add a comma `,` at the end of the previous line. It is a common cause of error when editing `package.json` files.

You can now run the command `npm run package` to publish a `patch` of your package.

#### Intermediate Configuration

As you will need more control over your command, namely to specify the update type and add a custom command, you can add this line to the `scripts` in your `package.json` file.

```
"scripts": {
  ...,
  "package": "gh-packages ${VERSION-patch} --command \"echo 'custom command'\""
}
```

You can run the command in two ways: with or without variables.

```
npm run package
```

This will publish your package on NPM with as a `patch` update.

__Note:__ The `--command` argument will be executed on the `gh-packages` auto-generated branch before being pushed on your repository and published on NPM.

```
VERSION=major npm run package
```

This command, on top of running you custom command will publish you package to NPM as a `major` update. You can swap the word `major` with `minor` or `patch` as needed.

You can also change the `${VERSION-patch}` to `${VERSION-minor}` to change the default package publication from `patch` to `minor`.

#### Advanced Configuration

In this section, we will be looking at the package name itself and how to publish your package directly on GitHub.

__Package Name:__

The `name` in your `package.json` will determine your package's name. You have to options here: use a simple name that hasn't been taken by another project. Or put it under an account name such as `@username/your-package-name`.

```
"name": "your-package-name",
```

This will set your package name to `your-package-name`. 

After it is published, your package will be downloadable with `npm install your-package-name`.

```
"name": "@username/your-package-name",
```
In case the name you chose has already been taken or is too close to another package name (yes, you will be blocked from even publishing it), you can publish it under a GitHub account name.

It can also be good for organizations that would like to keep there packages tidy all in one place.

After it is published, your package will be available with `npm install @username/your-package-name`.

__Publishing on GitHub:__

If you want to publish your package to NPM, you don't have anything to do.

[GitHub acquired NPM in 2020](https://github.blog/2020-04-15-npm-has-joined-github/). So if you want, you can publish your package on Github instead of NPM. I would __not__ recommend you to do so because I had issues with it. When I tried to publish my package on Github, it ended-up not showing on my NPM account and not being searchable on [npmjs.com](npmjs.com). However, it is downloadable via `npm i package-name`. If you've had more success than me with this, please open an issue to let me know.

For more information please head to the [Official GitHub Documentation: Configuring npm for use with GitHub Packages](https://docs.github.com/en/free-pro-team@latest/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)

## Feature Request & Improvement

Would you like a new feature? [Open an issue here!](https://github.com/RilDev/gh-packages/issues)

Found a typo or would like to improve the docs? [Open a PR here!](https://github.com/RilDev/gh-packages/pulls)

## Thanks

Thanks to [Rubens Mariuzzo](https://medium.com/@rmariuzzo) for his [Guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e).

Thanks to [Nate Fischer](https://github.com/nfischer) for his [ShellJS](https://github.com/shelljs/shelljs) package.

Thanks to the people working on the [yargs](https://github.com/yargs/yargs) project.

## Todo

- [ ] add `--help` and `-h` option
- [ ] add `--platform` and `-p` option to choose to publish on NPM or on GitHub
- [ ] publish to other platforms as well. ex: docker, maven, nuget, rubygems, pypi...
- [ ] name branches differently in case user wants to upload his package on multiple platforms. ex: gh-packages-npm, gh-packages-pypi...
- [ ] check how does NPM parse/updates files
- [ ] add info message on top of README.md to ask for feedback/feature request
- [ ] add docsify documentation
- [ ] add docsify to thanks section
- [ ] test code. get at least 80% code coverage.
- [ ] comment code well
- [ ] refactor code
- [ ] remove automatic push of `package.json` on master
- [ ] do one-line commit in `package.json` of the `"version"` line, complete with version number
- [ ] refactor `README` to make it a 30 second read
- [ ] create a wiki to explain all aspects of the project
- [ ] when pass invalide version bump, exit(1)
