$.ajax({
    url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBFvN6iMnZhT8uUPBQIQMA3R50g19lbUsk&part=contentDetails%2Csnippet%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50",
    type: "GET",
    dataType: "json",
    success: function (data) {
        for (var i = 0; i < data.items.length; i++) {
            $("#content").append(`<div class="card d-inline-block m-1 ml-1 mb-3 " style="width: 18rem;">
            <a  class="text-decoration-none" href="/individual/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap">
            <div class="card-body  p-0">
            <h6 class="card-title text-truncate d-block pl-1">${data.items[i].snippet.title}</h6>
            </div></a>
            <div class="card-footer pl-2 pr-2" >${data.items[i].snippet.channelTitle}
            <small class="card-text float-right"><i class="fa fa-eye" style="font-size:12px;color:red"></i>
            ${data.items[i].statistics.viewCount}</small>
            </div>
        </div>`)
        }
    }
})
