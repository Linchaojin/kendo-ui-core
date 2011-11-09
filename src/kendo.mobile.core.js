(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        extend = $.extend,
        mobile,
        DATA_ROLE = "data-kendo-role",
        Widget = kendo.ui.Widget;

    var MobileWidget = Widget.extend({
        init: function(element, options) {
            var that = this,
                option,
                value;

            Widget.fn.init.call(that, element, options);

            for (option in that.options) {
                value = that.element.data("kendo-" + option.toLowerCase());

                if (value !== undefined) {
                    that.options[option] = value;
                }
            }
        },

        options: {

        },

        enhance: function(element) {
            var options = this.options,
                selector = options.selector;

            if (selector) {
                element.find(selector)
                       .add(element.filter(selector))["kendo" + options.name]();
            }
        }
    });

    mobile = {
        enhance: function(element) {
            var widget;

            element = $(element);

            for (widget in kendo.ui) {
                widget = kendo.ui[widget];

                if (widget.prototype.enhance) {
                    widget.prototype.enhance(element);
                }
            }
        }
    }

    kendo.roleSelector = function(role) {
        return "[" + DATA_ROLE + "=" + role + "]";
    }

    kendo.dataRole = DATA_ROLE;

    kendo.ui.MobileWidget = MobileWidget;
    kendo.mobile = mobile;

    if (support.touch) {
        support.mousedown = "touchstart";
        support.mouseup = "touchend";
    } else {
        support.mousedown = "mousedown";
        support.mouseup = "mouseup";
    }
})(jQuery);
