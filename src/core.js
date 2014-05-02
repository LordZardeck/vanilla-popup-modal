(function(ctx) {
    ctx = ctx || {};

    var defaultOptions = {
            autoOpen: false
        },
        events = {
            beforeOpen: null,
            onOpen: null,
            completeOpen: null,
            onResize: null,
            beforeClose: null,
            onClose: null,
            completeClose: null
        };

    function VanillaModal(element, options) {

    }

    VanillaModal.prototype.open = function() {

    };

    VanillaModal.prototype.close = function() {

    };

    ctx.VanillaModal = VanillaModal;
})(window);