/**
 * @license Angular v10.1.0-next.0+49.sha-b358495
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@angular/platform-webworker', ['exports', '@angular/common', '@angular/core', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.platformWebworker = {}), global.ng.common, global.ng.core, global.ng.platformBrowser));
}(this, (function (exports, i2, i0, platformBrowser) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ON_WEB_WORKER = new i0.InjectionToken('WebWorker.onWebWorker');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
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
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var MessageBus = /** @class */ (function () {
        function MessageBus() {
        }
        return MessageBus;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
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
        RenderStore.prototype.allocateId = function () {
            return this._nextIndex++;
        };
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
        return RenderStore;
    }());
    RenderStore.ɵfac = function RenderStore_Factory(t) { return new (t || RenderStore)(); };
    RenderStore.ɵprov = i0.ɵɵdefineInjectable({ token: RenderStore, factory: RenderStore.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RenderStore, [{
                type: i0.Injectable
            }], null, null);
    })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
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
        Serializer.prototype.serialize = function (obj, type /* PRIMITIVE */) {
            var _this = this;
            if (type === void 0) { type = 1; }
            if (obj == null || type === 1 /* PRIMITIVE */) {
                return obj;
            }
            if (Array.isArray(obj)) {
                return obj.map(function (v) { return _this.serialize(v, type); });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                return this._renderStore.serialize(obj);
            }
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._serializeRendererType2(obj);
            }
            if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            throw new Error("No serializer for type " + i0.ɵstringify(type));
        };
        Serializer.prototype.deserialize = function (map, type /* PRIMITIVE */, data) {
            var _this = this;
            if (type === void 0) { type = 1; }
            if (map == null || type === 1 /* PRIMITIVE */) {
                return map;
            }
            if (Array.isArray(map)) {
                return map.map(function (val) { return _this.deserialize(val, type, data); });
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                return this._renderStore.deserialize(map);
            }
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._deserializeRendererType2(map);
            }
            if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            throw new Error("No deserializer for type " + i0.ɵstringify(type));
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
        return Serializer;
    }());
    Serializer.ɵfac = function Serializer_Factory(t) { return new (t || Serializer)(i0.ɵɵinject(RenderStore)); };
    Serializer.ɵprov = i0.ɵɵdefineInjectable({ token: Serializer, factory: Serializer.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Serializer, [{
                type: i0.Injectable
            }], function () { return [{ type: RenderStore }]; }, null);
    })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
        return ClientMessageBrokerFactory;
    }());
    ClientMessageBrokerFactory.ɵfac = function ClientMessageBrokerFactory_Factory(t) { return new (t || ClientMessageBrokerFactory)(i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer)); };
    ClientMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ClientMessageBrokerFactory, factory: ClientMessageBrokerFactory.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ClientMessageBrokerFactory, [{
                type: i0.Injectable
            }], function () { return [{ type: MessageBus }, { type: Serializer }]; }, null);
    })();
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
            var time = i0.ɵstringify(new Date().getTime());
            var iteration = 0;
            var id = name + time + i0.ɵstringify(iteration);
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
                promise = new Promise(function (resolve, reject) {
                    completer_1 = { resolve: resolve, reject: reject };
                });
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
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var FnArg = /** @class */ (function () {
        function FnArg(value, type /* PRIMITIVE */) {
            if (type === void 0) { type = 1; }
            this.value = value;
            this.type = type;
        }
        return FnArg;
    }());
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
     * Copyright Google LLC All Rights Reserved.
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
            this._zone.runOutsideAngular(function () {
                _this._zone.onStable.subscribe({
                    next: function () {
                        _this._handleOnEventDone();
                    }
                });
            });
        };
        PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
            var _this = this;
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new i0.EventEmitter(false);
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
        PostMessageBusSink.prototype._sendMessages = function (messages) {
            this._postMessageTarget.postMessage(messages);
        };
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
        PostMessageBusSource.prototype.attachToZone = function (zone) {
            this._zone = zone;
        };
        PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
            if (runInZone === void 0) { runInZone = true; }
            if (this._channels.hasOwnProperty(channel)) {
                throw new Error(channel + " has already been initialized");
            }
            var emitter = new i0.EventEmitter(false);
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
                    this._zone.run(function () {
                        channelInfo_1.emitter.emit(data.message);
                    });
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
        PostMessageBus.prototype.from = function (channel) {
            return this.source.from(channel);
        };
        PostMessageBus.prototype.to = function (channel) {
            return this.sink.to(channel);
        };
        return PostMessageBus;
    }());
    PostMessageBus.ɵfac = function PostMessageBus_Factory(t) { return new (t || PostMessageBus)(i0.ɵɵinject(PostMessageBusSink), i0.ɵɵinject(PostMessageBusSource)); };
    PostMessageBus.ɵprov = i0.ɵɵdefineInjectable({ token: PostMessageBus, factory: PostMessageBus.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PostMessageBus, [{
                type: i0.Injectable
            }], function () { return [{ type: PostMessageBusSink }, { type: PostMessageBusSource }]; }, null);
    })();
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
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
        return ServiceMessageBrokerFactory;
    }());
    ServiceMessageBrokerFactory.ɵfac = function ServiceMessageBrokerFactory_Factory(t) { return new (t || ServiceMessageBrokerFactory)(i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer)); };
    ServiceMessageBrokerFactory.ɵprov = i0.ɵɵdefineInjectable({ token: ServiceMessageBrokerFactory, factory: ServiceMessageBrokerFactory.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ServiceMessageBrokerFactory, [{
                type: i0.Injectable
            }], function () { return [{ type: MessageBus }, { type: Serializer }]; }, null);
    })();
    /**
     * Helper class for UIComponents that allows components to register methods.
     * If a registered method message is received from the broker on the worker,
     * the UIMessageBroker deserializes its arguments and calls the registered method.
     * If that method returns a promise, the UIMessageBroker returns the result to the worker.
     *
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
                var deserializedArgs = [];
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
     * Copyright Google LLC All Rights Reserved.
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
     * Copyright Google LLC All Rights Reserved.
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
                ['createComment', this.createComment, RSO, P, P],
                ['createText', this.createText, RSO, P, P],
                ['appendChild', this.appendChild, RSO, RSO, RSO],
                ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
                ['removeChild', this.removeChild, RSO, RSO, RSO],
                ['selectRootElement', this.selectRootElement, RSO, P, P],
                ['parentNode', this.parentNode, RSO, RSO, P],
                ['nextSibling', this.nextSibling, RSO, RSO, P],
                ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
                ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
                ['addClass', this.addClass, RSO, RSO, P],
                ['removeClass', this.removeClass, RSO, RSO, P],
                ['setStyle', this.setStyle, RSO, RSO, P, P, P],
                ['removeStyle', this.removeStyle, RSO, RSO, P, P],
                ['setProperty', this.setProperty, RSO, RSO, P, P],
                ['setValue', this.setValue, RSO, RSO, P],
                ['listen', this.listen, RSO, RSO, P, P, P],
                ['unlisten', this.unlisten, RSO, RSO],
                ['destroy', this.destroy, RSO],
                ['destroyNode', this.destroyNode, RSO, P]
            ];
            methods.forEach(function (_a) {
                var _b = __read(_a), name = _b[0], method = _b[1], argTypes = _b.slice(2);
                broker.registerMethod(name, argTypes, method.bind(_this));
            });
        };
        MessageBasedRenderer2.prototype.destroy = function (r) {
            r.destroy();
        };
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
        MessageBasedRenderer2.prototype.appendChild = function (r, parent, child) {
            r.appendChild(parent, child);
        };
        MessageBasedRenderer2.prototype.insertBefore = function (r, parent, child, ref) {
            r.insertBefore(parent, child, ref);
        };
        MessageBasedRenderer2.prototype.removeChild = function (r, parent, child) {
            r.removeChild(parent, child);
        };
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
        MessageBasedRenderer2.prototype.addClass = function (r, el, name) {
            r.addClass(el, name);
        };
        MessageBasedRenderer2.prototype.removeClass = function (r, el, name) {
            r.removeClass(el, name);
        };
        MessageBasedRenderer2.prototype.setStyle = function (r, el, style, value, flags) {
            r.setStyle(el, style, value, flags);
        };
        MessageBasedRenderer2.prototype.removeStyle = function (r, el, style, flags) {
            r.removeStyle(el, style, flags);
        };
        MessageBasedRenderer2.prototype.setProperty = function (r, el, name, value) {
            r.setProperty(el, name, value);
        };
        MessageBasedRenderer2.prototype.setValue = function (r, node, value) {
            r.setValue(node, value);
        };
        MessageBasedRenderer2.prototype.listen = function (r, el, elName, eventName, unlistenId) {
            var _this = this;
            var listener = function (event) {
                return _this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
            };
            var unlisten = r.listen(el || elName, eventName, listener);
            this._renderStore.store(unlisten, unlistenId);
        };
        MessageBasedRenderer2.prototype.unlisten = function (r, unlisten) {
            unlisten();
        };
        return MessageBasedRenderer2;
    }());
    MessageBasedRenderer2.ɵfac = function MessageBasedRenderer2_Factory(t) { return new (t || MessageBasedRenderer2)(i0.ɵɵinject(ServiceMessageBrokerFactory), i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer), i0.ɵɵinject(RenderStore), i0.ɵɵinject(i0.RendererFactory2)); };
    MessageBasedRenderer2.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedRenderer2, factory: MessageBasedRenderer2.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MessageBasedRenderer2, [{
                type: i0.Injectable
            }], function () { return [{ type: ServiceMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }, { type: RenderStore }, { type: i0.RendererFactory2 }]; }, null);
    })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Wrapper class that exposes the Worker
     * and underlying {@link MessageBus} for lower level message passing.
     *
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WebWorkerInstance = /** @class */ (function () {
        function WebWorkerInstance() {
        }
        /** @internal */
        WebWorkerInstance.prototype.init = function (worker, bus) {
            this.worker = worker;
            this.bus = bus;
        };
        return WebWorkerInstance;
    }());
    WebWorkerInstance.ɵfac = function WebWorkerInstance_Factory(t) { return new (t || WebWorkerInstance)(); };
    WebWorkerInstance.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerInstance, factory: WebWorkerInstance.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(WebWorkerInstance, [{
                type: i0.Injectable
            }], null, null);
    })();
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WORKER_SCRIPT = new i0.InjectionToken('WebWorkerScript');
    /**
     * A multi-provider used to automatically call the `start()` method after the service is
     * created.
     *
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WORKER_UI_STARTABLE_MESSAGING_SERVICE = new i0.InjectionToken('WorkerRenderStartableMsgService');
    var _WORKER_UI_PLATFORM_PROVIDERS = [
        { provide: i0.NgZone, useFactory: createNgZone, deps: [] },
        {
            provide: MessageBasedRenderer2,
            deps: [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, i0.RendererFactory2]
        },
        { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
        platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
        { provide: i0.ErrorHandler, useFactory: _exceptionHandler, deps: [] },
        { provide: i2.DOCUMENT, useFactory: _document, deps: [] },
        // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
        // #5298
        {
            provide: platformBrowser.EVENT_MANAGER_PLUGINS,
            useClass: platformBrowser.ɵDomEventsPlugin,
            deps: [i2.DOCUMENT, i0.NgZone],
            multi: true
        },
        { provide: platformBrowser.EVENT_MANAGER_PLUGINS, useClass: platformBrowser.ɵKeyEventsPlugin, deps: [i2.DOCUMENT], multi: true },
        {
            provide: platformBrowser.EVENT_MANAGER_PLUGINS,
            useClass: platformBrowser.ɵHammerGesturesPlugin,
            deps: [i2.DOCUMENT, platformBrowser.HAMMER_GESTURE_CONFIG],
            multi: true
        },
        { provide: platformBrowser.HAMMER_GESTURE_CONFIG, useClass: platformBrowser.HammerGestureConfig, deps: [] },
        i0.ɵAPP_ID_RANDOM_PROVIDER,
        { provide: platformBrowser.ɵDomRendererFactory2, deps: [platformBrowser.EventManager, platformBrowser.ɵDomSharedStylesHost] },
        { provide: i0.RendererFactory2, useExisting: platformBrowser.ɵDomRendererFactory2 },
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
        { provide: platformBrowser.ɵDomSharedStylesHost, deps: [i2.DOCUMENT] },
        { provide: i0.Testability, deps: [i0.NgZone] },
        { provide: platformBrowser.EventManager, deps: [platformBrowser.EVENT_MANAGER_PLUGINS, i0.NgZone] },
        { provide: WebWorkerInstance, deps: [] },
        {
            provide: i0.PLATFORM_INITIALIZER,
            useFactory: initWebWorkerRenderPlatform,
            multi: true,
            deps: [i0.Injector]
        },
        { provide: i0.PLATFORM_ID, useValue: i2.ɵPLATFORM_WORKER_UI_ID },
        { provide: MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] },
    ];
    function initializeGenericWorkerRenderer(injector) {
        var bus = injector.get(MessageBus);
        var zone = injector.get(i0.NgZone);
        bus.attachToZone(zone);
        // initialize message services after the bus has been created
        var services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
        zone.runGuarded(function () {
            services.forEach(function (svc) {
                svc.start();
            });
        });
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
            catch (_a) {
                throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
            }
            var instance = injector.get(WebWorkerInstance);
            spawnWebWorker(scriptUri, instance);
            initializeGenericWorkerRenderer(injector);
        };
    }
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var platformWorkerUi = i0.createPlatformFactory(i0.platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
    function _exceptionHandler() {
        return new i0.ErrorHandler();
    }
    function _document() {
        // Tell ivy about the global document
        i0.ɵsetDocument(document);
        return document;
    }
    function createNgZone() {
        return new i0.NgZone({ enableLongStackTrace: i0.isDevMode() });
    }
    /**
     * Spawns a new class and initializes the WebWorkerInstance
     */
    function spawnWebWorker(uri, instance) {
        var webWorker = new Worker(uri);
        // webWorker is casted to any because the lib.d.ts signature changed in TS3.5 to require the
        // transfer argument in postMessage method.
        // this seems wrong but since all of this code is deprecated it shouldn't matter that much.
        var sink = new PostMessageBusSink(webWorker);
        var source = new PostMessageBusSource(webWorker);
        var bus = new PostMessageBus(sink, source);
        instance.init(webWorker, bus);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var VERSION = new i0.Version('10.1.0-next.0+49.sha-b358495');

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
        MessageBasedPlatformLocation.prototype._setPathname = function (pathname) {
            this._platformLocation.pathname = pathname;
        };
        return MessageBasedPlatformLocation;
    }());
    MessageBasedPlatformLocation.ɵfac = function MessageBasedPlatformLocation_Factory(t) { return new (t || MessageBasedPlatformLocation)(i0.ɵɵinject(ServiceMessageBrokerFactory), i0.ɵɵinject(i2.ɵBrowserPlatformLocation), i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer)); };
    MessageBasedPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: MessageBasedPlatformLocation, factory: MessageBasedPlatformLocation.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MessageBasedPlatformLocation, [{
                type: i0.Injectable
            }], function () { return [{ type: ServiceMessageBrokerFactory }, { type: i2.ɵBrowserPlatformLocation }, { type: MessageBus }, { type: Serializer }]; }, null);
    })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A list of {@link Provider}s. To use the router in a Worker enabled application you must
     * include these providers when setting up the render thread.
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WORKER_UI_LOCATION_PROVIDERS = [
        {
            provide: MessageBasedPlatformLocation,
            deps: [ServiceMessageBrokerFactory, i2.ɵBrowserPlatformLocation, MessageBus, Serializer]
        },
        { provide: i2.ɵBrowserPlatformLocation, deps: [i2.DOCUMENT] },
        { provide: i0.PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [i0.Injector] }
    ];
    function initUiLocation(injector) {
        return function () {
            var zone = injector.get(i0.NgZone);
            zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
        };
    }

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
            }, function (err) {
                throw new Error(err);
            });
        };
        WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
            throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
        };
        WebWorkerPlatformLocation.prototype.onPopState = function (fn) {
            this._popStateListeners.push(fn);
        };
        WebWorkerPlatformLocation.prototype.onHashChange = function (fn) {
            this._hashChangeListeners.push(fn);
        };
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "href", {
            get: function () {
                return this._location ? this._location.href : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "hostname", {
            get: function () {
                return this._location ? this._location.host : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "port", {
            get: function () {
                return this._location ? this._location.port : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "protocol", {
            get: function () {
                return this._location ? this._location.protocol : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
            get: function () {
                return this._location ? this._location.search : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
            get: function () {
                return this._location ? this._location.hash : '<unknown>';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
            set: function (newPath) {
                if (this._location === null) {
                    throw new Error('Attempt to set pathname before value is obtained from UI');
                }
                this._location.pathname = newPath;
                var fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
                var args = new UiArguments('setPathname', fnArgs);
                this._broker.runOnService(args, null);
            },
            enumerable: false,
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
        // History API isn't available on WebWorkers, therefore return undefined
        WebWorkerPlatformLocation.prototype.getState = function () {
            return undefined;
        };
        return WebWorkerPlatformLocation;
    }(i2.PlatformLocation));
    WebWorkerPlatformLocation.ɵfac = function WebWorkerPlatformLocation_Factory(t) { return new (t || WebWorkerPlatformLocation)(i0.ɵɵinject(ClientMessageBrokerFactory), i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer)); };
    WebWorkerPlatformLocation.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerPlatformLocation, factory: WebWorkerPlatformLocation.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(WebWorkerPlatformLocation, [{
                type: i0.Injectable
            }], function () { return [{ type: ClientMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }]; }, null);
    })();

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
     * a worker context.
     *
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WORKER_APP_LOCATION_PROVIDERS = [
        { provide: i2.PlatformLocation, useClass: WebWorkerPlatformLocation },
        {
            provide: i0.APP_INITIALIZER,
            useFactory: appInitFnFactory,
            multi: true,
            deps: [i2.PlatformLocation, i0.NgZone]
        },
        { provide: i2.LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [i2.PlatformLocation] }
    ];
    function locationInitialized(platformLocation) {
        return platformLocation.initialized;
    }
    function appInitFnFactory(platformLocation, zone) {
        return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
    }

    var NamedEventEmitter = /** @class */ (function () {
        function NamedEventEmitter() {
        }
        NamedEventEmitter.prototype.listen = function (eventName, callback) {
            this._getListeners(eventName).push(callback);
        };
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
        WebWorkerRendererFactory2.prototype.freeNode = function (node) {
            this.renderStore.remove(node);
        };
        WebWorkerRendererFactory2.prototype.allocateId = function () {
            return this.renderStore.allocateId();
        };
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
        return WebWorkerRendererFactory2;
    }());
    WebWorkerRendererFactory2.ɵfac = function WebWorkerRendererFactory2_Factory(t) { return new (t || WebWorkerRendererFactory2)(i0.ɵɵinject(ClientMessageBrokerFactory), i0.ɵɵinject(MessageBus), i0.ɵɵinject(Serializer), i0.ɵɵinject(RenderStore)); };
    WebWorkerRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerRendererFactory2, factory: WebWorkerRendererFactory2.ɵfac });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(WebWorkerRendererFactory2, [{
                type: i0.Injectable
            }], function () { return [{ type: ClientMessageBrokerFactory }, { type: MessageBus }, { type: Serializer }, { type: RenderStore }]; }, null);
    })();
    var WebWorkerRenderer2 = /** @class */ (function () {
        function WebWorkerRenderer2(_rendererFactory) {
            this._rendererFactory = _rendererFactory;
            this.data = Object.create(null);
            this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
        }
        WebWorkerRenderer2.prototype.destroy = function () {
            this.callUIWithRenderer('destroy');
        };
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
     * This adapter is required to log error messages.
     *
     * Note: other methods all throw as the DOM is not accessible directly in web worker context.
     */
    var WorkerDomAdapter = /** @class */ (function (_super) {
        __extends(WorkerDomAdapter, _super);
        function WorkerDomAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WorkerDomAdapter.makeCurrent = function () {
            i2.ɵsetRootDomAdapter(new WorkerDomAdapter());
        };
        WorkerDomAdapter.prototype.log = function (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
        };
        WorkerDomAdapter.prototype.logGroup = function (error) {
            if (console.group) {
                console.group(error);
                if (console.error) {
                    console.error(error);
                }
                else {
                    // tslint:disable-next-line:no-console
                    console.log(error);
                }
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
        WorkerDomAdapter.prototype.getProperty = function (el, name) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.dispatchEvent = function (el, evt) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.remove = function (el) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createElement = function (tagName, doc) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.createHtmlDocument = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getDefaultDocument = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.isElementNode = function (node) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.isShadowRoot = function (node) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.supportsDOMEvents = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getHistory = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getLocation = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getBaseHref = function (doc) {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.resetBaseElement = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.getUserAgent = function () {
            return 'Fake user agent';
        };
        WorkerDomAdapter.prototype.performanceNow = function () {
            throw 'not implemented';
        };
        WorkerDomAdapter.prototype.supportsCookies = function () {
            return false;
        };
        WorkerDomAdapter.prototype.getCookie = function (name) {
            throw 'not implemented';
        };
        return WorkerDomAdapter;
    }(i2.ɵDomAdapter));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var platformWorkerApp = i0.createPlatformFactory(i0.platformCore, 'workerApp', [{ provide: i0.PLATFORM_ID, useValue: i2.ɵPLATFORM_WORKER_APP_ID }]);
    function errorHandler() {
        return new i0.ErrorHandler();
    }
    // TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
    var _postMessage = {
        postMessage: function (message, transferrables) {
            postMessage(message, transferrables);
        }
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
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
     */
    var WorkerAppModule = /** @class */ (function () {
        function WorkerAppModule() {
        }
        return WorkerAppModule;
    }());
    WorkerAppModule.ɵmod = i0.ɵɵdefineNgModule({ type: WorkerAppModule });
    WorkerAppModule.ɵinj = i0.ɵɵdefineInjector({ factory: function WorkerAppModule_Factory(t) { return new (t || WorkerAppModule)(); }, providers: [
            platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
            { provide: i0.ɵINJECTOR_SCOPE, useValue: 'root' },
            Serializer,
            { provide: i2.DOCUMENT, useValue: null },
            ClientMessageBrokerFactory,
            ServiceMessageBrokerFactory,
            WebWorkerRendererFactory2,
            { provide: i0.RendererFactory2, useExisting: WebWorkerRendererFactory2 },
            { provide: ON_WEB_WORKER, useValue: true },
            RenderStore,
            { provide: i0.ErrorHandler, useFactory: errorHandler, deps: [] },
            { provide: MessageBus, useFactory: createMessageBus, deps: [i0.NgZone] },
            { provide: i0.APP_INITIALIZER, useValue: setupWebWorker, multi: true },
            { provide: i2.ViewportScroller, useClass: i2.ɵNullViewportScroller, deps: [] },
        ], imports: [i2.CommonModule,
            i0.ApplicationModule] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WorkerAppModule, { exports: [i2.CommonModule,
                i0.ApplicationModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(WorkerAppModule, [{
                type: i0.NgModule,
                args: [{
                        providers: [
                            platformBrowser.ɵBROWSER_SANITIZATION_PROVIDERS,
                            { provide: i0.ɵINJECTOR_SCOPE, useValue: 'root' },
                            Serializer,
                            { provide: i2.DOCUMENT, useValue: null },
                            ClientMessageBrokerFactory,
                            ServiceMessageBrokerFactory,
                            WebWorkerRendererFactory2,
                            { provide: i0.RendererFactory2, useExisting: WebWorkerRendererFactory2 },
                            { provide: ON_WEB_WORKER, useValue: true },
                            RenderStore,
                            { provide: i0.ErrorHandler, useFactory: errorHandler, deps: [] },
                            { provide: MessageBus, useFactory: createMessageBus, deps: [i0.NgZone] },
                            { provide: i0.APP_INITIALIZER, useValue: setupWebWorker, multi: true },
                            { provide: i2.ViewportScroller, useClass: i2.ɵNullViewportScroller, deps: [] },
                        ],
                        exports: [
                            i2.CommonModule,
                            i0.ApplicationModule,
                        ]
                    }]
            }], null, null);
    })();

    /**
     * Bootstraps the worker ui.
     *
     * @publicApi
     * @deprecated platform-webworker is deprecated in Angular and will be removed in a future version
     *     of Angular
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
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This file only reexports content of the `src` folder. Keep it that way.

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ClientMessageBroker = ClientMessageBroker;
    exports.ClientMessageBrokerFactory = ClientMessageBrokerFactory;
    exports.FnArg = FnArg;
    exports.MessageBus = MessageBus;
    exports.ServiceMessageBroker = ServiceMessageBroker;
    exports.ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
    exports.UiArguments = UiArguments;
    exports.VERSION = VERSION;
    exports.WORKER_APP_LOCATION_PROVIDERS = WORKER_APP_LOCATION_PROVIDERS;
    exports.WORKER_UI_LOCATION_PROVIDERS = WORKER_UI_LOCATION_PROVIDERS;
    exports.WorkerAppModule = WorkerAppModule;
    exports.bootstrapWorkerUi = bootstrapWorkerUi;
    exports.platformWorkerApp = platformWorkerApp;
    exports.platformWorkerUi = platformWorkerUi;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-webworker.umd.js.map
