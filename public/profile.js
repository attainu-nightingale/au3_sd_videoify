var user_Name = $("#userName").val();

var numOfvideos = 0;
$.ajax({
    url: "/profile/getLikedVideos/" + user_Name,
    type: "GET",
    dataType: "json",
    success: function (data) {
        var numOfLikes = data.length;
        $("#liked").html(numOfLikes)
        numOfvideos += numOfLikes;
        $("#numOfLikes").html(numOfLikes)
        var string = '';
        for (let i = 0; i < data.length; i++) {
            if (data.length == 1)
                string = data[0].videoId;
            else if (i == (data.length - 1))
                string += data[i].videoId;
            else
                string += data[i].videoId + "%2C";
        }



        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.items.length; i++) {
                    $("#likedv").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                    <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                    <div class="card-body  p-1">
                        <small class="card-text"></small> 
                        
                    </div>
                    <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                    <form action="/profile/popUserName/${user_Name}/${data.items[i].id}" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                            list</button></form></div>
                </div>`)
                }
            }
        })



    }
})

$.ajax({
    url: "/profile/getWatchLaterVideos/" + user_Name,
    type: "GET",
    dataType: "json",
    success: function (data) {
        var numOfWatchLaterVideos = data.length;
        $("#watchl").html(numOfWatchLaterVideos)
        numOfvideos += numOfWatchLaterVideos;
        $("#numOfvideos").html(numOfvideos)
        var string = '';
        for (let i = 0; i < data.length; i++) {
            if (data.length == 1)
                string = data[0].videoId;
            else if (i == (data.length - 1))
                string += data[i].videoId;
            else
                string += data[i].videoId + "%2C";
        }


        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.items.length; i++) {
                    $("#watchlv").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                    <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                    <div class="card-body  p-1">
                        <small class="card-text"></small> 
                        
                    </div>
                    <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                    <form action="profile/removeFromList/${user_Name}/${data.items[i].id}/WatchLater" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                            list</button></form></div>
                </div>`)
                }
            }
        })



    }
})

$('#likedVideos').on('click', function () {
    //document.getElementById("#clear").innerHTML= "";
    $("#clear").html('');
    $("#clear").append(`<div class="m-2">
                    <span  class="btn btn-info p-1">
                    Liked Videos <span id="likedvid" class="badge badge-light"></span>
                    </span></div>`);
    $.ajax({
        url: "/profile/getLikedVideos/" + user_Name,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var numOfVideos = data.length;
            $("#likedvid").html(numOfVideos)
            $("#numOfvideos").html(numOfVideos)
            var string = '';
            for (let i = 0; i < data.length; i++) {
                if (data.length == 1)
                    string = data[0].videoId;
                else if (i == (data.length - 1))
                    string += data[i].videoId;
                else
                    string += data[i].videoId + "%2C";
            }


            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        $("#clear").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                        <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                        <div class="card-body  p-1">
                            <small class="card-text"></small> 
                            
                        </div>
                        <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                        <form action="/profile/popUserName/${user_Name}/${data.items[i].id}" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                                list</button></form></div>
                    </div>`)
                    }
                }
            })



        }
    })


})


$('#myPlaylistVideos').on('click', function () {
    // document.getElementById("#clear").innerHTML = "";
    $("#clear").html('');
    $("#clear").append(`<div class="m-2">
                    <span  class="btn btn-info p-1">
                    My Playlist Videos <span id="playlistvid" class="badge badge-light"></span>
                    </span></div>`);
    $.ajax({
        url: "/profile/getMyPlaylistVideos/" + user_Name,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var numOfVideos = data.length;
            $("#playlistvid").html(numOfVideos)
            $("#numOfvideos").html(numOfVideos)
            var string = '';
            for (let i = 0; i < data.length; i++) {
                if (data.length == 1)
                    string = data[0].videoId;
                else if (i == (data.length - 1))
                    string += data[i].videoId;
                else
                    string += data[i].videoId + "%2C";
            }


            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        $("#clear").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                        <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                         <div class="card-body  p-1">
                             <small class="card-text"></small> 
                             
                         </div>
                         <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                         <form action="profile/removeFromList/${user_Name}/${data.items[i].id}/myPlaylist" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                                 list</button></form></div>
                     </div>`)
                    }
                }
            })



        }
    })


})


$('#watchLaterVideos').on('click', function () {
    //document.getElementById("#clear").innerHTML= "";
    $("#clear").html('');
    $("#clear").append(`<div class="m-2">
                    <span  class="btn btn-info p-1">
                    Watch Later Videos <span id="watchlatervid" class="badge badge-light"></span>
                    </span></div>`);
    $.ajax({
        url: "/profile/getWatchLaterVideos/" + user_Name,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var numOfVideos = data.length;
            $("#watchlatervid").html(numOfVideos)
            $("#numOfvideos").html(numOfVideos)
            var string = '';
            for (let i = 0; i < data.length; i++) {
                if (data.length == 1)
                    string = data[0].videoId;
                else if (i == (data.length - 1))
                    string += data[i].videoId;
                else
                    string += data[i].videoId + "%2C";
            }


            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        $("#clear").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                        <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                        <div class="card-body  p-1">
                            <small class="card-text"></small> 
                            
                        </div>
                        <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                        <form action="profile/removeFromList/${user_Name}/${data.items[i].id}/WatchLater" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                                list</button></form></div>
                    </div>`)
                    }
                }
            })



        }
    })


})


$('#favoritesVideos').on('click', function () {
    // document.getElementById("#clear").innerHTML = "";
    $("#clear").html('');
    $("#clear").append(`<div class="m-2">
    <span  class="btn btn-info p-1">
    Favourites Video <span id="favoritesvid" class="badge badge-light"></span>
    </span></div>`);
    $.ajax({
        url: "/profile/getFavouritesVideos/" + user_Name,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var numOfVideos = data.length;
            $("#favoritesvid").html(numOfVideos)
            $("#numOfvideos").html(numOfVideos)
            var string = '';
            for (let i = 0; i < data.length; i++) {
                if (data.length == 1)
                    string = data[0].videoId;
                else if (i == (data.length - 1))
                    string += data[i].videoId;
                else
                    string += data[i].videoId + "%2C";
            }


            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&id=" + string,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        $("#clear").append(`<div class="card d-inline-block m-1 " style="width: 18rem;">
                        <a href="/video/${data.items[i].id}"><img class="card-img-top img-thumbnail" src="${data.items[i].snippet.thumbnails.high.url}" alt="Card image cap"></a>
                         <div class="card-body  p-1">
                             <small class="card-text"></small> 
                             
                         </div>
                         <div class="card-footer p-1">${data.items[i].snippet.channelTitle}
                         <form action="profile/removeFromList/${user_Name}/${data.items[i].id}/favourites" method="post"><button type="submit" class="btn btn-sm btn-danger  float-right">remove from
                                 list</button></form></div>
                     </div>`)
                    }
                }
            })



        }
    })

})