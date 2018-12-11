import { Injectable, RenderComponentType, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @enum {number} */
var SerializerTypes = {
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
if (false) {
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
    { type: RenderStore }
];
Serializer.ngInjectableDef = i0.defineInjectable({ token: Serializer, factory: function Serializer_Factory(t) { return new (t || Serializer)(i0.inject(RenderStore)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(Serializer, [{
        type: Injectable
    }], [{
        type: RenderStore
    }], null);
if (false) {
    /** @type {?} */
    Serializer.prototype._renderStore;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRekMsa0JBQWU7O0lBRWYsWUFBUzs7SUFFVCxzQkFBbUI7OztBQUdyQixNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7Ozs7O0lBQ3ZCLFlBQ1csTUFBcUIsUUFBZ0IsRUFBUyxJQUFZLEVBQVMsUUFBZ0IsRUFDbkYsTUFBcUIsUUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUN0RjtRQUZBLFNBQUksR0FBSixJQUFJO1FBQWlCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNuRixTQUFJLEdBQUosSUFBSTtRQUFpQixhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFDdEYsV0FBTSxHQUFOLE1BQU07S0FBWTtDQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0QsTUFBTSxPQUFPLFVBQVU7Ozs7SUFDckIsWUFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7S0FBSTs7Ozs7O0lBRWpELFNBQVMsQ0FBQyxHQUFRLEVBQUUsd0JBQTJEO1FBQzdFLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLHNCQUE4QixFQUFFO1lBQ3JELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEtBQUssQ0FBQyxP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QUFDLGVBQWUsQ0FBQztZQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDLENBQUM7Ozs7WUFwR0wsVUFBVTs7OztZQXRCSCxXQUFXOzswREF1Qk4sVUFBVSw2REFBVixVQUFVLFlBQ2EsV0FBVzttQ0FEbEMsVUFBVTtjQUR0QixVQUFVOztjQUV5QixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlckNvbXBvbmVudFR5cGUsIFJlbmRlcmVyVHlwZTIsIFR5cGUsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3JlbmRlcl9zdG9yZSc7XG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlcmlhbGl6ZXJUeXBlcyB7XG4gIC8vIFJlbmRlcmVyVHlwZTJcbiAgUkVOREVSRVJfVFlQRV8yLFxuICAvLyBQcmltaXRpdmUgdHlwZXNcbiAgUFJJTUlUSVZFLFxuICAvLyBBbiBvYmplY3Qgc3RvcmVkIGluIGEgUmVuZGVyU3RvcmVcbiAgUkVOREVSX1NUT1JFX09CSkVDVCxcbn1cblxuZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGhyZWY6IHN0cmluZywgcHVibGljIHByb3RvY29sOiBzdHJpbmcsIHB1YmxpYyBob3N0OiBzdHJpbmcsIHB1YmxpYyBob3N0bmFtZTogc3RyaW5nLFxuICAgICAgcHVibGljIHBvcnQ6IHN0cmluZywgcHVibGljIHBhdGhuYW1lOiBzdHJpbmd8bnVsbCwgcHVibGljIHNlYXJjaDogc3RyaW5nLCBwdWJsaWMgaGFzaDogc3RyaW5nLFxuICAgICAgcHVibGljIG9yaWdpbjogc3RyaW5nKSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VyaWFsaXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge31cblxuICBzZXJpYWxpemUob2JqOiBhbnksIHR5cGU6IFR5cGU8YW55PnxTZXJpYWxpemVyVHlwZXMgPSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKTogT2JqZWN0IHtcbiAgICBpZiAob2JqID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIG9iai5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShvYmopICE7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBSZW5kZXJDb21wb25lbnRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZShvYmopO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSwgZGF0YT86IGFueSk6XG4gICAgICBhbnkge1xuICAgIGlmIChtYXAgPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXApKSB7XG4gICAgICByZXR1cm4gbWFwLm1hcCh2YWwgPT4gdGhpcy5kZXNlcmlhbGl6ZSh2YWwsIHR5cGUsIGRhdGEpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplTG9jYXRpb24obWFwKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZUxvY2F0aW9uKGxvYzoge1trZXk6IHN0cmluZ106IGFueX0pOiBMb2NhdGlvblR5cGUge1xuICAgIHJldHVybiBuZXcgTG9jYXRpb25UeXBlKFxuICAgICAgICBsb2NbJ2hyZWYnXSwgbG9jWydwcm90b2NvbCddLCBsb2NbJ2hvc3QnXSwgbG9jWydob3N0bmFtZSddLCBsb2NbJ3BvcnQnXSwgbG9jWydwYXRobmFtZSddLFxuICAgICAgICBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKHR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAnaWQnOiB0eXBlLmlkLFxuICAgICAgJ3RlbXBsYXRlVXJsJzogdHlwZS50ZW1wbGF0ZVVybCxcbiAgICAgICdzbG90Q291bnQnOiB0eXBlLnNsb3RDb3VudCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZShwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlckNvbXBvbmVudFR5cGUoXG4gICAgICAgIHByb3BzWydpZCddLCBwcm9wc1sndGVtcGxhdGVVcmwnXSwgcHJvcHNbJ3Nsb3RDb3VudCddLFxuICAgICAgICB0aGlzLmRlc2VyaWFsaXplKHByb3BzWydlbmNhcHN1bGF0aW9uJ10pLCB0aGlzLmRlc2VyaWFsaXplKHByb3BzWydzdHlsZXMnXSksIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIodHlwZTogUmVuZGVyZXJUeXBlMik6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUodHlwZS5lbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLnN0eWxlcyksXG4gICAgICAnZGF0YSc6IHRoaXMuc2VyaWFsaXplKHR5cGUuZGF0YSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyZXJUeXBlMihwcm9wczoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJlclR5cGUyIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzWydpZCddLFxuICAgICAgZW5jYXBzdWxhdGlvbjogcHJvcHNbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHN0eWxlczogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLFxuICAgICAgZGF0YTogdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZGF0YSddKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==