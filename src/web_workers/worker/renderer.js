/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core';
import { ListWrapper } from '../../facade/collection';
import { isPresent } from '../../facade/lang';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, RenderStoreObject, Serializer } from '../shared/serializer';
import { deserializeGenericEvent } from './event_deserializer';
export var WebWorkerRootRenderer = (function () {
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
        var /** @type {?} */ element = (this._serializer.deserialize(message['element'], RenderStoreObject));
        var /** @type {?} */ playerData = message['animationPlayer'];
        if (playerData) {
            var /** @type {?} */ phaseName = message['phaseName'];
            var /** @type {?} */ player = (this._serializer.deserialize(playerData, RenderStoreObject));
            element.animationPlayerEvents.dispatchEvent(player, phaseName);
        }
        else {
            var /** @type {?} */ eventName = message['eventName'];
            var /** @type {?} */ target = message['eventTarget'];
            var /** @type {?} */ event_1 = deserializeGenericEvent(message['event']);
            if (isPresent(target)) {
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
                new FnArg(result, RenderStoreObject),
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
    return WebWorkerRootRenderer;
}());
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
export var WebWorkerRenderer = (function () {
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
        var /** @type {?} */ fnArgsWithRenderer = [new FnArg(this, RenderStoreObject)].concat(fnArgs);
        this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
    };
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('selectRootElement', [new FnArg(selectorOrNode, null), new FnArg(node, RenderStoreObject)]);
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
            new FnArg(parentElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(node, RenderStoreObject)
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
        this._runOnService('createViewRoot', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewRoot, RenderStoreObject)]);
        return viewRoot;
    };
    /**
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var /** @type {?} */ node = this._rootRenderer.allocateNode();
        this._runOnService('createTemplateAnchor', [new FnArg(parentElement, RenderStoreObject), new FnArg(node, RenderStoreObject)]);
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
            new FnArg(parentElement, RenderStoreObject), new FnArg(value, null),
            new FnArg(node, RenderStoreObject)
        ]);
        return node;
    };
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
        this._runOnService('projectNodes', [new FnArg(parentElement, RenderStoreObject), new FnArg(nodes, RenderStoreObject)]);
    };
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        this._runOnService('attachViewAfter', [new FnArg(node, RenderStoreObject), new FnArg(viewRootNodes, RenderStoreObject)]);
    };
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
        this._runOnService('detachView', [new FnArg(viewRootNodes, RenderStoreObject)]);
    };
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        this._runOnService('destroyView', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewAllNodes, RenderStoreObject)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(attributeName, null),
            new FnArg(attributeValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(className, null),
            new FnArg(isAdd, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(styleName, null),
            new FnArg(styleValue, null)
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(methodName, null),
            new FnArg(args, null)
        ]);
    };
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    WebWorkerRenderer.prototype.setText = function (renderNode, text) {
        this._runOnService('setText', [new FnArg(renderNode, RenderStoreObject), new FnArg(text, null)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(unlistenCallbackId, null)
        ]);
        return function () {
            renderElement.events.unlisten(name, callback);
            _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
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
        this._runOnService('listenGlobal', [new FnArg(target, null), new FnArg(name, null), new FnArg(unlistenCallbackId, null)]);
        return function () {
            _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
            _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
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
            new FnArg(renderElement, RenderStoreObject), new FnArg(startingStyles, null),
            new FnArg(keyframes, null), new FnArg(duration, null), new FnArg(delay, null),
            new FnArg(easing, null), new FnArg(previousPlayerIds, null), new FnArg(playerId, null)
        ]);
        var /** @type {?} */ player = new _AnimationWorkerRendererPlayer(this._rootRenderer, renderElement);
        this._rootRenderer.renderStore.store(player, playerId);
        return player;
    };
    return WebWorkerRenderer;
}());
function WebWorkerRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebWorkerRenderer.prototype._rootRenderer;
    /** @type {?} */
    WebWorkerRenderer.prototype._componentType;
}
export var NamedEventEmitter = (function () {
    function NamedEventEmitter() {
    }
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
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    NamedEventEmitter.prototype.unlisten = function (eventName, callback) {
        ListWrapper.remove(this._getListeners(eventName), callback);
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
    return NamedEventEmitter;
}());
function NamedEventEmitter_tsickle_Closure_declarations() {
    /** @type {?} */
    NamedEventEmitter.prototype._listeners;
}
export var AnimationPlayerEmitter = (function () {
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
    return target + ":" + eventName;
}
export var WebWorkerRenderNode = (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
        this.animationPlayerEvents = new AnimationPlayerEmitter();
    }
    return WebWorkerRenderNode;
}());
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
                new FnArg(this, RenderStoreObject), new FnArg(this._renderElement, RenderStoreObject)
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
    _AnimationWorkerRendererPlayer.prototype.setPosition = function (p) { this._runOnService('setPosition', [new FnArg(p, null)]); };
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