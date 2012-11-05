Ext.define('Ext.ux.extjs-tree-n-tabs.Panel' ,{
    extend: 'Ext.panel.Panel',

    alternateClassName: ['BAS.ux.extjs-tree-n-tabs.Panel'],

    alias: 'widget.treentabs',

    foldersContentWrapper: 'tabpanel',
    leafsContentWrapper: 'tabpanel',

    treeConfig: false,
    leafItems: false,
    folderItems: false,

    defaultText: 'Select item in the tree',
    defaultTreeItemId: 'treecmp',
    contentWrapperId: 'contentwrappercmp',
    defaultWindowId: 'dummywindow',
    foldersContentWindowId: 'folderscontent',
    leafsContentWindowId: 'leafscontent',

    tabActivationEvent: 'activatedbytree',

    initComponent: function() {
        var me = this;

        me.layout = 'border';

        var treeConfig = Ext.apply({
            xtype: 'treepanel',
            store: me.store,
            width: 200,
            rootVisible: false,
            region: 'west',
            listeners: {
                selectionchange: me.onItemSelected,
                scope: me
            }
        }, me.treeConfig);

        treeConfig.itemId = me.treeItemId = treeConfig.itemId || me.defaultTreeItemId;

        var contentWrapperConfig = {
            layout: 'card',
            region: 'center',
            
            itemId: me.contentWrapperId,
            defaults: {
                listeners: {
                    tabchange: me.onTabChange,
                    scope: me
                }
            },

            items:[{
                html: me.defaultText,
                itemId: me.defaultWindowId
            },{
                xtype: me.foldersContentWrapper,
                itemId: me.foldersContentWindowId,
                items: me.folderItems
            },{
                xtype: me.leafsContentWrapper,
                itemId: me.leafsContentWindowId,
                items: me.leafItems
            }]
        };

        me.items = [treeConfig, contentWrapperConfig];

        me.callParent(arguments);
    },

    onItemSelected: function(sm, records) {
        var me = this, itemToSelect, record = null;

        if (Ext.isEmpty(records)) {
            itemToSelect = me.defaultWindowId;
        } else {
            record = records[0];

            if (record.isLeaf()) {
                itemToSelect = me.leafsContentWindowId;
            } else {
                itemToSelect = me.foldersContentWindowId;
            }
        }

        var wrapper = me.down('#'+me.contentWrapperId),
            activeItem = wrapper.down('#'+itemToSelect);

        wrapper.getLayout().setActiveItem(activeItem);

        var activeTab = activeItem;

        if (activeTab.getActiveTab) {
            activeTab = activeTab.getActiveTab();
        } else if (activeTab.getLayout().getActiveItem) {
            activeTab = activeTab.getLayout().getActiveItem();
        }

        activeTab.fireEvent(me.tabActivationEvent, activeTab, record);
    },

    onTabChange: function(cmp, card) {
        var me = this, records = me.down('#'+me.treeItemId).getSelectionModel().getSelection();

        if (Ext.isEmpty(records)) {
            Ext.Error.raise('tree-n-tabs: Records array cannot be empty');
        }

        card.fireEvent(me.tabActivationEvent, card, records[0]);
    }
});

