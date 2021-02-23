const vscode = require("vscode");
const path = require("path");

module.exports = {
  show,
};

let extensionContext;
let myView;

function show(context) {
  extensionContext = context;

  myView = vscode.window.createWebviewPanel(
    "examplePanel",
    "This is the title",
    vscode.ViewColumn.One
  );

  myView.webview.html = getHtml();
}

function getHtml() {
  const stylesSrc = getUri("style.css");
  const imgSrc = getUri("cat.gif");

  return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Example Webview</title>
				<link rel="stylesheet" href="${stylesSrc}"/>
			</head>
			<body>
				<h1>Example Webview</h1>
				<p>This a cat coding. A local image is used.</p>
				<img src="${imgSrc}" alt="cat coding"/>
			</body>
			</html>`;
}

/**
 * Get the webview-compliant URI for the main stylesheet. Using the "file:" protocol is not supported.
 */
function getUri(filename) {
  const onDiskPath = vscode.Uri.file(
    path.join(extensionContext.extensionPath, "media", filename)
  );
  const src = myView.webview.asWebviewUri(onDiskPath);
  return src;
}
