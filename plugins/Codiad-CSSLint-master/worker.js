/*jshint worker:true*/
/*
 * Copyright (c) Andr3as
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information.
 * This information must remain intact.
 */
importScripts('csslint.js');

self.addEventListener('message', function(e) {
    var code    = e.data.code;
    var options = e.data.options;
    //Run csslint
    var result  = CSSLint.verify(code, options);
    var data    = JSON.stringify(result);
    //Post result
    postMessage({data: data});
}, false);