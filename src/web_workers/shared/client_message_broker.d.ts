/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { SerializerTypes } from './serializer';
/**
 * @experimental WebWorker support in Angular is experimental.
 */
export declare class ClientMessageBrokerFactory {
    private _messageBus;
    /**
     * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     */
    createMessageBroker(channel: string, runInZone?: boolean): ClientMessageBroker;
}
/**
 * @experimental WebWorker support in Angular is experimental.
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
 * @experimental WebWorker support in Angular is experimental.
 */
export declare class FnArg {
    value: any;
    type: Type<any> | SerializerTypes;
    constructor(value: any, type?: Type<any> | SerializerTypes);
}
/**
 * @experimental WebWorker support in Angular is experimental.
 */
export declare class UiArguments {
    method: string;
    args?: FnArg[] | undefined;
    constructor(method: string, args?: FnArg[] | undefined);
}
