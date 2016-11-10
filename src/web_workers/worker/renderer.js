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
    WebWorkerRootRenderer.prototype._dispatchEvent = function (message) {
        var element = this._serializer.deserialize(message['element'], RenderStoreObject);
        var playerData = message['animationPlayer'];
        if (playerData) {
            var phaseName = message['phaseName'];
            var player = this._serializer.deserialize(playerData, RenderStoreObject);
            element.animationPlayerEvents.dispatchEvent(player, phaseName);
        }
        else {
            var eventName = message['eventName'];
            var target = message['eventTarget'];
            var event = deserializeGenericEvent(message['event']);
            if (isPresent(target)) {
                this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
            }
            else {
                element.events.dispatchEvent(eventName, event);
            }
        }
    };
    WebWorkerRootRenderer.prototype.renderComponent = function (componentType) {
        var result = this._componentRenderers.get(componentType.id);
        if (!result) {
            result = new WebWorkerRenderer(this, componentType);
            this._componentRenderers.set(componentType.id, result);
            var id = this.renderStore.allocateId();
            this.renderStore.store(result, id);
            this.runOnService('renderComponent', [
                new FnArg(componentType, RenderComponentType),
                new FnArg(result, RenderStoreObject),
            ]);
        }
        return result;
    };
    WebWorkerRootRenderer.prototype.runOnService = function (fnName, fnArgs) {
        var args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    WebWorkerRootRenderer.prototype.allocateNode = function () {
        var result = new WebWorkerRenderNode();
        var id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    };
    WebWorkerRootRenderer.prototype.allocateId = function () { return this.renderStore.allocateId(); };
    WebWorkerRootRenderer.prototype.destroyNodes = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.renderStore.remove(nodes[i]);
        }
    };
    WebWorkerRootRenderer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerRootRenderer.ctorParameters = [
        { type: ClientMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
    ];
    return WebWorkerRootRenderer;
}());
export var WebWorkerRenderer = (function () {
    function WebWorkerRenderer(_rootRenderer, _componentType) {
        this._rootRenderer = _rootRenderer;
        this._componentType = _componentType;
    }
    WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
        var fnArgsWithRenderer = [new FnArg(this, RenderStoreObject)].concat(fnArgs);
        this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
    };
    WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('selectRootElement', [new FnArg(selectorOrNode, null), new FnArg(node, RenderStoreObject)]);
        return node;
    };
    WebWorkerRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createElement', [
            new FnArg(parentElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(node, RenderStoreObject)
        ]);
        return node;
    };
    WebWorkerRenderer.prototype.createViewRoot = function (hostElement) {
        var viewRoot = this._componentType.encapsulation === ViewEncapsulation.Native ?
            this._rootRenderer.allocateNode() :
            hostElement;
        this._runOnService('createViewRoot', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewRoot, RenderStoreObject)]);
        return viewRoot;
    };
    WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createTemplateAnchor', [new FnArg(parentElement, RenderStoreObject), new FnArg(node, RenderStoreObject)]);
        return node;
    };
    WebWorkerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createText', [
            new FnArg(parentElement, RenderStoreObject), new FnArg(value, null),
            new FnArg(node, RenderStoreObject)
        ]);
        return node;
    };
    WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
        this._runOnService('projectNodes', [new FnArg(parentElement, RenderStoreObject), new FnArg(nodes, RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        this._runOnService('attachViewAfter', [new FnArg(node, RenderStoreObject), new FnArg(viewRootNodes, RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
        this._runOnService('detachView', [new FnArg(viewRootNodes, RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        this._runOnService('destroyView', [new FnArg(hostElement, RenderStoreObject), new FnArg(viewAllNodes, RenderStoreObject)]);
        this._rootRenderer.destroyNodes(viewAllNodes);
    };
    WebWorkerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        this._runOnService('setElementProperty', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        this._runOnService('setElementAttribute', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(attributeName, null),
            new FnArg(attributeValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._runOnService('setBindingDebugInfo', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(propertyName, null),
            new FnArg(propertyValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        this._runOnService('setElementClass', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(className, null),
            new FnArg(isAdd, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        this._runOnService('setElementStyle', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(styleName, null),
            new FnArg(styleValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._runOnService('invokeElementMethod', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(methodName, null),
            new FnArg(args, null)
        ]);
    };
    WebWorkerRenderer.prototype.setText = function (renderNode, text) {
        this._runOnService('setText', [new FnArg(renderNode, RenderStoreObject), new FnArg(text, null)]);
    };
    WebWorkerRenderer.prototype.listen = function (renderElement, name, callback) {
        var _this = this;
        renderElement.events.listen(name, callback);
        var unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listen', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(name, null),
            new FnArg(unlistenCallbackId, null)
        ]);
        return function () {
            renderElement.events.unlisten(name, callback);
            _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
        };
    };
    WebWorkerRenderer.prototype.listenGlobal = function (target, name, callback) {
        var _this = this;
        this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
        var unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listenGlobal', [new FnArg(target, null), new FnArg(name, null), new FnArg(unlistenCallbackId, null)]);
        return function () {
            _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
            _this._runOnService('listenDone', [new FnArg(unlistenCallbackId, null)]);
        };
    };
    WebWorkerRenderer.prototype.animate = function (renderElement, startingStyles, keyframes, duration, delay, easing) {
        var playerId = this._rootRenderer.allocateId();
        this._runOnService('animate', [
            new FnArg(renderElement, RenderStoreObject), new FnArg(startingStyles, null),
            new FnArg(keyframes, null), new FnArg(duration, null), new FnArg(delay, null),
            new FnArg(easing, null), new FnArg(playerId, null)
        ]);
        var player = new _AnimationWorkerRendererPlayer(this._rootRenderer, renderElement);
        this._rootRenderer.renderStore.store(player, playerId);
        return player;
    };
    return WebWorkerRenderer;
}());
export var NamedEventEmitter = (function () {
    function NamedEventEmitter() {
    }
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
    NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
    NamedEventEmitter.prototype.unlisten = function (eventName, callback) {
        ListWrapper.remove(this._getListeners(eventName), callback);
    };
    NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
        var listeners = this._getListeners(eventName);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    return NamedEventEmitter;
}());
export var AnimationPlayerEmitter = (function () {
    function AnimationPlayerEmitter() {
    }
    AnimationPlayerEmitter.prototype._getListeners = function (player, phaseName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        var phaseMap = this._listeners.get(player);
        if (!phaseMap) {
            this._listeners.set(player, phaseMap = {});
        }
        var phaseFns = phaseMap[phaseName];
        if (!phaseFns) {
            phaseFns = phaseMap[phaseName] = [];
        }
        return phaseFns;
    };
    AnimationPlayerEmitter.prototype.listen = function (player, phaseName, callback) {
        this._getListeners(player, phaseName).push(callback);
    };
    AnimationPlayerEmitter.prototype.unlisten = function (player) { this._listeners.delete(player); };
    AnimationPlayerEmitter.prototype.dispatchEvent = function (player, phaseName) {
        var listeners = this._getListeners(player, phaseName);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    };
    return AnimationPlayerEmitter;
}());
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
var _AnimationWorkerRendererPlayer = (function () {
    function _AnimationWorkerRendererPlayer(_rootRenderer, _renderElement) {
        this._rootRenderer = _rootRenderer;
        this._renderElement = _renderElement;
        this.parentPlayer = null;
        this._destroyed = false;
        this._started = false;
    }
    _AnimationWorkerRendererPlayer.prototype._runOnService = function (fnName, fnArgs) {
        if (!this._destroyed) {
            var fnArgsWithRenderer = [
                new FnArg(this, RenderStoreObject), new FnArg(this._renderElement, RenderStoreObject)
            ].concat(fnArgs);
            this._rootRenderer.runOnService(ANIMATION_WORKER_PLAYER_PREFIX + fnName, fnArgsWithRenderer);
        }
    };
    _AnimationWorkerRendererPlayer.prototype.onStart = function (fn) {
        this._renderElement.animationPlayerEvents.listen(this, 'onStart', fn);
        this._runOnService('onStart', []);
    };
    _AnimationWorkerRendererPlayer.prototype.onDone = function (fn) {
        this._renderElement.animationPlayerEvents.listen(this, 'onDone', fn);
        this._runOnService('onDone', []);
    };
    _AnimationWorkerRendererPlayer.prototype.hasStarted = function () { return this._started; };
    _AnimationWorkerRendererPlayer.prototype.init = function () { this._runOnService('init', []); };
    _AnimationWorkerRendererPlayer.prototype.play = function () {
        this._started = true;
        this._runOnService('play', []);
    };
    _AnimationWorkerRendererPlayer.prototype.pause = function () { this._runOnService('pause', []); };
    _AnimationWorkerRendererPlayer.prototype.restart = function () { this._runOnService('restart', []); };
    _AnimationWorkerRendererPlayer.prototype.finish = function () { this._runOnService('finish', []); };
    _AnimationWorkerRendererPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._renderElement.animationPlayerEvents.unlisten(this);
            this._runOnService('destroy', []);
            this._rootRenderer.renderStore.remove(this);
            this._destroyed = true;
        }
    };
    _AnimationWorkerRendererPlayer.prototype.reset = function () { this._runOnService('reset', []); };
    _AnimationWorkerRendererPlayer.prototype.setPosition = function (p) { this._runOnService('setPosition', [new FnArg(p, null)]); };
    _AnimationWorkerRendererPlayer.prototype.getPosition = function () { return 0; };
    return _AnimationWorkerRendererPlayer;
}());
//# sourceMappingURL=renderer.js.map