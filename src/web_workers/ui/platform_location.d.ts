import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import * as i0 from "@angular/core";
export declare class MessageBasedPlatformLocation {
    private _brokerFactory;
    private _platformLocation;
    private _serializer;
    private _channelSink;
    private _broker;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _platformLocation: BrowserPlatformLocation, bus: MessageBus, _serializer: Serializer);
    start(): void;
    private _getLocation;
    private _sendUrlChangeEvent;
    private _setPathname;
    static ngInjectableDef: i0.ΔInjectableDef<MessageBasedPlatformLocation>;
}
