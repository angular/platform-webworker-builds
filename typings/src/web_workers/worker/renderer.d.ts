/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RenderComponentType, Renderer, RendererFactoryV2, RendererTypeV2, RendererV2, RootRenderer, ɵAnimationKeyframe as AnimationKeyframe, ɵAnimationPlayer as AnimationPlayer, ɵAnimationStyles as AnimationStyles, ɵRenderDebugInfo as RenderDebugInfo } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
export declare class NamedEventEmitter {
    private _listeners;
    listen(eventName: string, callback: Function): void;
    unlisten(eventName: string, listener: Function): void;
    dispatchEvent(eventName: string, event: any): void;
    private _getListeners(eventName);
}
export declare class WebWorkerRootRenderer implements RootRenderer {
    private _serializer;
    renderStore: RenderStore;
    globalEvents: NamedEventEmitter;
    private _messageBroker;
    private _componentRenderers;
    constructor(messageBrokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: Serializer, renderStore: RenderStore);
    private _dispatchEvent(message);
    renderComponent(componentType: RenderComponentType): Renderer;
    runOnService(fnName: string, fnArgs: FnArg[]): void;
    allocateNode(): WebWorkerRenderNode;
    allocateId(): number;
    destroyNodes(nodes: any[]): void;
}
export declare class WebWorkerRenderer implements Renderer {
    private _rootRenderer;
    private _componentType;
    constructor(_rootRenderer: WebWorkerRootRenderer, _componentType: RenderComponentType);
    private _runOnService(fnName, fnArgs);
    selectRootElement(selectorOrNode: string, debugInfo?: RenderDebugInfo): any;
    createElement(parentElement: any, name: string, debugInfo?: RenderDebugInfo): any;
    createViewRoot(hostElement: any): any;
    createTemplateAnchor(parentElement: any, debugInfo?: RenderDebugInfo): any;
    createText(parentElement: any, value: string, debugInfo?: RenderDebugInfo): any;
    projectNodes(parentElement: any, nodes: any[]): void;
    attachViewAfter(node: any, viewRootNodes: any[]): void;
    detachView(viewRootNodes: any[]): void;
    destroyView(hostElement: any, viewAllNodes: any[]): void;
    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): void;
    setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void;
    setElementClass(renderElement: any, className: string, isAdd: boolean): void;
    setElementStyle(renderElement: any, styleName: string, styleValue: string): void;
    invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void;
    setText(renderNode: any, text: string): void;
    listen(renderElement: WebWorkerRenderNode, name: string, callback: Function): Function;
    listenGlobal(target: string, name: string, callback: Function): Function;
    animate(renderElement: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[]): AnimationPlayer;
}
export declare class WebWorkerRendererFactoryV2 implements RendererFactoryV2 {
    private _serializer;
    renderStore: RenderStore;
    globalEvents: NamedEventEmitter;
    private _messageBroker;
    constructor(messageBrokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: Serializer, renderStore: RenderStore);
    createRenderer(element: any, type: RendererTypeV2): RendererV2;
    callUI(fnName: string, fnArgs: FnArg[]): void;
    allocateNode(): WebWorkerRenderNode;
    freeNode(node: any): void;
    allocateId(): number;
    private _dispatchEvent(message);
}
export declare class WebWorkerRendererV2 implements RendererV2 {
    private _rendererFactory;
    constructor(_rendererFactory: WebWorkerRendererFactoryV2);
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
    setStyle(el: any, style: string, value: any, hasVendorPrefix: boolean, hasImportant: boolean): void;
    removeStyle(el: any, style: string, hasVendorPrefix: boolean): void;
    setProperty(el: any, name: string, value: any): void;
    setValue(node: any, value: string): void;
    listen(target: 'window' | 'document' | 'body' | any, eventName: string, listener: (event: any) => boolean): () => void;
    private callUIWithRenderer(fnName, fnArgs?);
}
export declare class AnimationPlayerEmitter {
    private _listeners;
    private _getListeners(player, phaseName);
    listen(player: AnimationPlayer, phaseName: string, callback: Function): void;
    unlisten(player: AnimationPlayer): void;
    dispatchEvent(player: AnimationPlayer, phaseName: string): void;
}
export declare class WebWorkerRenderNode {
    events: NamedEventEmitter;
    animationPlayerEvents: AnimationPlayerEmitter;
}
