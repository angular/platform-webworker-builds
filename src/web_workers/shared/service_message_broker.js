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
import { isPresent } from '../../facade/lang';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * @abstract
 */
export var ServiceMessageBrokerFactory = (function () {
    function ServiceMessageBrokerFactory() {
    }
    /**
     *  Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ServiceMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) { };
    return ServiceMessageBrokerFactory;
}());
export var ServiceMessageBrokerFactory_ = (function (_super) {
    __extends(ServiceMessageBrokerFactory_, _super);
    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
        _super.call(this);
        this._messageBus = _messageBus;
        this._serializer = _serializer;
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
    ServiceMessageBrokerFactory_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServiceMessageBrokerFactory_.ctorParameters = function () { return [
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return ServiceMessageBrokerFactory_;
}(ServiceMessageBrokerFactory));
function ServiceMessageBrokerFactory__tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceMessageBrokerFactory_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServiceMessageBrokerFactory_.ctorParameters;
    /** @type {?} */
    ServiceMessageBrokerFactory_.prototype._serializer;
    /** @type {?} */
    ServiceMessageBrokerFactory_.prototype._messageBus;
}
/**
 *  Helper class for UIComponents that allows components to register methods.
  * If a registered method message is received from the broker on the worker,
  * the UIMessageBroker deserializes its arguments and calls the registered method.
  * If that method returns a promise, the UIMessageBroker returns the result to the worker.
  * *
 * @abstract
 */
export var ServiceMessageBroker = (function () {
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
export var ServiceMessageBroker_ = (function (_super) {
    __extends(ServiceMessageBroker_, _super);
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ServiceMessageBroker_(messageBus, _serializer, channel /** TODO #9100 */) {
        var _this = this;
        _super.call(this);
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
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
            var /** @type {?} */ numArgs = signature === null ? 0 : signature.length;
            var /** @type {?} */ deserializedArgs = new Array(numArgs);
            for (var /** @type {?} */ i = 0; i < numArgs; i++) {
                var /** @type {?} */ serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
            }
            var /** @type {?} */ promise = method.apply(void 0, deserializedArgs);
            if (isPresent(returnType) && promise) {
                _this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    };
    /**
     * @param {?} map
     * @return {?}
     */
    ServiceMessageBroker_.prototype._handleMessage = function (map) {
        var /** @type {?} */ message = new ReceivedMessage(map);
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
            _this._sink.emit({ 'type': 'result', 'value': _this._serializer.serialize(result, type), 'id': id });
        });
    };
    return ServiceMessageBroker_;
}(ServiceMessageBroker));
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
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export var ReceivedMessage = (function () {
    /**
     * @param {?} data
     */
    function ReceivedMessage(data) {
        this.method = data['method'];
        this.args = data['args'];
        this.id = data['id'];
        this.type = data['type'];
    }
    return ReceivedMessage;
}());
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
//# sourceMappingURL=service_message_broker.js.map