import {exec} from 'child_process';
import path from 'path';
import {createHash} from 'crypto';
import {readFileSync} from 'fs';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let lastHash: string | null = null;

/**
 * 监听 i18n JSON 文件变化并生成 i18n 接口
 *
 * 仅监听简体中文 i18n 文件
 */
function DictionaryInterfaceLoader(this: any, source: string) {
    const callback = this.async();
    const resourcePath = this.resourcePath;

    // 只处理 zh_CN.json 文件
    if (!resourcePath.endsWith('zh_CN.json')) {
        callback(null, source);
        return;
    }

    try {
        // 读取文件内容并计算哈希
        const fileContent = readFileSync(resourcePath, 'utf8');
        const currentHash = createHash('md5').update(fileContent).digest('hex');

        // 如果哈希值不同或者首次运行，则执行生成操作
        if (lastHash !== currentHash) {
            lastHash = currentHash;

            const outputPath = path.join(__dirname, '../src/dictionaries/dictionary-interface.ts');

            exec(`npx quicktype ${resourcePath} -o ${outputPath} --just-types`, (error) => {
                if (error) console.error(`执行出错: ${error}`); else console.log('i18n interface 已更新');
                callback(null, source);
            });
        } else callback(null, source);
    } catch (error) {
        console.error('读取文件或计算哈希时出错:', error);
        callback(null, source);
    }
}

export default DictionaryInterfaceLoader;
