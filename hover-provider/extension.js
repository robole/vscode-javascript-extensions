// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");

module.exports = {
  activate,
  deactivate,
};

// This method is called when your extension is activated
function activate(context) {
  console.log("hover provider example is active");

  let disposable1 = vscode.languages.registerHoverProvider("javascript", {
    provideHover(document, position, token) {
      const word = document.getText(document.getWordRangeAtPosition(position));

      const searchOptions = {
        query: word,
      };

      const searchCommandUri = vscode.Uri.parse(
        `command:workbench.action.findInFiles?${encodeURIComponent(
          JSON.stringify(searchOptions)
        )}`
      );

      const contents = new vscode.MarkdownString(
        `[Search: ${word}](${searchCommandUri})`
      );

      contents.isTrusted = true;

      return new vscode.Hover(contents);
    },
  });
  context.subscriptions.push(disposable1);
}

// this method is called when your extension is deactivated
function deactivate() {}
