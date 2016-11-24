/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RenderComponentType, ViewEncapsulation } from '@angular/core';
import { isPresent } from '../../facade/lang';
import { RenderStore } from './render_store';
import { LocationType } from './serialized_types';
// PRIMITIVE is any type that does not need to be serialized (string, number, boolean)
// We set it to String so that it is considered a Type.
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export var /** @type {?} */ PRIMITIVE = String;
export var Serializer = (function () {
    /**
     * @param {?} _renderStore
     */
    function Serializer(_renderStore) {
        this._renderStore = _renderStore;
    }
    /**
     * @param {?} obj
     * @param {?} type
     * @return {?}
     */
    Serializer.prototype.serialize = function (obj, type) {
        var _this = this;
        if (!isPresent(obj)) {
            return null;
        }
        if (Array.isArray(obj)) {
            return ((obj)).map(function (v) { return _this.serialize(v, type); });
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
    };
    /**
     * @param {?} map
     * @param {?} type
     * @param {?=} data
     * @return {?}
     */
    Serializer.prototype.deserialize = function (map, type, data) {
        var _this = this;
        if (!isPresent(map)) {
            return null;
        }
        if (Array.isArray(map)) {
            return ((map)).map(function (val) { return _this.deserialize(val, type, data); });
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
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    Serializer.prototype._serializeLocation = function (loc) {
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
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    Serializer.prototype._deserializeLocation = function (loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    Serializer.prototype._serializeRenderComponentType = function (obj) {
        return {
            'id': obj.id,
            'templateUrl': obj.templateUrl,
            'slotCount': obj.slotCount,
            'encapsulation': this.serialize(obj.encapsulation, ViewEncapsulation),
            'styles': this.serialize(obj.styles, PRIMITIVE)
        };
    };
    /**
     * @param {?} map
     * @return {?}
     */
    Serializer.prototype._deserializeRenderComponentType = function (map) {
        return new RenderComponentType(map['id'], map['templateUrl'], map['slotCount'], this.deserialize(map['encapsulation'], ViewEncapsulation), this.deserialize(map['styles'], PRIMITIVE), {});
    };
    Serializer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Serializer.ctorParameters = function () { return [
        { type: RenderStore, },
    ]; };
    return Serializer;
}());
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
export var /** @type {?} */ ANIMATION_WORKER_PLAYER_PREFIX = 'AnimationPlayer.';
export var RenderStoreObject = (function () {
    function RenderStoreObject() {
    }
    return RenderStoreObject;
}());
//# sourceMappingURL=serializer.js.map