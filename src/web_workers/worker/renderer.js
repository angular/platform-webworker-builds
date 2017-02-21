/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core/index';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, EVENT_V2_CHANNEL, RENDERER_CHANNEL, RENDERER_V2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, Serializer } from '../shared/serializer';
export class NamedEventEmitter {
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
function NamedEventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    NamedEventEmitter.prototype._listeners;
}
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
function WebWorkerRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRootRenderer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WebWorkerRootRenderer.ctorParameters;
    /** @type {?} */
    WebWorkerRootRenderer.prototype.globalEvents;
    /** @type {?} */
    WebWorkerRootRenderer.prototype._messageBroker;
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
function WebWorkerRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderer.prototype._rootRenderer;
    /** @type {?} */
    WebWorkerRenderer.prototype._componentType;
}
/**
 * @param {?} target
 * @param {?} eventName
 * @return {?}
 */
function eventNameWithTarget(target, eventName) {
    return `${target}:${eventName}`;
}
export class WebWorkerRendererFactoryV2 {
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
function WebWorkerRendererFactoryV2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRendererFactoryV2.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    WebWorkerRendererFactoryV2.ctorParameters;
    /** @type {?} */
    WebWorkerRendererFactoryV2.prototype.globalEvents;
    /** @type {?} */
    WebWorkerRendererFactoryV2.prototype._messageBroker;
    /** @type {?} */
    WebWorkerRendererFactoryV2.prototype._serializer;
    /** @type {?} */
    WebWorkerRendererFactoryV2.prototype.renderStore;
}
export class WebWorkerRendererV2 {
    /**
     * @param {?} _rendererFactory
     */
    constructor(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
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
function WebWorkerRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRendererV2.prototype.asFnArg;
    /** @type {?} */
    WebWorkerRendererV2.prototype._rendererFactory;
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