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
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * \@experimental WebWorker support in Angular is currently experimental.
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
    { type: MessageBus, },
    { type: Serializer, },
];
function ServiceMessageBrokerFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ServiceMessageBrokerFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ServiceMessageBrokerFactory.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    ServiceMessageBrokerFactory.prototype._serializer;
    /** @type {?} */
    ServiceMessageBrokerFactory.prototype._messageBus;
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
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
        const /** @type {?} */ source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    registerMethod(methodName, signature, method, returnType) {
        this._methods.set(methodName, (message) => {
            const /** @type {?} */ serializedArgs = message.args;
            const /** @type {?} */ numArgs = signature ? signature.length : 0;
            const /** @type {?} */ deserializedArgs = new Array(numArgs);
            for (let /** @type {?} */ i = 0; i < numArgs; i++) {
                const /** @type {?} */ serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, /** @type {?} */ ((signature))[i]);
            }
            const /** @type {?} */ promise = method(...deserializedArgs);
            if (returnType && promise) {
                this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    _handleMessage(message) {
        if (this._methods.has(message.method)) {
            /** @type {?} */ ((this._methods.get(message.method)))(message);
        }
    }
    /**
     * @param {?} id
     * @param {?} promise
     * @param {?} type
     * @return {?}
     */
    _wrapWebWorkerPromise(id, promise, type) {
        promise.then((result) => {
            this._sink.emit({
                'type': 'result',
                'value': this._serializer.serialize(result, type),
                'id': id,
            });
        });
    }
}
function ServiceMessageBroker_tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceMessageBroker.prototype._sink;
    /** @type {?} */
    ServiceMessageBroker.prototype._methods;
    /** @type {?} */
    ServiceMessageBroker.prototype._serializer;
    /** @type {?} */
    ServiceMessageBroker.prototype.channel;
}
/**
 * \@experimental WebWorker support in Angular is currently experimental.
 * @record
 */
export function ReceivedMessage() { }
function ReceivedMessage_tsickle_Closure_declarations() {
    /** @type {?} */
    ReceivedMessage.prototype.method;
    /** @type {?} */
    ReceivedMessage.prototype.args;
    /** @type {?} */
    ReceivedMessage.prototype.id;
    /** @type {?} */
    ReceivedMessage.prototype.type;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUsVUFBVSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBT2pFLE1BQU07Ozs7OztJQUtKLFlBQW9CLFdBQXVCLEVBQUUsV0FBdUI7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7S0FDaEM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlFOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlDbEIsTUFBTTs7Ozs7OztJQUtKLFlBQVksVUFBc0IsRUFBVSxXQUF1QixFQUFVLE9BQWU7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO3dCQUh6RSxJQUFJLEdBQUcsRUFBb0I7UUFJNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLHVCQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0tBQzFFOzs7Ozs7OztJQUVELGNBQWMsQ0FDVixVQUFrQixFQUFFLFNBQWdELEVBQ3BFLE1BQTJDLEVBQUUsVUFBc0M7UUFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBd0IsRUFBRSxFQUFFO1lBQ3pELHVCQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3BDLHVCQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCx1QkFBTSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsdUJBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxxQkFBRSxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDbkY7WUFFRCx1QkFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzdEO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRU8sY0FBYyxDQUFDLE9BQXdCO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7K0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPO1NBQzVDOzs7Ozs7OztJQUdLLHFCQUFxQixDQUFDLEVBQVUsRUFBRSxPQUFxQixFQUFFLElBQStCO1FBRTlGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7Z0JBQ2pELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDOztDQUVOIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBTZXJ2aWNlTWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlTWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgVUlDb21wb25lbnRzIHRoYXQgYWxsb3dzIGNvbXBvbmVudHMgdG8gcmVnaXN0ZXIgbWV0aG9kcy5cbiAqIElmIGEgcmVnaXN0ZXJlZCBtZXRob2QgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm9rZXIgb24gdGhlIHdvcmtlcixcbiAqIHRoZSBVSU1lc3NhZ2VCcm9rZXIgZGVzZXJpYWxpemVzIGl0cyBhcmd1bWVudHMgYW5kIGNhbGxzIHRoZSByZWdpc3RlcmVkIG1ldGhvZC5cbiAqIElmIHRoYXQgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlLCB0aGUgVUlNZXNzYWdlQnJva2VyIHJldHVybnMgdGhlIHJlc3VsdCB0byB0aGUgd29ya2VyLlxuICpcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBjdXJyZW50bHkgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfbWV0aG9kcyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbj4oKTtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgY29uc3Qgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSl9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kKFxuICAgICAgbWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IEFycmF5PFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXM+fG51bGwsXG4gICAgICBtZXRob2Q6ICguLi5fOiBhbnlbXSkgPT4gUHJvbWlzZTxhbnk+fCB2b2lkLCByZXR1cm5UeXBlPzogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyk6IHZvaWQge1xuICAgIHRoaXMuX21ldGhvZHMuc2V0KG1ldGhvZE5hbWUsIChtZXNzYWdlOiBSZWNlaXZlZE1lc3NhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmdzID0gbWVzc2FnZS5hcmdzO1xuICAgICAgY29uc3QgbnVtQXJncyA9IHNpZ25hdHVyZSA/IHNpZ25hdHVyZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgZGVzZXJpYWxpemVkQXJncyA9IG5ldyBBcnJheShudW1BcmdzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQXJnczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmcgPSBzZXJpYWxpemVkQXJnc1tpXTtcbiAgICAgICAgZGVzZXJpYWxpemVkQXJnc1tpXSA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUoc2VyaWFsaXplZEFyZywgc2lnbmF0dXJlICFbaV0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9taXNlID0gbWV0aG9kKC4uLmRlc2VyaWFsaXplZEFyZ3MpO1xuICAgICAgaWYgKHJldHVyblR5cGUgJiYgcHJvbWlzZSkge1xuICAgICAgICB0aGlzLl93cmFwV2ViV29ya2VyUHJvbWlzZShtZXNzYWdlLmlkLCBwcm9taXNlLCByZXR1cm5UeXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWVzc2FnZTogUmVjZWl2ZWRNZXNzYWdlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21ldGhvZHMuaGFzKG1lc3NhZ2UubWV0aG9kKSkge1xuICAgICAgdGhpcy5fbWV0aG9kcy5nZXQobWVzc2FnZS5tZXRob2QpICEobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfd3JhcFdlYldvcmtlclByb21pc2UoaWQ6IHN0cmluZywgcHJvbWlzZTogUHJvbWlzZTxhbnk+LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzKTpcbiAgICAgIHZvaWQge1xuICAgIHByb21pc2UudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAgICd0eXBlJzogJ3Jlc3VsdCcsXG4gICAgICAgICd2YWx1ZSc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHJlc3VsdCwgdHlwZSksXG4gICAgICAgICdpZCc6IGlkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWNlaXZlZE1lc3NhZ2Uge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJnczogYW55W107XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cbiJdfQ==