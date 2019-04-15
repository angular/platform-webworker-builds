/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBVUEsT0FBTyxFQUFDLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLHdCQUF3QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFMUosTUFBTSxPQUFPLGVBQWU7Ozs7O0lBQzFCLFlBQW9CLEtBQXdCLEVBQVUsV0FBdUI7UUFBekQsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7Ozs7Ozs7SUFFakYsc0JBQXNCLENBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsT0FBWTtRQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLDhCQUFzQztZQUNuRixpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLDhCQUFzQztZQUMxRixXQUFXLEVBQUUsU0FBUztTQUN2QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsT0FBWSxFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxLQUFVOztZQUM5RSxlQUFvQjtRQUN4QixrREFBa0Q7UUFDbEQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFdBQVcsQ0FBQztZQUNqQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFL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QUFDO0lBQ2YsQ0FBQztDQUNGOzs7Ozs7SUExR2EsZ0NBQWdDOzs7OztJQUFFLHNDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbmltcG9ydCB7c2VyaWFsaXplRXZlbnRXaXRoVGFyZ2V0LCBzZXJpYWxpemVHZW5lcmljRXZlbnQsIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQsIHNlcmlhbGl6ZU1vdXNlRXZlbnQsIHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudH0gZnJvbSAnLi9ldmVudF9zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+LCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7fVxuXG4gIGRpc3BhdGNoQW5pbWF0aW9uRXZlbnQocGxheWVyOiBhbnksIHBoYXNlTmFtZTogc3RyaW5nLCBlbGVtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgJ2VsZW1lbnQnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAnYW5pbWF0aW9uUGxheWVyJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocGxheWVyLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAncGhhc2VOYW1lJzogcGhhc2VOYW1lLFxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZGlzcGF0Y2hSZW5kZXJFdmVudChlbGVtZW50OiBhbnksIGV2ZW50VGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHNlcmlhbGl6ZWRFdmVudDogYW55O1xuICAgIC8vIFRPRE8gKGp0ZXBsaXR6NjAyKTogc3VwcG9ydCBjdXN0b20gZXZlbnRzICMzMzUwXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlICdjbGljayc6XG4gICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICBjYXNlICdjb250ZXh0bWVudSc6XG4gICAgICBjYXNlICdtb3VzZWVudGVyJzpcbiAgICAgIGNhc2UgJ21vdXNlbGVhdmUnOlxuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICBjYXNlICdrZXlwcmVzcyc6XG4gICAgICBjYXNlICdrZXl1cCc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnRXaXRoVGFyZ2V0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhYm9ydCc6XG4gICAgICBjYXNlICdhZnRlcnByaW50JzpcbiAgICAgIGNhc2UgJ2JlZm9yZXByaW50JzpcbiAgICAgIGNhc2UgJ2NhY2hlZCc6XG4gICAgICBjYXNlICdjYW5wbGF5JzpcbiAgICAgIGNhc2UgJ2NhbnBsYXl0aHJvdWdoJzpcbiAgICAgIGNhc2UgJ2NoYXJnaW5nY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2NoYXJnaW5ndGltZWNoYW5nZSc6XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICBjYXNlICdkaXNjaGFyZ2luZ3RpbWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnRE9NQ29udGVudExvYWRlZCc6XG4gICAgICBjYXNlICdkb3dubG9hZGluZyc6XG4gICAgICBjYXNlICdkdXJhdGlvbmNoYW5nZSc6XG4gICAgICBjYXNlICdlbXB0aWVkJzpcbiAgICAgIGNhc2UgJ2VuZGVkJzpcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIGNhc2UgJ2Z1bGxzY3JlZW5jaGFuZ2UnOlxuICAgICAgY2FzZSAnZnVsbHNjcmVlbmVycm9yJzpcbiAgICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2VjaGFuZ2UnOlxuICAgICAgY2FzZSAnbGV2ZWxmY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2xvYWRlZGRhdGEnOlxuICAgICAgY2FzZSAnbG9hZGVkbWV0YWRhdGEnOlxuICAgICAgY2FzZSAnb2Jzb2xldGUnOlxuICAgICAgY2FzZSAnb2ZmbGluZSc6XG4gICAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICBjYXNlICdvcmllbnRhdG9pbmNoYW5nZSc6XG4gICAgICBjYXNlICdwYXVzZSc6XG4gICAgICBjYXNlICdwb2ludGVybG9ja2NoYW5nZSc6XG4gICAgICBjYXNlICdwb2ludGVybG9ja2Vycm9yJzpcbiAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgY2FzZSAncGxheWluZyc6XG4gICAgICBjYXNlICdyYXRlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3JlYWR5c3RhdGVjaGFuZ2UnOlxuICAgICAgY2FzZSAncmVzZXQnOlxuICAgICAgY2FzZSAnc2Nyb2xsJzpcbiAgICAgIGNhc2UgJ3NlZWtlZCc6XG4gICAgICBjYXNlICdzZWVraW5nJzpcbiAgICAgIGNhc2UgJ3N0YWxsZWQnOlxuICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgY2FzZSAnc3VzcGVuZCc6XG4gICAgICBjYXNlICd0aW1ldXBkYXRlJzpcbiAgICAgIGNhc2UgJ3VwZGF0ZXJlYWR5JzpcbiAgICAgIGNhc2UgJ3Zpc2liaWxpdHljaGFuZ2UnOlxuICAgICAgY2FzZSAndm9sdW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3dhaXRpbmcnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVHZW5lcmljRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihldmVudE5hbWUgKyAnIG5vdCBzdXBwb3J0ZWQgb24gV2ViV29ya2VycycpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAnZWxlbWVudCc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdldmVudE5hbWUnOiBldmVudE5hbWUsXG4gICAgICAnZXZlbnRUYXJnZXQnOiBldmVudFRhcmdldCxcbiAgICAgICdldmVudCc6IHNlcmlhbGl6ZWRFdmVudCxcbiAgICB9KTtcblxuICAgIC8vIFRPRE8oa2VnbHVuZXEpOiBFdmVudHVhbGx5LCB3ZSB3YW50IHRoZSB1c2VyIHRvIGluZGljYXRlIGZyb20gdGhlIFVJIHNpZGUgd2hldGhlciB0aGUgZXZlbnRcbiAgICAvLyBzaG91bGQgYmUgY2FuY2VsZWQsIGJ1dCBmb3Igbm93IGp1c3QgY2FsbCBgcHJldmVudERlZmF1bHRgIG9uIHRoZSBvcmlnaW5hbCBET00gZXZlbnQuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=