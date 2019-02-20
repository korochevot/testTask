$(document).ready(function () {
    for (var i = 0; i < data.length; i++) {
        $(".content-block__logo").each(function (index) {
            $(this).attr("src", data[index].img);
        });

        $(".content-block__title").each(function (index) {
            $(this).text(data[index].title)
        });

        $(".content-block__description").each(function (index) {
            $(this).text(data[index].text)
        });

        $(".content-block__button").each(function (index) {
            $(this).attr("data-video", data[index].video.split("=")[1]);
        });
    }

    var videoLoaded = false;
    $(".content-block__button").each(function () {
        $(this).click(function () {
            $(".popup").css("display", "block");
            var videoId = $(this).attr("data-video");

            function createVideo(video) {
                var tagId = "iframe_api";
                var apiScript = document.getElementById(tagId);
                if (apiScript === null) {
                    var tag = document.createElement("script");
                    var firstScript = document.getElementsByTagName("script")[0];

                    tag.src = "https://www.youtube.com/iframe_api";
                    tag.id = tagId;
                    firstScript.parentNode.insertBefore(tag, firstScript);
                }

                window.onYouTubeIframeAPIReady = function () {
                    player = new YT.Player(video, {
                        videoId: videoId,
                        playerVars: {
                            autoplay: 1,
                            modestbranding: 1,
                            rel: 0
                        },
                        events: {
                            "onReady": onPlayerReady,
                        }
                    });
                    videoLoaded = true
                }

                function onPlayerReady(event) {
                    event.target.playVideo();
                }

                if(videoLoaded){
                    player.loadVideoById(videoId);
                }
            }
            createVideo("player");
        });
    });

    $(".popup__close").click(function () {
        player.stopVideo();
        $(".popup").css("display", "none");
    });
})