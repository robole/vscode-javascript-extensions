// The module 'vscode' contains the VS Code extensibility API
const vscode = require("vscode");

module.exports = {
  activate,
  deactivate,
};

// create a decorator type that we use to decorate small numbers
const numberDecorationType = vscode.window.createTextEditorDecorationType({
  borderWidth: "1px",
  borderStyle: "solid",
  overviewRulerColor: "blue",
  overviewRulerLane: vscode.OverviewRulerLane.Right,
  light: {
    // this color will be used in light color themes
    borderColor: "darkblue",
  },
  dark: {
    // this color will be used in dark color themes
    borderColor: "lightblue",
  },
});
let timeout;
let activeEditor;

// This method is called when your extension is activated
function activate(context) {
  console.log("decorator example is active");

  activeEditor = vscode.window.activeTextEditor;

  if (activeEditor) {
    triggerUpdateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        triggerUpdateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        triggerUpdateDecorations(true);
      }
    },
    null,
    context.subscriptions
  );
}

function updateDecorations() {
  if (!activeEditor) {
    return;
  }

  const regEx = /\d+/g;
  const text = activeEditor.document.getText();

  const numbers = [];

  let match;

  while ((match = regEx.exec(text))) {
    const startPos = activeEditor.document.positionAt(match.index);
    const endPos = activeEditor.document.positionAt(
      match.index + match[0].length
    );

    const decoration = {
      range: new vscode.Range(startPos, endPos),
      hoverMessage: "Number **" + match[0] + "**",
    };

    numbers.push(decoration);
  }

  activeEditor.setDecorations(numberDecorationType, numbers);
}

function triggerUpdateDecorations(throttle = false) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }

  if (throttle) {
    timeout = setTimeout(updateDecorations, 500);
  } else {
    updateDecorations();
  }
}

// this method is called when your extension is deactivated
function deactivate() {}
