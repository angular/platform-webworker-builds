/**
 * @license Angular v6.1.9+65.sha-ff98003
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@angular/platform-webworker', ['exports', '@angular/core', '@angular/common', '@angular/platform-browser'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformWebworker = {}),global.ng.core,global.ng.common,global.ng.platformBrowser));
}(this, (function (exports,core,common,platformBrowser) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ON_WEB_WORKER = new core.InjectionToken('WebWorker.onWebWorker');

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
     * @experimental WebWorker support in Angular is currenlty experimental.
     */
    var MessageBus = /** @class */ (function () {
        function MessageBus() {
        }
        return MessageBus;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var RenderStore = /** @class */ (function () {
        function RenderStore() {
            this._nextIndex = 0;
            this._lookupById = new Map();
            this._lookupByObject = new Map();
        }
        RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
        RenderStore.prototype.store = function (obj, id) {
            if (id == null)
                return;
            this._lookupById.set(id, obj);
            this._lookupByObject.set(obj, id);
        };
        RenderStore.prototype.remove = function (obj) {
            var index = this._lookupByObject.get(obj);
            if (index != null) {
                this._lookupByObject.delete(obj);
                this._lookupById.delete(index);
            }
        };
        RenderStore.prototype.deserialize = function (id) {
            return this._lookupById.has(id) ? this._lookupById.get(id) : null;
        };
        RenderStore.prototype.serialize = function (obj) {
            return obj == null ? null : this._lookupByObject.get(obj);
        };
        RenderStore = __decorate([
            core.Injectable()
        ], RenderStore);
        return RenderStore;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var LocationType = /** @class */ (function () {
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
    var Serializer = /** @class */ (function () {
        function Serializer(_renderStore) {
            this._renderStore = _renderStore;
        }
        Serializer.prototype.serialize = function (obj, type) {
            var _this = this;
            if (type === void 0) { type = 1 /* PRIMITIVE */; }
            if (obj == null || type === 1 /* PRIMITIVE */) {
                return obj;
            }
            if (Array.isArray(obj)) {
                return obj.map(function (v) { return _this.serialize(v, type); });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                return this._renderStore.serialize(obj);
            }
            if (type === core.RenderComponentType) {
                return this._serializeRenderComponentType(obj);
            }
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._serializeRendererType2(obj);
            }
            if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            throw new Error("No serializer for type " + core.ɵstringify(type));
        };
        Serializer.prototype.deserialize = function (map, type, data) {
            var _this = this;
            if (type === void 0) { type = 1 /* PRIMITIVE */; }
            if (map == null || type === 1 /* PRIMITIVE */) {
                return map;
            }
            if (Array.isArray(map)) {
                return map.map(function (val) { return _this.deserialize(val, type, data); });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                return this._renderStore.deserialize(map);
            }
            if (type === core.RenderComponentType) {
                return this._deserializeRenderComponentType(map);
            }
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._deserializeRendererType2(map);
            }
            if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            throw new Error("No deserializer for type " + core.ɵstringify(type));
        };
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
        Serializer.prototype._deserializeLocation = function (loc) {
            return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
        };
        Serializer.prototype._serializeRenderComponentType = function (type) {
            return {
                'id': type.id,
                'templateUrl': type.templateUrl,
                'slotCount': type.slotCount,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles),
            };
        };
        Serializer.prototype._deserializeRenderComponentType = function (props) {
            return new core.RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
        };
        Serializer.prototype._serializeRendererType2 = function (type) {
            return {
                'id': type.id,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles),
                'data': this.serialize(type.data),
            };
        };
        Serializer.prototype._deserializeRendererType2 = function (props) {
            return {
                id: props['id'],
                encapsulation: props['encapsulation'],
                styles: this.deserialize(props['styles']),
                data: this.deserialize(props['data'])
            };
        };
        Serializer = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [RenderStore])
        ], Serializer);
        return Serializer;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var ClientMessageBrokerFactory = /** @class */ (function () {
        /** @internal */
        function ClientMessageBrokerFactory(_messageBus, _serializer) {
            this._messageBus = _messageBus;
            this._serializer = _serializer;
        }
        /**
         * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
         */
        ClientMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            this._messageBus.initChannel(channel, runInZone);
            return new ClientMessageBroker(this._messageBus, this._serializer, channel);
        };
        ClientMessageBrokerFactory = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [MessageBus, Serializer])
        ], ClientMessageBrokerFactory);
        return ClientMessageBrokerFactory;
    }());
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var ClientMessageBroker = /** @class */ (function () {
        /** @internal */
        function ClientMessageBroker(messageBus, _serializer, channel) {
            var _this = this;
            this.channel = channel;
            this._pending = new Map();
            this._sink = messageBus.to(channel);
            this._serializer = _serializer;
            var source = messageBus.from(channel);
            source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
        }
        ClientMessageBroker.prototype._generateMessageId = function (name) {
            var time = core.ɵstringify(new Date().getTime());
            var iteration = 0;
            var id = name + time + core.ɵstringify(iteration);
            while (this._pending.has(id)) {
                id = "" + name + time + iteration;
                iteration++;
            }
            return id;
        };
        ClientMessageBroker.prototype.runOnService = function (args, returnType) {
            var _this = this;
            var fnArgs = [];
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
            var promise;
            var id = null;
            if (returnType != null) {
                var completer_1 = undefined;
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
            var message = {
                'method': args.method,
                'args': fnArgs,
            };
            if (id != null) {
                message['id'] = id;
            }
            this._sink.emit(message);
            return promise;
        };
        ClientMessageBroker.prototype._handleMessage = function (message) {
            if (message.type === 'result' || message.type === 'error') {
                var id = message.id;
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
        return ClientMessageBroker;
    }());
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var FnArg = /** @class */ (function () {
        function FnArg(value, type) {
            if (type === void 0) { type = 1 /* PRIMITIVE */; }
            this.value = value;
            this.type = type;
        }
        return FnArg;
    }());
    /**
     * @experimental WebWorker support in Angular is experimental.
     */
    var UiArguments = /** @class */ (function () {
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
    var PostMessageBusSink = /** @class */ (function () {
        function PostMessageBusSink(_postMessageTarget) {
            this._postMessageTarget = _postMessageTarget;
            this._channels = {};
            this._messageBuffer = [];
        }
        PostMessageBusSink.prototype.attachToZone = function (zone) {
            var _this = this;
            this._zone = zone;
            this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
        };
        PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
            var _this = this;
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new core.EventEmitter(false);
            var channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
            emitter.subscribe(function (data) {
                var message = { channel: channel, message: data };
                if (runInZone) {
                    _this._messageBuffer.push(message);
                }
                else {
                    _this._sendMessages([message]);
                }
            });
        };
        PostMessageBusSink.prototype.to = function (channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            }
            else {
                throw new Error(channel + " is not set up. Did you forget to call initChannel?");
            }
        };
        PostMessageBusSink.prototype._handleOnEventDone = function () {
            if (this._messageBuffer.length > 0) {
                this._sendMessages(this._messageBuffer);
                this._messageBuffer = [];
            }
        };
        PostMessageBusSink.prototype._sendMessages = function (messages) { this._postMessageTarget.postMessage(messages); };
        return PostMessageBusSink;
    }());
    var PostMessageBusSource = /** @class */ (function () {
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
        PostMessageBusSource.prototype.attachToZone = function (zone) { this._zone = zone; };
        PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new core.EventEmitter(false);
            var channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
        };
        PostMessageBusSource.prototype.from = function (channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            }
            else {
                throw new Error(channel + " is not set up. Did you forget to call initChannel?");
            }
        };
        PostMessageBusSource.prototype._handleMessages = function (ev) {
            var messages = ev.data;
            for (var i = 0; i < messages.length; i++) {
                this._handleMessage(messages[i]);
            }
        };
        PostMessageBusSource.prototype._handleMessage = function (data) {
            var channel = data.channel;
            if (this._channels.hasOwnProperty(channel)) {
                var channelInfo_1 = this._channels[channel];
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
     * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
     * postMessage API.
     */
    var PostMessageBus = /** @class */ (function () {
        function PostMessageBus(sink, source) {
            this.sink = sink;
            this.source = source;
        }
        PostMessageBus.prototype.attachToZone = function (zone) {
            this.source.attachToZone(zone);
            this.sink.attachToZone(zone);
        };
        PostMessageBus.prototype.initChannel = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            this.source.initChannel(channel, runInZone);
            this.sink.initChannel(channel, runInZone);
        };
        PostMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
        PostMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
        PostMessageBus = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [PostMessageBusSink, PostMessageBusSource])
        ], PostMessageBus);
        return PostMessageBus;
    }());
    /**
     * Helper class that wraps a channel's {@link EventEmitter} and
     * keeps track of if it should run in the zone.
     */
    var _Channel = /** @class */ (function () {
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
        ServiceMessageBrokerFactory = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [MessageBus, Serializer])
        ], ServiceMessageBrokerFactory);
        return ServiceMessageBrokerFactory;
    }());
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

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
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
    function serializeGenericEvent(e) {
        return serializeEvent(e, EVENT_PROPERTIES);
    }
    // TODO(jteplitz602): Allow users to specify the properties they need rather than always
    // adding value and files #3374
    function serializeEventWithTarget(e) {
        var serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    function serializeMouseEvent(e) {
        return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
    }
    function serializeKeyboardEvent(e) {
        var serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    function serializeTransitionEvent(e) {
        var serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
        return addTarget(e, serializedEvent);
    }
    // TODO(jteplitz602): #3374. See above.
    function addTarget(e, serializedEvent) {
        if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
            var target = e.target;
            serializedEvent['target'] = { 'value': target.value };
            if (target.files) {
                serializedEvent['target']['files'] = target.files;
            }
        }
        return serializedEvent;
    }
    function serializeEvent(e, properties) {
        var serialized = {};
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            serialized[prop] = e[prop];
        }
        return serialized;
    }

    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher(_sink, _serializer) {
            this._sink = _sink;
            this._serializer = _serializer;
        }
        EventDispatcher.prototype.dispatchAnimationEvent = function (player, phaseName, element) {
            this._sink.emit({
                'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
                'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
                'phaseName': phaseName,
            });
            return true;
        };
        EventDispatcher.prototype.dispatchRenderEvent = function (element, eventTarget, eventName, event) {
            var serializedEvent;
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
    var MessageBasedRenderer2 = /** @class */ (function () {
        function MessageBasedRenderer2(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rendererFactory = _rendererFactory;
        }
        MessageBasedRenderer2.prototype.start = function () {
            var _this = this;
            var broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
            this._bus.initChannel(EVENT_2_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
            var _a = __read([
                2 /* RENDER_STORE_OBJECT */,
                1 /* PRIMITIVE */,
                0 /* RENDERER_TYPE_2 */,
            ], 3), RSO = _a[0], P = _a[1], CRT = _a[2];
            var methods = [
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
                var _b = __read(_a), name = _b[0], method = _b[1], argTypes = _b.slice(2);
                broker.registerMethod(name, argTypes, method.bind(_this));
            });
        };
        MessageBasedRenderer2.prototype.destroy = function (r) { r.destroy(); };
        MessageBasedRenderer2.prototype.destroyNode = function (r, node) {
            if (r.destroyNode) {
                r.destroyNode(node);
            }
            this._renderStore.remove(node);
        };
        MessageBasedRenderer2.prototype.createRenderer = function (el, type, id) {
            this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
        };
        MessageBasedRenderer2.prototype.createElement = function (r, name, namespace, id) {
            this._renderStore.store(r.createElement(name, namespace), id);
        };
        MessageBasedRenderer2.prototype.createComment = function (r, value, id) {
            this._renderStore.store(r.createComment(value), id);
        };
        MessageBasedRenderer2.prototype.createText = function (r, value, id) {
            this._renderStore.store(r.createText(value), id);
        };
        MessageBasedRenderer2.prototype.appendChild = function (r, parent, child) { r.appendChild(parent, child); };
        MessageBasedRenderer2.prototype.insertBefore = function (r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        };
        MessageBasedRenderer2.prototype.removeChild = function (r, parent, child) { r.removeChild(parent, child); };
        MessageBasedRenderer2.prototype.selectRootElement = function (r, selector, id) {
            this._renderStore.store(r.selectRootElement(selector), id);
        };
        MessageBasedRenderer2.prototype.parentNode = function (r, node, id) {
            this._renderStore.store(r.parentNode(node), id);
        };
        MessageBasedRenderer2.prototype.nextSibling = function (r, node, id) {
            this._renderStore.store(r.nextSibling(node), id);
        };
        MessageBasedRenderer2.prototype.setAttribute = function (r, el, name, value, namespace) {
            r.setAttribute(el, name, value, namespace);
        };
        MessageBasedRenderer2.prototype.removeAttribute = function (r, el, name, namespace) {
            r.removeAttribute(el, name, namespace);
        };
        MessageBasedRenderer2.prototype.addClass = function (r, el, name) { r.addClass(el, name); };
        MessageBasedRenderer2.prototype.removeClass = function (r, el, name) { r.removeClass(el, name); };
        MessageBasedRenderer2.prototype.setStyle = function (r, el, style, value, flags) {
            r.setStyle(el, style, value, flags);
        };
        MessageBasedRenderer2.prototype.removeStyle = function (r, el, style, flags) {
            r.removeStyle(el, style, flags);
        };
        MessageBasedRenderer2.prototype.setProperty = function (r, el, name, value) {
            r.setProperty(el, name, value);
        };
        MessageBasedRenderer2.prototype.setValue = function (r, node, value) { r.setValue(node, value); };
        MessageBasedRenderer2.prototype.listen = function (r, el, elName, eventName, unlistenId) {
            var _this = this;
            var listener = function (event) {
                return _this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
            };
            var unlisten = r.listen(el || elName, eventName, listener);
            this._renderStore.store(unlisten, unlistenId);
        };
        MessageBasedRenderer2.prototype.unlisten = function (r, unlisten) { unlisten(); };
        MessageBasedRenderer2 = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ServiceMessageBrokerFactory, MessageBus,
                Serializer, RenderStore,
                core.RendererFactory2])
        ], MessageBasedRenderer2);
        return MessageBasedRenderer2;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Wrapper class that exposes the Worker
     * and underlying {@link MessageBus} for lower level message passing.
     *
     * @experimental WebWorker support is currently experimental.
     */
    var WebWorkerInstance = /** @class */ (function () {
        function WebWorkerInstance() {
        }
        /** @internal */
        WebWorkerInstance.prototype.init = function (worker, bus) {
            this.worker = worker;
            this.bus = bus;
        };
        WebWorkerInstance = __decorate([
            core.Injectable()
        ], WebWorkerInstance);
        return WebWorkerInstance;
    }());
    /**
     * @experimental WebWorker support is currently experimental.
     */
    var WORKER_SCRIPT = new core.InjectionToken('WebWorkerScript');
    /**
     * A multi-provider used to automatically call the `start()` method after the service is
     * created.
     *
     * @experimental WebWorker support is currently experimental.
     */
    var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new core.InjectionToken('WorkerRenderStartableMsgService');
    var _WORKER_UI_PLATFORM_PROVIDERS = [
        { provide: core.NgZone, useFactory: createNgZone, deps: [] },
        {
            provide: MessageBasedRenderer2,
            deps: [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, core.RendererFactory2]
        },
        { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
        platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
        { provide: core.ErrorHandler, useFactory: _exceptionHandler, deps: [] },
        { provide: platformBrowser.DOCUMENT, useFactory: _document, deps: [] },
        // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
        // #5298
        {
            provide: platformBrowser.EVENT_MANAGER_PLUGINS,
            useClass: platformBrowser.ɵDomEventsPlugin,
            deps: [platformBrowser.DOCUMENT, core.NgZone],
            multi: true
        },
        { provide: platformBrowser.EVENT_MANAGER_PLUGINS, useClass: platformBrowser.ɵKeyEventsPlugin, deps: [platformBrowser.DOCUMENT], multi: true },
        {
            provide: platformBrowser.EVENT_MANAGER_PLUGINS,
            useClass: platformBrowser.ɵHammerGesturesPlugin,
            deps: [platformBrowser.DOCUMENT, platformBrowser.HAMMER_GESTURE_CONFIG],
            multi: true
        },
        { provide: platformBrowser.HAMMER_GESTURE_CONFIG, useClass: platformBrowser.HammerGestureConfig, deps: [] },
        core.ɵAPP_ID_RANDOM_PROVIDER,
        { provide: platformBrowser.ɵDomRendererFactory2, deps: [platformBrowser.EventManager, platformBrowser.ɵDomSharedStylesHost] },
        { provide: core.RendererFactory2, useExisting: platformBrowser.ɵDomRendererFactory2 },
        { provide: platformBrowser.ɵSharedStylesHost, useExisting: platformBrowser.ɵDomSharedStylesHost },
        {
            provide: ServiceMessageBrokerFactory,
            useClass: ServiceMessageBrokerFactory,
            deps: [MessageBus, Serializer]
        },
        {
            provide: ClientMessageBrokerFactory,
            useClass: ClientMessageBrokerFactory,
            deps: [MessageBus, Serializer]
        },
        { provide: Serializer, deps: [RenderStore] },
        { provide: ON_WEB_WORKER, useValue: false },
        { provide: RenderStore, deps: [] },
        { provide: platformBrowser.ɵDomSharedStylesHost, deps: [platformBrowser.DOCUMENT] },
        { provide: core.Testability, deps: [core.NgZone] },
        { provide: platformBrowser.EventManager, deps: [platformBrowser.EVENT_MANAGER_PLUGINS, core.NgZone] },
        { provide: WebWorkerInstance, deps: [] },
        {
            provide: core.PLATFORM_INITIALIZER,
            useFactory: initWebWorkerRenderPlatform,
            multi: true,
            deps: [core.Injector]
        },
        { provide: core.PLATFORM_ID, useValue: common.ɵPLATFORM_WORKER_UI_ID },
        { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
    ];
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(MessageBus);
        var zone = injector.get(core.NgZone);
        bus.attachToZone(zone);
        // initialize message services after the bus has been created
        var services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
        zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
    }
    function messageBusFactory(instance) {
        return instance.bus;
    }
    function initWebWorkerRenderPlatform(injector) {
        return function () {
            platformBrowser.ɵBrowserDomAdapter.makeCurrent();
            platformBrowser.ɵBrowserGetTestability.init();
            var scriptUri;
            try {
                scriptUri = injector.get(WORKER_SCRIPT);
            }
            catch (e) {
                throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
            }
            var instance = injector.get(WebWorkerInstance);
            spawnWebWorker(scriptUri, instance);
            initializeGenericWorkerRenderer(injector);
        };
    }
    /**
     * @experimental WebWorker support is currently experimental.
     */
    var platformWorkerUi = core.createPlatformFactory(core.platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
    function _exceptionHandler() {
        return new core.ErrorHandler();
    }
    function _document() {
        return document;
    }
    function createNgZone() {
        return new core.NgZone({ enableLongStackTrace: core.isDevMode() });
    }
    /**
     * Spawns a new class and initializes the WebWorkerInstance
     */
    function spawnWebWorker(uri, instance) {
        var webWorker = new Worker(uri);
        var sink = new PostMessageBusSink(webWorker);
        var source = new PostMessageBusSource(webWorker);
        var bus = new PostMessageBus(sink, source);
        instance.init(webWorker, bus);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var VERSION = new core.Version('6.1.9+65.sha-ff98003');

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var MessageBasedPlatformLocation = /** @class */ (function () {
        function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
            this._brokerFactory = _brokerFactory;
            this._platformLocation = _platformLocation;
            this._serializer = _serializer;
            this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
            this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
            this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
            this._channelSink = bus.to(ROUTER_CHANNEL);
        }
        MessageBasedPlatformLocation.prototype.start = function () {
            var P = 1 /* PRIMITIVE */;
            this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
            this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
            this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
            this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
            this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
            this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
        };
        MessageBasedPlatformLocation.prototype._getLocation = function () {
            return Promise.resolve(this._platformLocation.location);
        };
        MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
            this._channelSink.emit({
                'event': { 'type': e.type },
                'location': this._serializer.serialize(this._platformLocation.location, LocationType),
            });
        };
        MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
        MessageBasedPlatformLocation = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ServiceMessageBrokerFactory,
                platformBrowser.ɵBrowserPlatformLocation, MessageBus,
                Serializer])
        ], MessageBasedPlatformLocation);
        return MessageBasedPlatformLocation;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A list of {@link Provider}s. To use the router in a Worker enabled application you must
     * include these providers when setting up the render thread.
     * @experimental
     */
    var WORKER_UI_LOCATION_PROVIDERS = [
        { provide: MessageBasedPlatformLocation, deps: [ServiceMessageBrokerFactory,
                platformBrowser.ɵBrowserPlatformLocation, MessageBus, Serializer] },
        { provide: platformBrowser.ɵBrowserPlatformLocation, deps: [common.DOCUMENT] },
        { provide: core.PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [core.Injector] }
    ];
    function initUiLocation(injector) {
        return function () {
            var zone = injector.get(core.NgZone);
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
    var WebWorkerPlatformLocation = /** @class */ (function (_super) {
        __extends(WebWorkerPlatformLocation, _super);
        function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
            var _this = _super.call(this) || this;
            _this._serializer = _serializer;
            _this._popStateListeners = [];
            _this._hashChangeListeners = [];
            _this._location = null;
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
        /** @internal **/
        WebWorkerPlatformLocation.prototype.init = function () {
            var _this = this;
            var args = new UiArguments('getLocation');
            return this._broker.runOnService(args, LocationType).then(function (val) {
                _this._location = val;
                _this.initializedResolve();
                return true;
            }, function (err) { throw new Error(err); });
        };
        WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
            throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
        };
        WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
        WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
            get: function () { return this._location ? this._location.pathname : '<unknown>'; },
            set: function (newPath) {
                if (this._location === null) {
                    throw new Error('Attempt to set pathname before value is obtained from UI');
                }
                this._location.pathname = newPath;
                var fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
                var args = new UiArguments('setPathname', fnArgs);
                this._broker.runOnService(args, null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
            get: function () { return this._location ? this._location.search : '<unknown>'; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
            get: function () { return this._location ? this._location.hash : '<unknown>'; },
            enumerable: true,
            configurable: true
        });
        WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
            var fnArgs = [
                new FnArg(state, 1 /* PRIMITIVE */),
                new FnArg(title, 1 /* PRIMITIVE */),
                new FnArg(url, 1 /* PRIMITIVE */),
            ];
            var args = new UiArguments('pushState', fnArgs);
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
            var fnArgs = [
                new FnArg(state, 1 /* PRIMITIVE */),
                new FnArg(title, 1 /* PRIMITIVE */),
                new FnArg(url, 1 /* PRIMITIVE */),
            ];
            var args = new UiArguments('replaceState', fnArgs);
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.forward = function () {
            var args = new UiArguments('forward');
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation.prototype.back = function () {
            var args = new UiArguments('back');
            this._broker.runOnService(args, null);
        };
        WebWorkerPlatformLocation = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus, Serializer])
        ], WebWorkerPlatformLocation);
        return WebWorkerPlatformLocation;
    }(common.PlatformLocation));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
     * a worker context.
     *
     * @experimental
     */
    var WORKER_APP_LOCATION_PROVIDERS = [
        { provide: common.PlatformLocation, useClass: WebWorkerPlatformLocation }, {
            provide: core.APP_INITIALIZER,
            useFactory: appInitFnFactory,
            multi: true,
            deps: [common.PlatformLocation, core.NgZone]
        },
        { provide: common.LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [common.PlatformLocation] }
    ];
    function locationInitialized(platformLocation) {
        return platformLocation.initialized;
    }
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
    var NamedEventEmitter = /** @class */ (function () {
        function NamedEventEmitter() {
        }
        NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
        NamedEventEmitter.prototype.unlisten = function (eventName, listener) {
            var listeners = this._getListeners(eventName);
            var index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
        NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
            var listeners = this._getListeners(eventName);
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        };
        NamedEventEmitter.prototype._getListeners = function (eventName) {
            if (!this._listeners) {
                this._listeners = new Map();
            }
            var listeners = this._listeners.get(eventName);
            if (!listeners) {
                listeners = [];
                this._listeners.set(eventName, listeners);
            }
            return listeners;
        };
        return NamedEventEmitter;
    }());
    function eventNameWithTarget(target, eventName) {
        return target + ":" + eventName;
    }
    var WebWorkerRendererFactory2 = /** @class */ (function () {
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
        WebWorkerRendererFactory2.prototype.createRenderer = function (element, type) {
            var renderer = new WebWorkerRenderer2(this);
            var id = this.renderStore.allocateId();
            this.renderStore.store(renderer, id);
            this.callUI('createRenderer', [
                new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(type, 0 /* RENDERER_TYPE_2 */),
                new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return renderer;
        };
        WebWorkerRendererFactory2.prototype.begin = function () { };
        WebWorkerRendererFactory2.prototype.end = function () { };
        WebWorkerRendererFactory2.prototype.callUI = function (fnName, fnArgs) {
            var args = new UiArguments(fnName, fnArgs);
            this._messageBroker.runOnService(args, null);
        };
        WebWorkerRendererFactory2.prototype.allocateNode = function () {
            var result = new WebWorkerRenderNode();
            var id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            return result;
        };
        WebWorkerRendererFactory2.prototype.freeNode = function (node) { this.renderStore.remove(node); };
        WebWorkerRendererFactory2.prototype.allocateId = function () { return this.renderStore.allocateId(); };
        WebWorkerRendererFactory2.prototype._dispatchEvent = function (message) {
            var element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
            var eventName = message['eventName'];
            var target = message['eventTarget'];
            var event = message['event'];
            if (target) {
                this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
            }
            else {
                element.events.dispatchEvent(eventName, event);
            }
        };
        WebWorkerRendererFactory2 = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus,
                Serializer, RenderStore])
        ], WebWorkerRendererFactory2);
        return WebWorkerRendererFactory2;
    }());
    var WebWorkerRenderer2 = /** @class */ (function () {
        function WebWorkerRenderer2(_rendererFactory) {
            this._rendererFactory = _rendererFactory;
            this.data = Object.create(null);
            this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
        }
        WebWorkerRenderer2.prototype.destroy = function () { this.callUIWithRenderer('destroy'); };
        WebWorkerRenderer2.prototype.destroyNode = function (node) {
            this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            this._rendererFactory.freeNode(node);
        };
        WebWorkerRenderer2.prototype.createElement = function (name, namespace) {
            var node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createElement', [
                new FnArg(name),
                new FnArg(namespace),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        WebWorkerRenderer2.prototype.createComment = function (value) {
            var node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createComment', [
                new FnArg(value),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        WebWorkerRenderer2.prototype.createText = function (value) {
            var node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createText', [
                new FnArg(value),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        WebWorkerRenderer2.prototype.appendChild = function (parent, newChild) {
            this.callUIWithRenderer('appendChild', [
                new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            ]);
        };
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
        WebWorkerRenderer2.prototype.removeChild = function (parent, oldChild) {
            this.callUIWithRenderer('removeChild', [
                new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
            ]);
        };
        WebWorkerRenderer2.prototype.selectRootElement = function (selectorOrNode) {
            var node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('selectRootElement', [
                new FnArg(selectorOrNode),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        WebWorkerRenderer2.prototype.parentNode = function (node) {
            var res = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('parentNode', [
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return res;
        };
        WebWorkerRenderer2.prototype.nextSibling = function (node) {
            var res = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('nextSibling', [
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return res;
        };
        WebWorkerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
            this.callUIWithRenderer('setAttribute', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
                new FnArg(value),
                new FnArg(namespace),
            ]);
        };
        WebWorkerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
            this.callUIWithRenderer('removeAttribute', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
                new FnArg(namespace),
            ]);
        };
        WebWorkerRenderer2.prototype.addClass = function (el, name) {
            this.callUIWithRenderer('addClass', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
            ]);
        };
        WebWorkerRenderer2.prototype.removeClass = function (el, name) {
            this.callUIWithRenderer('removeClass', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
            ]);
        };
        WebWorkerRenderer2.prototype.setStyle = function (el, style, value, flags) {
            this.callUIWithRenderer('setStyle', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(style),
                new FnArg(value),
                new FnArg(flags),
            ]);
        };
        WebWorkerRenderer2.prototype.removeStyle = function (el, style, flags) {
            this.callUIWithRenderer('removeStyle', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(style),
                new FnArg(flags),
            ]);
        };
        WebWorkerRenderer2.prototype.setProperty = function (el, name, value) {
            this.callUIWithRenderer('setProperty', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
                new FnArg(value),
            ]);
        };
        WebWorkerRenderer2.prototype.setValue = function (node, value) {
            this.callUIWithRenderer('setValue', [
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(value),
            ]);
        };
        WebWorkerRenderer2.prototype.listen = function (target, eventName, listener) {
            var _this = this;
            var unlistenId = this._rendererFactory.allocateId();
            var _a = __read(typeof target === 'string' ? [null, target, target + ":" + eventName] :
                [target, null, null], 3), targetEl = _a[0], targetName = _a[1], fullName = _a[2];
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
        WebWorkerRenderer2.prototype.callUIWithRenderer = function (fnName, fnArgs) {
            if (fnArgs === void 0) { fnArgs = []; }
            // always pass the renderer as the first arg
            this._rendererFactory.callUI(fnName, __spread([this.asFnArg], fnArgs));
        };
        return WebWorkerRenderer2;
    }());
    var WebWorkerRenderNode = /** @class */ (function () {
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
    var WorkerDomAdapter = /** @class */ (function (_super) {
        __extends(WorkerDomAdapter, _super);
        function WorkerDomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkerDomAdapter.makeCurrent = function () { platformBrowser.ɵsetRootDomAdapter(new WorkerDomAdapter()); };
        WorkerDomAdapter.prototype.logError = function (error) {
            if (console.error) {
                console.error(error);
            }
            else {
                // tslint:disable-next-line:no-console
                console.log(error);
            }
        };
        WorkerDomAdapter.prototype.log = function (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
        };
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
        WorkerDomAdapter.prototype.logGroupEnd = function () {
            if (console.groupEnd) {
                console.groupEnd();
            }
        };
        WorkerDomAdapter.prototype.contains = function (nodeA, nodeB) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasProperty = function (element, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
        Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
            get: function () { throw 'not implemented'; },
            set: function (value) { throw 'not implemented'; },
            enumerable: true,
            configurable: true
        });
        WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.querySelector = function (el, selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.querySelectorAll = function (el, selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.on = function (el, evt, listener) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createMouseEvent = function (eventType) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.preventDefault = function (evt) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isPrevented = function (evt) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getInnerHTML = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTemplateContent = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getOuterHTML = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nodeName = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nodeValue = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.type = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.content = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.firstChild = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.nextSibling = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.parentElement = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.childNodes = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.childNodesAsList = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.clearNodes = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.appendChild = function (el, node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeChild = function (el, node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.replaceChild = function (el, newNode, oldNode) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.remove = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.insertBefore = function (parent, el, node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.insertAllBefore = function (parent, el, nodes) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.insertAfter = function (parent, el, node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setInnerHTML = function (el, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getText = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setText = function (el, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getValue = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setValue = function (el, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getChecked = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setChecked = function (el, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createTemplate = function (html) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createElement = function (tagName, doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createTextNode = function (text, doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createStyleElement = function (css, doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createShadowRoot = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getShadowRoot = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHost = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getDistributedNodes = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getElementsByClassName = function (element, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getElementsByTagName = function (element, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.classList = function (element) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.addClass = function (element, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeClass = function (element, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasClass = function (element, className) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setStyle = function (element, styleName, styleValue) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeStyle = function (element, styleName) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getStyle = function (element, styleName) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.tagName = function (element) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.attributeMap = function (element) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasAttribute = function (element, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getAttribute = function (element, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setAttribute = function (element, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeAttribute = function (element, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.templateAwareRoot = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getDefaultDocument = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getBoundingClientRect = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTitle = function (doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setTitle = function (doc, newTitle) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.elementMatches = function (n, selector) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isTextNode = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isCommentNode = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isElementNode = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.hasShadowRoot = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.isShadowRoot = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHref = function (element) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getEventKey = function (event) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.resolveAndSetHref = function (element, baseUrl, href) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getBaseHref = function (doc) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getUserAgent = function () { return 'Fake user agent'; };
        WorkerDomAdapter.prototype.setData = function (element, name, value) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getComputedStyle = function (element) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getData = function (element, name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
        WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
        WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
        WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
        return WorkerDomAdapter;
    }(platformBrowser.ɵDomAdapter));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @experimental
     */
    var platformWorkerApp = core.createPlatformFactory(core.platformCore, 'workerApp', [{ provide: core.PLATFORM_ID, useValue: common.ɵPLATFORM_WORKER_APP_ID }]);
    function errorHandler() {
        return new core.ErrorHandler();
    }
    var ɵ0 = function (message, transferrables) {
        postMessage(message, transferrables);
    };
    // TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
    var _postMessage = {
        postMessage: ɵ0
    };
    function createMessageBus(zone) {
        var sink = new PostMessageBusSink(_postMessage);
        var source = new PostMessageBusSource();
        var bus = new PostMessageBus(sink, source);
        bus.attachToZone(zone);
        return bus;
    }
    function setupWebWorker() {
        WorkerDomAdapter.makeCurrent();
    }
    /**
     * The ng module for the worker app side.
     *
     * @experimental
     */
    var WorkerAppModule = /** @class */ (function () {
        function WorkerAppModule() {
        }
        WorkerAppModule = __decorate([
            core.NgModule({
                providers: [
                    platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
                    Serializer,
                    { provide: platformBrowser.DOCUMENT, useValue: null },
                    ClientMessageBrokerFactory,
                    ServiceMessageBrokerFactory,
                    WebWorkerRendererFactory2,
                    { provide: core.RendererFactory2, useExisting: WebWorkerRendererFactory2 },
                    { provide: ON_WEB_WORKER, useValue: true },
                    RenderStore,
                    { provide: core.ErrorHandler, useFactory: errorHandler, deps: [] },
                    { provide: MessageBus, useFactory: createMessageBus, deps: [core.NgZone] },
                    { provide: core.APP_INITIALIZER, useValue: setupWebWorker, multi: true },
                    { provide: common.ViewportScroller, useClass: common.ɵNullViewportScroller, deps: [] },
                ],
                exports: [
                    common.CommonModule,
                    core.ApplicationModule,
                ]
            })
        ], WorkerAppModule);
        return WorkerAppModule;
    }());

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
     * @experimental
     */
    function bootstrapWorkerUi(workerScriptUri, customProviders) {
        if (customProviders === void 0) { customProviders = []; }
        // For now, just creates the worker ui platform...
        var platform = platformWorkerUi(__spread([
            { provide: WORKER_SCRIPT, useValue: workerScriptUri }
        ], customProviders));
        return Promise.resolve(platform);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file only reexports content of the `src` folder. Keep it that way.

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵangular_packages_platform_webworker_platform_webworker_k = ON_WEB_WORKER;
    exports.ɵangular_packages_platform_webworker_platform_webworker_h = RenderStore;
    exports.ɵangular_packages_platform_webworker_platform_webworker_a = Serializer;
    exports.ɵangular_packages_platform_webworker_platform_webworker_c = appInitFnFactory;
    exports.ɵangular_packages_platform_webworker_platform_webworker_b = locationInitialized;
    exports.ɵangular_packages_platform_webworker_platform_webworker_i = WebWorkerPlatformLocation;
    exports.ɵangular_packages_platform_webworker_platform_webworker_j = WebWorkerRendererFactory2;
    exports.ɵangular_packages_platform_webworker_platform_webworker_e = createMessageBus;
    exports.ɵangular_packages_platform_webworker_platform_webworker_d = errorHandler;
    exports.ɵangular_packages_platform_webworker_platform_webworker_f = setupWebWorker;
    exports.ɵangular_packages_platform_webworker_platform_webworker_g = _WORKER_UI_PLATFORM_PROVIDERS;
    exports.bootstrapWorkerUi = bootstrapWorkerUi;
    exports.VERSION = VERSION;
    exports.ClientMessageBroker = ClientMessageBroker;
    exports.ClientMessageBrokerFactory = ClientMessageBrokerFactory;
    exports.FnArg = FnArg;
    exports.UiArguments = UiArguments;
    exports.MessageBus = MessageBus;
    exports.ServiceMessageBroker = ServiceMessageBroker;
    exports.ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
    exports.WORKER_UI_LOCATION_PROVIDERS = WORKER_UI_LOCATION_PROVIDERS;
    exports.WORKER_APP_LOCATION_PROVIDERS = WORKER_APP_LOCATION_PROVIDERS;
    exports.WorkerAppModule = WorkerAppModule;
    exports.platformWorkerApp = platformWorkerApp;
    exports.platformWorkerUi = platformWorkerUi;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-webworker.umd.js.map
