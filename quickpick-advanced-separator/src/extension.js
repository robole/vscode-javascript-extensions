const vscode = require("vscode");

module.exports = { activate };

function activate(context) {
  const command1 = "example.quickpickAdvancedSeparator";
  let disposable1 = vscode.commands.registerCommand(
    command1,
    showQuickpickAdvanced
  );
  context.subscriptions.push(disposable1);
}

async function showQuickpickAdvanced() {
  return await new Promise((resolve, reject) => {
    let quickpick = vscode.window.createQuickPick();
    quickpick.placeholder = "Pick a color";
    quickpick.items = [
      {
        label: "Recently selected",
        kind: vscode.QuickPickItemKind.Separator,
      },
      { label: "Yellow", description: "Secondary color" },
      { label: "Red", description: "Primary color" },
      { label: "Blue", description: "Primary color" },
      { label: "Yellow", description: "Secondary color" },
    ];

    quickpick.onDidAccept(() => {
      vscode.window.showInformationMessage(
        `Selected Color: ${quickpick.selectedItems[0].label}`
      );
      quickpick.hide();
      resolve();
    });

    quickpick.show();
  });
}
