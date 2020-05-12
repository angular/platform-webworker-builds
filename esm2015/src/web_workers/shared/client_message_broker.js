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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFlLFVBQVUsRUFBUSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRekQsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7O0lBS3JDLFlBQW9CLFdBQXVCLEVBQUUsV0FBdUI7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQzs7Ozs7OztJQUtELG1CQUFtQixDQUFDLE9BQWUsRUFBRSxZQUFxQixJQUFJO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUM7OztZQWhCRixVQUFVOzs7O1lBUkgsVUFBVTtZQUNWLFVBQVU7O3VIQVFMLDBCQUEwQjtxRkFBMUIsMEJBQTBCLFdBQTFCLDBCQUEwQjtrREFBMUIsMEJBQTBCO2NBRHRDLFVBQVU7Ozs7Ozs7SUFHVCxpREFBd0I7Ozs7O0lBR1osaURBQStCOzs7OztBQWE3QywrQkFHQzs7O0lBRkMsbUNBQStCOztJQUMvQixrQ0FBMkI7Ozs7Ozs7QUFRN0IsTUFBTSxPQUFPLG1CQUFt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RWpDLDBDQUErQjs7Ozs7SUFHOEIsc0NBQW9COzs7OztBQW1GbkYsaUNBSUM7OztJQUhDLG9DQUFlOztJQUNmLGtDQUFhOztJQUNiLGdDQUFZOzs7OztBQUdkLGtDQUlDOzs7SUFIQyxtQ0FBdUI7O0lBQ3ZCLG9DQUFZOztJQUNaLGlDQUFZOzs7Ozs7O0FBUWQsTUFBTSxPQUFPLEtBQUs7Ozs7O0lBQ2hCLFlBQ1csS0FBVSxFQUFTLHdCQUEyRDtRQUE5RSxVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBdUQ7SUFBRyxDQUFDO0NBQzlGOzs7SUFESyxzQkFBaUI7O0lBQUUscUJBQWtFOzs7Ozs7O0FBUTNGLE1BQU0sT0FBTyxXQUFXOzs7OztJQUN0QixZQUFtQixNQUFjLEVBQVMsSUFBYztRQUFyQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBVTtJQUFHLENBQUM7Q0FDN0Q7OztJQURhLDZCQUFxQjs7SUFBRSwyQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuL3NlcmlhbGl6ZXInO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBDbGllbnRNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gICAgdGhpcy5fbWVzc2FnZUJ1cy5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHJldHVybiBuZXcgQ2xpZW50TWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUHJvbWlzZUNvbXBsZXRlciB7XG4gIHJlc29sdmU6IChyZXN1bHQ6IGFueSkgPT4gdm9pZDtcbiAgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbmV4cG9ydCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgcHJpdmF0ZSBfcGVuZGluZyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlQ29tcGxldGVyPigpO1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBjaGFubmVsOiBhbnkpIHtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gICAgY29uc3Qgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuXG4gICAgc291cmNlLnN1YnNjcmliZSh7bmV4dDogKG1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZURhdGEpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSl9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlTWVzc2FnZUlkKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdGltZTogc3RyaW5nID0gc3RyaW5naWZ5KG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICBsZXQgaXRlcmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIGxldCBpZDogc3RyaW5nID0gbmFtZSArIHRpbWUgKyBzdHJpbmdpZnkoaXRlcmF0aW9uKTtcbiAgICB3aGlsZSAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICBpZCA9IGAke25hbWV9JHt0aW1lfSR7aXRlcmF0aW9ufWA7XG4gICAgICBpdGVyYXRpb24rKztcbiAgICB9XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgcnVuT25TZXJ2aWNlKGFyZ3M6IFVpQXJndW1lbnRzLCByZXR1cm5UeXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzfG51bGwpOiBQcm9taXNlPGFueT58bnVsbCB7XG4gICAgY29uc3QgZm5BcmdzOiBhbnlbXSA9IFtdO1xuICAgIGlmIChhcmdzLmFyZ3MpIHtcbiAgICAgIGFyZ3MuYXJncy5mb3JFYWNoKGFyZ3VtZW50ID0+IHtcbiAgICAgICAgaWYgKGFyZ3VtZW50LnR5cGUgIT0gbnVsbCkge1xuICAgICAgICAgIGZuQXJncy5wdXNoKHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGFyZ3VtZW50LnZhbHVlLCBhcmd1bWVudC50eXBlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm5BcmdzLnB1c2goYXJndW1lbnQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxhbnk+fG51bGw7XG4gICAgbGV0IGlkOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgaWYgKHJldHVyblR5cGUgIT0gbnVsbCkge1xuICAgICAgbGV0IGNvbXBsZXRlcjogUHJvbWlzZUNvbXBsZXRlciA9IHVuZGVmaW5lZCE7XG4gICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb21wbGV0ZXIgPSB7cmVzb2x2ZSwgcmVqZWN0fTtcbiAgICAgIH0pO1xuICAgICAgaWQgPSB0aGlzLl9nZW5lcmF0ZU1lc3NhZ2VJZChhcmdzLm1ldGhvZCk7XG4gICAgICB0aGlzLl9wZW5kaW5nLnNldChpZCwgY29tcGxldGVyKTtcblxuICAgICAgcHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGlmIChjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBsZXRlci5yZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKFxuICAgICAgICAgICh2OiBhbnkpID0+IHRoaXMuX3NlcmlhbGl6ZXIgPyB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHYsIHJldHVyblR5cGUpIDogdik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2U6IFJlcXVlc3RNZXNzYWdlRGF0YSA9IHtcbiAgICAgICdtZXRob2QnOiBhcmdzLm1ldGhvZCxcbiAgICAgICdhcmdzJzogZm5BcmdzLFxuICAgIH07XG4gICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgIG1lc3NhZ2VbJ2lkJ10gPSBpZDtcbiAgICB9XG4gICAgdGhpcy5fc2luay5lbWl0KG1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZURhdGEpOiB2b2lkIHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSAncmVzdWx0JyB8fCBtZXNzYWdlLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnN0IGlkID0gbWVzc2FnZS5pZCE7XG4gICAgICBpZiAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnKSB7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZy5nZXQoaWQpIS5yZXNvbHZlKG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKSEucmVqZWN0KG1lc3NhZ2UudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BlbmRpbmcuZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RNZXNzYWdlRGF0YSB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBhcmdzPzogYW55W107XG4gIGlkPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmVzcG9uc2VNZXNzYWdlRGF0YSB7XG4gIHR5cGU6ICdyZXN1bHQnfCdlcnJvcic7XG4gIHZhbHVlPzogYW55O1xuICBpZD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNsYXNzIEZuQXJnIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7fVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgY2xhc3MgVWlBcmd1bWVudHMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWV0aG9kOiBzdHJpbmcsIHB1YmxpYyBhcmdzPzogRm5BcmdbXSkge31cbn1cbiJdfQ==