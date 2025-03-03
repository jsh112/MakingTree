import * as fs from 'fs/promises';
import * as path from 'path';
import { symbols, getIcon } from '../icons';

// 트리 구분 기호 및 아이콘 정의 (생략)

// 비동기로 파일 트리 생성
export async function GenerateFileTree(dirPath: string, depth: number = 0, prefix: string = ''): Promise<string> {
    let result = '';
    const files = await fs.readdir(dirPath);

    // 파일과 폴더를 정렬
    const sortedFiles = await Promise.all(files.map(async (file) => {
        const fullPath = path.join(dirPath, file);
        const stat = await fs.stat(fullPath);
        return { file, stat };
    }));

    sortedFiles.sort((a, b) => {
        const aIsDir = a.stat.isDirectory();
        const bIsDir = b.stat.isDirectory();
        return aIsDir === bIsDir ? a.file.localeCompare(b.file) : aIsDir ? -1 : 1;
    });

    const lastFileIndex = sortedFiles.length - 1;

    for (let index = 0; index < sortedFiles.length; index++) {
        const { file, stat } = sortedFiles[index];
        const isLast = index === lastFileIndex;
        const branchSymbol = isLast ? symbols.lastBranch : symbols.branch;
        const newPrefix = prefix + (isLast ? symbols.space : symbols.vertical);
        const icon = getIcon(file, stat.isDirectory());

        result += `${prefix}${branchSymbol} ${icon} ${file}\n`;

        if (stat.isDirectory()) {
            result += await GenerateFileTree(path.join(dirPath, file), depth + 1, newPrefix);
        }
    }

    return result;
}
