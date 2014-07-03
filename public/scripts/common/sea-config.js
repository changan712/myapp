seajs.config({
    alias: {
        jQuery: 'jquery/jquery/1.9.1/jquery.js ',
        $: 'jquery/jquery/1.9.1/jquery.js',
        '$-debug': 'jquery/jquery/1.9.1/jquery.js',
        underscore: 'gallery/underscore/1.6.0/underscore-debug',
        backbone: 'gallery/backbone/1.1.2/backbone-debug'
    },
    debug: true
});

seajs.on('fetch', function (data) {
    var Reg = /(.*)\/sea-modules\/app\/(\w*)\/[\d\.]*\/(\w*)/;
    var match = data.uri.match(Reg);

    if (match && seajs.data.debug) {
        data.requestUri = match[1] + '/modules/' + match[2] + '/src/' + match[3] + '.js';
    }
});




