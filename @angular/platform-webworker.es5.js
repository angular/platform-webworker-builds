var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license Angular v4.0.0-rc.2-207298c
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { ɵPLATFORM_WORKER_UI_ID, PlatformLocation, ɵPLATFORM_WORKER_APP_ID, CommonModule } from '@angular/common';
import { Injectable, InjectionToken, PLATFORM_ID, Injector, PLATFORM_INITIALIZER, Testability, RendererFactoryV2, ɵAPP_ID_RANDOM_PROVIDER, ErrorHandler, NgZone, platformCore, createPlatformFactory, isDevMode, RenderComponentType, Version, APP_INITIALIZER, ApplicationModule, NgModule } from '@angular/core';
import { EventManager, ɵDomSharedStylesHost, ɵSharedStylesHost, ɵDomRendererFactoryV2, HammerGestureConfig, HAMMER_GESTURE_CONFIG, ɵHammerGesturesPlugin, EVENT_MANAGER_PLUGINS, ɵKeyEventsPlugin, ɵDomEventsPlugin, DOCUMENT, ɵBROWSER_SANITIZATION_PROVIDERS, ɵBrowserGetTestability, ɵBrowserDomAdapter, ɵBrowserPlatformLocation, ɵsetRootDomAdapter, ɵDomAdapter } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable';

var /** @type {?} */ON_WEB_WORKER = new InjectionToken('WebWorker.onWebWorker');

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
        return '' + token.overriddenName;
    }
    if (token.name) {
        return '' + token.name;
    }
    var /** @type {?} */res = token.toString();
    var /** @type {?} */newLineIndex = res.indexOf('\n');
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

var MessageBus = function () {
    function MessageBus() {
        _classCallCheck(this, MessageBus);
    }

    _createClass(MessageBus, [{
        key: 'initChannel',

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
        value: function initChannel(channel, runInZone) {}
        /**
         * Assigns this bus to the given zone.
         * Any callbacks attached to channels where runInZone was set to true on initialization
         * will be executed in the given zone.
         * @abstract
         * @param {?} zone
         * @return {?}
         */

    }, {
        key: 'attachToZone',
        value: function attachToZone(zone) {}
        /**
         * Returns an {\@link EventEmitter} that emits every time a message
         * is received on the given channel.
         * @abstract
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'from',
        value: function from(channel) {}
        /**
         * Returns an {\@link EventEmitter} for the given channel
         * To publish methods to that channel just call next on the returned emitter
         * @abstract
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'to',
        value: function to(channel) {}
    }]);

    return MessageBus;
}();

var RenderStore = function () {
    function RenderStore() {
        _classCallCheck(this, RenderStore);

        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */


    _createClass(RenderStore, [{
        key: 'allocateId',
        value: function allocateId() {
            return this._nextIndex++;
        }
        /**
         * @param {?} obj
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'store',
        value: function store(obj, id) {
            if (id == null) return;
            this._lookupById.set(id, obj);
            this._lookupByObject.set(obj, id);
        }
        /**
         * @param {?} obj
         * @return {?}
         */

    }, {
        key: 'remove',
        value: function remove(obj) {
            var /** @type {?} */index = this._lookupByObject.get(obj);
            if (index != null) {
                this._lookupByObject.delete(obj);
                this._lookupById.delete(index);
            }
        }
        /**
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'deserialize',
        value: function deserialize(id) {
            return this._lookupById.has(id) ? this._lookupById.get(id) : null;
        }
        /**
         * @param {?} obj
         * @return {?}
         */

    }, {
        key: 'serialize',
        value: function serialize(obj) {
            return obj == null ? null : this._lookupByObject.get(obj);
        }
    }]);

    return RenderStore;
}();

RenderStore.decorators = [{ type: Injectable }];
/** @nocollapse */
RenderStore.ctorParameters = function () {
    return [];
};

/**
 * Any type that does not need to be serialized (string, number, boolean)
 *
 * @experimental WebWorker support in Angular is currently experimental.
 * @deprecated in v4. Use SerializerTypes.PRIMITIVE instead
 */
var /** @type {?} */PRIMITIVE = 1 /* PRIMITIVE */;

var LocationType =
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
    _classCallCheck(this, LocationType);

    this.href = href;
    this.protocol = protocol;
    this.host = host;
    this.hostname = hostname;
    this.port = port;
    this.pathname = pathname;
    this.search = search;
    this.hash = hash;
    this.origin = origin;
};

var Serializer = function () {
    /**
     * @param {?} _renderStore
     */
    function Serializer(_renderStore) {
        _classCallCheck(this, Serializer);

        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */


    _createClass(Serializer, [{
        key: 'serialize',
        value: function serialize(obj) /* PRIMITIVE */{
            var _this = this;

            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            if (obj == null || type === 1 /* PRIMITIVE */) {
                    return obj;
                }
            if (Array.isArray(obj)) {
                return obj.map(function (v) {
                    return _this.serialize(v, type);
                });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                    return this._renderStore.serialize(obj);
                }
            if (type === RenderComponentType) {
                return this._serializeRenderComponentType(obj);
            }
            if (type === 0 /* RENDERER_TYPE_V2 */) {
                    return this._serializeRendererTypeV2(obj);
                }
            if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            throw new Error('No serializer for type ' + stringify(type));
        }
        /**
         * @param {?} map
         * @param {?=} type
         * @param {?=} data
         * @return {?}
         */

    }, {
        key: 'deserialize',
        value: function deserialize(map) {
            var _this2 = this;

            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var /* PRIMITIVE */data = arguments[2];

            if (map == null || type === 1 /* PRIMITIVE */) {
                    return map;
                }
            if (Array.isArray(map)) {
                return map.map(function (val) {
                    return _this2.deserialize(val, type, data);
                });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                    return this._renderStore.deserialize(map);
                }
            if (type === RenderComponentType) {
                return this._deserializeRenderComponentType(map);
            }
            if (type === 0 /* RENDERER_TYPE_V2 */) {
                    return this._deserializeRendererTypeV2(map);
                }
            if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            throw new Error('No deserializer for type ' + stringify(type));
        }
        /**
         * @param {?} loc
         * @return {?}
         */

    }, {
        key: '_serializeLocation',
        value: function _serializeLocation(loc) {
            return {
                'href': loc.href,
                'protocol': loc.protocol,
                'host': loc.host,
                'hostname': loc.hostname,
                'port': loc.port,
                'pathname': loc.pathname,
                'search': loc.search,
                'hash': loc.hash,
                'origin': loc.origin
            };
        }
        /**
         * @param {?} loc
         * @return {?}
         */

    }, {
        key: '_deserializeLocation',
        value: function _deserializeLocation(loc) {
            return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
        }
        /**
         * @param {?} type
         * @return {?}
         */

    }, {
        key: '_serializeRenderComponentType',
        value: function _serializeRenderComponentType(type) {
            return {
                'id': type.id,
                'templateUrl': type.templateUrl,
                'slotCount': type.slotCount,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles)
            };
        }
        /**
         * @param {?} props
         * @return {?}
         */

    }, {
        key: '_deserializeRenderComponentType',
        value: function _deserializeRenderComponentType(props) {
            return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
        }
        /**
         * @param {?} type
         * @return {?}
         */

    }, {
        key: '_serializeRendererTypeV2',
        value: function _serializeRendererTypeV2(type) {
            return {
                'id': type.id,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles),
                'data': this.serialize(type.data)
            };
        }
        /**
         * @param {?} props
         * @return {?}
         */

    }, {
        key: '_deserializeRendererTypeV2',
        value: function _deserializeRendererTypeV2(props) {
            return {
                id: props['id'],
                encapsulation: props['encapsulation'],
                styles: this.deserialize(props['styles']),
                data: this.deserialize(props['data'])
            };
        }
    }]);

    return Serializer;
}();

Serializer.decorators = [{ type: Injectable }];
/** @nocollapse */
Serializer.ctorParameters = function () {
    return [{ type: RenderStore }];
};

/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */

var ClientMessageBrokerFactory = function () {
    function ClientMessageBrokerFactory() {
        _classCallCheck(this, ClientMessageBrokerFactory);
    }

    _createClass(ClientMessageBrokerFactory, [{
        key: 'createMessageBroker',

        /**
         * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
         * @abstract
         * @param {?} channel
         * @param {?=} runInZone
         * @return {?}
         */
        value: function createMessageBroker(channel, runInZone) {}
    }]);

    return ClientMessageBrokerFactory;
}();

var ClientMessageBrokerFactory_ = function (_ClientMessageBrokerF) {
    _inherits(ClientMessageBrokerFactory_, _ClientMessageBrokerF);

    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ClientMessageBrokerFactory_(_messageBus, _serializer) {
        _classCallCheck(this, ClientMessageBrokerFactory_);

        var _this3 = _possibleConstructorReturn(this, (ClientMessageBrokerFactory_.__proto__ || Object.getPrototypeOf(ClientMessageBrokerFactory_)).call(this));

        _this3._messageBus = _messageBus;
        _this3._serializer = _serializer;
        return _this3;
    }
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */


    _createClass(ClientMessageBrokerFactory_, [{
        key: 'createMessageBroker',
        value: function createMessageBroker(channel) {
            var runInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._messageBus.initChannel(channel, runInZone);
            return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
        }
    }]);

    return ClientMessageBrokerFactory_;
}(ClientMessageBrokerFactory);

ClientMessageBrokerFactory_.decorators = [{ type: Injectable }];
/** @nocollapse */
ClientMessageBrokerFactory_.ctorParameters = function () {
    return [{ type: MessageBus }, { type: Serializer }];
};
/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */

var ClientMessageBroker = function () {
    function ClientMessageBroker() {
        _classCallCheck(this, ClientMessageBroker);
    }

    _createClass(ClientMessageBroker, [{
        key: 'runOnService',

        /**
         * @abstract
         * @param {?} args
         * @param {?} returnType
         * @return {?}
         */
        value: function runOnService(args, returnType) {}
    }]);

    return ClientMessageBroker;
}();

var ClientMessageBroker_ = function (_ClientMessageBroker) {
    _inherits(ClientMessageBroker_, _ClientMessageBroker);

    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ClientMessageBroker_(messageBus, _serializer, channel) {
        _classCallCheck(this, ClientMessageBroker_);

        var _this4 = _possibleConstructorReturn(this, (ClientMessageBroker_.__proto__ || Object.getPrototypeOf(ClientMessageBroker_)).call(this));

        _this4.channel = channel;
        _this4._pending = new Map();
        _this4._sink = messageBus.to(channel);
        _this4._serializer = _serializer;
        var source = messageBus.from(channel);
        source.subscribe({ next: function next(message) {
                return _this4._handleMessage(message);
            } });
        return _this4;
    }
    /**
     * @param {?} name
     * @return {?}
     */


    _createClass(ClientMessageBroker_, [{
        key: '_generateMessageId',
        value: function _generateMessageId(name) {
            var /** @type {?} */time = stringify(new Date().getTime());
            var /** @type {?} */iteration = 0;
            var /** @type {?} */id = name + time + stringify(iteration);
            while (this._pending.has(id)) {
                id = '' + name + time + iteration;
                iteration++;
            }
            return id;
        }
        /**
         * @param {?} args
         * @param {?} returnType
         * @return {?}
         */

    }, {
        key: 'runOnService',
        value: function runOnService(args, returnType) {
            var _this5 = this;

            var /** @type {?} */fnArgs = [];
            if (args.args) {
                args.args.forEach(function (argument) {
                    if (argument.type != null) {
                        fnArgs.push(_this5._serializer.serialize(argument.value, argument.type));
                    } else {
                        fnArgs.push(argument.value);
                    }
                });
            }
            var /** @type {?} */promise = void 0;
            var /** @type {?} */id = null;
            if (returnType != null) {
                var /** @type {?} */completer = void 0;
                promise = new Promise(function (resolve, reject) {
                    completer = { resolve: resolve, reject: reject };
                });
                id = this._generateMessageId(args.method);
                this._pending.set(id, completer);
                promise.catch(function (err) {
                    if (console && console.error) {
                        // tslint:disable-next-line:no-console
                        console.error(err);
                    }
                    completer.reject(err);
                });
                promise = promise.then(function (v) {
                    return _this5._serializer ? _this5._serializer.deserialize(v, returnType) : v;
                });
            } else {
                promise = null;
            }
            var /** @type {?} */message = {
                'method': args.method,
                'args': fnArgs
            };
            if (id != null) {
                message['id'] = id;
            }
            this._sink.emit(message);
            return promise;
        }
        /**
         * @param {?} message
         * @return {?}
         */

    }, {
        key: '_handleMessage',
        value: function _handleMessage(message) {
            if (message.type === 'result' || message.type === 'error') {
                var /** @type {?} */id = message.id;
                if (this._pending.has(id)) {
                    if (message.type === 'result') {
                        this._pending.get(id).resolve(message.value);
                    } else {
                        this._pending.get(id).reject(message.value);
                    }
                    this._pending.delete(id);
                }
            }
        }
    }]);

    return ClientMessageBroker_;
}(ClientMessageBroker);
/**
 * \@experimental WebWorker support in Angular is experimental.
 */


var FnArg =
/**
 * @param {?} value
 * @param {?=} type
 */
function FnArg(value) /* PRIMITIVE */{
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, FnArg);

    this.value = value;
    this.type = type;
};
/**
 * \@experimental WebWorker support in Angular is experimental.
 */


