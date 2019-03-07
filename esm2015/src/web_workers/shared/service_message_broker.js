/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        });
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
        promise.then((result) => {
            this._sink.emit({
                'type': 'result',
                'value': this._serializer.serialize(result, type),
                'id': id,
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWUsVUFBVSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBT2pFLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQUt0QyxZQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7SUFLRCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7WUFoQkYsVUFBVTs7OztZQVBILFVBQVU7WUFDVixVQUFVOzs7Ozs7O0lBU2hCLGtEQUF3Qjs7Ozs7SUFHWixrREFBK0I7Ozs7Ozs7Ozs7QUFxQjdDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7SUFLL0IsWUFBWSxVQUFzQixFQUFVLFdBQXVCLEVBQVUsT0FBZTtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFIcEYsYUFBUSxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1FBSTdDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Y0FDOUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7Ozs7O0lBRUQsY0FBYyxDQUNWLFVBQWtCLEVBQUUsU0FBZ0QsRUFDcEUsTUFBMkMsRUFBRSxVQUFzQztRQUNyRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUF3QixFQUFFLEVBQUU7O2tCQUNuRCxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUk7O2tCQUM3QixPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDMUMsZ0JBQWdCLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O3NCQUMxQixhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLG1CQUFBLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkY7O2tCQUVLLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztZQUMzQyxJQUFJLFVBQVUsSUFBSSxPQUFPLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLE9BQXdCO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFTyxxQkFBcUIsQ0FBQyxFQUFVLEVBQUUsT0FBcUIsRUFBRSxJQUErQjtRQUU5RixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2dCQUNqRCxJQUFJLEVBQUUsRUFBRTthQUNULENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGOzs7Ozs7SUE3Q0MscUNBQWlDOzs7OztJQUNqQyx3Q0FBK0M7Ozs7O0lBR1gsMkNBQStCOzs7OztJQUFFLHVDQUF1Qjs7Ozs7O0FBOEM5RixxQ0FLQzs7O0lBSkMsaUNBQWU7O0lBQ2YsK0JBQVk7O0lBQ1osNkJBQVc7O0lBQ1gsK0JBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBTZXJ2aWNlTWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlTWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgVUlDb21wb25lbnRzIHRoYXQgYWxsb3dzIGNvbXBvbmVudHMgdG8gcmVnaXN0ZXIgbWV0aG9kcy5cbiAqIElmIGEgcmVnaXN0ZXJlZCBtZXRob2QgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm9rZXIgb24gdGhlIHdvcmtlcixcbiAqIHRoZSBVSU1lc3NhZ2VCcm9rZXIgZGVzZXJpYWxpemVzIGl0cyBhcmd1bWVudHMgYW5kIGNhbGxzIHRoZSByZWdpc3RlcmVkIG1ldGhvZC5cbiAqIElmIHRoYXQgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlLCB0aGUgVUlNZXNzYWdlQnJva2VyIHJldHVybnMgdGhlIHJlc3VsdCB0byB0aGUgd29ya2VyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgcHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgX21ldGhvZHMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIGNoYW5uZWw6IHN0cmluZykge1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2VCdXMuZnJvbShjaGFubmVsKTtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogYW55KSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpfSk7XG4gIH1cblxuICByZWdpc3Rlck1ldGhvZChcbiAgICAgIG1ldGhvZE5hbWU6IHN0cmluZywgc2lnbmF0dXJlOiBBcnJheTxUeXBlPGFueT58U2VyaWFsaXplclR5cGVzPnxudWxsLFxuICAgICAgbWV0aG9kOiAoLi4uXzogYW55W10pID0+IFByb21pc2U8YW55Pnwgdm9pZCwgcmV0dXJuVHlwZT86IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXRob2RzLnNldChtZXRob2ROYW1lLCAobWVzc2FnZTogUmVjZWl2ZWRNZXNzYWdlKSA9PiB7XG4gICAgICBjb25zdCBzZXJpYWxpemVkQXJncyA9IG1lc3NhZ2UuYXJncztcbiAgICAgIGNvbnN0IG51bUFyZ3MgPSBzaWduYXR1cmUgPyBzaWduYXR1cmUubGVuZ3RoIDogMDtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplZEFyZ3MgPSBuZXcgQXJyYXkobnVtQXJncyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUFyZ3M7IGkrKykge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkQXJnID0gc2VyaWFsaXplZEFyZ3NbaV07XG4gICAgICAgIGRlc2VyaWFsaXplZEFyZ3NbaV0gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWRBcmcsIHNpZ25hdHVyZSAhW2ldKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZCguLi5kZXNlcmlhbGl6ZWRBcmdzKTtcbiAgICAgIGlmIChyZXR1cm5UeXBlICYmIHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fd3JhcFdlYldvcmtlclByb21pc2UobWVzc2FnZS5pZCwgcHJvbWlzZSwgcmV0dXJuVHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhtZXNzYWdlLm1ldGhvZCkpIHtcbiAgICAgIHRoaXMuX21ldGhvZHMuZ2V0KG1lc3NhZ2UubWV0aG9kKSAhKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3dyYXBXZWJXb3JrZXJQcm9taXNlKGlkOiBzdHJpbmcsIHByb21pc2U6IFByb21pc2U8YW55PiwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyk6XG4gICAgICB2b2lkIHtcbiAgICBwcm9taXNlLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgICAndHlwZSc6ICdyZXN1bHQnLFxuICAgICAgICAndmFsdWUnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShyZXN1bHQsIHR5cGUpLFxuICAgICAgICAnaWQnOiBpZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVkTWVzc2FnZSB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBhcmdzOiBhbnlbXTtcbiAgaWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuIl19