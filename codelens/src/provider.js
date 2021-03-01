const vscode = require("vscode");

class Provider {
  constructor() {
    //match any text that begins with a number
    this.regex = new RegExp(/\d+.*/g);
  }

  provideCodeLenses(document, token) {
    if (document) {
      this.codeLenses = [];

      const text = document.getText();
      let matches = text.matchAll(this.regex);

      for (const match of matches) {
        // we need to get the range of by finding the correct line in the document
        const startPosition = document.positionAt(match.index);
        const lineNum = startPosition.line;
        const textLine = document.lineAt(lineNum);
        const lineRange = textLine.range;

        if (lineRange) {
          this.codeLenses.push(new vscode.CodeLens(lineRange));
        }
      }

      return this.codeLenses;
    }
    return [];
  }

  resolveCodeLens(codeLens, token) {
    if (codeLens) {
      let lineNum = codeLens.range.start.line + 1;
      let text = vscode.window.activeTextEditor.document.getText(
        codeLens.range
      );

      codeLens.command = {
        title: "Codelens for text that begins with a number",
        tooltip: "Click to run command",
        command: "example.show",
        arguments: [lineNum, text],
      };
      return codeLens;
    }
    return null;
  }
}

module.exports = Provider;
