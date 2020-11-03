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
    - [ ] Merge into current branch
    - [ ] Merge into another branch
    - [ ] Merge into new branch
- [ ] Commit prefix annotations
    - [X] Check if changes have not been added, offer to add them
    - [x] Provide canned Arlo-style annotations
    - [x] Commit message annotation key visualization
    - [ ] Custom commit annotation prefixing
- [ ] Custom git aliases
    - [ ] Runnable aliases with `gittey --run <aliasName>`
    - [ ] Add new aliases via command line
    - [ ] Remove aliases via command line
- [ ] Configuration
    - [x] Configure branch prefix annotations
    - [ ] Configure commit prefix annotations
    - [x] Reset Gittey configuration
    - [ ] Only reset branch annotation configuration
    - [ ] Only reset commit annotation configuration
- [x] Help/Man information

## CLI Options ##

Current options at the command line for Gittey:

 - `--configure-branch-annotations` - Create branch annotation prefixes
 - `--reset-configuration` - Reset configuration to default settings
 - `--delete-branch` - Delete a branch
 - `--prune-branches` - Menued branch cleanup
 - `--branch-prefixes` - Display branch prefixes and descriptions
 - `--commit-prefixes` - Display commit prefixes and descriptions
 - `--new-branch` - Create a new branch using defined configuration
 - `--commit` - Create a new branch using defined configuration
 - `-h, --help` - Display help info
 - `-v, --version` - Display current version