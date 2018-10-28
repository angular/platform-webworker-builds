/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { RenderStore } from './render_store';
/**
 * @publicApi
 */
export declare const enum SerializerTypes {
    RENDERER_TYPE_2 = 0,
    PRIMITIVE = 1,
    RENDER_STORE_OBJECT = 2
}
export declare class LocationType {
    href: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string | null;
    search: string;
    hash: string;
    origin: string;
    constructor(href: string, protocol: string, host: string, hostname: string, port: string, pathname: string | null, search: string, hash: string, origin: string);
}
export declare class Serializer {
    private _renderStore;
    constructor(_renderStore: RenderStore);
    serialize(obj: any, type?: Type<any> | SerializerTypes): Object;
    deserialize(map: any, type?: Type<any> | SerializerTypes, data?: any): any;
    private _serializeLocation;
    private _deserializeLocation;
    private _serializeRenderComponentType;
    private _deserializeRenderComponentType;
    private _serializeRendererType2;
    private _deserializeRendererType2;
}
