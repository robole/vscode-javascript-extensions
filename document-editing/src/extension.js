const vscode = require("vscode");

module.exports = {
  activate,
};

function activate(context) {
  const commandID = "example.reverseText";

  const disposable = vscode.commands.registerCommand(
    commandID,
    reverseSelectedText
  );

  context.subscriptions.push(disposable);
}

function reverseSelectedText() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;
    const selection = editor.selection;

    const text = document.getText(selection);
    const reversed = text.split("").reverse().join("");

    editor.edit((editBuilder) => {
      editBuilder.replace(selection, reversed);
    });
  }
}
