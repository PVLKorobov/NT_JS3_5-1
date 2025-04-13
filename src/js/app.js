import { Tooltip } from "./tooltip";

window.tooltip = new Tooltip();

document
  .querySelector(".contents__wrapper .tooltip-button")
  .addEventListener("click", (event) => {
    window.tooltip.showAt(
      event.target,
      "The button was clicked",
      "It called a function that made this tooltip appear",
    );
  });

let tooltipTargets = document.querySelectorAll(".info-tooltip-target");
for (let tooltipTarget of tooltipTargets) {
  tooltipTarget.addEventListener("click", (event) => {
    window.tooltip.showAt(
      event.target,
      event.target.dataset.tooltiptitle,
      event.target.dataset.tooltiptext,
    );
  });
}
