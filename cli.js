#!/usr/bin/env node

/*  Gh-Packages
 *  Like `gh-pages` but for packages!
 *  Thank you for checking out the source code!
 *  For the code to eternal life, please visit: https://codeforfaith.com
 *
 *  IMPORTS: import dependencies and modules
 *  ENVIRONEMENT CHECKS: check if the project can run Gh-Packages successfully
 *  INITIALIZATION: initialize variables, get the user's arguments
 *  EXECUTION: publish the package
 * */

// IMPORTS
const shell = require("shelljs");
const yargs = require("yargs");

// ENVIRONEMENT CHECKS
// test for missing dependencies
// git
if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

// test if `git init` has been run
if (!shell.test("-d", ".git")) {
  shell.echo("Please first run the command `git init` in this directory");
  shell.exit(1);
}

// npm
// test if `npm init` has been run (look for package.json)


// INITIALIZATION
// init argv: argv is going to store all the user's input
// the following block creates argv and initializes the `--help` flag
// input that isn't using an option will be stored in argv._ as an array
const argv = yargs
  .usage("gh-packages [patch|minor|major] [-c|--command]")
  .options({
    c: {
      type: "string",
      alias: "command",
      default: null,
      describe:
        'Custom user Bash command\nExample: gh-packages -c "rm -r docs"',
    },
  })
  .example(
    "gh-packages",
    "This will publish your package with a patch version bump"
  )
  .example(
    `gh-packages minor -c "echo 'custom command'"`,
    "This will publish your package with a miror bump and print out 'custom command' in the terminal"
  ).argv;

// get user's arguments
// update: patch, minor or major
const validUpdateTypes = ["patch", "minor", "major"];
// if no argument given by user, default to 'patch'
let updateType = argv._[0] || validUpdateTypes[0];

// if user given updateType not in validUpdateTypes, display error and exit
if (!validUpdateTypes.includes(updateType)) {
  shell.echo(
    " Update package accepted values: patch, minor, major.\n",
    "If blank, defaults to patch."
  );
  shell.exit(1);
}

// command: what will be executed on the new branch, before package publication
// if -c or --command flags are used, put them in the `userCommand` variable
let userCommand = null;

if (argv.c || argv.command) {
  userCommand = argv.c || argv.command;
}

// EXECUTION
// update version number
shell.exec(`npm version --no-git-tag-version ${updateType}`);
// git add package.json with new package version number
shell.exec(`git add package.json`);
// git commit mesasge update version number
shell.exec(`git commit -m \"update version number\"`);
// // push updated package.json
// shell.exec(`git push`);
// switch to gh-packages branch, create it if it does not exist
shell.exec(`git switch -C gh-packages`);
// run user command
if (userCommand) {
  shell.exec(userCommand);
}
// commit user modifications
shell.exec(`git add -A && git commit -m \"ready to publish\"`);
// push package to gh-packages branch
shell.exec(`git push -f origin gh-packages`);
// publish package
shell.exec(`npm publish`);
// switch back to previous branch
shell.exec(`git switch -`);
