(function(a) { a.fn.rating = function(b) { b = b || function() {};
        this.each(function(d, c) { a(c).data("rating", { callback: b }).bind("init.rating", a.fn.rating.init).bind("set.rating", a.fn.rating.set).bind("hover.rating", a.fn.rating.hover).trigger("init.rating") }) };
    a.extend(a.fn.rating, { init: function(h) {
            var d = a(this),
                g = "",
                j = null,
                f = d.children(),
                c = 0,
                b = f.length;
            for (; c < b; c++) { g = g + '<a class="star" title="' + a(f[c]).val() + '" />';
                if (a(f[c]).is(":checked")) { j = a(f[c]).val() } }
            f.hide();
            d.append('<div class="stars">' + g + "</div>").trigger("set.rating", j);
            a("a", d).bind("click", a.fn.rating.click);
            d.trigger("hover.rating") }, set: function(f, g) {
            var c = a(this),
                d = a("a", c),
                b = undefined;
            if (g) { d.removeClass("fullStar");
                b = d.filter(function(e) {
                    if (a(this).attr("title") == g) {
                        return a(this) } else {
                        return false } });
                b.addClass("fullStar").prevAll().addClass("fullStar") }
            return }, hover: function(d) {
            var c = a(this),
                b = a("a", c);
            b.bind("mouseenter", function(f) { a(this).addClass("tmp_fs").prevAll().addClass("tmp_fs");
                a(this).nextAll().addClass("tmp_es") });
            b.bind("mouseleave", function(f) { a(this).removeClass("tmp_fs").prevAll().removeClass("tmp_fs");
                a(this).nextAll().removeClass("tmp_es") }) }, click: function(g) { g.preventDefault();
            var f = a(g.target),
                c = f.parent().parent(),
                b = c.children("input"),
                d = f.attr("title");
            matchInput = b.filter(function(e) {
                if (a(this).val() == d) {
                    return true } else {
                    return false } });
            matchInput.attr("checked", true);
            c.trigger("set.rating", matchInput.val()).data("rating").callback(d, g) } }) })(jQuery);
