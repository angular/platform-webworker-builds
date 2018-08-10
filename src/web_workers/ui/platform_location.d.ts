/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵBrowserPlatformLocation as BrowserPlatformLocation } from '@angular/platform-browser';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
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
}
