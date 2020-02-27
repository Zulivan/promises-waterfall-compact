const Waterfall = require('.');

function APromise(issok = true, timeout = 1, note = 'no note set') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (issok) {
                timeout = timeout + ' seconds';
                resolve({
                    issok,
                    timeout,
                    note
                });
            } else {
                reject('The first argument is set to false');
            }
        }, timeout * 1000);
    });
};

const Functions = [APromise(true, 3, 'this one is pretty slow'), APromise(true)];

Functions.push(APromise(true, 0, 'this one is super fast'));

Waterfall(Functions).then((result) => {
    console.log('Waterfall done!');
    console.log(result);
}).catch((e) => {
    console.log('Waterfall failed!');
    console.log(e);
});
