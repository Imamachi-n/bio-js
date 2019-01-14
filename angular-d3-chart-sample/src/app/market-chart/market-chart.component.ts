import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  OnChanges
} from "@angular/core";
import * as d3 from "d3";
import { MarketPrice } from "../market-price";

@Component({
  selector: "app-market-chart",
  templateUrl: "./market-chart.component.html",
  styleUrls: ["./market-chart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketChartComponent implements OnChanges {
  @ViewChild("chart")
  chartElement: ElementRef;

  parseDate = d3.timeParse("%d-%m-%Y");

  @Input()
  marketStatus: MarketPrice[];

  private svgElement: HTMLElement;
  private chartProps: any;

  constructor() {}

  ngOnChanges() {}

  formatDate() {
    this.marketStatus.forEach(ms => {
      if (typeof ms.date === "string") {
        ms.date = this.parseDate(ms.date);
      }
    });
  }

  buildChart() {
    this.chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    let margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
  }
}
