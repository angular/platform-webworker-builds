/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const MOUSE_EVENT_PROPERTIES = [
    'altKey', 'button', 'clientX', 'clientY', 'metaKey', 'movementX', 'movementY', 'offsetX',
    'offsetY', 'region', 'screenX', 'screenY', 'shiftKey'
];
/** @type {?} */
const KEYBOARD_EVENT_PROPERTIES = [
    'altkey', 'charCode', 'code', 'ctrlKey', 'isComposing', 'key', 'keyCode', 'location', 'metaKey',
    'repeat', 'shiftKey', 'which'
];
/** @type {?} */
const TRANSITION_EVENT_PROPERTIES = ['propertyName', 'elapsedTime', 'pseudoElement'];
/** @type {?} */
const EVENT_PROPERTIES = ['type', 'bubbles', 'cancelable'];
/** @type {?} */
const NODES_WITH_VALUE = new Set(['input', 'select', 'option', 'button', 'li', 'meter', 'progress', 'param', 'textarea']);
/**
 * @param {?} e
 * @return {?}
 */
export function serializeGenericEvent(e) {
    return serializeEvent(e, EVENT_PROPERTIES);
}
/**
 * @param {?} e
 * @return {?}
 */
export function serializeEventWithTarget(e) {
    /** @type {?} */
    const serializedEvent = serializeEvent(e, EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
export function serializeMouseEvent(e) {
    return serializeEvent(e, MOUSE_EVENT_PROPERTIES);
}
/**
 * @param {?} e
 * @return {?}
 */
export function serializeKeyboardEvent(e) {
    /** @type {?} */
    const serializedEvent = serializeEvent(e, KEYBOARD_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @return {?}
 */
export function serializeTransitionEvent(e) {
    /** @type {?} */
    const serializedEvent = serializeEvent(e, TRANSITION_EVENT_PROPERTIES);
    return addTarget(e, serializedEvent);
}
/**
 * @param {?} e
 * @param {?} serializedEvent
 * @return {?}
 */
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has((/** @type {?} */ (e.target)).tagName.toLowerCase())) {
        /** @type {?} */
        const target = /** @type {?} */ (e.target);
        serializedEvent['target'] = { 'value': target.value };
        if (target.files) {
            serializedEvent['target']['files'] = target.files;
        }
    }
    return serializedEvent;
}
/**
 * @param {?} e
 * @param {?} properties
 * @return {?}
 */
function serializeEvent(e, properties) {
    /** @type {?} */
    const serialized = {};
    for (let i = 0; i < properties.length; i++) {
        /** @type {?} */
        const prop = properties[i];
        serialized[prop] = e[prop];
    }
    return serialized;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLHNCQUFzQixHQUFHO0lBQzdCLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTO0lBQ3hGLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVO0NBQ3RELENBQUM7O0FBRUYsTUFBTSx5QkFBeUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVM7SUFDL0YsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPO0NBQzlCLENBQUM7O0FBRUYsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXJGLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDOztBQUUzRCxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxDQUM1QixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFFN0YsTUFBTSxVQUFVLHFCQUFxQixDQUFDLENBQVE7SUFDNUMsT0FBTyxjQUFjLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Q0FDNUM7Ozs7O0FBSUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLENBQVE7O0lBQy9DLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7Q0FDdEM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQWE7SUFDL0MsT0FBTyxjQUFjLENBQUMsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7Q0FDbEQ7Ozs7O0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLENBQWdCOztJQUNyRCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDckUsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0NBQ3RDOzs7OztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxDQUFrQjs7SUFDekQsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztDQUN0Qzs7Ozs7O0FBR0QsU0FBUyxTQUFTLENBQUMsQ0FBUSxFQUFFLGVBQXFDO0lBQ2hFLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG1CQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTs7UUFDdkUsTUFBTSxNQUFNLHFCQUFxQixDQUFDLENBQUMsTUFBTSxFQUFDO1FBQzFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ25EO0tBQ0Y7SUFDRCxPQUFPLGVBQWUsQ0FBQztDQUN4Qjs7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsQ0FBTSxFQUFFLFVBQW9COztJQUNsRCxNQUFNLFVBQVUsR0FBdUIsRUFBRSxDQUFDO0lBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztRQUMxQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sVUFBVSxDQUFDO0NBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCBNT1VTRV9FVkVOVF9QUk9QRVJUSUVTID0gW1xuICAnYWx0S2V5JywgJ2J1dHRvbicsICdjbGllbnRYJywgJ2NsaWVudFknLCAnbWV0YUtleScsICdtb3ZlbWVudFgnLCAnbW92ZW1lbnRZJywgJ29mZnNldFgnLFxuICAnb2Zmc2V0WScsICdyZWdpb24nLCAnc2NyZWVuWCcsICdzY3JlZW5ZJywgJ3NoaWZ0S2V5J1xuXTtcblxuY29uc3QgS0VZQk9BUkRfRVZFTlRfUFJPUEVSVElFUyA9IFtcbiAgJ2FsdGtleScsICdjaGFyQ29kZScsICdjb2RlJywgJ2N0cmxLZXknLCAnaXNDb21wb3NpbmcnLCAna2V5JywgJ2tleUNvZGUnLCAnbG9jYXRpb24nLCAnbWV0YUtleScsXG4gICdyZXBlYXQnLCAnc2hpZnRLZXknLCAnd2hpY2gnXG5dO1xuXG5jb25zdCBUUkFOU0lUSU9OX0VWRU5UX1BST1BFUlRJRVMgPSBbJ3Byb3BlcnR5TmFtZScsICdlbGFwc2VkVGltZScsICdwc2V1ZG9FbGVtZW50J107XG5cbmNvbnN0IEVWRU5UX1BST1BFUlRJRVMgPSBbJ3R5cGUnLCAnYnViYmxlcycsICdjYW5jZWxhYmxlJ107XG5cbmNvbnN0IE5PREVTX1dJVEhfVkFMVUUgPSBuZXcgU2V0KFxuICAgIFsnaW5wdXQnLCAnc2VsZWN0JywgJ29wdGlvbicsICdidXR0b24nLCAnbGknLCAnbWV0ZXInLCAncHJvZ3Jlc3MnLCAncGFyYW0nLCAndGV4dGFyZWEnXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVHZW5lcmljRXZlbnQoZTogRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiBzZXJpYWxpemVFdmVudChlLCBFVkVOVF9QUk9QRVJUSUVTKTtcbn1cblxuLy8gVE9ETyhqdGVwbGl0ejYwMik6IEFsbG93IHVzZXJzIHRvIHNwZWNpZnkgdGhlIHByb3BlcnRpZXMgdGhleSBuZWVkIHJhdGhlciB0aGFuIGFsd2F5c1xuLy8gYWRkaW5nIHZhbHVlIGFuZCBmaWxlcyAjMzM3NFxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUV2ZW50V2l0aFRhcmdldChlOiBFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3Qgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgRVZFTlRfUFJPUEVSVElFUyk7XG4gIHJldHVybiBhZGRUYXJnZXQoZSwgc2VyaWFsaXplZEV2ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZU1vdXNlRXZlbnQoZTogTW91c2VFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgcmV0dXJuIHNlcmlhbGl6ZUV2ZW50KGUsIE1PVVNFX0VWRU5UX1BST1BFUlRJRVMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplS2V5Ym9hcmRFdmVudChlOiBLZXlib2FyZEV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudChlLCBLRVlCT0FSRF9FVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplVHJhbnNpdGlvbkV2ZW50KGU6IFRyYW5zaXRpb25FdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3Qgc2VyaWFsaXplZEV2ZW50ID0gc2VyaWFsaXplRXZlbnQoZSwgVFJBTlNJVElPTl9FVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogIzMzNzQuIFNlZSBhYm92ZS5cbmZ1bmN0aW9uIGFkZFRhcmdldChlOiBFdmVudCwgc2VyaWFsaXplZEV2ZW50OiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgaWYgKE5PREVTX1dJVEhfVkFMVUUuaGFzKCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICBjb25zdCB0YXJnZXQgPSA8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldDtcbiAgICBzZXJpYWxpemVkRXZlbnRbJ3RhcmdldCddID0geyd2YWx1ZSc6IHRhcmdldC52YWx1ZX07XG4gICAgaWYgKHRhcmdldC5maWxlcykge1xuICAgICAgc2VyaWFsaXplZEV2ZW50Wyd0YXJnZXQnXVsnZmlsZXMnXSA9IHRhcmdldC5maWxlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWRFdmVudDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplRXZlbnQoZTogYW55LCBwcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgY29uc3Qgc2VyaWFsaXplZDoge1trOiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIHNlcmlhbGl6ZWRbcHJvcF0gPSBlW3Byb3BdO1xuICB9XG4gIHJldHVybiBzZXJpYWxpemVkO1xufVxuIl19