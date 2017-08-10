/**
 * @license Angular v4.3.3-77fa3c3
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/platform-browser'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformWebworker = global.ng.platformWebworker || {}),global.ng.common,global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,_angular_common,_angular_core,_angular_platformBrowser) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @license Angular v4.3.3-77fa3c3
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ON_WEB_WORKER = new _angular_core.InjectionToken('WebWorker.onWebWorker');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 *
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @abstract
 */
var MessageBus = (function () {
    function MessageBus() {
    }
    /**
     * Sets up a new channel on the MessageBus.
     * MUST be called before calling from or to on the channel.
     * If runInZone is true then the source will emit events inside the angular zone
     * and the sink will buffer messages and send only once the zone exits.
     * if runInZone is false then the source will emit events inside the global zone
     * and the sink will send messages immediately.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    MessageBus.prototype.initChannel = function (channel, runInZone) { };
    /**
     * Assigns this bus to the given zone.
     * Any callbacks attached to channels where runInZone was set to true on initialization
     * will be executed in the given zone.
     * @abstract
     * @param {?} zone
     * @return {?}
     */
    MessageBus.prototype.attachToZone = function (zone) { };
    /**
     * Returns an {\@link EventEmitter} that emits every time a message
     * is received on the given channel.
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    MessageBus.prototype.from = function (channel) { };
    /**
     * Returns an {\@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    MessageBus.prototype.to = function (channel) { };
    return MessageBus;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var RenderStore = (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */
    RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
    /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    RenderStore.prototype.store = function (obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.remove = function (obj) {
        var /** @type {?} */ index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    RenderStore.prototype.deserialize = function (id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.serialize = function (obj) {
        return obj == null ? null : this._lookupByObject.get(obj);
    };
    return RenderStore;
}());
RenderStore.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
RenderStore.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Any type that does not need to be serialized (string, number, boolean)
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 * @deprecated in v4. Use SerializerTypes.PRIMITIVE instead
 */
var PRIMITIVE = 1;
var LocationType = (function () {
    /**
     * @param {?} href
     * @param {?} protocol
     * @param {?} host
     * @param {?} hostname
     * @param {?} port
     * @param {?} pathname
     * @param {?} search
     * @param {?} hash
     * @param {?} origin
     */
    function LocationType(href, protocol, host, hostname, port, pathname, search, hash, origin) {
        this.href = href;
        this.protocol = protocol;
        this.host = host;
        this.hostname = hostname;
        this.port = port;
        this.pathname = pathname;
        this.search = search;
        this.hash = hash;
        this.origin = origin;
    }
    return LocationType;
}());
var Serializer = (function () {
    /**
     * @param {?} _renderStore
     */
    function Serializer(_renderStore) {
        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */
    Serializer.prototype.serialize = function (obj, type /* PRIMITIVE */) {
        var _this = this;
        if (type === void 0) { type = 1; } /* PRIMITIVE */
        if (obj == null || type === 1 /* PRIMITIVE */) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(function (v) { return _this.serialize(v, type); });
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return ((this._renderStore.serialize(obj)));
        }
        if (type === _angular_core.RenderComponentType) {
            return this._serializeRenderComponentType(obj);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._serializeRendererType2(obj);
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error("No serializer for type " + _angular_core.ɵstringify(type));
    };
    /**
     * @param {?} map
     * @param {?=} type
     * @param {?=} data
     * @return {?}
     */
    Serializer.prototype.deserialize = function (map, type /* PRIMITIVE */, data) {
        var _this = this;
        if (type === void 0) { type = 1; } /* PRIMITIVE */
        if (map == null || type === 1 /* PRIMITIVE */) {
            return map;
        }
        if (Array.isArray(map)) {
            return map.map(function (val) { return _this.deserialize(val, type, data); });
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return this._renderStore.deserialize(map);
        }
        if (type === _angular_core.RenderComponentType) {
            return this._deserializeRenderComponentType(map);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._deserializeRendererType2(map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error("No deserializer for type " + _angular_core.ɵstringify(type));
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    Serializer.prototype._serializeLocation = function (loc) {
        return {
            'href': loc.href,
            'protocol': loc.protocol,
            'host': loc.host,
            'hostname': loc.hostname,
            'port': loc.port,
            'pathname': loc.pathname,
            'search': loc.search,
            'hash': loc.hash,
            'origin': loc.origin,
        };
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    Serializer.prototype._deserializeLocation = function (loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Serializer.prototype._serializeRenderComponentType = function (type) {
        return {
            'id': type.id,
            'templateUrl': type.templateUrl,
            'slotCount': type.slotCount,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
        };
    };
    /**
     * @param {?} props
     * @return {?}
     */
    Serializer.prototype._deserializeRenderComponentType = function (props) {
        return new _angular_core.RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Serializer.prototype._serializeRendererType2 = function (type) {
        return {
            'id': type.id,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
            'data': this.serialize(type.data),
        };
    };
    /**
     * @param {?} props
     * @return {?}
     */
    Serializer.prototype._deserializeRendererType2 = function (props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    };
    return Serializer;
}());
Serializer.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
Serializer.ctorParameters = function () { return [
    { type: RenderStore, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
ClientMessageBrokerFactory_.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ClientMessageBrokerFactory_.ctorParameters = function () { return [
    { type: MessageBus, },
    { type: Serializer, },
]; };
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
        var /** @type {?} */ time = _angular_core.ɵstringify(new Date().getTime());
        var /** @type {?} */ iteration = 0;
        var /** @type {?} */ id = name + time + _angular_core.ɵstringify(iteration);
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
            var /** @type {?} */ completer_1 = ((undefined));
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
            var /** @type {?} */ id = ((message.id));
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    ((this._pending.get(id))).resolve(message.value);
                }
                else {
                    ((this._pending.get(id))).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    };
    return ClientMessageBroker_;
}(ClientMessageBroker));
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
var FnArg = (function () {
    /**
     * @param {?} value
     * @param {?=} type
     */
    function FnArg(value, type /* PRIMITIVE */) {
        if (type === void 0) { type = 1; } /* PRIMITIVE */
        this.value = value;
        this.type = type;
    }
    return FnArg;
}());
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
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var PostMessageBusSink = (function () {
    /**
     * @param {?} _postMessageTarget
     */
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSink.prototype.attachToZone = function (zone) {
        var _this = this;
        this._zone = zone;
        this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
        var _this = this;
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new _angular_core.EventEmitter(false);
        var /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe(function (data) {
            var /** @type {?} */ message = { channel: channel, message: data };
            if (runInZone) {
                _this._messageBuffer.push(message);
            }
            else {
                _this._sendMessages([message]);
            }
        });
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBusSink.prototype.to = function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    /**
     * @return {?}
     */
    PostMessageBusSink.prototype._handleOnEventDone = function () {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    };
    /**
     * @param {?} messages
     * @return {?}
     */
    PostMessageBusSink.prototype._sendMessages = function (messages) { this._postMessageTarget.postMessage(messages); };
    return PostMessageBusSink;
}());
var PostMessageBusSource = (function () {
    /**
     * @param {?=} eventTarget
     */
    function PostMessageBusSource(eventTarget) {
        var _this = this;
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            var workerScope = self;
            workerScope.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSource.prototype.attachToZone = function (zone) { this._zone = zone; };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new _angular_core.EventEmitter(false);
        var /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBusSource.prototype.from = function (channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(channel + " is not set up. Did you forget to call initChannel?");
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    PostMessageBusSource.prototype._handleMessages = function (ev) {
        var /** @type {?} */ messages = ev.data;
        for (var /** @type {?} */ i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    PostMessageBusSource.prototype._handleMessage = function (data) {
        var /** @type {?} */ channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            var /** @type {?} */ channelInfo_1 = this._channels[channel];
            if (channelInfo_1.runInZone) {
                this._zone.run(function () { channelInfo_1.emitter.emit(data.message); });
            }
            else {
                channelInfo_1.emitter.emit(data.message);
            }
        }
    };
    return PostMessageBusSource;
}());
/**
 * A TypeScript implementation of {\@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
var PostMessageBus = (function () {
    /**
     * @param {?} sink
     * @param {?} source
     */
    function PostMessageBus(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBus.prototype.attachToZone = function (zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBus.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
    return PostMessageBus;
}());
PostMessageBus.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
PostMessageBus.ctorParameters = function () { return [
    { type: PostMessageBusSink, },
    { type: PostMessageBusSource, },
]; };
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
var _Channel = (function () {
    /**
     * @param {?} emitter
     * @param {?} runInZone
     */
    function _Channel(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
    return _Channel;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
ServiceMessageBrokerFactory_.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ServiceMessageBrokerFactory_.ctorParameters = function () { return [
    { type: MessageBus, },
    { type: Serializer, },
]; };
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
            ((this._methods.get(message.method)))(message);
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
/**
 * All channels used by angular's WebWorker components are listed here.
 * You should not use these channels in your application code.
 */
var RENDERER_2_CHANNEL = 'v2.ng-Renderer';
var EVENT_2_CHANNEL = 'v2.ng-Events';
var ROUTER_CHANNEL = 'ng-Router';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
var KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
var TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
var EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
var NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
/**
 * @param {?} e
 * @return {?}
 */
function serializeGenericEvent(e) {
    return serializeEvent(e, EVENT_PROPERTIES);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeEventWithTarget(e) {
    var /** @type {?} */ serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeMouseEvent(e) {
    return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeKeyboardEvent(e) {
    var /** @type {?} */ serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeTransitionEvent(e) {
    var /** @type {?} */ serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @param {?} serializedEvent
 * @return {?}
 */
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(((e.target)).tagName.toLowerCase())) {
        var /** @type {?} */ target = (e.target);
        serializedEvent['target'] = { 'value': target.value };
        if (target.files) {
            serializedEvent['target']['files'] = target.files;
        }
    }
    return serializedEvent;
}
/**
 * @param {?} e
 * @param {?} properties
 * @return {?}
 */
function serializeEvent(e, properties) {
    var /** @type {?} */ serialized = {};
    for (var /** @type {?} */ i = 0; i < properties.length; i++) {
        var /** @type {?} */ prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var EventDispatcher = (function () {
    /**
     * @param {?} _sink
     * @param {?} _serializer
     */
    function EventDispatcher(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} element
     * @return {?}
     */
    EventDispatcher.prototype.dispatchAnimationEvent = function (player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    };
    /**
     * @param {?} element
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
        var /** @type {?} */ serializedEvent;
        // TODO (jteplitz602): support custom events #3350
        switch (event.type) {
            case 'click':
            case 'mouseup':
            case 'mousedown':
            case 'dblclick':
            case 'contextmenu':
            case 'mouseenter':
            case 'mouseleave':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'show':
                serializedEvent = serializeMouseEvent(event);
                break;
            case 'keydown':
            case 'keypress':
            case 'keyup':
                serializedEvent = serializeKeyboardEvent(event);
                break;
            case 'input':
            case 'change':
            case 'blur':
                serializedEvent = serializeEventWithTarget(event);
                break;
            case 'abort':
            case 'afterprint':
            case 'beforeprint':
            case 'cached':
            case 'canplay':
            case 'canplaythrough':
            case 'chargingchange':
            case 'chargingtimechange':
            case 'close':
            case 'dischargingtimechange':
            case 'DOMContentLoaded':
            case 'downloading':
            case 'durationchange':
            case 'emptied':
            case 'ended':
            case 'error':
            case 'fullscreenchange':
            case 'fullscreenerror':
            case 'invalid':
            case 'languagechange':
            case 'levelfchange':
            case 'loadeddata':
            case 'loadedmetadata':
            case 'obsolete':
            case 'offline':
            case 'online':
            case 'open':
            case 'orientatoinchange':
            case 'pause':
            case 'pointerlockchange':
            case 'pointerlockerror':
            case 'play':
            case 'playing':
            case 'ratechange':
            case 'readystatechange':
            case 'reset':
            case 'scroll':
            case 'seeked':
            case 'seeking':
            case 'stalled':
            case 'submit':
            case 'success':
            case 'suspend':
            case 'timeupdate':
            case 'updateready':
            case 'visibilitychange':
            case 'volumechange':
            case 'waiting':
                serializedEvent = serializeGenericEvent(event);
                break;
            case 'transitionend':
                serializedEvent = serializeTransitionEvent(event);
                break;
            default:
                throw new Error(eventName + ' not supported on WebWorkers');
        }
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'eventName': eventName,
            'eventTarget': eventTarget,
            'event': serializedEvent,
        });
        // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
        // should be canceled, but for now just call `preventDefault` on the original DOM event.
        return false;
    };
    return EventDispatcher;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MessageBasedRenderer2 = (function () {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rendererFactory
     */
    function MessageBasedRenderer2(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    /**
     * @return {?}
     */
    MessageBasedRenderer2.prototype.start = function () {
        var _this = this;
        var /** @type {?} */ broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        this._bus.initChannel(EVENT_2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
        var _a = [
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_2 */,
        ], RSO = _a[0], P = _a[1], CRT = _a[2];
        var /** @type {?} */ methods = [
            ['createRenderer', this.createRenderer, RSO, CRT, P],
            ['createElement', this.createElement, RSO, P, P, P],
            ['createComment', this.createComment, RSO, P, P], ['createText', this.createText, RSO, P, P],
            ['appendChild', this.appendChild, RSO, RSO, RSO],
            ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
            ['removeChild', this.removeChild, RSO, RSO, RSO],
            ['selectRootElement', this.selectRootElement, RSO, P, P],
            ['parentNode', this.parentNode, RSO, RSO, P], ['nextSibling', this.nextSibling, RSO, RSO, P],
            ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
            ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
            ['addClass', this.addClass, RSO, RSO, P], ['removeClass', this.removeClass, RSO, RSO, P],
            ['setStyle', this.setStyle, RSO, RSO, P, P, P],
            ['removeStyle', this.removeStyle, RSO, RSO, P, P],
            ['setProperty', this.setProperty, RSO, RSO, P, P], ['setValue', this.setValue, RSO, RSO, P],
            ['listen', this.listen, RSO, RSO, P, P, P], ['unlisten', this.unlisten, RSO, RSO],
            ['destroy', this.destroy, RSO], ['destroyNode', this.destroyNode, RSO, P]
        ];
        methods.forEach(function (_a) {
            var name = _a[0], method = _a[1], argTypes = _a.slice(2);
            broker.registerMethod(name, argTypes, method.bind(_this));
        });
    };
    /**
     * @param {?} r
     * @return {?}
     */
    MessageBasedRenderer2.prototype.destroy = function (r) { r.destroy(); };
    /**
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    MessageBasedRenderer2.prototype.destroyNode = function (r, node) {
        if (r.destroyNode) {
            r.destroyNode(node);
        }
        this._renderStore.remove(node);
    };
    /**
     * @param {?} el
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createRenderer = function (el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    };
    /**
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createElement = function (r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    };
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createComment = function (r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    };
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createText = function (r, value, id) {
        this._renderStore.store(r.createText(value), id);
    };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    MessageBasedRenderer2.prototype.appendChild = function (r, parent, child) { r.appendChild(parent, child); };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    MessageBasedRenderer2.prototype.insertBefore = function (r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeChild = function (r, parent, child) { r.removeChild(parent, child); };
    /**
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.selectRootElement = function (r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.parentNode = function (r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.nextSibling = function (r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?} namespace
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setAttribute = function (r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeAttribute = function (r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    MessageBasedRenderer2.prototype.addClass = function (r, el, name) { r.addClass(el, name); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeClass = function (r, el, name) { r.removeClass(el, name); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setStyle = function (r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeStyle = function (r, el, style, flags) {
        r.removeStyle(el, style, flags);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setProperty = function (r, el, name, value) {
        r.setProperty(el, name, value);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setValue = function (r, node, value) { r.setValue(node, value); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    MessageBasedRenderer2.prototype.listen = function (r, el, elName, eventName, unlistenId) {
        var _this = this;
        var /** @type {?} */ listener = function (event) {
            return _this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        };
        var /** @type {?} */ unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    };
    /**
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    MessageBasedRenderer2.prototype.unlisten = function (r, unlisten) { unlisten(); };
    return MessageBasedRenderer2;
}());
MessageBasedRenderer2.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
MessageBasedRenderer2.ctorParameters = function () { return [
    { type: ServiceMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
    { type: _angular_core.RendererFactory2, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@experimental WebWorker support is currently experimental.
 */
var WebWorkerInstance = (function () {
    function WebWorkerInstance() {
    }
    /**
     * \@internal
     * @param {?} worker
     * @param {?} bus
     * @return {?}
     */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    return WebWorkerInstance;
}());
WebWorkerInstance.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
WebWorkerInstance.ctorParameters = function () { return []; };
/**
 * \@experimental WebWorker support is currently experimental.
 */
var WORKER_SCRIPT = new _angular_core.InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * \@experimental WebWorker support is currently experimental.
 */
var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new _angular_core.InjectionToken('WorkerRenderStartableMsgService');
var _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: _angular_core.NgZone, useFactory: createNgZone, deps: [] },
    MessageBasedRenderer2,
    { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
    _angular_platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
    { provide: _angular_core.ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: _angular_platformBrowser.DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: _angular_platformBrowser.ɵDomEventsPlugin, multi: true },
    { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: _angular_platformBrowser.ɵKeyEventsPlugin, multi: true },
    { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: _angular_platformBrowser.ɵHammerGesturesPlugin, multi: true },
    { provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: _angular_platformBrowser.HammerGestureConfig },
    _angular_core.ɵAPP_ID_RANDOM_PROVIDER,
    _angular_platformBrowser.ɵDomRendererFactory2,
    { provide: _angular_core.RendererFactory2, useExisting: _angular_platformBrowser.ɵDomRendererFactory2 },
    { provide: _angular_platformBrowser.ɵSharedStylesHost, useExisting: _angular_platformBrowser.ɵDomSharedStylesHost },
    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
    Serializer,
    { provide: ON_WEB_WORKER, useValue: false },
    RenderStore,
    _angular_platformBrowser.ɵDomSharedStylesHost,
    _angular_core.Testability,
    _angular_platformBrowser.EventManager,
    WebWorkerInstance,
    {
        provide: _angular_core.PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [_angular_core.Injector]
    },
    { provide: _angular_core.PLATFORM_ID, useValue: _angular_common.ɵPLATFORM_WORKER_UI_ID },
    { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
];
/**
 * @param {?} injector
 * @return {?}
 */
function initializeGenericWorkerRenderer(injector) {
    var /** @type {?} */ bus = injector.get(MessageBus);
    var /** @type {?} */ zone = injector.get(_angular_core.NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var /** @type {?} */ services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
}
/**
 * @param {?} instance
 * @return {?}
 */
function messageBusFactory(instance) {
    return instance.bus;
}
/**
 * @param {?} injector
 * @return {?}
 */
function initWebWorkerRenderPlatform(injector) {
    return function () {
        _angular_platformBrowser.ɵBrowserDomAdapter.makeCurrent();
        _angular_platformBrowser.ɵBrowserGetTestability.init();
        var /** @type {?} */ scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (e) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        var /** @type {?} */ instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * \@experimental WebWorker support is currently experimental.
 */
var platformWorkerUi = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
function _exceptionHandler() {
    return new _angular_core.ErrorHandler();
}
/**
 * @return {?}
 */
function _document() {
    return document;
}
/**
 * @return {?}
 */
function createNgZone() {
    return new _angular_core.NgZone({ enableLongStackTrace: _angular_core.isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 * @param {?} uri
 * @param {?} instance
 * @return {?}
 */
function spawnWebWorker(uri, instance) {
    var /** @type {?} */ webWorker = new Worker(uri);
    var /** @type {?} */ sink = new PostMessageBusSink(webWorker);
    var /** @type {?} */ source = new PostMessageBusSource(webWorker);
    var /** @type {?} */ bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new _angular_core.Version('4.3.3-77fa3c3');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MessageBasedPlatformLocation = (function () {
    /**
     * @param {?} _brokerFactory
     * @param {?} _platformLocation
     * @param {?} bus
     * @param {?} _serializer
     */
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
        this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype.start = function () {
        var /** @type {?} */ P = 1;
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    };
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._getLocation = function () {
        return Promise.resolve(this._platformLocation.location);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
    return MessageBasedPlatformLocation;
}());
MessageBasedPlatformLocation.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
MessageBasedPlatformLocation.ctorParameters = function () { return [
    { type: ServiceMessageBrokerFactory, },
    { type: _angular_platformBrowser.ɵBrowserPlatformLocation, },
    { type: MessageBus, },
    { type: Serializer, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A list of {\@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * \@experimental
 */
var WORKER_UI_LOCATION_PROVIDERS = [
    MessageBasedPlatformLocation, _angular_platformBrowser.ɵBrowserPlatformLocation,
    { provide: _angular_core.PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [_angular_core.Injector] }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return function () {
        var /** @type {?} */ zone = injector.get(_angular_core.NgZone);
        zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
    };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebWorkerPlatformLocation = (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = _super.call(this) || this;
        _this._serializer = _serializer;
        _this._popStateListeners = [];
        _this._hashChangeListeners = [];
        _this._location = ((null));
        _this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        _this._channelSource = bus.from(ROUTER_CHANNEL);
        _this._channelSource.subscribe({
            next: function (msg) {
                var listeners = null;
                if (msg.hasOwnProperty('event')) {
                    var type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = _this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = _this._hashChangeListeners;
                    }
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
                        _this._location = _this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach(function (fn) { return fn(msg['event']); });
                    }
                }
            }
        });
        _this.initialized = new Promise(function (res) { return _this.initializedResolve = res; });
        return _this;
    }
    /**
     * \@internal *
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.init = function () {
        var _this = this;
        var /** @type {?} */ args = new UiArguments('getLocation');
        return ((this._broker.runOnService(args, LocationType))).then(function (val) {
            _this._location = val;
            _this.initializedResolve();
            return true;
        }, function (err) { throw new Error(err); });
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
        /**
         * @return {?}
         */
        get: function () { return this._location ? ((this._location.pathname)) : '<unknown>'; },
        /**
         * @param {?} newPath
         * @return {?}
         */
        set: function (newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var /** @type {?} */ fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
            var /** @type {?} */ args = new UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
        /**
         * @return {?}
         */
        get: function () { return this._location ? this._location.search : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        /**
         * @return {?}
         */
        get: function () { return this._location ? this._location.hash : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
        var /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        var /** @type {?} */ args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
        var /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        var /** @type {?} */ args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.forward = function () {
        var /** @type {?} */ args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.back = function () {
        var /** @type {?} */ args = new UiArguments('back');
        this._broker.runOnService(args, null);
    };
    return WebWorkerPlatformLocation;
}(_angular_common.PlatformLocation));
WebWorkerPlatformLocation.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
WebWorkerPlatformLocation.ctorParameters = function () { return [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The {\@link PlatformLocation} providers that should be added when the {\@link Location} is used in
 * a worker context.
 *
 * \@experimental
 */
var WORKER_APP_LOCATION_PROVIDERS = [
    { provide: _angular_common.PlatformLocation, useClass: WebWorkerPlatformLocation }, {
        provide: _angular_core.APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [_angular_common.PlatformLocation, _angular_core.NgZone]
    },
    { provide: _angular_common.LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [_angular_common.PlatformLocation] }
];
/**
 * @param {?} platformLocation
 * @return {?}
 */
function locationInitialized(platformLocation) {
    return platformLocation.initialized;
}
/**
 * @param {?} platformLocation
 * @param {?} zone
 * @return {?}
 */
function appInitFnFactory(platformLocation, zone) {
    return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NamedEventEmitter = (function () {
    function NamedEventEmitter() {
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
    /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    NamedEventEmitter.prototype.unlisten = function (eventName, listener) {
        var /** @type {?} */ listeners = this._getListeners(eventName);
        var /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
    /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
        var /** @type {?} */ listeners = this._getListeners(eventName);
        for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    /**
     * @param {?} eventName
     * @return {?}
     */
    NamedEventEmitter.prototype._getListeners = function (eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        var /** @type {?} */ listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    };
    return NamedEventEmitter;
}());
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */
function eventNameWithTarget(target, eventName) {
    return target + ":" + eventName;
}
var WebWorkerRendererFactory2 = (function () {
    /**
     * @param {?} messageBrokerFactory
     * @param {?} bus
     * @param {?} _serializer
     * @param {?} renderStore
     */
    function WebWorkerRendererFactory2(messageBrokerFactory, bus, _serializer, renderStore) {
        var _this = this;
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        var source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.createRenderer = function (element, type) {
        var /** @type {?} */ renderer = new WebWorkerRenderer2(this);
        var /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.begin = function () { };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.end = function () { };
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.callUI = function (fnName, fnArgs) {
        var /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateNode = function () {
        var /** @type {?} */ result = new WebWorkerRenderNode();
        var /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.freeNode = function (node) { this.renderStore.remove(node); };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateId = function () { return this.renderStore.allocateId(); };
    /**
     * @param {?} message
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype._dispatchEvent = function (message) {
        var /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        var /** @type {?} */ eventName = message['eventName'];
        var /** @type {?} */ target = message['eventTarget'];
        var /** @type {?} */ event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    };
    return WebWorkerRendererFactory2;
}());
WebWorkerRendererFactory2.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
WebWorkerRendererFactory2.ctorParameters = function () { return [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
]; };
var WebWorkerRenderer2 = (function () {
    /**
     * @param {?} _rendererFactory
     */
    function WebWorkerRenderer2(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroy = function () { this.callUIWithRenderer('destroy'); };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroyNode = function (node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createElement = function (name, namespace) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createComment = function (value) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createText = function (value) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.appendChild = function (parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (!parent) {
            return;
        }
        this.callUIWithRenderer('insertBefore', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeChild = function (parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    WebWorkerRenderer2.prototype.selectRootElement = function (selectorOrNode) {
        var /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.parentNode = function (node) {
        var /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.nextSibling = function (node) {
        var /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WebWorkerRenderer2.prototype.addClass = function (el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeClass = function (el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setStyle = function (el, style, value, flags) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(flags),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    WebWorkerRenderer2.prototype.removeStyle = function (el, style, flags) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(flags),
        ]);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setProperty = function (el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    WebWorkerRenderer2.prototype.setValue = function (node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    WebWorkerRenderer2.prototype.listen = function (target, eventName, listener) {
        var _this = this;
        var /** @type {?} */ unlistenId = this._rendererFactory.allocateId();
        var _a = typeof target === 'string' ? [null, target, target + ":" + eventName] :
            [target, null, null], targetEl = _a[0], targetName = _a[1], fullName = _a[2];
        if (fullName) {
            this._rendererFactory.globalEvents.listen(fullName, listener);
        }
        else {
            targetEl.events.listen(eventName, listener);
        }
        this.callUIWithRenderer('listen', [
            new FnArg(targetEl, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(targetName),
            new FnArg(eventName),
            new FnArg(unlistenId),
        ]);
        return function () {
            if (fullName) {
                _this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            _this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        };
    };
    /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    WebWorkerRenderer2.prototype.callUIWithRenderer = function (fnName, fnArgs) {
        if (fnArgs === void 0) { fnArgs = []; }
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg].concat(fnArgs));
    };
    return WebWorkerRenderer2;
}());
var WebWorkerRenderNode = (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
    }
    return WebWorkerRenderNode;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
var WorkerDomAdapter = (function (_super) {
    __extends(WorkerDomAdapter, _super);
    function WorkerDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    WorkerDomAdapter.makeCurrent = function () { _angular_platformBrowser.ɵsetRootDomAdapter(new WorkerDomAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logError = function (error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.log = function (error) { console.log(error); };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logGroup = function (error) {
        if (console.group) {
            console.group(error);
            this.logError(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.logGroupEnd = function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    WorkerDomAdapter.prototype.contains = function (nodeA, nodeB) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasProperty = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        /**
         * @return {?}
         */
        get: function () { throw 'not implemented'; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelector = function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelectorAll = function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.on = function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createMouseEvent = function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.preventDefault = function (evt) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.isPrevented = function (evt) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getInnerHTML = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTemplateContent = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getOuterHTML = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeName = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeValue = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.type = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.content = function (node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.firstChild = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.nextSibling = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.parentElement = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodesAsList = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.clearNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.appendChild = function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeChild = function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    WorkerDomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertBefore = function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAllBefore = function (parent, el, nodes) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAfter = function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setInnerHTML = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getText = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setText = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getValue = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setValue = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getChecked = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setChecked = function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @return {?}
     */
    WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
    /**
     * @param {?} html
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTemplate = function (html) { throw 'not implemented'; };
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTextNode = function (text, doc) { throw 'not implemented'; };
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        throw 'not implemented';
    };
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createStyleElement = function (css, doc) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.createShadowRoot = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getShadowRoot = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHost = function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDistributedNodes = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByClassName = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByTagName = function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.classList = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.addClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasClass = function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.setStyle = function (element, styleName, styleValue) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeStyle = function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.getStyle = function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        throw 'not implemented';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.tagName = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.attributeMap = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttribute = function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttribute = function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.templateAwareRoot = function (el) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBoundingClientRect = function (el) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTitle = function (doc) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    WorkerDomAdapter.prototype.setTitle = function (doc, newTitle) { throw 'not implemented'; };
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.elementMatches = function (n, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTextNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isCommentNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasShadowRoot = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHref = function (element) { throw 'not implemented'; };
    /**
     * @param {?} event
     * @return {?}
     */
    WorkerDomAdapter.prototype.getEventKey = function (event) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    WorkerDomAdapter.prototype.resolveAndSetHref = function (element, baseUrl, href) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBaseHref = function (doc) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setData = function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getComputedStyle = function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getData = function (element, name) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(_angular_platformBrowser.ɵDomAdapter));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental
 */
var platformWorkerApp = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerApp', [{ provide: _angular_core.PLATFORM_ID, useValue: _angular_common.ɵPLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
function errorHandler() {
    return new _angular_core.ErrorHandler();
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        ((postMessage))(message, transferrables);
    }
};
/**
 * @param {?} zone
 * @return {?}
 */
function createMessageBus(zone) {
    var /** @type {?} */ sink = new PostMessageBusSink(_postMessage);
    var /** @type {?} */ source = new PostMessageBusSource();
    var /** @type {?} */ bus = new PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
/**
 * @return {?}
 */
function setupWebWorker() {
    WorkerDomAdapter.makeCurrent();
}
/**
 * The ng module for the worker app side.
 *
 * \@experimental
 */
var WorkerAppModule = (function () {
    function WorkerAppModule() {
    }
    return WorkerAppModule;
}());
WorkerAppModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                providers: [
                    _angular_platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
                    Serializer,
                    { provide: _angular_platformBrowser.DOCUMENT, useValue: null },
                    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
                    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
                    WebWorkerRendererFactory2,
                    { provide: _angular_core.RendererFactory2, useExisting: WebWorkerRendererFactory2 },
                    { provide: ON_WEB_WORKER, useValue: true },
                    RenderStore,
                    { provide: _angular_core.ErrorHandler, useFactory: errorHandler, deps: [] },
                    { provide: MessageBus, useFactory: createMessageBus, deps: [_angular_core.NgZone] },
                    { provide: _angular_core.APP_INITIALIZER, useValue: setupWebWorker, multi: true },
                ],
                exports: [
                    _angular_common.CommonModule,
                    _angular_core.ApplicationModule,
                ]
            },] },
];
/**
 * @nocollapse
 */
WorkerAppModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Bootstraps the worker ui.
 *
 * \@experimental
 * @param {?} workerScriptUri
 * @param {?=} customProviders
 * @return {?}
 */
function bootstrapWorkerUi(workerScriptUri, customProviders) {
    if (customProviders === void 0) { customProviders = []; }
    // For now, just creates the worker ui platform...
    var /** @type {?} */ platform = platformWorkerUi([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri }
    ].concat(customProviders));
    return Promise.resolve(platform);
}

exports.VERSION = VERSION;
exports.ClientMessageBroker = ClientMessageBroker;
exports.ClientMessageBrokerFactory = ClientMessageBrokerFactory;
exports.FnArg = FnArg;
exports.UiArguments = UiArguments;
exports.MessageBus = MessageBus;
exports.PRIMITIVE = PRIMITIVE;
exports.ServiceMessageBroker = ServiceMessageBroker;
exports.ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
exports.WORKER_UI_LOCATION_PROVIDERS = WORKER_UI_LOCATION_PROVIDERS;
exports.WORKER_APP_LOCATION_PROVIDERS = WORKER_APP_LOCATION_PROVIDERS;
exports.WorkerAppModule = WorkerAppModule;
exports.platformWorkerApp = platformWorkerApp;
exports.platformWorkerUi = platformWorkerUi;
exports.bootstrapWorkerUi = bootstrapWorkerUi;
exports.ɵm = ON_WEB_WORKER;
exports.ɵa = ClientMessageBrokerFactory_;
exports.ɵk = RenderStore;
exports.ɵb = Serializer;
exports.ɵc = ServiceMessageBrokerFactory_;
exports.ɵe = appInitFnFactory;
exports.ɵd = locationInitialized;
exports.ɵj = WebWorkerPlatformLocation;
exports.ɵl = WebWorkerRendererFactory2;
exports.ɵg = createMessageBus;
exports.ɵf = errorHandler;
exports.ɵh = setupWebWorker;
exports.ɵi = _WORKER_UI_PLATFORM_PROVIDERS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-webworker.umd.js.map
