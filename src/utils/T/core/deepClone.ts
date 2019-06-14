'use strict';

/*
 * OBJECT ASSIGN DEEP
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 */

interface anyObj {
    [index: string]: any
}

/*
 * A unified way of returning a string that describes the type of the given variable.
 */
function getTypeOf (input: any) {

    if (input === null) {
        return 'null';
    }

    else if (typeof input === 'undefined') {
        return 'undefined';
    }

    else if (typeof input === 'object') {
        return (Array.isArray(input) ? 'array' : 'object');
    }

    return typeof input;

}

/*
 * Branching logic which calls the correct function to clone the given value base on its type.
 */
function cloneValue (value: any) {

    // The value is an object so lets clone it.
    if (getTypeOf(value) === 'object') {
        return quickCloneObject(value);
    }

    // The value is an array so lets clone it.
    else if (getTypeOf(value) === 'array') {
        return quickCloneArray(value);
    }

    // Any other value can just be copied.
    return value;

}

/*
 * Enumerates the given array and returns a new array, with each of its values cloned (i.e. references broken).
 */
function quickCloneArray (input: any) {
    return input.map(cloneValue);
}

/*
 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
 * its values cloned (i.e. references broken).
 */

function quickCloneObject (input: anyObj) {

    const output: anyObj = {};

    for (const key in input) {
        if (!input.hasOwnProperty(key)) { continue; }

        output[key] = cloneValue(input[key]);
    }

    return output;

}

/*
 * Does the actual deep merging.
 */
interface optsInterface {
    arrayBehaviour?: string
}
function executeDeepMerge (target: [] | object, _objects:([]|anyObj)[] = [], _options:optsInterface = {}): any {

    const options = {
        arrayBehaviour: _options.arrayBehaviour || 'replace',  // Can be "merge" or "replace".
    };

    // Ensure we have actual objects for each.
    const objects = _objects.map(object => object || {});
    const output: anyObj = target || {};

    // Enumerate the objects and their keys.
    for (let oindex = 0; oindex < objects.length; oindex++) {
        const object = objects[oindex];
        const keys = Object.keys(object);

        for (let kindex = 0; kindex < keys.length; kindex++) {
            const key = keys[kindex];

            const value = object[key];
            const type = getTypeOf(value);

            const existingValueType = getTypeOf(output[key]);

            if (type === 'object') {
                if (existingValueType !== 'undefined') {

                    const existingValue = (existingValueType === 'object' ? output[key] : {});
                    output[key] = executeDeepMerge({}, [existingValue, quickCloneObject(value)], options);
                }
                else {
                    output[key] = quickCloneObject(value);
                }
            }

            else if (type === 'array') {
                if (existingValueType === 'array') {
                    const newValue = quickCloneArray(value);
                    output[key] = (options.arrayBehaviour === 'merge' ? output[key].concat(newValue) : newValue);
                }
                else {
                    output[key] = quickCloneArray(value);
                }
            }

            else {
                // @ts-ignore
                output[key] = value;
            }

        }
    }

    return output;

}

/*
 * Merge all the supplied objects into the target object, breaking all references, including those of nested objects
 * and arrays, and even objects nested inside arrays. The first parameter is not mutated unlike Object.assign().
 * Properties in later objects will always overwrite.
 */
export function objectAssignDeep (target: [] | object, ...objects: ([]|anyObj)[]) {
    return executeDeepMerge(target, objects);
};

export default (originData: [] | object) => {
    if(Array.isArray(originData)) return objectAssignDeep([], originData);
    return objectAssignDeep({}, originData);
}
