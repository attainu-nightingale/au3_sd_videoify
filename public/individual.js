var full_url = document.URL;
var url_array = full_url.split('/')
var video_id = url_array[url_array.length-1];
$.ajax({
   url: "https://www.googleapis.com/youtube/v3/videos?id="+ video_id+"&key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E" + "&part=contentDetails%2Csnippet%2Cstatistics",
   dataType: "json",
   type:'GET',
   success: function(data){
            console.log(data.items[0].snippet.title);
            console.log(data.items[0].statistics.viewCount);
            $('#div1').append(data.items[0].snippet.title);
            $('#description').append(data.items[0].snippet.description);
            $('#views').append(data.items[0].statistics.viewCount);
            $('#likes').append(data.items[0].statistics.likeCount);
            $('#dislikes').append(data.items[0].statistics.dislikeCount);
   },
   error: function( textStatus, errorThrown) {
       alert (textStatus, + ' | ' + errorThrown);
   }
});
var obj = {"video": {
   "value": "<iframe class='embed-responsive-item' width='560' height='315' src='https://www.youtube.com/embed/'${video_id}allowfullscreen></iframe>"}
}
   $("#div").html(obj.video.value);
   $.ajax({
       url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyAHbAycr4wdQv4kKznGKUowXHiK65ocV3E&part=snippet&relatedToVideoId="+video_id+"&type=video&maxResults=10",
       dataType: "json",
       type:'GET',
       data:"json",
       success: function(data){
           for(i=0;i<data.items.length;i++){
           $('#div3').append("<div id='div4'class='card mb-4' style='max-width: 600x;border-color:white;'"+
          "<div class='row no-gutters'>"+
             "<div id='img' class='col-6'>"+
                "<img src="+data.items[i].snippet.thumbnails.default.url+"width='230' height='200'class='card-img'>"+"</div>"+
                 "<a href='/video/"+data.items[i].id.videoId+"'"+"><p class='title ml-auto;'>"+data.items[i].snippet.title+"</></a>"+
                 "<p id='thumbnail' class='text' style='ml-auto;'></p>"+
             "</div>"+
           "</div>"+
         "</div>")
                }
       }
   });
// like button
   var btn = document.getElementById("btn");
var counter = document.getElementById("btn-counter");
counter.innerHTML = 0;
$('#btn').on('click',function(){
   counter.innerHTML++;
});

$("#btn2").on("click",function(){
   $.ajax({
       url: "/video/:id",
       data: $('#text').serialize(),
       type: 'POST',
       success: function(data){
           $('#comment').append("<span>"+jsonParse(data)+"</span>");
           window.location = "/video/:id";
          },
          error: function(xhr, type, exception) {
            // if ajax fails display error alert
            alert("ajax error response type "+type);
          }
   })
});