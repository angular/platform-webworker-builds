/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, EVENT_V2_CHANNEL, RENDERER_CHANNEL, RENDERER_V2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, Serializer } from '../shared/serializer';
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
export { NamedEventEmitter };
function NamedEventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    NamedEventEmitter.prototype._listeners;
}
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
                new FnArg(componentType, RenderComponentType),
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
export { WebWorkerRootRenderer };
WebWorkerRootRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerRootRenderer.ctorParameters = function () { return [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
]; };
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
        var /** @type {?} */ viewRoot = this._componentType.encapsulation === ViewEncapsulation.Native ?
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
export { WebWorkerRenderer };
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
export { WebWorkerRendererFactoryV2 };
WebWorkerRendererFactoryV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerRendererFactoryV2.ctorParameters = function () { return [
    { type: ClientMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
]; };
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
export { WebWorkerRendererV2 };
function WebWorkerRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRendererV2.prototype.asFnArg;
    /** @type {?} */
    WebWorkerRendererV2.prototype._rendererFactory;
}
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
export { AnimationPlayerEmitter };
function AnimationPlayerEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationPlayerEmitter.prototype._listeners;
}
var WebWorkerRenderNode = (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
        this.animationPlayerEvents = new AnimationPlayerEmitter();
    }
    return WebWorkerRenderNode;
}());
export { WebWorkerRenderNode };
function WebWorkerRenderNode_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderNode.prototype.events;
    /** @type {?} */
    WebWorkerRenderNode.prototype.animationPlayerEvents;
}
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