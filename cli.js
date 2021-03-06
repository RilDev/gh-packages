#!/usr/bin/env node

/*  Gh-Packages
 *  Like `gh-pages` but for packages!
 *  Thank you for checking out the source code!
 *  For the code to eternal life, please visit: https://codeforfaith.com
 *
 *  IMPORTS: import dependencies and modules
 *  INITIALIZATION: initialize variables
 *  ENVIRONEMENT CHECKS: check if the project can run Gh-Packages successfully
 *  GET USER INPUT: get the user's arguments
 *  EXECUTION: publish the package
 * */

// IMPORTS
const shell = require("shelljs"); // allows to run shell commands with Javascript
const yargs = require("yargs"); // cli helper

// INITIALIZATION
// init linkTo: object containing all the clickable links
const linkTo = {
  npmPackagePage:
    "For more information: https://www.npmjs.com/package/gh-packages (Ctrl+click to open in browser)",
  wikiGettingStarted:
    "For more information: https://github.com/RilDev/gh-packages/wiki/1.-Getting-Started (Ctrl+click to open in browser)",
};

// init argv: argv is going to store all the user's input
// the following block creates argv and initializes the `--help` flag
// input that isn't using an option will be stored in argv._ as an array
const argv = yargs
  .usage(
    `gh-packages helps you to publish optimized packages in one command. ${linkTo.npmPackagePage}\n`
  )
  .usage("Usage: gh-packages [patch|minor|major] [-c|--command]")
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

// ENVIRONEMENT CHECKS
// if the user didn't run the `--help` flag, test for missing dependencies
if (!argv.help) {
  // git
  if (!shell.which("git")) {
    shell.echo(`Sorry, this script requires git. ${linkTo.wikiGettingStarted}`);
    shell.exit(1);
  }
  // test if `git init` has been run
  if (!shell.test("-d", ".git")) {
    shell.echo(
      `Please first run the command \`git init\` in this directory. ${linkTo.wikiGettingStarted}`
    );
    shell.exit(1);
  }

  // npm
  if (!shell.which("npm")) {
    shell.echo(`Sorry, this script requires npm. ${linkTo.wikiGettingStarted}`);
    shell.exit(1);
  }
  // test if `npm init` has been run (look for package.json)
  if (!shell.test("-f", "package.json")) {
    shell.echo(
      `Please first run the command \`npm init\` in this directory. ${linkTo.wikiGettingStarted}`
    );
    shell.exit(1);
  }
}

// GET USER INPUT
// Update: patch, minor or major
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

// Command: what will be executed on the new branch, before package publication
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
