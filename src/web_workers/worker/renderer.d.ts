/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Renderer2, RendererFactory2, RendererStyleFlags2, RendererType2 } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
export declare class NamedEventEmitter {
    private _listeners;
    listen(eventName: string, callback: Function): void;
    unlisten(eventName: string, listener: Function): void;
    dispatchEvent(eventName: string, event: any): void;
    private _getListeners;
}
export declare class WebWorkerRendererFactory2 implements RendererFactory2 {
    private _serializer;
    renderStore: RenderStore;
    globalEvents: NamedEventEmitter;
    private _messageBroker;
    constructor(messageBrokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: Serializer, renderStore: RenderStore);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    callUI(fnName: string, fnArgs: FnArg[]): void;
    allocateNode(): WebWorkerRenderNode;
    freeNode(node: any): void;
    allocateId(): number;
    private _dispatchEvent;
}
export declare class WebWorkerRenderer2 implements Renderer2 {
    private _rendererFactory;
    data: {
        [key: string]: any;
    };
    constructor(_rendererFactory: WebWorkerRendererFactory2);
    private asFnArg;
    destroy(): void;
    destroyNode(node: any): void;
    createElement(name: string, namespace?: string): any;
    createComment(value: string): any;
    createText(value: string): any;
    appendChild(parent: any, newChild: any): void;
    insertBefore(parent: any, newChild: any, refChild: any): void;
    removeChild(parent: any, oldChild: any): void;
    selectRootElement(selectorOrNode: string | any): any;
    parentNode(node: any): any;
    nextSibling(node: any): any;
    setAttribute(el: any, name: string, value: string, namespace?: string): void;
    removeAttribute(el: any, name: string, namespace?: string): void;
    addClass(el: any, name: string): void;
    removeClass(el: any, name: string): void;
    setStyle(el: any, style: string, value: any, flags: RendererStyleFlags2): void;
    removeStyle(el: any, style: string, flags: RendererStyleFlags2): void;
    setProperty(el: any, name: string, value: any): void;
    setValue(node: any, value: string): void;
    listen(target: 'window' | 'document' | 'body' | any, eventName: string, listener: (event: any) => boolean): () => void;
    private callUIWithRenderer;
}
export declare class WebWorkerRenderNode {
    events: NamedEventEmitter;
}
