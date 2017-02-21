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
import { stringify } from '../../facade/lang';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */
var ClientMessageBrokerFactory = (function () {
    function ClientMessageBrokerFactory() {
    }
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ClientMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) { };
    return ClientMessageBrokerFactory;
}());
export { ClientMessageBrokerFactory };
var ClientMessageBrokerFactory_ = (function (_super) {
    __extends(ClientMessageBrokerFactory_, _super);
    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ClientMessageBrokerFactory_(_messageBus, _serializer) {
        var _this = _super.call(this) || this;
        _this._messageBus = _messageBus;
        _this._serializer = _serializer;
        return _this;
    }
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ClientMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
    };
    return ClientMessageBrokerFactory_;
}(ClientMessageBrokerFactory));
export { ClientMessageBrokerFactory_ };
ClientMessageBrokerFactory_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ClientMessageBrokerFactory_.ctorParameters = function () { return [
    { type: MessageBus, },
    { type: Serializer, },
]; };
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
var ClientMessageBroker = (function () {
    function ClientMessageBroker() {
    }
    /**
     * @abstract
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    ClientMessageBroker.prototype.runOnService = function (args, returnType) { };
    return ClientMessageBroker;
}());
export { ClientMessageBroker };
var ClientMessageBroker_ = (function (_super) {
    __extends(ClientMessageBroker_, _super);
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ClientMessageBroker_(messageBus, _serializer, channel) {
        var _this = _super.call(this) || this;
        _this.channel = channel;
        _this._pending = new Map();
        _this._sink = messageBus.to(channel);
        _this._serializer = _serializer;
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
        return _this;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ClientMessageBroker_.prototype._generateMessageId = function (name) {
        var /** @type {?} */ time = stringify(new Date().getTime());
        var /** @type {?} */ iteration = 0;
        var /** @type {?} */ id = name + time + stringify(iteration);
        while (this._pending.has(id)) {
            id = "" + name + time + iteration;
            iteration++;
        }
        return id;
    };
    /**
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    ClientMessageBroker_.prototype.runOnService = function (args, returnType) {
        var _this = this;
        var /** @type {?} */ fnArgs = [];
        if (args.args) {
            args.args.forEach(function (argument) {
                if (argument.type != null) {
                    fnArgs.push(_this._serializer.serialize(argument.value, argument.type));
                }
                else {
                    fnArgs.push(argument.value);
                }
            });
        }
        var /** @type {?} */ promise;
        var /** @type {?} */ id = null;
        if (returnType != null) {
            var /** @type {?} */ completer_1;
            promise = new Promise(function (resolve, reject) { completer_1 = { resolve: resolve, reject: reject }; });
            id = this._generateMessageId(args.method);
            this._pending.set(id, completer_1);
            promise.catch(function (err) {
                if (console && console.error) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                }
                completer_1.reject(err);
            });
            promise = promise.then(function (v) { return _this._serializer ? _this._serializer.deserialize(v, returnType) : v; });
        }
        else {
            promise = null;
        }
        var /** @type {?} */ message = {
            'method': args.method,
            'args': fnArgs,
        };
        if (id != null) {
            message['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ClientMessageBroker_.prototype._handleMessage = function (message) {
        if (message.type === 'result' || message.type === 'error') {
            var /** @type {?} */ id = message.id;
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    this._pending.get(id).resolve(message.value);
                }
                else {
                    this._pending.get(id).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    };
    return ClientMessageBroker_;
}(ClientMessageBroker));
export { ClientMessageBroker_ };
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
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
var FnArg = (function () {
    /**
     * @param {?} value
     * @param {?=} type
     */
    function FnArg(value, type) {
        if (type === void 0) { type = 1 /* PRIMITIVE */; }
        this.value = value;
        this.type = type;
    }
    return FnArg;
}());
export { FnArg };
function FnArg_tsickle_Closure_declarations() {
    /** @type {?} */
    FnArg.prototype.value;
    /** @type {?} */
    FnArg.prototype.type;
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
var UiArguments = (function () {
    /**
     * @param {?} method
     * @param {?=} args
     */
    function UiArguments(method, args) {
        this.method = method;
        this.args = args;
    }
    return UiArguments;
}());
export { UiArguments };
function UiArguments_tsickle_Closure_declarations() {
    /** @type {?} */
    UiArguments.prototype.method;
    /** @type {?} */
    UiArguments.prototype.args;
}
//# sourceMappingURL=client_message_broker.js.map