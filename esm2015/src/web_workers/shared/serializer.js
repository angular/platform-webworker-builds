/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/shared/serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
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
            return obj.map((/**
             * @param {?} v
             * @return {?}
             */
            v => this.serialize(v, type)));
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return (/** @type {?} */ (this._renderStore.serialize(obj)));
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
            return map.map((/**
             * @param {?} val
             * @return {?}
             */
            val => this.deserialize(val, type, data)));
        }
        if (type === 2 /* RENDER_STORE_OBJECT */) {
            return this._renderStore.deserialize(map);
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
    { type: Injectable }
];
/** @nocollapse */
Serializer.ctorParameters = () => [
    { type: RenderStore }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Serializer.prototype._renderStore;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBUTNDLE1BQWtCLGVBQWU7SUFDL0IsZ0JBQWdCO0lBQ2hCLGVBQWUsR0FBQTtJQUNmLGtCQUFrQjtJQUNsQixTQUFTLEdBQUE7SUFDVCxvQ0FBb0M7SUFDcEMsbUJBQW1CLEdBQUE7RUFDcEI7O0FBRUQsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7Ozs7OztJQUN2QixZQUNXLElBQVksRUFBUyxRQUFnQixFQUFTLElBQVksRUFBUyxRQUFnQixFQUNuRixJQUFZLEVBQVMsUUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUN0RixNQUFjO1FBRmQsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNuRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3RGLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0NBQzlCOzs7SUFISyw0QkFBbUI7O0lBQUUsZ0NBQXVCOztJQUFFLDRCQUFtQjs7SUFBRSxnQ0FBdUI7O0lBQzFGLDRCQUFtQjs7SUFBRSxnQ0FBNEI7O0lBQUUsOEJBQXFCOztJQUFFLDRCQUFtQjs7SUFDN0YsOEJBQXFC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QUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFDeEYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7Ozs7SUFFTyx1QkFBdUIsQ0FBQyxJQUFtQjtRQUNqRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2IsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNuRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVPLHlCQUF5QixDQUFDLEtBQTJCO1FBQzNELE9BQU87WUFDTCxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEMsQ0FBQztJQUNKLENBQUM7OztZQS9FRixVQUFVOzs7O1lBeEJILFdBQVc7Ozs7Ozs7SUEwQkwsa0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyVHlwZTIsIFR5cGUsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3JlbmRlcl9zdG9yZSc7XG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gU2VyaWFsaXplclR5cGVzIHtcbiAgLy8gUmVuZGVyZXJUeXBlMlxuICBSRU5ERVJFUl9UWVBFXzIsXG4gIC8vIFByaW1pdGl2ZSB0eXBlc1xuICBQUklNSVRJVkUsXG4gIC8vIEFuIG9iamVjdCBzdG9yZWQgaW4gYSBSZW5kZXJTdG9yZVxuICBSRU5ERVJfU1RPUkVfT0JKRUNULFxufVxuXG5leHBvcnQgY2xhc3MgTG9jYXRpb25UeXBlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaHJlZjogc3RyaW5nLCBwdWJsaWMgcHJvdG9jb2w6IHN0cmluZywgcHVibGljIGhvc3Q6IHN0cmluZywgcHVibGljIGhvc3RuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcG9ydDogc3RyaW5nLCBwdWJsaWMgcGF0aG5hbWU6IHN0cmluZ3xudWxsLCBwdWJsaWMgc2VhcmNoOiBzdHJpbmcsIHB1YmxpYyBoYXNoOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmcpIHt9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJpYWxpemVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7fVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpOiBPYmplY3Qge1xuICAgIGlmIChvYmogPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gb2JqLm1hcCh2ID0+IHRoaXMuc2VyaWFsaXplKHYsIHR5cGUpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuc2VyaWFsaXplKG9iaikhO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSwgZGF0YT86IGFueSk6XG4gICAgICBhbnkge1xuICAgIGlmIChtYXAgPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXApKSB7XG4gICAgICByZXR1cm4gbWFwLm1hcCh2YWwgPT4gdGhpcy5kZXNlcmlhbGl6ZSh2YWwsIHR5cGUsIGRhdGEpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplTG9jYXRpb24obWFwKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZUxvY2F0aW9uKGxvYzoge1trZXk6IHN0cmluZ106IGFueX0pOiBMb2NhdGlvblR5cGUge1xuICAgIHJldHVybiBuZXcgTG9jYXRpb25UeXBlKFxuICAgICAgICBsb2NbJ2hyZWYnXSwgbG9jWydwcm90b2NvbCddLCBsb2NbJ2hvc3QnXSwgbG9jWydob3N0bmFtZSddLCBsb2NbJ3BvcnQnXSwgbG9jWydwYXRobmFtZSddLFxuICAgICAgICBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJlclR5cGUyKHR5cGU6IFJlbmRlcmVyVHlwZTIpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IHR5cGUuaWQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgICAgJ2RhdGEnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLmRhdGEpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyZXJUeXBlMiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wc1snaWQnXSxcbiAgICAgIGVuY2Fwc3VsYXRpb246IHByb3BzWydlbmNhcHN1bGF0aW9uJ10sXG4gICAgICBzdHlsZXM6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ3N0eWxlcyddKSxcbiAgICAgIGRhdGE6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ2RhdGEnXSlcbiAgICB9O1xuICB9XG59XG4iXX0=