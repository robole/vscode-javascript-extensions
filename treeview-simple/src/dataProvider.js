const vscode = require("vscode");

class DataProvider {
  constructor() {
    this.users = [
      {
        firstName: "John",
        lastName: "Doe",
        position: { name: "Manager", level: "3" },
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        position: { name: "Backend Engineer", level: "2" },
      },
    ];
    this.userTreeItems = this.convertUsersToTreeItems();
  }

  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (element) {
      return element.getPositionDetails();
    } else {
      return this.userTreeItems;
    }
  }

  convertUsersToTreeItems() {
    let array = [];
    this.users.forEach((element) => {
      array.push(
        new UserTreeItem(element, vscode.TreeItemCollapsibleState.Expanded)
      );
    });
    return array;
  }
}

class UserTreeItem {
  // we must provide the property label for it to show up the tree view
  constructor(user, collapsibleState) {
    this.user = user;
    this.label = `${user.firstName} ${user.lastName}`;
    this.collapsibleState = collapsibleState;
    this.positionDetails = [];

    this.convertPositionToTreeItems();
  }

  // Convert each property in user.position to a TreeItem which is treated as child of the user tree item
  convertPositionToTreeItems() {
    if (this.user.position) {
      let prop1 = new vscode.TreeItem(
        `position name: ${this.user.position.name}`
      );
      let prop2 = new vscode.TreeItem(
        `position level: ${this.user.position.level}`
      );
      this.positionDetails = [prop1, prop2];
    }
  }

  getPositionDetails() {
    return this.positionDetails;
  }
}

module.exports = DataProvider;
