var Gaffa = require('gaffa'),
    actionType = "browserStorage";

function BrowserStorage(actionDefinition){
}
BrowserStorage = Gaffa.createSpec(BrowserStorage, Gaffa.Action);
BrowserStorage.prototype.type = actionType;
BrowserStorage.prototype.trigger = function(parent, scope, event){

    var action = this,
        data = action.source.value;

    if(!action.method.value){
        console.warn('You should set the value of method.');
        return;
    }

    switch(action.method.value.toLowerCase()){
        case "get":
            data = window[action.storageType.value + 'Storage'].getItem(action.source.value);
            if(data === 'undefined'){
                data = undefined;
            }
            action.target.set(data ? JSON.parse(data) : undefined);
            break;

        case "set":
            window[action.storageType.value + 'Storage'].setItem(action.target.value, JSON.stringify(data));
            break;

        case "remove":
            window[action.storageType.value + 'Storage'].removeItem(action.target.value);
            break;
    }

};
BrowserStorage.prototype.storageType = new Gaffa.Property({
    value: 'local'
});
BrowserStorage.prototype.method = new Gaffa.Property({
    value: 'get'
});
BrowserStorage.prototype.target = new Gaffa.Property();
BrowserStorage.prototype.source = new Gaffa.Property();

module.exports = BrowserStorage;
