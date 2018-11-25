function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetDoorButton(isOpen) {
  domObject = document.getElementsByClassName('btn-door-open')[0];
  if (isOpen) {
    domObject.classList.remove('btn-primary');
    domObject.classList.add('btn-warning');
    domObject.value = 'Door is Open';
  } else {
    domObject.classList.remove('btn-warning');
    domObject.classList.add('btn-primary');
    domObject.value = 'Door is Closed';
  }
}

function checkDoorStateAndResetButton() {
  request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      jsonResponse = JSON.parse(request.responseText);
      resetDoorButton(jsonResponse);
    }
  };
  request.open('GET', '/garage_status/door_open', true);
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
