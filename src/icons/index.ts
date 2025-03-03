import * as path from 'path';
export const symbols = {
    branch: '├──',
    lastBranch: '└──',
    vertical: '│  ',
    space: '   '
};

export const icons: { [key: string]: string } = {
    folder: '📂',
    file: '📜',
    script: '🔧',
    image: '🖼️',
    music: '🎵',
    log: '📝',
    config: '⚙️',
    github: '🌐'
}

export function getIcon(fileName: string, isDir: boolean): string {
    if (isDir) return icons.folder;

    const extensionMapping: { [key: string]: string } = {
        '.md': icons.file,
        '.sh': icons.script,
        '.png': icons.image,
        '.jpg': icons.image,
        '.jpeg': icons.image,
        '.gif': icons.image,
        '.mp3': icons.music,
        '.wav': icons.music,
        '.log': icons.log,
        '.json': icons.config,
        '.yml': icons.config,
        '.yaml': icons.config,
        '.toml': icons.config,
        '.ini': icons.config,
        '.gitignore': icons.github,
        '.gitattributes': icons.github
    };
    const ext = path.extname(fileName);
    return extensionMapping[ext] || '📄';
}