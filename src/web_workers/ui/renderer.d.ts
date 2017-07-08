/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
export declare class MessageBasedRenderer2 {
    private _brokerFactory;
    private _bus;
    private _serializer;
    private _renderStore;
    private _rendererFactory;
    private _eventDispatcher;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _bus: MessageBus, _serializer: Serializer, _renderStore: RenderStore, _rendererFactory: RendererFactory2);
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
    private setStyle(r, el, style, value, flags);
    private removeStyle(r, el, style, flags);
    private setProperty(r, el, name, value);
    private setValue(r, node, value);
    private listen(r, el, elName, eventName, unlistenId);
    private unlisten(r, unlisten);
}
