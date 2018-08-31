/**
 * @license Angular v5.2.11-a065dc2
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
import { CommonModule, DOCUMENT, LOCATION_INITIALIZED, PlatformLocation, ɵPLATFORM_WORKER_APP_ID, ɵPLATFORM_WORKER_UI_ID } from '@angular/common';
import { APP_INITIALIZER, ApplicationModule, ErrorHandler, EventEmitter, Injectable, InjectionToken, Injector, NgModule, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, RenderComponentType, RendererFactory2, Testability, Version, createPlatformFactory, isDevMode, platformCore, ɵAPP_ID_RANDOM_PROVIDER, ɵstringify } from '@angular/core';
import { DOCUMENT as DOCUMENT$1, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵBROWSER_SANITIZATION_PROVIDERS, ɵBrowserDomAdapter, ɵBrowserGetTestability, ɵBrowserPlatformLocation, ɵDomAdapter, ɵDomEventsPlugin, ɵDomRendererFactory2, ɵDomSharedStylesHost, ɵHammerGesturesPlugin, ɵKeyEventsPlugin, ɵSharedStylesHost, ɵsetRootDomAdapter } from '@angular/platform-browser';
import { __extends } from 'tslib';

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
var ON_WEB_WORKER = new InjectionToken('WebWorker.onWebWorker');

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
/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 *
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @abstract
 */
var MessageBus = /** @class */ (function () {
    function MessageBus() {
    }
    return MessageBus;
}());
/**
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @record
 */

