/**
 * Serialize backend response
 *
 * This is for use for converting/transforming backend responses that are in
 * `snake_case` to `camelCase` and vice versa.
 *
 * NOTE: the type of object will have to be determined explicitly, this just
 * transforms any type of object.
 *
 * @example
 *
 * // An Axios request function to transform (serialize) the data
 * //
 * // data comes in as `snake_case` and we want it in `camelCase` and any data
 * // sent back to the server should be converted from `camelCase` back into
 * // `snake_case`.
 * function transformData(merchantId: string): AxiosRequestConfig {
 *      return {
 *          transformResponse: [
 *              (data: any): any => {
 *                  return serializeToCamelCase(JSON.parse(data));
 *              },
 *          ],
 *          transformRequest: [
 *              (data: any): any => {
 *                  return JSON.stringify(serializeToSnakeCase(data));
 *              },
 *          ],
 *      };
 * }
 *
 * then in your actual axios call
 *
 * // My api request
 * return axios
 *      .post<IDeliveryServiceEstimate>(
 *          '/v1/my/api',
 *          transformData(),
 *       );
 */
/* omit eslint-disable @typescript-eslint/explicit-module-boundary-types */
import camelCase from 'lodash/camelCase';
import cloneDeep from 'lodash/cloneDeep';
import snakeCase from 'lodash/snakeCase';

/**
 * Recursively modify keys in an object
 *  @param {Object|Array} item - an object or an array to modify
 *  @param {Function} func - a function that modifys the key
 *  @returns {Object|Array} an object with the modified keys
 *
 * WARNING: modifies the object
 */
function modifyKeys(item/* : any */, modifier/* : any */)/* : any */ {
    if (Array.isArray(item)) {
        return item.map((value) => modifyKeys(value, modifier));
    } else if (
        item !== undefined &&
        item !== null &&
        item.constructor === Object
    ) {
        return Object.keys(item).reduce((acc, key) => {
            if (key === 'variants') {
                const variantsCopy = { ...item[key] };
                const serializedVariants = Object.keys(variantsCopy).reduce(
                    (acc, variantCode) => {
                        return {
                            ...acc,
                            [variantCode]: modifyKeys(
                                variantsCopy[variantCode],
                                modifier,
                            ),
                        };
                    },
                    {},
                );

                return {
                    ...acc,
                    [key]: serializedVariants,
                };
            }

            return {
                ...acc,
                [modifier(key)]: modifyKeys(item[key], modifier),
            };
        }, {});
    }

    return item;
}

/**
 * Convert an objects keys to camelCase
 *  @param {Object|Array} unserializedObject - an object to convert
 *  @returns {Object|Array} returns a copy of the unserialized object with keys
 *   in camel case
 */
export function serializeToCamelCase(unserializedObject/* : any */)/* : any */ {
    const object = cloneDeep(unserializedObject);
    return modifyKeys(object, camelCase);
}

/**
 * Convert an objects keys to snake_case
 *  @param {Object|Array} serializedObject - an object to convert
 *  @returns {Object|Array} returns a copy of the deserialized object with keys
 *   in snake case
 */
export function serializeToSnakeCase(serializedObject/* : any */)/* : any */ {
    // Exceptions to the rule
    function convertToSnakeCase(item/* : string */)/* : string */ {
        const custom/* : { [key: string]: string } */ = {
            line1: 'line1',
            line2: 'line2',
            line3: 'line3',
            line4: 'line4',
            street1: 'street1',
        };

        if (custom[item] !== undefined) {
            return custom[item];
        }

        return snakeCase(item);
    }

    const object = cloneDeep(serializedObject);
    return modifyKeys(object, convertToSnakeCase);
}
