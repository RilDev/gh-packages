#!/usr/bin/env node
//import utils
const shell = require('shelljs');
const { argv } = require('yargs');

//get args
//update: patch, minor or major
let updateType = null;
switch (argv._[0]) {
  case undefined:
  case 'patch':
    updateType = 'patch';
    break;
  case 'minor':
    updateType = 'minor';
    break;
  case 'major':
    updateType = 'major';
    break;
  default:
    updateType = null;
}

//test for error in updateType input
if (!updateType) {
  shell.echo(
    ' Update package accepted values: patch, minor, major.\n',
    'If blank, defaults to patch.',
  );
  shell.exit(1);
}

//test for missing dependencies
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
// test if `git init` has been run

//main
//update version number
shell.exec(`npm version --no-git-tag-version ${updateType}`);
//git add package.json with new package version number
shell.exec(`git add package.json`);
//git commit mesasge update version number
shell.exec(`git commit -m \"update version number\"`);
//push updated package.json
shell.exec(`git push`);
//switch to gh-packages branch, create it if it does not exist
shell.exec(`git switch -C gh-packages`);
//run user command
//commit user modifications
shell.exec(`git add -A && git commit -m \"ready to publish\"`);
//push package to gh-packages branch
shell.exec(`git push -f origin gh-packages`);
//publish package
shell.exec(`npm publish`);
//switch back to previous branch
shell.exec(`git switch -`);
