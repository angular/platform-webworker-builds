/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, RendererFactoryV2, RootRenderer } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, EVENT_V2_CHANNEL, RENDERER_CHANNEL, RENDERER_V2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
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
            RenderComponentType,
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
export { MessageBasedRenderer };
MessageBasedRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedRenderer.ctorParameters = function () { return [
    { type: ServiceMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
    { type: RootRenderer, },
]; };
function MessageBasedRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageBasedRenderer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MessageBasedRenderer.ctorParameters;
    /** @type {?} */
    MessageBasedRenderer.prototype._eventDispatcher;
    /** @type {?} */
    MessageBasedRenderer.prototype._brokerFactory;
    /** @type {?} */
    MessageBasedRenderer.prototype._bus;
    /** @type {?} */
    MessageBasedRenderer.prototype._serializer;
    /** @type {?} */
    MessageBasedRenderer.prototype._renderStore;
    /** @type {?} */
    MessageBasedRenderer.prototype._rootRenderer;
}
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
export { MessageBasedRendererV2 };
MessageBasedRendererV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MessageBasedRendererV2.ctorParameters = function () { return [
    { type: ServiceMessageBrokerFactory, },
    { type: MessageBus, },
    { type: Serializer, },
    { type: RenderStore, },
    { type: RendererFactoryV2, },
]; };
function MessageBasedRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageBasedRendererV2.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MessageBasedRendererV2.ctorParameters;
    /** @type {?} */
    MessageBasedRendererV2.prototype._eventDispatcher;
    /** @type {?} */
    MessageBasedRendererV2.prototype._brokerFactory;
    /** @type {?} */
    MessageBasedRendererV2.prototype._bus;
    /** @type {?} */
    MessageBasedRendererV2.prototype._serializer;
    /** @type {?} */
    MessageBasedRendererV2.prototype._renderStore;
    /** @type {?} */
    MessageBasedRendererV2.prototype._rendererFactory;
}
//# sourceMappingURL=renderer.js.map