# Tree View

Add a custom tree view to the **Explorer** view container.

![custom tree view](img/screenshot.png)

The tree view displays an array of users. Each property of `position` is treated as a child tree item.

```json
let users = [
      {
        firstName: "John",
        lastName: "Doe",
        position: { name: "Manager", level: "3" },
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        position: { name: "Backend Engineer", level: "2" },
      },
]
```

The code uses the `onStartupFinished` ActivationEvent to show the treeview as soon as VS Code starts.

## VS Code API References

Below are references to parts of the API used in the code.

### `vscode` module

- [window.createTreeView](https://code.visualstudio.com/api/references/vscode-api#window.createTreeView)
- [TreeView](https://code.visualstudio.com/api/references/vscode-api#TreeView)
- [TreeItem](https://code.visualstudio.com/api/references/vscode-api#TreeItem)
- [TreeDataProvider](https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.views)

## Running the Extension

- Run `npm install` in terminal to install dependencies.
- Press <kbd>F5</kbd> to run the "Launch Extension" Debug Configuration. This will run the extension in a new VS Code window.
- The tree view will be visible as soon as the extension is loaded.
