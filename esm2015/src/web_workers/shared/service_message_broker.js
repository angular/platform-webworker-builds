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
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * \@publicApi
 */
export class ServiceMessageBrokerFactory {
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
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker(this._messageBus, this._serializer, channel);
    }
}
ServiceMessageBrokerFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ServiceMessageBrokerFactory.ctorParameters = () => [
    { type: MessageBus },
    { type: Serializer }
];
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ServiceMessageBrokerFactory.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    ServiceMessageBrokerFactory.prototype._messageBus;
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@publicApi
 */
export class ServiceMessageBroker {
    /**
     * \@internal
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    constructor(messageBus, _serializer, channel) {
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        /** @type {?} */
        const source = messageBus.from(channel);
        source.subscribe({ next: (/**
             * @param {?} message
             * @return {?}
             */
            (message) => this._handleMessage(message)) });
    }
    /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    registerMethod(methodName, signature, method, returnType) {
        this._methods.set(methodName, (/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            /** @type {?} */
            const serializedArgs = message.args;
            /** @type {?} */
            const numArgs = signature ? signature.length : 0;
            /** @type {?} */
            const deserializedArgs = new Array(numArgs);
            for (let i = 0; i < numArgs; i++) {
                /** @type {?} */
                const serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, (/** @type {?} */ (signature))[i]);
            }
            /** @type {?} */
            const promise = method(...deserializedArgs);
            if (returnType && promise) {
                this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        }));
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    _handleMessage(message) {
        if (this._methods.has(message.method)) {
            (/** @type {?} */ (this._methods.get(message.method)))(message);
        }
    }
    /**
     * @private
     * @param {?} id
     * @param {?} promise
     * @param {?} type
     * @return {?}
     */
    _wrapWebWorkerPromise(id, promise, type) {
        promise.then((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            this._sink.emit({
                'type': 'result',
                'value': this._serializer.serialize(result, type),
                'id': id,
            });
        }));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ServiceMessageBroker.prototype._sink;
    /**
     * @type {?}
     * @private
     */
    ServiceMessageBroker.prototype._methods;
    /**
     * @type {?}
     * @private
     */
    ServiceMessageBroker.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    ServiceMessageBroker.prototype.channel;
}
/**
 * \@publicApi
 * @record
 */
