function sub(con) {
  if (con) {
    name = document.getElementById("name").value;
    window.location.href = `${window.location.href}/${name}`;
  } else {
    member = document.getElementById("member").value;
    numbers = document.getElementById("numbers").value;
    name = document.getElementById("name").value;
    window.location.href = `${((Math.random() * 0xfffffffff) << 0)
      .toString(16)
      .padStart(9, "0")}_${member}_${numbers}/${name}`;
  }
}

function copyToClip() {
  var copyText = document.getElementById("copy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}

window.onload = () => {
  init();
};
var corArry = [];
var color = "red";
loc = window.location.pathname;
var you = loc.split("/")[3];
var myturn = false;

function init() {
  document.getElementById("copy").value = window.location.href.substring(
    0,
    window.location.href.indexOf("/", 40)
  );
  var canvas = document.getElementById("playground");
  var dot1 = document.getElementById("dot 0 0");
  var rect = dot1.getBoundingClientRect();
  if (document.body.clientWidth > 600) canvas.style.cursor = "pointer";
  canvas.querySelectorAll(".row").forEach((ele, index) => {
    corArry.push([]);
    ele.querySelectorAll(".dot").forEach((el) => {
      var r = el.getBoundingClientRect();
      corArry[index].push({ x: r.x, y: r.y });
    });
  });

  var universalEvent = null;

  canvas.onmousedown = function (event) {
    draw(event, false);

    console.log("STFU");
  };

  canvas.onmousemove = function (event) {
    draw(event, true);
    console.log(" i am getting fired");
  };
  canvas.ontouchend = function () {
    draw(universalEvent, false);

    console.log("STFU");
  };
  canvas.ontouchmove = function (event) {
    universalEvent = draw(event, true);
    console.log(" i am getting fired");
  };
setInterval(update_board, 500)
//   update_board();
}

function draw(event, temp) {
  if (myturn) {
    try {
      x = event.clientX;
      y = event.clientY;
    } catch (e) {
      console.log(event);
    }
    try {
      // var touch = event.targetTouches[0];
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } catch (e) {
      console.log(e);
    }

    document.querySelectorAll(".tempLine").forEach((element) => {
      element.remove();
      // console.log("deleting", temp)
    });
    if (!temp) {
      console.log(
        "MOPIUSHSE WAS PRESSED DOWN YOU WHORE ARE A WHORE OF THE WOLRD PLZ DIE U FUCKING PEICE OF SHIT"
      );
    }

    //   console.log(x, y);
    tempX = corArry[0][0].x;
    tempY = corArry[0][0].y;
    diffX = 0;
    diffY = 0;
    gapX = corArry[0][1].x - corArry[0][0].x;
    gapY = corArry[1][0].y - corArry[0][0].y;
    xcounter = 1;
    ycounter = 1;
    while (x > tempX) {
      tempX = corArry[0][xcounter++].x;
    }
    // console.log(tempX- x, "tempdiff")
    diffX = tempX - x - gapX / 2;
    while (y > tempY) {
      tempY = corArry[ycounter++][0].y;
    }
    diffY = tempY - y - gapY / 2;
    //   console.log(Math.abs(diffY / gapY), Math.abs(diffX / gapY));
    //   console.log(diffY, diffX / gapX, diffY / gapY > diffX / gapX);
    if (Math.abs(diffY / gapY) > Math.abs(diffX / gapY)) {
      tempY =
        diffY > 0 ? corArry[ycounter - 2][0].y : corArry[ycounter - 1][0].y;
      // console.log(tempY, "tempdif");
      tempX = corArry[0][xcounter - 2].x;
      if (temp) drawtempLineX(tempX, tempY - 5);
      else {
        drawLineX(tempX, tempY - 5, color);
        send_move(
          (diffY > 0 ? ycounter - 2 : ycounter - 1) * 2 +
            "_" +
            ((xcounter - 2) * 2 + 1)
        );
      }
    } else {
      tempX =
        diffX > 0 ? corArry[0][xcounter - 2].x : corArry[0][xcounter - 1].x;
      tempY = corArry[ycounter - 2][0].y;

      // console.log(tempX, "tempdif");
      if (temp) drawtempLineY(tempX, tempY);
      else {
        drawLineY(tempX, tempY, color);
        send_move(
          (ycounter - 2) * 2 +
            1 +
            "_" +
            (diffX > 0 ? xcounter - 2 : xcounter - 1) * 2
        );
      }
    }
  }
  return event;
}

function update_game(game) {
  myturn = game["status"] && game["next_turn"] == you;
  document.getElementById("start").innerHTML = game["status"]
    ? "Game Started!"
    : "Game NOT Started!";
  color = game["dash_board"][you][1];
  // console.log(color);
  scoreBoard = document.getElementById("scoreBoard");
  scoreBoard.innerHTML = "";
  for (var ele in game["dash_board"]) {
    var p = document.createElement("p");
    p.innerHTML = `${ele}: ${game["dash_board"][ele][0]}`;
    scoreBoard.appendChild(p);
  }
  var p = document.createElement("p");
  p.innerHTML = `Now ${game["next_turn"]} turn`;
  scoreBoard.appendChild(p);

  game["board"].forEach((element, i) => {
    element.forEach((ele, j) => {
      // if (ele) console.log(j, i, ele);
      if (ele && j % 2 == 0 && i % 2 != 0) {
        // console.log(
        //   j,
        //   i,
        //   game["dash_board"][ele][1],
        //   Math.floor((j - 1) / 2),
        //   Math.floor(i / 2)
        // );
        drawLineY(
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].x,
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].y,
          game["dash_board"][ele][1]
        );
      }
      if (ele && j % 2 != 0 && i % 2 == 0) {
        // console.log(
        //   j,
        //   i,
        //   game["dash_board"][ele][1],
        //   Math.floor((j - 1) / 2),
        //   Math.floor(i / 2)
        // );
        drawLineX(
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].x,
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].y - 5,
          game["dash_board"][ele][1]
        );
      }
      if (ele && i % 2 != 0 && j % 2 != 0) {
        writeInitail(
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].x+5,
          corArry[Math.floor(i / 2)][Math.floor(j / 2)].y,
          ele.substring(0, 1),
          game["dash_board"][ele][1]
        );
      }
    });
  });
}

