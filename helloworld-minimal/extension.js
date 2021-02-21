// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");

module.exports = {
  activate,
  deactivate,
};

// This method is called when your extension is activated
function activate(context) {
  // This must match the command field in the package.json
  const commandID = "example.helloWorld";

  let disposable = vscode.commands.registerCommand(commandID, sayHello);

  context.subscriptions.push(disposable);
}

function sayHello() {
  vscode.window.showInformationMessage("Hello World!");
}

// this method is called when your extension is deactivated
function deactivate() {}
