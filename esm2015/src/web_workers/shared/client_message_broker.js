/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class ClientMessageBrokerFactory {
    /**
     * \@internal
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    constructor(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker(this._messageBus, this._serializer, channel);
    }
}
ClientMessageBrokerFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ClientMessageBrokerFactory.ctorParameters = () => [
    { type: MessageBus },
    { type: Serializer }
];
function ClientMessageBrokerFactory_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBrokerFactory.prototype._serializer;
    /** @type {?} */
    ClientMessageBrokerFactory.prototype._messageBus;
}
/**
 * @record
 */
function PromiseCompleter() { }
function PromiseCompleter_tsickle_Closure_declarations() {
    /** @type {?} */
    PromiseCompleter.prototype.resolve;
    /** @type {?} */
    PromiseCompleter.prototype.reject;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class ClientMessageBroker {
    /**
     * \@internal
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    constructor(messageBus, _serializer, channel) {
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        const /** @type {?} */ source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    _generateMessageId(name) {
        const /** @type {?} */ time = stringify(new Date().getTime());
        let /** @type {?} */ iteration = 0;
        let /** @type {?} */ id = name + time + stringify(iteration);
        while (this._pending.has(id)) {
            id = `${name}${time}${iteration}`;
            iteration++;
        }
        return id;
    }
    /**
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    runOnService(args, returnType) {
        const /** @type {?} */ fnArgs = [];
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
        let /** @type {?} */ promise;
        let /** @type {?} */ id = null;
        if (returnType != null) {
            let /** @type {?} */ completer = /** @type {?} */ ((undefined));
            promise = new Promise((resolve, reject) => { completer = { resolve, reject }; });
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
        const /** @type {?} */ message = {
            'method': args.method,
            'args': fnArgs,
        };
        if (id != null) {
            message['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    _handleMessage(message) {
        if (message.type === 'result' || message.type === 'error') {
            const /** @type {?} */ id = /** @type {?} */ ((message.id));
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    /** @type {?} */ ((this._pending.get(id))).resolve(message.value);
                }
                else {
                    /** @type {?} */ ((this._pending.get(id))).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    }
}
function ClientMessageBroker_tsickle_Closure_declarations() {
    /** @type {?} */
    ClientMessageBroker.prototype._pending;
    /** @type {?} */
    ClientMessageBroker.prototype._sink;
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBroker.prototype._serializer;
    /** @type {?} */
    ClientMessageBroker.prototype.channel;
}
/**
 * @record
 */
function RequestMessageData() { }
function RequestMessageData_tsickle_Closure_declarations() {
    /** @type {?} */
    RequestMessageData.prototype.method;
    /** @type {?|undefined} */
    RequestMessageData.prototype.args;
    /** @type {?|undefined} */
    RequestMessageData.prototype.id;
}
/**
 * @record
 */
function ResponseMessageData() { }
function ResponseMessageData_tsickle_Closure_declarations() {
    /** @type {?} */
    ResponseMessageData.prototype.type;
    /** @type {?|undefined} */
    ResponseMessageData.prototype.value;
    /** @type {?|undefined} */
    ResponseMessageData.prototype.id;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class FnArg {
    /**
     * @param {?} value
     * @param {?=} type
     */
    constructor(value, type = 1 /* PRIMITIVE */) {
        this.value = value;
        this.type = type;
    }
}
function FnArg_tsickle_Closure_declarations() {
    /** @type {?} */
    FnArg.prototype.value;
    /** @type {?} */
    FnArg.prototype.type;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class UiArguments {
    /**
     * @param {?} method
     * @param {?=} args
     */
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}
function UiArguments_tsickle_Closure_declarations() {
    /** @type {?} */
    UiArguments.prototype.method;
    /** @type {?} */
    UiArguments.prototype.args;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFlLFVBQVUsRUFBUSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxjQUFjLENBQUM7Ozs7QUFNekQsTUFBTTs7Ozs7O0lBS0osWUFBb0IsV0FBdUIsRUFBRSxXQUF1QjtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztLQUNoQzs7Ozs7OztJQUtELG1CQUFtQixDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzdFOzs7WUFoQkYsVUFBVTs7OztZQU5ILFVBQVU7WUFDVixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ2xCLE1BQU07Ozs7Ozs7SUFPSixZQUFZLFVBQXNCLEVBQUUsV0FBdUIsRUFBVSxPQUFZO1FBQVosWUFBTyxHQUFQLE9BQU8sQ0FBSzt3QkFOOUQsSUFBSSxHQUFHLEVBQTRCO1FBT3BELElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENB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bnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi9zZXJpYWxpemVyJztcblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgZXhwZXJpbWVudGFsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBDbGllbnRNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gICAgdGhpcy5fbWVzc2FnZUJ1cy5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHJldHVybiBuZXcgQ2xpZW50TWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUHJvbWlzZUNvbXBsZXRlciB7XG4gIHJlc29sdmU6IChyZXN1bHQ6IGFueSkgPT4gdm9pZDtcbiAgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudE1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9wZW5kaW5nID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2VDb21wbGV0ZXI+KCk7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIGNoYW5uZWw6IGFueSkge1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgICBjb25zdCBzb3VyY2UgPSBtZXNzYWdlQnVzLmZyb20oY2hhbm5lbCk7XG5cbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlRGF0YSkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlKX0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVNZXNzYWdlSWQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB0aW1lOiBzdHJpbmcgPSBzdHJpbmdpZnkobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgIGxldCBpdGVyYXRpb246IG51bWJlciA9IDA7XG4gICAgbGV0IGlkOiBzdHJpbmcgPSBuYW1lICsgdGltZSArIHN0cmluZ2lmeShpdGVyYXRpb24pO1xuICAgIHdoaWxlICh0aGlzLl9wZW5kaW5nLmhhcyhpZCkpIHtcbiAgICAgIGlkID0gYCR7bmFtZX0ke3RpbWV9JHtpdGVyYXRpb259YDtcbiAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBydW5PblNlcnZpY2UoYXJnczogVWlBcmd1bWVudHMsIHJldHVyblR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXN8bnVsbCk6IFByb21pc2U8YW55PnxudWxsIHtcbiAgICBjb25zdCBmbkFyZ3M6IGFueVtdID0gW107XG4gICAgaWYgKGFyZ3MuYXJncykge1xuICAgICAgYXJncy5hcmdzLmZvckVhY2goYXJndW1lbnQgPT4ge1xuICAgICAgICBpZiAoYXJndW1lbnQudHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgZm5BcmdzLnB1c2godGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoYXJndW1lbnQudmFsdWUsIGFyZ3VtZW50LnR5cGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaChhcmd1bWVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT58bnVsbDtcbiAgICBsZXQgaWQ6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICBpZiAocmV0dXJuVHlwZSAhPSBudWxsKSB7XG4gICAgICBsZXQgY29tcGxldGVyOiBQcm9taXNlQ29tcGxldGVyID0gdW5kZWZpbmVkICE7XG4gICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4geyBjb21wbGV0ZXIgPSB7cmVzb2x2ZSwgcmVqZWN0fTsgfSk7XG4gICAgICBpZCA9IHRoaXMuX2dlbmVyYXRlTWVzc2FnZUlkKGFyZ3MubWV0aG9kKTtcbiAgICAgIHRoaXMuX3BlbmRpbmcuc2V0KGlkLCBjb21wbGV0ZXIpO1xuXG4gICAgICBwcm9taXNlLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcGxldGVyLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgKHY6IGFueSkgPT4gdGhpcy5fc2VyaWFsaXplciA/IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUodiwgcmV0dXJuVHlwZSkgOiB2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZTogUmVxdWVzdE1lc3NhZ2VEYXRhID0ge1xuICAgICAgJ21ldGhvZCc6IGFyZ3MubWV0aG9kLFxuICAgICAgJ2FyZ3MnOiBmbkFyZ3MsXG4gICAgfTtcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgbWVzc2FnZVsnaWQnXSA9IGlkO1xuICAgIH1cbiAgICB0aGlzLl9zaW5rLmVtaXQobWVzc2FnZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlRGF0YSk6IHZvaWQge1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnIHx8IG1lc3NhZ2UudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgY29uc3QgaWQgPSBtZXNzYWdlLmlkICE7XG4gICAgICBpZiAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnKSB7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZy5nZXQoaWQpICEucmVzb2x2ZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nLmdldChpZCkgIS5yZWplY3QobWVzc2FnZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGVuZGluZy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgUmVxdWVzdE1lc3NhZ2VEYXRhIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M/OiBhbnlbXTtcbiAgaWQ/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBSZXNwb25zZU1lc3NhZ2VEYXRhIHtcbiAgdHlwZTogJ3Jlc3VsdCd8J2Vycm9yJztcbiAgdmFsdWU/OiBhbnk7XG4gIGlkPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBGbkFyZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge31cbn1cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgY2xhc3MgVWlBcmd1bWVudHMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWV0aG9kOiBzdHJpbmcsIHB1YmxpYyBhcmdzPzogRm5BcmdbXSkge31cbn1cbiJdfQ==