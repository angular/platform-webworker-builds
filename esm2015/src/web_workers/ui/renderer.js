/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/renderer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RendererFactory2 } from '@angular/core';
import { MessageBus } from '../shared/message_bus';
import { EVENT_2_CHANNEL, RENDERER_2_CHANNEL } from '../shared/messaging_api';
import { RenderStore } from '../shared/render_store';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
import { EventDispatcher } from '../ui/event_dispatcher';
export class MessageBasedRenderer2 {
    /**
     * @param {?} _brokerFactory
     * @param {?} _bus
     * @param {?} _serializer
     * @param {?} _renderStore
     * @param {?} _rendererFactory
     */
    constructor(_brokerFactory, _bus, _serializer, _renderStore, _rendererFactory) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rendererFactory = _rendererFactory;
    }
    /**
     * @return {?}
     */
    start() {
        /** @type {?} */
        const broker = this._brokerFactory.createMessageBroker(RENDERER_2_CHANNEL);
        this._bus.initChannel(EVENT_2_CHANNEL);
        this._eventDispatcher = new EventDispatcher(this._bus.to(EVENT_2_CHANNEL), this._serializer);
        const [RSO, P, CRT] = [
            2 /* RENDER_STORE_OBJECT */,
            1 /* PRIMITIVE */,
            0 /* RENDERER_TYPE_2 */,
        ];
        /** @type {?} */
        const methods = [
            ['createRenderer', this.createRenderer, RSO, CRT, P],
            ['createElement', this.createElement, RSO, P, P, P],
            ['createComment', this.createComment, RSO, P, P],
            ['createText', this.createText, RSO, P, P],
            ['appendChild', this.appendChild, RSO, RSO, RSO],
            ['insertBefore', this.insertBefore, RSO, RSO, RSO, RSO],
            ['removeChild', this.removeChild, RSO, RSO, RSO],
            ['selectRootElement', this.selectRootElement, RSO, P, P],
            ['parentNode', this.parentNode, RSO, RSO, P],
            ['nextSibling', this.nextSibling, RSO, RSO, P],
            ['setAttribute', this.setAttribute, RSO, RSO, P, P, P],
            ['removeAttribute', this.removeAttribute, RSO, RSO, P, P],
            ['addClass', this.addClass, RSO, RSO, P],
            ['removeClass', this.removeClass, RSO, RSO, P],
            ['setStyle', this.setStyle, RSO, RSO, P, P, P],
            ['removeStyle', this.removeStyle, RSO, RSO, P, P],
            ['setProperty', this.setProperty, RSO, RSO, P, P],
            ['setValue', this.setValue, RSO, RSO, P],
            ['listen', this.listen, RSO, RSO, P, P, P],
            ['unlisten', this.unlisten, RSO, RSO],
            ['destroy', this.destroy, RSO],
            ['destroyNode', this.destroyNode, RSO, P]
        ];
        methods.forEach((/**
         * @param {?} __0
         * @return {?}
         */
        ([name, method, ...argTypes]) => {
            broker.registerMethod(name, argTypes, method.bind(this));
        }));
    }
    /**
     * @private
     * @param {?} r
     * @return {?}
     */
    destroy(r) {
        r.destroy();
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @return {?}
     */
    destroyNode(r, node) {
        if (r.destroyNode) {
            r.destroyNode(node);
        }
        this._renderStore.remove(node);
    }
    /**
     * @private
     * @param {?} el
     * @param {?} type
     * @param {?} id
     * @return {?}
     */
    createRenderer(el, type, id) {
        this._renderStore.store(this._rendererFactory.createRenderer(el, type), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} name
     * @param {?} namespace
     * @param {?} id
     * @return {?}
     */
    createElement(r, name, namespace, id) {
        this._renderStore.store(r.createElement(name, namespace), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createComment(r, value, id) {
        this._renderStore.store(r.createComment(value), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} value
     * @param {?} id
     * @return {?}
     */
    createText(r, value, id) {
        this._renderStore.store(r.createText(value), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    appendChild(r, parent, child) {
        r.appendChild(parent, child);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @param {?} ref
     * @return {?}
     */
    insertBefore(r, parent, child, ref) {
        r.insertBefore(parent, child, ref);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    removeChild(r, parent, child) {
        r.removeChild(parent, child);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} selector
     * @param {?} id
     * @return {?}
     */
    selectRootElement(r, selector, id) {
        this._renderStore.store(r.selectRootElement(selector), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    parentNode(r, node, id) {
        this._renderStore.store(r.parentNode(node), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} id
     * @return {?}
     */
    nextSibling(r, node, id) {
        this._renderStore.store(r.nextSibling(node), id);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?} namespace
     * @return {?}
     */
    setAttribute(r, el, name, value, namespace) {
        r.setAttribute(el, name, value, namespace);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} namespace
     * @return {?}
     */
    removeAttribute(r, el, name, namespace) {
        r.removeAttribute(el, name, namespace);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(r, el, name) {
        r.addClass(el, name);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(r, el, name) {
        r.removeClass(el, name);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(r, el, style, value, flags) {
        r.setStyle(el, style, value, flags);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(r, el, style, flags) {
        r.removeStyle(el, style, flags);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(r, el, name, value) {
        r.setProperty(el, name, value);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(r, node, value) {
        r.setValue(node, value);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} el
     * @param {?} elName
     * @param {?} eventName
     * @param {?} unlistenId
     * @return {?}
     */
    listen(r, el, elName, eventName, unlistenId) {
        /** @type {?} */
        const listener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            return this._eventDispatcher.dispatchRenderEvent(el, elName, eventName, event);
        });
        /** @type {?} */
        const unlisten = r.listen(el || elName, eventName, listener);
        this._renderStore.store(unlisten, unlistenId);
    }
    /**
     * @private
     * @param {?} r
     * @param {?} unlisten
     * @return {?}
     */
    unlisten(r, unlisten) {
        unlisten();
    }
}
MessageBasedRenderer2.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MessageBasedRenderer2.ctorParameters = () => [
    { type: ServiceMessageBrokerFactory },
    { type: MessageBus },
    { type: Serializer },
    { type: RenderStore },
    { type: RendererFactory2 }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._eventDispatcher;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._brokerFactory;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._bus;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._serializer;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._renderStore;
    /**
     * @type {?}
     * @private
     */
    MessageBasedRenderer2.prototype._rendererFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS13ZWJ3b3JrZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDO0FBRTFHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxVQUFVLEVBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUF1QiwyQkFBMkIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUd2RCxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7OztJQUloQyxZQUNZLGNBQTJDLEVBQVUsSUFBZ0IsRUFDckUsV0FBdUIsRUFBVSxZQUF5QixFQUMxRCxnQkFBa0M7UUFGbEMsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQzFELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDOzs7O0lBRWxELEtBQUs7O2NBQ0csTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUM7UUFFMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixH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LENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7OztJQUVPLFFBQVEsQ0FBQyxDQUFZLEVBQUUsSUFBUyxFQUFFLEtBQWE7UUFDckQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Ozs7Ozs7OztJQUVPLE1BQU0sQ0FBQyxDQUFZLEVBQUUsRUFBTyxFQUFFLE1BQWMsRUFBRSxTQUFpQixFQUFFLFVBQWtCOztjQUNuRixRQUFROzs7O1FBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUE7O2NBRUssUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7Ozs7O0lBRU8sUUFBUSxDQUFDLENBQVksRUFBRSxRQUF1QjtRQUNwRCxRQUFRLEVBQUUsQ0FBQztJQUNiLENBQUM7OztZQW5KRixVQUFVOzs7O1lBSG1CLDJCQUEyQjtZQUpqRCxVQUFVO1lBR1YsVUFBVTtZQURWLFdBQVc7WUFKWSxnQkFBZ0I7Ozs7Ozs7SUFZN0MsaURBQTJDOzs7OztJQUd2QywrQ0FBbUQ7Ozs7O0lBQUUscUNBQXdCOzs7OztJQUM3RSw0Q0FBK0I7Ozs7O0lBQUUsNkNBQWlDOzs7OztJQUNsRSxpREFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICcuLi9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFVkVOVF8yX0NIQU5ORUwsIFJFTkRFUkVSXzJfQ0hBTk5FTH0gZnJvbSAnLi4vc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnLi4vc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlciwgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICcuLi9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi4vdWkvZXZlbnRfZGlzcGF0Y2hlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRSZW5kZXJlcjIge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfZXZlbnREaXNwYXRjaGVyITogRXZlbnREaXNwYXRjaGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBwcml2YXRlIF9idXM6IE1lc3NhZ2VCdXMsXG4gICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSXzJfQ0hBTk5FTCk7XG5cbiAgICB0aGlzLl9idXMuaW5pdENoYW5uZWwoRVZFTlRfMl9DSEFOTkVMKTtcbiAgICB0aGlzLl9ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKHRoaXMuX2J1cy50byhFVkVOVF8yX0NIQU5ORUwpLCB0aGlzLl9zZXJpYWxpemVyKTtcblxuICAgIGNvbnN0IFtSU08sIFAsIENSVF0gPSBbXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCxcbiAgICAgIFNlcmlhbGl6ZXJUeXBlcy5QUklNSVRJVkUsXG4gICAgICBTZXJpYWxpemVyVHlwZXMuUkVOREVSRVJfVFlQRV8yLFxuICAgIF07XG5cbiAgICBjb25zdCBtZXRob2RzOiBhbnlbXVtdID0gW1xuICAgICAgWydjcmVhdGVSZW5kZXJlcicsIHRoaXMuY3JlYXRlUmVuZGVyZXIsIFJTTywgQ1JULCBQXSxcbiAgICAgIFsnY3JlYXRlRWxlbWVudCcsIHRoaXMuY3JlYXRlRWxlbWVudCwgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsnY3JlYXRlQ29tbWVudCcsIHRoaXMuY3JlYXRlQ29tbWVudCwgUlNPLCBQLCBQXSxcbiAgICAgIFsnY3JlYXRlVGV4dCcsIHRoaXMuY3JlYXRlVGV4dCwgUlNPLCBQLCBQXSxcbiAgICAgIFsnYXBwZW5kQ2hpbGQnLCB0aGlzLmFwcGVuZENoaWxkLCBSU08sIFJTTywgUlNPXSxcbiAgICAgIFsnaW5zZXJ0QmVmb3JlJywgdGhpcy5pbnNlcnRCZWZvcmUsIFJTTywgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ3JlbW92ZUNoaWxkJywgdGhpcy5yZW1vdmVDaGlsZCwgUlNPLCBSU08sIFJTT10sXG4gICAgICBbJ3NlbGVjdFJvb3RFbGVtZW50JywgdGhpcy5zZWxlY3RSb290RWxlbWVudCwgUlNPLCBQLCBQXSxcbiAgICAgIFsncGFyZW50Tm9kZScsIHRoaXMucGFyZW50Tm9kZSwgUlNPLCBSU08sIFBdLFxuICAgICAgWyduZXh0U2libGluZycsIHRoaXMubmV4dFNpYmxpbmcsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnc2V0QXR0cmlidXRlJywgdGhpcy5zZXRBdHRyaWJ1dGUsIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsncmVtb3ZlQXR0cmlidXRlJywgdGhpcy5yZW1vdmVBdHRyaWJ1dGUsIFJTTywgUlNPLCBQLCBQXSxcbiAgICAgIFsnYWRkQ2xhc3MnLCB0aGlzLmFkZENsYXNzLCBSU08sIFJTTywgUF0sXG4gICAgICBbJ3JlbW92ZUNsYXNzJywgdGhpcy5yZW1vdmVDbGFzcywgUlNPLCBSU08sIFBdLFxuICAgICAgWydzZXRTdHlsZScsIHRoaXMuc2V0U3R5bGUsIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsncmVtb3ZlU3R5bGUnLCB0aGlzLnJlbW92ZVN0eWxlLCBSU08sIFJTTywgUCwgUF0sXG4gICAgICBbJ3NldFByb3BlcnR5JywgdGhpcy5zZXRQcm9wZXJ0eSwgUlNPLCBSU08sIFAsIFBdLFxuICAgICAgWydzZXRWYWx1ZScsIHRoaXMuc2V0VmFsdWUsIFJTTywgUlNPLCBQXSxcbiAgICAgIFsnbGlzdGVuJywgdGhpcy5saXN0ZW4sIFJTTywgUlNPLCBQLCBQLCBQXSxcbiAgICAgIFsndW5saXN0ZW4nLCB0aGlzLnVubGlzdGVuLCBSU08sIFJTT10sXG4gICAgICBbJ2Rlc3Ryb3knLCB0aGlzLmRlc3Ryb3ksIFJTT10sXG4gICAgICBbJ2Rlc3Ryb3lOb2RlJywgdGhpcy5kZXN0cm95Tm9kZSwgUlNPLCBQXVxuXG4gICAgXTtcblxuICAgIG1ldGhvZHMuZm9yRWFjaCgoW25hbWUsIG1ldGhvZCwgLi4uYXJnVHlwZXNdOiBhbnlbXSkgPT4ge1xuICAgICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKG5hbWUsIGFyZ1R5cGVzLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3kocjogUmVuZGVyZXIyKSB7XG4gICAgci5kZXN0cm95KCk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lOb2RlKHI6IFJlbmRlcmVyMiwgbm9kZTogYW55KSB7XG4gICAgaWYgKHIuZGVzdHJveU5vZGUpIHtcbiAgICAgIHIuZGVzdHJveU5vZGUobm9kZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlclN0b3JlLnJlbW92ZShub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVuZGVyZXIoZWw6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMiwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihlbCwgdHlwZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWxlbWVudChyOiBSZW5kZXJlcjIsIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21tZW50KHI6IFJlbmRlcmVyMiwgdmFsdWU6IHN0cmluZywgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIuY3JlYXRlQ29tbWVudCh2YWx1ZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGV4dChyOiBSZW5kZXJlcjIsIHZhbHVlOiBzdHJpbmcsIGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyLmNyZWF0ZVRleHQodmFsdWUpLCBpZCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZENoaWxkKHI6IFJlbmRlcmVyMiwgcGFyZW50OiBhbnksIGNoaWxkOiBhbnkpIHtcbiAgICByLmFwcGVuZENoaWxkKHBhcmVudCwgY2hpbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRCZWZvcmUocjogUmVuZGVyZXIyLCBwYXJlbnQ6IGFueSwgY2hpbGQ6IGFueSwgcmVmOiBhbnkpIHtcbiAgICByLmluc2VydEJlZm9yZShwYXJlbnQsIGNoaWxkLCByZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDaGlsZChyOiBSZW5kZXJlcjIsIHBhcmVudDogYW55LCBjaGlsZDogYW55KSB7XG4gICAgci5yZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0Um9vdEVsZW1lbnQocjogUmVuZGVyZXIyLCBzZWxlY3Rvcjogc3RyaW5nLCBpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUoci5zZWxlY3RSb290RWxlbWVudChzZWxlY3RvciksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyZW50Tm9kZShyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIucGFyZW50Tm9kZShub2RlKSwgaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0U2libGluZyhyOiBSZW5kZXJlcjIsIG5vZGU6IGFueSwgaWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHIubmV4dFNpYmxpbmcobm9kZSksIGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQXR0cmlidXRlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZykge1xuICAgIHIucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDbGFzcyhyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHIuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDbGFzcyhyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIHIucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKSB7XG4gICAgci5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVN0eWxlKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpIHtcbiAgICByLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRQcm9wZXJ0eShyOiBSZW5kZXJlcjIsIGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHIuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsdWUocjogUmVuZGVyZXIyLCBub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpIHtcbiAgICByLnNldFZhbHVlKG5vZGUsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuKHI6IFJlbmRlcmVyMiwgZWw6IGFueSwgZWxOYW1lOiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoUmVuZGVyRXZlbnQoZWwsIGVsTmFtZSwgZXZlbnROYW1lLCBldmVudCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHVubGlzdGVuID0gci5saXN0ZW4oZWwgfHwgZWxOYW1lLCBldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bmxpc3RlbiwgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIHVubGlzdGVuKHI6IFJlbmRlcmVyMiwgdW5saXN0ZW46ICgpID0+IGJvb2xlYW4pIHtcbiAgICB1bmxpc3RlbigpO1xuICB9XG59XG4iXX0=