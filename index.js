const factory = (s) => (..._) => (v) => typeof v === s && _.every((_) => _(v));

const DVD = {
    array: (..._) => (v) => typeof v === 'object' && Array.isArray(v) && _.every((_) => _(v)),
    bigint: factory('bigint'),
    boolean: factory('boolean'),
    enum: (s = [], ..._) => DVD.union(s.map((_) => DVD.literal(_)), _),
    function: factory('function'),
    instanceof: (i, ..._) => (v) => v instanceof i && _.every((_) => _(v)),
    literal: (l, ..._) => (v) => v === l && _.every((_) => _(v)),
    number: factory('number'),
    object: (s, ..._) => (v) => {
        if (typeof v !== 'object') return false;
        const sk = Object.keys(s);
        const vk = Object.keys(v);
        //if (!sk.every((k) => vk.includes(k))) return false;
        if (!sk.every((k) => s[k](v[k]))) return false;
        return _.every((_) => _(v));
    },
    optional: (s, ..._) => (v) => {
        if (typeof v === 'undefined') return true;
        return s(v) && _.every((_) => _(v));
    },
    string: factory('string'),
    symbol: factory('symbol'),
    tuple: (s = [], ..._) => (v) => {
        if (s.length !== v.length) return false;
        if (!s.every((_, i) => _(v[i]))) return false;
        return _.every((_) => _(v));
    },
    undefined: factory('undefined'),
    union: (s = [], ..._) => (v) => s.some((_) => _(v)) && _.every((_) => _(v))
};

export default DVD;