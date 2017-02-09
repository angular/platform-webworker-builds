/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core/index';
import { ListWrapper } from '../../facade/collection';
import { isPresent } from '../../facade/lang';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, RenderStoreObject, Serializer } from '../shared/serializer';
import { deserializeGenericEvent } from './event_deserializer';
export class WebWorkerRootRenderer {
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
    }
    /**
     * @param {?} message
     * @return {?}
     */
    _dispatchEvent(message) {
        const /** @type {?} */ element = (this._serializer.deserialize(message['element'], RenderStoreObject));
        const /** @type {?} */ playerData = message['animationPlayer'];
        if (playerData) {
            const /** @type {?} */ phaseName = message['phaseName'];
            const /** @type {?} */ player = (this._serializer.deserialize(playerData, RenderStoreObject));
            element.animationPlayerEvents.dispatchEvent(player, phaseName);
        }
        else {
            const /** @type {?} */ eventName = message['eventName'];
            const /** @type {?} */ target = message['eventTarget'];
            const /** @type {?} */ event = deserializeGenericEvent(message['event']);
            if (isPresent(target)) {
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
                new FnArg(result, RenderStoreObject),
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
function WebWorkerRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRootRenderer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WebWorkerRootRenderer.ctorParameters;
    /** @type {?} */
    WebWorkerRootRenderer.prototype._messageBroker;
    /** @type {?} */
    WebWorkerRootRenderer.prototype.globalEvents;
    /** @type {?} */
    WebWorkerRootRenderer.prototype._componentRenderers;
    /** @type {?} */
    WebWorkerRootRenderer.prototype._serializer;
    /** @type {?} */
    WebWorkerRootRenderer.prototype.renderStore;
}
export class WebWorkerRenderer {
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
        const /** @type {?} */ fnArgsWithRenderer = [new FnArg(this, RenderStoreObject)].concat(fnArgs);
        this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('selectRootElement', [new FnArg(selectorOrNode, null), new FnArg(node, RenderStoreObject)]);
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
            new FnArg(parentElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(node, RenderStoreObject)
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
        this._runOnService('createViewRoot', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewRoot, RenderStoreObject)]);
        return viewRoot;
    }
    /**
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('createTemplateAnchor', [new FnArg(parentElement, RenderStoreObject), new FnArg(node, RenderStoreObject)]);
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
            new FnArg(parentElement, RenderStoreObject), new FnArg(value, null),
            new FnArg(node, RenderStoreObject)
        ]);
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        this._runOnService('projectNodes', [new FnArg(parentElement, RenderStoreObject), new FnArg(nodes, RenderStoreObject)]);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        this._runOnService('attachViewAfter', [new FnArg(node, RenderStoreObject), new FnArg(viewRootNodes, RenderStoreObject)]);
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        this._runOnService('detachView', [new FnArg(viewRootNodes, RenderStoreObject)]);
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        this._runOnService('destroyView', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewAllNodes, RenderStoreObject)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(attributeName, null),
            new FnArg(attributeValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(className, null),
            new FnArg(isAdd, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(styleName, null),
            new FnArg(styleValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(methodName, null),
            new FnArg(args, null)
        ]);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) {
        this._runOnService('setText', [new FnArg(renderNode, RenderStoreObject), new FnArg(text, null)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(unlistenCallbackId, null)
        ]);
        return () => {
            renderElement.events.unlisten(name, callback);
            this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
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
        this._runOnService('listenGlobal', [new FnArg(target, null), new FnArg(name, null), new FnArg(unlistenCallbackId, null)]);
        return () => {
            this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
            this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(startingStyles, null),
            new FnArg(keyframes, null), new FnArg(duration, null), new FnArg(delay, null),
            new FnArg(easing, null), new FnArg(previousPlayerIds, null), new FnArg(playerId, null)
        ]);
        const /** @type {?} */ player = new _AnimationWorkerRendererPlayer(this._rootRenderer, renderElement);
        this._rootRenderer.renderStore.store(player, playerId);
        return player;
    }
}
function WebWorkerRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderer.prototype._rootRenderer;
    /** @type {?} */
    WebWorkerRenderer.prototype._componentType;
}
export class NamedEventEmitter {
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
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(eventName, callback) { this._getListeners(eventName).push(callback); }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    unlisten(eventName, callback) {
        ListWrapper.remove(this._getListeners(eventName), callback);
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
}
function NamedEventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    NamedEventEmitter.prototype._listeners;
}
export class AnimationPlayerEmitter {
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
function AnimationPlayerEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationPlayerEmitter.prototype._listeners;
}
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */
function eventNameWithTarget(target, eventName) {
    return `${target}:${eventName}`;
}
export class WebWorkerRenderNode {
    constructor() {
        this.events = new NamedEventEmitter();
        this.animationPlayerEvents = new AnimationPlayerEmitter();
    }
}
function WebWorkerRenderNode_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderNode.prototype.events;
    /** @type {?} */
    WebWorkerRenderNode.prototype.animationPlayerEvents;
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
                new FnArg(this, RenderStoreObject), new FnArg(this._renderElement, RenderStoreObject)
            ].concat(fnArgs);
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
    setPosition(p) { this._runOnService('setPosition', [new FnArg(p, null)]); }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
}
function _AnimationWorkerRendererPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    _AnimationWorkerRendererPlayer.prototype.parentPlayer;
    /** @type {?} */
    _AnimationWorkerRendererPlayer.prototype._destroyed;
    /** @type {?} */
    _AnimationWorkerRendererPlayer.prototype._started;
    /** @type {?} */
    _AnimationWorkerRendererPlayer.prototype._rootRenderer;
    /** @type {?} */
    _AnimationWorkerRendererPlayer.prototype._renderElement;
}
//# sourceMappingURL=renderer.js.map