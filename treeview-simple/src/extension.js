"use strict";

const vscode = require("vscode");
const DataProvider = require("./dataProvider.js");

module.exports = { activate };

function activate(context) {
  let myData = new DataProvider();

  let view = vscode.window.createTreeView("exampleTreeview", {
    treeDataProvider: myData,
  });

  context.subscriptions.push(view);
}
