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
- [ ] Local branch cleanup
    - [ ] Easy merge and delete of a branch
    - [ ] Easy delete for multiple local branches
- [ ] Commit prefix annotations
    - [x] Provide canned Arlo-style annotations
    - [x] Commit message annotation key visualization
    - [ ] Custom annotation prefixing
- [ ] Merge Helper
    - [ ] Merge into current branch
    - [ ] Merge into another branch
    - [ ] Merge into new branch
- [ ] Pre-hook hooks
    - [ ] Pre-push hook to allow actions which require a commit (e.g. version bumps)
    - [ ] Allow flag-driven hook disabling
- [ ] Configuration
    - [x] Configure branch prefix annotations
    - [x] Clear Gittey configuration
    - [ ] Configure commit prefix annotations
- [x] Help/Man information

## CLI Options ##

Current options at the command line for Gittey:

- `--configure-branch-annotations` - Configure branch prefix annotations
- `--clear-configuration` - Clear current configuration
- `--branch-prefixes` - Display a table of branch annotation prefixes and descriptions
- `--commit-prefixes` - Display a table of commit message annotation prefixes and descriptions
- `--new-branch` - Create a new branch using the annotation rules
- `--commit` - Create a new commit with an annotation for what was done
