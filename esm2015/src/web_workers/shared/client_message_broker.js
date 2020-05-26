/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
import * as i0 from "@angular/core";
import * as i1 from "./message_bus";
import * as i2 from "./serializer";
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
let ClientMessageBrokerFactory = /** @class */ (() => {
    class ClientMessageBrokerFactory {
        /** @internal */
        constructor(_messageBus, _serializer) {
            this._messageBus = _messageBus;
            this._serializer = _serializer;
        }
        /**
         * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
         */
        createMessageBroker(channel, runInZone = true) {
            this._messageBus.initChannel(channel, runInZone);
            return new ClientMessageBroker(this._messageBus, this._serializer, channel);
        }
    }
    ClientMessageBrokerFactory.ɵfac = function ClientMessageBrokerFactory_Factory(t) { return new (t || ClientMessageBrokerFactory)(i0.ɵɵinject(i1.MessageBus), i0.ɵɵinject(i2.Serializer)); };
    ClientMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ClientMessageBrokerFactory, factory: ClientMessageBrokerFactory.ɵfac });
    return ClientMessageBrokerFactory;
})();
export { ClientMessageBrokerFactory };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ClientMessageBrokerFactory, [{
        type: Injectable
    }], function () { return [{ type: i1.MessageBus }, { type: i2.Serializer }]; }, null); })();
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export class ClientMessageBroker {
    /** @internal */
    constructor(messageBus, _serializer, channel) {
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        const source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    _generateMessageId(name) {
        const time = stringify(new Date().getTime());
        let iteration = 0;
        let id = name + time + stringify(iteration);
        while (this._pending.has(id)) {
            id = `${name}${time}${iteration}`;
            iteration++;
        }
        return id;
    }
    runOnService(args, returnType) {
        const fnArgs = [];
        if (args.args) {
            args.args.forEach(argument => {
                if (argument.type != null) {
                    fnArgs.push(this._serializer.serialize(argument.value, argument.type));
                }
                else {
                    fnArgs.push(argument.value);
                }
            });
        }
        let promise;
        let id = null;
        if (returnType != null) {
            let completer = undefined;
            promise = new Promise((resolve, reject) => {
                completer = { resolve, reject };
            });
            id = this._generateMessageId(args.method);
            this._pending.set(id, completer);
            promise.catch((err) => {
                if (console && console.error) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                }
                completer.reject(err);
            });
            promise = promise.then((v) => this._serializer ? this._serializer.deserialize(v, returnType) : v);
        }
        else {
            promise = null;
        }
        const message = {
            'method': args.method,
            'args': fnArgs,
        };
        if (id != null) {
            message['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    }
    _handleMessage(message) {
        if (message.type === 'result' || message.type === 'error') {
            const id = message.id;
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    this._pending.get(id).resolve(message.value);
                }
                else {
                    this._pending.get(id).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    }
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export class FnArg {
    constructor(value, type = 1 /* PRIMITIVE */) {
        this.value = value;
        this.type = type;
    }
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
 */
export class UiArguments {
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBZSxVQUFVLEVBQVEsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sY0FBYyxDQUFDOzs7O0FBRXpEOzs7O0dBSUc7QUFDSDtJQUFBLE1BQ2EsMEJBQTBCO1FBSXJDLGdCQUFnQjtRQUNoQixZQUFvQixXQUF1QixFQUFFLFdBQXVCO1lBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7V0FFRztRQUNILG1CQUFtQixDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1lBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRCxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLENBQUM7O3dHQWZVLDBCQUEwQjtzRUFBMUIsMEJBQTBCLFdBQTFCLDBCQUEwQjtxQ0FsQnZDO0tBa0NDO1NBaEJZLDBCQUEwQjtrREFBMUIsMEJBQTBCO2NBRHRDLFVBQVU7O0FBd0JYOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLGdCQUFnQjtJQUNoQixZQUFZLFVBQXNCLEVBQUUsV0FBdUIsRUFBVSxPQUFZO1FB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LENBQUs7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUF1RDtJQUFHLENBQUM7Q0FDOUY7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBbUIsTUFBYyxFQUFTLElBQWM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVU7SUFBRyxDQUFDO0NBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi9zZXJpYWxpemVyJztcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBnaXZlbiBjaGFubmVsIGFuZCBhdHRhY2hlcyBhIG5ldyB7QGxpbmsgQ2xpZW50TWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IENsaWVudE1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IENsaWVudE1lc3NhZ2VCcm9rZXIodGhpcy5fbWVzc2FnZUJ1cywgdGhpcy5fc2VyaWFsaXplciwgY2hhbm5lbCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFByb21pc2VDb21wbGV0ZXIge1xuICByZXNvbHZlOiAocmVzdWx0OiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3BlbmRpbmcgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZUNvbXBsZXRlcj4oKTtcbiAgcHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogYW55KSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2VCdXMuZnJvbShjaGFubmVsKTtcblxuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZU1lc3NhZ2VJZChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRpbWU6IHN0cmluZyA9IHN0cmluZ2lmeShuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgbGV0IGl0ZXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICBsZXQgaWQ6IHN0cmluZyA9IG5hbWUgKyB0aW1lICsgc3RyaW5naWZ5KGl0ZXJhdGlvbik7XG4gICAgd2hpbGUgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgaWQgPSBgJHtuYW1lfSR7dGltZX0ke2l0ZXJhdGlvbn1gO1xuICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHJ1bk9uU2VydmljZShhcmdzOiBVaUFyZ3VtZW50cywgcmV0dXJuVHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlc3xudWxsKTogUHJvbWlzZTxhbnk+fG51bGwge1xuICAgIGNvbnN0IGZuQXJnczogYW55W10gPSBbXTtcbiAgICBpZiAoYXJncy5hcmdzKSB7XG4gICAgICBhcmdzLmFyZ3MuZm9yRWFjaChhcmd1bWVudCA9PiB7XG4gICAgICAgIGlmIChhcmd1bWVudC50eXBlICE9IG51bGwpIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaCh0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShhcmd1bWVudC52YWx1ZSwgYXJndW1lbnQudHlwZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZuQXJncy5wdXNoKGFyZ3VtZW50LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PnxudWxsO1xuICAgIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgIGlmIChyZXR1cm5UeXBlICE9IG51bGwpIHtcbiAgICAgIGxldCBjb21wbGV0ZXI6IFByb21pc2VDb21wbGV0ZXIgPSB1bmRlZmluZWQhO1xuICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29tcGxldGVyID0ge3Jlc29sdmUsIHJlamVjdH07XG4gICAgICB9KTtcbiAgICAgIGlkID0gdGhpcy5fZ2VuZXJhdGVNZXNzYWdlSWQoYXJncy5tZXRob2QpO1xuICAgICAgdGhpcy5fcGVuZGluZy5zZXQoaWQsIGNvbXBsZXRlcik7XG5cbiAgICAgIHByb21pc2UuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGVycik7XG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihcbiAgICAgICAgICAodjogYW55KSA9PiB0aGlzLl9zZXJpYWxpemVyID8gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZSh2LCByZXR1cm5UeXBlKSA6IHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlOiBSZXF1ZXN0TWVzc2FnZURhdGEgPSB7XG4gICAgICAnbWV0aG9kJzogYXJncy5tZXRob2QsXG4gICAgICAnYXJncyc6IGZuQXJncyxcbiAgICB9O1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICBtZXNzYWdlWydpZCddID0gaWQ7XG4gICAgfVxuICAgIHRoaXMuX3NpbmsuZW1pdChtZXNzYWdlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ3Jlc3VsdCcgfHwgbWVzc2FnZS50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zdCBpZCA9IG1lc3NhZ2UuaWQhO1xuICAgICAgaWYgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSAncmVzdWx0Jykge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKSEucmVzb2x2ZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nLmdldChpZCkhLnJlamVjdChtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wZW5kaW5nLmRlbGV0ZShpZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0TWVzc2FnZURhdGEge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJncz86IGFueVtdO1xuICBpZD86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFJlc3BvbnNlTWVzc2FnZURhdGEge1xuICB0eXBlOiAncmVzdWx0J3wnZXJyb3InO1xuICB2YWx1ZT86IGFueTtcbiAgaWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbmV4cG9ydCBjbGFzcyBGbkFyZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge31cbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNsYXNzIFVpQXJndW1lbnRzIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1ldGhvZDogc3RyaW5nLCBwdWJsaWMgYXJncz86IEZuQXJnW10pIHt9XG59XG4iXX0=