/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import * as i0 from "@angular/core";
export declare class MessageBasedRenderer2 {
    private _brokerFactory;
    private _bus;
    private _serializer;
    private _renderStore;
    private _rendererFactory;
    private _eventDispatcher;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _bus: MessageBus, _serializer: Serializer, _renderStore: RenderStore, _rendererFactory: RendererFactory2);
    start(): void;
    private destroy;
    private destroyNode;
    private createRenderer;
    private createElement;
    private createComment;
    private createText;
    private appendChild;
    private insertBefore;
    private removeChild;
    private selectRootElement;
    private parentNode;
    private nextSibling;
    private setAttribute;
    private removeAttribute;
    private addClass;
    private removeClass;
    private setStyle;
    private removeStyle;
    private setProperty;
    private setValue;
    private listen;
    private unlisten;
    static ɵfac: i0.ɵɵFactoryDef<MessageBasedRenderer2, never>;
    static ɵprov: i0.ɵɵInjectableDef<MessageBasedRenderer2>;
}
