import { __read, __spread } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import * as i0 from "@angular/core";
import * as i1 from "../shared/client_message_broker";
import * as i2 from "../shared/message_bus";
import * as i3 from "../shared/serializer";
import * as i4 from "../shared/render_store";
var NamedEventEmitter = /** @class */ (function () {
    function NamedEventEmitter() {
    }
    NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
    NamedEventEmitter.prototype.unlisten = function (eventName, listener) {
        var listeners = this._getListeners(eventName);
        var index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
    NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
        var listeners = this._getListeners(eventName);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    NamedEventEmitter.prototype._getListeners = function (eventName) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        var listeners = this._listeners.get(eventName);
        if (!listeners) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    };
    return NamedEventEmitter;
}());
export { NamedEventEmitter };
function eventNameWithTarget(target, eventName) {
    return target + ":" + eventName;
}
var WebWorkerRendererFactory2 = /** @class */ (function () {
    function WebWorkerRendererFactory2(messageBrokerFactory, bus, _serializer, renderStore) {
        var _this = this;
        this._serializer = _serializer;
        this.renderStore = renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._messageBroker = messageBrokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        bus.initChannel(EVENT_2_CHANNEL);
        var source = bus.from(EVENT_2_CHANNEL);
        source.subscribe({ next: function (message) { return _this._dispatchEvent(message); } });
    }
    WebWorkerRendererFactory2.prototype.createRenderer = function (element, type) {
        var renderer = new WebWorkerRenderer2(this);
        var id = this.renderStore.allocateId();
        this.renderStore.store(renderer, id);
        this.callUI('createRenderer', [
            new FnArg(element, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(type, 0 /* RENDERER_TYPE_2 */),
            new FnArg(renderer, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return renderer;
    };
    WebWorkerRendererFactory2.prototype.begin = function () { };
    WebWorkerRendererFactory2.prototype.end = function () { };
    WebWorkerRendererFactory2.prototype.callUI = function (fnName, fnArgs) {
        var args = new UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    WebWorkerRendererFactory2.prototype.allocateNode = function () {
        var result = new WebWorkerRenderNode();
        var id = this.renderStore.allocateId();
        this.renderStore.store(result, id);
        return result;
    };
    WebWorkerRendererFactory2.prototype.freeNode = function (node) { this.renderStore.remove(node); };
    WebWorkerRendererFactory2.prototype.allocateId = function () { return this.renderStore.allocateId(); };
    WebWorkerRendererFactory2.prototype._dispatchEvent = function (message) {
        var element = this._serializer.deserialize(message['element'], 2 /* RENDER_STORE_OBJECT */);
        var eventName = message['eventName'];
        var target = message['eventTarget'];
        var event = message['event'];
        if (target) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            element.events.dispatchEvent(eventName, event);
        }
    };
    WebWorkerRendererFactory2.ɵfac = function WebWorkerRendererFactory2_Factory(t) { return new (t || WebWorkerRendererFactory2)(i0.ɵɵinject(i1.ClientMessageBrokerFactory), i0.ɵɵinject(i2.MessageBus), i0.ɵɵinject(i3.Serializer), i0.ɵɵinject(i4.RenderStore)); };
    WebWorkerRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerRendererFactory2, factory: function (t) { return WebWorkerRendererFactory2.ɵfac(t); }, providedIn: null });
    return WebWorkerRendererFactory2;
}());
export { WebWorkerRendererFactory2 };
/*@__PURE__*/ i0.ɵsetClassMetadata(WebWorkerRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }]; }, null);
var WebWorkerRenderer2 = /** @class */ (function () {
    function WebWorkerRenderer2(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    WebWorkerRenderer2.prototype.destroy = function () { this.callUIWithRenderer('destroy'); };
    WebWorkerRenderer2.prototype.destroyNode = function (node) {
        this.callUIWithRenderer('destroyNode', [new FnArg(node, 2 /* RENDER_STORE_OBJECT */)]);
        this._rendererFactory.freeNode(node);
    };
    WebWorkerRenderer2.prototype.createElement = function (name, namespace) {
        var node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createElement', [
            new FnArg(name),
            new FnArg(namespace),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    WebWorkerRenderer2.prototype.createComment = function (value) {
        var node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createComment', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    WebWorkerRenderer2.prototype.createText = function (value) {
        var node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('createText', [
            new FnArg(value),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    WebWorkerRenderer2.prototype.appendChild = function (parent, newChild) {
        this.callUIWithRenderer('appendChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    WebWorkerRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (!parent) {
            return;
        }
        this.callUIWithRenderer('insertBefore', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(newChild, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(refChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    WebWorkerRenderer2.prototype.removeChild = function (parent, oldChild) {
        this.callUIWithRenderer('removeChild', [
            new FnArg(parent, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(oldChild, 2 /* RENDER_STORE_OBJECT */),
        ]);
    };
    WebWorkerRenderer2.prototype.selectRootElement = function (selectorOrNode) {
        var node = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('selectRootElement', [
            new FnArg(selectorOrNode),
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return node;
    };
    WebWorkerRenderer2.prototype.parentNode = function (node) {
        var res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('parentNode', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    WebWorkerRenderer2.prototype.nextSibling = function (node) {
        var res = this._rendererFactory.allocateNode();
        this.callUIWithRenderer('nextSibling', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(res, 2 /* RENDER_STORE_OBJECT */),
        ]);
        return res;
    };
    WebWorkerRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        this.callUIWithRenderer('setAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
            new FnArg(namespace),
        ]);
    };
    WebWorkerRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        this.callUIWithRenderer('removeAttribute', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(namespace),
        ]);
    };
    WebWorkerRenderer2.prototype.addClass = function (el, name) {
        this.callUIWithRenderer('addClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    WebWorkerRenderer2.prototype.removeClass = function (el, name) {
        this.callUIWithRenderer('removeClass', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
        ]);
    };
    WebWorkerRenderer2.prototype.setStyle = function (el, style, value, flags) {
        this.callUIWithRenderer('setStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(value),
            new FnArg(flags),
        ]);
    };
    WebWorkerRenderer2.prototype.removeStyle = function (el, style, flags) {
        this.callUIWithRenderer('removeStyle', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(style),
            new FnArg(flags),
        ]);
    };
    WebWorkerRenderer2.prototype.setProperty = function (el, name, value) {
        this.callUIWithRenderer('setProperty', [
            new FnArg(el, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(name),
            new FnArg(value),
        ]);
    };
    WebWorkerRenderer2.prototype.setValue = function (node, value) {
        this.callUIWithRenderer('setValue', [
            new FnArg(node, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(value),
        ]);
    };
    WebWorkerRenderer2.prototype.listen = function (target, eventName, listener) {
        var _this = this;
        var unlistenId = this._rendererFactory.allocateId();
        var _a = __read(typeof target === 'string' ? [null, target, target + ":" + eventName] :
            [target, null, null], 3), targetEl = _a[0], targetName = _a[1], fullName = _a[2];
        if (fullName) {
            this._rendererFactory.globalEvents.listen(fullName, listener);
        }
        else {
            targetEl.events.listen(eventName, listener);
        }
        this.callUIWithRenderer('listen', [
            new FnArg(targetEl, 2 /* RENDER_STORE_OBJECT */),
            new FnArg(targetName),
            new FnArg(eventName),
            new FnArg(unlistenId),
        ]);
        return function () {
            if (fullName) {
                _this._rendererFactory.globalEvents.unlisten(fullName, listener);
            }
            else {
                targetEl.events.unlisten(eventName, listener);
            }
            _this.callUIWithRenderer('unlisten', [new FnArg(unlistenId)]);
        };
    };
    WebWorkerRenderer2.prototype.callUIWithRenderer = function (fnName, fnArgs) {
        if (fnArgs === void 0) { fnArgs = []; }
        // always pass the renderer as the first arg
        this._rendererFactory.callUI(fnName, __spread([this.asFnArg], fnArgs));
    };
    return WebWorkerRenderer2;
}());
export { WebWorkerRenderer2 };
var WebWorkerRenderNode = /** @class */ (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
    }
    return WebWorkerRenderNode;
}());
export { WebWorkerRenderNode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBRWpFO0lBQUE7SUFnQ0EsQ0FBQztJQTVCQyxrQ0FBTSxHQUFOLFVBQU8sU0FBaUIsRUFBRSxRQUFrQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRixvQ0FBUSxHQUFSLFVBQVMsU0FBaUIsRUFBRSxRQUFrQjtRQUM1QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFRCx5Q0FBYSxHQUFi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O1NBQ3RCLENBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxJQUFJLFFBQVEsRUFBRTtnQkFDWixLQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sK0NBQWtCLEdBQTFCLFVBQTJCLE1BQWMsRUFBRSxNQUFvQjtRQUFwQix1QkFBQSxFQUFBLFdBQW9CO1FBQzdELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sWUFBRyxJQUFJLENBQUMsT0FBTyxHQUFLLE1BQU0sRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFsTUQsSUFrTUM7O0FBRUQ7SUFBQTtRQUFtQyxXQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FBQyxBQUF0RSxJQUFzRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFVkVOVF8yX0NIQU5ORUwsIFJFTkRFUkVSXzJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi4vc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgTmFtZWRFdmVudEVtaXR0ZXIge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfbGlzdGVuZXJzICE6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+O1xuXG4gIGxpc3RlbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpLnB1c2goY2FsbGJhY2spOyB9XG5cbiAgdW5saXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpO1xuICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZTogc3RyaW5nKTogRnVuY3Rpb25bXSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xuICAgIH1cbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xuICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdGVuZXJzO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZXZlbnROYW1lV2l0aFRhcmdldCh0YXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7dGFyZ2V0fToke2V2ZW50TmFtZX1gO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBnbG9iYWxFdmVudHMgPSBuZXcgTmFtZWRFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9tZXNzYWdlQnJva2VyOiBDbGllbnRNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgbWVzc2FnZUJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBidXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwdWJsaWMgcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlciA9IG1lc3NhZ2VCcm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfMl9DSEFOTkVMKTtcbiAgICBidXMuaW5pdENoYW5uZWwoRVZFTlRfMl9DSEFOTkVMKTtcbiAgICBjb25zdCBzb3VyY2UgPSBidXMuZnJvbShFVkVOVF8yX0NIQU5ORUwpO1xuICAgIHNvdXJjZS5zdWJzY3JpYmUoe25leHQ6IChtZXNzYWdlOiBhbnkpID0+IHRoaXMuX2Rpc3BhdGNoRXZlbnQobWVzc2FnZSl9KTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBXZWJXb3JrZXJSZW5kZXJlcjIodGhpcyk7XG5cbiAgICBjb25zdCBpZCA9IHRoaXMucmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMucmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIsIGlkKTtcbiAgICB0aGlzLmNhbGxVSSgnY3JlYXRlUmVuZGVyZXInLCBbXG4gICAgICBuZXcgRm5BcmcoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHR5cGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJFUl9UWVBFXzIpLFxuICAgICAgbmV3IEZuQXJnKHJlbmRlcmVyLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG5cbiAgY2FsbFVJKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10pIHtcbiAgICBjb25zdCBhcmdzID0gbmV3IFVpQXJndW1lbnRzKGZuTmFtZSwgZm5BcmdzKTtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGFsbG9jYXRlTm9kZSgpOiBXZWJXb3JrZXJSZW5kZXJOb2RlIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgV2ViV29ya2VyUmVuZGVyTm9kZSgpO1xuICAgIGNvbnN0IGlkID0gdGhpcy5yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7XG4gICAgdGhpcy5yZW5kZXJTdG9yZS5zdG9yZShyZXN1bHQsIGlkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnJlZU5vZGUobm9kZTogYW55KSB7IHRoaXMucmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpOyB9XG5cbiAgYWxsb2NhdGVJZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7IH1cblxuICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KG1lc3NhZ2U6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudDogV2ViV29ya2VyUmVuZGVyTm9kZSA9XG4gICAgICAgIHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUobWVzc2FnZVsnZWxlbWVudCddLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCk7XG5cbiAgICBjb25zdCBldmVudE5hbWUgPSBtZXNzYWdlWydldmVudE5hbWUnXTtcbiAgICBjb25zdCB0YXJnZXQgPSBtZXNzYWdlWydldmVudFRhcmdldCddO1xuICAgIGNvbnN0IGV2ZW50ID0gbWVzc2FnZVsnZXZlbnQnXTtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMuZ2xvYmFsRXZlbnRzLmRpc3BhdGNoRXZlbnQoZXZlbnROYW1lV2l0aFRhcmdldCh0YXJnZXQsIGV2ZW50TmFtZSksIGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5ldmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeTogV2ViV29ya2VyUmVuZGVyZXJGYWN0b3J5Mikge31cblxuICBwcml2YXRlIGFzRm5BcmcgPSBuZXcgRm5BcmcodGhpcywgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpO1xuXG4gIGRlc3Ryb3koKTogdm9pZCB7IHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdkZXN0cm95Jyk7IH1cblxuICBkZXN0cm95Tm9kZShub2RlOiBhbnkpIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignZGVzdHJveU5vZGUnLCBbbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKV0pO1xuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5mcmVlTm9kZShub2RlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZUVsZW1lbnQnLCBbXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgICBuZXcgRm5BcmcobmFtZXNwYWNlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZUNvbW1lbnQnLCBbXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignY3JlYXRlVGV4dCcsIFtcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignYXBwZW5kQ2hpbGQnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmV3Q2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2luc2VydEJlZm9yZScsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuZXdDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHJlZkNoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVDaGlsZCcsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhvbGRDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NlbGVjdFJvb3RFbGVtZW50JywgW1xuICAgICAgbmV3IEZuQXJnKHNlbGVjdG9yT3JOb2RlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdwYXJlbnROb2RlJywgW1xuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZXMsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICBjb25zdCByZXMgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ25leHRTaWJsaW5nJywgW1xuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZXMsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldEF0dHJpYnV0ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lc3BhY2UpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZUF0dHJpYnV0ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKG5hbWVzcGFjZSksXG4gICAgXSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignYWRkQ2xhc3MnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVDbGFzcycsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgIF0pO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0U3R5bGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhzdHlsZSksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKGZsYWdzKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3JlbW92ZVN0eWxlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcoc3R5bGUpLFxuICAgICAgbmV3IEZuQXJnKGZsYWdzKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRQcm9wZXJ0eScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRWYWx1ZScsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgIF0pO1xuICB9XG5cbiAgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgbGlzdGVuZXI6IChldmVudDogYW55KSA9PiBib29sZWFuKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgdW5saXN0ZW5JZCA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZUlkKCk7XG5cbiAgICBjb25zdCBbdGFyZ2V0RWwsIHRhcmdldE5hbWUsIGZ1bGxOYW1lXTogW2FueSwgc3RyaW5nIHwgbnVsbCwgc3RyaW5nIHwgbnVsbF0gPVxuICAgICAgICB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IFtudWxsLCB0YXJnZXQsIGAke3RhcmdldH06JHtldmVudE5hbWV9YF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXQsIG51bGwsIG51bGxdO1xuXG4gICAgaWYgKGZ1bGxOYW1lKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLmxpc3RlbihmdWxsTmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRFbC5ldmVudHMubGlzdGVuKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdsaXN0ZW4nLCBbXG4gICAgICBuZXcgRm5BcmcodGFyZ2V0RWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh0YXJnZXROYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhldmVudE5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHVubGlzdGVuSWQpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChmdWxsTmFtZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLnVubGlzdGVuKGZ1bGxOYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRFbC5ldmVudHMudW5saXN0ZW4oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigndW5saXN0ZW4nLCBbbmV3IEZuQXJnKHVubGlzdGVuSWQpXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFVJV2l0aFJlbmRlcmVyKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10gPSBbXSkge1xuICAgIC8vIGFsd2F5cyBwYXNzIHRoZSByZW5kZXJlciBhcyB0aGUgZmlyc3QgYXJnXG4gICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNhbGxVSShmbk5hbWUsIFt0aGlzLmFzRm5BcmcsIC4uLmZuQXJnc10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJOb2RlIHsgZXZlbnRzID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7IH1cbiJdfQ==