class Tooltip {
  constructor() {
    this.tooltipWrapper = document.createElement("div");
    this.tooltipWrapper.setAttribute("class", "tooltip__wrapper");

    let tooltipTitleWrapper = document.createElement("div");
    tooltipTitleWrapper.setAttribute("class", "tooltip__title__wrapper");
    this.tooltipWrapper.appendChild(tooltipTitleWrapper);

    this.tooltipTitle = document.createElement("h2");
    this.tooltipTitle.setAttribute("class", "tooltip__title");
    tooltipTitleWrapper.appendChild(this.tooltipTitle);

    let tooltipTextWrapper = document.createElement("div");
    tooltipTextWrapper.setAttribute("class", "tooltip__text__wrapper");
    this.tooltipWrapper.appendChild(tooltipTextWrapper);

    this.tooltipText = document.createElement("p");
    this.tooltipText.setAttribute("class", "tooltip__text");
    tooltipTextWrapper.appendChild(this.tooltipText);

    document.querySelector("body").appendChild(this.tooltipWrapper);

    this.hideTimeout = null;
  }

  showAt(targetElement, title, text) {
    this.tooltipWrapper.style.display = "block";

    this.tooltipTitle.innerHTML = title;
    this.tooltipText.innerHTML = text;

    const targetRect = targetElement.getBoundingClientRect();

    this.tooltipWrapper.style.left =
      targetRect.left -
      this.tooltipWrapper.offsetWidth / 2 +
      targetElement.offsetWidth / 2 +
      "px";
    this.tooltipWrapper.style.top =
      targetRect.top - this.tooltipWrapper.offsetHeight - 5 + "px";

    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideTooltip();
    }, 10000);
  }

  hideTooltip() {
    this.tooltipWrapper.style.display = "none";
  }
}

export { Tooltip };
