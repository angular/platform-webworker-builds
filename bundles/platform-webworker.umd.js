/**
 * @license Angular v4.0.0-beta.8-2ddd1c3
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs/Subject'), require('rxjs/Observable'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', 'rxjs/Subject', 'rxjs/Observable', '@angular/common'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformWebworker = global.ng.platformWebworker || {}),global.ng.core,global.ng.platformBrowser,global.Rx,global.Rx,global.ng.common));
}(this, function (exports,_angular_core,_angular_platformBrowser,rxjs_Subject,rxjs_Observable,_angular_common) { 'use strict';

    var /** @type {?} */ APP_ID_RANDOM_PROVIDER = _angular_core.__core_private__.APP_ID_RANDOM_PROVIDER;

    var /** @type {?} */ BROWSER_SANITIZATION_PROVIDERS = _angular_platformBrowser.__platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS;
    var /** @type {?} */ BrowserPlatformLocation = _angular_platformBrowser.__platform_browser_private__.BrowserPlatformLocation;
    var /** @type {?} */ getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
    var /** @type {?} */ BrowserDomAdapter = _angular_platformBrowser.__platform_browser_private__.BrowserDomAdapter;
    var /** @type {?} */ BrowserGetTestability = _angular_platformBrowser.__platform_browser_private__.BrowserGetTestability;
    var /** @type {?} */ DomRootRenderer = _angular_platformBrowser.__platform_browser_private__.DomRootRenderer;
    var /** @type {?} */ DomRootRenderer_ = _angular_platformBrowser.__platform_browser_private__.DomRootRenderer_;
    var /** @type {?} */ DomRendererFactoryV2 = _angular_platformBrowser.__platform_browser_private__.DomRendererFactoryV2;
    var /** @type {?} */ DomEventsPlugin = _angular_platformBrowser.__platform_browser_private__.DomEventsPlugin;
    var /** @type {?} */ DomSharedStylesHost = _angular_platformBrowser.__platform_browser_private__.DomSharedStylesHost;
    var /** @type {?} */ SharedStylesHost = _angular_platformBrowser.__platform_browser_private__.SharedStylesHost;
    var /** @type {?} */ KeyEventsPlugin = _angular_platformBrowser.__platform_browser_private__.KeyEventsPlugin;
    var /** @type {?} */ HammerGesturesPlugin = _angular_platformBrowser.__platform_browser_private__.HammerGesturesPlugin;
    var /** @type {?} */ DomAdapter = _angular_platformBrowser.__platform_browser_private__.DomAdapter;
    var /** @type {?} */ setRootDomAdapter = _angular_platformBrowser.__platform_browser_private__.setRootDomAdapter;
    var /** @type {?} */ WebAnimationsDriver = _angular_platformBrowser.__platform_browser_private__.WebAnimationsDriver;

    var /** @type {?} */ ON_WEB_WORKER = new _angular_core.InjectionToken('WebWorker.onWebWorker');

    /**
     * @param {?} token
     * @return {?}
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return "" + token.overriddenName;
        }
        if (token.name) {
            return "" + token.name;
        }
        var /** @type {?} */ res = token.toString();
        var /** @type {?} */ newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }

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
        RenderStore.prototype.serialize = function (obj) { return obj == null ? null : this._lookupByObject.get(obj); };
        return RenderStore;
    }());
    RenderStore.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    RenderStore.ctorParameters = function () { return []; };

    /**
     * Any type that does not need to be serialized (string, number, boolean)
     *
     * @experimental WebWorker support in Angular is currently experimental.
     * @deprecated in v4. Use SerializerTypes.PRIMITIVE instead
     */
    var /** @type {?} */ PRIMITIVE = 1 /* PRIMITIVE */;
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
            if (type === _angular_core.RenderComponentType) {
                return this._serializeRenderComponentType(obj);
            }
            if (type === 0 /* RENDERER_TYPE_V2 */) {
                return this._serializeRendererTypeV2(obj);
            }
            if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            throw new Error("No serializer for type " + stringify(type));
        };
        /**
         * @param {?} map
         * @param {?=} type
         * @param {?=} data
         * @return {?}
         */
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
            if (type === _angular_core.RenderComponentType) {
                return this._deserializeRenderComponentType(map);
            }
            if (type === 0 /* RENDERER_TYPE_V2 */) {
                return this._deserializeRendererTypeV2(map);
            }
            if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            throw new Error("No deserializer for type " + stringify(type));
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
        Serializer.prototype._serializeRendererTypeV2 = function (type) {
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
        Serializer.prototype._deserializeRendererTypeV2 = function (props) {
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
    /** @nocollapse */
    Serializer.ctorParameters = function () { return [
        { type: RenderStore, },
    ]; };
    var /** @type {?} */ ANIMATION_WORKER_PLAYER_PREFIX = 'AnimationPlayer.';

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
    /** @nocollapse */
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
    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Use by directives and components to emit custom Events.
     *
     * ### Examples
     *
     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
     * title gets clicked:
     *
     * ```
     * \@Component({
     *   selector: 'zippy',
     *   template: `
     *   <div class="zippy">
     *     <div (click)="toggle()">Toggle</div>
     *     <div [hidden]="!visible">
     *       <ng-content></ng-content>
     *     </div>
     *  </div>`})
     * export class Zippy {
     *   visible: boolean = true;
     *   \@Output() open: EventEmitter<any> = new EventEmitter();
     *   \@Output() close: EventEmitter<any> = new EventEmitter();
     *
     *   toggle() {
     *     this.visible = !this.visible;
     *     if (this.visible) {
     *       this.open.emit(null);
     *     } else {
     *       this.close.emit(null);
     *     }
     *   }
     * }
     * ```
     *
     * The events payload can be accessed by the parameter `$event` on the components output event
     * handler:
     *
     * ```
     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
     * ```
     *
     * Uses Rx.Observable but provides an adapter to make it work as specified here:
     * https://github.com/jhusain/observable-spec
     *
     * Once a reference implementation of the spec is available, switch to it.
     * \@stable
     */
    var EventEmitter = (function (_super) {
        __extends$1(EventEmitter, _super);
        /**
         * Creates an instance of [EventEmitter], which depending on [isAsync],
         * delivers events synchronously or asynchronously.
         * @param {?=} isAsync
         */
        function EventEmitter(isAsync) {
            if (isAsync === void 0) { isAsync = false; }
            var _this = _super.call(this) || this;
            _this.__isAsync = isAsync;
            return _this;
        }
        /**
         * @param {?=} value
         * @return {?}
         */
        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
        /**
         * @param {?=} generatorOrNext
         * @param {?=} error
         * @param {?=} complete
         * @return {?}
         */
        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
            var /** @type {?} */ schedulerFn;
            var /** @type {?} */ errorFn = function (err) { return null; };
            var /** @type {?} */ completeFn = function () { return null; };
            if (generatorOrNext && typeof generatorOrNext === 'object') {
                schedulerFn = this.__isAsync ? function (value) {
                    setTimeout(function () { return generatorOrNext.next(value); });
                } : function (value) { generatorOrNext.next(value); };
                if (generatorOrNext.error) {
                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                        function (err) { generatorOrNext.error(err); };
                }
                if (generatorOrNext.complete) {
                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                        function () { generatorOrNext.complete(); };
                }
            }
            else {
                schedulerFn = this.__isAsync ? function (value) { setTimeout(function () { return generatorOrNext(value); }); } :
                    function (value) { generatorOrNext(value); };
                if (error) {
                    errorFn =
                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
                }
                if (complete) {
                    completeFn =
                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
                }
            }
            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
        };
        return EventEmitter;
    }(rxjs_Subject.Subject));

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
            var /** @type {?} */ emitter = new EventEmitter(false);
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
    /** @nocollapse */
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
    var __extends$2 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
        __extends$2(ServiceMessageBrokerFactory_, _super);
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
    /** @nocollapse */
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
        __extends$2(ServiceMessageBroker_, _super);
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
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */ var /** @type {?} */ RENDERER_CHANNEL = 'ng-Renderer';
    var /** @type {?} */ EVENT_CHANNEL = 'ng-Events';
    var /** @type {?} */ RENDERER_V2_CHANNEL = 'v2.ng-Renderer';
    var /** @type {?} */ EVENT_V2_CHANNEL = 'v2.ng-Events';
    var /** @type {?} */ ROUTER_CHANNEL = 'ng-Router';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ MOUSE_EVENT_PROPERTIES = [
        'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
        'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
    ];
    var /** @type {?} */ KEYBOARD_EVENT_PROPERTIES = [
        'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
        'repeat', 'shiftKey', 'which'
    ];
    var /** @type {?} */ TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
    var /** @type {?} */ EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
    var /** @type {?} */ NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
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

    var MessageBasedRenderer = (function () {
        /**
         * @param {?} _brokerFactory
         * @param {?} _bus
         * @param {?} _serializer
         * @param {?} _renderStore
         * @param {?} _rootRenderer
         */
        function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rootRenderer = _rootRenderer;
        }
        /**
         * @return {?}
         */
        MessageBasedRenderer.prototype.start = function () {
            var _this = this;
            var /** @type {?} */ broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
            this._bus.initChannel(EVENT_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
            var _a = [
                _angular_core.RenderComponentType,
                2 /* RENDER_STORE_OBJECT */,
                1 /* PRIMITIVE */,
            ], RCT = _a[0], RSO = _a[1], P = _a[2];
            var /** @type {?} */ methods = [
                ['renderComponent', this._renderComponent, RCT, P],
                ['selectRootElement', this._selectRootElement, RSO, P, P],
                ['createElement', this._createElement, RSO, RSO, P, P],
                ['createViewRoot', this._createViewRoot, RSO, RSO, P],
                ['createTemplateAnchor', this._createTemplateAnchor, RSO, RSO, P],
                ['createText', this._createText, RSO, RSO, P, P],
                ['projectNodes', this._projectNodes, RSO, RSO, RSO],
                ['attachViewAfter', this._attachViewAfter, RSO, RSO, RSO],
                ['detachView', this._detachView, RSO, RSO],
                ['destroyView', this._destroyView, RSO, RSO, RSO],
                ['setElementProperty', this._setElementProperty, RSO, RSO, P, P],
                ['setElementAttribute', this._setElementAttribute, RSO, RSO, P, P],
                ['setBindingDebugInfo', this._setBindingDebugInfo, RSO, RSO, P, P],
                ['setElementClass', this._setElementClass, RSO, RSO, P, P],
                ['setElementStyle', this._setElementStyle, RSO, RSO, P, P],
                ['invokeElementMethod', this._invokeElementMethod, RSO, RSO, P, P],
                ['setText', this._setText, RSO, RSO, P],
                ['listen', this._listen, RSO, RSO, P, P],
                ['listenGlobal', this._listenGlobal, RSO, P, P, P],
                ['listenDone', this._listenDone, RSO, RSO],
                ['animate', this._animate, RSO, RSO, P, P, P, P, P, P, P],
            ];
            methods.forEach(function (_a) {
                var name = _a[0], method = _a[1], argTypes = _a.slice(2);
                broker.registerMethod(name, argTypes, method.bind(_this));
            });
            this._bindAnimationPlayerMethods(broker);
        };
        /**
         * @param {?} broker
         * @return {?}
         */
        MessageBasedRenderer.prototype._bindAnimationPlayerMethods = function (broker) {
            var _this = this;
            var _a = [1 /* PRIMITIVE */, 2 /* RENDER_STORE_OBJECT */], P = _a[0], RSO = _a[1];
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'play', [RSO, RSO], function (player, element) { return player.play(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'pause', [RSO, RSO], function (player, element) { return player.pause(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'init', [RSO, RSO], function (player, element) { return player.init(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'restart', [RSO, RSO], function (player, element) { return player.restart(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'destroy', [RSO, RSO], function (player, element) {
                player.destroy();
                _this._renderStore.remove(player);
            });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'finish', [RSO, RSO], function (player, element) { return player.finish(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'getPosition', [RSO, RSO], function (player, element) { return player.getPosition(); });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onStart', [RSO, RSO, P], function (player, element) {
                return _this._listenOnAnimationPlayer(player, element, 'onStart');
            });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onDone', [RSO, RSO, P], function (player, element) {
                return _this._listenOnAnimationPlayer(player, element, 'onDone');
            });
            broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'setPosition', [RSO, RSO, P], function (player, element, position) { return player.setPosition(position); });
        };
        /**
         * @param {?} renderComponentType
         * @param {?} rendererId
         * @return {?}
         */
        MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
            var /** @type {?} */ renderer = this._rootRenderer.renderComponent(renderComponentType);
            this._renderStore.store(renderer, rendererId);
        };
        /**
         * @param {?} renderer
         * @param {?} selector
         * @param {?} elId
         * @return {?}
         */
        MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
            this._renderStore.store(renderer.selectRootElement(selector, null), elId);
        };
        /**
         * @param {?} renderer
         * @param {?} parentElement
         * @param {?} name
         * @param {?} elId
         * @return {?}
         */
        MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
            this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
        };
        /**
         * @param {?} renderer
         * @param {?} hostElement
         * @param {?} elId
         * @return {?}
         */
        MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
            var /** @type {?} */ viewRoot = renderer.createViewRoot(hostElement);
            if (this._renderStore.serialize(hostElement) !== elId) {
                this._renderStore.store(viewRoot, elId);
            }
        };
        /**
         * @param {?} renderer
         * @param {?} parentElement
         * @param {?} elId
         * @return {?}
         */
        MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
            this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
        };
        /**
         * @param {?} renderer
         * @param {?} parentElement
         * @param {?} value
         * @param {?} elId
         * @return {?}
         */
        MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
            this._renderStore.store(renderer.createText(parentElement, value, null), elId);
        };
        /**
         * @param {?} renderer
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
            renderer.projectNodes(parentElement, nodes);
        };
        /**
         * @param {?} renderer
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
            renderer.attachViewAfter(node, viewRootNodes);
        };
        /**
         * @param {?} renderer
         * @param {?} viewRootNodes
         * @return {?}
         */
        MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
            renderer.detachView(viewRootNodes);
        };
        /**
         * @param {?} renderer
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
            renderer.destroyView(hostElement, viewAllNodes);
            for (var /** @type {?} */ i = 0; i < viewAllNodes.length; i++) {
                this._renderStore.remove(viewAllNodes[i]);
            }
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
            renderer.setElementProperty(renderElement, propertyName, propertyValue);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
            renderer.setElementAttribute(renderElement, attributeName, attributeValue);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
            renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
            renderer.setElementClass(renderElement, className, isAdd);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
            renderer.setElementStyle(renderElement, styleName, styleValue);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */
        MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
            renderer.invokeElementMethod(renderElement, methodName, args);
        };
        /**
         * @param {?} renderer
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
            renderer.setText(renderNode, text);
        };
        /**
         * @param {?} renderer
         * @param {?} renderElement
         * @param {?} eventName
         * @param {?} unlistenId
         * @return {?}
         */
        MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
            var _this = this;
            var /** @type {?} */ unregisterCallback = renderer.listen(renderElement, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event); });
            this._renderStore.store(unregisterCallback, unlistenId);
        };
        /**
         * @param {?} renderer
         * @param {?} eventTarget
         * @param {?} eventName
         * @param {?} unlistenId
         * @return {?}
         */
        MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
            var _this = this;
            var /** @type {?} */ unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event); });
            this._renderStore.store(unregisterCallback, unlistenId);
        };
        /**
         * @param {?} renderer
         * @param {?} unlistenCallback
         * @return {?}
         */
        MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
        /**
         * @param {?} renderer
         * @param {?} element
         * @param {?} startingStyles
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?} previousPlayers
         * @param {?} playerId
         * @return {?}
         */
        MessageBasedRenderer.prototype._animate = function (renderer, element, startingStyles, keyframes, duration, delay, easing, previousPlayers, playerId) {
            var _this = this;
            var /** @type {?} */ normalizedPreviousPlayers;
            if (previousPlayers && previousPlayers.length) {
                normalizedPreviousPlayers =
                    previousPlayers.map(function (playerId) { return _this._renderStore.deserialize(playerId); });
            }
            var /** @type {?} */ player = renderer.animate(element, startingStyles, keyframes, duration, delay, easing, normalizedPreviousPlayers);
            this._renderStore.store(player, playerId);
        };
        /**
         * @param {?} player
         * @param {?} element
         * @param {?} phaseName
         * @return {?}
         */
        MessageBasedRenderer.prototype._listenOnAnimationPlayer = function (player, element, phaseName) {
            var _this = this;
            var /** @type {?} */ onEventComplete = function () { _this._eventDispatcher.dispatchAnimationEvent(player, phaseName, element); };
            // there is no need to register a unlistener value here since the
            // internal player callbacks are removed when the player is destroyed
            if (phaseName == 'onDone') {
                player.onDone(function () { return onEventComplete(); });
            }
            else {
                player.onStart(function () { return onEventComplete(); });
            }
        };
        return MessageBasedRenderer;
    }());
    MessageBasedRenderer.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MessageBasedRenderer.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
        { type: _angular_core.RootRenderer, },
    ]; };
    var MessageBasedRendererV2 = (function () {
        /**
         * @param {?} _brokerFactory
         * @param {?} _bus
         * @param {?} _serializer
         * @param {?} _renderStore
         * @param {?} _rendererFactory
         */
        function MessageBasedRendererV2(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
            this._brokerFactory = _brokerFactory;
            this._bus = _bus;
            this._serializer = _serializer;
            this._renderStore = _renderStore;
            this._rendererFactory = _rendererFactory;
        }
        /**
         * @return {?}
         */
        MessageBasedRendererV2.prototype.start = function () {
            var _this = this;
            var /** @type {?} */ broker = this._brokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
            this._bus.initChannel(EVENT_V2_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_V2_CHANNEL), this._serializer);
            var _a = [
                2 /* RENDER_STORE_OBJECT */,
                1 /* PRIMITIVE */,
                0 /* RENDERER_TYPE_V2 */,
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
                ['setStyle', this.setStyle, RSO, RSO, P, P, P, P],
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
        MessageBasedRendererV2.prototype.destroy = function (r) { r.destroy(); };
        /**
         * @param {?} r
         * @param {?} node
         * @return {?}
         */
        MessageBasedRendererV2.prototype.destroyNode = function (r, node) {
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
        MessageBasedRendererV2.prototype.createRenderer = function (el, type, id) {
            this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
        };
        /**
         * @param {?} r
         * @param {?} name
         * @param {?} namespace
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.createElement = function (r, name, namespace, id) {
            this._renderStore.store(r.createElement(name, namespace), id);
        };
        /**
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.createComment = function (r, value, id) {
            this._renderStore.store(r.createComment(value), id);
        };
        /**
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.createText = function (r, value, id) {
            this._renderStore.store(r.createText(value), id);
        };
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
        MessageBasedRendererV2.prototype.appendChild = function (r, parent, child) { r.appendChild(parent, child); };
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @param {?} ref
         * @return {?}
         */
        MessageBasedRendererV2.prototype.insertBefore = function (r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        };
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
        MessageBasedRendererV2.prototype.removeChild = function (r, parent, child) { r.removeChild(parent, child); };
        /**
         * @param {?} r
         * @param {?} selector
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.selectRootElement = function (r, selector, id) {
            this._renderStore.store(r.selectRootElement(selector), id);
        };
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.parentNode = function (r, node, id) {
            this._renderStore.store(r.parentNode(node), id);
        };
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */
        MessageBasedRendererV2.prototype.nextSibling = function (r, node, id) {
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
        MessageBasedRendererV2.prototype.setAttribute = function (r, el, name, value, namespace) {
            r.setAttribute(el, name, value, namespace);
        };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} namespace
         * @return {?}
         */
        MessageBasedRendererV2.prototype.removeAttribute = function (r, el, name, namespace) {
            r.removeAttribute(el, name, namespace);
        };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        MessageBasedRendererV2.prototype.addClass = function (r, el, name) { r.addClass(el, name); };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        MessageBasedRendererV2.prototype.removeClass = function (r, el, name) { r.removeClass(el, name); };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */
        MessageBasedRendererV2.prototype.setStyle = function (r, el, style, value, hasVendorPrefix, hasImportant) {
            r.setStyle(el, style, value, hasVendorPrefix, hasImportant);
        };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */
        MessageBasedRendererV2.prototype.removeStyle = function (r, el, style, hasVendorPrefix) {
            r.removeStyle(el, style, hasVendorPrefix);
        };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        MessageBasedRendererV2.prototype.setProperty = function (r, el, name, value) {
            r.setProperty(el, name, value);
        };
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} value
         * @return {?}
         */
        MessageBasedRendererV2.prototype.setValue = function (r, node, value) { r.setValue(node, value); };
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} elName
         * @param {?} eventName
         * @param {?} unlistenId
         * @return {?}
         */
        MessageBasedRendererV2.prototype.listen = function (r, el, elName, eventName, unlistenId) {
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
        MessageBasedRendererV2.prototype.unlisten = function (r, unlisten) { unlisten(); };
        return MessageBasedRendererV2;
    }());
    MessageBasedRendererV2.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    MessageBasedRendererV2.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
        { type: _angular_core.RendererFactoryV2, },
    ]; };

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
    /** @nocollapse */
    WebWorkerInstance.ctorParameters = function () { return []; };
    /**
     * @experimental WebWorker support is currently experimental.
     */
    var /** @type {?} */ WORKER_SCRIPT = new _angular_core.InjectionToken('WebWorkerScript');
    /**
     * A multi-provider used to automatically call the `start()` method after the service is
     * created.
     *
     * TODO(vicb): create an interface for startable services to implement
     * @experimental WebWorker support is currently experimental.
     */
    var /** @type {?} */ WORKER_UI_STARTABLE_MESSAGING_SERVICE = new _angular_core.InjectionToken('WorkerRenderStartableMsgService');
    var /** @type {?} */ _WORKER_UI_PLATFORM_PROVIDERS = [
        { provide: _angular_core.NgZone, useFactory: createNgZone, deps: [] },
        MessageBasedRenderer,
        { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer, multi: true },
        BROWSER_SANITIZATION_PROVIDERS,
        { provide: _angular_core.ErrorHandler, useFactory: _exceptionHandler, deps: [] },
        { provide: _angular_platformBrowser.DOCUMENT, useFactory: _document, deps: [] },
        // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
        // #5298
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
        { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
        { provide: _angular_platformBrowser.HAMMER_GESTURE_CONFIG, useClass: _angular_platformBrowser.HammerGestureConfig },
        APP_ID_RANDOM_PROVIDER,
        { provide: DomRootRenderer, useClass: DomRootRenderer_ },
        { provide: _angular_core.RootRenderer, useExisting: DomRootRenderer },
        DomRendererFactoryV2,
        { provide: _angular_core.RendererFactoryV2, useExisting: DomRendererFactoryV2 },
        { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
        { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
        { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
        { provide: _angular_platformBrowser.AnimationDriver, useFactory: _resolveDefaultAnimationDriver, deps: [] },
        Serializer,
        { provide: ON_WEB_WORKER, useValue: false },
        RenderStore,
        DomSharedStylesHost,
        _angular_core.Testability,
        _angular_platformBrowser.EventManager,
        WebWorkerInstance,
        {
            provide: _angular_core.PLATFORM_INITIALIZER,
            useFactory: initWebWorkerRenderPlatform,
            multi: true,
            deps: [_angular_core.Injector]
        },
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
            BrowserDomAdapter.makeCurrent();
            BrowserGetTestability.init();
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
     * @experimental WebWorker support is currently experimental.
     */
    var /** @type {?} */ platformWorkerUi = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
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
     * @return {?}
     */
    function _resolveDefaultAnimationDriver() {
        return getDOM().supportsWebAnimation() ? new WebAnimationsDriver() : _angular_platformBrowser.AnimationDriver.NOOP;
    }

    /**
     * @stable
     */
    var /** @type {?} */ VERSION = new _angular_core.Version('4.0.0-beta.8-2ddd1c3');

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
            var /** @type {?} */ P = 1 /* PRIMITIVE */;
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
    /** @nocollapse */
    MessageBasedPlatformLocation.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: BrowserPlatformLocation, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };

    /**
     * A list of {@link Provider}s. To use the router in a Worker enabled application you must
     * include these providers when setting up the render thread.
     * @experimental
     */
    var /** @type {?} */ WORKER_UI_LOCATION_PROVIDERS = [
        MessageBasedPlatformLocation, BrowserPlatformLocation,
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
    var __extends$3 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var WebWorkerPlatformLocation = (function (_super) {
        __extends$3(WebWorkerPlatformLocation, _super);
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
            return _this;
        }
        /**
         * \@internal *
         * @return {?}
         */
        WebWorkerPlatformLocation.prototype.init = function () {
            var _this = this;
            var /** @type {?} */ args = new UiArguments('getLocation');
            return this._broker.runOnService(args, LocationType)
                .then(function (val) {
                _this._location = val;
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
            get: function () { return this._location ? this._location.pathname : null; },
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
            get: function () { return this._location ? this._location.search : null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
            /**
             * @return {?}
             */
            get: function () { return this._location ? this._location.hash : null; },
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
    /** @nocollapse */
    WebWorkerPlatformLocation.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
    ]; };

    /**
     * Those providers should be added when the router is used in a worker context in addition to the
     * {@link ROUTER_PROVIDERS} and after them.
     * @experimental
     */
    var /** @type {?} */ WORKER_APP_LOCATION_PROVIDERS = [
        { provide: _angular_common.PlatformLocation, useClass: WebWorkerPlatformLocation },
        {
            provide: _angular_core.APP_INITIALIZER,
            useFactory: appInitFnFactory,
            multi: true,
            deps: [_angular_common.PlatformLocation, _angular_core.NgZone],
        },
    ];
    /**
     * @param {?} platformLocation
     * @param {?} zone
     * @return {?}
     */
    function appInitFnFactory(platformLocation, zone) {
        return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
    }

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
    var WebWorkerRootRenderer = (function () {
        /**
         * @param {?} messageBrokerFactory
         * @param {?} bus
         * @param {?} _serializer
         * @param {?} renderStore
         */
        function WebWorkerRootRenderer(messageBrokerFactory, bus, _serializer, renderStore) {
            var _this = this;
            this._serializer = _serializer;
            this.renderStore = renderStore;
            this.globalEvents = new NamedEventEmitter();
            this._componentRenderers = new Map();
            this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_CHANNEL);
            bus.initChannel(EVENT_CHANNEL);
            var source = bus.from(EVENT_CHANNEL);
            source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
        }
        /**
         * @param {?} message
         * @return {?}
         */
        WebWorkerRootRenderer.prototype._dispatchEvent = function (message) {
            var /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
            var /** @type {?} */ playerData = message['animationPlayer'];
            if (playerData) {
                var /** @type {?} */ phaseName = message['phaseName'];
                var /** @type {?} */ player = this._serializer.deserialize(playerData, 2 /* RENDER_STORE_OBJECT */);
                element.animationPlayerEvents.dispatchEvent(player, phaseName);
            }
            else {
                var /** @type {?} */ eventName = message['eventName'];
                var /** @type {?} */ target = message['eventTarget'];
                var /** @type {?} */ event_1 = message['event'];
                if (target) {
                    this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event_1);
                }
                else {
                    element.events.dispatchEvent(eventName, event_1);
                }
            }
        };
        /**
         * @param {?} componentType
         * @return {?}
         */
        WebWorkerRootRenderer.prototype.renderComponent = function (componentType) {
            var /** @type {?} */ result = this._componentRenderers.get(componentType.id);
            if (!result) {
                result = new WebWorkerRenderer(this, componentType);
                this._componentRenderers.set(componentType.id, result);
                var /** @type {?} */ id = this.renderStore.allocateId();
                this.renderStore.store(result, id);
                this.runOnService('renderComponent', [
                    new FnArg(componentType, _angular_core.RenderComponentType),
                    new FnArg(result, 2 /* RENDER_STORE_OBJECT */),
                ]);
            }
            return result;
        };
        /**
         * @param {?} fnName
         * @param {?} fnArgs
         * @return {?}
         */
        WebWorkerRootRenderer.prototype.runOnService = function (fnName, fnArgs) {
            var /** @type {?} */ args = new UiArguments(fnName, fnArgs);
            this._messageBroker.runOnService(args, null);
        };
        /**
         * @return {?}
         */
        WebWorkerRootRenderer.prototype.allocateNode = function () {
            var /** @type {?} */ result = new WebWorkerRenderNode();
            var /** @type {?} */ id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            return result;
        };
        /**
         * @return {?}
         */
        WebWorkerRootRenderer.prototype.allocateId = function () { return this.renderStore.allocateId(); };
        /**
         * @param {?} nodes
         * @return {?}
         */
        WebWorkerRootRenderer.prototype.destroyNodes = function (nodes) {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                this.renderStore.remove(nodes[i]);
            }
        };
        return WebWorkerRootRenderer;
    }());
    WebWorkerRootRenderer.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    WebWorkerRootRenderer.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
    ]; };
    var WebWorkerRenderer = (function () {
        /**
         * @param {?} _rootRenderer
         * @param {?} _componentType
         */
        function WebWorkerRenderer(_rootRenderer, _componentType) {
            this._rootRenderer = _rootRenderer;
            this._componentType = _componentType;
        }
        /**
         * @param {?} fnName
         * @param {?} fnArgs
         * @return {?}
         */
        WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
            var /** @type {?} */ fnArgsWithRenderer = [new FnArg(this, 2 /* RENDER_STORE_OBJECT */)].concat(fnArgs);
            this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
        };
        /**
         * @param {?} selectorOrNode
         * @param {?=} debugInfo
         * @return {?}
         */
        WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var /** @type {?} */ node = this._rootRenderer.allocateNode();
            this._runOnService('selectRootElement', [
                new FnArg(selectorOrNode),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        /**
         * @param {?} parentElement
         * @param {?} name
         * @param {?=} debugInfo
         * @return {?}
         */
        WebWorkerRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
            var /** @type {?} */ node = this._rootRenderer.allocateNode();
            this._runOnService('createElement', [
                new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        /**
         * @param {?} hostElement
         * @return {?}
         */
        WebWorkerRenderer.prototype.createViewRoot = function (hostElement) {
            var /** @type {?} */ viewRoot = this._componentType.encapsulation === _angular_core.ViewEncapsulation.Native ?
                this._rootRenderer.allocateNode() :
                hostElement;
            this._runOnService('createViewRoot', [
                new FnArg(hostElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(viewRoot, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return viewRoot;
        };
        /**
         * @param {?} parentElement
         * @param {?=} debugInfo
         * @return {?}
         */
        WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
            var /** @type {?} */ node = this._rootRenderer.allocateNode();
            this._runOnService('createTemplateAnchor', [
                new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        /**
         * @param {?} parentElement
         * @param {?} value
         * @param {?=} debugInfo
         * @return {?}
         */
        WebWorkerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
            var /** @type {?} */ node = this._rootRenderer.allocateNode();
            this._runOnService('createText', [
                new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(value),
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return node;
        };
        /**
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
            this._runOnService('projectNodes', [
                new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(nodes, 2 /* RENDER_STORE_OBJECT */),
            ]);
        };
        /**
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
            this._runOnService('attachViewAfter', [
                new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(viewRootNodes, 2 /* RENDER_STORE_OBJECT */),
            ]);
        };
        /**
         * @param {?} viewRootNodes
         * @return {?}
         */
        WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
            this._runOnService('detachView', [new FnArg(viewRootNodes, 2 /* RENDER_STORE_OBJECT */)]);
        };
        /**
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
            this._runOnService('destroyView', [
                new FnArg(hostElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(viewAllNodes, 2 /* RENDER_STORE_OBJECT */),
            ]);
            this._rootRenderer.destroyNodes(viewAllNodes);
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        WebWorkerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
            this._runOnService('setElementProperty', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(propertyName),
                new FnArg(propertyValue),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        WebWorkerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
            this._runOnService('setElementAttribute', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(attributeName),
                new FnArg(attributeValue),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        WebWorkerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
            this._runOnService('setBindingDebugInfo', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(propertyName),
                new FnArg(propertyValue),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        WebWorkerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
            this._runOnService('setElementClass', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(className),
                new FnArg(isAdd),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        WebWorkerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
            this._runOnService('setElementStyle', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(styleName),
                new FnArg(styleValue),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?=} args
         * @return {?}
         */
        WebWorkerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
            this._runOnService('invokeElementMethod', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(methodName),
                new FnArg(args),
            ]);
        };
        /**
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        WebWorkerRenderer.prototype.setText = function (renderNode, text) {
            this._runOnService('setText', [
                new FnArg(renderNode, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(text),
            ]);
        };
        /**
         * @param {?} renderElement
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        WebWorkerRenderer.prototype.listen = function (renderElement, name, callback) {
            var _this = this;
            renderElement.events.listen(name, callback);
            var /** @type {?} */ unlistenCallbackId = this._rootRenderer.allocateId();
            this._runOnService('listen', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
                new FnArg(unlistenCallbackId),
            ]);
            return function () {
                renderElement.events.unlisten(name, callback);
                _this._runOnService('listenDone', [new FnArg(unlistenCallbackId)]);
            };
        };
        /**
         * @param {?} target
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        WebWorkerRenderer.prototype.listenGlobal = function (target, name, callback) {
            var _this = this;
            this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
            var /** @type {?} */ unlistenCallbackId = this._rootRenderer.allocateId();
            this._runOnService('listenGlobal', [
                new FnArg(target),
                new FnArg(name, null),
                new FnArg(unlistenCallbackId),
            ]);
            return function () {
                _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
                _this._runOnService('listenDone', [new FnArg(unlistenCallbackId)]);
            };
        };
        /**
         * @param {?} renderElement
         * @param {?} startingStyles
         * @param {?} keyframes
         * @param {?} duration
         * @param {?} delay
         * @param {?} easing
         * @param {?=} previousPlayers
         * @return {?}
         */
        WebWorkerRenderer.prototype.animate = function (renderElement, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
            var _this = this;
            if (previousPlayers === void 0) { previousPlayers = []; }
            var /** @type {?} */ playerId = this._rootRenderer.allocateId();
            var /** @type {?} */ previousPlayerIds = previousPlayers.map(function (player) { return _this._rootRenderer.renderStore.serialize(player); });
            this._runOnService('animate', [
                new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(startingStyles),
                new FnArg(keyframes),
                new FnArg(duration),
                new FnArg(delay),
                new FnArg(easing),
                new FnArg(previousPlayerIds),
                new FnArg(playerId),
            ]);
            var /** @type {?} */ player = new _AnimationWorkerRendererPlayer(this._rootRenderer, renderElement);
            this._rootRenderer.renderStore.store(player, playerId);
            return player;
        };
        return WebWorkerRenderer;
    }());
    /**
     * @param {?} target
     * @param {?} eventName
     * @return {?}
     */
    function eventNameWithTarget(target, eventName) {
        return target + ":" + eventName;
    }
    var WebWorkerRendererFactoryV2 = (function () {
        /**
         * @param {?} messageBrokerFactory
         * @param {?} bus
         * @param {?} _serializer
         * @param {?} renderStore
         */
        function WebWorkerRendererFactoryV2(messageBrokerFactory, bus, _serializer, renderStore) {
            var _this = this;
            this._serializer = _serializer;
            this.renderStore = renderStore;
            this.globalEvents = new NamedEventEmitter();
            this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
            bus.initChannel(EVENT_V2_CHANNEL);
            var source = bus.from(EVENT_V2_CHANNEL);
            source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
        }
        /**
         * @param {?} element
         * @param {?} type
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype.createRenderer = function (element, type) {
            var /** @type {?} */ renderer = new WebWorkerRendererV2(this);
            var /** @type {?} */ id = this.renderStore.allocateId();
            this.renderStore.store(renderer, id);
            this.callUI('createRenderer', [
                new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(type, 0 /* RENDERER_TYPE_V2 */),
                new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
            ]);
            return renderer;
        };
        /**
         * @param {?} fnName
         * @param {?} fnArgs
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype.callUI = function (fnName, fnArgs) {
            var /** @type {?} */ args = new UiArguments(fnName, fnArgs);
            this._messageBroker.runOnService(args, null);
        };
        /**
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype.allocateNode = function () {
            var /** @type {?} */ result = new WebWorkerRenderNode();
            var /** @type {?} */ id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            return result;
        };
        /**
         * @param {?} node
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype.freeNode = function (node) { this.renderStore.remove(node); };
        /**
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype.allocateId = function () { return this.renderStore.allocateId(); };
        /**
         * @param {?} message
         * @return {?}
         */
        WebWorkerRendererFactoryV2.prototype._dispatchEvent = function (message) {
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
        return WebWorkerRendererFactoryV2;
    }());
    WebWorkerRendererFactoryV2.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    WebWorkerRendererFactoryV2.ctorParameters = function () { return [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
    ]; };
    var WebWorkerRendererV2 = (function () {
        /**
         * @param {?} _rendererFactory
         */
        function WebWorkerRendererV2(_rendererFactory) {
            this._rendererFactory = _rendererFactory;
            this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
        }
        /**
         * @return {?}
         */
        WebWorkerRendererV2.prototype.destroy = function () { this.callUIWithRenderer('destroy'); };
        /**
         * @param {?} node
         * @return {?}
         */
        WebWorkerRendererV2.prototype.destroyNode = function (node) {
            this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            this._rendererFactory.freeNode(node);
        };
        /**
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */
        WebWorkerRendererV2.prototype.createElement = function (name, namespace) {
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
        WebWorkerRendererV2.prototype.createComment = function (value) {
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
        WebWorkerRendererV2.prototype.createText = function (value) {
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
        WebWorkerRendererV2.prototype.appendChild = function (parent, newChild) {
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
        WebWorkerRendererV2.prototype.insertBefore = function (parent, newChild, refChild) {
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
        WebWorkerRendererV2.prototype.removeChild = function (parent, oldChild) {
            this.callUIWithRenderer('removeChild', [
                new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
            ]);
        };
        /**
         * @param {?} selectorOrNode
         * @return {?}
         */
        WebWorkerRendererV2.prototype.selectRootElement = function (selectorOrNode) {
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
        WebWorkerRendererV2.prototype.parentNode = function (node) {
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
        WebWorkerRendererV2.prototype.nextSibling = function (node) {
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
        WebWorkerRendererV2.prototype.setAttribute = function (el, name, value, namespace) {
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
        WebWorkerRendererV2.prototype.removeAttribute = function (el, name, namespace) {
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
        WebWorkerRendererV2.prototype.addClass = function (el, name) {
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
        WebWorkerRendererV2.prototype.removeClass = function (el, name) {
            this.callUIWithRenderer('removeClass', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(name),
            ]);
        };
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */
        WebWorkerRendererV2.prototype.setStyle = function (el, style, value, hasVendorPrefix, hasImportant) {
            this.callUIWithRenderer('setStyle', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(style),
                new FnArg(value),
                new FnArg(hasVendorPrefix),
                new FnArg(hasImportant),
            ]);
        };
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */
        WebWorkerRendererV2.prototype.removeStyle = function (el, style, hasVendorPrefix) {
            this.callUIWithRenderer('removeStyle', [
                new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(style),
                new FnArg(hasVendorPrefix),
            ]);
        };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        WebWorkerRendererV2.prototype.setProperty = function (el, name, value) {
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
        WebWorkerRendererV2.prototype.setValue = function (node, value) {
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
        WebWorkerRendererV2.prototype.listen = function (target, eventName, listener) {
            var _this = this;
            var /** @type {?} */ unlistenId = this._rendererFactory.allocateId();
            var _a = typeof target === 'string' ?
                [null, target, target + ":" + eventName] :
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
        WebWorkerRendererV2.prototype.callUIWithRenderer = function (fnName, fnArgs) {
            if (fnArgs === void 0) { fnArgs = []; }
            // always pass the renderer as the first arg
            this._rendererFactory.callUI(fnName, [this.asFnArg].concat(fnArgs));
        };
        return WebWorkerRendererV2;
    }());
    var AnimationPlayerEmitter = (function () {
        function AnimationPlayerEmitter() {
        }
        /**
         * @param {?} player
         * @param {?} phaseName
         * @return {?}
         */
        AnimationPlayerEmitter.prototype._getListeners = function (player, phaseName) {
            if (!this._listeners) {
                this._listeners = new Map();
            }
            var /** @type {?} */ phaseMap = this._listeners.get(player);
            if (!phaseMap) {
                this._listeners.set(player, phaseMap = {});
            }
            var /** @type {?} */ phaseFns = phaseMap[phaseName];
            if (!phaseFns) {
                phaseFns = phaseMap[phaseName] = [];
            }
            return phaseFns;
        };
        /**
         * @param {?} player
         * @param {?} phaseName
         * @param {?} callback
         * @return {?}
         */
        AnimationPlayerEmitter.prototype.listen = function (player, phaseName, callback) {
            this._getListeners(player, phaseName).push(callback);
        };
        /**
         * @param {?} player
         * @return {?}
         */
        AnimationPlayerEmitter.prototype.unlisten = function (player) { this._listeners.delete(player); };
        /**
         * @param {?} player
         * @param {?} phaseName
         * @return {?}
         */
        AnimationPlayerEmitter.prototype.dispatchEvent = function (player, phaseName) {
            var /** @type {?} */ listeners = this._getListeners(player, phaseName);
            for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
                listeners[i]();
            }
        };
        return AnimationPlayerEmitter;
    }());
    var WebWorkerRenderNode = (function () {
        function WebWorkerRenderNode() {
            this.events = new NamedEventEmitter();
            this.animationPlayerEvents = new AnimationPlayerEmitter();
        }
        return WebWorkerRenderNode;
    }());
    var _AnimationWorkerRendererPlayer = (function () {
        /**
         * @param {?} _rootRenderer
         * @param {?} _renderElement
         */
        function _AnimationWorkerRendererPlayer(_rootRenderer, _renderElement) {
            this._rootRenderer = _rootRenderer;
            this._renderElement = _renderElement;
            this.parentPlayer = null;
            this._destroyed = false;
            this._started = false;
        }
        /**
         * @param {?} fnName
         * @param {?} fnArgs
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype._runOnService = function (fnName, fnArgs) {
            if (!this._destroyed) {
                var /** @type {?} */ fnArgsWithRenderer = [
                    new FnArg(this, 2 /* RENDER_STORE_OBJECT */),
                    new FnArg(this._renderElement, 2 /* RENDER_STORE_OBJECT */)
                ].concat(fnArgs);
                this._rootRenderer.runOnService(ANIMATION_WORKER_PLAYER_PREFIX + fnName, fnArgsWithRenderer);
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.onStart = function (fn) {
            this._renderElement.animationPlayerEvents.listen(this, 'onStart', fn);
            this._runOnService('onStart', []);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.onDone = function (fn) {
            this._renderElement.animationPlayerEvents.listen(this, 'onDone', fn);
            this._runOnService('onDone', []);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.onDestroy = function (fn) {
            this._renderElement.animationPlayerEvents.listen(this, 'onDestroy', fn);
            this._runOnService('onDestroy', []);
        };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.hasStarted = function () { return this._started; };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.init = function () { this._runOnService('init', []); };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.play = function () {
            this._started = true;
            this._runOnService('play', []);
        };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.pause = function () { this._runOnService('pause', []); };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.restart = function () { this._runOnService('restart', []); };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.finish = function () { this._runOnService('finish', []); };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._renderElement.animationPlayerEvents.unlisten(this);
                this._runOnService('destroy', []);
                this._rootRenderer.renderStore.remove(this);
                this._destroyed = true;
            }
        };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.reset = function () { this._runOnService('reset', []); };
        /**
         * @param {?} p
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.setPosition = function (p) { this._runOnService('setPosition', [new FnArg(p)]); };
        /**
         * @return {?}
         */
        _AnimationWorkerRendererPlayer.prototype.getPosition = function () { return 0; };
        return _AnimationWorkerRendererPlayer;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends$4 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * This adapter is required to log error messages.
     *
     * Note: other methods all throw as the DOM is not accessible directly in web worker context.
     */
    var WorkerDomAdapter = (function (_super) {
        __extends$4(WorkerDomAdapter, _super);
        function WorkerDomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        WorkerDomAdapter.makeCurrent = function () { setRootDomAdapter(new WorkerDomAdapter()); };
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
        WorkerDomAdapter.prototype.getUserAgent = function () { throw 'not implemented'; };
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
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        WorkerDomAdapter.prototype.setGlobalVar = function (name, value) { throw 'not implemented'; };
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
    }(DomAdapter));

    /**
     * @experimental
     */
    var /** @type {?} */ platformWorkerApp = _angular_core.createPlatformFactory(_angular_core.platformCore, 'workerApp');
    /**
     * @return {?}
     */
    function errorHandler() {
        return new _angular_core.ErrorHandler();
    }
    // TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
    var /** @type {?} */ _postMessage = {
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
                        BROWSER_SANITIZATION_PROVIDERS,
                        Serializer,
                        { provide: _angular_platformBrowser.DOCUMENT, useValue: null },
                        { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
                        { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
                        WebWorkerRootRenderer,
                        { provide: _angular_core.RootRenderer, useExisting: WebWorkerRootRenderer },
                        WebWorkerRendererFactoryV2,
                        { provide: _angular_core.RendererFactoryV2, useExisting: WebWorkerRendererFactoryV2 },
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
    /** @nocollapse */
    WorkerAppModule.ctorParameters = function () { return []; };

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

}));