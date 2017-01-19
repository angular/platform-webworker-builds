/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core/index';
import { isPresent, print, stringify } from '../../facade/lang';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */
export class ClientMessageBrokerFactory {
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone) { }
}
export class ClientMessageBrokerFactory_ extends ClientMessageBrokerFactory {
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
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
    }
}
ClientMessageBrokerFactory_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ClientMessageBrokerFactory_.ctorParameters = () => [
    { type: MessageBus, },
    { type: Serializer, },
];
function ClientMessageBrokerFactory__tsickle_Closure_declarations() {
    /** @type {?} */
    ClientMessageBrokerFactory_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ClientMessageBrokerFactory_.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBrokerFactory_.prototype._serializer;
    /** @type {?} */
    ClientMessageBrokerFactory_.prototype._messageBus;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */
export class ClientMessageBroker {
    /**
     * @abstract
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    runOnService(args, returnType) { }
}
export class ClientMessageBroker_ extends ClientMessageBroker {
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    constructor(messageBus, _serializer, channel /** TODO #9100 */) {
        super();
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        const source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    _generateMessageId(name) {
        const /** @type {?} */ time = stringify(new Date().getTime());
        let /** @type {?} */ iteration = 0;
        let /** @type {?} */ id = name + time + stringify(iteration);
        while (isPresent(((this) /** TODO #9100 */)._pending[id])) {
            id = `${name}${time}${iteration}`;
            iteration++;
        }
        return id;
    }
    /**
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    runOnService(args, returnType) {
        const /** @type {?} */ fnArgs = [];
        if (isPresent(args.args)) {
            args.args.forEach(argument => {
                if (argument.type != null) {
                    fnArgs.push(this._serializer.serialize(argument.value, argument.type));
                }
                else {
                    fnArgs.push(argument.value);
                }
            });
        }
        let /** @type {?} */ promise;
        let /** @type {?} */ id = null;
        if (returnType != null) {
            let /** @type {?} */ completer;
            promise = new Promise((resolve, reject) => { completer = { resolve, reject }; });
            id = this._generateMessageId(args.method);
            this._pending.set(id, completer);
            promise.catch((err) => {
                print(err);
                completer.reject(err);
            });
            promise = promise.then((value) => {
                if (this._serializer == null) {
                    return value;
                }
                else {
                    return this._serializer.deserialize(value, returnType);
                }
            });
        }
        else {
            promise = null;
        }
        // TODO(jteplitz602): Create a class for these messages so we don't keep using StringMap #3685
        const /** @type {?} */ message = { 'method': args.method, 'args': fnArgs };
        if (id != null) {
            ((message) /** TODO #9100 */)['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    _handleMessage(message) {
        const /** @type {?} */ data = new MessageData(message);
        // TODO(jteplitz602): replace these strings with messaging constants #3685
        if (data.type === 'result' || data.type === 'error') {
            const /** @type {?} */ id = data.id;
            if (this._pending.has(id)) {
                if (data.type === 'result') {
                    this._pending.get(id).resolve(data.value);
                }
                else {
                    this._pending.get(id).reject(data.value);
                }
                this._pending.delete(id);
            }
        }
    }
}
function ClientMessageBroker__tsickle_Closure_declarations() {
    /** @type {?} */
    ClientMessageBroker_.prototype._pending;
    /** @type {?} */
    ClientMessageBroker_.prototype._sink;
    /**
     * \@internal
     * @type {?}
     */
    ClientMessageBroker_.prototype._serializer;
    /** @type {?} */
    ClientMessageBroker_.prototype.channel;
}
class MessageData {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.type = data['type'];
        this.id = this._getValueIfPresent(data, 'id');
        this.value = this._getValueIfPresent(data, 'value');
    }
    /**
     * Returns the value if present, otherwise returns null
     * \@internal
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    _getValueIfPresent(data, key) {
        return data.hasOwnProperty(key) ? data[key] : null;
    }
}
function MessageData_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageData.prototype.type;
    /** @type {?} */
    MessageData.prototype.value;
    /** @type {?} */
    MessageData.prototype.id;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class FnArg {
    /**
     * @param {?} value
     * @param {?} type
     */
    constructor(value /** TODO #9100 */, type) {
        this.value = value;
        this.type = type;
    }
}
function FnArg_tsickle_Closure_declarations() {
    /** @type {?} */
    FnArg.prototype.value;
    /** @type {?} */
    FnArg.prototype.type;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
export class UiArguments {
    /**
     * @param {?} method
     * @param {?=} args
     */
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}
function UiArguments_tsickle_Closure_declarations() {
    /** @type {?} */
    UiArguments.prototype.method;
    /** @type {?} */
    UiArguments.prototype.args;
}
//# sourceMappingURL=client_message_broker.js.map