$(init);

function init() {
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  $(".time-block").each(function () {
    let timeBlock = $(this).attr("id");

    $("#" + timeBlock + " textarea").text(
      localStorage.getItem(moment().format("DDDYYYY") + timeBlock)
    );
  });

  $(".saveBtn").on("click", handleSave);
}

function colorTimeBlocks() {
  $(".time-block").each(function () {
    let hours = parseInt($(this).attr("id").replace("hour-", ""));
    let currentTime = parseInt(moment().format("H"));
    // remove any class we may have added before
    $(this).removeClass("past present future");
    if (hours < currentTime) {
      $(this).addClass("past");
    } else if (hours > currentTime) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  let timeId = $(this).parent().attr("id");
  localStorage.setItem(
    moment().format("DDDYYYY") + timeId,
    $("#" + timeId + " textarea").val()
  );
}
