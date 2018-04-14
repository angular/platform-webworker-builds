/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
/** @enum {number} */
const SerializerTypes = {
    // RendererType2
    RENDERER_TYPE_2: 0,
    // Primitive types
    PRIMITIVE: 1,
    // An object stored in a RenderStore
    RENDER_STORE_OBJECT: 2,
};
export { SerializerTypes };
export class LocationType {
    /**
     * @param {?} href
     * @param {?} protocol
     * @param {?} host
     * @param {?} hostname
     * @param {?} port
     * @param {?} pathname
     * @param {?} search
     * @param {?} hash
     * @param {?} origin
     */
    constructor(href, protocol, host, hostname, port, pathname, search, hash, origin) {
        this.href = href;
        this.protocol = protocol;
        this.host = host;
        this.hostname = hostname;
        this.port = port;
        this.pathname = pathname;
        this.search = search;
        this.hash = hash;
        this.origin = origin;
    }
}
function LocationType_tsickle_Closure_declarations() {
    /** @type {?} */
    LocationType.prototype.href;
    /** @type {?} */
    LocationType.prototype.protocol;
    /** @type {?} */
    LocationType.prototype.host;
    /** @type {?} */
    LocationType.prototype.hostname;
    /** @type {?} */
    LocationType.prototype.port;
    /** @type {?} */
    LocationType.prototype.pathname;
    /** @type {?} */
    LocationType.prototype.search;
    /** @type {?} */
    LocationType.prototype.hash;
    /** @type {?} */
    LocationType.prototype.origin;
}
export class Serializer {
    /**
     * @param {?} _renderStore
     */
    constructor(_renderStore) {
        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?=} type
     * @return {?}
     */
    serialize(obj, type = 1 /* PRIMITIVE */) {
        if (obj == null || type === 1 /* PRIMITIVE */) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(v => this.serialize(v, type));
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return /** @type {?} */ ((this._renderStore.serialize(obj)));
        }
        if (type === RenderComponentType) {
            return this._serializeRenderComponentType(obj);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._serializeRendererType2(obj);
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error(`No serializer for type ${stringify(type)}`);
    }
    /**
     * @param {?} map
     * @param {?=} type
     * @param {?=} data
     * @return {?}
     */
    deserialize(map, type = 1 /* PRIMITIVE */, data) {
        if (map == null || type === 1 /* PRIMITIVE */) {
            return map;
        }
        if (Array.isArray(map)) {
            return map.map(val => this.deserialize(val, type, data));
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return this._renderStore.deserialize(map);
        }
        if (type === RenderComponentType) {
            return this._deserializeRenderComponentType(map);
        }
        if (type === 0 /* RENDERER_TYPE_2 */) {
            return this._deserializeRendererType2(map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error(`No deserializer for type ${stringify(type)}`);
    }
    /**
     * @param {?} loc
     * @return {?}
     */
    _serializeLocation(loc) {
        return {
            'href': loc.href,
            'protocol': loc.protocol,
            'host': loc.host,
            'hostname': loc.hostname,
            'port': loc.port,
            'pathname': loc.pathname,
            'search': loc.search,
            'hash': loc.hash,
            'origin': loc.origin,
        };
    }
    /**
     * @param {?} loc
     * @return {?}
     */
    _deserializeLocation(loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    _serializeRenderComponentType(type) {
        return {
            'id': type.id,
            'templateUrl': type.templateUrl,
            'slotCount': type.slotCount,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
        };
    }
    /**
     * @param {?} props
     * @return {?}
     */
    _deserializeRenderComponentType(props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    }
    /**
     * @param {?} type
     * @return {?}
     */
    _serializeRendererType2(type) {
        return {
            'id': type.id,
            'encapsulation': this.serialize(type.encapsulation),
            'styles': this.serialize(type.styles),
            'data': this.serialize(type.data),
        };
    }
    /**
     * @param {?} props
     * @return {?}
     */
    _deserializeRendererType2(props) {
        return {
            id: props['id'],
            encapsulation: props['encapsulation'],
            styles: this.deserialize(props['styles']),
            data: this.deserialize(props['data'])
        };
    }
}
Serializer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Serializer.ctorParameters = () => [
    { type: RenderStore, },
];
function Serializer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    Serializer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    Serializer.ctorParameters;
    /** @type {?} */
    Serializer.prototype._renderStore;
}
//# sourceMappingURL=serializer.js.map