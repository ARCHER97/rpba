"use strict";
var Item = (function () {
    function Item(id, name, about, price, user_id) {
        this.id = id;
        this.name = name;
        this.about = about;
        this.price = price;
        this.user_id = user_id;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.js.map