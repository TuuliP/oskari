
define([
    "oskari",
    "src/oskari/1.5/ModuleSpec"
], function(Oskari, ModuleSpec) {
    // ModuleSpec registers itself as Oskari-class, so Oskari.clazz.create('Oskari.ModuleSpec') will work
    var baseClassFor = {
    	'bundle' : "Oskari.mapframework.bundle.extension.ExtensionBundle"
    };

    var cls = function(clazzName, constrFunc, protoProps, metas) {
        var clazzInfo = undefined;

        if (clazzName == undefined) {
            clazzName = ['Oskari', '_', Oskari.getSeqNextVal('Class')].join('.');
        } else {
            clazzInfo = Oskari.clazz.lookup(clazzName);
        }
        if (clazzInfo && clazzInfo._constructor && !constrFunc) {
            // lookup
        } else {
            constrFunc = constrFunc || function() {};
            clazzInfo = Oskari.clazz.define(clazzName, constrFunc, protoProps, metas || {});
        }

        // Assumes Oskari.ModuleSpec to be loaded & installed, check define([dependencies])
        return Oskari.clazz.create('Oskari.ModuleSpec', clazzInfo, clazzName);
    };
	var bundleCls = function(bundleId, className) {

        if (!bundleId) {
            bundleId = (['__', Oskari.getSeqNextVal('Bundle')].join('_'));
        }

        var rv = cls(className, function () {}, {
            update: function () {}
        }, {
            protocol: ['Oskari.bundle.Bundle', baseClassFor.bundle],
            manifest: {
                'Bundle-Identifier': bundleId
            }
        });
        Oskari.installBundleClassInfo(bundleId, rv.classInfo);

        rv.___bundleIdentifier = bundleId;

        rv.loc = function (properties) {
            properties.key = this.___bundleIdentifier;
            Oskari.registerLocalization(properties);
            return rv;
        };

        rv.start = function () {
            var bid = this.___bundleIdentifier,
                bundle,
                bundleInstance,
                configProps,
                ip;

            try {
                bundle = Oskari.createBundle(bid, bid);
            }
            catch(e) {
                Oskari.log.error(e);
            }

            bundleInstance = Oskari.createInstance(bid);
            configProps = Oskari.getBundleInstanceConfigurationByName(bid);
            if (configProps) {
                for (ip in configProps) {
                    if (configProps.hasOwnProperty(ip)) {
                        bundleInstance[ip] = configProps[ip];
                    }
                }
            }
            bundleInstance.start();
            return bundleInstance;
        };
        rv.stop = function () {
            var bundleInstance = fcd.bundleInstances[this.___bundleIdentifier];

            return bundleInstance.stop();
        };
        return rv;
    };

    Oskari.cls = function() {
        return cls.apply(this, arguments);
    };
    Oskari.bundleCls = function() {
        return bundleCls.apply(this, arguments);
    };

    return Oskari;
});