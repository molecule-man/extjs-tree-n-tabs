Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux.extjs-tree-n-tabs', '..');

Ext.require([
    'Ext.ux.extjs-tree-n-tabs.Panel'
]);

Ext.onReady(function(){

    var onActivate = function (tab, record) {
        tab.update({item: record.get('text')});
    }

    Ext.create('Ext.data.TreeStore', {
        storeId:'dummy-store',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'example-tree.json',
            reader: {
                type: 'json',
                root: 'children'
            }
        }
    });

    Ext.create('Ext.ux.extjs-tree-n-tabs.Panel', {
        width: 500,
        height: 300,

        renderTo: Ext.getBody(),

        store: 'dummy-store',

        leafItems: [{
            title: 'Foo',
            tpl: 'Foo card for item <b>"{item}"</b>',
            listeners: {
                activatedbytree: onActivate
            }
        },{
            title: 'Bar',
            tpl: 'Bar card for item <b>"{item}"</b>',
            listeners: {
                activatedbytree: onActivate
            }
        }],

        folderItems: [{
            title: 'Foo folder',
            tpl: 'Foo folder card for item <b>"{item}"</b>',
            listeners: {
                activatedbytree: onActivate
            }
        },{
            title: 'Bar folder',
            tpl: 'Bar folder card for item <b>"{item}"</b>',
            listeners: {
                activatedbytree: onActivate
            }
        }]
    });
});
