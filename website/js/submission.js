// Prevents the standard form submission from POSTing and allows the JS below to work
// TODO: CB Is this still required? I spot its duplicated elsewhere!
$("#tagForm").submit(function(e){
    e.preventDefault();
})

// Load up the function when the document is ready (standard JQuery style!)
$(document).ready(function() {
    // Check the #tagForm and when submitted
    $("#tagForm").submit(function(e){
        // Prevent the default operation of the submission from taking place
        e.preventDefault();

        // Grab the value of the tag text box and put into a variable
        tagDescription = $('#TagDescription').val();

        // Create a JSON object that can be pushed into the API endpoint
        let jsonObject = {TagDescription: tagDescription};

        // POST the JSON object to the API endpoint
        $.ajax({
            method: "POST", 
            url: "https://<API-GATEWAY-ADDRESS>/<STAGE>/putTagsForWishTree",
            data: JSON.stringify(jsonObject),
            dataType: 'json',
            crossDomain: true,
        }).done(function (msg) {
            // If successful, then reload the page so that the new tag can be loaded in
            location.reload();
        });
    });
});