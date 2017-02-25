/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RendererFactoryV2, RootRenderer } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
export declare class MessageBasedRenderer {
    private _brokerFactory;
    private _bus;
    private _serializer;
    private _renderStore;
    private _rootRenderer;
    private _eventDispatcher;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _bus: MessageBus, _serializer: Serializer, _renderStore: RenderStore, _rootRenderer: RootRenderer);
    start(): void;
    private _bindAnimationPlayerMethods(broker);
    private _renderComponent(renderComponentType, rendererId);
    private _selectRootElement(renderer, selector, elId);
    private _createElement(renderer, parentElement, name, elId);
    private _createViewRoot(renderer, hostElement, elId);
    private _createTemplateAnchor(renderer, parentElement, elId);
    private _createText(renderer, parentElement, value, elId);
    private _projectNodes(renderer, parentElement, nodes);
    private _attachViewAfter(renderer, node, viewRootNodes);
    private _detachView(renderer, viewRootNodes);
    private _destroyView(renderer, hostElement, viewAllNodes);
    private _setElementProperty(renderer, renderElement, propertyName, propertyValue);
    private _setElementAttribute(renderer, renderElement, attributeName, attributeValue);
    private _setBindingDebugInfo(renderer, renderElement, propertyName, propertyValue);
    private _setElementClass(renderer, renderElement, className, isAdd);
    private _setElementStyle(renderer, renderElement, styleName, styleValue);
    private _invokeElementMethod(renderer, renderElement, methodName, args);
    private _setText(renderer, renderNode, text);
    private _listen(renderer, renderElement, eventName, unlistenId);
    private _listenGlobal(renderer, eventTarget, eventName, unlistenId);
    private _listenDone(renderer, unlistenCallback);
    private _animate(renderer, element, startingStyles, keyframes, duration, delay, easing, previousPlayers, playerId);
    private _listenOnAnimationPlayer(player, element, phaseName);
}
export declare class MessageBasedRendererV2 {
    private _brokerFactory;
    private _bus;
    private _serializer;
    private _renderStore;
    private _rendererFactory;
    private _eventDispatcher;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _bus: MessageBus, _serializer: Serializer, _renderStore: RenderStore, _rendererFactory: RendererFactoryV2);
    start(): void;
    private destroy(r);
    private destroyNode(r, node);
    private createRenderer(el, type, id);
    private createElement(r, name, namespace, id);
    private createComment(r, value, id);
    private createText(r, value, id);
    private appendChild(r, parent, child);
    private insertBefore(r, parent, child, ref);
    private removeChild(r, parent, child);
    private selectRootElement(r, selector, id);
    private parentNode(r, node, id);
    private nextSibling(r, node, id);
    private setAttribute(r, el, name, value, namespace);
    private removeAttribute(r, el, name, namespace);
    private addClass(r, el, name);
    private removeClass(r, el, name);
    private setStyle(r, el, style, value, hasVendorPrefix, hasImportant);
    private removeStyle(r, el, style, hasVendorPrefix);
    private setProperty(r, el, name, value);
    private setValue(r, node, value);
    private listen(r, el, elName, eventName, unlistenId);
    private unlisten(r, unlisten);
}
