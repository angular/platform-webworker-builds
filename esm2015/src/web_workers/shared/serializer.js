/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, ɵstringify as stringify } from '@angular/core';
import { RenderStore } from './render_store';
import * as i0 from "@angular/core";
import * as i1 from "./render_store";
export class LocationType {
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
let Serializer = /** @class */ (() => {
    class Serializer {
        constructor(_renderStore) {
            this._renderStore = _renderStore;
        }
        serialize(obj, type = 1 /* PRIMITIVE */) {
            if (obj == null || type === 1 /* PRIMITIVE */) {
                return obj;
            }
            if (Array.isArray(obj)) {
                return obj.map(v => this.serialize(v, type));
            }
            if (type === 2 /* RENDER_STORE_OBJECT */) {
                return this._renderStore.serialize(obj);
            }
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._serializeRendererType2(obj);
            }
            if (type === LocationType) {
                return this._serializeLocation(obj);
            }
            throw new Error(`No serializer for type ${stringify(type)}`);
        }
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
            if (type === 0 /* RENDERER_TYPE_2 */) {
                return this._deserializeRendererType2(map);
            }
            if (type === LocationType) {
                return this._deserializeLocation(map);
            }
            throw new Error(`No deserializer for type ${stringify(type)}`);
        }
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
        _deserializeLocation(loc) {
            return new LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
        }
        _serializeRendererType2(type) {
            return {
                'id': type.id,
                'encapsulation': this.serialize(type.encapsulation),
                'styles': this.serialize(type.styles),
                'data': this.serialize(type.data),
            };
        }
        _deserializeRendererType2(props) {
            return {
                id: props['id'],
                encapsulation: props['encapsulation'],
                styles: this.deserialize(props['styles']),
                data: this.deserialize(props['data'])
            };
        }
    }
    Serializer.ɵfac = function Serializer_Factory(t) { return new (t || Serializer)(i0.ɵɵinject(i1.RenderStore)); };
    Serializer.ɵprov = i0.ɵɵdefineInjectable({ token: Serializer, factory: Serializer.ɵfac });
    return Serializer;
})();
export { Serializer };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Serializer, [{
        type: Injectable
    }], function () { return [{ type: i1.RenderStore }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBdUIsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWlCM0MsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFDVyxJQUFZLEVBQVMsUUFBZ0IsRUFBUyxJQUFZLEVBQVMsUUFBZ0IsRUFDbkYsSUFBWSxFQUFTLFFBQXFCLEVBQVMsTUFBYyxFQUFTLElBQVksRUFDdEYsTUFBYztRQUZkLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDbkYsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN0RixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztDQUM5QjtBQUVEO0lBQUEsTUFDYSxVQUFVO1FBQ3JCLFlBQW9CLFlBQXlCO1lBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQUcsQ0FBQztRQUVqRCxTQUFTLENBQUMsR0FBUSxFQUFFLHdCQUEyRDtZQUM3RSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxzQkFBOEIsRUFBRTtnQkFDckQsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIs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LENBQUM7Z0JBQ25ELFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEMsQ0FBQztRQUNKLENBQUM7UUFFTyx5QkFBeUIsQ0FBQyxLQUEyQjtZQUMzRCxPQUFPO2dCQUNMLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNmLGFBQWEsRUFBRSxLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUNyQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0QyxDQUFDO1FBQ0osQ0FBQzs7d0VBOUVVLFVBQVU7c0RBQVYsVUFBVSxXQUFWLFVBQVU7cUJBbEN2QjtLQWlIQztTQS9FWSxVQUFVO2tEQUFWLFVBQVU7Y0FEdEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyVHlwZTIsIFR5cGUsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuL3JlbmRlcl9zdG9yZSc7XG5cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBAZGVwcmVjYXRlZCBwbGF0Zm9ybS13ZWJ3b3JrZXIgaXMgZGVwcmVjYXRlZCBpbiBBbmd1bGFyIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvblxuICogICAgIG9mIEFuZ3VsYXJcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gU2VyaWFsaXplclR5cGVzIHtcbiAgLy8gUmVuZGVyZXJUeXBlMlxuICBSRU5ERVJFUl9UWVBFXzIsXG4gIC8vIFByaW1pdGl2ZSB0eXBlc1xuICBQUklNSVRJVkUsXG4gIC8vIEFuIG9iamVjdCBzdG9yZWQgaW4gYSBSZW5kZXJTdG9yZVxuICBSRU5ERVJfU1RPUkVfT0JKRUNULFxufVxuXG5leHBvcnQgY2xhc3MgTG9jYXRpb25UeXBlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaHJlZjogc3RyaW5nLCBwdWJsaWMgcHJvdG9jb2w6IHN0cmluZywgcHVibGljIGhvc3Q6IHN0cmluZywgcHVibGljIGhvc3RuYW1lOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcG9ydDogc3RyaW5nLCBwdWJsaWMgcGF0aG5hbWU6IHN0cmluZ3xudWxsLCBwdWJsaWMgc2VhcmNoOiBzdHJpbmcsIHB1YmxpYyBoYXNoOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmcpIHt9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJpYWxpemVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7fVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSwgdHlwZTogVHlwZTxhbnk+fFNlcmlhbGl6ZXJUeXBlcyA9IFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUpOiBPYmplY3Qge1xuICAgIGlmIChvYmogPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gb2JqLm1hcCh2ID0+IHRoaXMuc2VyaWFsaXplKHYsIHR5cGUpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuc2VyaWFsaXplKG9iaikhO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gU2VyaWFsaXplclR5cGVzLlJFTkRFUkVSX1RZUEVfMikge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVJlbmRlcmVyVHlwZTIob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gc2VyaWFsaXplciBmb3IgdHlwZSAke3N0cmluZ2lmeSh0eXBlKX1gKTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBUeXBlPGFueT58U2VyaWFsaXplclR5cGVzID0gU2VyaWFsaXplclR5cGVzLlBSSU1JVElWRSwgZGF0YT86IGFueSk6XG4gICAgICBhbnkge1xuICAgIGlmIChtYXAgPT0gbnVsbCB8fCB0eXBlID09PSBTZXJpYWxpemVyVHlwZXMuUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXApKSB7XG4gICAgICByZXR1cm4gbWFwLm1hcCh2YWwgPT4gdGhpcy5kZXNlcmlhbGl6ZSh2YWwsIHR5cGUsIGRhdGEpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIobWFwKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Rlc2VyaWFsaXplTG9jYXRpb24obWFwKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBkZXNlcmlhbGl6ZXIgZm9yIHR5cGUgJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZUxvY2F0aW9uKGxvYzoge1trZXk6IHN0cmluZ106IGFueX0pOiBMb2NhdGlvblR5cGUge1xuICAgIHJldHVybiBuZXcgTG9jYXRpb25UeXBlKFxuICAgICAgICBsb2NbJ2hyZWYnXSwgbG9jWydwcm90b2NvbCddLCBsb2NbJ2hvc3QnXSwgbG9jWydob3N0bmFtZSddLCBsb2NbJ3BvcnQnXSwgbG9jWydwYXRobmFtZSddLFxuICAgICAgICBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJlclR5cGUyKHR5cGU6IFJlbmRlcmVyVHlwZTIpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IHR5cGUuaWQsXG4gICAgICAnZW5jYXBzdWxhdGlvbic6IHRoaXMuc2VyaWFsaXplKHR5cGUuZW5jYXBzdWxhdGlvbiksXG4gICAgICAnc3R5bGVzJzogdGhpcy5zZXJpYWxpemUodHlwZS5zdHlsZXMpLFxuICAgICAgJ2RhdGEnOiB0aGlzLnNlcmlhbGl6ZSh0eXBlLmRhdGEpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kZXNlcmlhbGl6ZVJlbmRlcmVyVHlwZTIocHJvcHM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyZXJUeXBlMiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wc1snaWQnXSxcbiAgICAgIGVuY2Fwc3VsYXRpb246IHByb3BzWydlbmNhcHN1bGF0aW9uJ10sXG4gICAgICBzdHlsZXM6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ3N0eWxlcyddKSxcbiAgICAgIGRhdGE6IHRoaXMuZGVzZXJpYWxpemUocHJvcHNbJ2RhdGEnXSlcbiAgICB9O1xuICB9XG59XG4iXX0=