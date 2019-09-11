    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBvjnDG4s6YF0AMz21UptFzVTns24JNhtk&part=snippet&q=movies&maxResults=30',
        type: 'GET',
        dataType: 'JSON',
        data: "json",
        success: function (data) {
            $.each(data.items, function (i, item) {

                var thumb = item.snippet.thumbnails.medium.url;
                var title = item.snippet.title;
                var channel = item.snippet.channelTitle;
                var desc = item.snippet.description.substring(0, 100);
                var id=item.id.videoId;
console.log(data);
                $('#content').append(`
                <a href="/individual/video/${id}" >
               <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${thumb}" class="card-img" alt="..." href="/video/:"${id}"">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title" id="title">"${title}"</h5>
            <p class="card-text" id="channel">channel: "${channel}"</p>
            <p class="card-text" id="desc">"${desc}"</p>
           
          </div>
        </div>
      </div>
    </div>   
    </a>          
             `)
console.log("/video/:"+id);
            })
        }
    });
