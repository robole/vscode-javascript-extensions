# Quickpick Simple

A quickpick is a dropdown combobox that is opened in the Command Palette.

Most of your needs are covered by the function `window.showQuickPick`. There are 4 versions of this function. If you have a more complicated use case and require more control, you can use `window.createQuickPick` instead.

## Basic Example

Run the **Show Basic Quickpick** command to view this example.

![basic quickpick example](img/basic-screenshot.png)

The function `window.showQuickPick` will create a quickpick with the items you provide.

You can provide items as an array of strings or `QuickPickItem` objects. Here, we provide an array of strings. And the result returned from the quickpick is the string of the option that the user selects.

You can customise the quickpick through the second parameter by providing a `QuickPickOptions` object. We provide a placeholder, which is the text shown inside the textbox of the Command Palette.

```javascript
let items = ["npm", "Yarn"];
let options = {
    placeHolder: "Pick a package manager",
  };

const result = await vscode.window.showQuickPick(items, options);

// if no option was picked, result = `undefined`
vscode.window.showInformationMessage(`Pick: ${result}.`);
```

## Multi-selection Example

Run the **Show Multi Quickpick** command to view this example.

This example allows you to select multiple options. This is specified through the `QuickPickOptions.pickMany`.

![multi-selection quickpick example](img/multi-screenshot.png)

The items we provide are `QuickPickItem` objects. This allows us to customise the appearance and behaviour of options. I add a description that says if it is a primary or secondary color.

The result returned is an array of `QuickPickItem` objects, so we must deal with it differently than the first example.

```javascript
// items are QuickPickItem objects
  let items = [
    { label: "Red", description: "Primary Color" },
    { label: "Blue", description: "Primary Color" },
    { label: "Yellow", description: "Secondary Color" },
    { label: "Pink", description: "Secondary Color" },
  ];

let options = {
    placeHolder: "Pick colors for your palette",
    canPickMany: true,
};

const result = await vscode.window.showQuickPick(items, options);

//turn result into a string with the colors as a comma-separated list
let picks = result.map((pick) => pick.label).join(", ");
vscode.window.showInformationMessage(`Picks: ${picks}.`);
```

## VS Code API References

Below are references to parts of the API used in the code.

### `vscode` module

- [window.showQuickPick](https://code.visualstudio.com/api/references/vscode-api#window.showQuickPick)
- [QuickPickItem](https://code.visualstudio.com/api/references/vscode-api#QuickPickItem)
- [QuickPickOptions](https://code.visualstudio.com/api/references/vscode-api#QuickPickOptions)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)

## Running the Extension

- Run `npm install` in terminal to install dependencies.
- Press <kbd>F5</kbd> to run the "Launch Extension" Debug Configuration. This will run the extension in a new VS Code window.
- You can run one of the commands available:
	- Run the **Show Basic Quickpick** command to view the basic example.
	- Run the **Show Multi Quickpick** command to view the multi-selection example.
