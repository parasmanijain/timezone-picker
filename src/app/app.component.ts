import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TimezonePickerComponent } from "./components/timezone-picker/timezone-picker.component";
import { CommonModule } from "@angular/common";

// ES6+ Interface definitions for better type safety
interface DateFormat {
  readonly text: string;
  readonly value: string;
}

interface ColorOption {
  readonly text: string;
  readonly value: string;
}

interface TimeZoneEvent {
  readonly selectedTimeZone: string;
  readonly currentTime: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, TimezonePickerComponent],
})
export class AppComponent {
  public dateTimeFormat = "";
  public selectedDateFormat = "";
  public selectedTimeZone = "";
  public selectedDropdownColor = "";
  public currentTime = "";

  // ES6+ const with readonly arrays and object property shorthand
  public readonly dateFormats: readonly DateFormat[] = [
    {
      text: "dddd, MMMM Do YYYY, h:mm:ss a",
      value: "dddd, MMMM Do YYYY, h:mm:ss a",
    },
    { text: "YYYY-MM-DDTHH:mm", value: "YYYY-MM-DDTHH:mm" },
    { text: "YYYY-MM-DDTHH:mm:ss.SSS", value: "YYYY-MM-DDTHH:mm:ss.SSS" },
    { text: "ddd, hA", value: "ddd, hA" },
    { text: "YYYY MM DD", value: "YYYY MM DD" },
  ] as const;

  public readonly dropdownColors: readonly ColorOption[] = [
    { text: "#cccccc", value: "#cccccc" },
    { text: "#fcc750", value: "#fcc750" },
    { text: "#cafff7", value: "#cafff7" },
    { text: "#fff9e7", value: "#fff9e7" },
    { text: "#f6effb", value: "#f6effb" },
  ] as const;

  // ES6+ Arrow function with destructuring assignment
  public readonly retrieveCurrentTime = ({
    selectedTimeZone,
    currentTime,
  }: TimeZoneEvent): void => {
    this.selectedTimeZone = selectedTimeZone;
    this.currentTime = currentTime;
  };
}
