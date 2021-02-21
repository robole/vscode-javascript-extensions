# Document Editing

This example shows you how to create a command that makes changes to a document (of the active text editor).

**It has the command "Reverse Selected Text"**, which reverses the selected text.

![demo](img/demo.gif)

## VS Code API References

Below are references to parts of the API used in the code.

### `vscode` module

- [`commands.registerCommand`](https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand)
- [`window.activeTextEditor`](https://code.visualstudio.com/api/references/vscode-api#window.activeTextEditor)
- [`TextDocument.getText`](https://code.visualstudio.com/api/references/vscode-api#TextDocument.getText)
- [`TextEditor.edit`](https://code.visualstudio.com/api/references/vscode-api#TextEditor.edit)
- [`TextEditorEdit`](https://code.visualstudio.com/api/references/vscode-api#TextEditorEdit)

### Contribution Points

- [`contributes.commands`](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)

## Running the Extension

- Run `npm install` on the command-line to install the dev dependencies.
- Press <kbd>F5</kbd> to run the "Launch Extension" Debug Configuration. This will run the extension in a new VS Code window.
- Select the command "Reverse Selected Text" from the Command Palette (<kbd>Ctrl+Shift+p</kbd>).
