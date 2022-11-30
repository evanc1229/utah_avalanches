import { MainMap } from "./main_map.js";
import { TimeSelect } from "../shared/timeselect.js";
import { ToolTip } from "./tooltip.js";
import * as utils from "../shared/utils.js";
import { Page, Component } from "../shared/prototype.js";

// coordinate tooltip.js, main_map.js, timeselect.js

class Page1 extends Page {
  /**
   *
   * @param {Array<utils.AvalancheData>} data
   */
  constructor(data) {
    console.log("Init Page 1");
    super(data);

    this.padding = 10;

    this.dimensions = {
      timeselect: {
        width: 1600,
        height: 100,
      },
      map: {
        width: 700,
        height: 700,
      },
      tooltip: {
        width: 600,
        height: 600,
      },
    };

    this.positions = {
      timeselect: {
        x: 0,
        y: 0,
      },
      map: {
        x: 0,
        y: this.dimensions.timeselect.height + this.padding,
      },
      tooltip: {
        x: 0,
        y:
          this.dimensions.timeselect.height +
          this.dimensions.map.height +
          this.padding,
      },
    };

    this.aidSelection = this.data.map((d) => d.aid);
    this.aidFocus = null;

    // initialize components
    this.timeselect = new TimeSelect(this, this.data, false);
    this.tooltip = new ToolTip(this, this.data, false);
    this.map = new MainMap(this, this.data, false);

    this.components = [this.timeselect, this.tooltip, this.map];
  }

  async render() {
    let div = d3.select(".content");

    let tsDiv = div
      .append("div")
      .attr("id", "timeselect")
      .style("width", `${this.dimensions.timeselect.width}px`)
      .style("height", `${this.dimensions.timeselect.height}px`)
      .style("left", `${this.positions.timeselect.x}px`)
      .style("top", `${this.positions.timeselect.y}px`)
      .classed("my-2", true);

    // .style("position", "absolute");

    let mapDiv = div
      .append("div")
      .attr("id", "map-container")
      .style("width", `${this.dimensions.map.width}px`)
      .style("height", `${this.dimensions.map.height}px`)
      .style("left", `${this.positions.map.x}px`)
      .style("top", `${this.positions.map.y}px`)
      .classed("mb-5", true);
    // .style("position", "absolute");

    let ttDiv = div
      .append("div")
      .attr("id", "tooltip")
      .style("width", `${this.dimensions.tooltip.width}px`)
      .style("height", `${this.dimensions.tooltip.height}px`)
      .style("left", `${this.positions.tooltip.x}px`)
      .style("top", `${this.positions.tooltip.y}px`);
    // .style("position", "absolute");

    this.map.render(mapDiv);
    this.timeselect.render(tsDiv);
    this.tooltip.render(ttDiv);

    this.elementIds = ["timeselect", "map-container", "tooltip"];
  }

  hide() {
    this.elementIds.forEach((id) => document.getElementById(id).remove());
  }
}
export { Page1 };