var UiArguments =
/**
 * @param {?} method
 * @param {?=} args
 */
function UiArguments(method, args) {
    _classCallCheck(this, UiArguments);

    this.method = method;
    this.args = args;
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


var EventEmitter = function (_Subject) {
    _inherits(EventEmitter, _Subject);

    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     * @param {?=} isAsync
     */
    function EventEmitter() {
        var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, EventEmitter);

        var _this6 = _possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).call(this));

        _this6.__isAsync = isAsync;
        return _this6;
    }
    /**
     * @param {?=} value
     * @return {?}
     */


    _createClass(EventEmitter, [{
        key: 'emit',
        value: function emit(value) {
            _get(EventEmitter.prototype.__proto__ || Object.getPrototypeOf(EventEmitter.prototype), 'next', this).call(this, value);
        }
        /**
         * @param {?=} generatorOrNext
         * @param {?=} error
         * @param {?=} complete
         * @return {?}
         */

    }, {
        key: 'subscribe',
        value: function subscribe(generatorOrNext, error, complete) {
            var /** @type {?} */schedulerFn = void 0;
            var /** @type {?} */errorFn = function errorFn(err) {
                return null;
            };
            var /** @type {?} */completeFn = function completeFn() {
                return null;
            };
            if (generatorOrNext && (typeof generatorOrNext === 'undefined' ? 'undefined' : _typeof(generatorOrNext)) === 'object') {
                schedulerFn = this.__isAsync ? function (value) {
                    setTimeout(function () {
                        return generatorOrNext.next(value);
                    });
                } : function (value) {
                    generatorOrNext.next(value);
                };
                if (generatorOrNext.error) {
                    errorFn = this.__isAsync ? function (err) {
                        setTimeout(function () {
                            return generatorOrNext.error(err);
                        });
                    } : function (err) {
                        generatorOrNext.error(err);
                    };
                }
                if (generatorOrNext.complete) {
                    completeFn = this.__isAsync ? function () {
                        setTimeout(function () {
                            return generatorOrNext.complete();
                        });
                    } : function () {
                        generatorOrNext.complete();
                    };
                }
            } else {
                schedulerFn = this.__isAsync ? function (value) {
                    setTimeout(function () {
                        return generatorOrNext(value);
                    });
                } : function (value) {
                    generatorOrNext(value);
                };
                if (error) {
                    errorFn = this.__isAsync ? function (err) {
                        setTimeout(function () {
                            return error(err);
                        });
                    } : function (err) {
                        error(err);
                    };
                }
                if (complete) {
                    completeFn = this.__isAsync ? function () {
                        setTimeout(function () {
                            return complete();
                        });
                    } : function () {
                        complete();
                    };
                }
            }
            return _get(EventEmitter.prototype.__proto__ || Object.getPrototypeOf(EventEmitter.prototype), 'subscribe', this).call(this, schedulerFn, errorFn, completeFn);
        }
    }]);

    return EventEmitter;
}(Subject);

