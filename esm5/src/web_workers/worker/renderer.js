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
    NamedEventEmitter.prototype.listen = function (eventName, callback) {
        this._getListeners(eventName).push(callback);
    };
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
    WebWorkerRendererFactory2.prototype.freeNode = function (node) {
        this.renderStore.remove(node);
    };
    WebWorkerRendererFactory2.prototype.allocateId = function () {
        return this.renderStore.allocateId();
    };
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
    WebWorkerRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: WebWorkerRendererFactory2, factory: WebWorkerRendererFactory2.ɵfac });
    return WebWorkerRendererFactory2;
}());
export { WebWorkerRendererFactory2 };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(WebWorkerRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.ClientMessageBrokerFactory }, { type: i2.MessageBus }, { type: i3.Serializer }, { type: i4.RenderStore }]; }, null); })();
var WebWorkerRenderer2 = /** @class */ (function () {
    function WebWorkerRenderer2(_rendererFactory) {
        this._rendererFactory = _rendererFactory;
        this.data = Object.create(null);
        this.asFnArg = new FnArg(this, 2 /* RENDER_STORE_OBJECT */);
    }
    WebWorkerRenderer2.prototype.destroy = function () {
        this.callUIWithRenderer('destroy');
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBRWpFO0lBQUE7SUFrQ0EsQ0FBQztJQTlCQyxrQ0FBTSxHQUFOLFVBQU8sU0FBaUIsRUFBRSxRQUFrQjtRQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLFNBQWlCLEVBQUUsUUFBa0I7UUFDNUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQseUNBQWEsR0FB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U0FDdEIsQ0FBQyxDQUFDO1FBRUgsT0FBTztZQUNMLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNqRTtpQkFBTTtnQkFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDL0M7WUFDRCxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTywrQ0FBa0IsR0FBMUIsVUFBMkIsTUFBYyxFQUFFLE1BQW9CO1FBQXBCLHVCQUFBLEVBQUEsV0FBb0I7UUFDN0QsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFHLElBQUksQ0FBQyxPQUFPLEdBQUssTUFBTSxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXBNRCxJQW9NQzs7QUFFRDtJQUFBO1FBQ0UsV0FBTSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NsaWVudE1lc3NhZ2VCcm9rZXIsIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBGbkFyZywgVWlBcmd1bWVudHN9IGZyb20gJy4uL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFVkVOVF8yX0NIQU5ORUwsIFJFTkRFUkVSXzJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi4vc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgTmFtZWRFdmVudEVtaXR0ZXIge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfbGlzdGVuZXJzITogTWFwPHN0cmluZywgRnVuY3Rpb25bXT47XG5cbiAgbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHVubGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKTtcbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldExpc3RlbmVycyhldmVudE5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uW10ge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcbiAgICB9XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJzID0gW107XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbGlzdGVuZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RlbmVycztcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3RhcmdldH06JHtldmVudE5hbWV9YDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgZ2xvYmFsRXZlbnRzID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbWVzc2FnZUJyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIG1lc3NhZ2VCcm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHVibGljIHJlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge1xuICAgIHRoaXMuX21lc3NhZ2VCcm9rZXIgPSBtZXNzYWdlQnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSXzJfQ0hBTk5FTCk7XG4gICAgYnVzLmluaXRDaGFubmVsKEVWRU5UXzJfQ0hBTk5FTCk7XG4gICAgY29uc3Qgc291cmNlID0gYnVzLmZyb20oRVZFTlRfMl9DSEFOTkVMKTtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogYW55KSA9PiB0aGlzLl9kaXNwYXRjaEV2ZW50KG1lc3NhZ2UpfSk7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgV2ViV29ya2VyUmVuZGVyZXIyKHRoaXMpO1xuXG4gICAgY29uc3QgaWQgPSB0aGlzLnJlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTtcbiAgICB0aGlzLnJlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLCBpZCk7XG4gICAgdGhpcy5jYWxsVUkoJ2NyZWF0ZVJlbmRlcmVyJywgW1xuICAgICAgbmV3IEZuQXJnKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh0eXBlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSxcbiAgICAgIG5ldyBGbkFyZyhyZW5kZXJlciwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxuXG4gIGNhbGxVSShmbk5hbWU6IHN0cmluZywgZm5BcmdzOiBGbkFyZ1tdKSB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cyhmbk5hbWUsIGZuQXJncyk7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBhbGxvY2F0ZU5vZGUoKTogV2ViV29ya2VyUmVuZGVyTm9kZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFdlYldvcmtlclJlbmRlck5vZGUoKTtcbiAgICBjb25zdCBpZCA9IHRoaXMucmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMucmVuZGVyU3RvcmUuc3RvcmUocmVzdWx0LCBpZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZyZWVOb2RlKG5vZGU6IGFueSkge1xuICAgIHRoaXMucmVuZGVyU3RvcmUucmVtb3ZlKG5vZGUpO1xuICB9XG5cbiAgYWxsb2NhdGVJZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnJlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQobWVzc2FnZToge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50OiBXZWJXb3JrZXJSZW5kZXJOb2RlID1cbiAgICAgICAgdGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtZXNzYWdlWydlbGVtZW50J10sIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKTtcblxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IG1lc3NhZ2VbJ2V2ZW50TmFtZSddO1xuICAgIGNvbnN0IHRhcmdldCA9IG1lc3NhZ2VbJ2V2ZW50VGFyZ2V0J107XG4gICAgY29uc3QgZXZlbnQgPSBtZXNzYWdlWydldmVudCddO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGhpcy5nbG9iYWxFdmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldCwgZXZlbnROYW1lKSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmV2ZW50cy5kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSwgZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5OiBXZWJXb3JrZXJSZW5kZXJlckZhY3RvcnkyKSB7fVxuXG4gIHByaXZhdGUgYXNGbkFyZyA9IG5ldyBGbkFyZyh0aGlzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCk7XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignZGVzdHJveScpO1xuICB9XG5cbiAgZGVzdHJveU5vZGUobm9kZTogYW55KSB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2Rlc3Ryb3lOb2RlJywgW25ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCldKTtcbiAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZnJlZU5vZGUobm9kZSk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdjcmVhdGVFbGVtZW50JywgW1xuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKG5hbWVzcGFjZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdjcmVhdGVDb21tZW50JywgW1xuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZVRleHQnLCBbXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2FwcGVuZENoaWxkJywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5ld0NoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXBhcmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdpbnNlcnRCZWZvcmUnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmV3Q2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZWZDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlQ2hpbGQnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcob2xkQ2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55KTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZWxlY3RSb290RWxlbWVudCcsIFtcbiAgICAgIG5ldyBGbkFyZyhzZWxlY3Rvck9yTm9kZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncGFyZW50Tm9kZScsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcocmVzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCduZXh0U2libGluZycsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcocmVzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5BcmcobmFtZXNwYWNlKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lc3BhY2UpLFxuICAgIF0pO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2FkZENsYXNzJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlQ2xhc3MnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldFN0eWxlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcoc3R5bGUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhmbGFncyksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVTdHlsZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHN0eWxlKSxcbiAgICAgIG5ldyBGbkFyZyhmbGFncyksXG4gICAgXSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0UHJvcGVydHknLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgXSk7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0VmFsdWUnLCBbXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICBdKTtcbiAgfVxuXG4gIGxpc3RlbihcbiAgICAgIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6ICgpID0+IHZvaWQge1xuICAgIGNvbnN0IHVubGlzdGVuSWQgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVJZCgpO1xuXG4gICAgY29uc3QgW3RhcmdldEVsLCB0YXJnZXROYW1lLCBmdWxsTmFtZV06IFthbnksIHN0cmluZ3xudWxsLCBzdHJpbmd8bnVsbF0gPVxuICAgICAgICB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IFtudWxsLCB0YXJnZXQsIGAke3RhcmdldH06JHtldmVudE5hbWV9YF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXQsIG51bGwsIG51bGxdO1xuXG4gICAgaWYgKGZ1bGxOYW1lKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLmxpc3RlbihmdWxsTmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXRFbC5ldmVudHMubGlzdGVuKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdsaXN0ZW4nLCBbXG4gICAgICBuZXcgRm5BcmcodGFyZ2V0RWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh0YXJnZXROYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhldmVudE5hbWUpLFxuICAgICAgbmV3IEZuQXJnKHVubGlzdGVuSWQpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChmdWxsTmFtZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZ2xvYmFsRXZlbnRzLnVubGlzdGVuKGZ1bGxOYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRFbC5ldmVudHMudW5saXN0ZW4oZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigndW5saXN0ZW4nLCBbbmV3IEZuQXJnKHVubGlzdGVuSWQpXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsbFVJV2l0aFJlbmRlcmVyKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10gPSBbXSkge1xuICAgIC8vIGFsd2F5cyBwYXNzIHRoZSByZW5kZXJlciBhcyB0aGUgZmlyc3QgYXJnXG4gICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmNhbGxVSShmbk5hbWUsIFt0aGlzLmFzRm5BcmcsIC4uLmZuQXJnc10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJOb2RlIHtcbiAgZXZlbnRzID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=