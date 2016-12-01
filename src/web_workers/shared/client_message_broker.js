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
import { isPresent, print, stringify } from '../../facade/lang';
import { MessageBus } from './message_bus';
import { Serializer } from './serializer';
/**
 * @abstract
 */
export var ClientMessageBrokerFactory = (function () {
    function ClientMessageBrokerFactory() {
    }
    /**
     *  Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ClientMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) { };
    return ClientMessageBrokerFactory;
}());
export var ClientMessageBrokerFactory_ = (function (_super) {
    __extends(ClientMessageBrokerFactory_, _super);
    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ClientMessageBrokerFactory_(_messageBus, _serializer) {
        _super.call(this);
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     *  Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ClientMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
    };
    ClientMessageBrokerFactory_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ClientMessageBrokerFactory_.ctorParameters = function () { return [
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return ClientMessageBrokerFactory_;
}(ClientMessageBrokerFactory));
function ClientMessageBrokerFactory__tsickle_Closure_declarations() {
    /** @type {?} */
    ClientMessageBrokerFactory_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ClientMessageBrokerFactory_.ctorParameters;
    /** @type {?} */
    ClientMessageBrokerFactory_.prototype._serializer;
    /** @type {?} */
    ClientMessageBrokerFactory_.prototype._messageBus;
}
/**
 * @abstract
 */
export var ClientMessageBroker = (function () {
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
export var ClientMessageBroker_ = (function (_super) {
    __extends(ClientMessageBroker_, _super);
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ClientMessageBroker_(messageBus, _serializer, channel /** TODO #9100 */) {
        var _this = this;
        _super.call(this);
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        var source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ClientMessageBroker_.prototype._generateMessageId = function (name) {
        var /** @type {?} */ time = stringify(new Date().getTime());
        var /** @type {?} */ iteration = 0;
        var /** @type {?} */ id = name + time + stringify(iteration);
        while (isPresent(((this) /** TODO #9100 */)._pending[id])) {
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
        if (isPresent(args.args)) {
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
                print(err);
                completer_1.reject(err);
            });
            promise = promise.then(function (value) {
                if (_this._serializer == null) {
                    return value;
                }
                else {
                    return _this._serializer.deserialize(value, returnType);
                }
            });
        }
        else {
            promise = null;
        }
        // TODO(jteplitz602): Create a class for these messages so we don't keep using StringMap #3685
        var /** @type {?} */ message = { 'method': args.method, 'args': fnArgs };
        if (id != null) {
            ((message) /** TODO #9100 */)['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ClientMessageBroker_.prototype._handleMessage = function (message) {
        var /** @type {?} */ data = new MessageData(message);
        // TODO(jteplitz602): replace these strings with messaging constants #3685
        if (data.type === 'result' || data.type === 'error') {
            var /** @type {?} */ id = data.id;
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
    };
    return ClientMessageBroker_;
}(ClientMessageBroker));
function ClientMessageBroker__tsickle_Closure_declarations() {
    /** @type {?} */
    ClientMessageBroker_.prototype._pending;
    /** @type {?} */
    ClientMessageBroker_.prototype._sink;
    /** @type {?} */
    ClientMessageBroker_.prototype._serializer;
    /** @type {?} */
    ClientMessageBroker_.prototype.channel;
}
var MessageData = (function () {
    /**
     * @param {?} data
     */
    function MessageData(data) {
        this.type = data['type'];
        this.id = this._getValueIfPresent(data, 'id');
        this.value = this._getValueIfPresent(data, 'value');
    }
    /**
     *  Returns the value if present, otherwise returns null
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    MessageData.prototype._getValueIfPresent = function (data, key) {
        return data.hasOwnProperty(key) ? data[key] : null;
    };
    return MessageData;
}());
function MessageData_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageData.prototype.type;
    /** @type {?} */
    MessageData.prototype.value;
    /** @type {?} */
    MessageData.prototype.id;
}
/**
 * @experimental WebWorker support in Angular is experimental.
 */
export var FnArg = (function () {
    /**
     * @param {?} value
     * @param {?} type
     */
    function FnArg(value /** TODO #9100 */, type) {
        this.value = value;
        this.type = type;
    }
    return FnArg;
}());
function FnArg_tsickle_Closure_declarations() {
    /** @type {?} */
    FnArg.prototype.value;
    /** @type {?} */
    FnArg.prototype.type;
}
/**
 * @experimental WebWorker support in Angular is experimental.
 */
export var UiArguments = (function () {
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
function UiArguments_tsickle_Closure_declarations() {
    /** @type {?} */
    UiArguments.prototype.method;
    /** @type {?} */
    UiArguments.prototype.args;
}
//# sourceMappingURL=client_message_broker.js.map