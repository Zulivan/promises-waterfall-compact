process.on('unhandledRejection', () => {});
process.on('rejectionHandled', () => {});

module.exports = function (functions) {
    return new Promise((resolve, reject) => {
        let index = 0;
        functions
            .reduce(acc => {
                return acc.then(res => {
                    return functions[index].then(result => {
                        res.push(result);
                        index = index + 1;
                        return res;
                    }).catch(reject);
                }).catch(reject);
            }, Promise.resolve([]))
            .then(resolve)
            .catch(reject);
    });
};