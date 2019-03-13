/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
// TODO(jteplitz602): Allow users to specify the properties they need rather than always
// adding value and files #3374
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
// TODO(jteplitz602): #3374. See above.
/**
 * @param {?} e
 * @param {?} serializedEvent
 * @return {?}
 */
function addTarget(e, serializedEvent) {
    if (NODES_WITH_VALUE.has(((/** @type {?} */ (e.target))).tagName.toLowerCase())) {
        /** @type {?} */
        const target = (/** @type {?} */ (e.target));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLXdlYndvcmtlci9zcmMvd2ViX3dvcmtlcnMvdWkvZXZlbnRfc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7TUFRTSxzQkFBc0IsR0FBRztJQUM3QixRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUztJQUN4RixTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVTtDQUN0RDs7TUFFSyx5QkFBeUIsR0FBRztJQUNoQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVM7SUFDL0YsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPO0NBQzlCOztNQUVLLDJCQUEyQixHQUFHLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7O01BRTlFLGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUM7O01BRXBELGdCQUFnQixHQUFHLElBQUksR0FBRyxDQUM1QixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Ozs7O0FBRTVGLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxDQUFRO0lBQzVDLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzdDLENBQUM7Ozs7Ozs7QUFJRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsQ0FBUTs7VUFDekMsZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLENBQUM7SUFDM0QsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLENBQWE7SUFDL0MsT0FBTyxjQUFjLENBQUMsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDbkQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsQ0FBZ0I7O1VBQy9DLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLHlCQUF5QixDQUFDO0lBQ3BFLE9BQU8sU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxDQUFrQjs7VUFDbkQsZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEVBQUUsMkJBQTJCLENBQUM7SUFDdEUsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7QUFHRCxTQUFTLFNBQVMsQ0FBQyxDQUFRLEVBQUUsZUFBcUM7SUFDaEUsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQkFBYSxDQUFDLENBQUMsTUFBTSxFQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRTs7Y0FDakUsTUFBTSxHQUFHLG1CQUFrQixDQUFDLENBQUMsTUFBTSxFQUFBO1FBQ3pDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7UUFDcEQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ25EO0tBQ0Y7SUFDRCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDOzs7Ozs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxDQUFNLEVBQUUsVUFBb0I7O1VBQzVDLFVBQVUsR0FBdUIsRUFBRTtJQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Y0FDcEMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IE1PVVNFX0VWRU5UX1BST1BFUlRJRVMgPSBbXG4gICdhbHRLZXknLCAnYnV0dG9uJywgJ2NsaWVudFgnLCAnY2xpZW50WScsICdtZXRhS2V5JywgJ21vdmVtZW50WCcsICdtb3ZlbWVudFknLCAnb2Zmc2V0WCcsXG4gICdvZmZzZXRZJywgJ3JlZ2lvbicsICdzY3JlZW5YJywgJ3NjcmVlblknLCAnc2hpZnRLZXknXG5dO1xuXG5jb25zdCBLRVlCT0FSRF9FVkVOVF9QUk9QRVJUSUVTID0gW1xuICAnYWx0a2V5JywgJ2NoYXJDb2RlJywgJ2NvZGUnLCAnY3RybEtleScsICdpc0NvbXBvc2luZycsICdrZXknLCAna2V5Q29kZScsICdsb2NhdGlvbicsICdtZXRhS2V5JyxcbiAgJ3JlcGVhdCcsICdzaGlmdEtleScsICd3aGljaCdcbl07XG5cbmNvbnN0IFRSQU5TSVRJT05fRVZFTlRfUFJPUEVSVElFUyA9IFsncHJvcGVydHlOYW1lJywgJ2VsYXBzZWRUaW1lJywgJ3BzZXVkb0VsZW1lbnQnXTtcblxuY29uc3QgRVZFTlRfUFJPUEVSVElFUyA9IFsndHlwZScsICdidWJibGVzJywgJ2NhbmNlbGFibGUnXTtcblxuY29uc3QgTk9ERVNfV0lUSF9WQUxVRSA9IG5ldyBTZXQoXG4gICAgWydpbnB1dCcsICdzZWxlY3QnLCAnb3B0aW9uJywgJ2J1dHRvbicsICdsaScsICdtZXRlcicsICdwcm9ncmVzcycsICdwYXJhbScsICd0ZXh0YXJlYSddKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUdlbmVyaWNFdmVudChlOiBFdmVudCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgcmV0dXJuIHNlcmlhbGl6ZUV2ZW50KGUsIEVWRU5UX1BST1BFUlRJRVMpO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogQWxsb3cgdXNlcnMgdG8gc3BlY2lmeSB0aGUgcHJvcGVydGllcyB0aGV5IG5lZWQgcmF0aGVyIHRoYW4gYWx3YXlzXG4vLyBhZGRpbmcgdmFsdWUgYW5kIGZpbGVzICMzMzc0XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRXZlbnRXaXRoVGFyZ2V0KGU6IEV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudChlLCBFVkVOVF9QUk9QRVJUSUVTKTtcbiAgcmV0dXJuIGFkZFRhcmdldChlLCBzZXJpYWxpemVkRXZlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplTW91c2VFdmVudChlOiBNb3VzZUV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gc2VyaWFsaXplRXZlbnQoZSwgTU9VU0VfRVZFTlRfUFJPUEVSVElFUyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVLZXlib2FyZEV2ZW50KGU6IEtleWJvYXJkRXZlbnQpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHNlcmlhbGl6ZWRFdmVudCA9IHNlcmlhbGl6ZUV2ZW50KGUsIEtFWUJPQVJEX0VWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVUcmFuc2l0aW9uRXZlbnQoZTogVHJhbnNpdGlvbkV2ZW50KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBzZXJpYWxpemVkRXZlbnQgPSBzZXJpYWxpemVFdmVudChlLCBUUkFOU0lUSU9OX0VWRU5UX1BST1BFUlRJRVMpO1xuICByZXR1cm4gYWRkVGFyZ2V0KGUsIHNlcmlhbGl6ZWRFdmVudCk7XG59XG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpOiAjMzM3NC4gU2VlIGFib3ZlLlxuZnVuY3Rpb24gYWRkVGFyZ2V0KGU6IEV2ZW50LCBzZXJpYWxpemVkRXZlbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBpZiAoTk9ERVNfV0lUSF9WQUxVRS5oYXMoKDxIVE1MRWxlbWVudD5lLnRhcmdldCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmUudGFyZ2V0O1xuICAgIHNlcmlhbGl6ZWRFdmVudFsndGFyZ2V0J10gPSB7J3ZhbHVlJzogdGFyZ2V0LnZhbHVlfTtcbiAgICBpZiAodGFyZ2V0LmZpbGVzKSB7XG4gICAgICBzZXJpYWxpemVkRXZlbnRbJ3RhcmdldCddWydmaWxlcyddID0gdGFyZ2V0LmZpbGVzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2VyaWFsaXplZEV2ZW50O1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVFdmVudChlOiBhbnksIHByb3BlcnRpZXM6IHN0cmluZ1tdKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBzZXJpYWxpemVkOiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvcCA9IHByb3BlcnRpZXNbaV07XG4gICAgc2VyaWFsaXplZFtwcm9wXSA9IGVbcHJvcF07XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG59XG4iXX0=