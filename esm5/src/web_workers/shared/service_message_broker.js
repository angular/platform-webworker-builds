/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __read, __spread } from "tslib";
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
    ServiceMessageBrokerFactory = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MessageBus, Serializer])
    ], ServiceMessageBrokerFactory);
    return ServiceMessageBrokerFactory;
}());
export { ServiceMessageBrokerFactory };
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
 *     of Angular
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
            var deserializedArgs = [];
            for (var i = 0; i < numArgs; i++) {
                var serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
            }
            var promise = method.apply(void 0, __spread(deserializedArgs));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBZSxVQUFVLEVBQU8sTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFHakU7Ozs7R0FJRztBQUVIO0lBSUUsZ0JBQWdCO0lBQ2hCLHFDQUFvQixXQUF1QixFQUFFLFdBQXVCO1FBQWhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILHlEQUFtQixHQUFuQixVQUFvQixPQUFlLEVBQUUsU0FBeUI7UUFBekIsMEJBQUEsRUFBQSxnQkFBeUI7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQWZVLDJCQUEyQjtRQUR2QyxVQUFVLEVBQUU7eUNBTXNCLFVBQVUsRUFBZSxVQUFVO09BTHpELDJCQUEyQixDQWdCdkM7SUFBRCxrQ0FBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLDJCQUEyQjtBQWtCeEM7Ozs7Ozs7OztHQVNHO0FBQ0g7SUFJRSxnQkFBZ0I7SUFDaEIsOEJBQVksVUFBc0IsRUFBVSxXQUF1QixFQUFVLE9BQWU7UUFBNUYsaUJBSUM7UUFKMkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSHBGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUk3QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQUMsT0FBWSxJQUFLLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBNUIsQ0FBNEIsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFDSSxVQUFrQixFQUFFLFNBQWdELEVBQ3BFLE1BQTJDLEVBQUUsVUFBc0M7UUFGdkYsaUJBaUJDO1FBZEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUMsT0FBd0I7WUFDckQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoQyxJQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsRjtZQUVELElBQU0sT0FBTyxHQUFHLE1BQU0sd0JBQUksZ0JBQWdCLEVBQUMsQ0FBQztZQUM1QyxJQUFJLFVBQVUsSUFBSSxPQUFPLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM3RDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDZDQUFjLEdBQXRCLFVBQXVCLE9BQXdCO1FBQzdDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFTyxvREFBcUIsR0FBN0IsVUFBOEIsRUFBVSxFQUFFLE9BQXFCLEVBQUUsSUFBK0I7UUFBaEcsaUJBU0M7UUFQQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztZQUN2QixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7Z0JBQ2pELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgcGxhdGZvcm0td2Vid29ya2VyIGlzIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb25cbiAqICAgICBvZiBBbmd1bGFyXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBTZXJ2aWNlTWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlTWVzc2FnZUJyb2tlcih0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgVUlDb21wb25lbnRzIHRoYXQgYWxsb3dzIGNvbXBvbmVudHMgdG8gcmVnaXN0ZXIgbWV0aG9kcy5cbiAqIElmIGEgcmVnaXN0ZXJlZCBtZXRob2QgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm9rZXIgb24gdGhlIHdvcmtlcixcbiAqIHRoZSBVSU1lc3NhZ2VCcm9rZXIgZGVzZXJpYWxpemVzIGl0cyBhcmd1bWVudHMgYW5kIGNhbGxzIHRoZSByZWdpc3RlcmVkIG1ldGhvZC5cbiAqIElmIHRoYXQgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlLCB0aGUgVUlNZXNzYWdlQnJva2VyIHJldHVybnMgdGhlIHJlc3VsdCB0byB0aGUgd29ya2VyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIHBsYXRmb3JtLXdlYndvcmtlciBpcyBkZXByZWNhdGVkIGluIEFuZ3VsYXIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uXG4gKiAgICAgb2YgQW5ndWxhclxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfbWV0aG9kcyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbj4oKTtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHByaXZhdGUgY2hhbm5lbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2luayA9IG1lc3NhZ2VCdXMudG8oY2hhbm5lbCk7XG4gICAgY29uc3Qgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSl9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kKFxuICAgICAgbWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IEFycmF5PFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXM+fG51bGwsXG4gICAgICBtZXRob2Q6ICguLi5fOiBhbnlbXSkgPT4gUHJvbWlzZTxhbnk+fCB2b2lkLCByZXR1cm5UeXBlPzogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyk6IHZvaWQge1xuICAgIHRoaXMuX21ldGhvZHMuc2V0KG1ldGhvZE5hbWUsIChtZXNzYWdlOiBSZWNlaXZlZE1lc3NhZ2UpID0+IHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmdzID0gbWVzc2FnZS5hcmdzO1xuICAgICAgY29uc3QgbnVtQXJncyA9IHNpZ25hdHVyZSA/IHNpZ25hdHVyZS5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgZGVzZXJpYWxpemVkQXJncyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BcmdzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZEFyZyA9IHNlcmlhbGl6ZWRBcmdzW2ldO1xuICAgICAgICBkZXNlcmlhbGl6ZWRBcmdzW2ldID0gdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShzZXJpYWxpemVkQXJnLCBzaWduYXR1cmUhW2ldKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvbWlzZSA9IG1ldGhvZCguLi5kZXNlcmlhbGl6ZWRBcmdzKTtcbiAgICAgIGlmIChyZXR1cm5UeXBlICYmIHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fd3JhcFdlYldvcmtlclByb21pc2UobWVzc2FnZS5pZCwgcHJvbWlzZSwgcmV0dXJuVHlwZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhtZXNzYWdlLm1ldGhvZCkpIHtcbiAgICAgIHRoaXMuX21ldGhvZHMuZ2V0KG1lc3NhZ2UubWV0aG9kKSEobWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfd3JhcFdlYldvcmtlclByb21pc2UoaWQ6IHN0cmluZywgcHJvbWlzZTogUHJvbWlzZTxhbnk+LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzKTpcbiAgICAgIHZvaWQge1xuICAgIHByb21pc2UudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAgICd0eXBlJzogJ3Jlc3VsdCcsXG4gICAgICAgICd2YWx1ZSc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHJlc3VsdCwgdHlwZSksXG4gICAgICAgICdpZCc6IGlkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWNlaXZlZE1lc3NhZ2Uge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJnczogYW55W107XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbn1cbiJdfQ==