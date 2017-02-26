/**
 * @license Angular v4.0.0-rc.1-213e210
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { ɵPLATFORM_WORKER_UI_ID, PlatformLocation, ɵPLATFORM_WORKER_APP_ID, CommonModule } from '@angular/common';
import { Injectable, InjectionToken, PLATFORM_ID, Injector, PLATFORM_INITIALIZER, Testability, RendererFactoryV2, RootRenderer, ɵAPP_ID_RANDOM_PROVIDER, ErrorHandler, NgZone, platformCore, createPlatformFactory, isDevMode, RenderComponentType, Version, APP_INITIALIZER, ApplicationModule, NgModule, ViewEncapsulation } from '@angular/core';
import { EventManager, ɵDomSharedStylesHost, AnimationDriver, ɵSharedStylesHost, ɵDomRendererFactoryV2, ɵDomRootRenderer, ɵDomRootRenderer_, HammerGestureConfig, HAMMER_GESTURE_CONFIG, ɵHammerGesturesPlugin, EVENT_MANAGER_PLUGINS, ɵKeyEventsPlugin, ɵDomEventsPlugin, DOCUMENT, ɵBROWSER_SANITIZATION_PROVIDERS, ɵBrowserGetTestability, ɵBrowserDomAdapter, ɵWebAnimationsDriver, ɵgetDOM, ɵBrowserPlatformLocation, ɵsetRootDomAdapter, ɵDomAdapter } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Observable';

const /** @type {?} */ ON_WEB_WORKER = new InjectionToken('WebWorker.onWebWorker');

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
        return `${token.overriddenName}`;
    }
    if (token.name) {
        return `${token.name}`;
    }
    const /** @type {?} */ res = token.toString();
    const /** @type {?} */ newLineIndex = res.indexOf('\n');
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
class MessageBus {
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
    initChannel(channel, runInZone) { }
    /**
     * Assigns this bus to the given zone.
     * Any callbacks attached to channels where runInZone was set to true on initialization
     * will be executed in the given zone.
     * @abstract
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) { }
    /**
     * Returns an {\@link EventEmitter} that emits every time a message
     * is received on the given channel.
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    from(channel) { }
    /**
     * Returns an {\@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     * @abstract
     * @param {?} channel
     * @return {?}
     */
    to(channel) { }
}

