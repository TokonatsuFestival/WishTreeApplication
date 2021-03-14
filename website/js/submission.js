$("#tagForm").submit(function(e){
    e.preventDefault();
})

$(document).ready(function() {
    $("#tagForm").submit(function(e){
        e.preventDefault();
        tagDescription = $('#TagDescription').val();
        let jsonObject = {TagDescription: tagDescription};
        $.ajax({
            method: "POST", 
            url: "https://<API-GATEWAY-ADDRESS>/<STAGE>/putTagsForWishTree",
            data: JSON.stringify(jsonObject),
            dataType: 'json',
            crossDomain: true,
        }).done(function (msg) {
            console.log(msg);
            location.reload();
        });
    });
});