/**
 * \@experimental WebWorker support in Angular is currenlty experimental.
 * @record
 */

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
var RenderStore = /** @class */ (function () {
    function RenderStore() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */
    RenderStore.prototype.allocateId = /**
     * @return {?}
     */
    function () { return this._nextIndex++; };
    /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    RenderStore.prototype.store = /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    function (obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.remove = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
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
    RenderStore.prototype.deserialize = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    RenderStore.prototype.serialize = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj == null ? null : this._lookupByObject.get(obj);
    };
    RenderStore.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RenderStore.ctorParameters = function () { return []; };
    return RenderStore;
}());

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
    /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */
    Serializer.prototype.serialize = /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */
    function (obj, type) {
        var _this = this;
        if (type === void 0) { type = 1 /* PRIMITIVE */; }
        if (obj == null || type === 1 /* PRIMITIVE */) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(function (v) { return _this.serialize(v, type); });
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return /** @type {?} */ ((this._renderStore.serialize(obj)));
        }
        if (type === RenderComponentType) {
            return this._serializeRenderComponentType(obj);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._serializeRendererType2(obj);
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error("No serializer for type " + ɵstringify(type));
    };
    /**
     * @param {?} map
     * @param {?=} type
     * @param {?=} data
     * @return {?}
     */
    Serializer.prototype.deserialize = /**
     * @param {?} map
     * @param {?=} type
     * @param {?=} data
     * @return {?}
     */
    function (map, type, data) {
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
        if (type === RenderComponentType) {
            return this._deserializeRenderComponentType(map);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._deserializeRendererType2(map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error("No deserializer for type " + ɵstringify(type));
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    Serializer.prototype._serializeLocation = /**
     * @param {?} loc
     * @return {?}
     */
    function (loc) {
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
    Serializer.prototype._deserializeLocation = /**
     * @param {?} loc
     * @return {?}
     */
    function (loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Serializer.prototype._serializeRenderComponentType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    Serializer.prototype._deserializeRenderComponentType = /**
     * @param {?} props
     * @return {?}
     */
    function (props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Serializer.prototype._serializeRendererType2 = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
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
    Serializer.prototype._deserializeRendererType2 = /**
     * @param {?} props
     * @return {?}
     */
    function (props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    };
    Serializer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Serializer.ctorParameters = function () { return [
        { type: RenderStore, },
    ]; };
    return Serializer;
}());

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
/**
 * \@experimental WebWorker support in Angular is experimental.
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
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    ClientMessageBrokerFactory.prototype.createMessageBroker = /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker(this._messageBus, this._serializer, channel);
    };
    ClientMessageBrokerFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ClientMessageBrokerFactory.ctorParameters = function () { return [
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return ClientMessageBrokerFactory;
}());
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
var ClientMessageBroker = /** @class */ (function () {
    /** @internal */
    function ClientMessageBroker(messageBus, _serializer, channel) {
        var _this = this;
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        var /** @type {?} */ source = messageBus.from(channel);
        source.subscribe({ next: function (message) { return _this._handleMessage(message); } });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ClientMessageBroker.prototype._generateMessageId = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ time = ɵstringify(new Date().getTime());
        var /** @type {?} */ iteration = 0;
        var /** @type {?} */ id = name + time + ɵstringify(iteration);
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
    ClientMessageBroker.prototype.runOnService = /**
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    function (args, returnType) {
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
            var /** @type {?} */ completer_1 = /** @type {?} */ ((undefined));
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
    ClientMessageBroker.prototype._handleMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        if (message.type === 'result' || message.type === 'error') {
            var /** @type {?} */ id = /** @type {?} */ ((message.id));
            if (this._pending.has(id)) {
                if (message.type === 'result') {
                    /** @type {?} */ ((this._pending.get(id))).resolve(message.value);
                }
                else {
                    /** @type {?} */ ((this._pending.get(id))).reject(message.value);
                }
                this._pending.delete(id);
            }
        }
    };
    return ClientMessageBroker;
}());
/**
 * \@experimental WebWorker support in Angular is experimental.
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
 * \@experimental WebWorker support in Angular is experimental.
 */
var UiArguments = /** @class */ (function () {
    function UiArguments(method, args) {
        this.method = method;
        this.args = args;
    }
    return UiArguments;
}());

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
/**
 * @record
 */

var PostMessageBusSink = /** @class */ (function () {
    function PostMessageBusSink(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSink.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        var _this = this;
        this._zone = zone;
        this._zone.runOutsideAngular(function () { _this._zone.onStable.subscribe({ next: function () { _this._handleOnEventDone(); } }); });
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSink.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        var _this = this;
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new EventEmitter(false);
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
    PostMessageBusSink.prototype.to = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
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
    PostMessageBusSink.prototype._handleOnEventDone = /**
     * @return {?}
     */
    function () {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    };
    /**
     * @param {?} messages
     * @return {?}
     */
    PostMessageBusSink.prototype._sendMessages = /**
     * @param {?} messages
     * @return {?}
     */
    function (messages) { this._postMessageTarget.postMessage(messages); };
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
            var /** @type {?} */ workerScope = /** @type {?} */ (self);
            workerScope.addEventListener('message', function (ev) { return _this._handleMessages(ev); });
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBusSource.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) { this._zone = zone; };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBusSource.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(channel + " has already been initialized");
        }
        var /** @type {?} */ emitter = new EventEmitter(false);
        var /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBusSource.prototype.from = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) {
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
    PostMessageBusSource.prototype._handleMessages = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var /** @type {?} */ messages = ev.data;
        for (var /** @type {?} */ i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    PostMessageBusSource.prototype._handleMessage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
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
var PostMessageBus = /** @class */ (function () {
    function PostMessageBus(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    PostMessageBus.prototype.attachToZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    };
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    PostMessageBus.prototype.initChannel = /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.from = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) { return this.source.from(channel); };
    /**
     * @param {?} channel
     * @return {?}
     */
    PostMessageBus.prototype.to = /**
     * @param {?} channel
     * @return {?}
     */
    function (channel) { return this.sink.to(channel); };
    PostMessageBus.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PostMessageBus.ctorParameters = function () { return [
        { type: PostMessageBusSink, },
        { type: PostMessageBusSource, },
    ]; };
    return PostMessageBus;
}());
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
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
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 */
var ServiceMessageBroker = /** @class */ (function () {
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
 * \@experimental WebWorker support in Angular is currently experimental.
 * @record
 */

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
/**
 * All channels used by angular's WebWorker components are listed here.
 * You should not use these channels in your application code.
 */
var RENDERER_2_CHANNEL = 'v2.ng-Renderer';
var EVENT_2_CHANNEL = 'v2.ng-Events';
var ROUTER_CHANNEL = 'ng-Router';

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
    if (NODES_WITH_VALUE.has((/** @type {?} */ (e.target)).tagName.toLowerCase())) {
        var /** @type {?} */ target = /** @type {?} */ (e.target);
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EventDispatcher = /** @class */ (function () {
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
    EventDispatcher.prototype.dispatchAnimationEvent = /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} element
     * @return {?}
     */
    function (player, phaseName, element) {
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
    EventDispatcher.prototype.dispatchRenderEvent = /**
     * @param {?} element
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    function (element, eventTarget, eventName, event) {
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
var MessageBasedRenderer2 = /** @class */ (function () {
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
    MessageBasedRenderer2.prototype.start = /**
     * @return {?}
     */
    function () {
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
    MessageBasedRenderer2.prototype.destroy = /**
     * @param {?} r
     * @return {?}
     */
    function (r) { r.destroy(); };
    /**
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    MessageBasedRenderer2.prototype.destroyNode = /**
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    function (r, node) {
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
    MessageBasedRenderer2.prototype.createRenderer = /**
     * @param {?} el
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    function (el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    };
    /**
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createElement = /**
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    function (r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    };
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createComment = /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    function (r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    };
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.createText = /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    function (r, value, id) {
        this._renderStore.store(r.createText(value), id);
    };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    MessageBasedRenderer2.prototype.appendChild = /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    function (r, parent, child) { r.appendChild(parent, child); };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    MessageBasedRenderer2.prototype.insertBefore = /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    function (r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    };
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeChild = /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    function (r, parent, child) { r.removeChild(parent, child); };
    /**
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.selectRootElement = /**
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    function (r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.parentNode = /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    function (r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    MessageBasedRenderer2.prototype.nextSibling = /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    function (r, node, id) {
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
    MessageBasedRenderer2.prototype.setAttribute = /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?} namespace
     * @return {?}
     */
    function (r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeAttribute = /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    function (r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    MessageBasedRenderer2.prototype.addClass = /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (r, el, name) { r.addClass(el, name); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeClass = /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (r, el, name) { r.removeClass(el, name); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setStyle = /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    function (r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    MessageBasedRenderer2.prototype.removeStyle = /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    function (r, el, style, flags) {
        r.removeStyle(el, style, flags);
    };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setProperty = /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (r, el, name, value) {
        r.setProperty(el, name, value);
    };
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    MessageBasedRenderer2.prototype.setValue = /**
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (r, node, value) { r.setValue(node, value); };
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    MessageBasedRenderer2.prototype.listen = /**
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    function (r, el, elName, eventName, unlistenId) {
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
    MessageBasedRenderer2.prototype.unlisten = /**
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    function (r, unlisten) { unlisten(); };
    MessageBasedRenderer2.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageBasedRenderer2.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
        { type: RendererFactory2, },
    ]; };
    return MessageBasedRenderer2;
}());

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
/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@experimental WebWorker support is currently experimental.
 */
var WebWorkerInstance = /** @class */ (function () {
    function WebWorkerInstance() {
    }
    /**
     * \@internal
     * @param {?} worker
     * @param {?} bus
     * @return {?}
     */
    WebWorkerInstance.prototype.init = /**
     * \@internal
     * @param {?} worker
     * @param {?} bus
     * @return {?}
     */
    function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    WebWorkerInstance.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerInstance.ctorParameters = function () { return []; };
    return WebWorkerInstance;
}());
/**
 * \@experimental WebWorker support is currently experimental.
 */
var WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * \@experimental WebWorker support is currently experimental.
 */
var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
var _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: NgZone, useFactory: createNgZone, deps: [] },
    {
        provide: MessageBasedRenderer2,
        deps: [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, RendererFactory2]
    },
    { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
    ɵBROWSER_SANITIZATION_PROVIDERS,
    { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: DOCUMENT$1, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: ɵDomEventsPlugin,
        deps: [DOCUMENT$1, NgZone],
        multi: true
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: ɵKeyEventsPlugin, deps: [DOCUMENT$1], multi: true },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: ɵHammerGesturesPlugin,
        deps: [DOCUMENT$1, HAMMER_GESTURE_CONFIG],
        multi: true
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] },
    ɵAPP_ID_RANDOM_PROVIDER,
    { provide: ɵDomRendererFactory2, deps: [EventManager, ɵDomSharedStylesHost] },
    { provide: RendererFactory2, useExisting: ɵDomRendererFactory2 },
    { provide: ɵSharedStylesHost, useExisting: ɵDomSharedStylesHost },
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
    { provide: ɵDomSharedStylesHost, deps: [DOCUMENT$1] },
    { provide: Testability, deps: [NgZone] },
    { provide: EventManager, deps: [EVENT_MANAGER_PLUGINS, NgZone] },
    { provide: WebWorkerInstance, deps: [] },
    {
        provide: PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [Injector]
    },
    { provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_UI_ID },
    { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
];
/**
 * @param {?} injector
 * @return {?}
 */
function initializeGenericWorkerRenderer(injector) {
    var /** @type {?} */ bus = injector.get(MessageBus);
    var /** @type {?} */ zone = injector.get(NgZone);
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
        ɵBrowserDomAdapter.makeCurrent();
        ɵBrowserGetTestability.init();
        var /** @type {?} */ scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (/** @type {?} */ e) {
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
var platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
function _exceptionHandler() {
    return new ErrorHandler();
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
    return new NgZone({ enableLongStackTrace: isDevMode() });
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
/**
 * \@stable
 */
var VERSION = new Version('5.2.11-a065dc2');

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
var MessageBasedPlatformLocation = /** @class */ (function () {
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._platformLocation.onHashChange(/** @type {?} */ (this._sendUrlChangeEvent.bind(this)));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    /**
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype.start = /**
     * @return {?}
     */
    function () {
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
    MessageBasedPlatformLocation.prototype._getLocation = /**
     * @return {?}
     */
    function () {
        return Promise.resolve(this._platformLocation.location);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    };
    /**
     * @param {?} pathname
     * @return {?}
     */
    MessageBasedPlatformLocation.prototype._setPathname = /**
     * @param {?} pathname
     * @return {?}
     */
    function (pathname) { this._platformLocation.pathname = pathname; };
    MessageBasedPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageBasedPlatformLocation.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: ɵBrowserPlatformLocation, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return MessageBasedPlatformLocation;
}());

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
/**
 * A list of {\@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * \@experimental
 */
var WORKER_UI_LOCATION_PROVIDERS = /** @type {?} */ ([
    { provide: MessageBasedPlatformLocation, deps: [ServiceMessageBrokerFactory,
            ɵBrowserPlatformLocation, MessageBus, Serializer] },
    { provide: ɵBrowserPlatformLocation, deps: [DOCUMENT] },
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
]);
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return function () {
        var /** @type {?} */ zone = injector.get(NgZone);
        zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
    };
}

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
var WebWorkerPlatformLocation = /** @class */ (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = _super.call(this) || this;
        _this._serializer = _serializer;
        _this._popStateListeners = [];
        _this._hashChangeListeners = [];
        _this._location = /** @type {?} */ ((null));
        _this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        _this._channelSource = bus.from(ROUTER_CHANNEL);
        _this._channelSource.subscribe({
            next: function (msg) {
                var /** @type {?} */ listeners = null;
                if (msg.hasOwnProperty('event')) {
                    var /** @type {?} */ type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = _this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = _this._hashChangeListeners;
                    }
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
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
    /**
     * \@internal *
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.init = /**
     * \@internal *
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ args = new UiArguments('getLocation');
        return /** @type {?} */ ((this._broker.runOnService(args, LocationType))).then(function (val) {
            _this._location = val;
            _this.initializedResolve();
            return true;
        }, function (err) { throw new Error(err); });
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = /**
     * @return {?}
     */
    function () {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onPopState = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._popStateListeners.push(fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.onHashChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._hashChangeListeners.push(fn); };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
        get: /**
         * @return {?}
         */
        function () { return this._location ? /** @type {?} */ ((this._location.pathname)) : '<unknown>'; },
        set: /**
         * @param {?} newPath
         * @return {?}
         */
        function (newPath) {
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
        get: /**
         * @return {?}
         */
        function () { return this._location ? this._location.search : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        get: /**
         * @return {?}
         */
        function () { return this._location ? this._location.hash : '<unknown>'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.pushState = /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    function (state, title, url) {
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
    WebWorkerPlatformLocation.prototype.replaceState = /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    function (state, title, url) {
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
    WebWorkerPlatformLocation.prototype.forward = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerPlatformLocation.prototype.back = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ args = new UiArguments('back');
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerPlatformLocation.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };
    return WebWorkerPlatformLocation;
}(PlatformLocation));

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
/**
 * The {\@link PlatformLocation} providers that should be added when the {\@link Location} is used in
 * a worker context.
 *
 * \@experimental
 */
var WORKER_APP_LOCATION_PROVIDERS = [
    { provide: PlatformLocation, useClass: WebWorkerPlatformLocation }, {
        provide: APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [PlatformLocation, NgZone]
    },
    { provide: LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [PlatformLocation] }
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
var NamedEventEmitter = /** @class */ (function () {
    function NamedEventEmitter() {
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    NamedEventEmitter.prototype.listen = /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (eventName, callback) { this._getListeners(eventName).push(callback); };
    /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    NamedEventEmitter.prototype.unlisten = /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    function (eventName, listener) {
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
    NamedEventEmitter.prototype.dispatchEvent = /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    function (eventName, event) {
        var /** @type {?} */ listeners = this._getListeners(eventName);
        for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    /**
     * @param {?} eventName
     * @return {?}
     */
    NamedEventEmitter.prototype._getListeners = /**
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) {
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
var WebWorkerRendererFactory2 = /** @class */ (function () {
    function WebWorkerRendererFactory2(messageBrokerFactory, bus, _serializer, renderStore) {
        var _this = this;
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        var /** @type {?} */ source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.createRenderer = /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    function (element, type) {
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
    WebWorkerRendererFactory2.prototype.begin = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.end = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.callUI = /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    function (fnName, fnArgs) {
        var /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateNode = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ result = new WebWorkerRenderNode();
        var /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.freeNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { this.renderStore.remove(node); };
    /**
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype.allocateId = /**
     * @return {?}
     */
    function () { return this.renderStore.allocateId(); };
    /**
     * @param {?} message
     * @return {?}
     */
    WebWorkerRendererFactory2.prototype._dispatchEvent = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
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
    WebWorkerRendererFactory2.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerRendererFactory2.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
    ]; };
    return WebWorkerRendererFactory2;
}());
var WebWorkerRenderer2 = /** @class */ (function () {
    function WebWorkerRenderer2(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroy = /**
     * @return {?}
     */
    function () { this.callUIWithRenderer('destroy'); };
    /**
     * @param {?} node
     * @return {?}
     */
    WebWorkerRenderer2.prototype.destroyNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    WebWorkerRenderer2.prototype.createElement = /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (name, namespace) {
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
    WebWorkerRenderer2.prototype.createComment = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    WebWorkerRenderer2.prototype.createText = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    WebWorkerRenderer2.prototype.appendChild = /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    function (parent, newChild) {
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
    WebWorkerRenderer2.prototype.insertBefore = /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    function (parent, newChild, refChild) {
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
    WebWorkerRenderer2.prototype.removeChild = /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    function (parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    WebWorkerRenderer2.prototype.selectRootElement = /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    function (selectorOrNode) {
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
    WebWorkerRenderer2.prototype.parentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
    WebWorkerRenderer2.prototype.nextSibling = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
    WebWorkerRenderer2.prototype.setAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, value, namespace) {
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
    WebWorkerRenderer2.prototype.removeAttribute = /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    function (el, name, namespace) {
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
    WebWorkerRenderer2.prototype.addClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) {
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
    WebWorkerRenderer2.prototype.removeClass = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) {
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
    WebWorkerRenderer2.prototype.setStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    function (el, style, value, flags) {
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
    WebWorkerRenderer2.prototype.removeStyle = /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    function (el, style, flags) {
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
    WebWorkerRenderer2.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) {
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
    WebWorkerRenderer2.prototype.setValue = /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    function (node, value) {
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
    WebWorkerRenderer2.prototype.listen = /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    function (target, eventName, listener) {
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
    WebWorkerRenderer2.prototype.callUIWithRenderer = /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    function (fnName, fnArgs) {
        if (fnArgs === void 0) { fnArgs = []; }
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg].concat(fnArgs));
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
    /**
     * @return {?}
     */
    WorkerDomAdapter.makeCurrent = /**
     * @return {?}
     */
    function () { ɵsetRootDomAdapter(new WorkerDomAdapter()); };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
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
    WorkerDomAdapter.prototype.log = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    WorkerDomAdapter.prototype.logGroup = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
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
    WorkerDomAdapter.prototype.logGroupEnd = /**
     * @return {?}
     */
    function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    WorkerDomAdapter.prototype.contains = /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    function (nodeA, nodeB) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasProperty = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setProperty = /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (el, name, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getProperty = /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    function (el, name) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    WorkerDomAdapter.prototype.invoke = /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    function (el, methodName, args) { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        get: /**
         * @return {?}
         */
        function () { throw 'not implemented'; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    WorkerDomAdapter.prototype.parse = /**
     * @param {?} templateHtml
     * @return {?}
     */
    function (templateHtml) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelector = /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.querySelectorAll = /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    function (el, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.on = /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    WorkerDomAdapter.prototype.onAndCancel = /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    function (el, evt, listener) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.dispatchEvent = /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    function (el, evt) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createMouseEvent = /**
     * @param {?} eventType
     * @return {?}
     */
    function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} eventType
     * @return {?}
     */
    WorkerDomAdapter.prototype.createEvent = /**
     * @param {?} eventType
     * @return {?}
     */
    function (eventType) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.preventDefault = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) { throw 'not implemented'; };
    /**
     * @param {?} evt
     * @return {?}
     */
    WorkerDomAdapter.prototype.isPrevented = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getInnerHTML = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTemplateContent = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getOuterHTML = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeName = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.nodeValue = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.type = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.content = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.firstChild = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.nextSibling = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.parentElement = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.childNodesAsList = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.clearNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.appendChild = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeChild = /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    WorkerDomAdapter.prototype.replaceChild = /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    function (el, newNode, oldNode) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.remove = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertBefore = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAllBefore = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    function (parent, el, nodes) { throw 'not implemented'; };
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.insertAfter = /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    function (parent, el, node) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setInnerHTML = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getText = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setText = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getValue = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setValue = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getChecked = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setChecked = /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    function (el, value) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @return {?}
     */
    WorkerDomAdapter.prototype.createComment = /**
     * @param {?} text
     * @return {?}
     */
    function (text) { throw 'not implemented'; };
    /**
     * @param {?} html
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTemplate = /**
     * @param {?} html
     * @return {?}
     */
    function (html) { throw 'not implemented'; };
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElement = /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    function (tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createElementNS = /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    function (ns, tagName, doc) { throw 'not implemented'; };
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createTextNode = /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    function (text, doc) { throw 'not implemented'; };
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createScriptTag = /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    function (attrName, attrValue, doc) {
        throw 'not implemented';
    };
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.createStyleElement = /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    function (css, doc) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.createShadowRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getShadowRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHost = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDistributedNodes = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.clone = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByClassName = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getElementsByTagName = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.classList = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.addClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.setStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    WorkerDomAdapter.prototype.getStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    function (element, styleName) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasStyle = /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    function (element, styleName, styleValue) {
        throw 'not implemented';
    };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.tagName = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.attributeMap = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttribute = /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, ns, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttribute = /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    function (element, attribute) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    WorkerDomAdapter.prototype.removeAttributeNS = /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    function (element, ns, attribute) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.templateAwareRoot = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.createHtmlDocument = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getDefaultDocument = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBoundingClientRect = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTitle = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    WorkerDomAdapter.prototype.setTitle = /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    function (doc, newTitle) { throw 'not implemented'; };
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    WorkerDomAdapter.prototype.elementMatches = /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    function (n, selector) { throw 'not implemented'; };
    /**
     * @param {?} el
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTemplateElement = /**
     * @param {?} el
     * @return {?}
     */
    function (el) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isTextNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isCommentNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isElementNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.hasShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.isShadowRoot = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.importIntoDoc = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} node
     * @return {?}
     */
    WorkerDomAdapter.prototype.adoptNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHref = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} event
     * @return {?}
     */
    WorkerDomAdapter.prototype.getEventKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    WorkerDomAdapter.prototype.resolveAndSetHref = /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    function (element, baseUrl, href) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsDOMEvents = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    WorkerDomAdapter.prototype.getGlobalEventTarget = /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    function (doc, target) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getHistory = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getLocation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @param {?} doc
     * @return {?}
     */
    WorkerDomAdapter.prototype.getBaseHref = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.resetBaseElement = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getUserAgent = /**
     * @return {?}
     */
    function () { return 'Fake user agent'; };
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setData = /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (element, name, value) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @return {?}
     */
    WorkerDomAdapter.prototype.getComputedStyle = /**
     * @param {?} element
     * @return {?}
     */
    function (element) { throw 'not implemented'; };
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getData = /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    function (element, name) { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.performanceNow = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getAnimationPrefix = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.getTransitionEnd = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsAnimation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsWebAnimation = /**
     * @return {?}
     */
    function () { throw 'not implemented'; };
    /**
     * @return {?}
     */
    WorkerDomAdapter.prototype.supportsCookies = /**
     * @return {?}
     */
    function () { return false; };
    /**
     * @param {?} name
     * @return {?}
     */
    WorkerDomAdapter.prototype.getCookie = /**
     * @param {?} name
     * @return {?}
     */
    function (name) { throw 'not implemented'; };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    WorkerDomAdapter.prototype.setCookie = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(ɵDomAdapter));

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
/**
 * \@experimental
 */
var platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
function errorHandler() {
    return new ErrorHandler();
}
var ɵ0 = function (message, transferrables) {
    (/** @type {?} */ (postMessage))(message, transferrables);
};
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: ɵ0
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
var WorkerAppModule = /** @class */ (function () {
    function WorkerAppModule() {
    }
    WorkerAppModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        ɵBROWSER_SANITIZATION_PROVIDERS,
                        Serializer,
                        { provide: DOCUMENT$1, useValue: null },
                        ClientMessageBrokerFactory,
                        ServiceMessageBrokerFactory,
                        WebWorkerRendererFactory2,
                        { provide: RendererFactory2, useExisting: WebWorkerRendererFactory2 },
                        { provide: ON_WEB_WORKER, useValue: true },
                        RenderStore,
                        { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                        { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] },
                        { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true },
                    ],
                    exports: [
                        CommonModule,
                        ApplicationModule,
                    ]
                },] },
    ];
    /** @nocollapse */
    WorkerAppModule.ctorParameters = function () { return []; };
    return WorkerAppModule;
}());

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
/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { VERSION, ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments, MessageBus, ServiceMessageBroker, ServiceMessageBrokerFactory, WORKER_UI_LOCATION_PROVIDERS, WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule, platformWorkerApp, platformWorkerUi, bootstrapWorkerUi, ON_WEB_WORKER as ɵk, RenderStore as ɵh, Serializer as ɵa, appInitFnFactory as ɵc, locationInitialized as ɵb, WebWorkerPlatformLocation as ɵi, WebWorkerRendererFactory2 as ɵj, createMessageBus as ɵe, errorHandler as ɵd, setupWebWorker as ɵf, _WORKER_UI_PLATFORM_PROVIDERS as ɵg };
//# sourceMappingURL=platform-webworker.js.map
