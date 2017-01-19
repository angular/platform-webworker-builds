/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core/index';
import { isPresent } from '../../facade/lang';
import { RenderStore } from './render_store';
import { LocationType } from './serialized_types';
// PRIMITIVE is any type that does not need to be serialized (string, number, boolean)
// We set it to String so that it is considered a Type.
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export const /** @type {?} */ PRIMITIVE = String;
export class Serializer {
    /**
     * @param {?} _renderStore
     */
    constructor(_renderStore) {
        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?} type
     * @return {?}
     */
    serialize(obj, type) {
        if (!isPresent(obj)) {
            return null;
        }
        if (Array.isArray(obj)) {
            return ((obj)).map(v => this.serialize(v, type));
        }
        if (type == PRIMITIVE) {
            return obj;
        }
        if (type == RenderStoreObject) {
            return this._renderStore.serialize(obj);
        }
        if (type === RenderComponentType) {
            return this._serializeRenderComponentType(obj);
        }
        if (type === ViewEncapsulation) {
            return obj;
        }
        if (type === LocationType) {
            return this._serializeLocation(obj);
        }
        throw new Error('No serializer for ' + type.toString());
    }
    /**
     * @param {?} map
     * @param {?} type
     * @param {?=} data
     * @return {?}
     */
    deserialize(map, type, data) {
        if (!isPresent(map)) {
            return null;
        }
        if (Array.isArray(map)) {
            return ((map)).map(val => this.deserialize(val, type, data));
        }
        if (type === PRIMITIVE) {
            return map;
        }
        if (type === RenderStoreObject) {
            return this._renderStore.deserialize(map);
        }
        if (type === RenderComponentType) {
            return this._deserializeRenderComponentType(map);
        }
        if (type === ViewEncapsulation) {
            return (map);
        }
        if (type === LocationType) {
            return this._deserializeLocation(map);
        }
        throw new Error('No deserializer for ' + type.toString());
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
            'origin': loc.origin
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
     * @param {?} obj
     * @return {?}
     */
    _serializeRenderComponentType(obj) {
        return {
            'id': obj.id,
            'templateUrl': obj.templateUrl,
            'slotCount': obj.slotCount,
            'encapsulation': this.serialize(obj.encapsulation, ViewEncapsulation),
            'styles': this.serialize(obj.styles, PRIMITIVE)
        };
    }
    /**
     * @param {?} map
     * @return {?}
     */
    _deserializeRenderComponentType(map) {
        return new RenderComponentType(map['id'], map['templateUrl'], map['slotCount'], this.deserialize(map['encapsulation'], ViewEncapsulation), this.deserialize(map['styles'], PRIMITIVE), {});
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
    /** @type {?} */
    Serializer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Serializer.ctorParameters;
    /** @type {?} */
    Serializer.prototype._renderStore;
}
export const /** @type {?} */ ANIMATION_WORKER_PLAYER_PREFIX = 'AnimationPlayer.';
export class RenderStoreObject {
}
//# sourceMappingURL=serializer.js.map