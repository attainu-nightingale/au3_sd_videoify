$(".trendbtn").on("click", function () {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBvjnDG4s6YF0AMz21UptFzVTns24JNhtk&part=contentDetails%2Csnippet%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=20',
        type: 'GET',
        dataType: 'JSON',
        data: "json",
        success: function (data) {
          $.each(data.items, function (i, item) {
                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                var channel = item.snippet.channelTitle;
                var desc = item.snippet.description.substring(0, 100);
                var view = item.statistics.viewCount;
                var id=item .id;

                $('#content').append(`
                <a href=""/video/:"${id}" >
               <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${thumb}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title" id="title">"${title}"</h5>
            <p class="card-text" id="channel">channel: "${channel}"</p>
            <p class="card-text" id="desc">"${desc}"</p>
            <p class="card-text"><small class="text-muted" id="view">"${view}"</small></p>
          </div>
        </div>
      </div>
    </div>
    </a>            
             `)

            })
        }
    });
});