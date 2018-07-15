export class ArrayUtils {

    /**
     * @function sortIncBy sorting array incremently
     * @example to sort object [{id, value}] by value you should pass parameters, sortIncBy([], 'value');
     * @argument array array to sort
     * @argument by subobject to sort by
     * @returns sorted array
    */
    static sortIncBy(array: Iterable<any>, by: string = '') {
        if (!Array.isArray(array)) {
            return array;
        }
        return array.sort(function(l, r) {
            return l[by] < r[by] ? -1 : l[by] > r[by] ? 1 : 0;
        });
    }

    /**
     * @function sortDescBy sorting array descending
     * @example to sort object [{id, value}] by value you should pass parameters, sortIncBy([], 'value');
     * @argument array array to sort
     * @argument by subobject to sort by
     * @returns sorted array
    */
    static sortDescBy(array: Iterable<any>, by: string = '') {
        if (!Array.isArray(array)) {
            return array;
        }
        return array.sort(function(l, r) {
            return l[by] < r[by] ? 1 : l[by] > r[by] ? -1 : 0;
        });
    }

    /**
     * @function contains returns exists or not certain value in array
     * @example contains([{id: 5}], 5, 'id') returns true, contains([{id: 5}], 6, 'id') return false
     * @argument array array search in
     * @argument value value to find
     * @argument key key for subobject (left empty to search not subobject)
     * @returns existance
    */
    static contains(array: Iterable<any>, value: any, key: string = ''): boolean {
        for (let _key in array) {
            if (array.hasOwnProperty(_key)) {
                if (key && array[_key][key] === value) {
                    return true;
                } else
                if (array[_key] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @function contains sorting array descending
     * @example to sort object [{id, value}] by value you should pass parameters, sortIncBy([], 'value');
     * @argument array1 first array to merge
     * @argument array2 second array to merge
     * @argument key to exclude same values you can specify key
     * @returns merged arrays
    */
    static merge(array1: Array<any>, array2: Array<any>, key: string = ''): Array<any> {
        let array3 = [];
        for (let i = 0; i < array1.length; i++) {
            array3.push(array1[i]);
        }
        for (let i = 0; i < array2.length; i++) {

            if (key && !this.contains(array3, array2[i][key], key)) {
                array3.push(array2[i]);
            }
            if (!key && !this.contains(array3, array2[i], key)) {
                array3.push(array2[i]);
            }
        }
        return array3;
    }
}