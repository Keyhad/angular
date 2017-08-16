import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './app/shared/star.component.html',
    styleUrls: ['./app/shared/star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth:number;
    @Output() ratingClicked: EventEmitter<string> = 
        new EventEmitter<string>();

    onClick(): void {
        console.log(`StarComponent.onClick ... ${this.rating}`);
        this.ratingClicked.emit(` ... ${this.rating}`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.starWidth = this.rating * (86 / 5.);
    }
}