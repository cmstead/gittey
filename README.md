# Gittey #

Customize your Git workflow.

Gittey is a tool to help you and your team customize your Git workflow to best match your day to day needs. Gittey comes with a number of tools out of the box, including branch, and commit prefix annotations and simplified branch management tools. Everything is configurable from the command line, and saved in a JSON configuration file. This means you can change your configuration in a text editor if you prefer!

Finally, you can easily extend the Gittey command set with custom aliases. Aliases can be raw CLI commands, or you can actually script your own workflow addition and fold it in with everything else with a simple alias.

## Installation ##

Make sure you have Node.js installed, and run the following command:

```
npm install -g gittey
```

## Setup ##

After Gittey is installed, run the following command in a project to add a Gittey configuration:

```
gittey --init
```

This will walk you though configuring branch annotations for Gittey and save a configuration file to your project. Be sure to commit the configuration so your team can use it too.

## Features ##

Coming and current features:

- [x] Branch annotations
    - [x] Branch prefixing
    - [x] Branch annotation key visualization
    - [x] Branch name validation
- [ ] Local branch tooling
    - [x] Easy single-branch delete
    - [x] Easy delete for multiple local branches (prune)
    - [x] Fetch latest master/main branch and update current branch
    - [x] Merge into current branch
    - [ ] Merge current branch into another
    - [ ] Merge current branch and another branch into a temp branch
- [x] Commit prefix annotations
    - [X] Check if changes have not been added, offer to add them
    - [x] Provide canned Arlo-style annotations
    - [x] Commit message annotation key visualization
    - [x] Custom commit annotation prefixing
- [x] Custom git aliases
    - [x] Runnable aliases with `gittey --aliasName`
    - [x] Add new aliases via command line
    - [x] Remove aliases via command line
- [ ] Configuration
    - [ ] Check if there is a newer version on run
    - [x] Configure branch prefix annotations
    - [x] Configure commit prefix annotations
    - [x] Reset Gittey configuration
    - [x] Project init
- [x] Help/Man information

## CLI Options ##

Current options at the command line for Gittey:

- `--add-alias` - Add a new user-configured command alias
- `--args` *string[]* - Arguments to supply to alias command
- `--branch-prefixes` - Display branch prefixes and descriptions
- `--commit` - Create a new branch using defined configuration
- `--commit-prefixes` - Display commit prefixes and descriptions
- `--configure-branch-annotations` - Create branch annotation prefixes
- `--configure-commit-annotations` - Create commit annotation prefixes
- `--delete-alias` - Delete a user-configured command alias
- `--delete-branch` - Delete a branch
- `-h`, `--help` - Display help info
- `--init` - Initialize Gittey configuration in your project
- `--merge-from-branch` - Merge another branch into current branch
- `--new-branch` - Create a new branch using defined configuration
- `--prune-branches` - Menued branch cleanup
- `--reset-configuration` - Reset configuration to default settings
- `--update` - Update to latest version
- `--update-current-branch` - Update current branch with remote trunk changes
- `-v`, `--version` - Display current version