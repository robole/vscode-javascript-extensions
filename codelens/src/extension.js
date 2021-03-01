const vscode = require("vscode");
const Provider = require("./provider");

module.exports = {
  activate,
};

function activate(context) {
  // the code lens is available for all languages
  let disposable1 = vscode.languages.registerCodeLensProvider(
    "*",
    new Provider()
  );

  let commandID = "example.show";

  // the codelens passes 2 arguments to the command when it is executed
  let disposable2 = vscode.commands.registerCommand(
    commandID,
    (lineNum, text) => {
      vscode.window.showInformationMessage(
        `We are on line ${lineNum}. The is the text: ${text}`
      );
    }
  );

  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}