var PostMessageBusSink = function () {
    /**
     * @param {?} _postMessageTarget
     */
    function PostMessageBusSink(_postMessageTarget) {
        _classCallCheck(this, PostMessageBusSink);

        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */


    _createClass(PostMessageBusSink, [{
        key: 'attachToZone',
        value: function attachToZone(zone) {
            var _this7 = this;

            this._zone = zone;
            this._zone.runOutsideAngular(function () {
                _this7._zone.onStable.subscribe({ next: function next() {
                        _this7._handleOnEventDone();
                    } });
            });
        }
        /**
         * @param {?} channel
         * @param {?=} runInZone
         * @return {?}
         */

    }, {
        key: 'initChannel',
        value: function initChannel(channel) {
            var _this8 = this;

            var runInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + ' has already been initialized');
            }
            var /** @type {?} */emitter = new EventEmitter(false);
            var /** @type {?} */channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
            emitter.subscribe(function (data) {
                var /** @type {?} */message = { channel: channel, message: data };
                if (runInZone) {
                    _this8._messageBuffer.push(message);
                } else {
                    _this8._sendMessages([message]);
                }
            });
        }
        /**
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'to',
        value: function to(channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            } else {
                throw new Error(channel + ' is not set up. Did you forget to call initChannel?');
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_handleOnEventDone',
        value: function _handleOnEventDone() {
            if (this._messageBuffer.length > 0) {
                this._sendMessages(this._messageBuffer);
                this._messageBuffer = [];
            }
        }
        /**
         * @param {?} messages
         * @return {?}
         */

    }, {
        key: '_sendMessages',
        value: function _sendMessages(messages) {
            this._postMessageTarget.postMessage(messages);
        }
    }]);

    return PostMessageBusSink;
}();

var PostMessageBusSource = function () {
    /**
     * @param {?=} eventTarget
     */
    function PostMessageBusSource(eventTarget) {
        var _this9 = this;

        _classCallCheck(this, PostMessageBusSource);

        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', function (ev) {
                return _this9._handleMessages(ev);
            });
        } else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            var workerScope = self;
            workerScope.addEventListener('message', function (ev) {
                return _this9._handleMessages(ev);
            });
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */


    _createClass(PostMessageBusSource, [{
        key: 'attachToZone',
        value: function attachToZone(zone) {
            this._zone = zone;
        }
        /**
         * @param {?} channel
         * @param {?=} runInZone
         * @return {?}
         */

    }, {
        key: 'initChannel',
        value: function initChannel(channel) {
            var runInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + ' has already been initialized');
            }
            var /** @type {?} */emitter = new EventEmitter(false);
            var /** @type {?} */channelInfo = new _Channel(emitter, runInZone);
            this._channels[channel] = channelInfo;
        }
        /**
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'from',
        value: function from(channel) {
            if (this._channels.hasOwnProperty(channel)) {
                return this._channels[channel].emitter;
            } else {
                throw new Error(channel + ' is not set up. Did you forget to call initChannel?');
            }
        }
        /**
         * @param {?} ev
         * @return {?}
         */

    }, {
        key: '_handleMessages',
        value: function _handleMessages(ev) {
            var /** @type {?} */messages = ev.data;
            for (var /** @type {?} */i = 0; i < messages.length; i++) {
                this._handleMessage(messages[i]);
            }
        }
        /**
         * @param {?} data
         * @return {?}
         */

    }, {
        key: '_handleMessage',
        value: function _handleMessage(data) {
            var /** @type {?} */channel = data.channel;
            if (this._channels.hasOwnProperty(channel)) {
                var /** @type {?} */channelInfo = this._channels[channel];
                if (channelInfo.runInZone) {
                    this._zone.run(function () {
                        channelInfo.emitter.emit(data.message);
                    });
                } else {
                    channelInfo.emitter.emit(data.message);
                }
            }
        }
    }]);

    return PostMessageBusSource;
}();
/**
 * A TypeScript implementation of {\@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */


var PostMessageBus = function () {
    /**
     * @param {?} sink
     * @param {?} source
     */
    function PostMessageBus(sink, source) {
        _classCallCheck(this, PostMessageBus);

        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */


    _createClass(PostMessageBus, [{
        key: 'attachToZone',
        value: function attachToZone(zone) {
            this.source.attachToZone(zone);
            this.sink.attachToZone(zone);
        }
        /**
         * @param {?} channel
         * @param {?=} runInZone
         * @return {?}
         */

    }, {
        key: 'initChannel',
        value: function initChannel(channel) {
            var runInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.source.initChannel(channel, runInZone);
            this.sink.initChannel(channel, runInZone);
        }
        /**
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'from',
        value: function from(channel) {
            return this.source.from(channel);
        }
        /**
         * @param {?} channel
         * @return {?}
         */

    }, {
        key: 'to',
        value: function to(channel) {
            return this.sink.to(channel);
        }
    }]);

    return PostMessageBus;
}();

PostMessageBus.decorators = [{ type: Injectable }];
/** @nocollapse */
PostMessageBus.ctorParameters = function () {
    return [{ type: PostMessageBusSink }, { type: PostMessageBusSource }];
};
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */

var _Channel =
/**
 * @param {?} emitter
 * @param {?} runInZone
 */
function _Channel(emitter, runInZone) {
    _classCallCheck(this, _Channel);

    this.emitter = emitter;
    this.runInZone = runInZone;
};

/**
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */


var ServiceMessageBrokerFactory = function () {
    function ServiceMessageBrokerFactory() {
        _classCallCheck(this, ServiceMessageBrokerFactory);
    }

    _createClass(ServiceMessageBrokerFactory, [{
        key: 'createMessageBroker',

        /**
         * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
         * @abstract
         * @param {?} channel
         * @param {?=} runInZone
         * @return {?}
         */
        value: function createMessageBroker(channel, runInZone) {}
    }]);

    return ServiceMessageBrokerFactory;
}();

var ServiceMessageBrokerFactory_ = function (_ServiceMessageBroker) {
    _inherits(ServiceMessageBrokerFactory_, _ServiceMessageBroker);

    /**
     * @param {?} _messageBus
     * @param {?} _serializer
     */
    function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
        _classCallCheck(this, ServiceMessageBrokerFactory_);

        var _this10 = _possibleConstructorReturn(this, (ServiceMessageBrokerFactory_.__proto__ || Object.getPrototypeOf(ServiceMessageBrokerFactory_)).call(this));

        _this10._messageBus = _messageBus;
        _this10._serializer = _serializer;
        return _this10;
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */


    _createClass(ServiceMessageBrokerFactory_, [{
        key: 'createMessageBroker',
        value: function createMessageBroker(channel) {
            var runInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._messageBus.initChannel(channel, runInZone);
            return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
        }
    }]);

    return ServiceMessageBrokerFactory_;
}(ServiceMessageBrokerFactory);

ServiceMessageBrokerFactory_.decorators = [{ type: Injectable }];
/** @nocollapse */
ServiceMessageBrokerFactory_.ctorParameters = function () {
    return [{ type: MessageBus }, { type: Serializer }];
};
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */

var ServiceMessageBroker = function () {
    function ServiceMessageBroker() {
        _classCallCheck(this, ServiceMessageBroker);
    }

    _createClass(ServiceMessageBroker, [{
        key: 'registerMethod',

        /**
         * @abstract
         * @param {?} methodName
         * @param {?} signature
         * @param {?} method
         * @param {?=} returnType
         * @return {?}
         */
        value: function registerMethod(methodName, signature, method, returnType) {}
    }]);

    return ServiceMessageBroker;
}();

var ServiceMessageBroker_ = function (_ServiceMessageBroker2) {
    _inherits(ServiceMessageBroker_, _ServiceMessageBroker2);

    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    function ServiceMessageBroker_(messageBus, _serializer, channel) {
        _classCallCheck(this, ServiceMessageBroker_);

        var _this11 = _possibleConstructorReturn(this, (ServiceMessageBroker_.__proto__ || Object.getPrototypeOf(ServiceMessageBroker_)).call(this));

        _this11._serializer = _serializer;
        _this11.channel = channel;
        _this11._methods = new Map();
        _this11._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        source.subscribe({ next: function next(message) {
                return _this11._handleMessage(message);
            } });
        return _this11;
    }
    /**
     * @param {?} methodName
     * @param {?} signature
     * @param {?} method
     * @param {?=} returnType
     * @return {?}
     */


    _createClass(ServiceMessageBroker_, [{
        key: 'registerMethod',
        value: function registerMethod(methodName, signature, method, returnType) {
            var _this12 = this;

            this._methods.set(methodName, function (message) {
                var /** @type {?} */serializedArgs = message.args;
                var /** @type {?} */numArgs = signature ? signature.length : 0;
                var /** @type {?} */deserializedArgs = new Array(numArgs);
                for (var /** @type {?} */i = 0; i < numArgs; i++) {
                    var /** @type {?} */serializedArg = serializedArgs[i];
                    deserializedArgs[i] = _this12._serializer.deserialize(serializedArg, signature[i]);
                }
                var /** @type {?} */promise = method.apply(undefined, deserializedArgs);
                if (returnType && promise) {
                    _this12._wrapWebWorkerPromise(message.id, promise, returnType);
                }
            });
        }
        /**
         * @param {?} message
         * @return {?}
         */

    }, {
        key: '_handleMessage',
        value: function _handleMessage(message) {
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

    }, {
        key: '_wrapWebWorkerPromise',
        value: function _wrapWebWorkerPromise(id, promise, type) {
            var _this13 = this;

            promise.then(function (result) {
                _this13._sink.emit({
                    'type': 'result',
                    'value': _this13._serializer.serialize(result, type),
                    'id': id
                });
            });
        }
    }]);

    return ServiceMessageBroker_;
}(ServiceMessageBroker);

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
 */

var /** @type {?} */RENDERER_V2_CHANNEL = 'v2.ng-Renderer';
var /** @type {?} */EVENT_V2_CHANNEL = 'v2.ng-Events';
var /** @type {?} */ROUTER_CHANNEL = 'ng-Router';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */MOUSE_EVENT_PROPERTIES = ['altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX', 'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'];
var /** @type {?} */KEYBOARD_EVENT_PROPERTIES = ['altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey', 'repeat', 'shiftKey', 'which'];
var /** @type {?} */TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
var /** @type {?} */EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
var /** @type {?} */NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
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
    var /** @type {?} */serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
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
    var /** @type {?} */serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeTransitionEvent(e) {
    var /** @type {?} */serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @param {?} serializedEvent
 * @return {?}
 */
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
        var /** @type {?} */target = e.target;
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
    var /** @type {?} */serialized = {};
    for (var /** @type {?} */i = 0; i < properties.length; i++) {
        var /** @type {?} */prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}

var EventDispatcher = function () {
    /**
     * @param {?} _sink
     * @param {?} _serializer
     */
    function EventDispatcher(_sink, _serializer) {
        _classCallCheck(this, EventDispatcher);

        this._sink = _sink;
        this._serializer = _serializer;
    }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} element
     * @return {?}
     */


    _createClass(EventDispatcher, [{
        key: 'dispatchAnimationEvent',
        value: function dispatchAnimationEvent(player, phaseName, element) {
            this._sink.emit({
                'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
                'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
                'phaseName': phaseName
            });
            return true;
        }
        /**
         * @param {?} element
         * @param {?} eventTarget
         * @param {?} eventName
         * @param {?} event
         * @return {?}
         */

    }, {
        key: 'dispatchRenderEvent',
        value: function dispatchRenderEvent(element, eventTarget, eventName, event) {
            var /** @type {?} */serializedEvent = void 0;
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
                'event': serializedEvent
            });
            // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
            // should be canceled, but for now just call `preventDefault` on the original DOM event.
            return false;
        }
    }]);

    return EventDispatcher;
}();

