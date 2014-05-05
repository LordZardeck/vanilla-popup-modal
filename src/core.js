(function(window) {

    var defaultOptions = {
            autoOpen: false,
            noStyling: false,
            setClasses: true,
            classNames: {
                open: 'vpm-opened',
                closed: 'vmp-closed'
            }
        },
        defaultCss = {
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'background-color': 'rgba(0,0,0,0.5)',
            'visibility': 'hidden',
            'opacity': '0'
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

    /**
     * Overwrites default options with new options. Most
     * likely not most performant/best method out there.
     * This is only a shallow copy.
     *
     * @see http://goo.gl/hE2RCT
     * @param   defaults    {object}    Default values to be overwritten
     * @param   options     {object}    Values to overwrite default with
     */
    function overwriteDefaults(defaults, options) {
        var newOptions = {};

        // Iterate over each key in the defaults and copy them over
        // to the new options
        for(var key in defaults) {
            newOptions[key] = defaults[key];
        }

        // Iterate over each option and overwrite old values
        for(var key in options) {
            newOptions[key] = options[key];
        }
    }

    function setStyles(element, css) {
        // Ensure we have the right kind of object
        if(typeof element != 'object' || !(element instanceof Element))
            throw new Error("Invalid element given: Can only set styles on DOM Element.");

        for(var style in css) {
            element.style[style] = css[style];
        }
    }

    function fireEvent(element, eventName, eventArgs) {
        //noinspection JSValidateTypes
        element.dispatchEvent(new CustomEvent(eventName, { 'detail': eventArgs }));
    }

    function VanillaModal(element, options) {
        var modalElement = element,
            currentOptions = overwriteDefaults(defaultOptions, options),
            isOpen = false;

        // If the user hasn't told us not to set styles,
        if(currentOptions.noStyling === false) {
            setStyles(modalElement, defaultCss);
            this.resize();
        }


        this.resize = function() {
            var size = getSize(modalElement);

            if(currentOptions.noStyling === false) {
                setStyles(modalElement, {
                    'margin-left': ((size.outerWidth / 2) * -1),
                    'margin-top': ((size.outerHeight / 2) * -1)
                });
            }

            fireEvent(modalElement, 'onModalResize', { modalSize: size });
            modalElement.dispatchEvent(new CustomEvent());
        }

        this.open = function() {
            if(isOpen === true)
                return;

            fireEvent(modalElement, 'onModalBeforeOpen', null);
        }
        this.close = function() {
            if(isOpen === false)
                return;
        }
    }

    window.VanillaModal = VanillaModal;
})(window);