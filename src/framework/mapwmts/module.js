/* GENERATED with grunt bundle2module, do not modify manually */
define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/mapwmts/plugin/wmtslayer/WmtsLayerPlugin",
    "sources/framework/domain/AbstractLayer",
    "bundles/framework/bundle/mapwmts/domain/WmtsLayer",
    "bundles/framework/bundle/mapwmts/service/WmtsLayerService",
    "bundles/framework/bundle/mapwmts/service/WmtsLayerModelBuilder",
    "bundles/framework/bundle/mapwmts/instance"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("mapwmts").category({create: function () {

		return Oskari.clazz.create("Oskari.mapframework.bundle.MapWmtsBundleInstance");
	},update: function (manager, bundle, bi, info) {
		manager.alert("RECEIVED update notification " + info);
	}})
});