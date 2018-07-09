/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ClientMessageBrokerFactory, FnArg, UiArguments } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
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
    WebWorkerRendererFactory2 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ClientMessageBrokerFactory, MessageBus,
            Serializer, RenderStore])
    ], WebWorkerRendererFactory2);
    return WebWorkerRendererFactory2;
}());
export { WebWorkerRendererFactory2 };
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
        var _a = tslib_1.__read(typeof target === 'string' ? [null, target, target + ":" + eventName] :
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
        this._rendererFactory.callUI(fnName, tslib_1.__spread([this.asFnArg], fnArgs));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBa0UsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFzQiwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDcEgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRTtJQUFBO0lBK0JBLENBQUM7SUE1QkMsa0NBQU0sR0FBTixVQUFPLFNBQWlCLEVBQUUsUUFBa0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0Ysb0NBQVEsR0FBUixVQUFTLFNBQWlCLEVBQUUsUUFBa0I7UUFDNUMsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gs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QUM7SUFBRCwwQkFBQztBQUFELENBQUMsQUFBdEUsSUFBc0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDbGllbnRNZXNzYWdlQnJva2VyLCBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgRm5BcmcsIFVpQXJndW1lbnRzfSBmcm9tICcuLi9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7RVZFTlRfMl9DSEFOTkVMLCBSRU5ERVJFUl8yX0NIQU5ORUx9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJy4uL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJpYWxpemVyLCBTZXJpYWxpemVyVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIE5hbWVkRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPjtcblxuICBsaXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikgeyB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKS5wdXNoKGNhbGxiYWNrKTsgfVxuXG4gIHVubGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKTtcbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0oZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldExpc3RlbmVycyhldmVudE5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uW10ge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcbiAgICB9XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJzID0gW107XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc2V0KGV2ZW50TmFtZSwgbGlzdGVuZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RlbmVycztcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3RhcmdldH06JHtldmVudE5hbWV9YDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgZ2xvYmFsRXZlbnRzID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbWVzc2FnZUJyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIG1lc3NhZ2VCcm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHVibGljIHJlbmRlclN0b3JlOiBSZW5kZXJTdG9yZSkge1xuICAgIHRoaXMuX21lc3NhZ2VCcm9rZXIgPSBtZXNzYWdlQnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSXzJfQ0hBTk5FTCk7XG4gICAgYnVzLmluaXRDaGFubmVsKEVWRU5UXzJfQ0hBTk5FTCk7XG4gICAgY29uc3Qgc291cmNlID0gYnVzLmZyb20oRVZFTlRfMl9DSEFOTkVMKTtcbiAgICBzb3VyY2Uuc3Vic2NyaWJlKHtuZXh0OiAobWVzc2FnZTogYW55KSA9PiB0aGlzLl9kaXNwYXRjaEV2ZW50KG1lc3NhZ2UpfSk7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgV2ViV29ya2VyUmVuZGVyZXIyKHRoaXMpO1xuXG4gICAgY29uc3QgaWQgPSB0aGlzLnJlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTtcbiAgICB0aGlzLnJlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLCBpZCk7XG4gICAgdGhpcy5jYWxsVUkoJ2NyZWF0ZVJlbmRlcmVyJywgW1xuICAgICAgbmV3IEZuQXJnKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyh0eXBlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yKSxcbiAgICAgIG5ldyBGbkFyZyhyZW5kZXJlciwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxuXG4gIGNhbGxVSShmbk5hbWU6IHN0cmluZywgZm5BcmdzOiBGbkFyZ1tdKSB7XG4gICAgY29uc3QgYXJncyA9IG5ldyBVaUFyZ3VtZW50cyhmbk5hbWUsIGZuQXJncyk7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBhbGxvY2F0ZU5vZGUoKTogV2ViV29ya2VyUmVuZGVyTm9kZSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFdlYldvcmtlclJlbmRlck5vZGUoKTtcbiAgICBjb25zdCBpZCA9IHRoaXMucmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMucmVuZGVyU3RvcmUuc3RvcmUocmVzdWx0LCBpZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZyZWVOb2RlKG5vZGU6IGFueSkgeyB0aGlzLnJlbmRlclN0b3JlLnJlbW92ZShub2RlKTsgfVxuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMucmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpOyB9XG5cbiAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChtZXNzYWdlOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQ6IFdlYldvcmtlclJlbmRlck5vZGUgPVxuICAgICAgICB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1lc3NhZ2VbJ2VsZW1lbnQnXSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpO1xuXG4gICAgY29uc3QgZXZlbnROYW1lID0gbWVzc2FnZVsnZXZlbnROYW1lJ107XG4gICAgY29uc3QgdGFyZ2V0ID0gbWVzc2FnZVsnZXZlbnRUYXJnZXQnXTtcbiAgICBjb25zdCBldmVudCA9IG1lc3NhZ2VbJ2V2ZW50J107XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLmdsb2JhbEV2ZW50cy5kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0LCBldmVudE5hbWUpLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuZXZlbnRzLmRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFdlYldvcmtlclJlbmRlcmVyRmFjdG9yeTIpIHt9XG5cbiAgcHJpdmF0ZSBhc0ZuQXJnID0gbmV3IEZuQXJnKHRoaXMsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKTtcblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignZGVzdHJveScpOyB9XG5cbiAgZGVzdHJveU5vZGUobm9kZTogYW55KSB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2Rlc3Ryb3lOb2RlJywgW25ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCldKTtcbiAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnkuZnJlZU5vZGUobm9kZSk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdjcmVhdGVFbGVtZW50JywgW1xuICAgICAgbmV3IEZuQXJnKG5hbWUpLFxuICAgICAgbmV3IEZuQXJnKG5hbWVzcGFjZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdjcmVhdGVDb21tZW50JywgW1xuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2NyZWF0ZVRleHQnLCBbXG4gICAgICBuZXcgRm5BcmcodmFsdWUpLFxuICAgICAgbmV3IEZuQXJnKG5vZGUsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2FwcGVuZENoaWxkJywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKG5ld0NoaWxkLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXBhcmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdpbnNlcnRCZWZvcmUnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmV3Q2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhyZWZDaGlsZCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlQ2hpbGQnLCBbXG4gICAgICBuZXcgRm5BcmcocGFyZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcob2xkQ2hpbGQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55KTogYW55IHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZWxlY3RSb290RWxlbWVudCcsIFtcbiAgICAgIG5ldyBGbkFyZyhzZWxlY3Rvck9yTm9kZSksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgIF0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncGFyZW50Tm9kZScsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcocmVzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5fcmVuZGVyZXJGYWN0b3J5LmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCduZXh0U2libGluZycsIFtcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcocmVzLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgXSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdzZXRBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgICBuZXcgRm5BcmcobmFtZXNwYWNlKSxcbiAgICBdKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lc3BhY2UpLFxuICAgIF0pO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ2FkZENsYXNzJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcobmFtZSksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcigncmVtb3ZlQ2xhc3MnLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICBdKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3NldFN0eWxlJywgW1xuICAgICAgbmV3IEZuQXJnKGVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5Bcmcoc3R5bGUpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICAgIG5ldyBGbkFyZyhmbGFncyksXG4gICAgXSk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIHRoaXMuY2FsbFVJV2l0aFJlbmRlcmVyKCdyZW1vdmVTdHlsZScsIFtcbiAgICAgIG5ldyBGbkFyZyhlbCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHN0eWxlKSxcbiAgICAgIG5ldyBGbkFyZyhmbGFncyksXG4gICAgXSk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0UHJvcGVydHknLCBbXG4gICAgICBuZXcgRm5BcmcoZWwsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lKSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSksXG4gICAgXSk7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignc2V0VmFsdWUnLCBbXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgbmV3IEZuQXJnKHZhbHVlKSxcbiAgICBdKTtcbiAgfVxuXG4gIGxpc3RlbihcbiAgICAgIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGxpc3RlbmVyOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6ICgpID0+IHZvaWQge1xuICAgIGNvbnN0IHVubGlzdGVuSWQgPSB0aGlzLl9yZW5kZXJlckZhY3RvcnkuYWxsb2NhdGVJZCgpO1xuXG4gICAgY29uc3QgW3RhcmdldEVsLCB0YXJnZXROYW1lLCBmdWxsTmFtZV06IFthbnksIHN0cmluZyB8IG51bGwsIHN0cmluZyB8IG51bGxdID1cbiAgICAgICAgdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBbbnVsbCwgdGFyZ2V0LCBgJHt0YXJnZXR9OiR7ZXZlbnROYW1lfWBdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0LCBudWxsLCBudWxsXTtcblxuICAgIGlmIChmdWxsTmFtZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5Lmdsb2JhbEV2ZW50cy5saXN0ZW4oZnVsbE5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0RWwuZXZlbnRzLmxpc3RlbihldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhbGxVSVdpdGhSZW5kZXJlcignbGlzdGVuJywgW1xuICAgICAgbmV3IEZuQXJnKHRhcmdldEVsLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICBuZXcgRm5BcmcodGFyZ2V0TmFtZSksXG4gICAgICBuZXcgRm5BcmcoZXZlbnROYW1lKSxcbiAgICAgIG5ldyBGbkFyZyh1bmxpc3RlbklkKSxcbiAgICBdKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoZnVsbE5hbWUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5Lmdsb2JhbEV2ZW50cy51bmxpc3RlbihmdWxsTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0RWwuZXZlbnRzLnVubGlzdGVuKGV2ZW50TmFtZSwgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5jYWxsVUlXaXRoUmVuZGVyZXIoJ3VubGlzdGVuJywgW25ldyBGbkFyZyh1bmxpc3RlbklkKV0pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNhbGxVSVdpdGhSZW5kZXJlcihmbk5hbWU6IHN0cmluZywgZm5BcmdzOiBGbkFyZ1tdID0gW10pIHtcbiAgICAvLyBhbHdheXMgcGFzcyB0aGUgcmVuZGVyZXIgYXMgdGhlIGZpcnN0IGFyZ1xuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jYWxsVUkoZm5OYW1lLCBbdGhpcy5hc0ZuQXJnLCAuLi5mbkFyZ3NdKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyTm9kZSB7IGV2ZW50cyA9IG5ldyBOYW1lZEV2ZW50RW1pdHRlcigpOyB9XG4iXX0=