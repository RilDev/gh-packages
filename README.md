# gh-packages

_Like `gh-pages` but for packages!_

Publish your packages to NPM with one command.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
  - [Version Number Update](#version-number-update%3A)
  - [User Command](#user-command%3A)
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

If you choose to do it this way, remember to always add `npx` in front of every `gh-packages` commandes.

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

__Patch Update:__ A patch is used to indicate a small change like a bug fix or an improvement to the documentation. For instance, asuming the current version is `0.0.3`, if I update the `readme.md` file, I will do a patch update. The new version would be `0.0.4`.

By default, `gh-packages` will perform a pacth update.

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

It is possible to define a `bash` command by using the `--command` or `-c` flag that will be executed on the `packages` branch.

```
gh-packages -c 'rm -r docs && mv styles.css styles.min.css'
```

This functionality makes it a breeze to `rename` files and to `delete` unnecessary code. Making the package bundle smaller.

## Thanks

Thanks to [Rubens Mariuzzo](https://medium.com/@rmariuzzo) for his [Guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e).

Thanks to [Nate Fischer](https://github.com/nfischer) for his [ShellJS](https://github.com/shelljs/shelljs) package.

Thanks to the people working on the [yargs](https://github.com/yargs/yargs) project.

## Todo

- [x] Finish the `readme.md`
- [ ] add test to know if `git init` has been run in the directory
- [x] add user custom command option `-c` or `--command`
- [x] add tags in GitHub repo
- [ ] add `--help` and `-h` option
- [ ] add package.json implementation example `"package": "gh-packages"`
- [ ] add `VERSION=major COMMAND="mv cli.js index.js && rm .gitignore" npm package` example
