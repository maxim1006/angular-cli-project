import {Component, HostBinding} from "@angular/core";


@Component({
    selector: "a-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.less"]
})
export class AppComponent {

    @HostBinding("class")
    private hostClass = "app-component";

    constructor() {
    }
}
