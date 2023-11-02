/*
<button id="removeButton">
                REMOVE OVERLAY
            </button>

            button {
          position: relative;
          width: 100%;
          padding: 10px 20px;
          border-radius: 7px;
          border: 1px solid rgb(61, 255, 164);
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          background: transparent;
          color: #fff;
          overflow: hidden;
          box-shadow: 0 0 0 0 transparent;
          -webkit-transition: all 0.2s ease-in;
          -moz-transition: all 0.2s ease-in;
          transition: all 0.2s ease-in;
          font-family: 'Syncopate', sans-serif;
          font-weight: bolder;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        button:hover {
          background: rgb(61, 255, 164);
          box-shadow: 0 0 15px 5px rgba(0, 236, 165, 0.415);
          -webkit-transition: all 0.2s ease-out;
          -moz-transition: all 0.2s ease-out;
          transition: all 0.2s ease-out;
          color: #191919;
        }

        button:hover::before {
          -webkit-animation: sh02 0.5s 0s linear;
          -moz-animation: sh02 0.5s 0s linear;
          animation: sh02 0.5s 0s linear;
        }

        button::before {
          content: '';
          display: block;
          width: 0px;
          height: 86%;
          position: absolute;
          top: 7%;
          left: 0%;
          opacity: 0;
          background: #fff;
          box-shadow: 0 0 50px 30px #fff;
          -webkit-transform: skewX(-20deg);
          -moz-transform: skewX(-20deg);
          -ms-transform: skewX(-20deg);
          -o-transform: skewX(-20deg);
          transform: skewX(-20deg);
        }

        @keyframes sh02 {
          from {
            opacity: 0;
            left: 0%;
          }

          50% {
            opacity: 1;
          }

          to {
            opacity: 0;
            left: 100%;
          }
        }

        button:active {
          box-shadow: 0 0 0 0 transparent;
          -webkit-transition: box-shadow 0.2s ease-in;
          -moz-transition: box-shadow 0.2s ease-in;
          transition: box-shadow 0.2s ease-in;
        }

        document.addEventListener("DOMContentLoaded", function () {
    const removeButton = document.getElementById("removeButton");

    removeButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            console.log("MESSAGING CONTENT.JS")
            chrome.tabs.sendMessage(activeTab.id, { action: "removeElement" });
        });
    });
});

*/

const COUNTER = document.querySelector("#removalCounter");

const storageKey = "OVERLAY_REMOVAL_COUNTER_POPUP";
let removedCounter = 0;

;(function() {
    if (localStorage.getItem(storageKey) === null) {
        localStorage.setItem(storageKey, "0");
    } else {
        removedCounter = Number(localStorage.getItem(storageKey));
    }
    COUNTER.innerHTML = removedCounter;
})();

const updateRemovedCounter = (data) => {
    COUNTER.innerHTML = data;
}

function handleIconClick() {
    console.log("Got clicked")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "infoDOM" });
    });
}


//chrome.browserAction.onClicked.addListener(handleIconClick);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.data) {
        //REMOVE DEBUG
        //console.log("Received message from content.js:", message.data);
        switch (message.action) {
            case "updateCount":
                updateRemovedCounter(message.data);
                break
            default:
                break
        }
    }
});