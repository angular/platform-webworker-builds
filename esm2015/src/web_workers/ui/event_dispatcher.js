/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-webworker/src/web_workers/ui/event_dispatcher.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { serializeEventWithTarget, serializeGenericEvent, serializeKeyboardEvent, serializeMouseEvent, serializeTransitionEvent } from './event_serializer';
export class EventDispatcher {
    /**
     * @param {?} _sink
     * @param {?} _serializer
     */
    constructor(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    /**
     * @param {?} player
     * @param {?} phaseName
     * @param {?} element
     * @return {?}
     */
    dispatchAnimationEvent(player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    }
    /**
     * @param {?} element
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} event
     * @return {?}
     */
    dispatchRenderEvent(element, eventTarget, eventName, event) {
        /** @type {?} */
        let serializedEvent;
        // TODO (jteplitz602): support custom events #3350
        switch (event.type) {
            case 'click':
            case 'mouseup':
            case 'mousedown':
            case 'dblclick':
            case 'contextmenu':
            case 'mouseenter':
            case 'mouseleave':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'show':
                serializedEvent = serializeMouseEvent(event);
                break;
            case 'keydown':
            case 'keypress':
            case 'keyup':
                serializedEvent = serializeKeyboardEvent(event);
                break;
            case 'input':
            case 'change':
            case 'blur':
                serializedEvent = serializeEventWithTarget(event);
                break;
            case 'abort':
            case 'afterprint':
            case 'beforeprint':
            case 'cached':
            case 'canplay':
            case 'canplaythrough':
            case 'chargingchange':
            case 'chargingtimechange':
            case 'close':
            case 'dischargingtimechange':
            case 'DOMContentLoaded':
            case 'downloading':
            case 'durationchange':
            case 'emptied':
            case 'ended':
            case 'error':
            case 'fullscreenchange':
            case 'fullscreenerror':
            case 'invalid':
            case 'languagechange':
            case 'levelfchange':
            case 'loadeddata':
            case 'loadedmetadata':
            case 'obsolete':
            case 'offline':
            case 'online':
            case 'open':
            case 'orientatoinchange':
            case 'pause':
            case 'pointerlockchange':
            case 'pointerlockerror':
            case 'play':
            case 'playing':
            case 'ratechange':
            case 'readystatechange':
            case 'reset':
            case 'scroll':
            case 'seeked':
            case 'seeking':
            case 'stalled':
            case 'submit':
            case 'success':
            case 'suspend':
            case 'timeupdate':
            case 'updateready':
            case 'visibilitychange':
            case 'volumechange':
            case 'waiting':
                serializedEvent = serializeGenericEvent(event);
                break;
            case 'transitionend':
                serializedEvent = serializeTransitionEvent(event);
                break;
            default:
                throw new Error(eventName + ' not supported on WebWorkers');
        }
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'eventName': eventName,
            'eventTarget': eventTarget,
            'event': serializedEvent,
        });
        // TODO(kegluneq): Eventually, we want the user to indicate from the UI side whether the event
        // should be canceled, but for now just call `preventDefault` on the original DOM event.
        return false;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    EventDispatcher.prototype._sink;
    /**
     * @type {?}
     * @private
     */
    EventDispatcher.prototype._serializer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVVBLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTFKLE1BQU0sT0FBTyxlQUFlOzs7OztJQUMxQixZQUFvQixLQUF3QixFQUFVLFdBQXVCO1FBQXpELFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDOzs7Ozs7O0lBRWpGLHNCQUFzQixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLE9BQVk7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyw4QkFBc0M7WUFDbkYsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSw4QkFBc0M7WUFDMUYsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7OztJQUVELG1CQUFtQixDQUFDLE9BQVksRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsS0FBVTs7WUFDOUUsZUFBb0I7UUFDeEIsa0RBQWtEO1FBQ2xELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNsQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FB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Q0FBQztJQUNmLENBQUM7Q0FDRjs7Ozs7O0lBMUdhLGdDQUFnQzs7Ozs7SUFBRSxzQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFNlcmlhbGl6ZXJUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3NlcmlhbGl6ZXInO1xuXG5pbXBvcnQge3NlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldCwgc2VyaWFsaXplR2VuZXJpY0V2ZW50LCBzZXJpYWxpemVLZXlib2FyZEV2ZW50LCBzZXJpYWxpemVNb3VzZUV2ZW50LCBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnR9IGZyb20gJy4vZXZlbnRfc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PiwgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge31cblxuICBkaXNwYXRjaEFuaW1hdGlvbkV2ZW50KHBsYXllcjogYW55LCBwaGFzZU5hbWU6IHN0cmluZywgZWxlbWVudDogYW55KTogYm9vbGVhbiB7XG4gICAgdGhpcy5fc2luay5lbWl0KHtcbiAgICAgICdlbGVtZW50JzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoZWxlbWVudCwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ2FuaW1hdGlvblBsYXllcic6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKHBsYXllciwgU2VyaWFsaXplclR5cGVzLlJFTkRFUl9TVE9SRV9PQkpFQ1QpLFxuICAgICAgJ3BoYXNlTmFtZSc6IHBoYXNlTmFtZSxcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGRpc3BhdGNoUmVuZGVyRXZlbnQoZWxlbWVudDogYW55LCBldmVudFRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIGxldCBzZXJpYWxpemVkRXZlbnQ6IGFueTtcbiAgICAvLyBUT0RPIChqdGVwbGl0ejYwMik6IHN1cHBvcnQgY3VzdG9tIGV2ZW50cyAjMzM1MFxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgY2FzZSAnZGJsY2xpY2snOlxuICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxuICAgICAgY2FzZSAnbW91c2VlbnRlcic6XG4gICAgICBjYXNlICdtb3VzZWxlYXZlJzpcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgY2FzZSAnc2hvdyc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZU1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgY2FzZSAna2V5cHJlc3MnOlxuICAgICAgY2FzZSAna2V5dXAnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVLZXlib2FyZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYWJvcnQnOlxuICAgICAgY2FzZSAnYWZ0ZXJwcmludCc6XG4gICAgICBjYXNlICdiZWZvcmVwcmludCc6XG4gICAgICBjYXNlICdjYWNoZWQnOlxuICAgICAgY2FzZSAnY2FucGxheSc6XG4gICAgICBjYXNlICdjYW5wbGF5dGhyb3VnaCc6XG4gICAgICBjYXNlICdjaGFyZ2luZ2NoYW5nZSc6XG4gICAgICBjYXNlICdjaGFyZ2luZ3RpbWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgY2FzZSAnZGlzY2hhcmdpbmd0aW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ0RPTUNvbnRlbnRMb2FkZWQnOlxuICAgICAgY2FzZSAnZG93bmxvYWRpbmcnOlxuICAgICAgY2FzZSAnZHVyYXRpb25jaGFuZ2UnOlxuICAgICAgY2FzZSAnZW1wdGllZCc6XG4gICAgICBjYXNlICdlbmRlZCc6XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICBjYXNlICdmdWxsc2NyZWVuY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2Z1bGxzY3JlZW5lcnJvcic6XG4gICAgICBjYXNlICdpbnZhbGlkJzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2xldmVsZmNoYW5nZSc6XG4gICAgICBjYXNlICdsb2FkZWRkYXRhJzpcbiAgICAgIGNhc2UgJ2xvYWRlZG1ldGFkYXRhJzpcbiAgICAgIGNhc2UgJ29ic29sZXRlJzpcbiAgICAgIGNhc2UgJ29mZmxpbmUnOlxuICAgICAgY2FzZSAnb25saW5lJzpcbiAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgY2FzZSAnb3JpZW50YXRvaW5jaGFuZ2UnOlxuICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgY2FzZSAncG9pbnRlcmxvY2tjaGFuZ2UnOlxuICAgICAgY2FzZSAncG9pbnRlcmxvY2tlcnJvcic6XG4gICAgICBjYXNlICdwbGF5JzpcbiAgICAgIGNhc2UgJ3BsYXlpbmcnOlxuICAgICAgY2FzZSAncmF0ZWNoYW5nZSc6XG4gICAgICBjYXNlICdyZWFkeXN0YXRlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgIGNhc2UgJ3Njcm9sbCc6XG4gICAgICBjYXNlICdzZWVrZWQnOlxuICAgICAgY2FzZSAnc2Vla2luZyc6XG4gICAgICBjYXNlICdzdGFsbGVkJzpcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgIGNhc2UgJ3N1c3BlbmQnOlxuICAgICAgY2FzZSAndGltZXVwZGF0ZSc6XG4gICAgICBjYXNlICd1cGRhdGVyZWFkeSc6XG4gICAgICBjYXNlICd2aXNpYmlsaXR5Y2hhbmdlJzpcbiAgICAgIGNhc2UgJ3ZvbHVtZWNoYW5nZSc6XG4gICAgICBjYXNlICd3YWl0aW5nJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplR2VuZXJpY0V2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0cmFuc2l0aW9uZW5kJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXZlbnROYW1lICsgJyBub3Qgc3VwcG9ydGVkIG9uIFdlYldvcmtlcnMnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgJ2VsZW1lbnQnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAnZXZlbnROYW1lJzogZXZlbnROYW1lLFxuICAgICAgJ2V2ZW50VGFyZ2V0JzogZXZlbnRUYXJnZXQsXG4gICAgICAnZXZlbnQnOiBzZXJpYWxpemVkRXZlbnQsXG4gICAgfSk7XG5cbiAgICAvLyBUT0RPKGtlZ2x1bmVxKTogRXZlbnR1YWxseSwgd2Ugd2FudCB0aGUgdXNlciB0byBpbmRpY2F0ZSBmcm9tIHRoZSBVSSBzaWRlIHdoZXRoZXIgdGhlIGV2ZW50XG4gICAgLy8gc2hvdWxkIGJlIGNhbmNlbGVkLCBidXQgZm9yIG5vdyBqdXN0IGNhbGwgYHByZXZlbnREZWZhdWx0YCBvbiB0aGUgb3JpZ2luYWwgRE9NIGV2ZW50LlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19