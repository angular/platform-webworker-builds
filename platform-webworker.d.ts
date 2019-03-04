/**
 * @license Angular v8.0.0-beta.6+58.sha-05a9090.with-local-changes
 * (c) 2010-2019 Google LLC. https://angular.io/
 * License: MIT
 */

import { ErrorHandler } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { LocationChangeListener } from '@angular/common';
import { NgZone } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { PlatformRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { RendererFactory2 } from '@angular/core';
import { RendererType2 } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { Type } from '@angular/core';
import { Version } from '@angular/core';

/**
 * Bootstraps the worker ui.
 *
 * @publicApi
 */
export declare function bootstrapWorkerUi(workerScriptUri: string, customProviders?: StaticProvider[]): Promise<PlatformRef>;

/**
 * @publicApi
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
 */
export declare class ClientMessageBrokerFactory {
    private _messageBus;
    /**
     * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
     */
    createMessageBroker(channel: string, runInZone?: boolean): ClientMessageBroker;
}

/**
 * @publicApi
 */
export declare class FnArg {
    value: any;
    type: Type<any> | SerializerTypes;
    constructor(value: any, type?: Type<any> | SerializerTypes);
}

/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 *
 * @publicApi
 */
export declare abstract class MessageBus implements MessageBusSource, MessageBusSink {
    /**
     * Sets up a new channel on the MessageBus.
     * MUST be called before calling from or to on the channel.
     * If runInZone is true then the source will emit events inside the angular zone
     * and the sink will buffer messages and send only once the zone exits.
     * if runInZone is false then the source will emit events inside the global zone
     * and the sink will send messages immediately.
     */
    abstract initChannel(channel: string, runInZone?: boolean): void;
    /**
     * Assigns this bus to the given zone.
     * Any callbacks attached to channels where runInZone was set to true on initialization
     * will be executed in the given zone.
     */
    abstract attachToZone(zone: NgZone): void;
    /**
     * Returns an {@link EventEmitter} that emits every time a message
     * is received on the given channel.
     */
    abstract from(channel: string): EventEmitter<any>;
    /**
     * Returns an {@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     */
    abstract to(channel: string): EventEmitter<any>;
}

/**
 * @publicApi
 */
export declare interface MessageBusSink {
    /**
     * Sets up a new channel on the MessageBusSink.
     * MUST be called before calling to on the channel.
     * If runInZone is true the sink will buffer messages and send only once the zone exits.
     * if runInZone is false the sink will send messages immediately.
     */
    initChannel(channel: string, runInZone: boolean): void;
    /**
     * Assigns this sink to the given zone.
     * Any channels which are initialized with runInZone set to true will wait for the given zone
     * to exit before sending messages.
     */
    attachToZone(zone: NgZone): void;
    /**
     * Returns an {@link EventEmitter} for the given channel
     * To publish methods to that channel just call next on the returned emitter
     */
    to(channel: string): EventEmitter<any>;
}

/**
 * @publicApi
 */
export declare interface MessageBusSource {
    /**
     * Sets up a new channel on the MessageBusSource.
     * MUST be called before calling from on the channel.
     * If runInZone is true then the source will emit events inside the angular zone.
     * if runInZone is false then the source will emit events inside the global zone.
     */
    initChannel(channel: string, runInZone: boolean): void;
    /**
     * Assigns this source to the given zone.
     * Any channels which are initialized with runInZone set to true will emit events that will be
     * executed within the given zone.
     */
    attachToZone(zone: NgZone): void;
    /**
     * Returns an {@link EventEmitter} that emits every time a message
     * is received on the given channel.
     */
    from(channel: string): EventEmitter<any>;
}

declare class NamedEventEmitter {
    private _listeners;
    listen(eventName: string, callback: Function): void;
    unlisten(eventName: string, listener: Function): void;
    dispatchEvent(eventName: string, event: any): void;
    private _getListeners;
}

/**
 * @publicApi
 */
export declare const platformWorkerApp: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * @publicApi
 */
export declare const platformWorkerUi: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/**
 * @publicApi
 */
export declare interface ReceivedMessage {
    method: string;
    args: any[];
    id: string;
    type: string;
}

/**
 * @publicApi
 */
export declare const enum SerializerTypes {
    RENDERER_TYPE_2 = 0,
    PRIMITIVE = 1,
    RENDER_STORE_OBJECT = 2
}

/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @publicApi
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
 * @publicApi
 */
export declare class ServiceMessageBrokerFactory {
    private _messageBus;
    /**
     * Initializes the given channel and attaches a new {@link ServiceMessageBroker} to it.
     */
    createMessageBroker(channel: string, runInZone?: boolean): ServiceMessageBroker;
}

/**
 * @publicApi
 */
export declare class UiArguments {
    method: string;
    args?: FnArg[] | undefined;
    constructor(method: string, args?: FnArg[] | undefined);
}

/**
 * @publicApi
 */
export declare const VERSION: Version;

declare class WebWorkerRenderNode {
    events: NamedEventEmitter;
}

/**
 * The {@link PlatformLocation} providers that should be added when the {@link Location} is used in
 * a worker context.
 *
 * @publicApi
 */
export declare const WORKER_APP_LOCATION_PROVIDERS: ({
    provide: typeof PlatformLocation;
    useClass: typeof ɵangular_packages_platform_webworker_platform_webworker_i;
    useFactory?: undefined;
    multi?: undefined;
    deps?: undefined;
} | {
    provide: InjectionToken<(() => void)[]>;
    useFactory: typeof ɵangular_packages_platform_webworker_platform_webworker_c;
    multi: boolean;
    deps: (typeof NgZone | typeof PlatformLocation)[];
    useClass?: undefined;
} | {
    provide: InjectionToken<Promise<any>>;
    useFactory: typeof ɵangular_packages_platform_webworker_platform_webworker_b;
    deps: (typeof PlatformLocation)[];
    useClass?: undefined;
    multi?: undefined;
})[];

/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @publicApi
 */
export declare const WORKER_UI_LOCATION_PROVIDERS: StaticProvider[];

/**
 * The ng module for the worker app side.
 *
 * @publicApi
 */
export declare class WorkerAppModule {
}

export declare class ɵangular_packages_platform_webworker_platform_webworker_a {
    private _renderStore;
    constructor(_renderStore: ɵangular_packages_platform_webworker_platform_webworker_h);
    serialize(obj: any, type?: Type<any> | SerializerTypes): Object;
    deserialize(map: any, type?: Type<any> | SerializerTypes, data?: any): any;
    private _serializeLocation;
    private _deserializeLocation;
    private _serializeRenderComponentType;
    private _deserializeRenderComponentType;
    private _serializeRendererType2;
    private _deserializeRendererType2;
}

export declare function ɵangular_packages_platform_webworker_platform_webworker_b(platformLocation: ɵangular_packages_platform_webworker_platform_webworker_i): Promise<any>;

export declare function ɵangular_packages_platform_webworker_platform_webworker_c(platformLocation: ɵangular_packages_platform_webworker_platform_webworker_i, zone: NgZone): () => Promise<boolean>;

export declare function ɵangular_packages_platform_webworker_platform_webworker_d(): ErrorHandler;

export declare function ɵangular_packages_platform_webworker_platform_webworker_e(zone: NgZone): MessageBus;

export declare function ɵangular_packages_platform_webworker_platform_webworker_f(): void;

export declare const ɵangular_packages_platform_webworker_platform_webworker_g: StaticProvider[];


export declare class ɵangular_packages_platform_webworker_platform_webworker_h {
    private _nextIndex;
    private _lookupById;
    private _lookupByObject;
    allocateId(): number;
    store(obj: any, id: number): void;
    remove(obj: any): void;
    deserialize(id: number): any;
    serialize(obj: any): number | null | undefined;
}

export declare class ɵangular_packages_platform_webworker_platform_webworker_i extends PlatformLocation {
    private _serializer;
    private _broker;
    private _popStateListeners;
    private _hashChangeListeners;
    private _location;
    private _channelSource;
    initialized: Promise<any>;
    private initializedResolve;
    constructor(brokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: ɵangular_packages_platform_webworker_platform_webworker_a);
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): void;
    onHashChange(fn: LocationChangeListener): void;
    pathname: string;
    readonly search: string;
    readonly hash: string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}

export declare class ɵangular_packages_platform_webworker_platform_webworker_j implements RendererFactory2 {
    private _serializer;
    renderStore: ɵangular_packages_platform_webworker_platform_webworker_h;
    globalEvents: NamedEventEmitter;
    private _messageBroker;
    constructor(messageBrokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: ɵangular_packages_platform_webworker_platform_webworker_a, renderStore: ɵangular_packages_platform_webworker_platform_webworker_h);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    callUI(fnName: string, fnArgs: FnArg[]): void;
    allocateNode(): WebWorkerRenderNode;
    freeNode(node: any): void;
    allocateId(): number;
    private _dispatchEvent;
}

export declare const ɵangular_packages_platform_webworker_platform_webworker_k: InjectionToken<boolean>;

export { }
