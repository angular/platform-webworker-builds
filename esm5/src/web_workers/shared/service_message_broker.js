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
var ServiceMessageBrokerFactory = /** @class */ (function () {
    /** @internal */
    function ServiceMessageBrokerFactory(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    /**
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ServiceMessageBrokerFactory.prototype.createMessageBroker = /**
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker(this._messageBus, this._serializer, channel);
    };
    ServiceMessageBrokerFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ServiceMessageBrokerFactory.ctorParameters = function () { return [
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return ServiceMessageBrokerFactory;
}());
export { ServiceMessageBrokerFactory };
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
var /**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 */
ServiceMessageBroker = /** @class */ (function () {
    /** @internal */
    function ServiceMessageBroker(messageBus, _serializer, channel) {
        var _this = this;
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        var /** @type {?} */ source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
    }
    /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    ServiceMessageBroker.prototype.registerMethod = /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    function (methodName, signature, method, returnType) {
        var _this = this;
        this._methods.set(methodName, function (message) {
            var /** @type {?} */ serializedArgs = message.args;
            var /** @type {?} */ numArgs = signature ? signature.length : 0;
            var /** @type {?} */ deserializedArgs = new Array(numArgs);
            for (var /** @type {?} */ i = 0; i < numArgs; i++) {
                var /** @type {?} */ serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, /** @type {?} */ ((signature))[i]);
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
    ServiceMessageBroker.prototype._handleMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (this._methods.has(message.method)) {
            /** @type {?} */ ((this._methods.get(message.method)))(message);
        }
    };
    /**
     * @param {?} id
     * @param {?} promise
     * @param {?} type
     * @return {?}
     */
    ServiceMessageBroker.prototype._wrapWebWorkerPromise = /**
     * @param {?} id
     * @param {?} promise
     * @param {?} type
     * @return {?}
     */
    function (id, promise, type) {
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
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 */
export { ServiceMessageBroker };
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
//# sourceMappingURL=service_message_broker.js.map