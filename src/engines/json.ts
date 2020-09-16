import { BaseEngine, ExportCallbackType } from './baseEngine';
import { Record } from 'refinery-core';
import { logger, isUrl } from 'refinery-core';
import { readFileSync, writeFileSync } from 'fs';
import PouchDb from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
PouchDb.plugin(PouchdbFind);

export class JsonEngine extends BaseEngine {
  
  static descriptor = 'JSON record'

  static arg = 'json';

  static hasEgress = true;
  static hasIngress = true;

  async load(filePath: string, batch?: string, notebook?: string): Promise<Array<string>> {
    let f: string = readFileSync(filePath, {encoding: 'utf-8'});
    let records: Array<Record> = JSON.parse(f);
    return await this.importCallback(records);
  }

  exportCallback(output: string, records: Array<Record>, flipped: boolean) {
    let ids: Array<string> = new Array<string>();
    let serialized: string = '';

    if (records !== undefined) {
      for (let fld of records){
        ids.push(fld._id);
        serialized += JSON.stringify(fld);
      }

      writeFileSync(output, serialized, {encoding: 'utf-8'});
    }

    return ids;
  }

}

export default JsonEngine;