export function ReceivedMessage() { }
if (false) {
    /** @type {?} */
    ReceivedMessage.prototype.method;
    /** @type {?} */
    ReceivedMessage.prototype.args;
    /** @type {?} */
    ReceivedMessage.prototype.id;
    /** @type {?} */
    ReceivedMessage.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUsVUFBVSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBT2pFLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQUt0QyxZQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOzs7Ozs7O0lBU2hCLGtEQUF3Qjs7Ozs7SUFHWixrREFBK0I7Ozs7Ozs7Ozs7QUFxQjdDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7SUFLL0IsWUFBWSxVQUFzQixFQUFVLFdBQXVCLEVBQVUsT0FBZTtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFIcEYsYUFBUSxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBSTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Y0FDOUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJOzs7O1lBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7Ozs7SUFFRCxjQUFjLENBQ1YsVUFBa0IsRUFBRSxTQUFnRCxFQUNwRSxNQUEyQyxFQUFFLFVBQXNDO1FBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVU7Ozs7UUFBRSxDQUFDLE9BQXdCLEVBQUUsRUFBRTs7a0JBQ25ELGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSTs7a0JBQzdCLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O2tCQUMxQyxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTs7c0JBQzFCLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsbUJBQUEsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRjs7a0JBRUssT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1lBQzNDLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtnQkFDekIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsT0FBd0I7UUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsbUJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzs7Ozs7OztJQUVPLHFCQUFxQixDQUFDLEVBQVUsRUFBRSxPQUFxQixFQUFFLElBQStCO1FBRTlGLE9BQU8sQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7Z0JBQ2pELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7Ozs7OztJQTdDQyxxQ0FBaUM7Ozs7O0lBQ2pDLHdDQUErQzs7Ozs7SUFHWCwyQ0FBK0I7Ozs7O0lBQUUsdUNBQXVCOzs7Ozs7QUE4QzlGLHFDQUtDOzs7SUFKQyxpQ0FBZTs7SUFDZiwrQkFBWTs7SUFDWiw2QkFBVzs7SUFDWCwrQkFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIFNlcnZpY2VNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VNZXNzYWdlQnJva2VyKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBVSUNvbXBvbmVudHMgdGhhdCBhbGxvd3MgY29tcG9uZW50cyB0byByZWdpc3RlciBtZXRob2RzLlxuICogSWYgYSByZWdpc3RlcmVkIG1ldGhvZCBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIGJyb2tlciBvbiB0aGUgd29ya2VyLFxuICogdGhlIFVJTWVzc2FnZUJyb2tlciBkZXNlcmlhbGl6ZXMgaXRzIGFyZ3VtZW50cyBhbmQgY2FsbHMgdGhlIHJlZ2lzdGVyZWQgbWV0aG9kLlxuICogSWYgdGhhdCBtZXRob2QgcmV0dXJucyBhIHByb21pc2UsIHRoZSBVSU1lc3NhZ2VCcm9rZXIgcmV0dXJucyB0aGUgcmVzdWx0IHRvIHRoZSB3b3JrZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfbWV0aG9kcyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbj4oKTtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgY29uc3Qgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSl9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kKFxuICAgICAgbWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IEFycmF5PFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXM+fG51bGwsXG4gICAgICBtZXRob2Q6ICguLi5fOiBhbnlbXSkgPT4gUHJvbWlzZTxhbnk+fCB2b2lkLCByZXR1cm5UeXBlPzogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyk6IHZvaWQge1xuICAgIHRoaXMuX21ldGhvZHMuc2V0KG1ldGhvZE5hbWUsIChtZXNzYWdlOiBSZWNlaXZlZE1lc3NhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmdzID0gbWVzc2FnZS5hcmdzO1xuICAgICAgY29uc3QgbnVtQXJncyA9IHNpZ25hdHVyZSA/IHNpZ25hdHVyZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgZGVzZXJpYWxpemVkQXJncyA9IG5ldyBBcnJheShudW1BcmdzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQXJnczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmcgPSBzZXJpYWxpemVkQXJnc1tpXTtcbiAgICAgICAgZGVzZXJpYWxpemVkQXJnc1tpXSA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUoc2VyaWFsaXplZEFyZywgc2lnbmF0dXJlICFbaV0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kKC4uLmRlc2VyaWFsaXplZEFyZ3MpO1xuICAgICAgaWYgKHJldHVyblR5cGUgJiYgcHJvbWlzZSkge1xuICAgICAgICB0aGlzLl93cmFwV2ViV29ya2VyUHJvbWlzZShtZXNzYWdlLmlkLCBwcm9taXNlLCByZXR1cm5UeXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWVzc2FnZTogUmVjZWl2ZWRNZXNzYWdlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21ldGhvZHMuaGFzKG1lc3NhZ2UubWV0aG9kKSkge1xuICAgICAgdGhpcy5fbWV0aG9kcy5nZXQobWVzc2FnZS5tZXRob2QpICEobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfd3JhcFdlYldvcmtlclByb21pc2UoaWQ6IHN0cmluZywgcHJvbWlzZTogUHJvbWlzZTxhbnk+LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzKTpcbiAgICAgIHZvaWQge1xuICAgIHByb21pc2UudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAgICd0eXBlJzogJ3Jlc3VsdCcsXG4gICAgICAgICd2YWx1ZSc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHJlc3VsdCwgdHlwZSksXG4gICAgICAgICdpZCc6IGlkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZWl2ZWRNZXNzYWdlIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M6IGFueVtdO1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG4iXX0=