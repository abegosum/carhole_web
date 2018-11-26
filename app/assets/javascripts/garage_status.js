function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function padDateNumber(dateNumber) {
  if (dateNumber < 10) {
    return "0" + dateNumber;
  } else {
    return dateNumber;
  }
}

function resetDoorStatus(jsonResponse) {
  isOpen = jsonResponse.door_is_open;
  buttonDomObject = document.getElementsByClassName('btn-door-open')[0];
  pLastOpenedDomObject = document.getElementById('p-last-opened');
  pLastClosedDomObject = document.getElementById('p-last-closed');
  if (isOpen) {
    buttonDomObject.classList.remove('btn-primary');
    buttonDomObject.classList.add('btn-warning');
    buttonDomObject.value = 'Door is Open';
  } else {
    buttonDomObject.classList.remove('btn-warning');
    buttonDomObject.classList.add('btn-primary');
    buttonDomObject.value = 'Door is Closed';
  }
  if (jsonResponse.door_last_opened_time) {
    last_opened_date = new Date(jsonResponse.door_last_opened_time*1000);
    lo_hour = padDateNumber(last_opened_date.getHours());
    lo_min = padDateNumber(last_opened_date.getMinutes());
    lo_sec = padDateNumber(last_opened_date.getSeconds());
    lo_year = last_opened_date.getFullYear();
    lo_month = padDateNumber(last_opened_date.getMonth());
    lo_day = padDateNumber(last_opened_date.getDate());
    pLastOpenedDomObject.innerHTML = lo_year + "-" + lo_month + "-" + lo_day + " " + lo_hour + ":" + lo_min + ":" + lo_sec;
  }
  if (jsonResponse.door_last_closed_time) {
    last_closed_date = new Date(jsonResponse.door_last_closed_time*1000);
    lc_hour = padDateNumber(last_closed_date.getHours());
    lc_min = padDateNumber(last_closed_date.getMinutes());
    lc_sec = padDateNumber(last_closed_date.getSeconds());
    lc_year = last_closed_date.getFullYear();
    lc_month = padDateNumber(last_closed_date.getMonth());
    lc_day = padDateNumber(last_closed_date.getDate());
    pLastClosedDomObject.innerHTML = lc_year + "-" + lc_month + "-" + lc_day + " " + lc_hour + ":" + lc_min + ":" + lc_sec;
  }
}

function checkDoorStateAndResetButton() {
  request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      jsonResponse = JSON.parse(request.responseText);
      resetDoorStatus(jsonResponse);
    }
  };
  request.open('GET', '/garage_status/view.json', true);
  request.send(null);
}

document.addEventListener("DOMContentLoaded", function(event) {
  timerForm = document.getElementsByClassName('frm-timer-button');
  
  timerForm[0].addEventListener('ajax:success', function(e, data, status, xhr) {
    indicators = document.getElementsByClassName('timer-indicator');
    for (var i = 0; i < indicators.length; i++) {
      indicator = indicators[i];
      indicator.classList.remove('timer-selection-highlight');
      indicator.classList.add('timer-highlight');
    }
    newIndex = e.detail[0];
    newSelection = document.getElementById('timer-indicator-' + newIndex);
    newSelection.classList.remove('timer-highlight');
    newSelection.classList.add('timer-selection-highlight');
  });

  openCloseForm = document.getElementsByClassName('frm-door-button')[0];

  openCloseForm.addEventListener('ajax:success', async function(e) {
    doorButton = document.getElementsByClassName('btn-door-open')[0];
    buttonPressResult = e.detail[0];
    doorButton.value = buttonPressResult.charAt(0).toUpperCase() + buttonPressResult.substr(1); 
    await sleep(30000);
    checkDoorStateAndResetButton();
  });
});
