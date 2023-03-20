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
    " Interpreting data, analyzing results using statistical techniques  are some of the duties and responsibilities of a data analyst.",
    " One of the process you follow when cleaning data is  making corrections to the data.",
    " Are you familier with SPSS or have you ever heard of it.",
    " Data Type Check is a data visualization method.",
    " To conduct exploratory data analysis, data needs to be collected.",
    ];
  let answers = questions.map((_) => null);
  let current_index = 0;
  $("#myForm").hide()
  $("#previousButton").hide();
  // $("#myResult").hide();
  $(".lds-spinner").hide();

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

  
});

