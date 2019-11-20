/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
import * as i0 from "@angular/core";
import * as i1 from "./message_bus";
import * as i2 from "./serializer";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
    { type: Injectable },
];
/** @nocollapse */
ClientMessageBrokerFactory.ctorParameters = () => [
    { type: MessageBus },
    { type: Serializer }
];
/** @nocollapse */ ClientMessageBrokerFactory.ɵfac = function ClientMessageBrokerFactory_Factory(t) { return new (t || ClientMessageBrokerFactory)(i0.ɵɵinject(i1.MessageBus), i0.ɵɵinject(i2.Serializer)); };
/** @nocollapse */ ClientMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ClientMessageBrokerFactory, factory: function (t) { return ClientMessageBrokerFactory.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ClientMessageBrokerFactory, [{
        type: Injectable
    }], function () { return [{ type: i1.MessageBus }, { type: i2.Serializer }]; }, null); })();
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBrokerFactory.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    ClientMessageBrokerFactory.prototype._messageBus;
}
/**
 * @record
 */
function PromiseCompleter() { }
if (false) {
    /** @type {?} */
    PromiseCompleter.prototype.resolve;
    /** @type {?} */
    PromiseCompleter.prototype.reject;
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
        /** @type {?} */
        const source = messageBus.from(channel);
        source.subscribe({ next: (/**
             * @param {?} message
             * @return {?}
             */
            (message) => this._handleMessage(message)) });
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    _generateMessageId(name) {
        /** @type {?} */
        const time = stringify(new Date().getTime());
        /** @type {?} */
        let iteration = 0;
        /** @type {?} */
        let id = name + time + stringify(iteration);
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
        /** @type {?} */
        const fnArgs = [];
        if (args.args) {
            args.args.forEach((/**
             * @param {?} argument
             * @return {?}
             */
            argument => {
                if (argument.type != null) {
                    fnArgs.push(this._serializer.serialize(argument.value, argument.type));
                }
                else {
                    fnArgs.push(argument.value);
                }
            }));
        }
        /** @type {?} */
        let promise;
        /** @type {?} */
        let id = null;
        if (returnType != null) {
            /** @type {?} */
            let completer = (/** @type {?} */ (undefined));
            promise = new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => { completer = { resolve, reject }; }));
            id = this._generateMessageId(args.method);
            this._pending.set(id, completer);
            promise.catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                if (console && console.error) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                }
                completer.reject(err);
            }));
            promise = promise.then((/**
             * @param {?} v
             * @return {?}
             */
            (v) => this._serializer ? this._serializer.deserialize(v, returnType) : v));
        }
        else {
            promise = null;
        }
        /** @type {?} */
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
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    _handleMessage(message) {
        if (message.type === 'result' || message.type === 'error') {
            /** @type {?} */
            const id = (/** @type {?} */ (message.id));
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    (/** @type {?} */ (this._pending.get(id))).resolve(message.value);
                }
                else {
                    (/** @type {?} */ (this._pending.get(id))).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ClientMessageBroker.prototype._pending;
    /**
     * @type {?}
     * @private
     */
    ClientMessageBroker.prototype._sink;
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBroker.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    ClientMessageBroker.prototype.channel;
}
/**
 * @record
 */
function RequestMessageData() { }
if (false) {
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
if (false) {
    /** @type {?} */
    ResponseMessageData.prototype.type;
    /** @type {?|undefined} */
    ResponseMessageData.prototype.value;
    /** @type {?|undefined} */
    ResponseMessageData.prototype.id;
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
if (false) {
    /** @type {?} */
    FnArg.prototype.value;
    /** @type {?} */
    FnArg.prototype.type;
}
/**
 * \@publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
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
if (false) {
    /** @type {?} */
    UiArguments.prototype.method;
    /** @type {?} */
    UiArguments.prototype.args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQWUsVUFBVSxFQUFRLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBT3pELE1BQU0sT0FBTywwQkFBMEI7Ozs7OztJQUtyQyxZQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOztvR0FPTCwwQkFBMEI7a0VBQTFCLDBCQUEwQixpQ0FBMUIsMEJBQTBCO2tEQUExQiwwQkFBMEI7Y0FEdEMsVUFBVTs7Ozs7OztJQUdULGlEQUF3Qjs7Ozs7SUFHWixpREFBK0I7Ozs7O0FBYTdDLCtCQUdDOzs7SUFGQyxtQ0FBK0I7O0lBQy9CLGtDQUEyQjs7Ozs7O0FBTzdCLE1BQU0sT0FBTyxtQkFBbUI7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MENBQStCOzs7OztJQUc4QixzQ0FBb0I7Ozs7O0FBaUZuRixpQ0FJQzs7O0lBSEMsb0NBQWU7O0lBQ2Ysa0NBQWE7O0lBQ2IsZ0NBQVk7Ozs7O0FBR2Qsa0NBSUM7OztJQUhDLG1DQUF1Qjs7SUFDdkIsb0NBQVk7O0lBQ1osaUNBQVk7Ozs7OztBQU9kLE1BQU0sT0FBTyxLQUFLOzs7OztJQUNoQixZQUNXLEtBQVUsRUFBUyx3QkFBMkQ7UUFBOUUsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFTLFNBQUksR0FBSixJQUFJLENBQXVEO0lBQUcsQ0FBQztDQUM5Rjs7O0lBREssc0JBQWlCOztJQUFFLHFCQUFrRTs7Ozs7O0FBTzNGLE1BQU0sT0FBTyxXQUFXOzs7OztJQUN0QixZQUFtQixNQUFjLEVBQVMsSUFBYztRQUFyQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBVTtJQUFHLENBQUM7Q0FDN0Q7OztJQURhLDZCQUFxQjs7SUFBRSwyQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuL3NlcmlhbGl6ZXInO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIENsaWVudE1lc3NhZ2VCcm9rZXJ9IHRvIGl0LlxuICAgKi9cbiAgY3JlYXRlTWVzc2FnZUJyb2tlcihjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBDbGllbnRNZXNzYWdlQnJva2VyKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbmludGVyZmFjZSBQcm9taXNlQ29tcGxldGVyIHtcbiAgcmVzb2x2ZTogKHJlc3VsdDogYW55KSA9PiB2b2lkO1xuICByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3BlbmRpbmcgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZUNvbXBsZXRlcj4oKTtcbiAgcHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogYW55KSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2VCdXMuZnJvbShjaGFubmVsKTtcblxuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZU1lc3NhZ2VJZChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRpbWU6IHN0cmluZyA9IHN0cmluZ2lmeShuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgbGV0IGl0ZXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICBsZXQgaWQ6IHN0cmluZyA9IG5hbWUgKyB0aW1lICsgc3RyaW5naWZ5KGl0ZXJhdGlvbik7XG4gICAgd2hpbGUgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgaWQgPSBgJHtuYW1lfSR7dGltZX0ke2l0ZXJhdGlvbn1gO1xuICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHJ1bk9uU2VydmljZShhcmdzOiBVaUFyZ3VtZW50cywgcmV0dXJuVHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlc3xudWxsKTogUHJvbWlzZTxhbnk+fG51bGwge1xuICAgIGNvbnN0IGZuQXJnczogYW55W10gPSBbXTtcbiAgICBpZiAoYXJncy5hcmdzKSB7XG4gICAgICBhcmdzLmFyZ3MuZm9yRWFjaChhcmd1bWVudCA9PiB7XG4gICAgICAgIGlmIChhcmd1bWVudC50eXBlICE9IG51bGwpIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaCh0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShhcmd1bWVudC52YWx1ZSwgYXJndW1lbnQudHlwZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZuQXJncy5wdXNoKGFyZ3VtZW50LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PnxudWxsO1xuICAgIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgIGlmIChyZXR1cm5UeXBlICE9IG51bGwpIHtcbiAgICAgIGxldCBjb21wbGV0ZXI6IFByb21pc2VDb21wbGV0ZXIgPSB1bmRlZmluZWQgITtcbiAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IGNvbXBsZXRlciA9IHtyZXNvbHZlLCByZWplY3R9OyB9KTtcbiAgICAgIGlkID0gdGhpcy5fZ2VuZXJhdGVNZXNzYWdlSWQoYXJncy5tZXRob2QpO1xuICAgICAgdGhpcy5fcGVuZGluZy5zZXQoaWQsIGNvbXBsZXRlcik7XG5cbiAgICAgIHByb21pc2UuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGVycik7XG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihcbiAgICAgICAgICAodjogYW55KSA9PiB0aGlzLl9zZXJpYWxpemVyID8gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZSh2LCByZXR1cm5UeXBlKSA6IHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlOiBSZXF1ZXN0TWVzc2FnZURhdGEgPSB7XG4gICAgICAnbWV0aG9kJzogYXJncy5tZXRob2QsXG4gICAgICAnYXJncyc6IGZuQXJncyxcbiAgICB9O1xuICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICBtZXNzYWdlWydpZCddID0gaWQ7XG4gICAgfVxuICAgIHRoaXMuX3NpbmsuZW1pdChtZXNzYWdlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VEYXRhKTogdm9pZCB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ3Jlc3VsdCcgfHwgbWVzc2FnZS50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zdCBpZCA9IG1lc3NhZ2UuaWQgITtcbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nLmhhcyhpZCkpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ3Jlc3VsdCcpIHtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nLmdldChpZCkgIS5yZXNvbHZlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKSAhLnJlamVjdChtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wZW5kaW5nLmRlbGV0ZShpZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0TWVzc2FnZURhdGEge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJncz86IGFueVtdO1xuICBpZD86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFJlc3BvbnNlTWVzc2FnZURhdGEge1xuICB0eXBlOiAncmVzdWx0J3wnZXJyb3InO1xuICB2YWx1ZT86IGFueTtcbiAgaWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNsYXNzIEZuQXJnIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7fVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjbGFzcyBVaUFyZ3VtZW50cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXRob2Q6IHN0cmluZywgcHVibGljIGFyZ3M/OiBGbkFyZ1tdKSB7fVxufVxuIl19