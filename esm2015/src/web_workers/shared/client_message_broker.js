/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/shared/client_message_broker.ts
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
/** @nocollapse */ ClientMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ClientMessageBrokerFactory, factory: ClientMessageBrokerFactory.ɵfac });
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
            (resolve, reject) => {
                completer = { resolve, reject };
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFlLFVBQVUsRUFBUSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQU96RCxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7SUFLckMsWUFBb0IsV0FBdUIsRUFBRSxXQUF1QjtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7O0lBS0QsbUJBQW1CLENBQUMsT0FBZSxFQUFFLFlBQXFCLElBQUk7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7O1lBaEJGLFVBQVU7Ozs7WUFQSCxVQUFVO1lBQ1YsVUFBVTs7dUhBT0wsMEJBQTBCO3FGQUExQiwwQkFBMEIsV0FBMUIsMEJBQTBCO2tEQUExQiwwQkFBMEI7Y0FEdEMsVUFBVTs7Ozs7OztJQUdULGlEQUF3Qjs7Ozs7SUFHWixpREFBK0I7Ozs7O0FBYTdDLCtCQUdDOzs7SUFGQyxtQ0FBK0I7O0lBQy9CLGtDQUEyQjs7Ozs7O0FBTzdCLE1BQU0sT0FBTyxtQkFBbUI7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QywwQ0FBK0I7Ozs7O0lBRzhCLHNDQUFvQjs7Ozs7QUFtRm5GLGlDQUlDOzs7SUFIQyxvQ0FBZTs7SUFDZixrQ0FBYTs7SUFDYixnQ0FBWTs7Ozs7QUFHZCxrQ0FJQzs7O0lBSEMsbUNBQXVCOztJQUN2QixvQ0FBWTs7SUFDWixpQ0FBWTs7Ozs7O0FBT2QsTUFBTSxPQUFPLEtBQUs7Ozs7O0lBQ2hCLFlBQ1csS0FBVSxFQUFTLHdCQUEyRDtRQUE5RSxVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBdUQ7SUFBRyxDQUFDO0NBQzlGOzs7SUFESyxzQkFBaUI7O0lBQUUscUJBQWtFOzs7Ozs7QUFPM0YsTUFBTSxPQUFPLFdBQVc7Ozs7O0lBQ3RCLFlBQW1CLE1BQWMsRUFBUyxJQUFjO1FBQXJDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFVO0lBQUcsQ0FBQztDQUM3RDs7O0lBRGEsNkJBQXFCOztJQUFFLDJCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFR5cGUsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4vbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4vc2VyaWFsaXplcic7XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBnaXZlbiBjaGFubmVsIGFuZCBhdHRhY2hlcyBhIG5ldyB7QGxpbmsgQ2xpZW50TWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IENsaWVudE1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IENsaWVudE1lc3NhZ2VCcm9rZXIodGhpcy5fbWVzc2FnZUJ1cywgdGhpcy5fc2VyaWFsaXplciwgY2hhbm5lbCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFByb21pc2VDb21wbGV0ZXIge1xuICByZXNvbHZlOiAocmVzdWx0OiBhbnkpID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEwXG4gKi9cbmV4cG9ydCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgcHJpdmF0ZSBfcGVuZGluZyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlQ29tcGxldGVyPigpO1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBjaGFubmVsOiBhbnkpIHtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gICAgY29uc3Qgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuXG4gICAgc291cmNlLnN1YnNjcmliZSh7bmV4dDogKG1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZURhdGEpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSl9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlTWVzc2FnZUlkKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdGltZTogc3RyaW5nID0gc3RyaW5naWZ5KG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICBsZXQgaXRlcmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIGxldCBpZDogc3RyaW5nID0gbmFtZSArIHRpbWUgKyBzdHJpbmdpZnkoaXRlcmF0aW9uKTtcbiAgICB3aGlsZSAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICBpZCA9IGAke25hbWV9JHt0aW1lfSR7aXRlcmF0aW9ufWA7XG4gICAgICBpdGVyYXRpb24rKztcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgcnVuT25TZXJ2aWNlKGFyZ3M6IFVpQXJndW1lbnRzLCByZXR1cm5UeXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzfG51bGwpOiBQcm9taXNlPGFueT58bnVsbCB7XG4gICAgY29uc3QgZm5BcmdzOiBhbnlbXSA9IFtdO1xuICAgIGlmIChhcmdzLmFyZ3MpIHtcbiAgICAgIGFyZ3MuYXJncy5mb3JFYWNoKGFyZ3VtZW50ID0+IHtcbiAgICAgICAgaWYgKGFyZ3VtZW50LnR5cGUgIT0gbnVsbCkge1xuICAgICAgICAgIGZuQXJncy5wdXNoKHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGFyZ3VtZW50LnZhbHVlLCBhcmd1bWVudC50eXBlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm5BcmdzLnB1c2goYXJndW1lbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxhbnk+fG51bGw7XG4gICAgbGV0IGlkOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgaWYgKHJldHVyblR5cGUgIT0gbnVsbCkge1xuICAgICAgbGV0IGNvbXBsZXRlcjogUHJvbWlzZUNvbXBsZXRlciA9IHVuZGVmaW5lZCE7XG4gICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb21wbGV0ZXIgPSB7cmVzb2x2ZSwgcmVqZWN0fTtcbiAgICAgIH0pO1xuICAgICAgaWQgPSB0aGlzLl9nZW5lcmF0ZU1lc3NhZ2VJZChhcmdzLm1ldGhvZCk7XG4gICAgICB0aGlzLl9wZW5kaW5nLnNldChpZCwgY29tcGxldGVyKTtcblxuICAgICAgcHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBsZXRlci5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKFxuICAgICAgICAgICh2OiBhbnkpID0+IHRoaXMuX3NlcmlhbGl6ZXIgPyB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHYsIHJldHVyblR5cGUpIDogdik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2U6IFJlcXVlc3RNZXNzYWdlRGF0YSA9IHtcbiAgICAgICdtZXRob2QnOiBhcmdzLm1ldGhvZCxcbiAgICAgICdhcmdzJzogZm5BcmdzLFxuICAgIH07XG4gICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgIG1lc3NhZ2VbJ2lkJ10gPSBpZDtcbiAgICB9XG4gICAgdGhpcy5fc2luay5lbWl0KG1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZURhdGEpOiB2b2lkIHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAncmVzdWx0JyB8fCBtZXNzYWdlLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnN0IGlkID0gbWVzc2FnZS5pZCE7XG4gICAgICBpZiAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnKSB7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZy5nZXQoaWQpIS5yZXNvbHZlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKSEucmVqZWN0KG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BlbmRpbmcuZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RNZXNzYWdlRGF0YSB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBhcmdzPzogYW55W107XG4gIGlkPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmVzcG9uc2VNZXNzYWdlRGF0YSB7XG4gIHR5cGU6ICdyZXN1bHQnfCdlcnJvcic7XG4gIHZhbHVlPzogYW55O1xuICBpZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5leHBvcnQgY2xhc3MgRm5Bcmcge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHt9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNsYXNzIFVpQXJndW1lbnRzIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1ldGhvZDogc3RyaW5nLCBwdWJsaWMgYXJncz86IEZuQXJnW10pIHt9XG59XG4iXX0=