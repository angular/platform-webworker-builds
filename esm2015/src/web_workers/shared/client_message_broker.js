/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    { type: Injectable }
];
/** @nocollapse */
ClientMessageBrokerFactory.ctorParameters = () => [
    { type: MessageBus },
    { type: Serializer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0td2Vid29ya2VyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFlLFVBQVUsRUFBUSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxjQUFjLENBQUM7Ozs7O0FBT3pELE1BQU0sT0FBTywwQkFBMEI7Ozs7OztJQUtyQyxZQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOzs7Ozs7O0lBU2hCLGlEQUF3Qjs7Ozs7SUFHWixpREFBK0I7Ozs7O0FBYTdDLCtCQUdDOzs7SUFGQyxtQ0FBK0I7O0lBQy9CLGtDQUEyQjs7Ozs7O0FBTzdCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7SUFPOUIsWUFBWSxVQUFzQixFQUFFLFdBQXVCLEVBQVUsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFOekUsYUFBUSxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBT3JELElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7Y0FDekIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJOzs7O1lBQUUsQ0FBQyxPQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7Ozs7OztJQUVPLGtCQUFrQixDQUFDLElBQVk7O2NBQy9CLElBQUksR0FBVyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7WUFDaEQsU0FBUyxHQUFXLENBQUM7O1lBQ3JCLEVBQUUsR0FBVyxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVMsRUFBRSxDQUFDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxJQUFpQixFQUFFLFVBQTBDOztjQUNsRSxNQUFNLEdBQVUsRUFBRTtRQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUN4RTtxQkFBTTtvQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKOztZQUVHLE9BQTBCOztZQUMxQixFQUFFLEdBQWdCLElBQUk7UUFDMUIsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFOztnQkFDbEIsU0FBUyxHQUFxQixtQkFBQSxTQUFTLEVBQUU7WUFDN0MsT0FBTyxHQUFHLElBQUksT0FBTzs7Ozs7WUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLFNBQVMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1lBQy9FLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVqQyxPQUFPLENBQUMsS0FBSzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQzVCLHNDQUFzQztvQkFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBRUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixDQUFDLEVBQUMsQ0FBQztZQUVILE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSTs7OztZQUNsQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztTQUNyRjthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjs7Y0FFSyxPQUFPLEdBQXVCO1lBQ2xDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNyQixNQUFNLEVBQUUsTUFBTTtTQUNmO1FBQ0QsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNwQjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXpCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxPQUE0QjtRQUNqRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFOztrQkFDbkQsRUFBRSxHQUFHLG1CQUFBLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDekIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsbUJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDTCxtQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9DO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQXJGQyx1Q0FBdUQ7Ozs7O0lBQ3ZELG9DQUFpQzs7Ozs7SUFFakMsMENBQStCOzs7OztJQUc4QixzQ0FBb0I7Ozs7O0FBaUZuRixpQ0FJQzs7O0lBSEMsb0NBQWU7O0lBQ2Ysa0NBQWE7O0lBQ2IsZ0NBQVk7Ozs7O0FBR2Qsa0NBSUM7OztJQUhDLG1DQUF1Qjs7SUFDdkIsb0NBQVk7O0lBQ1osaUNBQVk7Ozs7O0FBTWQsTUFBTSxPQUFPLEtBQUs7Ozs7O0lBQ2hCLFlBQ1csS0FBVSxFQUFTLHdCQUEyRDtRQUE5RSxVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBdUQ7SUFBRyxDQUFDO0NBQzlGOzs7SUFESyxzQkFBaUI7O0lBQUUscUJBQWtFOzs7OztBQU0zRixNQUFNLE9BQU8sV0FBVzs7Ozs7SUFDdEIsWUFBbUIsTUFBYyxFQUFTLElBQWM7UUFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVU7SUFBRyxDQUFDO0NBQzdEOzs7SUFEYSw2QkFBcUI7O0lBQUUsMkJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi9zZXJpYWxpemVyJztcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdmVyc2lvbiAxMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBDbGllbnRNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogQ2xpZW50TWVzc2FnZUJyb2tlciB7XG4gICAgdGhpcy5fbWVzc2FnZUJ1cy5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHJldHVybiBuZXcgQ2xpZW50TWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUHJvbWlzZUNvbXBsZXRlciB7XG4gIHJlc29sdmU6IChyZXN1bHQ6IGFueSkgPT4gdm9pZDtcbiAgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHZlcnNpb24gMTBcbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudE1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9wZW5kaW5nID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2VDb21wbGV0ZXI+KCk7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIGNoYW5uZWw6IGFueSkge1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgICBjb25zdCBzb3VyY2UgPSBtZXNzYWdlQnVzLmZyb20oY2hhbm5lbCk7XG5cbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlRGF0YSkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlKX0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVNZXNzYWdlSWQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB0aW1lOiBzdHJpbmcgPSBzdHJpbmdpZnkobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgIGxldCBpdGVyYXRpb246IG51bWJlciA9IDA7XG4gICAgbGV0IGlkOiBzdHJpbmcgPSBuYW1lICsgdGltZSArIHN0cmluZ2lmeShpdGVyYXRpb24pO1xuICAgIHdoaWxlICh0aGlzLl9wZW5kaW5nLmhhcyhpZCkpIHtcbiAgICAgIGlkID0gYCR7bmFtZX0ke3RpbWV9JHtpdGVyYXRpb259YDtcbiAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBydW5PblNlcnZpY2UoYXJnczogVWlBcmd1bWVudHMsIHJldHVyblR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXN8bnVsbCk6IFByb21pc2U8YW55PnxudWxsIHtcbiAgICBjb25zdCBmbkFyZ3M6IGFueVtdID0gW107XG4gICAgaWYgKGFyZ3MuYXJncykge1xuICAgICAgYXJncy5hcmdzLmZvckVhY2goYXJndW1lbnQgPT4ge1xuICAgICAgICBpZiAoYXJndW1lbnQudHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgZm5BcmdzLnB1c2godGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoYXJndW1lbnQudmFsdWUsIGFyZ3VtZW50LnR5cGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaChhcmd1bWVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT58bnVsbDtcbiAgICBsZXQgaWQ6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICBpZiAocmV0dXJuVHlwZSAhPSBudWxsKSB7XG4gICAgICBsZXQgY29tcGxldGVyOiBQcm9taXNlQ29tcGxldGVyID0gdW5kZWZpbmVkICE7XG4gICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4geyBjb21wbGV0ZXIgPSB7cmVzb2x2ZSwgcmVqZWN0fTsgfSk7XG4gICAgICBpZCA9IHRoaXMuX2dlbmVyYXRlTWVzc2FnZUlkKGFyZ3MubWV0aG9kKTtcbiAgICAgIHRoaXMuX3BlbmRpbmcuc2V0KGlkLCBjb21wbGV0ZXIpO1xuXG4gICAgICBwcm9taXNlLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcGxldGVyLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgKHY6IGFueSkgPT4gdGhpcy5fc2VyaWFsaXplciA/IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUodiwgcmV0dXJuVHlwZSkgOiB2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZTogUmVxdWVzdE1lc3NhZ2VEYXRhID0ge1xuICAgICAgJ21ldGhvZCc6IGFyZ3MubWV0aG9kLFxuICAgICAgJ2FyZ3MnOiBmbkFyZ3MsXG4gICAgfTtcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgbWVzc2FnZVsnaWQnXSA9IGlkO1xuICAgIH1cbiAgICB0aGlzLl9zaW5rLmVtaXQobWVzc2FnZSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlRGF0YSk6IHZvaWQge1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnIHx8IG1lc3NhZ2UudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgY29uc3QgaWQgPSBtZXNzYWdlLmlkICE7XG4gICAgICBpZiAodGhpcy5fcGVuZGluZy5oYXMoaWQpKSB7XG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdyZXN1bHQnKSB7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZy5nZXQoaWQpICEucmVzb2x2ZShtZXNzYWdlLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nLmdldChpZCkgIS5yZWplY3QobWVzc2FnZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGVuZGluZy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgUmVxdWVzdE1lc3NhZ2VEYXRhIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M/OiBhbnlbXTtcbiAgaWQ/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBSZXNwb25zZU1lc3NhZ2VEYXRhIHtcbiAgdHlwZTogJ3Jlc3VsdCd8J2Vycm9yJztcbiAgdmFsdWU/OiBhbnk7XG4gIGlkPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEZuQXJnIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7fVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFVpQXJndW1lbnRzIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1ldGhvZDogc3RyaW5nLCBwdWJsaWMgYXJncz86IEZuQXJnW10pIHt9XG59XG4iXX0=