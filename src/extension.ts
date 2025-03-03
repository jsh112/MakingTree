import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { GenerateFileTree } from './utils';

export async function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('makingtree.generateTree', async () => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

        if (workspaceFolder) {
            const fileTree = await GenerateFileTree(workspaceFolder);
            const readmePath = path.join(workspaceFolder, 'README.md');

            let readmeDoc: vscode.TextDocument;
            try {
                readmeDoc = await vscode.workspace.openTextDocument(readmePath);
            } catch (error) {
                readmeDoc = await vscode.workspace.openTextDocument({ content: '', language: 'markdown' });
            }

            const newContent = `${readmeDoc.getText()}\n\n## Project File Tree\n\n\`\`\`markdown\n${fileTree}\n\`\`\``;
            const edit = new vscode.WorkspaceEdit();
            edit.replace(readmeDoc.uri, new vscode.Range(0, 0, readmeDoc.lineCount, 0), newContent);
            await vscode.workspace.applyEdit(edit);
            await readmeDoc.save();

            vscode.window.showInformationMessage('File Tree has been added to README.md');
        } else {
            vscode.window.showErrorMessage('Workspace is not open.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
