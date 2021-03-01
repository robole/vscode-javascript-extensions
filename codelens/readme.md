# Codelens

A codelens represents a command that is shown inline in source code. It is a way to run actions on related code quickly, such as this debug action you see in `package.json`.

![debug example codelens](img/debug-example.png)

This example adds a codelens to the document for lines of text that begin with a number. The command shows an information message displaying the line number and text.

![demo](img/demo.gif)

To try the example out:
- Create a new file
- Write a line of text that begins with a number
- Click on the CodeLens to run the command.

## Understanding the API

The API around this topic are quite abstract and hard to explain. I will do my best here!

You don't add a codelens to a document directly. You do not need handle events to take of when they are updated.
A codelens must be provided by a CodeLensProvider, which takes care of this for you. 

A CodeLensProvider is associated with a language through `languages.registerCodeLensProvider`. In this example it associated with all languages, and we give it out custom CodeLensProvider.

```javascript
vscode.languages.registerCodeLensProvider(
    "*",
    new Provider()
);
```

CodeLensProvider does not have a constructor. You can create your own class (`Provider` in this example) and implement 2 functions with the same signature as per the API.

![codelensprovider definition](img/codelensprovider.png)

```javascript
class Provider {
  constructor() {
    //match any text that begins with a number
    this.regex = new RegExp(/\d+.*/g);
  }

  provideCodeLenses(document, token) {
    //...
  }

  resolveCodeLens(codeLens, token) {
    //...
  }
}
```

The expectation is that:
- `provideCodeLenses` will create the codelenses and associate them with a range in the document. These codelenses are consider unresolved as they do not have a command associated.
- `resolveCodeLens` will associate a command with a codelens and "resolve" the codelens.

You can pass values from the codelens to the command by arguments.

I recommend reading through the code to get a full grasp on this.

## VS Code API

- [`languages.registerCodeLensProvider`](https://code.visualstudio.com/api/references/vscode-api#languages.registerCodeLensProvider)

- [`CodeLensProvider`](https://code.visualstudio.com/api/references/vscode-api#CodeLensProvider)

## Running the Extension

- Press <kbd>F5</kbd> to run the "Launch Extension" Debug Configuration. This will run the extension in a new VS Code window.
- Create a new file
- Write a line of text that begins with a number e.g. "1 eg"
- Click on the codeLens to run the command and show an information message.
