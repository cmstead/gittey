# Gittey #

Gittey is a Git tool to help simplify the task of unifying a team git strategy. The vision of this tool is to augment the Git work done at the command line, rather than simply wrapping it.

## Installation ##

Make sure you have Node.js installed, and run the following command:

```
npm install -g gittey
```

## Setup ##

After Gittey is installed, run the following command in a project to add a Gittey configuration:

```
gittey --configure-branch-annotations
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
- [ ] Custom git aliases
    - [x] Runnable aliases with `gittey --aliasName`
    - [ ] Add new aliases via command line
    - [ ] Remove aliases via command line
- [ ] Configuration
    - [ ] Check if there is a newer version on run
    - [x] Configure branch prefix annotations
    - [x] Configure commit prefix annotations
    - [x] Reset Gittey configuration
    - [x] Project init
- [x] Help/Man information

## CLI Options ##

Current options at the command line for Gittey:

- `--branch-prefixes` - Display branch prefixes and descriptions
- `--commit` - Create a new branch using defined configuration
- `--commit-prefixes` - Display commit prefixes and descriptions
- `--configure-branch-annotations` - Create branch annotation prefixes
- `--configure-commit-annotations` - Create commit annotation prefixes
- `--delete-branch` - Delete a branch
- `-h`, `--help` - Display help info
- `--init` - Initialize Gittey configuration in your project
- `--new-branch` - Create a new branch using defined configuration
- `--prune-branches` - Menued branch cleanup
- `--reset-configuration` - Reset configuration to default settings
- `--update-current-branch` - Update current branch with remote trunk changes
- `-v`, `--version` - Display current version