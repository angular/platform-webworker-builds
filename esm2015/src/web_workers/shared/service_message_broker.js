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
    { type: MessageBus },
    { type: Serializer }
];
function ServiceMessageBrokerFactory_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUsVUFBVSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBT2pFLE1BQU07Ozs7OztJQUtKLFlBQW9CLFdBQXVCLEVBQUUsV0FBdUI7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7S0FDaEM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlFOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNsQixNQUFNOzs7Ozs7O0lBS0osWUFBWSxVQUFzQixFQUFVLFdBQXVCLEVBQVUsT0FBZTtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7d0JBSHpFLElBQUksR0FBRyxFQUFvQjtRQUk1QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsdUJBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDMUU7Ozs7Ozs7O0lBRUQsY0FBYyxDQUNWLFVBQWtCLEVBQUUsU0FBZ0QsRUFDcEUsTUFBMkMsRUFBRSxVQUFzQztRQUNyRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUF3QixFQUFFLEVBQUU7WUFDekQsdUJBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDcEMsdUJBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELHVCQUFNLGdCQUFnQixHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyx1QkFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLHFCQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQzthQUNuRjtZQUVELHVCQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDN0Q7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFTyxjQUFjLENBQUMsT0FBd0I7UUFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzsrQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU87U0FDNUM7Ozs7Ozs7O0lBR0sscUJBQXFCLENBQUMsRUFBVSxFQUFFLE9BQXFCLEVBQUUsSUFBK0I7UUFFOUYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztnQkFDakQsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7O0NBRU4iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIFNlcnZpY2VNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VNZXNzYWdlQnJva2VyKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBVSUNvbXBvbmVudHMgdGhhdCBhbGxvd3MgY29tcG9uZW50cyB0byByZWdpc3RlciBtZXRob2RzLlxuICogSWYgYSByZWdpc3RlcmVkIG1ldGhvZCBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIGJyb2tlciBvbiB0aGUgd29ya2VyLFxuICogdGhlIFVJTWVzc2FnZUJyb2tlciBkZXNlcmlhbGl6ZXMgaXRzIGFyZ3VtZW50cyBhbmQgY2FsbHMgdGhlIHJlZ2lzdGVyZWQgbWV0aG9kLlxuICogSWYgdGhhdCBtZXRob2QgcmV0dXJucyBhIHByb21pc2UsIHRoZSBVSU1lc3NhZ2VCcm9rZXIgcmV0dXJucyB0aGUgcmVzdWx0IHRvIHRoZSB3b3JrZXIuXG4gKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIF9tZXRob2RzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPigpO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBjaGFubmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICBjb25zdCBzb3VyY2UgPSBtZXNzYWdlQnVzLmZyb20oY2hhbm5lbCk7XG4gICAgc291cmNlLnN1YnNjcmliZSh7bmV4dDogKG1lc3NhZ2U6IGFueSkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlKX0pO1xuICB9XG5cbiAgcmVnaXN0ZXJNZXRob2QoXG4gICAgICBtZXRob2ROYW1lOiBzdHJpbmcsIHNpZ25hdHVyZTogQXJyYXk8VHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcz58bnVsbCxcbiAgICAgIG1ldGhvZDogKC4uLl86IGFueVtdKSA9PiBQcm9taXNlPGFueT58IHZvaWQsIHJldHVyblR5cGU/OiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzKTogdm9pZCB7XG4gICAgdGhpcy5fbWV0aG9kcy5zZXQobWV0aG9kTmFtZSwgKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSkgPT4ge1xuICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZ3MgPSBtZXNzYWdlLmFyZ3M7XG4gICAgICBjb25zdCBudW1BcmdzID0gc2lnbmF0dXJlID8gc2lnbmF0dXJlLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBkZXNlcmlhbGl6ZWRBcmdzID0gbmV3IEFycmF5KG51bUFyZ3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BcmdzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZyA9IHNlcmlhbGl6ZWRBcmdzW2ldO1xuICAgICAgICBkZXNlcmlhbGl6ZWRBcmdzW2ldID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShzZXJpYWxpemVkQXJnLCBzaWduYXR1cmUgIVtpXSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2QoLi4uZGVzZXJpYWxpemVkQXJncyk7XG4gICAgICBpZiAocmV0dXJuVHlwZSAmJiBwcm9taXNlKSB7XG4gICAgICAgIHRoaXMuX3dyYXBXZWJXb3JrZXJQcm9taXNlKG1lc3NhZ2UuaWQsIHByb21pc2UsIHJldHVyblR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBSZWNlaXZlZE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWV0aG9kcy5oYXMobWVzc2FnZS5tZXRob2QpKSB7XG4gICAgICB0aGlzLl9tZXRob2RzLmdldChtZXNzYWdlLm1ldGhvZCkgIShtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93cmFwV2ViV29ya2VyUHJvbWlzZShpZDogc3RyaW5nLCBwcm9taXNlOiBQcm9taXNlPGFueT4sIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMpOlxuICAgICAgdm9pZCB7XG4gICAgcHJvbWlzZS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICAgJ3R5cGUnOiAncmVzdWx0JyxcbiAgICAgICAgJ3ZhbHVlJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocmVzdWx0LCB0eXBlKSxcbiAgICAgICAgJ2lkJzogaWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBjdXJyZW50bHkgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVkTWVzc2FnZSB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBhcmdzOiBhbnlbXTtcbiAgaWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuIl19