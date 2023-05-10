$("#carouselExample").on("slide.bs.carousel", function (e) {
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $(".carousel-item").length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == "left") {
        $(".carousel-item").eq(i).appendTo(".carousel-inner");
      } else {
        $(".carousel-item").eq(0).appendTo(".carousel-inner");
      }
    }
  }
});

$("#carouselExample").carousel({
  interval: 2000,
});

$(document).ready(function () {
  /* show lightbox when clicking a thumbnail */
  $("a.thumb").click(function (event) {
    event.preventDefault();
    var content = $(".modal-body");
    content.empty();
    var title = $(this).attr("title");
    $(".modal-title").html(title);
    content.html($(this).html());
    $(".modal-profile").modal({ show: true });
  });
});

$(function () {
  const questions = [
    " I frequently get depressed",
    " I worry a lot about little things which may not be neccessary",
    " I am easily angered",
    " I sometimes have suicidal thoughts",
    " I love being alone ",
    
    
  ];
  let answers = questions.map((_) => null);
  let current_index = 0;
  // $("#myForm").hide()
  $("#previousButton").hide();
  $("#myResult").hide();
 $(".explore-right-02").hide();

  $("#questionbox").text(questions[current_index]);
  $("#outof").text(`QUESTION ${current_index + 1} OF ${questions.length}`);
  $("#previousButton").click(() => {
    $("#nextButton").removeAttr("disabled");
    current_index--;
    $("#questionbox").text(questions[current_index]);
    if (current_index == 0) {
      $("#previousButton").hide();
    }
    $("#outof").text(`QUESTION ${current_index + 1} OF ${questions.length}`);
    triggeranswer();
  });

  $(".question").change((e) => {
    e.stopPropagation();
    $("#nextButton").removeAttr("disabled");
    let val = e.target.value;
    if (val !== "") {
      answers[current_index] = val;
    }
  });
  $("#nextButton").click(() => {
    $("#nextButton").attr("disabled", "disabled");
    current_index++;
    $("#questionbox").text(questions[current_index]);
    if (current_index >= 1) {
      $("#previousButton").show();
    }
    $("#outof").text(`QUESTION ${current_index + 1} OF ${questions.length}`);
    triggeranswer();

    if (current_index == questions.length) {
      compute();
    }
  });

  var triggeranswer = () => {
    let chosen = answers[current_index];
    if (chosen !== null) {
      $(".question").each((index, element) => {
        if ($(element).val() == chosen) {
          $(element).prop("checked", true);
          $("#nextButton").removeAttr("disabled");
        }
      });
    } else {
      $("#myForm")[0].reset();
    }
  };

  $("#restart").click(() => {
    location.reload(true);
  });

  var compute = () => {
    var total = 0;
    $("#myForm").hide();
    $.each(answers, (index) => {
      if (answers[index] != null) {
        numAnswer = parseInt(answers[index]);
        var score = numAnswer;
        total += score;
      }
    });
    outcome = (total / 500) * 100;
    outcome = parseInt(outcome);
    $("#myPercent").text(outcome + "%");
    progress();

    $("#myResult").show();
    resultShow();
  };

  var progress = () => {
    var elem = $("#myBar");
    var i = 0;
    if (i == 0) {
      i = 1;
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= outcome) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          $.each(elem, (index) => {
            elem[index].style.width = width + "%";
          });
        }
      }
    }
  };

  var resultShow =()=>{

   questions.map((a, b, c) => {
     function choosenAns() {
       if (answers[b] == 0) {
         return "Strongly Disagree";
       } else if (answers[b] == 25) {
         return "Disagree";
       } else if (answers[b] == 50) {
         return "Neutral";
       } else if (answers[b] == 75) {
         return "Agree";
       } else if (answers[b] == 100) {
         return "Strongly Agree";
       }
     }
     let paragraphs = document.createElement("p");
     paragraphs.innerHTML +=
       "<h5>" +
       (b + 1) +
       ". " +
       a +
       "</h5>" +
       "<p> Your Ans: " +
       choosenAns() +
       "</p>";
     document.querySelector(".result-cont").appendChild(paragraphs);
   });
  }

  
 $("#view").click(() => {
   $(".explore-right-02").show();
   $(".explore-right").hide();

  
 });


 $("#closebtn").click(() => {
   $(".explore-right-02").hide();
   $(".explore-right").show();

 });



  // let view = document.querySelector("#view");
  // let paragraphs = document.createElement("p");
  // view.onclick = (elems) => {
  //   document
  //     .querySelector(".history")
  //     .appendChild(document.createElement("div"))
  //     .classList.add("res");
  //   let closer = document.createElement("div");
  //   closer.classList.add("close");
  //   closer.innerHTML = "x";
  //   document.querySelector(".res").appendChild(closer);

  //   questions.map((a, b, c) => {
  //     paragraphs.innerHTML +=
  //       "<p>" +
  //       (b + 1) +
  //       ". " +
  //       a +
  //       "</p>" +
  //       (answers[b] + answers ? answers[b] : "unset") +
  //       "<br/>";
  //     document.querySelector(".res").appendChild(paragraphs);
  //   });
  // };




});