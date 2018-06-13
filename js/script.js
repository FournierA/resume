$(document).ready(function(){

  var percentage, i, target, domain, triggered, fTriggered, nTriggered, mail;

  $("textarea, input").val("");

//  $(".slider-formations").slick({
//    arrows: false,
//    autoplay: true,
//    speed: 2000,
//    infinite: true,
//    autoplaySpeed: 1500,
//    slidesToShow: 4,
//  });

  $(window).scroll(function () {

    target = $("#competences").offset().top + $("#competences").innerHeight()/3 - window.innerHeight;

    if($("html,body").scrollTop() > target && !triggered){

      triggered = true;

      $(".domain").each(function(){

        domain = $(this).attr("id");
        average = 0;
        i = 0;

        $(".competence." + domain + " .loader").each(function(){
          if($(this).attr("data-percentage")){
            average += parseInt($(this).attr("data-percentage"));
            $(this).css("width", $(this).attr("data-percentage") + "%");
            i++;
          }
        });

        average = parseInt(average/i);
        $(this).find(".average .loader").css("width", average + "%");

      });
    }

    if($("html,body").scrollTop() > $("#formations").offset().top + $("#formations").innerHeight() - window.innerHeight && !fTriggered){

      fTriggered = true;

      $(".formation").each(function(index){
        $(this).delay(300*index).queue(function(){
          $(this).addClass("bounceIn").dequeue();
        });
      });
    }

    if($("html,body").scrollTop() > $("#networks").offset().top + $("#networks").innerHeight()/3 - window.innerHeight && !nTriggered){

      nTriggered = true;

      $(".network").each(function(index){
        $(this).delay(300*index).queue(function(){
          $(this).addClass("bounceIn").dequeue();
        });
      });
    }
  });

  $("header").headroom();

  $(".ancre").click(function (e) {
    e.preventDefault();

    if($($(this).attr("href")).offset().top > $("html").scrollTop()){
      $("html,body").animate({
        scrollTop: $($(this).attr("href")).offset().top +1
      }, "slow");
    } else {
      $("html,body").animate({
        scrollTop: $($(this).attr("href")).offset().top - 60
      }, "slow");
    }
  });

  $(window).delay(600).queue(function(){
    $(".banniere .text h1").addClass("visible").delay(800).queue(function(){
      $(".banniere .text p").addClass("visible").dequeue();
    });
  });

  $("#submitMail").click(function(e){
    e.preventDefault();

    if(!$(this).hasClass("disabled")){
      $(this).html("<i class='fas fa-spinner fa-spin'></i>");
      $(this).addClass("disabled");

      mail = [ $("#prenom").val(), $("#nom").val(), $("#mail").val(), $("#sujet").val(), $("textarea").val() ];

      mail = JSON.stringify(mail);

      var params = "mail=" + mail;

      $.ajax({
        type: 'POST',
        url: 'mail.php',
        data: params,
        success: ajaxSuccess
      });
    }
  });
});

function ajaxSuccess(data){
  $("#submitMail").addClass("confirm");
  $("#submitMail").html("<i class='fas fa-check'></i>Envoyé");
  $("textarea, input").val("");
}
