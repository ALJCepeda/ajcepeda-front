define(['/libs/bareutil.ajax', '/scripts/router'], function(ajax, router) {
    var Blog = function() {
        var self = this;
        this.content = {};
        this.entries = ko.observableArray();
        this.selectedContent = ko.observable();

        router.gotBlogURL = function(url) {
            self.setEntry(url);
        };
    };

    Blog.prototype.loadEntries = function() {
        var self = this;
        return ajax.get('/actions/blog/entries.php').then(function(data) {
            var entries = JSON.parse(data);
            self.entries(entries);
            router.navigate('/blog/' + entries[0].url, { trigger:true });
        });
    };

    Blog.prototype.loadContent = function(url) {
        var self = this;
        return ajax.get('/actions/blog/content.php?url='+url).then(function(data) {
            var content = JSON.parse(data);

            if(typeof content.error !== 'undefined') {
                self.content[url] = {
                    title:'Invalid blog: ' + url,
                    content:''
                };
            } else {
                self.content[url] = content;
            }
        });
    };

    Blog.prototype.setEntry = function(url) {
        var self = this;
        if(typeof self.content[url] === 'undefined') {
            return self.loadContent(url).then(function() {
                self.selectedContent(self.content[url]);

                return self.content[url];
            });
        }

        self.selectedContent(self.content[url]);
        return Promise.resolve(self.content[url]);
    };

    Blog.prototype.clickedEntry = function(entry) {
        router.navigate('/blog/'+entry.url, { trigger:true });
    };

    var blog = new Blog();
    blog.loadEntries();
    return blog;
});