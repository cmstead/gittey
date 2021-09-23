module.exports = [
    {
        name: "add-alias",
        description: "Add a new user-configured command alias",
        type: Boolean
    },
    {
        name: "delete-alias",
        description: "Delete a user-configured command alias",
        type: Boolean
    },
    {
        name: "args",
        description: "Arguments to supply to alias command",
        type: String,
        multiple: true
    },
    {
        name: "clone",
        description: "Clone remote repository",
        type: Boolean
    },
    {
        name: "configure-branch-annotations",
        description: "Create branch annotation prefixes",
        type: Boolean
    },
    {
        name: "configure-commit-annotations",
        description: "Create commit annotation prefixes",
        type: Boolean
    },
    {
        name: "reset-configuration",
        description: "Reset configuration to default settings",
        type: Boolean
    },
    {
        name: "revert-commits",
        description: "Revert recent commits",
        type: Boolean
    },
    {
        name: "delete-branch",
        description: "Delete a branch",
        type: Boolean
    },
    {
        name: "prune-branches",
        description: "Menued branch cleanup",
        type: Boolean
    },
    {
        name: "merge-from-branch",
        description: "Merge another branch into current branch",
        type: Boolean
    },
    {
        name: "merge-to-branch",
        description: "Merge current branch into another branch",
        type: Boolean
    },
    {
        name: "merge-to-temp",
        description: "Merge current branch and another branch into a temp branch",
        type: Boolean
    },
    {
        name: "update-current-branch",
        description: "Update current branch with remote trunk changes",
        type: Boolean
    },
    {
        name: "init",
        description: "Initialize Gittey configuration in your project",
        type: Boolean
    },
    {
        name: "add-collaborator",
        description: "Add collaborator to list of team collaborators",
        type: Boolean
    },
    {
        name: "remove-collaborators",
        description: "Remove collaborators from list of team collaborators",
        type: Boolean
    },
    { 
        name: "branch-prefixes",
        description: "Display branch prefixes and descriptions",
        type: Boolean
    },
    { 
        name: "commit-prefixes",
        description: "Display commit prefixes and descriptions",
        type: Boolean
    },
    { 
        name: "checkout",
        description: "Check out a branch from list",
        type: Boolean
    },
    {
        name: "new-branch",
        description: "Create a new branch using defined configuration",
        type: Boolean
    },
    {
        name: "commit",
        description: "Create a new branch using defined configuration",
        type: Boolean
    },
    { 
        name: "help",
        alias: 'h',
        description: "Display help info",
        type: Boolean
    },
    {
        name: 'update',
        description: 'Update to latest version',
        type: Boolean
    },
    {
        name: 'version',
        alias: 'v',
        description: 'Display current version',
        type: Boolean
    },
    {
        name: 'set-remote-uri',
        description: 'Set or update remote URI',
        type: Boolean
    }
]