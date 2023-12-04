// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import getRssData, { IRssDataResponse } from "./api/getRssData";
import { getFreqeuncyData, getRssListData } from "./utils/config";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "search-medium-ai-blog.searchMediumAiBlog",
    async () => {
      try {
        const frequency = getFreqeuncyData();
        const rssList = getRssListData();
        if (rssList.length === 0) {
          vscode.window.showInformationMessage("No RSS feed configured");
          return;
        }
        if (frequency === -1) {
          vscode.window.showInformationMessage("Invalid frequency");
          return;
        }
        const data = await getRssData({ frequency, rssList });
        const articles: IRssDataResponse[] = [
          ...new Map(data.map((item) => [item["link"], item])).values(),
        ];
        const article = await vscode.window.showQuickPick(articles, {
          matchOnDetail: true,
        });

        if (article === undefined) {
          return;
        }
        vscode.env.openExternal(vscode.Uri.parse(article.link));
      } catch (error) {
        console.error(error);
      }
      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World from web search!');
    },
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
export function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
