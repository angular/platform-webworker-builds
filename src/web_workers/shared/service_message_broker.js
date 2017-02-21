/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core/index';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
/**
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */
export class ServiceMessageBrokerFactory {
    /**
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone) { }
}
export class ServiceMessageBrokerFactory_ extends ServiceMessageBrokerFactory {
    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    constructor(_messageBus, _serializer) {
        super();
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
    }
}
ServiceMessageBrokerFactory_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ServiceMessageBrokerFactory_.ctorParameters = () => [
    { type: MessageBus, },
    { type: Serializer, },
];
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
export class ServiceMessageBroker {
    /**
     * @abstract
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */
    registerMethod(methodName, signature, method, returnType) { }
}
export class ServiceMessageBroker_ extends ServiceMessageBroker {
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    constructor(messageBus, _serializer, channel) {
        super();
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
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
            const /** @type {?} */ serializedArgs = message.args;
            const /** @type {?} */ numArgs = signature ? signature.length : 0;
            const /** @type {?} */ deserializedArgs = new Array(numArgs);
            for (let /** @type {?} */ i = 0; i < numArgs; i++) {
                const /** @type {?} */ serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, signature[i]);
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
            this._methods.get(message.method)(message);
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