var MessageBasedRendererV2 = function () {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rendererFactory
     */
    function MessageBasedRendererV2(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        _classCallCheck(this, MessageBasedRendererV2);

        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    /**
     * @return {?}
     */


    _createClass(MessageBasedRendererV2, [{
        key: 'start',
        value: function start() {
            var _this14 = this;

            var /** @type {?} */broker = this._brokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
            this._bus.initChannel(EVENT_V2_CHANNEL);
            this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_V2_CHANNEL), this._serializer);
            var RSO = 2 /* RENDER_STORE_OBJECT */
            ,
                P = 1 /* PRIMITIVE */
            ,
                CRT = 0 /* RENDERER_TYPE_V2 */
            ;

            var /** @type {?} */methods = [['createRenderer', this.createRenderer, RSO, CRT, P], ['createElement', this.createElement, RSO, P, P, P], ['createComment', this.createComment, RSO, P, P], ['createText', this.createText, RSO, P, P], ['appendChild', this.appendChild, RSO, RSO, RSO], ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO], ['removeChild', this.removeChild, RSO, RSO, RSO], ['selectRootElement', this.selectRootElement, RSO, P, P], ['parentNode', this.parentNode, RSO, RSO, P], ['nextSibling', this.nextSibling, RSO, RSO, P], ['setAttribute', this.setAttribute, RSO, RSO, P, P, P], ['removeAttribute', this.removeAttribute, RSO, RSO, P, P], ['addClass', this.addClass, RSO, RSO, P], ['removeClass', this.removeClass, RSO, RSO, P], ['setStyle', this.setStyle, RSO, RSO, P, P, P, P], ['removeStyle', this.removeStyle, RSO, RSO, P, P], ['setProperty', this.setProperty, RSO, RSO, P, P], ['setValue', this.setValue, RSO, RSO, P], ['listen', this.listen, RSO, RSO, P, P, P], ['unlisten', this.unlisten, RSO, RSO], ['destroy', this.destroy, RSO], ['destroyNode', this.destroyNode, RSO, P]];
            methods.forEach(function (_ref) {
                var _ref2 = _toArray(_ref),
                    name = _ref2[0],
                    method = _ref2[1],
                    argTypes = _ref2.slice(2);

                broker.registerMethod(name, argTypes, method.bind(_this14));
            });
        }
        /**
         * @param {?} r
         * @return {?}
         */

    }, {
        key: 'destroy',
        value: function destroy(r) {
            r.destroy();
        }
        /**
         * @param {?} r
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'destroyNode',
        value: function destroyNode(r, node) {
            if (r.destroyNode) {
                r.destroyNode(node);
            }
            this._renderStore.remove(node);
        }
        /**
         * @param {?} el
         * @param {?} type
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'createRenderer',
        value: function createRenderer(el, type, id) {
            this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
        }
        /**
         * @param {?} r
         * @param {?} name
         * @param {?} namespace
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'createElement',
        value: function createElement(r, name, namespace, id) {
            this._renderStore.store(r.createElement(name, namespace), id);
        }
        /**
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'createComment',
        value: function createComment(r, value, id) {
            this._renderStore.store(r.createComment(value), id);
        }
        /**
         * @param {?} r
         * @param {?} value
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'createText',
        value: function createText(r, value, id) {
            this._renderStore.store(r.createText(value), id);
        }
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */

    }, {
        key: 'appendChild',
        value: function appendChild(r, parent, child) {
            r.appendChild(parent, child);
        }
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @param {?} ref
         * @return {?}
         */

    }, {
        key: 'insertBefore',
        value: function insertBefore(r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        }
        /**
         * @param {?} r
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */

    }, {
        key: 'removeChild',
        value: function removeChild(r, parent, child) {
            r.removeChild(parent, child);
        }
        /**
         * @param {?} r
         * @param {?} selector
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'selectRootElement',
        value: function selectRootElement(r, selector, id) {
            this._renderStore.store(r.selectRootElement(selector), id);
        }
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'parentNode',
        value: function parentNode(r, node, id) {
            this._renderStore.store(r.parentNode(node), id);
        }
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} id
         * @return {?}
         */

    }, {
        key: 'nextSibling',
        value: function nextSibling(r, node, id) {
            this._renderStore.store(r.nextSibling(node), id);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @param {?} namespace
         * @return {?}
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(r, el, name, value, namespace) {
            r.setAttribute(el, name, value, namespace);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} namespace
         * @return {?}
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(r, el, name, namespace) {
            r.removeAttribute(el, name, namespace);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'addClass',
        value: function addClass(r, el, name) {
            r.addClass(el, name);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'removeClass',
        value: function removeClass(r, el, name) {
            r.removeClass(el, name);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */

    }, {
        key: 'setStyle',
        value: function setStyle(r, el, style, value, hasVendorPrefix, hasImportant) {
            r.setStyle(el, style, value, hasVendorPrefix, hasImportant);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */

    }, {
        key: 'removeStyle',
        value: function removeStyle(r, el, style, hasVendorPrefix) {
            r.removeStyle(el, style, hasVendorPrefix);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setProperty',
        value: function setProperty(r, el, name, value) {
            r.setProperty(el, name, value);
        }
        /**
         * @param {?} r
         * @param {?} node
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setValue',
        value: function setValue(r, node, value) {
            r.setValue(node, value);
        }
        /**
         * @param {?} r
         * @param {?} el
         * @param {?} elName
         * @param {?} eventName
         * @param {?} unlistenId
         * @return {?}
         */

    }, {
        key: 'listen',
        value: function listen(r, el, elName, eventName, unlistenId) {
            var _this15 = this;

            var /** @type {?} */listener = function listener(event) {
                return _this15._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
            };
            var /** @type {?} */unlisten = r.listen(el || elName, eventName, listener);
            this._renderStore.store(unlisten, unlistenId);
        }
        /**
         * @param {?} r
         * @param {?} unlisten
         * @return {?}
         */

    }, {
        key: 'unlisten',
        value: function unlisten(r, _unlisten) {
            _unlisten();
        }
    }]);

    return MessageBasedRendererV2;
}();

MessageBasedRendererV2.decorators = [{ type: Injectable }];
/** @nocollapse */
MessageBasedRendererV2.ctorParameters = function () {
    return [{ type: ServiceMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }, { type: RenderStore }, { type: RendererFactoryV2 }];
};

/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@experimental WebWorker support is currently experimental.
 */

var WebWorkerInstance = function () {
    function WebWorkerInstance() {
        _classCallCheck(this, WebWorkerInstance);
    }

    _createClass(WebWorkerInstance, [{
        key: 'init',

        /**
         * \@internal
         * @param {?} worker
         * @param {?} bus
         * @return {?}
         */
        value: function init(worker, bus) {
            this.worker = worker;
            this.bus = bus;
        }
    }]);

    return WebWorkerInstance;
}();

WebWorkerInstance.decorators = [{ type: Injectable }];
/** @nocollapse */
WebWorkerInstance.ctorParameters = function () {
    return [];
};
/**
 * @experimental WebWorker support is currently experimental.
 */
var /** @type {?} */WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @experimental WebWorker support is currently experimental.
 */
var /** @type {?} */WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
var /** @type {?} */_WORKER_UI_PLATFORM_PROVIDERS = [{ provide: NgZone, useFactory: createNgZone, deps: [] }, MessageBasedRendererV2, {
    provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE,
    useExisting: MessageBasedRendererV2,
    multi: true
}, ɵBROWSER_SANITIZATION_PROVIDERS, { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] }, { provide: DOCUMENT, useFactory: _document, deps: [] },
// TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
// #5298
{ provide: EVENT_MANAGER_PLUGINS, useClass: ɵDomEventsPlugin, multi: true }, { provide: EVENT_MANAGER_PLUGINS, useClass: ɵKeyEventsPlugin, multi: true }, { provide: EVENT_MANAGER_PLUGINS, useClass: ɵHammerGesturesPlugin, multi: true }, { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }, ɵAPP_ID_RANDOM_PROVIDER, ɵDomRendererFactoryV2, { provide: RendererFactoryV2, useExisting: ɵDomRendererFactoryV2 }, { provide: ɵSharedStylesHost, useExisting: ɵDomSharedStylesHost }, { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ }, { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ }, Serializer, { provide: ON_WEB_WORKER, useValue: false }, RenderStore, ɵDomSharedStylesHost, Testability, EventManager, WebWorkerInstance, {
    provide: PLATFORM_INITIALIZER,
    useFactory: initWebWorkerRenderPlatform,
    multi: true,
    deps: [Injector]
}, { provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_UI_ID }, { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] }];
/**
 * @param {?} injector
 * @return {?}
 */
function initializeGenericWorkerRenderer(injector) {
    var /** @type {?} */bus = injector.get(MessageBus);
    var /** @type {?} */zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var /** @type {?} */services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () {
        services.forEach(function (svc) {
            svc.start();
        });
    });
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
        var /** @type {?} */scriptUri = void 0;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        } catch (e) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        var /** @type {?} */instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @experimental WebWorker support is currently experimental.
 */
var /** @type {?} */platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
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
    var /** @type {?} */webWorker = new Worker(uri);
    var /** @type {?} */sink = new PostMessageBusSink(webWorker);
    var /** @type {?} */source = new PostMessageBusSource(webWorker);
    var /** @type {?} */bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}

