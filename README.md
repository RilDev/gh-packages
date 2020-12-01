# gh-packages

![GitHub last commit](https://img.shields.io/github/last-commit/rildev/gh-packages?style=flat-square)

_Like `gh-pages` but for packages!_

Publish your packages to NPM with one command: `gh-packages`

![gh-packages: How It Works](gh-packages-how-it-works.gif)

## Table of Contents

- [How Does It Work?](#how-does-it-work)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
  - [Version Number Update](#version-number-update)
  - [User Command](#user-command)
- [Package.JSON Configuration](#packagejson-configuration)
- [Documentation](#documentation)
- [Feature Request & Improvement](#feature-request--improvement)
- [Thanks](#thanks)
- [Todo](#todo)

## How Does It Work?

`gh-packages` will automatically create a new branch `gh-packages` with a copy of you project and publish it on NPM.

You can execute a custom command before publishing your package by using the `-c` or `--command` flag: `gh-packages -c "<custom bash command>"`

## Installation

```
npm i -g gh-packages
```

_Note: It is also possible to use [npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) to install `gh-packages`. For more information: [install with npx](https://github.com/RilDev/gh-packages/wiki/3.-Installation#run-gh-packages-with-npx)_

## Usage

To publish your package to NPM simply run `gh-packages` inside your package's directory:

```
cd your-package
gh-packages
```

_Note: If you don't have an NPM account yet, you can create one here: [create NPM account](https://www.npmjs.com/signup)_

_Note 2: Make sure you run `npm login`, `npm init` and `git init` in `your-package`'s directory. For more information, please read the documentation: [Getting Started](https://github.com/RilDev/gh-packages/wiki/1.-Getting-Started)_

## Options

```
gh-packages [patch|minor|major] [-c|--command]
```

### Version Number Update:

__Patch Update (0.0.X):__ `gh-packages` or `gh-packages patch`

__Minor Update (0.X.0):__ `gh-packages minor`

__Major Update (X.0.0):__ `gh-packages major`

_You can read about semantic versioning here: [semver.org](https://semver.org/)_

### User Command:

It is possible to define a `bash` command by using the `--command` or `-c` flag that will be executed on the `gh-packages` branch.

```
gh-packages -c "<custom bash command>"
```

This command will be run on the `gh-packages` branch before the package's publication.

### Package.JSON Configuration

After you are done experimenting with the command line, it is good to parameter permanently your options in the `package.json` file.


```
"scripts": {
  ...,
  "package": "gh-packages ${VERSION-patch} --command \"echo 'custom command'\""
}
```
_Note: Don't forget to add a comma `,` at the end of the previous line. It is a common cause of error when editing `package.json` files._

__You can run the command in two ways:__

```
npm run package
```

This will run your custom command and publish your package on NPM with as a `patch` update.

```
VERSION=major npm run package
```

This command, on top of running you custom command will publish you package to NPM as a `major` update. You can swap the word `major` with `minor` or `patch` as needed.

_Note: You can also change the `${VERSION-patch}` to `${VERSION-minor}` to change the default package publication from `patch` to `minor`._

## Documentation

For more information and advanced examples, please visit the [documentation page](https://github.com/RilDev/gh-packages/wiki).
## Feature Request & Improvement

Would you like a new feature? [Open an issue here!](https://github.com/RilDev/gh-packages/issues)

Found a typo or would like to improve the docs? [Open a PR here!](https://github.com/RilDev/gh-packages/pulls)

## Thanks

Thanks to [Rubens Mariuzzo](https://medium.com/@rmariuzzo) for his [Guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e).

Thanks to [Nate Fischer](https://github.com/nfischer) for his [ShellJS](https://github.com/shelljs/shelljs) package.

Thanks to the people working on the [yargs](https://github.com/yargs/yargs) project.

## Todo

- [x] add gif to show project's workflow
- [x] check if `npm` is installed
- [x] check if `npm init` was run in the directory
- [ ] allow the use of `gh-packages --help` even if not in a `git` directory
- [ ] add a link to [https://www.npmjs.com/package/gh-packages](https://www.npmjs.com/package/gh-packages) in the `--help` menu
- [ ] add hyper-links to documentation in error messages with [terminal-link](https://github.com/sindresorhus/terminal-link)
- [ ] add `terminal-link` in the Thanks section
- [ ] create a wiki to explain all aspects of the project
- [ ] add example page to wiki (mv, rm, rm -r, rm all but specified files...)
- [ ] merge wiki `usage` and `options` pages together
- [ ] check all the wiki links
- [ ] test code. get at least 80% code coverage.
- [ ] do one-line commit in `package.json` of the `"version"` line, complete with version number
- [ ] add `--platform` and `-p` option to choose to publish on NPM or on GitHub
- [ ] publish to other platforms as well. ex: docker, maven, nuget, rubygems, pypi...
- [ ] name branches differently in case user wants to upload his package on multiple platforms. ex: gh-packages-npm, gh-packages-pypi...
- [ ] check how does NPM parse/updates files
- [ ] convert project to TypeScript
- [ ] add Rollup bundler
- [ ] run `gh-packages` to reduce bundle size
