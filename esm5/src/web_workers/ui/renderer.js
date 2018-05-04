/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable, RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
var MessageBasedRenderer2 = /** @class */ (function () {
    function MessageBasedRenderer2(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    MessageBasedRenderer2.prototype.start = function () {
        var _this = this;
        var broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        this._bus.initChannel(EVENT_2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
        var _a = tslib_1.__read([
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_2 */,
        ], 3), RSO = _a[0], P = _a[1], CRT = _a[2];
        var methods = [
            ['createRenderer', this.createRenderer, RSO, CRT, P],
            ['createElement', this.createElement, RSO, P, P, P],
            ['createComment', this.createComment, RSO, P, P], ['createText', this.createText, RSO, P, P],
            ['appendChild', this.appendChild, RSO, RSO, RSO],
            ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
            ['removeChild', this.removeChild, RSO, RSO, RSO],
            ['selectRootElement', this.selectRootElement, RSO, P, P],
            ['parentNode', this.parentNode, RSO, RSO, P], ['nextSibling', this.nextSibling, RSO, RSO, P],
            ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
            ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
            ['addClass', this.addClass, RSO, RSO, P], ['removeClass', this.removeClass, RSO, RSO, P],
            ['setStyle', this.setStyle, RSO, RSO, P, P, P],
            ['removeStyle', this.removeStyle, RSO, RSO, P, P],
            ['setProperty', this.setProperty, RSO, RSO, P, P], ['setValue', this.setValue, RSO, RSO, P],
            ['listen', this.listen, RSO, RSO, P, P, P], ['unlisten', this.unlisten, RSO, RSO],
            ['destroy', this.destroy, RSO], ['destroyNode', this.destroyNode, RSO, P]
        ];
        methods.forEach(function (_a) {
            var _b = tslib_1.__read(_a), name = _b[0], method = _b[1], argTypes = _b.slice(2);
            broker.registerMethod(name, argTypes, method.bind(_this));
        });
    };
    MessageBasedRenderer2.prototype.destroy = function (r) { r.destroy(); };
    MessageBasedRenderer2.prototype.destroyNode = function (r, node) {
        if (r.destroyNode) {
            r.destroyNode(node);
        }
        this._renderStore.remove(node);
    };
    MessageBasedRenderer2.prototype.createRenderer = function (el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    };
    MessageBasedRenderer2.prototype.createElement = function (r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    };
    MessageBasedRenderer2.prototype.createComment = function (r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    };
    MessageBasedRenderer2.prototype.createText = function (r, value, id) {
        this._renderStore.store(r.createText(value), id);
    };
    MessageBasedRenderer2.prototype.appendChild = function (r, parent, child) { r.appendChild(parent, child); };
    MessageBasedRenderer2.prototype.insertBefore = function (r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    };
    MessageBasedRenderer2.prototype.removeChild = function (r, parent, child) { r.removeChild(parent, child); };
    MessageBasedRenderer2.prototype.selectRootElement = function (r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    };
    MessageBasedRenderer2.prototype.parentNode = function (r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    };
    MessageBasedRenderer2.prototype.nextSibling = function (r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    };
    MessageBasedRenderer2.prototype.setAttribute = function (r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    };
    MessageBasedRenderer2.prototype.removeAttribute = function (r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    };
    MessageBasedRenderer2.prototype.addClass = function (r, el, name) { r.addClass(el, name); };
    MessageBasedRenderer2.prototype.removeClass = function (r, el, name) { r.removeClass(el, name); };
    MessageBasedRenderer2.prototype.setStyle = function (r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    };
    MessageBasedRenderer2.prototype.removeStyle = function (r, el, style, flags) {
        r.removeStyle(el, style, flags);
    };
    MessageBasedRenderer2.prototype.setProperty = function (r, el, name, value) {
        r.setProperty(el, name, value);
    };
    MessageBasedRenderer2.prototype.setValue = function (r, node, value) { r.setValue(node, value); };
    MessageBasedRenderer2.prototype.listen = function (r, el, elName, eventName, unlistenId) {
        var _this = this;
        var listener = function (event) {
            return _this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        };
        var unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    };
    MessageBasedRenderer2.prototype.unlisten = function (r, unlisten) { unlisten(); };
    MessageBasedRenderer2.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MessageBasedRenderer2.ctorParameters = function () { return [
        { type: ServiceMessageBrokerFactory, },
        { type: MessageBus, },
        { type: Serializer, },
        { type: RenderStore, },
        { type: RendererFactory2, },
    ]; };
    return MessageBasedRenderer2;
}());
export { MessageBasedRenderer2 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBYSxnQkFBZ0IsRUFBcUMsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQXVCLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDbkcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztJQU1yRCwrQkFDWSxjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsZ0JBQWtDO1FBRmxDLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUMxRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQUk7SUFFbEQscUNBQUssR0FBTDtRQUFBLGlCQW1DQztRQWxDQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFH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LENBQVksRUFBRSxJQUFTLEVBQUUsS0FBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFFN0Usc0NBQU0sR0FBZCxVQUFlLENBQVksRUFBRSxFQUFPLEVBQUUsTUFBYyxFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFBM0YsaUJBT0M7UUFOQyxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVU7WUFDMUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRixDQUFDO1FBRUYsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDL0M7SUFFTyx3Q0FBUSxHQUFoQixVQUFpQixDQUFZLEVBQUUsUUFBdUIsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFOztnQkE5SHhFLFVBQVU7Ozs7Z0JBSG1CLDJCQUEyQjtnQkFKakQsVUFBVTtnQkFHVixVQUFVO2dCQURWLFdBQVc7Z0JBSlksZ0JBQWdCOztnQ0FSL0M7O1NBa0JhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJy4uL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge0VWRU5UXzJfQ0hBTk5FTCwgUkVOREVSRVJfMl9DSEFOTkVMfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICcuLi9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyLCBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91aS9ldmVudF9kaXNwYXRjaGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFJlbmRlcmVyMiB7XG4gIHByaXZhdGUgX2V2ZW50RGlzcGF0Y2hlcjogRXZlbnREaXNwYXRjaGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBwcml2YXRlIF9idXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSXzJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9idXMuaW5pdENoYW5uZWwoRVZFTlRfMl9DSEFOTkVMKTtcbiAgICB0aGlzLl9ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKHRoaXMuX2J1cy50byhFVkVOVF8yX0NIQU5ORUwpLCB0aGlzLl9zZXJpYWxpemVyKTtcblxuICAgIGNvbnN0IFtSU08sIFAsIENSVF0gPSBbXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUsXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yLFxuICAgIF07XG5cbiAgICBjb25zdCBtZXRob2RzOiBhbnlbXVtdID0gW1xuICAgICAgWydjcmVhdGVSZW5kZXJlcicsIHRoaXMuY3JlYXRlUmVuZGVyZXIsIFJTTywgQ1JULCBQXSxcbiAgICAgIFsnY3JlYXRlRWxlbWVudCcsIHRoaXMuY3JlYXRlRWxlbWVudCwgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsnY3JlYXRlQ29tbWVudCcsIHRoaXMuY3JlYXRlQ29tbWVudCwgUlNPLCBQLCBQXSwgWydjcmVhdGVUZXh0JywgdGhpcy5jcmVhdGVUZXh0LCBSU08sIFAsIFBdLFxuICAgICAgWydhcHBlbmRDaGlsZCcsIHRoaXMuYXBwZW5kQ2hpbGQsIFJTTywgUlNPLCBSU09dLFxuICAgICAgWydpbnNlcnRCZWZvcmUnLCB0aGlzLmluc2VydEJlZm9yZSwgUlNPLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsncmVtb3ZlQ2hpbGQnLCB0aGlzLnJlbW92ZUNoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnc2VsZWN0Um9vdEVsZW1lbnQnLCB0aGlzLnNlbGVjdFJvb3RFbGVtZW50LCBSU08sIFAsIFBdLFxuICAgICAgWydwYXJlbnROb2RlJywgdGhpcy5wYXJlbnROb2RlLCBSU08sIFJTTywgUF0sIFsnbmV4dFNpYmxpbmcnLCB0aGlzLm5leHRTaWJsaW5nLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3NldEF0dHJpYnV0ZScsIHRoaXMuc2V0QXR0cmlidXRlLCBSU08sIFJTTywgUCwgUCwgUF0sXG4gICAgICBbJ3JlbW92ZUF0dHJpYnV0ZScsIHRoaXMucmVtb3ZlQXR0cmlidXRlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ2FkZENsYXNzJywgdGhpcy5hZGRDbGFzcywgUlNPLCBSU08sIFBdLCBbJ3JlbW92ZUNsYXNzJywgdGhpcy5yZW1vdmVDbGFzcywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRTdHlsZScsIHRoaXMuc2V0U3R5bGUsIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsncmVtb3ZlU3R5bGUnLCB0aGlzLnJlbW92ZVN0eWxlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ3NldFByb3BlcnR5JywgdGhpcy5zZXRQcm9wZXJ0eSwgUlNPLCBSU08sIFAsIFBdLCBbJ3NldFZhbHVlJywgdGhpcy5zZXRWYWx1ZSwgUlNPLCBSU08sIFBdLFxuICAgICAgWydsaXN0ZW4nLCB0aGlzLmxpc3RlbiwgUlNPLCBSU08sIFAsIFAsIFBdLCBbJ3VubGlzdGVuJywgdGhpcy51bmxpc3RlbiwgUlNPLCBSU09dLFxuICAgICAgWydkZXN0cm95JywgdGhpcy5kZXN0cm95LCBSU09dLCBbJ2Rlc3Ryb3lOb2RlJywgdGhpcy5kZXN0cm95Tm9kZSwgUlNPLCBQXVxuXG4gICAgXTtcblxuICAgIG1ldGhvZHMuZm9yRWFjaCgoW25hbWUsIG1ldGhvZCwgLi4uYXJnVHlwZXNdOiBhbnlbXSkgPT4ge1xuICAgICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKG5hbWUsIGFyZ1R5cGVzLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3kocjogUmVuZGVyZXIyKSB7IHIuZGVzdHJveSgpOyB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSkge1xuICAgIGlmIChyLmRlc3Ryb3lOb2RlKSB7XG4gICAgICByLmRlc3Ryb3lOb2RlKG5vZGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5yZW1vdmUobm9kZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlbmRlcmVyKGVsOiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh0aGlzLl9yZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoZWwsIHR5cGUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVsZW1lbnQocjogUmVuZGVyZXIyLCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tbWVudChyOiBSZW5kZXJlcjIsIHZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZUNvbW1lbnQodmFsdWUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRleHQocjogUmVuZGVyZXIyLCB2YWx1ZTogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5jcmVhdGVUZXh0KHZhbHVlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRDaGlsZChyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55KSB7IHIuYXBwZW5kQ2hpbGQocGFyZW50LCBjaGlsZCk7IH1cblxuICBwcml2YXRlIGluc2VydEJlZm9yZShyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55LCByZWY6IGFueSkge1xuICAgIHIuaW5zZXJ0QmVmb3JlKHBhcmVudCwgY2hpbGQsIHJlZik7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUNoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHsgci5yZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKTsgfVxuXG4gIHByaXZhdGUgc2VsZWN0Um9vdEVsZW1lbnQocjogUmVuZGVyZXIyLCBzZWxlY3Rvcjogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5zZWxlY3RSb290RWxlbWVudChzZWxlY3RvciksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyZW50Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIucGFyZW50Tm9kZShub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0U2libGluZyhyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIubmV4dFNpYmxpbmcobm9kZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDbGFzcyhyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZykgeyByLmFkZENsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MocjogUmVuZGVyZXIyLCBlbDogYW55LCBuYW1lOiBzdHJpbmcpIHsgci5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBwcml2YXRlIHNldFN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3R5bGUocjogUmVuZGVyZXIyLCBlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMikge1xuICAgIHIucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHNldFByb3BlcnR5KHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWYWx1ZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZykgeyByLnNldFZhbHVlKG5vZGUsIHZhbHVlKTsgfVxuXG4gIHByaXZhdGUgbGlzdGVuKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgZWxOYW1lOiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQoZWwsIGVsTmFtZSwgZXZlbnROYW1lLCBldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVubGlzdGVuID0gci5saXN0ZW4oZWwgfHwgZWxOYW1lLCBldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bmxpc3RlbiwgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIHVubGlzdGVuKHI6IFJlbmRlcmVyMiwgdW5saXN0ZW46ICgpID0+IGJvb2xlYW4pIHsgdW5saXN0ZW4oKTsgfVxufVxuIl19