/**
 * @stable
 */
var /** @type {?} */VERSION = new Version('4.0.0-rc.2-207298c');

var MessageBasedPlatformLocation = function () {
    /**
     * @param {?} _brokerFactory
     * @param {?} _platformLocation
     * @param {?} bus
     * @param {?} _serializer
     */
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        _classCallCheck(this, MessageBasedPlatformLocation);

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


    _createClass(MessageBasedPlatformLocation, [{
        key: 'start',
        value: function start() {
            var /** @type {?} */P = 1 /* PRIMITIVE */;
            this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
            this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
            this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
            this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
            this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
            this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_getLocation',
        value: function _getLocation() {
            return Promise.resolve(this._platformLocation.location);
        }
        /**
         * @param {?} e
         * @return {?}
         */

    }, {
        key: '_sendUrlChangeEvent',
        value: function _sendUrlChangeEvent(e) {
            this._channelSink.emit({
                'event': { 'type': e.type },
                'location': this._serializer.serialize(this._platformLocation.location, LocationType)
            });
        }
        /**
         * @param {?} pathname
         * @return {?}
         */

    }, {
        key: '_setPathname',
        value: function _setPathname(pathname) {
            this._platformLocation.pathname = pathname;
        }
    }]);

    return MessageBasedPlatformLocation;
}();

MessageBasedPlatformLocation.decorators = [{ type: Injectable }];
/** @nocollapse */
MessageBasedPlatformLocation.ctorParameters = function () {
    return [{ type: ServiceMessageBrokerFactory }, { type: ɵBrowserPlatformLocation }, { type: MessageBus }, { type: Serializer }];
};

/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @experimental
 */
var /** @type {?} */WORKER_UI_LOCATION_PROVIDERS = [MessageBasedPlatformLocation, ɵBrowserPlatformLocation, { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }];
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return function () {
        var /** @type {?} */zone = injector.get(NgZone);
        zone.runGuarded(function () {
            return injector.get(MessageBasedPlatformLocation).start();
        });
    };
}

