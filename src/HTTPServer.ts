import * as http from 'http';
import { Server } from './Server';
import { Authorizer, NoAuthorizer } from './authorizer';

export class HTTPServer extends Server<http.Server> {
    constructor(port: number = 80, authorizer: Authorizer = new NoAuthorizer()) {
        super(port, authorizer);
    }

    protected createServer() {
        this.server = http.createServer(this.express);

        this.server.on('close', () => this.onClose.next());
        this.server.on('connection', () => this.onConnection.next());
        this.server.on('error', (error: Error) => this.onError.next(error));
        this.server.on('listening', () => this.onListen.next());
    }

    public start(): void {
        this.server.listen(this.port);
    }

    public stop(): void {
        this.server.close();
    }
}
