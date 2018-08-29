/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
let ServiceMessageBrokerFactory = class ServiceMessageBrokerFactory {
    /** @internal */
    constructor(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker(this._messageBus, this._serializer, channel);
    }
};
ServiceMessageBrokerFactory = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [MessageBus, Serializer])
], ServiceMessageBrokerFactory);
export { ServiceMessageBrokerFactory };
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
export class ServiceMessageBroker {
    /** @internal */
    constructor(messageBus, _serializer, channel) {
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        const source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    registerMethod(methodName, signature, method, returnType) {
        this._methods.set(methodName, (message) => {
            const serializedArgs = message.args;
            const numArgs = signature ? signature.length : 0;
            const deserializedArgs = new Array(numArgs);
            for (let i = 0; i < numArgs; i++) {
                const serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, signature[i]);
            }
            const promise = method(...deserializedArgs);
            if (returnType && promise) {
                this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    }
    _handleMessage(message) {
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBZSxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFHakU7O0dBRUc7QUFFSCxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQUl0QyxnQkFBZ0I7SUFDaEIsWUFBb0IsV0FBdUIsRUFBRSxXQUF1QjtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsWUFBcUIsSUFBSTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQ0YsQ0FBQTtBQWhCWSwyQkFBMkI7SUFEdkMsVUFBVSxFQUFFOzZDQU1zQixVQUFVLEVBQWUsVUFBVTtHQUx6RCwyQkFBMkIsQ0FnQnZDO1NBaEJZLDJCQUEyQjtBQWtCeEM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsZ0JBQWdCO0lBQ2hCLFlBQVksVUFBc0IsRUFBVSxXQUF1QixFQUFVLE9BQWU7UUFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSHBGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUk3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsY0FBYyxDQUNWLFVBQWtCLEVBQUUsU0FBZ0QsRUFDcEUsTUFBMkMsRUFBRSxVQUFzQztRQUNyRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUF3QixFQUFFLEVBQUU7WUFDekQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNwQyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLGdCQUFnQixHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QyxJQUFJLFVBQVUsSUFBSSxPQUFPLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUF3QjtRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRU8scUJBQXFCLENBQUMsRUFBVSxFQUFFLE9BQXFCLEVBQUUsSUFBK0I7UUFFOUYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztnQkFDakQsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBjdXJyZW50bHkgZXhwZXJpbWVudGFsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBnaXZlbiBjaGFubmVsIGFuZCBhdHRhY2hlcyBhIG5ldyB7QGxpbmsgU2VydmljZU1lc3NhZ2VCcm9rZXJ9IHRvIGl0LlxuICAgKi9cbiAgY3JlYXRlTWVzc2FnZUJyb2tlcihjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiBTZXJ2aWNlTWVzc2FnZUJyb2tlciB7XG4gICAgdGhpcy5fbWVzc2FnZUJ1cy5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHJldHVybiBuZXcgU2VydmljZU1lc3NhZ2VCcm9rZXIodGhpcy5fbWVzc2FnZUJ1cywgdGhpcy5fc2VyaWFsaXplciwgY2hhbm5lbCk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgY2xhc3MgZm9yIFVJQ29tcG9uZW50cyB0aGF0IGFsbG93cyBjb21wb25lbnRzIHRvIHJlZ2lzdGVyIG1ldGhvZHMuXG4gKiBJZiBhIHJlZ2lzdGVyZWQgbWV0aG9kIG1lc3NhZ2UgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgYnJva2VyIG9uIHRoZSB3b3JrZXIsXG4gKiB0aGUgVUlNZXNzYWdlQnJva2VyIGRlc2VyaWFsaXplcyBpdHMgYXJndW1lbnRzIGFuZCBjYWxscyB0aGUgcmVnaXN0ZXJlZCBtZXRob2QuXG4gKiBJZiB0aGF0IG1ldGhvZCByZXR1cm5zIGEgcHJvbWlzZSwgdGhlIFVJTWVzc2FnZUJyb2tlciByZXR1cm5zIHRoZSByZXN1bHQgdG8gdGhlIHdvcmtlci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgcHJpdmF0ZSBfc2luazogRXZlbnRFbWl0dGVyPGFueT47XG4gIHByaXZhdGUgX21ldGhvZHMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCk7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIGNoYW5uZWw6IHN0cmluZykge1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2VCdXMuZnJvbShjaGFubmVsKTtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogYW55KSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpfSk7XG4gIH1cblxuICByZWdpc3Rlck1ldGhvZChcbiAgICAgIG1ldGhvZE5hbWU6IHN0cmluZywgc2lnbmF0dXJlOiBBcnJheTxUeXBlPGFueT58U2VyaWFsaXplclR5cGVzPnxudWxsLFxuICAgICAgbWV0aG9kOiAoLi4uXzogYW55W10pID0+IFByb21pc2U8YW55Pnwgdm9pZCwgcmV0dXJuVHlwZT86IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXRob2RzLnNldChtZXRob2ROYW1lLCAobWVzc2FnZTogUmVjZWl2ZWRNZXNzYWdlKSA9PiB7XG4gICAgICBjb25zdCBzZXJpYWxpemVkQXJncyA9IG1lc3NhZ2UuYXJncztcbiAgICAgIGNvbnN0IG51bUFyZ3MgPSBzaWduYXR1cmUgPyBzaWduYXR1cmUubGVuZ3RoIDogMDtcbiAgICAgIGNvbnN0IGRlc2VyaWFsaXplZEFyZ3MgPSBuZXcgQXJyYXkobnVtQXJncyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUFyZ3M7IGkrKykge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkQXJnID0gc2VyaWFsaXplZEFyZ3NbaV07XG4gICAgICAgIGRlc2VyaWFsaXplZEFyZ3NbaV0gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWRBcmcsIHNpZ25hdHVyZSAhW2ldKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZCguLi5kZXNlcmlhbGl6ZWRBcmdzKTtcbiAgICAgIGlmIChyZXR1cm5UeXBlICYmIHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fd3JhcFdlYldvcmtlclByb21pc2UobWVzc2FnZS5pZCwgcHJvbWlzZSwgcmV0dXJuVHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhtZXNzYWdlLm1ldGhvZCkpIHtcbiAgICAgIHRoaXMuX21ldGhvZHMuZ2V0KG1lc3NhZ2UubWV0aG9kKSAhKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3dyYXBXZWJXb3JrZXJQcm9taXNlKGlkOiBzdHJpbmcsIHByb21pc2U6IFByb21pc2U8YW55PiwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyk6XG4gICAgICB2b2lkIHtcbiAgICBwcm9taXNlLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgICAndHlwZSc6ICdyZXN1bHQnLFxuICAgICAgICAndmFsdWUnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShyZXN1bHQsIHR5cGUpLFxuICAgICAgICAnaWQnOiBpZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjZWl2ZWRNZXNzYWdlIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M6IGFueVtdO1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG4iXX0=