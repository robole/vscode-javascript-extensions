const vscode = require("vscode");
const view = require("./view");

module.exports = {
  activate,
};

function activate(context) {
  const commmandID = "example.show";

  context.subscriptions.push(
    vscode.commands.registerCommand(commmandID, () => {
      view.show(context);
    })
  );
}
