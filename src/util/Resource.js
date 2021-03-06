/*
Copyright (c) 2011-2017 MITV Inc
*/

var _ = require('underscore');
var debug = require('debug')('reactman:Resource');
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
var isProduction = process.env.NODE_ENV === 'production';
var urlTemplate = _.template("http://localhost:8008/rest/<%=app%>/api/<%=resource%>/?<%=args%>");
if (isProduction) {
    urlTemplate = _.template("/rest/<%=app%>/api/<%=resource%>/?<%=args%>");
}

var defaultArgs = {
    version: 1
};

var buildArgs = function(args) {
    var mergedArgs = _.extend({}, defaultArgs, args);
    var argList = [];

    if (mergedArgs) {
        $.each(mergedArgs, function(key, value) {
            argList.push(key+'='+value);
        });
    }

    return encodeURI(argList.join('&'));
};

var reportError = function(url, error) {
    if (!url) {
        debug('logapi: no url');
        return;
    }

    $.post('/account/frontend_resource_call_error/?_method=put', {
        api: url,
        error: error
    });
};

var getUrl = function(app, resource, args) {
    return urlTemplate({app:app, resource:resource, args:buildArgs(args)});
};

var emptyFn = function() {};

var __call = function(options) {
    var app = options.app;
    var resource = options.resource;
    var method = options.method || 'get';
    var args = options.args || {};
    var requestInBackground = options.requestInBackground;
    //hack method
    // if (method === 'put') {
    //     method = 'post'
    //     args['_method'] = 'put'
    // } else if (method === 'delete') {
    //     method = 'post'
    //     args['_method'] = 'delete'
    // }

    var onSuccess = options.success || emptyFn;
    var onError = options.error || emptyFn;
    var scope = options.scope || window;
    var disableCache = true;
    var async = options.async;

    if (options.hasOwnProperty('disableCache')) {
        disableCache = options.disableCache;
    }
    var url = 'unknown';

    if (disableCache) {
        args['timestamp'] = new Date().getTime();
    }
    var options = {
        type: method,
        cache: false,
        async: async,
        dataType: 'json',
        success: function(resp) {
            if (resp.code !== 200) {
                if (resp.code == 405) {
                    window.location.href = "/#/";
                } else if(onError) {
                    onError.call(scope, resp);
                }
            }
            else {
                if (resp.sqls) {
                    if(__W_DBG_parseSqls) {
                        __W_DBG_parseSqls(resp.sqls, resp.apiSource);
                    }
                }
                onSuccess.call(scope, resp.data || {});
            }
        },
        error: function(xhr, resp) {
            //reportError(url, xhr.responseText);
            onError.call(scope, resp);
        }
    }
    console.log(options)

    if (method === 'get') {
        options.url = getUrl(app, resource, args);
        debug('GET url %s', options.url);
        return $.ajax(options);
    }
    else {
        var qs = {};
        if (args['_method']) {
            qs['_method'] = args['_method'];
        }
        options.url = getUrl(app, resource, qs);
        options.data = JSON.stringify(args);
        return $.ajax(options);
    }
    // else {
    //     debug('[ERROR]: unsupported method ' + method);
    // }
}

function __parseResource(options) {
    var app = options.app;
    var resource = options.resource;
    if (!app) {
        var pos = resource.lastIndexOf('.');
        app = resource.substring(0, pos).replace(/\./g, '/');
        resource = resource.substring(pos+1);
    }

    return {
        app: app,
        resource: resource
    }
}

var __callApi = function(method, options) {
    var args = options.data || {};
    var async = (options.async == false) ? false: true;
    var successHandler = options.success;
    if (!successHandler) {
        successHandler = function(data) {
            if (options.dispatch) {
                if (!options.dispatch.dispatcher || !options.dispatch.actionType) {
                    if (console) {
                        console.error('[ERROR] options.dispatch must have `dispatcher` and `actionType`');
                        return;
                    }
                }

                var payload = {
                    actionType: options.dispatch.actionType
                };
                payload.data = options.dispatch.data || data;
                debug('dispatch action %s', options.dispatch.actionType);
                options.dispatch.dispatcher.dispatch(payload);
            } else {
                if (console) {
                    console.error("[ERROR] no dispatch for resource result: " + options.app + '.' + options.resource);
                }
            }
        }
    }
    return __call({
        method: method,
        app: options.app,
        scope: options.scope || window,
        resource: options.resource,
        async: async,
        args: args,
        requestInBackground: options.requestInBackground,
        success: successHandler,
        error: options.error
    });
}

var Resource = {
    get: function(options) {
        options = options || {};
        var resourceInfo = __parseResource(options);
        options.app = resourceInfo.app;
        options.resource = resourceInfo.resource;
        return __callApi('get', options);
    },

    put: function(options) {
        options = options || {};
        var resourceInfo = __parseResource(options);
        options.app = resourceInfo.app;
        options.resource = resourceInfo.resource;
        return __callApi('put', options);
    },

    post: function(options) {
        options = options || {};
        var resourceInfo = __parseResource(options);
        options.app = resourceInfo.app;
        options.resource = resourceInfo.resource;
        return __callApi('post', options);
    },

    'delete': function(options) {
        options = options || {};
        var resourceInfo = __parseResource(options);
        options.app = resourceInfo.app;
        options.resource = resourceInfo.resource;
        return __callApi('delete', options);
    },
    'options': function(options) {
        var method = options.method;
        options = options || {};
        var resourceInfo = __parseResource(options);
        options.app = resourceInfo.app;
        options.resource = resourceInfo.resource;
        return __callApi(method, options);
    }
}

module.exports = Resource;
