/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, RootRenderer } from '@angular/core/index';
import { MessageBus } from '../shared/message_bus';
import { EVENT_CHANNEL, RENDERER_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { ANIMATION_WORKER_PLAYER_PREFIX, PRIMITIVE, RenderStoreObject, Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
export class MessageBasedRenderer {
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
        broker.registerMethod('renderComponent', [RenderComponentType, PRIMITIVE], this._renderComponent.bind(this));
        broker.registerMethod('selectRootElement', [RenderStoreObject, PRIMITIVE, PRIMITIVE], this._selectRootElement.bind(this));
        broker.registerMethod('createElement', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._createElement.bind(this));
        broker.registerMethod('createViewRoot', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._createViewRoot.bind(this));
        broker.registerMethod('createTemplateAnchor', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._createTemplateAnchor.bind(this));
        broker.registerMethod('createText', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._createText.bind(this));
        broker.registerMethod('projectNodes', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._projectNodes.bind(this));
        broker.registerMethod('attachViewAfter', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._attachViewAfter.bind(this));
        broker.registerMethod('detachView', [RenderStoreObject, RenderStoreObject], this._detachView.bind(this));
        broker.registerMethod('destroyView', [RenderStoreObject, RenderStoreObject, RenderStoreObject], this._destroyView.bind(this));
        broker.registerMethod('setElementProperty', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementProperty.bind(this));
        broker.registerMethod('setElementAttribute', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementAttribute.bind(this));
        broker.registerMethod('setBindingDebugInfo', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setBindingDebugInfo.bind(this));
        broker.registerMethod('setElementClass', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementClass.bind(this));
        broker.registerMethod('setElementStyle', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._setElementStyle.bind(this));
        broker.registerMethod('invokeElementMethod', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._invokeElementMethod.bind(this));
        broker.registerMethod('setText', [RenderStoreObject, RenderStoreObject, PRIMITIVE], this._setText.bind(this));
        broker.registerMethod('listen', [RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE], this._listen.bind(this));
        broker.registerMethod('listenGlobal', [RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE], this._listenGlobal.bind(this));
        broker.registerMethod('listenDone', [RenderStoreObject, RenderStoreObject], this._listenDone.bind(this));
        broker.registerMethod('animate', [
            RenderStoreObject, RenderStoreObject, PRIMITIVE, PRIMITIVE, PRIMITIVE, PRIMITIVE,
            PRIMITIVE, PRIMITIVE, PRIMITIVE
        ], this._animate.bind(this));
        this._bindAnimationPlayerMethods(broker);
    }
    /**
     * @param {?} broker
     * @return {?}
     */
    _bindAnimationPlayerMethods(broker) {
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'play', [RenderStoreObject, RenderStoreObject], (player, element) => player.play());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'pause', [RenderStoreObject, RenderStoreObject], (player, element) => player.pause());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'init', [RenderStoreObject, RenderStoreObject], (player, element) => player.init());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'restart', [RenderStoreObject, RenderStoreObject], (player, element) => player.restart());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'destroy', [RenderStoreObject, RenderStoreObject], (player, element) => {
            player.destroy();
            this._renderStore.remove(player);
        });
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'finish', [RenderStoreObject, RenderStoreObject], (player, element) => player.finish());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'getPosition', [RenderStoreObject, RenderStoreObject], (player, element) => player.getPosition());
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onStart', [RenderStoreObject, RenderStoreObject, PRIMITIVE], (player, element) => this._listenOnAnimationPlayer(player, element, 'onStart'));
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'onDone', [RenderStoreObject, RenderStoreObject, PRIMITIVE], (player, element) => this._listenOnAnimationPlayer(player, element, 'onDone'));
        broker.registerMethod(ANIMATION_WORKER_PLAYER_PREFIX + 'setPosition', [RenderStoreObject, RenderStoreObject, PRIMITIVE], (player, element, position) => player.setPosition(position));
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
        const /** @type {?} */ unregisterCallback = renderer.listen(renderElement, eventName, (event /** TODO #9100 */) => this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event));
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
        const /** @type {?} */ unregisterCallback = renderer.listenGlobal(eventTarget, eventName, (event /** TODO #9100 */) => this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event));
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
//# sourceMappingURL=renderer.js.map