function writeInitail(x, y, n, colorNP) {
  var canvas = document.getElementById("playground");
  var p = document.createElement("p");
  p.style.top = y + "px";
  p.style.left = x + "px";
  p.style.color = colorNP;
  p.classList.add("letter");
  p.innerHTML = n;
  p.style.font=""
  canvas.appendChild(p);
}

function drawtempLineX(x, y) {
  //   console.log(x, y);
  var canvas = document.getElementById("playground");
  var line = document.createElement("div");
  line.classList.add("tempLine");
  line.style.borderColor = "grey";
  line.style.color = "grey";
  line.style.width = "18px";
  line.style.height = "5px";
  line.style.borderBottom = "2px solid";
  line.style.position = "absolute";
  line.style.top = y + "px";
  line.style.left = x + "px";
  canvas.appendChild(line);
}
function drawtempLineY(x, y) {
  //   console.log(x, y);
  var canvas = document.getElementById("playground");
  var line = document.createElement("div");
  line.style.width = "5px";
  line.classList.add("tempLine");
  line.style.borderColor = "grey";
  line.style.color = "grey";
  line.style.height = "18px";
  line.style.borderLeft = "2px solid";
  line.style.position = "absolute";
  line.style.top = y + "px";
  line.style.left = x + "px";
  canvas.appendChild(line);
}

function drawLineX(x, y, colorIN) {
  //   console.log(x, y);
  var canvas = document.getElementById("playground");
  var line = document.createElement("div");
  line.style.width = "18px";
  line.style.color = colorIN;
  line.style.height = "5px";
  line.style.borderBottom = "2px solid";
  line.style.position = "absolute";
  line.style.top = y + "px";
  line.style.left = x + "px";
  canvas.appendChild(line);
}

function drawLineY(x, y, colorIN) {
  //    console.log(x, y, "y line is not drawing");
  var canvas = document.getElementById("playground");
  var line = document.createElement("div");
  line.style.width = "5px";
  line.style.color = colorIN;
  line.style.height = "18px";
  line.style.borderLeft = "2px solid";
  line.style.position = "absolute";
  line.style.top = y + "px";
  line.style.left = x + "px";
  canvas.appendChild(line);
}

const send_move = (move) => {
  var request_get = new XMLHttpRequest();
  // Open a new connection, using the GET request_get on the URL endpoint
  loc = window.location.pathname.split("/");
  // console.log(move);
  request_get.open("GET", `/${loc[1]}/move/${loc[2]}/${loc[3]}/${move}`, true);
  request_get.onload = () => {
    if (request_get.status >= 200 && request_get.status < 400) {
      var json = JSON.parse(request_get.responseText);
      console.log(json, move);
      //   console.log(json);
    }
  };
  request_get.send();
};

const update_board = () => {
  var request_get = new XMLHttpRequest();
  // Open a new connection, using the GET request_get on the URL endpoint
  loc = window.location.pathname.split("/");
  // console.log(`/${loc[1]}/update_board/0/0/0/${loc[2].split("_")[0]}`);
  request_get.open(
    "GET",
    `/${loc[1]}/update_board/0/0/0/${loc[2].split("_")[0]}`,
    true
  );
  request_get.onload = () => {
    if (request_get.status >= 200 && request_get.status < 400) {
      // console.log(request_get.responseText);
      var json = JSON.parse(request_get.responseText);
      // console.log(json);
      update_game(json);

      //   console.log(json);
    }
  };
  request_get.send();
};
