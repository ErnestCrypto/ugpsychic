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
    " I feel sad.",
    " I feel agitated or restless (I pace, am unable to stay calm, or need to move constantly).",
    " I feel worn out.",
    " I feel so guilty that I can barely take it.",
    " When I wake up in the morning, I feel like there is nothing to look forward to.",
    " I think about death.",
    " When needed, I can make up my mind quickly.",
    " I get mad at myself if I do not achieve the goals I have set out to reach.",
    " When something is bothering me, I cannot stop thinking about it.	",
    " When things go wrong in my life, I feel like I will never get over it.",
    " When I have a bad argument with a friend or loved one, I believe that it will end the relationship.",
    " I have a persistent feeling of emptiness.",
    " I feel slowed down (physically or mentally).",
    " I feel tired even after a good rest.",
    " I feel bad about myself.",
    " I have recurrent thoughts about ending my life.",
    " Even when forces beyond my control prevent me from reaching a goal, I still find a way to blame myself.",
    " I keep myself up at night thinking about the things going on in my life.",
    " If I am struggling in work or in school, I tend to think it is because I am not smart enough.",
    " I feel like crying for no apparent reason.",
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
    outcome = (total / 2000) * 100;
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