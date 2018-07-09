import { serializeEventWithTarget, serializeGenericEvent, serializeKeyboardEvent, serializeMouseEvent, serializeTransitionEvent } from './event_serializer';
export class EventDispatcher {
    constructor(_sink, _serializer) {
        this._sink = _sink;
        this._serializer = _serializer;
    }
    dispatchAnimationEvent(player, phaseName, element) {
        this._sink.emit({
            'element': this._serializer.serialize(element, 2 /* RENDER_STORE_OBJECT */),
            'animationPlayer': this._serializer.serialize(player, 2 /* RENDER_STORE_OBJECT */),
            'phaseName': phaseName,
        });
        return true;
    }
    dispatchRenderEvent(element, eventTarget, eventName, event) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfZGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxSixNQUFNO0lBQ0osWUFBb0IsS0FBd0IsRUFBVSxXQUF1QjtRQUF6RCxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUcsQ0FBQztJQUVqRixzQkFBc0IsQ0FBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxPQUFZO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sOEJBQXNDO1lBQ25GLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sOEJBQXNDO1lBQzFGLFdBQVcsRUFBRSxTQUFTO1NBQ3ZCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQVksRUFBRSxXQUFtQixFQUFFLFNBQWlCLEVBQUUsS0FBVTtRQUNsRixJQUFJLGVBQW9CLENBQUM7UUFDekIsa0RBQWtEO1FBQ2xELFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNsQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxZ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dXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VyaWFsaXplciwgU2VyaWFsaXplclR5cGVzfSBmcm9tICcuLi9zaGFyZWQvc2VyaWFsaXplcic7XG5cbmltcG9ydCB7c2VyaWFsaXplRXZlbnRXaXRoVGFyZ2V0LCBzZXJpYWxpemVHZW5lcmljRXZlbnQsIHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQsIHNlcmlhbGl6ZU1vdXNlRXZlbnQsIHNlcmlhbGl6ZVRyYW5zaXRpb25FdmVudH0gZnJvbSAnLi9ldmVudF9zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+LCBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7fVxuXG4gIGRpc3BhdGNoQW5pbWF0aW9uRXZlbnQocGxheWVyOiBhbnksIHBoYXNlTmFtZTogc3RyaW5nLCBlbGVtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICB0aGlzLl9zaW5rLmVtaXQoe1xuICAgICAgJ2VsZW1lbnQnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAnYW5pbWF0aW9uUGxheWVyJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocGxheWVyLCBTZXJpYWxpemVyVHlwZXMuUkVOREVSX1NUT1JFX09CSkVDVCksXG4gICAgICAncGhhc2VOYW1lJzogcGhhc2VOYW1lLFxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZGlzcGF0Y2hSZW5kZXJFdmVudChlbGVtZW50OiBhbnksIGV2ZW50VGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHNlcmlhbGl6ZWRFdmVudDogYW55O1xuICAgIC8vIFRPRE8gKGp0ZXBsaXR6NjAyKTogc3VwcG9ydCBjdXN0b20gZXZlbnRzICMzMzUwXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICBjYXNlICdjbGljayc6XG4gICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICBjYXNlICdjb250ZXh0bWVudSc6XG4gICAgICBjYXNlICdtb3VzZWVudGVyJzpcbiAgICAgIGNhc2UgJ21vdXNlbGVhdmUnOlxuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplTW91c2VFdmVudChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICBjYXNlICdrZXlwcmVzcyc6XG4gICAgICBjYXNlICdrZXl1cCc6XG4gICAgICAgIHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUtleWJvYXJkRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnRXaXRoVGFyZ2V0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhYm9ydCc6XG4gICAgICBjYXNlICdhZnRlcnByaW50JzpcbiAgICAgIGNhc2UgJ2JlZm9yZXByaW50JzpcbiAgICAgIGNhc2UgJ2NhY2hlZCc6XG4gICAgICBjYXNlICdjYW5wbGF5JzpcbiAgICAgIGNhc2UgJ2NhbnBsYXl0aHJvdWdoJzpcbiAgICAgIGNhc2UgJ2NoYXJnaW5nY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2NoYXJnaW5ndGltZWNoYW5nZSc6XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICBjYXNlICdkaXNjaGFyZ2luZ3RpbWVjaGFuZ2UnOlxuICAgICAgY2FzZSAnRE9NQ29udGVudExvYWRlZCc6XG4gICAgICBjYXNlICdkb3dubG9hZGluZyc6XG4gICAgICBjYXNlICdkdXJhdGlvbmNoYW5nZSc6XG4gICAgICBjYXNlICdlbXB0aWVkJzpcbiAgICAgIGNhc2UgJ2VuZGVkJzpcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIGNhc2UgJ2Z1bGxzY3JlZW5jaGFuZ2UnOlxuICAgICAgY2FzZSAnZnVsbHNjcmVlbmVycm9yJzpcbiAgICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2VjaGFuZ2UnOlxuICAgICAgY2FzZSAnbGV2ZWxmY2hhbmdlJzpcbiAgICAgIGNhc2UgJ2xvYWRlZGRhdGEnOlxuICAgICAgY2FzZSAnbG9hZGVkbWV0YWRhdGEnOlxuICAgICAgY2FzZSAnb2Jzb2xldGUnOlxuICAgICAgY2FzZSAnb2ZmbGluZSc6XG4gICAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICBjYXNlICdvcmllbnRhdG9pbmNoYW5nZSc6XG4gICAgICBjYXNlICdwYXVzZSc6XG4gICAgICBjYXNlICdwb2ludGVybG9ja2NoYW5nZSc6XG4gICAgICBjYXNlICdwb2ludGVybG9ja2Vycm9yJzpcbiAgICAgIGNhc2UgJ3BsYXknOlxuICAgICAgY2FzZSAncGxheWluZyc6XG4gICAgICBjYXNlICdyYXRlY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3JlYWR5c3RhdGVjaGFuZ2UnOlxuICAgICAgY2FzZSAncmVzZXQnOlxuICAgICAgY2FzZSAnc2Nyb2xsJzpcbiAgICAgIGNhc2UgJ3NlZWtlZCc6XG4gICAgICBjYXNlICdzZWVraW5nJzpcbiAgICAgIGNhc2UgJ3N0YWxsZWQnOlxuICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgY2FzZSAnc3VzcGVuZCc6XG4gICAgICBjYXNlICd0aW1ldXBkYXRlJzpcbiAgICAgIGNhc2UgJ3VwZGF0ZXJlYWR5JzpcbiAgICAgIGNhc2UgJ3Zpc2liaWxpdHljaGFuZ2UnOlxuICAgICAgY2FzZSAndm9sdW1lY2hhbmdlJzpcbiAgICAgIGNhc2UgJ3dhaXRpbmcnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVHZW5lcmljRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RyYW5zaXRpb25lbmQnOlxuICAgICAgICBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihldmVudE5hbWUgKyAnIG5vdCBzdXBwb3J0ZWQgb24gV2ViV29ya2VycycpO1xuICAgIH1cblxuICAgIHRoaXMuX3NpbmsuZW1pdCh7XG4gICAgICAnZWxlbWVudCc6IHRoaXMuX3NlcmlhbGl6ZXIuc2VyaWFsaXplKGVsZW1lbnQsIFNlcmlhbGl6ZXJUeXBlcy5SRU5ERVJfU1RPUkVfT0JKRUNUKSxcbiAgICAgICdldmVudE5hbWUnOiBldmVudE5hbWUsXG4gICAgICAnZXZlbnRUYXJnZXQnOiBldmVudFRhcmdldCxcbiAgICAgICdldmVudCc6IHNlcmlhbGl6ZWRFdmVudCxcbiAgICB9KTtcblxuICAgIC8vIFRPRE8oa2VnbHVuZXEpOiBFdmVudHVhbGx5LCB3ZSB3YW50IHRoZSB1c2VyIHRvIGluZGljYXRlIGZyb20gdGhlIFVJIHNpZGUgd2hldGhlciB0aGUgZXZlbnRcbiAgICAvLyBzaG91bGQgYmUgY2FuY2VsZWQsIGJ1dCBmb3Igbm93IGp1c3QgY2FsbCBgcHJldmVudERlZmF1bHRgIG9uIHRoZSBvcmlnaW5hbCBET00gZXZlbnQuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=