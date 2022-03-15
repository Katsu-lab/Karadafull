$(function(){
  $("header").css("padding-top", $("header .menu_bar").innerHeight());
  $(".fitImage").each(function(){
    const height = $(this).height();
    const width = $(this).width();
    if (height > width) {
      $(this).css("width", "100%");
    } else {
      $(this).css("height", "100%");
    }
  });
  let timeoutID;
  $(window).on("scroll", function(){
    if($("header .menu_bar").hasClass("jump")){
      const scroll = $(window).scrollTop();
      $(window).scrollTop(scroll - 130);
      $("header .menu_bar").removeClass("jump");
      return;
    }
    $("header .menu_bar").addClass("scrolling");
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function(){
      $("header .menu_bar").removeClass("scrolling");
    }, 500);
  });
  $("header .menu_bar").click(function(){
    $("header .menu_bar").addClass("jump");
  });
  const images = setImages();
  let showImages = [];
  let hiddenImages = [];
  $(".image_box ul li").each(function(){
    showImages.push($("img", this).attr("src"));
  });
  for (let i = 0; i < images.length; i++) {
    let j = 0;
    for (j = 0; j < showImages.length; j++) {
      if (images[i] == showImages[j]) {
        break;
      }
    }
    if (j == showImages.length) {
      hiddenImages.push(images[i]);
    }
  }
  let lastChange = 0;
  let interval = [getRandomInt(1750, 2250), getRandomInt(750, 1250), getRandomInt(2500, 3000)];
  let interval_num = 0;
  setInterval(function(){
    interval_num = (interval_num + 1) % interval.length;
    $(".image_box ul li").removeClass("change");
    const num_image_hidden = getRandomInt(0, hiddenImages.length);
    const url_hidden = hiddenImages[num_image_hidden];
    let num_obj = null;
    do {
      num_obj = getRandomInt(0, $(".image_box ul li").length);
    } while(lastChange == num_obj)
    lastChange = num_obj;
    const $change_obj = $(".image_box ul li").eq(num_obj);
    const url_show = $change_obj.find("img").attr("src");
    let num_image_show = 0;
    for (let i = 0; i < showImages.length; i++) {
      if(showImages[i] == url_show) {
        num_image_show = i;
      }
    }
    const tmp = hiddenImages[num_image_hidden];
    hiddenImages[num_image_hidden] = showImages[num_image_show];
    showImages[num_image_show] = tmp;
    $change_obj.find("img").animate({"opacity": "0"}, 800, "easeInQuad", function() {
      $change_obj.find("img").attr("src", url_hidden);
    });
    $change_obj.find("img").animate({"opacity": "1"}, 800, "easeOutQuad");
  }, interval[interval_num]);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  // function getImages(images) {
  //   let new_images = [];
  //   for (let i = 0; i < images.length; i++) {
  //     let flag = true;
  //     $(".image_box ul li").each(function(){
  //       if ($("img", this).attr("src") == images[i]) {
  //         flag = false;
  //         return;
  //       }
  //     });
  //     if (flag) {
  //       new_images.push(images[i])
  //     }
  //   }
  //   return new_images;
  // }
});