var WebWorkerPlatformLocation = function (_PlatformLocation) {
    _inherits(WebWorkerPlatformLocation, _PlatformLocation);

    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        _classCallCheck(this, WebWorkerPlatformLocation);

        var _this16 = _possibleConstructorReturn(this, (WebWorkerPlatformLocation.__proto__ || Object.getPrototypeOf(WebWorkerPlatformLocation)).call(this));

        _this16._serializer = _serializer;
        _this16._popStateListeners = [];
        _this16._hashChangeListeners = [];
        _this16._location = null;
        _this16._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        _this16._channelSource = bus.from(ROUTER_CHANNEL);
        _this16._channelSource.subscribe({
            next: function next(msg) {
                var listeners = null;
                if (msg.hasOwnProperty('event')) {
                    var type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = _this16._popStateListeners;
                    } else if (type === 'hashchange') {
                        listeners = _this16._hashChangeListeners;
                    }
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
                        _this16._location = _this16._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach(function (fn) {
                            return fn(msg['event']);
                        });
                    }
                }
            }
        });
        return _this16;
    }
    /**
     * \@internal *
     * @return {?}
     */


    _createClass(WebWorkerPlatformLocation, [{
        key: 'init',
        value: function init() {
            var _this17 = this;

            var /** @type {?} */args = new UiArguments('getLocation');
            return this._broker.runOnService(args, LocationType).then(function (val) {
                _this17._location = val;
                return true;
            }, function (err) {
                throw new Error(err);
            });
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getBaseHrefFromDOM',
        value: function getBaseHrefFromDOM() {
            throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
        }
        /**
         * @param {?} fn
         * @return {?}
         */

    }, {
        key: 'onPopState',
        value: function onPopState(fn) {
            this._popStateListeners.push(fn);
        }
        /**
         * @param {?} fn
         * @return {?}
         */

    }, {
        key: 'onHashChange',
        value: function onHashChange(fn) {
            this._hashChangeListeners.push(fn);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'pushState',

        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        value: function pushState(state, title, url) {
            var /** @type {?} */fnArgs = [new FnArg(state, 1 /* PRIMITIVE */), new FnArg(title, 1 /* PRIMITIVE */), new FnArg(url, 1 /* PRIMITIVE */)];
            var /** @type {?} */args = new UiArguments('pushState', fnArgs);
            this._broker.runOnService(args, null);
        }
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */

    }, {
        key: 'replaceState',
        value: function replaceState(state, title, url) {
            var /** @type {?} */fnArgs = [new FnArg(state, 1 /* PRIMITIVE */), new FnArg(title, 1 /* PRIMITIVE */), new FnArg(url, 1 /* PRIMITIVE */)];
            var /** @type {?} */args = new UiArguments('replaceState', fnArgs);
            this._broker.runOnService(args, null);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'forward',
        value: function forward() {
            var /** @type {?} */args = new UiArguments('forward');
            this._broker.runOnService(args, null);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'back',
        value: function back() {
            var /** @type {?} */args = new UiArguments('back');
            this._broker.runOnService(args, null);
        }
    }, {
        key: 'pathname',
        get: function get() {
            return this._location ? this._location.pathname : null;
        }
        /**
         * @return {?}
         */
        ,

        /**
         * @param {?} newPath
         * @return {?}
         */
        set: function set(newPath) {
            if (this._location === null) {
                throw new Error('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var /** @type {?} */fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
            var /** @type {?} */args = new UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        }
    }, {
        key: 'search',
        get: function get() {
            return this._location ? this._location.search : null;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hash',
        get: function get() {
            return this._location ? this._location.hash : null;
        }
    }]);

    return WebWorkerPlatformLocation;
}(PlatformLocation);

WebWorkerPlatformLocation.decorators = [{ type: Injectable }];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = function () {
    return [{ type: ClientMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }];
};

/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 * @experimental
 */
var /** @type {?} */WORKER_APP_LOCATION_PROVIDERS = [{ provide: PlatformLocation, useClass: WebWorkerPlatformLocation }, {
    provide: APP_INITIALIZER,
    useFactory: appInitFnFactory,
    multi: true,
    deps: [PlatformLocation, NgZone]
}];
/**
 * @param {?} platformLocation
 * @param {?} zone
 * @return {?}
 */
function appInitFnFactory(platformLocation, zone) {
    return function () {
        return zone.runGuarded(function () {
            return platformLocation.init();
        });
    };
}

var NamedEventEmitter = function () {
    function NamedEventEmitter() {
        _classCallCheck(this, NamedEventEmitter);
    }

    _createClass(NamedEventEmitter, [{
        key: 'listen',

        /**
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        value: function listen(eventName, callback) {
            this._getListeners(eventName).push(callback);
        }
        /**
         * @param {?} eventName
         * @param {?} listener
         * @return {?}
         */

    }, {
        key: 'unlisten',
        value: function unlisten(eventName, listener) {
            var /** @type {?} */listeners = this._getListeners(eventName);
            var /** @type {?} */index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        /**
         * @param {?} eventName
         * @param {?} event
         * @return {?}
         */

    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(eventName, event) {
            var /** @type {?} */listeners = this._getListeners(eventName);
            for (var /** @type {?} */i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        }
        /**
         * @param {?} eventName
         * @return {?}
         */

    }, {
        key: '_getListeners',
        value: function _getListeners(eventName) {
            if (!this._listeners) {
                this._listeners = new Map();
            }
            var /** @type {?} */listeners = this._listeners.get(eventName);
            if (!listeners) {
                listeners = [];
                this._listeners.set(eventName, listeners);
            }
            return listeners;
        }
    }]);

    return NamedEventEmitter;
}();
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */


function eventNameWithTarget(target, eventName) {
    return target + ':' + eventName;
}

var WebWorkerRendererFactoryV2 = function () {
    /**
     * @param {?} messageBrokerFactory
     * @param {?} bus
     * @param {?} _serializer
     * @param {?} renderStore
     */
    function WebWorkerRendererFactoryV2(messageBrokerFactory, bus, _serializer, renderStore) {
        var _this18 = this;

        _classCallCheck(this, WebWorkerRendererFactoryV2);

        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
        bus.initChannel(EVENT_V2_CHANNEL);
        var source = bus.from(EVENT_V2_CHANNEL);
        source.subscribe({ next: function next(message) {
                return _this18._dispatchEvent(message);
            } });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */


    _createClass(WebWorkerRendererFactoryV2, [{
        key: 'createRenderer',
        value: function createRenderer(element, type) {
            var /** @type {?} */renderer = new WebWorkerRendererV2(this);
            var /** @type {?} */id = this.renderStore.allocateId();
            this.renderStore.store(renderer, id);
            this.callUI('createRenderer', [new FnArg(element, 2 /* RENDER_STORE_OBJECT */), new FnArg(type, 0 /* RENDERER_TYPE_V2 */), new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */)]);
            return renderer;
        }
        /**
         * @param {?} fnName
         * @param {?} fnArgs
         * @return {?}
         */

    }, {
        key: 'callUI',
        value: function callUI(fnName, fnArgs) {
            var /** @type {?} */args = new UiArguments(fnName, fnArgs);
            this._messageBroker.runOnService(args, null);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'allocateNode',
        value: function allocateNode() {
            var /** @type {?} */result = new WebWorkerRenderNode();
            var /** @type {?} */id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            return result;
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'freeNode',
        value: function freeNode(node) {
            this.renderStore.remove(node);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'allocateId',
        value: function allocateId() {
            return this.renderStore.allocateId();
        }
        /**
         * @param {?} message
         * @return {?}
         */

    }, {
        key: '_dispatchEvent',
        value: function _dispatchEvent(message) {
            var /** @type {?} */element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
            var /** @type {?} */eventName = message['eventName'];
            var /** @type {?} */target = message['eventTarget'];
            var /** @type {?} */event = message['event'];
            if (target) {
                this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
            } else {
                element.events.dispatchEvent(eventName, event);
            }
        }
    }]);

    return WebWorkerRendererFactoryV2;
}();

WebWorkerRendererFactoryV2.decorators = [{ type: Injectable }];
/** @nocollapse */
WebWorkerRendererFactoryV2.ctorParameters = function () {
    return [{ type: ClientMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }, { type: RenderStore }];
};

var WebWorkerRendererV2 = function () {
    /**
     * @param {?} _rendererFactory
     */
    function WebWorkerRendererV2(_rendererFactory) {
        _classCallCheck(this, WebWorkerRendererV2);

        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */


    _createClass(WebWorkerRendererV2, [{
        key: 'destroy',
        value: function destroy() {
            this.callUIWithRenderer('destroy');
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'destroyNode',
        value: function destroyNode(node) {
            this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            this._rendererFactory.freeNode(node);
        }
        /**
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'createElement',
        value: function createElement(name, namespace) {
            var /** @type {?} */node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createElement', [new FnArg(name), new FnArg(namespace), new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            return node;
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'createComment',
        value: function createComment(value) {
            var /** @type {?} */node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createComment', [new FnArg(value), new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            return node;
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'createText',
        value: function createText(value) {
            var /** @type {?} */node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('createText', [new FnArg(value), new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            return node;
        }
        /**
         * @param {?} parent
         * @param {?} newChild
         * @return {?}
         */

    }, {
        key: 'appendChild',
        value: function appendChild(parent, newChild) {
            this.callUIWithRenderer('appendChild', [new FnArg(parent, 2 /* RENDER_STORE_OBJECT */), new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */)]);
        }
        /**
         * @param {?} parent
         * @param {?} newChild
         * @param {?} refChild
         * @return {?}
         */

    }, {
        key: 'insertBefore',
        value: function insertBefore(parent, newChild, refChild) {
            if (!parent) {
                return;
            }
            this.callUIWithRenderer('insertBefore', [new FnArg(parent, 2 /* RENDER_STORE_OBJECT */), new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */), new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */)]);
        }
        /**
         * @param {?} parent
         * @param {?} oldChild
         * @return {?}
         */

    }, {
        key: 'removeChild',
        value: function removeChild(parent, oldChild) {
            this.callUIWithRenderer('removeChild', [new FnArg(parent, 2 /* RENDER_STORE_OBJECT */), new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */)]);
        }
        /**
         * @param {?} selectorOrNode
         * @return {?}
         */

    }, {
        key: 'selectRootElement',
        value: function selectRootElement(selectorOrNode) {
            var /** @type {?} */node = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('selectRootElement', [new FnArg(selectorOrNode), new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
            return node;
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'parentNode',
        value: function parentNode(node) {
            var /** @type {?} */res = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('parentNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */), new FnArg(res, 2 /* RENDER_STORE_OBJECT */)]);
            return res;
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'nextSibling',
        value: function nextSibling(node) {
            var /** @type {?} */res = this._rendererFactory.allocateNode();
            this.callUIWithRenderer('nextSibling', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */), new FnArg(res, 2 /* RENDER_STORE_OBJECT */)]);
            return res;
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(el, name, value, namespace) {
            this.callUIWithRenderer('setAttribute', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(name), new FnArg(value), new FnArg(namespace)]);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?=} namespace
         * @return {?}
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(el, name, namespace) {
            this.callUIWithRenderer('removeAttribute', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(name), new FnArg(namespace)]);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'addClass',
        value: function addClass(el, name) {
            this.callUIWithRenderer('addClass', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(name)]);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'removeClass',
        value: function removeClass(el, name) {
            this.callUIWithRenderer('removeClass', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(name)]);
        }
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} value
         * @param {?} hasVendorPrefix
         * @param {?} hasImportant
         * @return {?}
         */

    }, {
        key: 'setStyle',
        value: function setStyle(el, style, value, hasVendorPrefix, hasImportant) {
            this.callUIWithRenderer('setStyle', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(style), new FnArg(value), new FnArg(hasVendorPrefix), new FnArg(hasImportant)]);
        }
        /**
         * @param {?} el
         * @param {?} style
         * @param {?} hasVendorPrefix
         * @return {?}
         */

    }, {
        key: 'removeStyle',
        value: function removeStyle(el, style, hasVendorPrefix) {
            this.callUIWithRenderer('removeStyle', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(style), new FnArg(hasVendorPrefix)]);
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setProperty',
        value: function setProperty(el, name, value) {
            this.callUIWithRenderer('setProperty', [new FnArg(el, 2 /* RENDER_STORE_OBJECT */), new FnArg(name), new FnArg(value)]);
        }
        /**
         * @param {?} node
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setValue',
        value: function setValue(node, value) {
            this.callUIWithRenderer('setValue', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */), new FnArg(value)]);
        }
        /**
         * @param {?} target
         * @param {?} eventName
         * @param {?} listener
         * @return {?}
         */

    }, {
        key: 'listen',
        value: function listen(target, eventName, listener) {
            var _this19 = this;

            var /** @type {?} */unlistenId = this._rendererFactory.allocateId();

            var _ref3 = typeof target === 'string' ? [null, target, target + ':' + eventName] : [target, null, null],
                _ref4 = _slicedToArray(_ref3, 3),
                targetEl = _ref4[0],
                targetName = _ref4[1],
                fullName = _ref4[2];

            if (fullName) {
                this._rendererFactory.globalEvents.listen(fullName, listener);
            } else {
                targetEl.events.listen(eventName, listener);
            }
            this.callUIWithRenderer('listen', [new FnArg(targetEl, 2 /* RENDER_STORE_OBJECT */), new FnArg(targetName), new FnArg(eventName), new FnArg(unlistenId)]);
            return function () {
                if (fullName) {
                    _this19._rendererFactory.globalEvents.unlisten(fullName, listener);
                } else {
                    targetEl.events.unlisten(eventName, listener);
                }
                _this19.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
            };
        }
        /**
         * @param {?} fnName
         * @param {?=} fnArgs
         * @return {?}
         */

    }, {
        key: 'callUIWithRenderer',
        value: function callUIWithRenderer(fnName) {
            var fnArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            // always pass the renderer as the first arg
            this._rendererFactory.callUI(fnName, [this.asFnArg].concat(_toConsumableArray(fnArgs)));
        }
    }]);

    return WebWorkerRendererV2;
}();

var WebWorkerRenderNode = function WebWorkerRenderNode() {
    _classCallCheck(this, WebWorkerRenderNode);

    this.events = new NamedEventEmitter();
};

/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */


var WorkerDomAdapter = function (_DomAdapter) {
    _inherits(WorkerDomAdapter, _DomAdapter);

    function WorkerDomAdapter() {
        _classCallCheck(this, WorkerDomAdapter);

        return _possibleConstructorReturn(this, (WorkerDomAdapter.__proto__ || Object.getPrototypeOf(WorkerDomAdapter)).apply(this, arguments));
    }

    _createClass(WorkerDomAdapter, [{
        key: 'logError',

        /**
         * @param {?} error
         * @return {?}
         */
        value: function logError(error) {
            if (console.error) {
                console.error(error);
            } else {
                // tslint:disable-next-line:no-console
                console.log(error);
            }
        }
        /**
         * @param {?} error
         * @return {?}
         */

    }, {
        key: 'log',
        value: function log(error) {
            console.log(error);
        }
        /**
         * @param {?} error
         * @return {?}
         */

    }, {
        key: 'logGroup',
        value: function logGroup(error) {
            if (console.group) {
                console.group(error);
                this.logError(error);
            } else {
                // tslint:disable-next-line:no-console
                console.log(error);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'logGroupEnd',
        value: function logGroupEnd() {
            if (console.groupEnd) {
                console.groupEnd();
            }
        }
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'hasProperty',
        value: function hasProperty(element, name) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setProperty',
        value: function setProperty(el, name, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'getProperty',
        value: function getProperty(el, name) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */

    }, {
        key: 'invoke',
        value: function invoke(el, methodName, args) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'parse',

        /**
         * @param {?} templateHtml
         * @return {?}
         */
        value: function parse(templateHtml) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */

    }, {
        key: 'querySelector',
        value: function querySelector(el, selector) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */

    }, {
        key: 'querySelectorAll',
        value: function querySelectorAll(el, selector) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */

    }, {
        key: 'on',
        value: function on(el, evt, listener) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */

    }, {
        key: 'onAndCancel',
        value: function onAndCancel(el, evt, listener) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} evt
         * @return {?}
         */

    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(el, evt) {
            throw 'not implemented';
        }
        /**
         * @param {?} eventType
         * @return {?}
         */

    }, {
        key: 'createMouseEvent',
        value: function createMouseEvent(eventType) {
            throw 'not implemented';
        }
        /**
         * @param {?} eventType
         * @return {?}
         */

    }, {
        key: 'createEvent',
        value: function createEvent(eventType) {
            throw 'not implemented';
        }
        /**
         * @param {?} evt
         * @return {?}
         */

    }, {
        key: 'preventDefault',
        value: function preventDefault(evt) {
            throw 'not implemented';
        }
        /**
         * @param {?} evt
         * @return {?}
         */

    }, {
        key: 'isPrevented',
        value: function isPrevented(evt) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getInnerHTML',
        value: function getInnerHTML(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getTemplateContent',
        value: function getTemplateContent(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getOuterHTML',
        value: function getOuterHTML(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'nodeName',
        value: function nodeName(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'nodeValue',
        value: function nodeValue(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'type',
        value: function type(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'content',
        value: function content(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'firstChild',
        value: function firstChild(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'nextSibling',
        value: function nextSibling(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'parentElement',
        value: function parentElement(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'childNodes',
        value: function childNodes(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'childNodesAsList',
        value: function childNodesAsList(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'clearNodes',
        value: function clearNodes(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'appendChild',
        value: function appendChild(el, node) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'removeChild',
        value: function removeChild(el, node) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} newNode
         * @param {?} oldNode
         * @return {?}
         */

    }, {
        key: 'replaceChild',
        value: function replaceChild(el, newNode, oldNode) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'remove',
        value: function remove(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} parent
         * @param {?} el
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'insertBefore',
        value: function insertBefore(parent, el, node) {
            throw 'not implemented';
        }
        /**
         * @param {?} parent
         * @param {?} el
         * @param {?} nodes
         * @return {?}
         */

    }, {
        key: 'insertAllBefore',
        value: function insertAllBefore(parent, el, nodes) {
            throw 'not implemented';
        }
        /**
         * @param {?} parent
         * @param {?} el
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'insertAfter',
        value: function insertAfter(parent, el, node) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setInnerHTML',
        value: function setInnerHTML(el, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getText',
        value: function getText(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setText',
        value: function setText(el, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getValue',
        value: function getValue(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setValue',
        value: function setValue(el, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getChecked',
        value: function getChecked(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setChecked',
        value: function setChecked(el, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} text
         * @return {?}
         */

    }, {
        key: 'createComment',
        value: function createComment(text) {
            throw 'not implemented';
        }
        /**
         * @param {?} html
         * @return {?}
         */

    }, {
        key: 'createTemplate',
        value: function createTemplate(html) {
            throw 'not implemented';
        }
        /**
         * @param {?} tagName
         * @param {?=} doc
         * @return {?}
         */

    }, {
        key: 'createElement',
        value: function createElement(tagName, doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} ns
         * @param {?} tagName
         * @param {?=} doc
         * @return {?}
         */

    }, {
        key: 'createElementNS',
        value: function createElementNS(ns, tagName, doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} text
         * @param {?=} doc
         * @return {?}
         */

    }, {
        key: 'createTextNode',
        value: function createTextNode(text, doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} attrName
         * @param {?} attrValue
         * @param {?=} doc
         * @return {?}
         */

    }, {
        key: 'createScriptTag',
        value: function createScriptTag(attrName, attrValue, doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} css
         * @param {?=} doc
         * @return {?}
         */

    }, {
        key: 'createStyleElement',
        value: function createStyleElement(css, doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'createShadowRoot',
        value: function createShadowRoot(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getShadowRoot',
        value: function getShadowRoot(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getHost',
        value: function getHost(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getDistributedNodes',
        value: function getDistributedNodes(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'clone',
        value: function clone(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(element, name) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(element, name) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: 'classList',
        value: function classList(element) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */

    }, {
        key: 'addClass',
        value: function addClass(element, className) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */

    }, {
        key: 'removeClass',
        value: function removeClass(element, className) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */

    }, {
        key: 'hasClass',
        value: function hasClass(element, className) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */

    }, {
        key: 'setStyle',
        value: function setStyle(element, styleName, styleValue) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} styleName
         * @return {?}
         */

    }, {
        key: 'removeStyle',
        value: function removeStyle(element, styleName) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} styleName
         * @return {?}
         */

    }, {
        key: 'getStyle',
        value: function getStyle(element, styleName) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?=} styleValue
         * @return {?}
         */

    }, {
        key: 'hasStyle',
        value: function hasStyle(element, styleName, styleValue) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: 'tagName',
        value: function tagName(element) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: 'attributeMap',
        value: function attributeMap(element) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'hasAttribute',
        value: function hasAttribute(element, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'hasAttributeNS',
        value: function hasAttributeNS(element, ns, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'getAttribute',
        value: function getAttribute(element, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'getAttributeNS',
        value: function getAttributeNS(element, ns, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setAttribute',
        value: function setAttribute(element, name, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setAttributeNS',
        value: function setAttributeNS(element, ns, name, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'removeAttribute',
        value: function removeAttribute(element, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */

    }, {
        key: 'removeAttributeNS',
        value: function removeAttributeNS(element, ns, attribute) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'templateAwareRoot',
        value: function templateAwareRoot(el) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createHtmlDocument',
        value: function createHtmlDocument() {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} doc
         * @return {?}
         */

    }, {
        key: 'getTitle',
        value: function getTitle(doc) {
            throw 'not implemented';
        }
        /**
         * @param {?} doc
         * @param {?} newTitle
         * @return {?}
         */

    }, {
        key: 'setTitle',
        value: function setTitle(doc, newTitle) {
            throw 'not implemented';
        }
        /**
         * @param {?} n
         * @param {?} selector
         * @return {?}
         */

    }, {
        key: 'elementMatches',
        value: function elementMatches(n, selector) {
            throw 'not implemented';
        }
        /**
         * @param {?} el
         * @return {?}
         */

    }, {
        key: 'isTemplateElement',
        value: function isTemplateElement(el) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'isTextNode',
        value: function isTextNode(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'isCommentNode',
        value: function isCommentNode(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'isElementNode',
        value: function isElementNode(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'hasShadowRoot',
        value: function hasShadowRoot(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'isShadowRoot',
        value: function isShadowRoot(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'importIntoDoc',
        value: function importIntoDoc(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} node
         * @return {?}
         */

    }, {
        key: 'adoptNode',
        value: function adoptNode(node) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: 'getHref',
        value: function getHref(element) {
            throw 'not implemented';
        }
        /**
         * @param {?} event
         * @return {?}
         */

    }, {
        key: 'getEventKey',
        value: function getEventKey(event) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} baseUrl
         * @param {?} href
         * @return {?}
         */

    }, {
        key: 'resolveAndSetHref',
        value: function resolveAndSetHref(element, baseUrl, href) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'supportsDOMEvents',
        value: function supportsDOMEvents() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'supportsNativeShadowDOM',
        value: function supportsNativeShadowDOM() {
            throw 'not implemented';
        }
        /**
         * @param {?} doc
         * @param {?} target
         * @return {?}
         */

    }, {
        key: 'getGlobalEventTarget',
        value: function getGlobalEventTarget(doc, target) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getHistory',
        value: function getHistory() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getLocation',
        value: function getLocation() {
            throw 'not implemented';
        }
        /**
         * @param {?} doc
         * @return {?}
         */

    }, {
        key: 'getBaseHref',
        value: function getBaseHref(doc) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'resetBaseElement',
        value: function resetBaseElement() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getUserAgent',
        value: function getUserAgent() {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setData',
        value: function setData(element, name, value) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @return {?}
         */

    }, {
        key: 'getComputedStyle',
        value: function getComputedStyle(element) {
            throw 'not implemented';
        }
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'getData',
        value: function getData(element, name) {
            throw 'not implemented';
        }
        /**
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setGlobalVar',
        value: function setGlobalVar(name, value) {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'performanceNow',
        value: function performanceNow() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getAnimationPrefix',
        value: function getAnimationPrefix() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getTransitionEnd',
        value: function getTransitionEnd() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'supportsAnimation',
        value: function supportsAnimation() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'supportsWebAnimation',
        value: function supportsWebAnimation() {
            throw 'not implemented';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'supportsCookies',
        value: function supportsCookies() {
            return false;
        }
        /**
         * @param {?} name
         * @return {?}
         */

    }, {
        key: 'getCookie',
        value: function getCookie(name) {
            throw 'not implemented';
        }
        /**
         * @param {?} name
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'setCookie',
        value: function setCookie(name, value) {
            throw 'not implemented';
        }
    }, {
        key: 'attrToPropMap',
        get: function get() {
            throw 'not implemented';
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
            throw 'not implemented';
        }
    }], [{
        key: 'makeCurrent',

        /**
         * @return {?}
         */
        value: function makeCurrent() {
            ɵsetRootDomAdapter(new WorkerDomAdapter());
        }
    }]);

    return WorkerDomAdapter;
}(ɵDomAdapter);

/**
 * @experimental
 */


var /** @type {?} */platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var /** @type {?} */_postMessage = {
    postMessage: function (_postMessage2) {
        function postMessage(_x11, _x12) {
            return _postMessage2.apply(this, arguments);
        }

        postMessage.toString = function () {
            return _postMessage2.toString();
        };

        return postMessage;
    }(function (message, transferrables) {
        postMessage(message, transferrables);
    })
};
/**
 * @param {?} zone
 * @return {?}
 */
function createMessageBus(zone) {
    var /** @type {?} */sink = new PostMessageBusSink(_postMessage);
    var /** @type {?} */source = new PostMessageBusSource();
    var /** @type {?} */bus = new PostMessageBus(sink, source);
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

var WorkerAppModule = function WorkerAppModule() {
    _classCallCheck(this, WorkerAppModule);
};

WorkerAppModule.decorators = [{ type: NgModule, args: [{
        providers: [ɵBROWSER_SANITIZATION_PROVIDERS, Serializer, { provide: DOCUMENT, useValue: null }, { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ }, { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ }, WebWorkerRendererFactoryV2, { provide: RendererFactoryV2, useExisting: WebWorkerRendererFactoryV2 }, { provide: ON_WEB_WORKER, useValue: true }, RenderStore, { provide: ErrorHandler, useFactory: errorHandler, deps: [] }, { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] }, { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true }],
        exports: [CommonModule, ApplicationModule]
    }] }];
/** @nocollapse */
WorkerAppModule.ctorParameters = function () {
    return [];
};

/**
 * Bootstraps the worker ui.
 *
 * \@experimental
 * @param {?} workerScriptUri
 * @param {?=} customProviders
 * @return {?}
 */
function bootstrapWorkerUi(workerScriptUri) {
    var customProviders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    // For now, just creates the worker ui platform...
    var /** @type {?} */platform = platformWorkerUi([{ provide: WORKER_SCRIPT, useValue: workerScriptUri }].concat(_toConsumableArray(customProviders)));
    return Promise.resolve(platform);
}

export { VERSION, ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments, MessageBus, PRIMITIVE, ServiceMessageBroker, ServiceMessageBrokerFactory, WORKER_UI_LOCATION_PROVIDERS, WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule, platformWorkerApp, platformWorkerUi, bootstrapWorkerUi, ON_WEB_WORKER as ɵj, ClientMessageBrokerFactory_ as ɵa, RenderStore as ɵh, Serializer as ɵb, ServiceMessageBrokerFactory_ as ɵc, WebWorkerRendererFactoryV2 as ɵi, createMessageBus as ɵe, errorHandler as ɵd, setupWebWorker as ɵf, _WORKER_UI_PLATFORM_PROVIDERS as ɵg };
