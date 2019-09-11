$('#scrhbtn').on('click', function () {
    var srchqry = $("#navBarSearchForm").val();
    if (srchqry != "") {
        $("#bodyContent").html('');
        $("#bodyContent").addClass("ml-3");
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBFvN6iMnZhT8uUPBQIQMA3R50g19lbUsk&part=snippet&q=' + srchqry + '&maxResults=50',
            type: 'GET',
            dataType: 'JSON',
            data: "json",
            success: function (data) {
                for (var i = 0; i < data.items.length; i++) {
                    $("#bodyContent").append(`<div class="card d-inline-block m-1 ml-1 mt-3 " style="width: 18rem;">
                <a class="text-decoration-none" href="/individual/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap">
                <div class="card-body  p-0">
                <h6 class="card-title text-truncate d-block pl-1 mt-1 ">${data.items[i].snippet.title}</h6>
                </div></a>
                <div class="card-footer text-truncate pl-2 pr-2 p-1">${data.items[i].snippet.channelTitle}
                </div>
            </div>`)
                }
            }
        })
    }
})