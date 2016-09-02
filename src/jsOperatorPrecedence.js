(function() {

    function styleTable() {
        var precedenceEl, precedence, prevPrecedence, nameEl, name, prevName, rowBand;

        $('table tr:visible').each(function(i, row) {
            row = $(row);

            precedence = parseInt((precedenceEl = row.find('.precedence')).text(), 10);
            name = (nameEl = row.find('td:nth-child(2)')).text();

            if (prevPrecedence === precedence) {
                precedenceEl.css('visibility', 'hidden');
            } else {
                rowBand = !rowBand;
                precedenceEl.css('visibility', '');
            }

            row.toggleClass('row-band', rowBand);

            nameEl.find('a').css('visibility', prevName === name ? 'hidden' : '');

            prevPrecedence = precedence;
            prevName = name;
        });
    }

    function filterTable() {
        var v1 = $('#input1').val().trim().toLowerCase();
        var v2 = $('#input2').val().trim().toLowerCase();

        var arr1 = v1.split(' ');
        var arr2 = v2.split(' ');

        $('table tr').each(function(i, tr) {
            tr = $(tr);

            if (!v1 && !v2) {
                tr.show();
                return;
            }

            var str = (tr.find('code').text() + tr.find('td:nth-child(2) > a').text()).replace(/ /g, '').toLowerCase();

            if (matches(str, arr1) || matches(str, arr2)) {
                tr.show();
                return;
            }

            tr.hide();
        });

        styleTable();
    }

    function matches(text, substrings) {
        if (!substrings.length) {
            return false;
        }

        var s;
        for (var i = 0; i < substrings.length; i++) {
            s = substrings[i].trim();

            if (!s || text.indexOf(s) === -1) {
                return false;
            }
        }

        return true;
    }

    styleTable();

    $('table').css('opacity', '1');

    $('input').on('keyup', function(e) {
        if (e.keyCode === 27) { // ESC
            if ($(this).val() === '') {
                if (this !== document.getElementById('input2')) {
                    $('input').val('');
                }
                $('#input1').focus();
            } else {
                $(this).val('');
            }
        }

        filterTable();
    });

    $('#input1').focus();

}());
