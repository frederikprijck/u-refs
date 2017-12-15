import * as fs from 'fs';

export class JsonLoader {
  static load(path: string) {
    return JSON.parse(fs.readFileSync(path) as any);
  }

  static save(path: string, content: any, cb: (err: any) => void) {
    fs.writeFile(path, JSON.stringify(content, null, 2), cb);
  }
}