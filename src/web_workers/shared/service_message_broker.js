/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */
var ServiceMessageBrokerFactory = (function () {
    function ServiceMessageBrokerFactory() {
    }
    /**
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ServiceMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) { };
    return ServiceMessageBrokerFactory;
}());
export { ServiceMessageBrokerFactory };
var ServiceMessageBrokerFactory_ = (function (_super) {
    __extends(ServiceMessageBrokerFactory_, _super);
    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
        var _this = _super.call(this) || this;
        _this._messageBus = _messageBus;
        _this._serializer = _serializer;
        return _this;
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ServiceMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
    };
    return ServiceMessageBrokerFactory_;
}(ServiceMessageBrokerFactory));
export { ServiceMessageBrokerFactory_ };
ServiceMessageBrokerFactory_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServiceMessageBrokerFactory_.ctorParameters = function () { return [
    { type: MessageBus, },
    { type: Serializer, },
]; };
function ServiceMessageBrokerFactory__tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceMessageBrokerFactory_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServiceMessageBrokerFactory_.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    ServiceMessageBrokerFactory_.prototype._serializer;
    /** @type {?} */
    ServiceMessageBrokerFactory_.prototype._messageBus;
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */
var ServiceMessageBroker = (function () {
    function ServiceMessageBroker() {
    }
    /**
     * @abstract
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    ServiceMessageBroker.prototype.registerMethod = function (methodName, signature, method, returnType) { };
    return ServiceMessageBroker;
}());
export { ServiceMessageBroker };
var ServiceMessageBroker_ = (function (_super) {
    __extends(ServiceMessageBroker_, _super);
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ServiceMessageBroker_(messageBus, _serializer, channel) {
        var _this = _super.call(this) || this;
        _this._serializer = _serializer;
        _this.channel = channel;
        _this._methods = new Map();
        _this._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
        return _this;
    }
    /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    ServiceMessageBroker_.prototype.registerMethod = function (methodName, signature, method, returnType) {
        var _this = this;
        this._methods.set(methodName, function (message) {
            var /** @type {?} */ serializedArgs = message.args;
            var /** @type {?} */ numArgs = signature ? signature.length : 0;
            var /** @type {?} */ deserializedArgs = new Array(numArgs);
            for (var /** @type {?} */ i = 0; i < numArgs; i++) {
                var /** @type {?} */ serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
            }
            var /** @type {?} */ promise = method.apply(void 0, deserializedArgs);
            if (returnType && promise) {
                _this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ServiceMessageBroker_.prototype._handleMessage = function (message) {
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    };
    /**
     * @param {?} id
     * @param {?} promise
     * @param {?} type
     * @return {?}
     */
    ServiceMessageBroker_.prototype._wrapWebWorkerPromise = function (id, promise, type) {
        var _this = this;
        promise.then(function (result) {
            _this._sink.emit({
                'type': 'result',
                'value': _this._serializer.serialize(result, type),
                'id': id,
            });
        });
    };
    return ServiceMessageBroker_;
}(ServiceMessageBroker));
export { ServiceMessageBroker_ };
function ServiceMessageBroker__tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceMessageBroker_.prototype._sink;
    /** @type {?} */
    ServiceMessageBroker_.prototype._methods;
    /** @type {?} */
    ServiceMessageBroker_.prototype._serializer;
    /** @type {?} */
    ServiceMessageBroker_.prototype.channel;
}
//# sourceMappingURL=service_message_broker.js.map