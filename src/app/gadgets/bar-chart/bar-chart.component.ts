import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board/board.service';
import { EventService } from 'src/app/eventservice/event.service';
import { GadgetBase } from '../common/gadget-common/gadget-base/gadget.base';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends GadgetBase  implements OnInit {
  saleData = [
    { name: "Armani", value: 105000 },
    { name: "Guuci", value: 55000 },
    { name: "Ralf Lauren", value: 15000 },
    { name: "Polo", value: 150000 }
  ];

  constructor(private eventService: EventService, private boardService: BoardService) {
    super();
  }

  ngOnInit(): void {
  }

  remove() {
    this.eventService.emitGadgetDeleteEvent({ data: this.instanceId });
  }
  propertyChangeEvent(propertiesJSON: string) {
    //update internal props
    const updatedPropsObject = JSON.parse(propertiesJSON);

    if (updatedPropsObject.title != undefined) {
      this.title = updatedPropsObject.title;
    }
    if (updatedPropsObject.subtitle != undefined) {
      this.subtitle = updatedPropsObject.subtitle;
      console.log.apply(this.subtitle);
    }



    //persist changes
    this.boardService.savePropertyPageConfigurationToDestination(
      propertiesJSON,
      this.instanceId
    );
  }

}