class RenderStore {
    constructor() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    /**
     * @return {?}
     */
    allocateId() { return this._nextIndex++; }
    /**
     * @param {?} obj
     * @param {?} id
     * @return {?}
     */
    store(obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    remove(obj) {
        const /** @type {?} */ index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    deserialize(id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    serialize(obj) { return obj == null ? null : this._lookupByObject.get(obj); }
}
RenderStore.decorators = [
    { type: Injectable },
];
/** @nocollapse */
RenderStore.ctorParameters = () => [];

/**
 * Any type that does not need to be serialized (string, number, boolean)
 *
 * @experimental WebWorker support in Angular is currently experimental.
 * @deprecated in v4. Use SerializerTypes.PRIMITIVE instead
 */
const /** @type {?} */ PRIMITIVE = 1 /* PRIMITIVE */;
class LocationType {
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
    constructor(href, protocol, host, hostname, port, pathname, search, hash, origin) {
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
}
class Serializer {
    /**
     * @param {?} _renderStore
     */
    constructor(_renderStore) {
        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */
    serialize(obj, type = 1 /* PRIMITIVE */) {
        if (obj == null || type === 1 /* PRIMITIVE */) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(v => this.serialize(v, type));
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
        throw new Error(`No serializer for type ${stringify(type)}`);
    }
    /**
     * @param {?} map
     * @param {?=} type
     * @param {?=} data
     * @return {?}
     */
    deserialize(map, type = 1 /* PRIMITIVE */, data) {
        if (map == null || type === 1 /* PRIMITIVE */) {
            return map;
        }
        if (Array.isArray(map)) {
            return map.map(val => this.deserialize(val, type, data));
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
        throw new Error(`No deserializer for type ${stringify(type)}`);
    }
    /**
     * @param {?} loc
     * @return {?}
     */
    _serializeLocation(loc) {
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
    }
    /**
     * @param {?} loc
     * @return {?}
     */
    _deserializeLocation(loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    _serializeRenderComponentType(type) {
        return {
            'id': type.id,
            'templateUrl': type.templateUrl,
            'slotCount': type.slotCount,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
        };
    }
    /**
     * @param {?} props
     * @return {?}
     */
    _deserializeRenderComponentType(props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    }
    /**
     * @param {?} type
     * @return {?}
     */
    _serializeRendererTypeV2(type) {
        return {
            'id': type.id,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
            'data': this.serialize(type.data),
        };
    }
    /**
     * @param {?} props
     * @return {?}
     */
    _deserializeRendererTypeV2(props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    }
}
Serializer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Serializer.ctorParameters = () => [
    { type: RenderStore, },
];
const /** @type {?} */ ANIMATION_WORKER_PLAYER_PREFIX = 'AnimationPlayer.';

/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */
class ClientMessageBrokerFactory {
    /**
     * Initializes the given channel and attaches a new {\@link ClientMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone) { }
}
class ClientMessageBrokerFactory_ extends ClientMessageBrokerFactory {
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
/**
 * \@experimental WebWorker support in Angular is experimental.
 * @abstract
 */
class ClientMessageBroker {
    /**
     * @abstract
     * @param {?} args
     * @param {?} returnType
     * @return {?}
     */
    runOnService(args, returnType) { }
}
class ClientMessageBroker_ extends ClientMessageBroker {
    /**
     * @param {?} messageBus
     * @param {?} _serializer
     * @param {?} channel
     */
    constructor(messageBus, _serializer, channel) {
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
        while (this._pending.has(id)) {
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
        if (args.args) {
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
                if (console && console.error) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                }
                completer.reject(err);
            });
            promise = promise.then((v) => this._serializer ? this._serializer.deserialize(v, returnType) : v);
        }
        else {
            promise = null;
        }
        const /** @type {?} */ message = {
            'method': args.method,
            'args': fnArgs,
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
    _handleMessage(message) {
        if (message.type === 'result' || message.type === 'error') {
            const /** @type {?} */ id = message.id;
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
    }
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
class FnArg {
    /**
     * @param {?} value
     * @param {?=} type
     */
    constructor(value, type = 1 /* PRIMITIVE */) {
        this.value = value;
        this.type = type;
    }
}
/**
 * \@experimental WebWorker support in Angular is experimental.
 */
class UiArguments {
    /**
     * @param {?} method
     * @param {?=} args
     */
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}

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
class EventEmitter extends Subject {
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     * @param {?=} isAsync
     */
    constructor(isAsync = false) {
        super();
        this.__isAsync = isAsync;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    emit(value) { super.next(value); }
    /**
     * @param {?=} generatorOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(generatorOrNext, error, complete) {
        let /** @type {?} */ schedulerFn;
        let /** @type {?} */ errorFn = (err) => null;
        let /** @type {?} */ completeFn = () => null;
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? (value) => {
                setTimeout(() => generatorOrNext.next(value));
            } : (value) => { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? (err) => { setTimeout(() => generatorOrNext.error(err)); } :
                    (err) => { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? () => { setTimeout(() => generatorOrNext.complete()); } :
                    () => { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? (value) => { setTimeout(() => generatorOrNext(value)); } :
                (value) => { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? (err) => { setTimeout(() => error(err)); } : (err) => { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? () => { setTimeout(() => complete()); } : () => { complete(); };
            }
        }
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
}

class PostMessageBusSink {
    /**
     * @param {?} _postMessageTarget
     */
    constructor(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) {
        this._zone = zone;
        this._zone.runOutsideAngular(() => { this._zone.onStable.subscribe({ next: () => { this._handleOnEventDone(); } }); });
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        const /** @type {?} */ emitter = new EventEmitter(false);
        const /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe((data) => {
            const /** @type {?} */ message = { channel: channel, message: data };
            if (runInZone) {
                this._messageBuffer.push(message);
            }
            else {
                this._sendMessages([message]);
            }
        });
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    to(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    /**
     * @return {?}
     */
    _handleOnEventDone() {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    }
    /**
     * @param {?} messages
     * @return {?}
     */
    _sendMessages(messages) { this._postMessageTarget.postMessage(messages); }
}
class PostMessageBusSource {
    /**
     * @param {?=} eventTarget
     */
    constructor(eventTarget) {
        this._channels = {};
        if (eventTarget) {
            eventTarget.addEventListener('message', (ev) => this._handleMessages(ev));
        }
        else {
            // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
            const workerScope = self;
            workerScope.addEventListener('message', (ev) => this._handleMessages(ev));
        }
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) { this._zone = zone; }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        const /** @type {?} */ emitter = new EventEmitter(false);
        const /** @type {?} */ channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    from(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    _handleMessages(ev) {
        const /** @type {?} */ messages = ev.data;
        for (let /** @type {?} */ i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _handleMessage(data) {
        const /** @type {?} */ channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            const /** @type {?} */ channelInfo = this._channels[channel];
            if (channelInfo.runInZone) {
                this._zone.run(() => { channelInfo.emitter.emit(data.message); });
            }
            else {
                channelInfo.emitter.emit(data.message);
            }
        }
    }
}
/**
 * A TypeScript implementation of {\@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
class PostMessageBus {
    /**
     * @param {?} sink
     * @param {?} source
     */
    constructor(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    attachToZone(zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    }
    /**
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    initChannel(channel, runInZone = true) {
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    }
    /**
     * @param {?} channel
     * @return {?}
     */
    from(channel) { return this.source.from(channel); }
    /**
     * @param {?} channel
     * @return {?}
     */
    to(channel) { return this.sink.to(channel); }
}
PostMessageBus.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PostMessageBus.ctorParameters = () => [
    { type: PostMessageBusSink, },
    { type: PostMessageBusSource, },
];
/**
 * Helper class that wraps a channel's {\@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
class _Channel {
    /**
     * @param {?} emitter
     * @param {?} runInZone
     */
    constructor(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
    }
}

/**
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */
class ServiceMessageBrokerFactory {
    /**
     * Initializes the given channel and attaches a new {\@link ServiceMessageBroker} to it.
     * @abstract
     * @param {?} channel
     * @param {?=} runInZone
     * @return {?}
     */
    createMessageBroker(channel, runInZone) { }
}
class ServiceMessageBrokerFactory_ extends ServiceMessageBrokerFactory {
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
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * \@experimental WebWorker support in Angular is currently experimental.
 * @abstract
 */
class ServiceMessageBroker {
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
class ServiceMessageBroker_ extends ServiceMessageBroker {
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
 */ const /** @type {?} */ RENDERER_CHANNEL = 'ng-Renderer';
const /** @type {?} */ EVENT_CHANNEL = 'ng-Events';
const /** @type {?} */ RENDERER_V2_CHANNEL = 'v2.ng-Renderer';
const /** @type {?} */ EVENT_V2_CHANNEL = 'v2.ng-Events';
const /** @type {?} */ ROUTER_CHANNEL = 'ng-Router';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const /** @type {?} */ MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
const /** @type {?} */ KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
const /** @type {?} */ TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
const /** @type {?} */ EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
const /** @type {?} */ NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
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
    const /** @type {?} */ serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
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
    const /** @type {?} */ serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
function serializeTransitionEvent(e) {
    const /** @type {?} */ serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @param {?} serializedEvent
 * @return {?}
 */
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(((e.target)).tagName.toLowerCase())) {
        const /** @type {?} */ target = (e.target);
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
    const /** @type {?} */ serialized = {};
    for (let /** @type {?} */ i = 0; i < properties.length; i++) {
        const /** @type {?} */ prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}

class EventDispatcher {
    /**
     * @param {?} _sink
     * @param {?} _serializer
     */
    constructor(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} element
     * @return {?}
     */
    dispatchAnimationEvent(player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
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
    dispatchRenderEvent(element, eventTarget, eventName, event) {
        let /** @type {?} */ serializedEvent;
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
    }
}

class MessageBasedRenderer {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rootRenderer
     */
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    /**
     * @return {?}
     */
    start() {
        const /** @type {?} */ broker = this._brokerFactory.createMessageBroker(RENDERER_CHANNEL);
        this._bus.initChannel(EVENT_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_CHANNEL), this._serializer);
        const [RCT, RSO, P] = [
            RenderComponentType,
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
        ];
        const /** @type {?} */ methods = [
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
        methods.forEach(([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        });
        this._bindAnimationPlayerMethods(broker);
    }
    /**
     * @param {?} broker
     * @return {?}
     */
    _bindAnimationPlayerMethods(broker) {
        const [P, RSO] = [1 /* PRIMITIVE */, 2 /* RENDER_STORE_OBJECT */];
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'play', [RSO, RSO], (player, element) => player.play());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'pause', [RSO, RSO], (player, element) => player.pause());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'init', [RSO, RSO], (player, element) => player.init());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'restart', [RSO, RSO], (player, element) => player.restart());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'destroy', [RSO, RSO], (player, element) => {
            player.destroy();
            this._renderStore.remove(player);
        });
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'finish', [RSO, RSO], (player, element) => player.finish());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'getPosition', [RSO, RSO], (player, element) => player.getPosition());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onStart', [RSO, RSO, P], (player, element) => this._listenOnAnimationPlayer(player, element, 'onStart'));
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onDone', [RSO, RSO, P], (player, element) => this._listenOnAnimationPlayer(player, element, 'onDone'));
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'setPosition', [RSO, RSO, P], (player, element, position) => player.setPosition(position));
    }
    /**
     * @param {?} renderComponentType
     * @param {?} rendererId
     * @return {?}
     */
    _renderComponent(renderComponentType, rendererId) {
        const /** @type {?} */ renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    }
    /**
     * @param {?} renderer
     * @param {?} selector
     * @param {?} elId
     * @return {?}
     */
    _selectRootElement(renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector, null), elId);
    }
    /**
     * @param {?} renderer
     * @param {?} parentElement
     * @param {?} name
     * @param {?} elId
     * @return {?}
     */
    _createElement(renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
    }
    /**
     * @param {?} renderer
     * @param {?} hostElement
     * @param {?} elId
     * @return {?}
     */
    _createViewRoot(renderer, hostElement, elId) {
        const /** @type {?} */ viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    }
    /**
     * @param {?} renderer
     * @param {?} parentElement
     * @param {?} elId
     * @return {?}
     */
    _createTemplateAnchor(renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
    }
    /**
     * @param {?} renderer
     * @param {?} parentElement
     * @param {?} value
     * @param {?} elId
     * @return {?}
     */
    _createText(renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value, null), elId);
    }
    /**
     * @param {?} renderer
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    _projectNodes(renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    }
    /**
     * @param {?} renderer
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    _attachViewAfter(renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    }
    /**
     * @param {?} renderer
     * @param {?} viewRootNodes
     * @return {?}
     */
    _detachView(renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    }
    /**
     * @param {?} renderer
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    _destroyView(renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (let /** @type {?} */ i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    _setElementProperty(renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    _setElementAttribute(renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    _setBindingDebugInfo(renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    _setElementClass(renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    _setElementStyle(renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    _invokeElementMethod(renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    }
    /**
     * @param {?} renderer
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    _setText(renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    }
    /**
     * @param {?} renderer
     * @param {?} renderElement
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    _listen(renderer, renderElement, eventName, unlistenId) {
        const /** @type {?} */ unregisterCallback = renderer.listen(renderElement, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    /**
     * @param {?} renderer
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    _listenGlobal(renderer, eventTarget, eventName, unlistenId) {
        const /** @type {?} */ unregisterCallback = renderer.listenGlobal(eventTarget, eventName, (event) => this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event));
        this._renderStore.store(unregisterCallback, unlistenId);
    }
    /**
     * @param {?} renderer
     * @param {?} unlistenCallback
     * @return {?}
     */
    _listenDone(renderer, unlistenCallback) { unlistenCallback(); }
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
    _animate(renderer, element, startingStyles, keyframes, duration, delay, easing, previousPlayers, playerId) {
        let /** @type {?} */ normalizedPreviousPlayers;
        if (previousPlayers && previousPlayers.length) {
            normalizedPreviousPlayers =
                previousPlayers.map(playerId => this._renderStore.deserialize(playerId));
        }
        const /** @type {?} */ player = renderer.animate(element, startingStyles, keyframes, duration, delay, easing, normalizedPreviousPlayers);
        this._renderStore.store(player, playerId);
    }
    /**
     * @param {?} player
     * @param {?} element
     * @param {?} phaseName
     * @return {?}
     */
    _listenOnAnimationPlayer(player, element, phaseName) {
        const /** @type {?} */ onEventComplete = () => { this._eventDispatcher.dispatchAnimationEvent(player, phaseName, element); };
        // there is no need to register a unlistener value here since the
        // internal player callbacks are removed when the player is destroyed
        if (phaseName == 'onDone') {
            player.onDone(() => onEventComplete());
        }
        else {
            player.onStart(() => onEventComplete());
        }
    }
}
MessageBasedRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedRenderer.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
    { type: RootRenderer, },
];
class MessageBasedRendererV2 {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rendererFactory
     */
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    /**
     * @return {?}
     */
    start() {
        const /** @type {?} */ broker = this._brokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
        this._bus.initChannel(EVENT_V2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_V2_CHANNEL), this._serializer);
        const [RSO, P, CRT] = [
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_V2 */,
        ];
        const /** @type {?} */ methods = [
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
        methods.forEach(([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        });
    }
    /**
     * @param {?} r
     * @return {?}
     */
    destroy(r) { r.destroy(); }
    /**
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    destroyNode(r, node) {
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
    createRenderer(el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    }
    /**
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    createElement(r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    }
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createComment(r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    }
    /**
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createText(r, value, id) {
        this._renderStore.store(r.createText(value), id);
    }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    appendChild(r, parent, child) { r.appendChild(parent, child); }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    insertBefore(r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    }
    /**
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    removeChild(r, parent, child) { r.removeChild(parent, child); }
    /**
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    selectRootElement(r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    parentNode(r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    nextSibling(r, node, id) {
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
    setAttribute(r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    removeAttribute(r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(r, el, name) { r.addClass(el, name); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(r, el, name) { r.removeClass(el, name); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(r, el, style, value, hasVendorPrefix, hasImportant) {
        r.setStyle(el, style, value, hasVendorPrefix, hasImportant);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(r, el, style, hasVendorPrefix) {
        r.removeStyle(el, style, hasVendorPrefix);
    }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(r, el, name, value) {
        r.setProperty(el, name, value);
    }
    /**
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(r, node, value) { r.setValue(node, value); }
    /**
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    listen(r, el, elName, eventName, unlistenId) {
        const /** @type {?} */ listener = (event) => {
            return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        };
        const /** @type {?} */ unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    }
    /**
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    unlisten(r, unlisten) { unlisten(); }
}
MessageBasedRendererV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedRendererV2.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
    { type: RendererFactoryV2, },
];

/**
 * Wrapper class that exposes the Worker
 * and underlying {\@link MessageBus} for lower level message passing.
 *
 * \@experimental WebWorker support is currently experimental.
 */
class WebWorkerInstance {
    /**
     * \@internal
     * @param {?} worker
     * @param {?} bus
     * @return {?}
     */
    init(worker, bus) {
        this.worker = worker;
        this.bus = bus;
    }
}
WebWorkerInstance.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerInstance.ctorParameters = () => [];
/**
 * @experimental WebWorker support is currently experimental.
 */
const /** @type {?} */ WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @experimental WebWorker support is currently experimental.
 */
const /** @type {?} */ WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
const /** @type {?} */ _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: NgZone, useFactory: createNgZone, deps: [] },
    MessageBasedRenderer,
    MessageBasedRendererV2,
    {
        provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE,
        useExisting: MessageBasedRendererV2,
        multi: true
    },
    ɵBROWSER_SANITIZATION_PROVIDERS,
    { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: EVENT_MANAGER_PLUGINS, useClass: ɵDomEventsPlugin, multi: true },
    { provide: EVENT_MANAGER_PLUGINS, useClass: ɵKeyEventsPlugin, multi: true },
    { provide: EVENT_MANAGER_PLUGINS, useClass: ɵHammerGesturesPlugin, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    ɵAPP_ID_RANDOM_PROVIDER,
    { provide: ɵDomRootRenderer, useClass: ɵDomRootRenderer_ },
    { provide: RootRenderer, useExisting: ɵDomRootRenderer },
    ɵDomRendererFactoryV2,
    { provide: RendererFactoryV2, useExisting: ɵDomRendererFactoryV2 },
    { provide: ɵSharedStylesHost, useExisting: ɵDomSharedStylesHost },
    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
    { provide: AnimationDriver, useFactory: _resolveDefaultAnimationDriver, deps: [] },
    Serializer,
    { provide: ON_WEB_WORKER, useValue: false },
    RenderStore,
    ɵDomSharedStylesHost,
    Testability,
    EventManager,
    WebWorkerInstance,
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
    const /** @type {?} */ bus = injector.get(MessageBus);
    const /** @type {?} */ zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    const /** @type {?} */ services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(() => { services.forEach((svc) => { svc.start(); }); });
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
    return () => {
        ɵBrowserDomAdapter.makeCurrent();
        ɵBrowserGetTestability.init();
        let /** @type {?} */ scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (e) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        const /** @type {?} */ instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @experimental WebWorker support is currently experimental.
 */
const /** @type {?} */ platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
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
    const /** @type {?} */ webWorker = new Worker(uri);
    const /** @type {?} */ sink = new PostMessageBusSink(webWorker);
    const /** @type {?} */ source = new PostMessageBusSource(webWorker);
    const /** @type {?} */ bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
/**
 * @return {?}
 */
function _resolveDefaultAnimationDriver() {
    return ɵgetDOM().supportsWebAnimation() ? new ɵWebAnimationsDriver() : AnimationDriver.NOOP;
}

/**
 * @stable
 */
const /** @type {?} */ VERSION = new Version('4.0.0-rc.1-213e210');

class MessageBasedPlatformLocation {
    /**
     * @param {?} _brokerFactory
     * @param {?} _platformLocation
     * @param {?} bus
     * @param {?} _serializer
     */
    constructor(_brokerFactory, _platformLocation, bus, _serializer) {
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
    start() {
        const /** @type {?} */ P = 1 /* PRIMITIVE */;
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
    _getLocation() {
        return Promise.resolve(this._platformLocation.location);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _sendUrlChangeEvent(e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    }
    /**
     * @param {?} pathname
     * @return {?}
     */
    _setPathname(pathname) { this._platformLocation.pathname = pathname; }
}
MessageBasedPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedPlatformLocation.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory, },
    { type: ɵBrowserPlatformLocation, },
    { type: MessageBus, },
    { type: Serializer, },
];

/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @experimental
 */
const /** @type {?} */ WORKER_UI_LOCATION_PROVIDERS = [
    MessageBasedPlatformLocation, ɵBrowserPlatformLocation,
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initUiLocation(injector) {
    return () => {
        const /** @type {?} */ zone = injector.get(NgZone);
        zone.runGuarded(() => injector.get(MessageBasedPlatformLocation).start());
    };
}

class WebWorkerPlatformLocation extends PlatformLocation {
    /**
     * @param {?} brokerFactory
     * @param {?} bus
     * @param {?} _serializer
     */
    constructor(brokerFactory, bus, _serializer) {
        super();
        this._serializer = _serializer;
        this._popStateListeners = [];
        this._hashChangeListeners = [];
        this._location = null;
        this._broker = brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSource = bus.from(ROUTER_CHANNEL);
        this._channelSource.subscribe({
            next: (msg) => {
                let listeners = null;
                if (msg.hasOwnProperty('event')) {
                    const type = msg['event']['type'];
                    if (type === 'popstate') {
                        listeners = this._popStateListeners;
                    }
                    else if (type === 'hashchange') {
                        listeners = this._hashChangeListeners;
                    }
                    if (listeners) {
                        // There was a popState or hashChange event, so the location object thas been updated
                        this._location = this._serializer.deserialize(msg['location'], LocationType);
                        listeners.forEach((fn) => fn(msg['event']));
                    }
                }
            }
        });
    }
    /**
     * \@internal *
     * @return {?}
     */
    init() {
        const /** @type {?} */ args = new UiArguments('getLocation');
        return this._broker.runOnService(args, LocationType)
            .then((val) => {
            this._location = val;
            return true;
        }, err => { throw new Error(err); });
    }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) { this._popStateListeners.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) { this._hashChangeListeners.push(fn); }
    /**
     * @return {?}
     */
    get pathname() { return this._location ? this._location.pathname : null; }
    /**
     * @return {?}
     */
    get search() { return this._location ? this._location.search : null; }
    /**
     * @return {?}
     */
    get hash() { return this._location ? this._location.hash : null; }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) {
        if (this._location === null) {
            throw new Error('Attempt to set pathname before value is obtained from UI');
        }
        this._location.pathname = newPath;
        const /** @type {?} */ fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
        const /** @type {?} */ args = new UiArguments('setPathname', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        const /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        const /** @type {?} */ args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        const /** @type {?} */ fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        const /** @type {?} */ args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    forward() {
        const /** @type {?} */ args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    back() {
        const /** @type {?} */ args = new UiArguments('back');
        this._broker.runOnService(args, null);
    }
}
WebWorkerPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerPlatformLocation.ctorParameters = () => [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
];

/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 * @experimental
 */
const /** @type {?} */ WORKER_APP_LOCATION_PROVIDERS = [
    { provide: PlatformLocation, useClass: WebWorkerPlatformLocation },
    {
        provide: APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [PlatformLocation, NgZone],
    },
];
/**
 * @param {?} platformLocation
 * @param {?} zone
 * @return {?}
 */
function appInitFnFactory(platformLocation, zone) {
    return () => zone.runGuarded(() => platformLocation.init());
}

class NamedEventEmitter {
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(eventName, callback) { this._getListeners(eventName).push(callback); }
    /**
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    unlisten(eventName, listener) {
        const /** @type {?} */ listeners = this._getListeners(eventName);
        const /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    /**
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    dispatchEvent(eventName, event) {
        const /** @type {?} */ listeners = this._getListeners(eventName);
        for (let /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    _getListeners(eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        let /** @type {?} */ listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    }
}
class WebWorkerRootRenderer {
    /**
     * @param {?} messageBrokerFactory
     * @param {?} bus
     * @param {?} _serializer
     * @param {?} renderStore
     */
    constructor(messageBrokerFactory, bus, _serializer, renderStore) {
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._componentRenderers = new Map();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_CHANNEL);
        bus.initChannel(EVENT_CHANNEL);
        const source = bus.from(EVENT_CHANNEL);
        source.subscribe({ next: (message) => this._dispatchEvent(message) });
        throw new Error('RootRenderer is no longer supported. Please use the `RendererFactoryV2` instead!');
    }
    /**
     * @param {?} message
     * @return {?}
     */
    _dispatchEvent(message) {
        const /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        const /** @type {?} */ playerData = message['animationPlayer'];
        if (playerData) {
            const /** @type {?} */ phaseName = message['phaseName'];
            const /** @type {?} */ player = this._serializer.deserialize(playerData, 2 /* RENDER_STORE_OBJECT */);
            element.animationPlayerEvents.dispatchEvent(player, phaseName);
        }
        else {
            const /** @type {?} */ eventName = message['eventName'];
            const /** @type {?} */ target = message['eventTarget'];
            const /** @type {?} */ event = message['event'];
            if (target) {
                this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
            }
            else {
                element.events.dispatchEvent(eventName, event);
            }
        }
    }
    /**
     * @param {?} componentType
     * @return {?}
     */
    renderComponent(componentType) {
        let /** @type {?} */ result = this._componentRenderers.get(componentType.id);
        if (!result) {
            result = new WebWorkerRenderer(this, componentType);
            this._componentRenderers.set(componentType.id, result);
            const /** @type {?} */ id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            this.runOnService('renderComponent', [
                new FnArg(componentType, RenderComponentType),
                new FnArg(result, 2 /* RENDER_STORE_OBJECT */),
            ]);
        }
        return result;
    }
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    runOnService(fnName, fnArgs) {
        const /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    allocateNode() {
        const /** @type {?} */ result = new WebWorkerRenderNode();
        const /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    }
    /**
     * @return {?}
     */
    allocateId() { return this.renderStore.allocateId(); }
    /**
     * @param {?} nodes
     * @return {?}
     */
    destroyNodes(nodes) {
        for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
            this.renderStore.remove(nodes[i]);
        }
    }
}
WebWorkerRootRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerRootRenderer.ctorParameters = () => [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
];
class WebWorkerRenderer {
    /**
     * @param {?} _rootRenderer
     * @param {?} _componentType
     */
    constructor(_rootRenderer, _componentType) {
        this._rootRenderer = _rootRenderer;
        this._componentType = _componentType;
    }
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    _runOnService(fnName, fnArgs) {
        const /** @type {?} */ fnArgsWithRenderer = [new FnArg(this, 2 /* RENDER_STORE_OBJECT */), ...fnArgs];
        this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    createElement(parentElement, name, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('createElement', [
            new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) {
        const /** @type {?} */ viewRoot = this._componentType.encapsulation === ViewEncapsulation.Native ?
            this._rootRenderer.allocateNode() :
            hostElement;
        this._runOnService('createViewRoot', [
            new FnArg(hostElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(viewRoot, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return viewRoot;
    }
    /**
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('createTemplateAnchor', [
            new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('createText', [
            new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        this._runOnService('projectNodes', [
            new FnArg(parentElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(nodes, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        this._runOnService('attachViewAfter', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(viewRootNodes, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        this._runOnService('detachView', [new FnArg(viewRootNodes, 2 /* RENDER_STORE_OBJECT */)]);
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        this._runOnService('destroyView', [
            new FnArg(hostElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(viewAllNodes, 2 /* RENDER_STORE_OBJECT */),
        ]);
        this._rootRenderer.destroyNodes(viewAllNodes);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        this._runOnService('setElementProperty', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(propertyName),
            new FnArg(propertyValue),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        this._runOnService('setElementAttribute', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(attributeName),
            new FnArg(attributeValue),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        this._runOnService('setBindingDebugInfo', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(propertyName),
            new FnArg(propertyValue),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        this._runOnService('setElementClass', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(className),
            new FnArg(isAdd),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        this._runOnService('setElementStyle', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(styleName),
            new FnArg(styleValue),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        this._runOnService('invokeElementMethod', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(methodName),
            new FnArg(args),
        ]);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) {
        this._runOnService('setText', [
            new FnArg(renderNode, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(text),
        ]);
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        renderElement.events.listen(name, callback);
        const /** @type {?} */ unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listen', [
            new FnArg(renderElement, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(unlistenCallbackId),
        ]);
        return () => {
            renderElement.events.unlisten(name, callback);
            this._runOnService('listenDone', [new FnArg(unlistenCallbackId)]);
        };
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
        const /** @type {?} */ unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listenGlobal', [
            new FnArg(target),
            new FnArg(name, null),
            new FnArg(unlistenCallbackId),
        ]);
        return () => {
            this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
            this._runOnService('listenDone', [new FnArg(unlistenCallbackId)]);
        };
    }
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
    animate(renderElement, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        const /** @type {?} */ playerId = this._rootRenderer.allocateId();
        const /** @type {?} */ previousPlayerIds = previousPlayers.map(player => this._rootRenderer.renderStore.serialize(player));
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
        const /** @type {?} */ player = new _AnimationWorkerRendererPlayer(this._rootRenderer, renderElement);
        this._rootRenderer.renderStore.store(player, playerId);
        return player;
    }
}
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */
function eventNameWithTarget(target, eventName) {
    return `${target}:${eventName}`;
}
class WebWorkerRendererFactoryV2 {
    /**
     * @param {?} messageBrokerFactory
     * @param {?} bus
     * @param {?} _serializer
     * @param {?} renderStore
     */
    constructor(messageBrokerFactory, bus, _serializer, renderStore) {
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_V2_CHANNEL);
        bus.initChannel(EVENT_V2_CHANNEL);
        const source = bus.from(EVENT_V2_CHANNEL);
        source.subscribe({ next: (message) => this._dispatchEvent(message) });
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        const /** @type {?} */ renderer = new WebWorkerRendererV2(this);
        const /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_V2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    }
    /**
     * @param {?} fnName
     * @param {?} fnArgs
     * @return {?}
     */
    callUI(fnName, fnArgs) {
        const /** @type {?} */ args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    /**
     * @return {?}
     */
    allocateNode() {
        const /** @type {?} */ result = new WebWorkerRenderNode();
        const /** @type {?} */ id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    freeNode(node) { this.renderStore.remove(node); }
    /**
     * @return {?}
     */
    allocateId() { return this.renderStore.allocateId(); }
    /**
     * @param {?} message
     * @return {?}
     */
    _dispatchEvent(message) {
        const /** @type {?} */ element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        const /** @type {?} */ eventName = message['eventName'];
        const /** @type {?} */ target = message['eventTarget'];
        const /** @type {?} */ event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    }
}
WebWorkerRendererFactoryV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerRendererFactoryV2.ctorParameters = () => [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
];
class WebWorkerRendererV2 {
    /**
     * @param {?} _rendererFactory
     */
    constructor(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    /**
     * @return {?}
     */
    destroy() { this.callUIWithRenderer('destroy'); }
    /**
     * @param {?} node
     * @return {?}
     */
    destroyNode(node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (!parent) {
            return;
        }
        this.callUIWithRenderer('insertBefore', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        const /** @type {?} */ node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) {
        const /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) {
        const /** @type {?} */ res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(hasVendorPrefix),
            new FnArg(hasImportant),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(hasVendorPrefix),
        ]);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} listener
     * @return {?}
     */
    listen(target, eventName, listener) {
        const /** @type {?} */ unlistenId = this._rendererFactory.allocateId();
        const [targetEl, targetName, fullName] = typeof target === 'string' ?
            [null, target, `${target}:${eventName}`] :
            [target, null, null];
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
        return () => {
            if (fullName) {
                this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        };
    }
    /**
     * @param {?} fnName
     * @param {?=} fnArgs
     * @return {?}
     */
    callUIWithRenderer(fnName, fnArgs = []) {
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg, ...fnArgs]);
    }
}
class AnimationPlayerEmitter {
    /**
     * @param {?} player
     * @param {?} phaseName
     * @return {?}
     */
    _getListeners(player, phaseName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        let /** @type {?} */ phaseMap = this._listeners.get(player);
        if (!phaseMap) {
            this._listeners.set(player, phaseMap = {});
        }
        let /** @type {?} */ phaseFns = phaseMap[phaseName];
        if (!phaseFns) {
            phaseFns = phaseMap[phaseName] = [];
        }
        return phaseFns;
    }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} callback
     * @return {?}
     */
    listen(player, phaseName, callback) {
        this._getListeners(player, phaseName).push(callback);
    }
    /**
     * @param {?} player
     * @return {?}
     */
    unlisten(player) { this._listeners.delete(player); }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @return {?}
     */
    dispatchEvent(player, phaseName) {
        const /** @type {?} */ listeners = this._getListeners(player, phaseName);
        for (let /** @type {?} */ i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }
}
class WebWorkerRenderNode {
    constructor() {
        this.events = new NamedEventEmitter();
        this.animationPlayerEvents = new AnimationPlayerEmitter();
    }
}
class _AnimationWorkerRendererPlayer {
    /**
     * @param {?} _rootRenderer
     * @param {?} _renderElement
     */
    constructor(_rootRenderer, _renderElement) {
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
    _runOnService(fnName, fnArgs) {
        if (!this._destroyed) {
            const /** @type {?} */ fnArgsWithRenderer = [
                new FnArg(this, 2 /* RENDER_STORE_OBJECT */),
                new FnArg(this._renderElement, 2 /* RENDER_STORE_OBJECT */), ...fnArgs
            ];
            this._rootRenderer.runOnService(ANIMATION_WORKER_PLAYER_PREFIX + fnName, fnArgsWithRenderer);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) {
        this._renderElement.animationPlayerEvents.listen(this, 'onStart', fn);
        this._runOnService('onStart', []);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) {
        this._renderElement.animationPlayerEvents.listen(this, 'onDone', fn);
        this._runOnService('onDone', []);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) {
        this._renderElement.animationPlayerEvents.listen(this, 'onDestroy', fn);
        this._runOnService('onDestroy', []);
    }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    init() { this._runOnService('init', []); }
    /**
     * @return {?}
     */
    play() {
        this._started = true;
        this._runOnService('play', []);
    }
    /**
     * @return {?}
     */
    pause() { this._runOnService('pause', []); }
    /**
     * @return {?}
     */
    restart() { this._runOnService('restart', []); }
    /**
     * @return {?}
     */
    finish() { this._runOnService('finish', []); }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._renderElement.animationPlayerEvents.unlisten(this);
            this._runOnService('destroy', []);
            this._rootRenderer.renderStore.remove(this);
            this._destroyed = true;
        }
    }
    /**
     * @return {?}
     */
    reset() { this._runOnService('reset', []); }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this._runOnService('setPosition', [new FnArg(p)]); }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
}

/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
class WorkerDomAdapter extends ɵDomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() { ɵsetRootDomAdapter(new WorkerDomAdapter()); }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) { console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (console.group) {
            console.group(error);
            this.logError(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    get attrToPropMap() { throw 'not implemented'; }
    /**
     * @param {?} value
     * @return {?}
     */
    set attrToPropMap(value) { throw 'not implemented'; }
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { throw 'not implemented'; }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { throw 'not implemented'; }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) { throw 'not implemented'; }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) { throw 'not implemented'; }
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, el, node) { throw 'not implemented'; }
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, el, nodes) { throw 'not implemented'; }
    /**
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, el, node) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { throw 'not implemented'; }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) { throw 'not implemented'; }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) { throw 'not implemented'; }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) { throw 'not implemented'; }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) { throw 'not implemented'; }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc) {
        throw 'not implemented';
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        throw 'not implemented';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    removeAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    createHtmlDocument() { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { throw 'not implemented'; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { throw 'not implemented'; }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    getHref(element) { throw 'not implemented'; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(element, baseUrl, href) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsDOMEvents() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) { throw 'not implemented'; }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(name, value) { throw 'not implemented'; }
    /**
     * @return {?}
     */
    performanceNow() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getAnimationPrefix() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getTransitionEnd() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsAnimation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsWebAnimation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    supportsCookies() { return false; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { throw 'not implemented'; }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { throw 'not implemented'; }
}

/**
 * @experimental
 */
const /** @type {?} */ platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_APP_ID }]);
/**
 * @return {?}
 */
function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
const /** @type {?} */ _postMessage = {
    postMessage: (message, transferrables) => {
        ((postMessage))(message, transferrables);
    }
};
/**
 * @param {?} zone
 * @return {?}
 */
function createMessageBus(zone) {
    const /** @type {?} */ sink = new PostMessageBusSink(_postMessage);
    const /** @type {?} */ source = new PostMessageBusSource();
    const /** @type {?} */ bus = new PostMessageBus(sink, source);
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
class WorkerAppModule {
}
WorkerAppModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    ɵBROWSER_SANITIZATION_PROVIDERS,
                    Serializer,
                    { provide: DOCUMENT, useValue: null },
                    { provide: ClientMessageBrokerFactory, useClass: ClientMessageBrokerFactory_ },
                    { provide: ServiceMessageBrokerFactory, useClass: ServiceMessageBrokerFactory_ },
                    WebWorkerRootRenderer,
                    { provide: RootRenderer, useExisting: WebWorkerRootRenderer },
                    WebWorkerRendererFactoryV2,
                    { provide: RendererFactoryV2, useExisting: WebWorkerRendererFactoryV2 },
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
WorkerAppModule.ctorParameters = () => [];

/**
 * Bootstraps the worker ui.
 *
 * \@experimental
 * @param {?} workerScriptUri
 * @param {?=} customProviders
 * @return {?}
 */
function bootstrapWorkerUi(workerScriptUri, customProviders = []) {
    // For now, just creates the worker ui platform...
    const /** @type {?} */ platform = platformWorkerUi([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri },
        ...customProviders,
    ]);
    return Promise.resolve(platform);
}

export { VERSION, ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments, MessageBus, PRIMITIVE, ServiceMessageBroker, ServiceMessageBrokerFactory, WORKER_UI_LOCATION_PROVIDERS, WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule, platformWorkerApp, platformWorkerUi, bootstrapWorkerUi, ON_WEB_WORKER as ɵk, ClientMessageBrokerFactory_ as ɵa, RenderStore as ɵh, Serializer as ɵb, ServiceMessageBrokerFactory_ as ɵc, WebWorkerRendererFactoryV2 as ɵj, WebWorkerRootRenderer as ɵi, createMessageBus as ɵe, errorHandler as ɵd, setupWebWorker as ɵf, _WORKER_UI_PLATFORM_PROVIDERS as ɵg };