/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare function serializeGenericEvent(e: Event): {
    [key: string]: any;
};
export declare function serializeEventWithTarget(e: Event): {
    [key: string]: any;
};
export declare function serializeMouseEvent(e: MouseEvent): {
    [key: string]: any;
};
export declare function serializeKeyboardEvent(e: KeyboardEvent): {
    [key: string]: any;
};
export declare function serializeTransitionEvent(e: TransitionEvent): {
    [key: string]: any;
};
