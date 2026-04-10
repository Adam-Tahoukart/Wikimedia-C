$(document).ready(function () {
    $('.phone').mask('(999) 999-9999');
    $('.phoneExt').mask('(999) 999-9999 poste 99999');
    $('.zipcode').mask('a9a 9a9');
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        //yearRange: "-100:-15",
        dayNamesMin: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
    });

    /*Filter unicode hack */
    $(":input").change(function () {
        try {
            let r = $(this).val().replace(/[^\x00-\xFF]/g, "");
            $(this).val(r);
        } catch (e) { }
    });
    $("textarea").change(function () {
        try {
            let r = $(this).val().replace(/[^\x00-\xFF]/g, "");
            $(this).val(r);
        } catch (e) { }
    });

    $(".countrySelect").change((e) => {
        $(e.target).next().attr("src", "/Images_Data/Loading_icon.gif")
        $.ajax({
            url: "/CountryFlag/get?countryCode=" + $(e.target).val(),
            datatype: "application/json",
            success: json => { $(e.target).next().attr("src", json); }
        });

    })
    SummaryHandling();
})


function SummaryHandling() {

    $('summary').attr('title', 'Utilisez ctrl-clic pour développer/réduire');
    $('summary').off();
    // Toggle collapse uncollapse details
    $('summary').on('click', function (e) {
        if (e.ctrlKey) {
            if ($(this).parent().attr('open') != undefined) {
                $('details').removeAttr('open');
                e.preventDefault();
            }
            else {
                $('details').prop('open', true);
                e.preventDefault();
            }
        }
    })
}

$(".submitCmd").click(function () {
    $("form").submit();
})
function InstallAutoComplete(targetId, words) {

    function split(val) {
        return val.split(/ \s*/);
    }

    function RemoveExtra(str, extra) {
        var extraLength = extra.length;
        var lastExtraIndex = str.lastIndexOf(extra);
        if ((lastExtraIndex + extraLength) == str.length)
            str = str.substring(0, str.length - extraLength);
        return str;
    }

    function extractLast(term) {
        return split(term).pop();
    }

    $("#" + targetId)
        .bind("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB && $(this).data("ui-autocomplete").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 1,
            source: function (request, response) {
                response($.ui.autocomplete.filter(words, extractLast(request.term)));
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                terms.pop();
                terms.push(ui.item.value);
                terms.push("");
                this.value = RemoveExtra(terms, ",").join(" ");
                return false;
            }
        });
}

function ajaxActionCall(actionLink) {
    $.ajax({
        url: actionLink,
        method: 'GET',
        success: (data) => {
            console.log("Result: " + data);
        }
    });
}

let minKeywordLenth = 3;
function highlight(text, elem) {
    text = text.trim();
    if (text.length >= minKeywordLenth) {
        var innerHTML = elem.innerHTML;
        let startIndex = 0;

        while (startIndex < innerHTML.length) {
            var normalizedHtml = innerHTML.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            var index = normalizedHtml.indexOf(text, startIndex);
            let highLightedText = "";
            if (index >= startIndex) {
                highLightedText = "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>";
                innerHTML = innerHTML.substring(0, index) + highLightedText + innerHTML.substring(index + text.length);
                startIndex = index + highLightedText.length + 1;
            } else
                startIndex = innerHTML.length + 1;
        }
        elem.innerHTML = innerHTML;
    }
}

function toggleLike(mediaId) {
    $.ajax({
        url: '/Likes/Toggle',
        method: 'POST',
        data: { mediaId: mediaId },
        success: function (result) {
            if (result.success) {
                // Le refresh automatique sera géré par autorefreshpanel
            }
        }
    });
}

function toggleLikeDetails(mediaId) {
    $.ajax({
        url: '/Medias/ToggleMediaLike/' + mediaId,
        method: 'GET',
        success: function (result) {
            if (result.success) {
                // refresh géré par AutoRefreshedPanel
            }
        }
    });
}