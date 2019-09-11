var video_id = $("#videoID").val();
var user_Name = $("#userName").val();


$.ajax({
   url: "https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=contentDetails%2Csnippet%2Cstatistics",
   dataType: "json",
   type: 'GET',
   success: function (data) {
      $('#div1').append(data.items[0].snippet.title);
      $('#description').append(data.items[0].snippet.description);
      $('#views').append(data.items[0].statistics.viewCount);
      $('#likes').append(data.items[0].statistics.likeCount);
      $('#dislikes').append(data.items[0].statistics.dislikeCount);
      $('#channel').append(data.items[0].snippet.channelTitle);
   }
});

$.ajax({
   url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&relatedToVideoId=" + video_id + "&type=video&maxResults=10",
   dataType: "json",
   type: 'GET',
   data: "json",
   success: function (data) {
      for (i = 0; i < data.items.length; i++) {
         $('#div3').append("<div class='card mb-2 p-2'>" +
            "<a href='/individual/video/" + data.items[i].id.videoId + "'" + "><img src=" + data.items[i].snippet.thumbnails.medium.url + " class='card-img img-thumbnail'>" +
            "<div class='card-body p-1 mt-2'> <p class='card-text'>" + data.items[i].snippet.title + "</p></a>" +
            "</div>" +
            "</div>")
      }
   }
});

//for getting comments
$.ajax({
   url: "/individual/getComments/" + video_id,
   dataType: "json",
   type: 'GET',
   data: "json",
   success: function (data) {
      var i = data.length - 1;
      for (i; i >= 0; i--) {
         $('#comments').append(`<div class="card mt-5 mb-2">
         <div class="card-header">
         ${data[i].userName}
         </div>
         <div class="card-body p-2">
           <blockquote class=" mb-0 ">
             <p>${data[i].comment}</p>
             <footer class="blockquote-footer">${data[i].dateTime}</footer>
           </blockquote>
         </div>
       </div>`)
      }
   }
});

//for geting likes
$.ajax({
   url: "/individual/getLikes/" + video_id,
   dataType: "json",
   type: 'GET',
   data: "json",
   success: function (data) {
      $('#like-counter').append(data[0].likes);
   }
});

//like btn click
$('#btn-like').on('click', function () {
   $.ajax({
      url: "/individual/getLikes/" + video_id,
      dataType: "json",
      type: 'GET',
      data: "json",
      success: function (data) {
         var userNameArrayLength = data[0].userNames.length;
         if (userNameArrayLength == 0) {
            var counter = document.getElementById("like-counter");
            counter.innerHTML++;
            $("#btn-like").addClass("disabled");

            $.ajax({
               type: "post",
               url: "/individual/pushUserName/" + user_Name + "/" + video_id,
               contentType: 'application/json',
               dataType: "json",
               data: JSON.stringify(data),
               success: function (result) {
                  console.log(result);
               }
            })
         }
         else {
            console.log(userNameArrayLength);
            var flag = false;
            for (var i = 0; i < userNameArrayLength; i++) {
               if (data[0].userNames[i] == user_Name) {
                  flag = true;
                  break;
               }
            }
            if (flag == false) {
               var counter = document.getElementById("like-counter");
               counter.innerHTML++;
               $("#btn-like").addClass("disabled");
               $.ajax({
                  type: "post",
                  url: "/individual/pushUserName/" + user_Name + "/" + video_id,
                  contentType: 'application/json',
                  dataType: "json",
                  data: JSON.stringify(data),
                  success: function (result) {
                     console.log(result);
                  }
               })


            }

         }

      }
   })
})

