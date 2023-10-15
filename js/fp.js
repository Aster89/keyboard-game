groupBy = b => xs => {
    if (xs == []) return [];
    res = [[xs[0]]];
    xs.splice(1).forEach(x => {
        if (res.at(-1) == [] || b(res.at(-1).at(-1), x))
            res[res.length -1] = res.at(-1).concat(x);
        else
            res = res.concat([[x]]);
    });
    return res;
};
