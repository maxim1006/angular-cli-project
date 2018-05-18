import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "a-home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.less"]
})
export class HomeComponent {

    @HostBinding("class")
    private hostClass = "a-home";

}