const vscode = require("vscode");

module.exports = {
  activate,
  deactivate,
};

let myStatusBarItem;
const myCommandId = "example.showSelectionCount";

function activate(context) {
  let subscriptions = context.subscriptions;

  createStatusBarItem();
  showStatusBarItem();

  // ensures the status bar item always up-to-date with activity in editor
  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  //this adds a click event to the status bar item
  let disposable = vscode.commands.registerCommand(
    myCommandId,
    showInformationMessage
  );
  subscriptions.push(disposable);
}

function createStatusBarItem() {
  //only ever want one status bar item
  if (myStatusBarItem === undefined) {
    myStatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      1
    );
    myStatusBarItem.command = myCommandId;
  }
}

function showStatusBarItem() {
  updateStatusBarItem();
  myStatusBarItem.show();
}

function updateStatusBarItem() {
  const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
  myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
}

function getNumberOfSelectedLines() {
  const editor = vscode.window.activeTextEditor;

  let lines = 0;

  if (editor) {
    lines = editor.selections.reduce(
      (prev, curr) => prev + (curr.end.line - curr.start.line),
      0
    );
  }
  return lines;
}

function showInformationMessage() {
  const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
  vscode.window.showInformationMessage(
    `Yeah, ${n} line(s) selected... Keep going!`
  );
}

function deactivate() {}
