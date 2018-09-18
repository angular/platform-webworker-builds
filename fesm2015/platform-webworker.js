/**
 * @license Angular v7.0.0-beta.5+51.sha-cbbad1b
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

import { InjectionToken, Injectable, RenderComponentType, ɵstringify, EventEmitter, RendererFactory2, ErrorHandler, Injector, NgZone, PLATFORM_ID, PLATFORM_INITIALIZER, Testability, createPlatformFactory, isDevMode, platformCore, ɵAPP_ID_RANDOM_PROVIDER, Version, APP_INITIALIZER, ApplicationModule, NgModule } from '@angular/core';
import { __decorate, __metadata } from 'tslib';
import { ɵPLATFORM_WORKER_UI_ID, DOCUMENT as DOCUMENT$1, PlatformLocation, LOCATION_INITIALIZED, CommonModule, ViewportScroller, ɵNullViewportScroller, ɵPLATFORM_WORKER_APP_ID } from '@angular/common';
import { DOCUMENT, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵBROWSER_SANITIZATION_PROVIDERS, ɵBrowserDomAdapter, ɵBrowserGetTestability, ɵDomEventsPlugin, ɵDomRendererFactory2, ɵDomSharedStylesHost, ɵHammerGesturesPlugin, ɵKeyEventsPlugin, ɵSharedStylesHost, ɵBrowserPlatformLocation, ɵDomAdapter, ɵsetRootDomAdapter } from '@angular/platform-browser';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ON_WEB_WORKER = new InjectionToken('WebWorker.onWebWorker');

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
class MessageBus {
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let RenderStore = class RenderStore {
    constructor() {
        this._nextIndex = 0;
        this._lookupById = new Map();
        this._lookupByObject = new Map();
    }
    allocateId() { return this._nextIndex++; }
    store(obj, id) {
        if (id == null)
            return;
        this._lookupById.set(id, obj);
        this._lookupByObject.set(obj, id);
    }
    remove(obj) {
        const index = this._lookupByObject.get(obj);
        if (index != null) {
            this._lookupByObject.delete(obj);
            this._lookupById.delete(index);
        }
    }
    deserialize(id) {
        return this._lookupById.has(id) ? this._lookupById.get(id) : null;
    }
    serialize(obj) {
        return obj == null ? null : this._lookupByObject.get(obj);
    }
};
RenderStore = __decorate([
    Injectable()
], RenderStore);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class LocationType {
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
let Serializer = class Serializer {
    constructor(_renderStore) {
        this._renderStore = _renderStore;
    }
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
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._serializeRendererType2(obj);
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error(`No serializer for type ${ɵstringify(type)}`);
    }
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
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._deserializeRendererType2(map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error(`No deserializer for type ${ɵstringify(type)}`);
    }
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
    _deserializeLocation(loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    }
    _serializeRenderComponentType(type) {
        return {
            'id': type.id,
            'templateUrl': type.templateUrl,
            'slotCount': type.slotCount,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
        };
    }
    _deserializeRenderComponentType(props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    }
    _serializeRendererType2(type) {
        return {
            'id': type.id,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
            'data': this.serialize(type.data),
        };
    }
    _deserializeRendererType2(props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    }
};
Serializer = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RenderStore])
], Serializer);

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
let ClientMessageBrokerFactory = class ClientMessageBrokerFactory {
    /** @internal */
    constructor(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ClientMessageBroker(this._messageBus, this._serializer, channel);
    }
};
ClientMessageBrokerFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MessageBus, Serializer])
], ClientMessageBrokerFactory);
/**
 * @experimental WebWorker support in Angular is experimental.
 */
