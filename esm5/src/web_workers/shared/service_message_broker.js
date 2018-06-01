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
var ServiceMessageBrokerFactory = /** @class */ (function () {
    /** @internal */
    function ServiceMessageBrokerFactory(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    ServiceMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker(this._messageBus, this._serializer, channel);
    };
    ServiceMessageBrokerFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ServiceMessageBrokerFactory.ctorParameters = function () { return [
        { type: MessageBus },
        { type: Serializer }
    ]; };
    return ServiceMessageBrokerFactory;
}());
export { ServiceMessageBrokerFactory };
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
var ServiceMessageBroker = /** @class */ (function () {
    /** @internal */
    function ServiceMessageBroker(messageBus, _serializer, channel) {
        var _this = this;
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
    }
    ServiceMessageBroker.prototype.registerMethod = function (methodName, signature, method, returnType) {
        var _this = this;
        this._methods.set(methodName, function (message) {
            var serializedArgs = message.args;
            var numArgs = signature ? signature.length : 0;
            var deserializedArgs = new Array(numArgs);
            for (var i = 0; i < numArgs; i++) {
                var serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
            }
            var promise = method.apply(void 0, tslib_1.__spread(deserializedArgs));
            if (returnType && promise) {
                _this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    };
    ServiceMessageBroker.prototype._handleMessage = function (message) {
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    };
    ServiceMessageBroker.prototype._wrapWebWorkerPromise = function (id, promise, type) {
        var _this = this;
        promise.then(function (result) {
            _this._sink.emit({
                'type': 'result',
                'value': _this._serializer.serialize(result, type),
                'id': id,
            });
        });
    };
    return ServiceMessageBroker;
}());
export { ServiceMessageBroker };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBZSxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFHakU7O0dBRUc7QUFDSDtJQUtFLGdCQUFnQjtJQUNoQixxQ0FBb0IsV0FBdUIsRUFBRSxXQUF1QjtRQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCx5REFBbUIsR0FBbkIsVUFBb0IsT0FBZSxFQUFFLFNBQXlCO1FBQXpCLDBCQUFBLEVBQUEsZ0JBQXlCO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9FLENBQUM7O2dCQWhCRixVQUFVOzs7O2dCQVBILFVBQVU7Z0JBQ1YsVUFBVTs7SUF1QmxCLGtDQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FoQlksMkJBQTJCO0FBa0J4Qzs7Ozs7OztHQU9HO0FBQ0g7SUFJRSxnQkFBZ0I7SUFDaEIsOEJBQVksVUFBc0IsRUFBVSxXQUF1QixFQUFVLE9BQWU7UUFBNUYsaUJBSUM7UUFKMkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSHBGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUk3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQUMsT0FBWSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBNUIsQ0FBNEIsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFDSSxVQUFrQixFQUFFLFNBQWdELEVBQ3BFLE1BQTJDLEVBQUUsVUFBc0M7UUFGdkYsaUJBaUJDO1FBZEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUMsT0FBd0I7WUFDckQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFNLGdCQUFnQixHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLElBQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1lBRUQsSUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBSSxnQkFBZ0IsRUFBQyxDQUFDO1lBQzVDLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtnQkFDekIsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sNkNBQWMsR0FBdEIsVUFBdUIsT0FBd0I7UUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVPLG9EQUFxQixHQUE3QixVQUE4QixFQUFVLEVBQUUsT0FBcUIsRUFBRSxJQUErQjtRQUFoRyxpQkFTQztRQVBDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixPQUFPLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztnQkFDakQsSUFBSSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFdlYldvcmtlciBzdXBwb3J0IGluIEFuZ3VsYXIgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIFNlcnZpY2VNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VNZXNzYWdlQnJva2VyKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBVSUNvbXBvbmVudHMgdGhhdCBhbGxvd3MgY29tcG9uZW50cyB0byByZWdpc3RlciBtZXRob2RzLlxuICogSWYgYSByZWdpc3RlcmVkIG1ldGhvZCBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIGJyb2tlciBvbiB0aGUgd29ya2VyLFxuICogdGhlIFVJTWVzc2FnZUJyb2tlciBkZXNlcmlhbGl6ZXMgaXRzIGFyZ3VtZW50cyBhbmQgY2FsbHMgdGhlIHJlZ2lzdGVyZWQgbWV0aG9kLlxuICogSWYgdGhhdCBtZXRob2QgcmV0dXJucyBhIHByb21pc2UsIHRoZSBVSU1lc3NhZ2VCcm9rZXIgcmV0dXJucyB0aGUgcmVzdWx0IHRvIHRoZSB3b3JrZXIuXG4gKlxuICogQGV4cGVyaW1lbnRhbCBXZWJXb3JrZXIgc3VwcG9ydCBpbiBBbmd1bGFyIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIF9tZXRob2RzID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPigpO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBjaGFubmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICBjb25zdCBzb3VyY2UgPSBtZXNzYWdlQnVzLmZyb20oY2hhbm5lbCk7XG4gICAgc291cmNlLnN1YnNjcmliZSh7bmV4dDogKG1lc3NhZ2U6IGFueSkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlKX0pO1xuICB9XG5cbiAgcmVnaXN0ZXJNZXRob2QoXG4gICAgICBtZXRob2ROYW1lOiBzdHJpbmcsIHNpZ25hdHVyZTogQXJyYXk8VHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcz58bnVsbCxcbiAgICAgIG1ldGhvZDogKC4uLl86IGFueVtdKSA9PiBQcm9taXNlPGFueT58IHZvaWQsIHJldHVyblR5cGU/OiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzKTogdm9pZCB7XG4gICAgdGhpcy5fbWV0aG9kcy5zZXQobWV0aG9kTmFtZSwgKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSkgPT4ge1xuICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZ3MgPSBtZXNzYWdlLmFyZ3M7XG4gICAgICBjb25zdCBudW1BcmdzID0gc2lnbmF0dXJlID8gc2lnbmF0dXJlLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBkZXNlcmlhbGl6ZWRBcmdzID0gbmV3IEFycmF5KG51bUFyZ3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BcmdzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZyA9IHNlcmlhbGl6ZWRBcmdzW2ldO1xuICAgICAgICBkZXNlcmlhbGl6ZWRBcmdzW2ldID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShzZXJpYWxpemVkQXJnLCBzaWduYXR1cmUgIVtpXSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBtZXRob2QoLi4uZGVzZXJpYWxpemVkQXJncyk7XG4gICAgICBpZiAocmV0dXJuVHlwZSAmJiBwcm9taXNlKSB7XG4gICAgICAgIHRoaXMuX3dyYXBXZWJXb3JrZXJQcm9taXNlKG1lc3NhZ2UuaWQsIHByb21pc2UsIHJldHVyblR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBSZWNlaXZlZE1lc3NhZ2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbWV0aG9kcy5oYXMobWVzc2FnZS5tZXRob2QpKSB7XG4gICAgICB0aGlzLl9tZXRob2RzLmdldChtZXNzYWdlLm1ldGhvZCkgIShtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93cmFwV2ViV29ya2VyUHJvbWlzZShpZDogc3RyaW5nLCBwcm9taXNlOiBQcm9taXNlPGFueT4sIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMpOlxuICAgICAgdm9pZCB7XG4gICAgcHJvbWlzZS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICAgJ3R5cGUnOiAncmVzdWx0JyxcbiAgICAgICAgJ3ZhbHVlJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocmVzdWx0LCB0eXBlKSxcbiAgICAgICAgJ2lkJzogaWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWwgV2ViV29ya2VyIHN1cHBvcnQgaW4gQW5ndWxhciBpcyBjdXJyZW50bHkgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VpdmVkTWVzc2FnZSB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBhcmdzOiBhbnlbXTtcbiAgaWQ6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuIl19