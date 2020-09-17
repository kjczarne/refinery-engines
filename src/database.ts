import { config, DEFAULT_CONFIG_PATH } from 'refinery-core';
import { IRecord } from 'refinery-core';
import PouchDb from 'pouchdb';
import PouchdbFind from 'pouchdb-find';


export class RefineryDatabaseWrapper {
    config: any;
    // auth: Promise<nano.DatabaseAuthResponse>;
    server: string;
    name: string;
    db: PouchDB.Database;

    constructor(username?: string, password?: string, configPath: string = DEFAULT_CONFIG_PATH) {
        this.config = config(configPath);
        var opts = {
            auth: {
                username: process.env.REFINERY_USER || "none",
                password: process.env.REFINERY_PASSWORD || "none"
            }
        }
        
        // looks for CTOR values, falls back onto env otherwise:
        username && password ? opts = { auth: { username: username, password: password } } : opts = opts;
        this.server = this.config.refinery.database.databaseServer;
        this.name = this.config.refinery.database.databaseName;
        PouchDb.plugin(PouchdbFind);
        const db = new PouchDb(this.server + this.name, opts)
        // this.auth = couchDb.auth(username, userpass);
        // this.server = server;
        this.db = db;
        // LATER: local db and sync methods
    }

    find(selector: PouchDB.Find.FindRequest<IRecord>) {
        return this.db.find(selector);
    }
}