class ClientMessageBroker {
    /** @internal */
    constructor(messageBus, _serializer, channel) {
        this.channel = channel;
        this._pending = new Map();
        this._sink = messageBus.to(channel);
        this._serializer = _serializer;
        const source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    _generateMessageId(name) {
        const time = ɵstringify(new Date().getTime());
        let iteration = 0;
        let id = name + time + ɵstringify(iteration);
        while (this._pending.has(id)) {
            id = `${name}${time}${iteration}`;
            iteration++;
        }
        return id;
    }
    runOnService(args, returnType) {
        const fnArgs = [];
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
        let promise;
        let id = null;
        if (returnType != null) {
            let completer = undefined;
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
        const message = {
            'method': args.method,
            'args': fnArgs,
        };
        if (id != null) {
            message['id'] = id;
        }
        this._sink.emit(message);
        return promise;
    }
    _handleMessage(message) {
        if (message.type === 'result' || message.type === 'error') {
            const id = message.id;
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
 * @experimental WebWorker support in Angular is experimental.
 */
class FnArg {
    constructor(value, type = 1 /* PRIMITIVE */) {
        this.value = value;
        this.type = type;
    }
}
/**
 * @experimental WebWorker support in Angular is experimental.
 */
class UiArguments {
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class PostMessageBusSink {
    constructor(_postMessageTarget) {
        this._postMessageTarget = _postMessageTarget;
        this._channels = {};
        this._messageBuffer = [];
    }
    attachToZone(zone) {
        this._zone = zone;
        this._zone.runOutsideAngular(() => { this._zone.onStable.subscribe({ next: () => { this._handleOnEventDone(); } }); });
    }
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        const emitter = new EventEmitter(false);
        const channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
        emitter.subscribe((data) => {
            const message = { channel: channel, message: data };
            if (runInZone) {
                this._messageBuffer.push(message);
            }
            else {
                this._sendMessages([message]);
            }
        });
    }
    to(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    _handleOnEventDone() {
        if (this._messageBuffer.length > 0) {
            this._sendMessages(this._messageBuffer);
            this._messageBuffer = [];
        }
    }
    _sendMessages(messages) { this._postMessageTarget.postMessage(messages); }
}
class PostMessageBusSource {
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
    attachToZone(zone) { this._zone = zone; }
    initChannel(channel, runInZone = true) {
        if (this._channels.hasOwnProperty(channel)) {
            throw new Error(`${channel} has already been initialized`);
        }
        const emitter = new EventEmitter(false);
        const channelInfo = new _Channel(emitter, runInZone);
        this._channels[channel] = channelInfo;
    }
    from(channel) {
        if (this._channels.hasOwnProperty(channel)) {
            return this._channels[channel].emitter;
        }
        else {
            throw new Error(`${channel} is not set up. Did you forget to call initChannel?`);
        }
    }
    _handleMessages(ev) {
        const messages = ev.data;
        for (let i = 0; i < messages.length; i++) {
            this._handleMessage(messages[i]);
        }
    }
    _handleMessage(data) {
        const channel = data.channel;
        if (this._channels.hasOwnProperty(channel)) {
            const channelInfo = this._channels[channel];
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
 * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
 * postMessage API.
 */
let PostMessageBus = class PostMessageBus {
    constructor(sink, source) {
        this.sink = sink;
        this.source = source;
    }
    attachToZone(zone) {
        this.source.attachToZone(zone);
        this.sink.attachToZone(zone);
    }
    initChannel(channel, runInZone = true) {
        this.source.initChannel(channel, runInZone);
        this.sink.initChannel(channel, runInZone);
    }
    from(channel) { return this.source.from(channel); }
    to(channel) { return this.sink.to(channel); }
};
PostMessageBus = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PostMessageBusSink, PostMessageBusSource])
], PostMessageBus);
/**
 * Helper class that wraps a channel's {@link EventEmitter} and
 * keeps track of if it should run in the zone.
 */
class _Channel {
    constructor(emitter, runInZone) {
        this.emitter = emitter;
        this.runInZone = runInZone;
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
 * @experimental WebWorker support in Angular is currently experimental.
 */
let ServiceMessageBrokerFactory = class ServiceMessageBrokerFactory {
    /** @internal */
    constructor(_messageBus, _serializer) {
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    createMessageBroker(channel, runInZone = true) {
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker(this._messageBus, this._serializer, channel);
    }
};
ServiceMessageBrokerFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MessageBus, Serializer])
], ServiceMessageBrokerFactory);
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
class ServiceMessageBroker {
    /** @internal */
    constructor(messageBus, _serializer, channel) {
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new Map();
        this._sink = messageBus.to(channel);
        const source = messageBus.from(channel);
        source.subscribe({ next: (message) => this._handleMessage(message) });
    }
    registerMethod(methodName, signature, method, returnType) {
        this._methods.set(methodName, (message) => {
            const serializedArgs = message.args;
            const numArgs = signature ? signature.length : 0;
            const deserializedArgs = new Array(numArgs);
            for (let i = 0; i < numArgs; i++) {
                const serializedArg = serializedArgs[i];
                deserializedArgs[i] = this._serializer.deserialize(serializedArg, signature[i]);
            }
            const promise = method(...deserializedArgs);
            if (returnType && promise) {
                this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    }
    _handleMessage(message) {
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    }
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
const RENDERER_2_CHANNEL = 'v2.ng-Renderer';
const EVENT_2_CHANNEL = 'v2.ng-Events';
const ROUTER_CHANNEL = 'ng-Router';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
const KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
const TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
const EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
const NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
function serializeGenericEvent(e) {
    return serializeEvent(e, EVENT_PROPERTIES);
}
// TODO(jteplitz602): Allow users to specify the properties they need rather than always
// adding value and files #3374
function serializeEventWithTarget(e) {
    const serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
function serializeMouseEvent(e) {
    return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
}
function serializeKeyboardEvent(e) {
    const serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
function serializeTransitionEvent(e) {
    const serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
// TODO(jteplitz602): #3374. See above.
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(e.target.tagName.toLowerCase())) {
        const target = e.target;
        serializedEvent['target'] = { 'value': target.value };
        if (target.files) {
            serializedEvent['target']['files'] = target.files;
        }
    }
    return serializedEvent;
}
function serializeEvent(e, properties) {
    const serialized = {};
    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}

class EventDispatcher {
    constructor(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    dispatchAnimationEvent(player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    }
    dispatchRenderEvent(element, eventTarget, eventName, event) {
        let serializedEvent;
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

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MessageBasedRenderer2 = class MessageBasedRenderer2 {
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    start() {
        const broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        this._bus.initChannel(EVENT_2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
        const [RSO, P, CRT] = [
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_2 */,
        ];
        const methods = [
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
        methods.forEach(([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        });
    }
    destroy(r) { r.destroy(); }
    destroyNode(r, node) {
        if (r.destroyNode) {
            r.destroyNode(node);
        }
        this._renderStore.remove(node);
    }
    createRenderer(el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    }
    createElement(r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    }
    createComment(r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    }
    createText(r, value, id) {
        this._renderStore.store(r.createText(value), id);
    }
    appendChild(r, parent, child) { r.appendChild(parent, child); }
    insertBefore(r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    }
    removeChild(r, parent, child) { r.removeChild(parent, child); }
    selectRootElement(r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    }
    parentNode(r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    }
    nextSibling(r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    }
    setAttribute(r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    }
    removeAttribute(r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    }
    addClass(r, el, name) { r.addClass(el, name); }
    removeClass(r, el, name) { r.removeClass(el, name); }
    setStyle(r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    }
    removeStyle(r, el, style, flags) {
        r.removeStyle(el, style, flags);
    }
    setProperty(r, el, name, value) {
        r.setProperty(el, name, value);
    }
    setValue(r, node, value) { r.setValue(node, value); }
    listen(r, el, elName, eventName, unlistenId) {
        const listener = (event) => {
            return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        };
        const unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    }
    unlisten(r, unlisten) { unlisten(); }
};
MessageBasedRenderer2 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ServiceMessageBrokerFactory, MessageBus,
        Serializer, RenderStore,
        RendererFactory2])
], MessageBasedRenderer2);

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
let WebWorkerInstance = class WebWorkerInstance {
    /** @internal */
    init(worker, bus) {
        this.worker = worker;
        this.bus = bus;
    }
};
WebWorkerInstance = __decorate([
    Injectable()
], WebWorkerInstance);
/**
 * @experimental WebWorker support is currently experimental.
 */
const WORKER_SCRIPT = new InjectionToken('WebWorkerScript');
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * @experimental WebWorker support is currently experimental.
 */
const WORKER_UI_STARTABLE_MESSAGING_SERVICE = new InjectionToken('WorkerRenderStartableMsgService');
const _WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: NgZone, useFactory: createNgZone, deps: [] },
    {
        provide: MessageBasedRenderer2,
        deps: [ServiceMessageBrokerFactory, MessageBus, Serializer, RenderStore, RendererFactory2]
    },
    { provide: WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: MessageBasedRenderer2, multi: true },
    ɵBROWSER_SANITIZATION_PROVIDERS,
    { provide: ErrorHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: ɵDomEventsPlugin,
        deps: [DOCUMENT, NgZone],
        multi: true
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: ɵKeyEventsPlugin, deps: [DOCUMENT], multi: true },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: ɵHammerGesturesPlugin,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG],
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
    { provide: ɵDomSharedStylesHost, deps: [DOCUMENT] },
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
function initializeGenericWorkerRenderer(injector) {
    const bus = injector.get(MessageBus);
    const zone = injector.get(NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    const services = injector.get(WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(() => { services.forEach((svc) => { svc.start(); }); });
}
function messageBusFactory(instance) {
    return instance.bus;
}
function initWebWorkerRenderPlatform(injector) {
    return () => {
        ɵBrowserDomAdapter.makeCurrent();
        ɵBrowserGetTestability.init();
        let scriptUri;
        try {
            scriptUri = injector.get(WORKER_SCRIPT);
        }
        catch (e) {
            throw new Error('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        const instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @experimental WebWorker support is currently experimental.
 */
const platformWorkerUi = createPlatformFactory(platformCore, 'workerUi', _WORKER_UI_PLATFORM_PROVIDERS);
function _exceptionHandler() {
    return new ErrorHandler();
}
function _document() {
    return document;
}
function createNgZone() {
    return new NgZone({ enableLongStackTrace: isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 */
function spawnWebWorker(uri, instance) {
    const webWorker = new Worker(uri);
    const sink = new PostMessageBusSink(webWorker);
    const source = new PostMessageBusSource(webWorker);
    const bus = new PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const VERSION = new Version('7.0.0-beta.5+51.sha-cbbad1b');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let MessageBasedPlatformLocation = class MessageBasedPlatformLocation {
    constructor(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(this._sendUrlChangeEvent.bind(this));
        this._platformLocation.onHashChange(this._sendUrlChangeEvent.bind(this));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    start() {
        const P = 1 /* PRIMITIVE */;
        this._broker.registerMethod('getLocation', null, this._getLocation.bind(this), LocationType);
        this._broker.registerMethod('setPathname', [P], this._setPathname.bind(this));
        this._broker.registerMethod('pushState', [P, P, P], this._platformLocation.pushState.bind(this._platformLocation));
        this._broker.registerMethod('replaceState', [P, P, P], this._platformLocation.replaceState.bind(this._platformLocation));
        this._broker.registerMethod('forward', null, this._platformLocation.forward.bind(this._platformLocation));
        this._broker.registerMethod('back', null, this._platformLocation.back.bind(this._platformLocation));
    }
    _getLocation() {
        return Promise.resolve(this._platformLocation.location);
    }
    _sendUrlChangeEvent(e) {
        this._channelSink.emit({
            'event': { 'type': e.type },
            'location': this._serializer.serialize(this._platformLocation.location, LocationType),
        });
    }
    _setPathname(pathname) { this._platformLocation.pathname = pathname; }
};
MessageBasedPlatformLocation = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ServiceMessageBrokerFactory,
        ɵBrowserPlatformLocation, MessageBus,
        Serializer])
], MessageBasedPlatformLocation);

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
const WORKER_UI_LOCATION_PROVIDERS = [
    { provide: MessageBasedPlatformLocation, deps: [ServiceMessageBrokerFactory,
            ɵBrowserPlatformLocation, MessageBus, Serializer] },
    { provide: ɵBrowserPlatformLocation, deps: [DOCUMENT$1] },
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
];
function initUiLocation(injector) {
    return () => {
        const zone = injector.get(NgZone);
        zone.runGuarded(() => injector.get(MessageBasedPlatformLocation).start());
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let WebWorkerPlatformLocation = class WebWorkerPlatformLocation extends PlatformLocation {
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
        this.initialized = new Promise(res => this.initializedResolve = res);
    }
    /** @internal **/
    init() {
        const args = new UiArguments('getLocation');
        return this._broker.runOnService(args, LocationType).then((val) => {
            this._location = val;
            this.initializedResolve();
            return true;
        }, err => { throw new Error(err); });
    }
    getBaseHrefFromDOM() {
        throw new Error('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    }
    onPopState(fn) { this._popStateListeners.push(fn); }
    onHashChange(fn) { this._hashChangeListeners.push(fn); }
    get pathname() { return this._location ? this._location.pathname : '<unknown>'; }
    get search() { return this._location ? this._location.search : '<unknown>'; }
    get hash() { return this._location ? this._location.hash : '<unknown>'; }
    set pathname(newPath) {
        if (this._location === null) {
            throw new Error('Attempt to set pathname before value is obtained from UI');
        }
        this._location.pathname = newPath;
        const fnArgs = [new FnArg(newPath, 1 /* PRIMITIVE */)];
        const args = new UiArguments('setPathname', fnArgs);
        this._broker.runOnService(args, null);
    }
    pushState(state, title, url) {
        const fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        const args = new UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    }
    replaceState(state, title, url) {
        const fnArgs = [
            new FnArg(state, 1 /* PRIMITIVE */),
            new FnArg(title, 1 /* PRIMITIVE */),
            new FnArg(url, 1 /* PRIMITIVE */),
        ];
        const args = new UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    }
    forward() {
        const args = new UiArguments('forward');
        this._broker.runOnService(args, null);
    }
    back() {
        const args = new UiArguments('back');
        this._broker.runOnService(args, null);
    }
};
WebWorkerPlatformLocation = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus, Serializer])
], WebWorkerPlatformLocation);

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
const WORKER_APP_LOCATION_PROVIDERS = [
    { provide: PlatformLocation, useClass: WebWorkerPlatformLocation }, {
        provide: APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [PlatformLocation, NgZone]
    },
    { provide: LOCATION_INITIALIZED, useFactory: locationInitialized, deps: [PlatformLocation] }
];
function locationInitialized(platformLocation) {
    return platformLocation.initialized;
}
function appInitFnFactory(platformLocation, zone) {
    return () => zone.runGuarded(() => platformLocation.init());
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class NamedEventEmitter {
    listen(eventName, callback) { this._getListeners(eventName).push(callback); }
    unlisten(eventName, listener) {
        const listeners = this._getListeners(eventName);
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    dispatchEvent(eventName, event) {
        const listeners = this._getListeners(eventName);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    }
    _getListeners(eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        let listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    }
}
function eventNameWithTarget(target, eventName) {
    return `${target}:${eventName}`;
}
let WebWorkerRendererFactory2 = class WebWorkerRendererFactory2 {
    constructor(messageBrokerFactory, bus, _serializer, renderStore) {
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        const source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: (message) => this._dispatchEvent(message) });
    }
    createRenderer(element, type) {
        const renderer = new WebWorkerRenderer2(this);
        const id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    }
    begin() { }
    end() { }
    callUI(fnName, fnArgs) {
        const args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    }
    allocateNode() {
        const result = new WebWorkerRenderNode();
        const id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    }
    freeNode(node) { this.renderStore.remove(node); }
    allocateId() { return this.renderStore.allocateId(); }
    _dispatchEvent(message) {
        const element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        const eventName = message['eventName'];
        const target = message['eventTarget'];
        const event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    }
};
WebWorkerRendererFactory2 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus,
        Serializer, RenderStore])
], WebWorkerRendererFactory2);
class WebWorkerRenderer2 {
    constructor(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    destroy() { this.callUIWithRenderer('destroy'); }
    destroyNode(node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    }
    createElement(name, namespace) {
        const node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    createComment(value) {
        const node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    createText(value) {
        const node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    appendChild(parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
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
    removeChild(parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    }
    selectRootElement(selectorOrNode) {
        const node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    }
    parentNode(node) {
        const res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    nextSibling(node) {
        const res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    }
    setAttribute(el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    }
    removeAttribute(el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    }
    addClass(el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    removeClass(el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    }
    setStyle(el, style, value, flags) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(flags),
        ]);
    }
    removeStyle(el, style, flags) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(flags),
        ]);
    }
    setProperty(el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    }
    setValue(node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    }
    listen(target, eventName, listener) {
        const unlistenId = this._rendererFactory.allocateId();
        const [targetEl, targetName, fullName] = typeof target === 'string' ? [null, target, `${target}:${eventName}`] :
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
    callUIWithRenderer(fnName, fnArgs = []) {
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, [this.asFnArg, ...fnArgs]);
    }
}
class WebWorkerRenderNode {
    constructor() {
        this.events = new NamedEventEmitter();
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
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
class WorkerDomAdapter extends ɵDomAdapter {
    static makeCurrent() { ɵsetRootDomAdapter(new WorkerDomAdapter()); }
    logError(error) {
        if (console.error) {
            console.error(error);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }
    log(error) {
        // tslint:disable-next-line:no-console
        console.log(error);
    }
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
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    contains(nodeA, nodeB) { throw 'not implemented'; }
    hasProperty(element, name) { throw 'not implemented'; }
    setProperty(el, name, value) { throw 'not implemented'; }
    getProperty(el, name) { throw 'not implemented'; }
    invoke(el, methodName, args) { throw 'not implemented'; }
    get attrToPropMap() { throw 'not implemented'; }
    set attrToPropMap(value) { throw 'not implemented'; }
    parse(templateHtml) { throw 'not implemented'; }
    querySelector(el, selector) { throw 'not implemented'; }
    querySelectorAll(el, selector) { throw 'not implemented'; }
    on(el, evt, listener) { throw 'not implemented'; }
    onAndCancel(el, evt, listener) { throw 'not implemented'; }
    dispatchEvent(el, evt) { throw 'not implemented'; }
    createMouseEvent(eventType) { throw 'not implemented'; }
    createEvent(eventType) { throw 'not implemented'; }
    preventDefault(evt) { throw 'not implemented'; }
    isPrevented(evt) { throw 'not implemented'; }
    getInnerHTML(el) { throw 'not implemented'; }
    getTemplateContent(el) { throw 'not implemented'; }
    getOuterHTML(el) { throw 'not implemented'; }
    nodeName(node) { throw 'not implemented'; }
    nodeValue(node) { throw 'not implemented'; }
    type(node) { throw 'not implemented'; }
    content(node) { throw 'not implemented'; }
    firstChild(el) { throw 'not implemented'; }
    nextSibling(el) { throw 'not implemented'; }
    parentElement(el) { throw 'not implemented'; }
    childNodes(el) { throw 'not implemented'; }
    childNodesAsList(el) { throw 'not implemented'; }
    clearNodes(el) { throw 'not implemented'; }
    appendChild(el, node) { throw 'not implemented'; }
    removeChild(el, node) { throw 'not implemented'; }
    replaceChild(el, newNode, oldNode) { throw 'not implemented'; }
    remove(el) { throw 'not implemented'; }
    insertBefore(parent, el, node) { throw 'not implemented'; }
    insertAllBefore(parent, el, nodes) { throw 'not implemented'; }
    insertAfter(parent, el, node) { throw 'not implemented'; }
    setInnerHTML(el, value) { throw 'not implemented'; }
    getText(el) { throw 'not implemented'; }
    setText(el, value) { throw 'not implemented'; }
    getValue(el) { throw 'not implemented'; }
    setValue(el, value) { throw 'not implemented'; }
    getChecked(el) { throw 'not implemented'; }
    setChecked(el, value) { throw 'not implemented'; }
    createComment(text) { throw 'not implemented'; }
    createTemplate(html) { throw 'not implemented'; }
    createElement(tagName, doc) { throw 'not implemented'; }
    createElementNS(ns, tagName, doc) { throw 'not implemented'; }
    createTextNode(text, doc) { throw 'not implemented'; }
    createScriptTag(attrName, attrValue, doc) {
        throw 'not implemented';
    }
    createStyleElement(css, doc) { throw 'not implemented'; }
    createShadowRoot(el) { throw 'not implemented'; }
    getShadowRoot(el) { throw 'not implemented'; }
    getHost(el) { throw 'not implemented'; }
    getDistributedNodes(el) { throw 'not implemented'; }
    clone(node) { throw 'not implemented'; }
    getElementsByClassName(element, name) { throw 'not implemented'; }
    getElementsByTagName(element, name) { throw 'not implemented'; }
    classList(element) { throw 'not implemented'; }
    addClass(element, className) { throw 'not implemented'; }
    removeClass(element, className) { throw 'not implemented'; }
    hasClass(element, className) { throw 'not implemented'; }
    setStyle(element, styleName, styleValue) { throw 'not implemented'; }
    removeStyle(element, styleName) { throw 'not implemented'; }
    getStyle(element, styleName) { throw 'not implemented'; }
    hasStyle(element, styleName, styleValue) {
        throw 'not implemented';
    }
    tagName(element) { throw 'not implemented'; }
    attributeMap(element) { throw 'not implemented'; }
    hasAttribute(element, attribute) { throw 'not implemented'; }
    hasAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    getAttribute(element, attribute) { throw 'not implemented'; }
    getAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    setAttribute(element, name, value) { throw 'not implemented'; }
    setAttributeNS(element, ns, name, value) { throw 'not implemented'; }
    removeAttribute(element, attribute) { throw 'not implemented'; }
    removeAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    templateAwareRoot(el) { throw 'not implemented'; }
    createHtmlDocument() { throw 'not implemented'; }
    getDefaultDocument() { throw 'not implemented'; }
    getBoundingClientRect(el) { throw 'not implemented'; }
    getTitle(doc) { throw 'not implemented'; }
    setTitle(doc, newTitle) { throw 'not implemented'; }
    elementMatches(n, selector) { throw 'not implemented'; }
    isTemplateElement(el) { throw 'not implemented'; }
    isTextNode(node) { throw 'not implemented'; }
    isCommentNode(node) { throw 'not implemented'; }
    isElementNode(node) { throw 'not implemented'; }
    hasShadowRoot(node) { throw 'not implemented'; }
    isShadowRoot(node) { throw 'not implemented'; }
    importIntoDoc(node) { throw 'not implemented'; }
    adoptNode(node) { throw 'not implemented'; }
    getHref(element) { throw 'not implemented'; }
    getEventKey(event) { throw 'not implemented'; }
    resolveAndSetHref(element, baseUrl, href) { throw 'not implemented'; }
    supportsDOMEvents() { throw 'not implemented'; }
    supportsNativeShadowDOM() { throw 'not implemented'; }
    getGlobalEventTarget(doc, target) { throw 'not implemented'; }
    getHistory() { throw 'not implemented'; }
    getLocation() { throw 'not implemented'; }
    getBaseHref(doc) { throw 'not implemented'; }
    resetBaseElement() { throw 'not implemented'; }
    getUserAgent() { return 'Fake user agent'; }
    setData(element, name, value) { throw 'not implemented'; }
    getComputedStyle(element) { throw 'not implemented'; }
    getData(element, name) { throw 'not implemented'; }
    performanceNow() { throw 'not implemented'; }
    getAnimationPrefix() { throw 'not implemented'; }
    getTransitionEnd() { throw 'not implemented'; }
    supportsAnimation() { throw 'not implemented'; }
    supportsWebAnimation() { throw 'not implemented'; }
    supportsCookies() { return false; }
    getCookie(name) { throw 'not implemented'; }
    setCookie(name, value) { throw 'not implemented'; }
}

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
const platformWorkerApp = createPlatformFactory(platformCore, 'workerApp', [{ provide: PLATFORM_ID, useValue: ɵPLATFORM_WORKER_APP_ID }]);
function errorHandler() {
    return new ErrorHandler();
}
// TODO(jteplitz602): remove this and compile with lib.webworker.d.ts (#3492)
const _postMessage = {
    postMessage: (message, transferrables) => {
        postMessage(message, transferrables);
    }
};
function createMessageBus(zone) {
    const sink = new PostMessageBusSink(_postMessage);
    const source = new PostMessageBusSource();
    const bus = new PostMessageBus(sink, source);
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
let WorkerAppModule = class WorkerAppModule {
};
WorkerAppModule = __decorate([
    NgModule({
        providers: [
            ɵBROWSER_SANITIZATION_PROVIDERS,
            Serializer,
            { provide: DOCUMENT, useValue: null },
            ClientMessageBrokerFactory,
            ServiceMessageBrokerFactory,
            WebWorkerRendererFactory2,
            { provide: RendererFactory2, useExisting: WebWorkerRendererFactory2 },
            { provide: ON_WEB_WORKER, useValue: true },
            RenderStore,
            { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
            { provide: MessageBus, useFactory: createMessageBus, deps: [NgZone] },
            { provide: APP_INITIALIZER, useValue: setupWebWorker, multi: true },
            { provide: ViewportScroller, useClass: ɵNullViewportScroller, deps: [] },
        ],
        exports: [
            CommonModule,
            ApplicationModule,
        ]
    })
], WorkerAppModule);

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
function bootstrapWorkerUi(workerScriptUri, customProviders = []) {
    // For now, just creates the worker ui platform...
    const platform = platformWorkerUi([
        { provide: WORKER_SCRIPT, useValue: workerScriptUri },
        ...customProviders,
    ]);
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

export { bootstrapWorkerUi, VERSION, ClientMessageBroker, ClientMessageBrokerFactory, FnArg, UiArguments, MessageBus, ServiceMessageBroker, ServiceMessageBrokerFactory, WORKER_UI_LOCATION_PROVIDERS, WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule, platformWorkerApp, platformWorkerUi };
//# sourceMappingURL=platform-webworker.js.map
