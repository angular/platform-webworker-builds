/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, RenderComponentType, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
            return (/** @type {?} */ (this._renderStore.serialize(obj)));
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
     * @private
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
     * @private
     * @param {?} loc
     * @return {?}
     */
    _deserializeLocation(loc) {
        return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
    }
    /**
     * @private
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
     * @private
     * @param {?} props
     * @return {?}
     */
    _deserializeRenderComponentType(props) {
        return new RenderComponentType(props['id'], props['templateUrl'], props['slotCount'], this.deserialize(props['encapsulation']), this.deserialize(props['styles']), {});
    }
    /**
     * @private
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
     * @private
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
/** @nocollapse */ Serializer.ngInjectableDef = i0.defineInjectable({ token: Serializer, factory: function Serializer_Factory(t) { return new (t || Serializer)(i0.inject(RenderStore)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(Serializer, [{
        type: Injectable
    }], function () { return [{
        type: RenderStore
    }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    Serializer.prototype._renderStore;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQXVCLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7OztJQU96QyxnQkFBZ0I7SUFDaEIsa0JBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBUztJQUNULG9DQUFvQztJQUNwQyxzQkFBbUI7OztBQUdyQixNQUFNLE9BQU8sWUFBWTs7Ozs7Ozs7Ozs7O0lBQ3ZCLFlBQ1csSUFBWSxFQUFTLFFBQWdCLEVBQVMsSUFBWSxFQUFTLFFBQWdCLEVBQ25GLElBQVksRUFBUyxRQUFxQixFQUFTLE1BQWMsRUFBUyxJQUFZLEVBQ3RGLE1BQWM7UUFGZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ25GLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFDdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7Q0FDOUI7OztJQUhLLDRCQUFtQjs7SUFBRSxnQ0FBdUI7O0lBQUUsNEJBQW1COztJQUFFLGdDQUF1Qjs7SUFDMUYsNEJBQW1COztJQUFFLGdDQUE0Qjs7SUFBRSw4QkFBcUI7O0lBQUUsNEJBQW1COztJQUM3Riw4QkFBcUI7O0FBSTNCLE1BQU0sT0FBTyxVQUFV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Q0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNuRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLHlCQUF5QixDQUFDLEtBQTJCO1FBQzNELE9BQU87WUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUM7OztZQXJHRixVQUFVOzs7O1lBdEJILFdBQVc7OzBEQXVCTixVQUFVLDZEQUFWLFVBQVUsWUF2QmYsV0FBVzttQ0F1Qk4sVUFBVTtjQUR0QixVQUFVOztjQXRCSCxXQUFXOzs7Ozs7O0lBd0JMLGtDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJDb21wb25lbnRUeXBlLCBSZW5kZXJlclR5cGUyLCBUeXBlLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi9yZW5kZXJfc3RvcmUnO1xuXG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZXJpYWxpemVyVHlwZXMge1xuICAvLyBSZW5kZXJlclR5cGUyXG4gIFJFTkRFUkVSX1RZUEVfMixcbiAgLy8gUHJpbWl0aXZlIHR5cGVzXG4gIFBSSU1JVElWRSxcbiAgLy8gQW4gb2JqZWN0IHN0b3JlZCBpbiBhIFJlbmRlclN0b3JlXG4gIFJFTkRFUl9TVE9SRV9PQkpFQ1QsXG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvblR5cGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBocmVmOiBzdHJpbmcsIHB1YmxpYyBwcm90b2NvbDogc3RyaW5nLCBwdWJsaWMgaG9zdDogc3RyaW5nLCBwdWJsaWMgaG9zdG5hbWU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBwb3J0OiBzdHJpbmcsIHB1YmxpYyBwYXRobmFtZTogc3RyaW5nfG51bGwsIHB1YmxpYyBzZWFyY2g6IHN0cmluZywgcHVibGljIGhhc2g6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBvcmlnaW46IHN0cmluZykge31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlcmlhbGl6ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUpIHt9XG5cbiAgc2VyaWFsaXplKG9iajogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSk6IE9iamVjdCB7XG4gICAgaWYgKG9iaiA9PSBudWxsIHx8IHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJldHVybiBvYmoubWFwKHYgPT4gdGhpcy5zZXJpYWxpemUodiwgdHlwZSkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUob2JqKSAhO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gUmVuZGVyQ29tcG9uZW50VHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVSZW5kZXJlclR5cGUyKG9iaik7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBMb2NhdGlvblR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVMb2NhdGlvbihvYmopO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBkZXNlcmlhbGl6ZShtYXA6IGFueSwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUsIGRhdGE/OiBhbnkpOlxuICAgICAgYW55IHtcbiAgICBpZiAobWFwID09IG51bGwgfHwgdHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWFwKSkge1xuICAgICAgcmV0dXJuIG1hcC5tYXAodmFsID0+IHRoaXMuZGVzZXJpYWxpemUodmFsLCB0eXBlLCBkYXRhKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLmRlc2VyaWFsaXplKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBSZW5kZXJDb21wb25lbnRUeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVSZW5kZXJlclR5cGUyKG1hcCk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBMb2NhdGlvblR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZUxvY2F0aW9uKG1hcCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gZGVzZXJpYWxpemVyIGZvciB0eXBlICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VyaWFsaXplTG9jYXRpb24obG9jOiBMb2NhdGlvblR5cGUpOiBPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICAnaHJlZic6IGxvYy5ocmVmLFxuICAgICAgJ3Byb3RvY29sJzogbG9jLnByb3RvY29sLFxuICAgICAgJ2hvc3QnOiBsb2MuaG9zdCxcbiAgICAgICdob3N0bmFtZSc6IGxvYy5ob3N0bmFtZSxcbiAgICAgICdwb3J0JzogbG9jLnBvcnQsXG4gICAgICAncGF0aG5hbWUnOiBsb2MucGF0aG5hbWUsXG4gICAgICAnc2VhcmNoJzogbG9jLnNlYXJjaCxcbiAgICAgICdoYXNoJzogbG9jLmhhc2gsXG4gICAgICAnb3JpZ2luJzogbG9jLm9yaWdpbixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzZXJpYWxpemVMb2NhdGlvbihsb2M6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogTG9jYXRpb25UeXBlIHtcbiAgICByZXR1cm4gbmV3IExvY2F0aW9uVHlwZShcbiAgICAgICAgbG9jWydocmVmJ10sIGxvY1sncHJvdG9jb2wnXSwgbG9jWydob3N0J10sIGxvY1snaG9zdG5hbWUnXSwgbG9jWydwb3J0J10sIGxvY1sncGF0aG5hbWUnXSxcbiAgICAgICAgbG9jWydzZWFyY2gnXSwgbG9jWydoYXNoJ10sIGxvY1snb3JpZ2luJ10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZSh0eXBlOiBSZW5kZXJDb21wb25lbnRUeXBlKTogT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogdHlwZS5pZCxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IHR5cGUudGVtcGxhdGVVcmwsXG4gICAgICAnc2xvdENvdW50JzogdHlwZS5zbG90Q291bnQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyQ29tcG9uZW50VHlwZSB7XG4gICAgcmV0dXJuIG5ldyBSZW5kZXJDb21wb25lbnRUeXBlKFxuICAgICAgICBwcm9wc1snaWQnXSwgcHJvcHNbJ3RlbXBsYXRlVXJsJ10sIHByb3BzWydzbG90Q291bnQnXSxcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snZW5jYXBzdWxhdGlvbiddKSwgdGhpcy5kZXNlcmlhbGl6ZShwcm9wc1snc3R5bGVzJ10pLCB7fSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJlclR5cGUyKHR5cGU6IFJlbmRlcmVyVHlwZTIpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IHR5cGUuaWQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgICAgJ2RhdGEnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLmRhdGEpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyZXJUeXBlMiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wc1snaWQnXSxcbiAgICAgIGVuY2Fwc3VsYXRpb246IHByb3BzWydlbmNhcHN1bGF0aW9uJ10sXG4gICAgICBzdHlsZXM6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ3N0eWxlcyddKSxcbiAgICAgIGRhdGE6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ2RhdGEnXSlcbiAgICB9O1xuICB9XG59XG4iXX0=