/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { SerializerTypes } from './serializer';
import * as i0 from "@angular/core";
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare class ClientMessageBrokerFactory {
    private _messageBus;
    /**
     * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     */
    createMessageBroker(channel: string, runInZone?: boolean): ClientMessageBroker;
    static ɵfac: i0.ɵɵFactoryDef<ClientMessageBrokerFactory>;
    static ɵprov: i0.ɵɵInjectableDef<ClientMessageBrokerFactory>;
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare class ClientMessageBroker {
    private channel;
    private _pending;
    private _sink;
    private _generateMessageId;
    runOnService(args: UiArguments, returnType: Type<any> | SerializerTypes | null): Promise<any> | null;
    private _handleMessage;
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare class FnArg {
    value: any;
    type: Type<any> | SerializerTypes;
    constructor(value: any, type?: Type<any> | SerializerTypes);
}
/**
 * @publicApi
 * @deprecated platform-webworker is deprecated in Angular and will be removed in version 10
 */
export declare class UiArguments {
    method: string;
    args?: FnArg[] | undefined;
    constructor(method: string, args?: FnArg[] | undefined);
}