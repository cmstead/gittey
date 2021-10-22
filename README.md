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
gittey init
```

This will walk you though configuring branch annotations for Gittey and save a configuration file to your project. Be sure to commit the configuration so your team can use it too.

## Example Configuration (Current Gittey gittey-config.json) ##

```json
{
    "branchPrefix": {
        "separator": "-",
        "validator": "",
        "prefixes": {
            "Bug": "Bug Fix",
            "Fea": "New Feature",
            "Ver": "New Version"
        }
    },
    "commitPrefix": {
        "separator": " ",
        "validator": ".{1,45}",
        "prefixes": {
            "F": "Feature (<= 8 LoC)",
            "B": "Bug fix (<= 8 LoC)",
            "R": "Test-supported Procedural Refactoring",
            "t": "Test only",
            "d": "Developer documentation (non-user facing)",
            "a": "Automated formatting / code generation",
            "r": "Provable (manual) refactoring",
            "c": "Comments (add/delete)",
            "e": "Environment (non-code) changes (for development)",
            "F!!": "Feature (> 8 LoC)",
            "B!!": "Bug fix (> 8 LoC)",
            "R!!": "Non-provable refactoring",
            "***": "Does not compile -- intermediate step"
        }
    },
    "aliases": [
        {
            "name": "update-branch",
            "command": "gittey update-current-branch",
            "description": "Pull changes from remote main and merge into current branch"
        },
        {
            "name": "push-main",
            "command": "git push origin main --tags",
            "description": "Push to main and include all commit tags"
        },
        {
            "name": "push",
            "command": "gittey commit; git push",
            "description": "Commit all outstanding changes and push to remote"
        },
        {
            "name": "pull",
            "command": "gittey commit; git pull",
            "description": "Commit all outstanding changes and pull from remote"
        },
        {
            "name": "publish-patch",
            "command": "gittey commit; npm version patch; npm publish; gittey push-main",
            "description": "Commit outstanding changes, bump patch version, publish, and push"
        },
        {
            "name": "publish-minor",
            "command": "gittey commit; npm version minor; npm publish; gittey push-main",
            "description": "Commit outstanding changes, bump minor version, publish, and push"
        },
        {
            "name": "publish-major",
            "command": "gittey commit; npm version major; npm publish; gittey push-main",
            "description": "Commit outstanding changes, bump major version, publish, and push"
        }
    ],
    "collaborators": []
}
```

## Fun Gittey Tricks ##

### Committing ###

- Commit messages do not require quotes for single line messages
- If you put quotes around your commit message, you can enter a multiline commit message, just like working in regular old Git

### Aliases ###

- Adding a `push` alias in the config file, you can add an auto-commit action which will save you from accidentally pushing without committing your latest files. It works like this:

```
"aliases": [
    {
        "name": "push",
        "command": "gittey commit; git push"
    }
]

// now you can run `gittey push` and it just works
```

- Adding a `pull` alias you can add a commit, then pull action:

```
"aliases": [
    {
        "name": "pull",
        "command": "gittey commit; git pull"
    }
]

// now you can run `gittey pull` and it just works
```

## Features ##

### Current Features ###

- Branch annotations
    - Branch prefixing
    - Branch annotation key visualization
    - Branch name validation
- Local branch tooling
    - Easy single-branch delete
    - Easy delete for multiple local branches (prune)
    - Fetch latest master/main branch and update current branch
    - Merge into current branch
    - Merge current branch into another
    - Merge current branch and another branch into a temp branch
- Commit prefix annotations
    - Check if changes have not been added, offer to add them
    - Provide canned Arlo-style annotations
    - Commit message annotation key visualization
    - Custom commit annotation prefixing
- Commit collaborators
    - Select all commit collaborators from list defined in `gittey-config.json`
- Custom git aliases
    - Runnable aliases with `gittey --aliasName`
    - Add new aliases via command line
    - Remove aliases via command line
- Configuration
    - Check if there is a newer version on run
    - Configure branch prefix annotations
    - Configure commit prefix annotations
    - Reset Gittey configuration
    - Project init
- Remote management
    - Add and remove remote references
    - Quickly list all remotes
- Help/Man information

## CLI Options ##

Current options at the command line for Gittey:

- `--add-alias` - Add a new user-configured command alias
- `--add-collaborator` - Add collaborator to list of team collaborators
- `--args` - Arguments to supply to alias command
- `--branch-prefixes` - Display branch prefixes and descriptions
- `--checkout` - Check out a branch from list
- `--clone` - Clone remote repository
- `--commit` - Create a new branch using defined configuration
- `--commit-prefixes` - Display commit prefixes and descriptions
- `--configure-branch-annotations` - Create branch annotation prefixes
- `--configure-commit-annotations` - Create commit annotation prefixes
- `--delete-alias` - Delete a user-configured command alias
- `--delete-branch` - Delete a branch
- `-h`, `--help` - Display help info
- `--init` - Initialize Gittey configuration in your project
- `--init-repo` - Initialize git repository with custom main branch name
- `--list-remotes` - List remotes for local git repo
- `--merge-from-branch` - Merge another branch into current branch
- `--merge-to-branch` - Merge current branch into another branch
- `--merge-to-temp` - Merge current branch and another branch into a temp branch
- `--new-branch` - Create a new branch using defined configuration
- `--prune-branches` - Menued branch cleanup
- `--remove-collaborators` - Remove collaborators from list of team collaborators
- `--remove-remote` - Remove remote reference from local git repo
- `--rename-branch` - Rename current branch
- `--reset-configuration` - Reset configuration to default settings
- `--revert-commits` - Revert recent commits
- `--set-remote-uri` - Set or update remote URI
- `--set-verbose-mode` - Set project-level Gittey verbose mode
- `--update` - Update to latest version
- `--update-current-branch` - Update current branch with remote trunk changes
- `--verbose` - (Flag) Make all git commands visible when run
- `-v`, `--version` - Display current version