define(['scripts/injector', 'scripts/tabs', 'bareutil.ajax'], function(Injector, tabs, ajax) {
    var pageContainer = document.getElementById('pageContainer');
    var injector = new Injector('/');

    var Main = function(tabs, router) {
        var self = this;
        this.tabs = tabs;
        this.activeTab = ko.observable();
        this.loadedTabs = { };
        this.router = router;

        this.setTab = function(tab) {
            var previousTab = this.activeTab();
            if(this.loadedTabs[tab.name] !== true) {
                return ajax.get(tab.url).then(function(html) {
                    var element = document.createElement('div');
                    element.id = 'page_' + tab.name;
                    element.className = 'page well';
                    element.innerHTML = html;
                    pageContainer.appendChild(element);

                    debugger;
                    return element;
                }).then(function(element) {
                    if(typeof tab.js !== 'undefined') {
                        return new Promise(function(resolve, reject) {
                            require([tab.js], function(model) {
                                ko.applyBindings(model, element);
                                resolve({
                                    model:model,
                                    element:element
                                });
                            }, function(err) {
                                reject(err);
                            });
                        });
                    } else {
                        return Promise.resolve({
                            element:element
                        });
                    }
                }).then(function(result) {
                    self.loadedTabs[tab.name] = true;
                    self.makeInactive(previousTab);
                    self.makeActive(tab);
                    self.activeTab(tab);

                    return tab;
                });
            } else {
                self.makeInactive(previousTab);
                self.makeActive(tab);
                self.activeTab(tab);

                return Promise.resolve(tab);
            }
        };

        this.makeInactive = function(tab) {
            if(typeof tab === 'undefined') {
                return;
            }

            var menuElem = document.getElementById('menu_' + tab.name);
            var pageElem = document.getElementById('page_' + tab.name);
            menuElem.className = '';
            pageElem.className = 'page well';
        };

        this.makeActive = function(tab) {
            var menuElem = document.getElementById('menu_' + tab.name);
            var pageElem = document.getElementById('page_' + tab.name);
            menuElem.className = 'active';
            pageElem.className = 'page well active';
        };

        this.clickedTab = function(tab) {
            self.router.navigate(tab.hash, { trigger:true });
        };

        router.gotPage = function(tab) {
            self.setTab(tab);
        };
    };
    return Main;
});
