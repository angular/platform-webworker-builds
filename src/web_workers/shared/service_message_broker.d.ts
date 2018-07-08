/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { SerializerTypes } from '../shared/serializer';
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare class ServiceMessageBrokerFactory {
    private _messageBus;
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    createMessageBroker(channel: string, runInZone?: boolean): ServiceMessageBroker;
}
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare class ServiceMessageBroker {
    private _serializer;
    private channel;
    private _sink;
    private _methods;
    registerMethod(methodName: string, signature: Array<Type<any> | SerializerTypes> | null, method: (..._: any[]) => Promise<any> | void, returnType?: Type<any> | SerializerTypes): void;
    private _handleMessage;
    private _wrapWebWorkerPromise;
}
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export interface ReceivedMessage {
    method: string;
    args: any[];
    id: string;
    type: string;
}
