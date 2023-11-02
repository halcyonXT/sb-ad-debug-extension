/*chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "removeElement") {
        const elementToRemove = document.querySelector("#cgpreroll");
        if (elementToRemove) {
            elementToRemove.remove();
        }
    }
});*/


function log(message, color) {
    console.log(`%c[SB-AD-DEBUG] ${message}`, `color: ${color}`);
}

const storageKey = "OVERLAY_REMOVAL_COUNTER";
let removedCounter = 0;

;(function() {
    if (localStorage.getItem(storageKey) === null) {
        localStorage.setItem(storageKey, "0");
    } else {
        removedCounter = Number(localStorage.getItem(storageKey));
    }
})();


// god shall judge me for doing this
// ive been bashing my head against the table trying to establish communication between content.js and popup.js
// this is my last resort
let POLLING_INFO = setInterval(() => {
    chrome.runtime.sendMessage({ data: String(removedCounter), action: "updateCount" });
}, 2000)




//scrap
;(function () {
    log("Loading...", "blue");
    try {
        setTimeout(() => {
            chrome.runtime.sendMessage({ data: "Initiation", action: "none" });
        }, 4000)
    } catch (ex) {
        log("Unsuccessful connection to popup: " + ex, "red");
    }
})();

let bounceBackTimer = null;
const validCounterIncrease = () => {
    if (bounceBackTimer === null) {
        removedCounter++;
        localStorage.setItem(storageKey, String(removedCounter));

        bounceBackTimer = setTimeout(() => {
            bounceBackTimer = null;
        }, 4000)
    }
}


const GRACE_PERIOD = 5000;
const checkCgprerollElement = () => {
    const cgprerollElement = document.getElementById("cgpreroll");
    if (cgprerollElement) {
        const divChild = cgprerollElement.querySelector("div");
        if (divChild) {
            if (divChild.childElementCount === 1) {
                if (getComputedStyle(cgprerollElement).display !== "none") {
                    try {
                        setTimeout(() => {
                            if (divChild.childElementCount === 1) {
                                cgprerollElement.style.display = 'none';
                                log("Successfully removed bugged ad display: " + removedCounter, "lime");
                                validCounterIncrease();
                            }
                        }, GRACE_PERIOD)
                    } catch (ex) {
                        log("Unsuccessful removal: " + ex, "red")
                    }
                }
                //cgprerollElement.remove();
            }
        }
    }
}

const observer = new MutationObserver(checkCgprerollElement);


const config = {
    childList: true,
    subtree: true,
};

observer.observe(document, config);