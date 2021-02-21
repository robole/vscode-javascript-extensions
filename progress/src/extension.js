const vscode = require("vscode");

module.exports = {
  activate,
};

function activate(context) {
  const commandID = "extension.startTask";
  let disposable = vscode.commands.registerCommand(
    commandID,
    showProgressMessage
  );

  context.subscriptions.push(disposable);
}

function showProgressMessage() {
  let progressOptions = {
    cancellable: true,
    location: vscode.ProgressLocation.Notification,
    title: "I am long running!",
  };

  vscode.window.withProgress(progressOptions, (progress, token) => {
    token.onCancellationRequested(() => {
      console.log("User canceled the long running operation");
    });

    progress.report({ increment: 0 });

    setTimeout(() => {
      progress.report({
        increment: 50,
        message: "Half way done!",
      });
    }, 2000);

    const p = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });

    return p;
  });
}
