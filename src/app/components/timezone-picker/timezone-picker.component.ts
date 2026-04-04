import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

// Timezone list - using Intl.supportedValuesOf for modern browsers
const getTimeZones = (): string[] => {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    // Fallback for older browsers
    return [
      "UTC",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Asia/Kolkata",
      "Australia/Sydney",
      // Add more timezones as needed
    ];
  }
};

// ES6+ Interface definitions
interface TimeZoneOutput {
  readonly selectedTimeZone: string;
  readonly currentTime: string;
}

@Component({
  selector: "app-timezone-picker",
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: "./timezone-picker.component.html",
  styleUrls: ["./timezone-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimezonePickerComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() dateTimeFormat!: string;
  @Input() dropdownColor!: string;
  @Output() output = new EventEmitter<TimeZoneOutput>();
  @ViewChild("timeZoneContainer", { read: ElementRef }) tref!: ElementRef;

  public timezones: readonly string[] = [];
  public filteredTimeZones: string[] = [];
  public search = "";
  public selectedTimeZone = "";
  public currentTime = "";
  public displayTZ = false;

  // ES6+ Default parameter values instead of constructor logic
  ngOnInit(): void {
    this.dateTimeFormat = this.dateTimeFormat || "dd/MM/yyyy";
    this.dropdownColor = this.dropdownColor || "#fffacd";
  }

  ngAfterViewInit(): void {
    this.getDefaultValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ES6+ Destructuring and optional chaining
    const { dateTimeFormat } = changes;
    if (dateTimeFormat && !dateTimeFormat.isFirstChange()) {
      this.returnTime(this.selectedTimeZone, dateTimeFormat.currentValue);
    }
  }

  // ES6+ Arrow function for method
  private readonly getDefaultValues = (): void => {
    this.timezones = getTimeZones();

    this.filteredTimeZones = [...this.timezones]; // ES6+ Spread operator for array copying
  };

  // ES6+ Arrow function with early return pattern
  public readonly updateList = (search: string): void => {
    if (search === "") {
      this.selectedTimeZone = "";
      this.currentTime = "";
      this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
    }

    // ES6+ Arrow function in filter with implicit return
    this.filteredTimeZones = this.timezones.filter((timezone) =>
      timezone.toLowerCase().includes(search.toLowerCase()),
    );
  };

  // ES6+ Arrow function with object assignment
  public readonly displayTime = (timezone: string): void => {
    Object.assign(this, {
      selectedTimeZone: timezone,
      search: timezone,
      displayTZ: false,
    });
    this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
  };

  // ES6+ Arrow function with logical operators
  public readonly displayTimeZones = (): void => {
    this.displayTZ =
      this.filteredTimeZones.length > 0 &&
      (this.search.length >= 0 || this.search !== this.selectedTimeZone);
  };

  // ES6+ Arrow function with ternary operator and object shorthand
  public readonly returnTime = (
    selectedTimeZone: string,
    dateTimeFormat?: string,
  ): void => {
    this.currentTime =
      selectedTimeZone !== ""
        ? formatInTimeZone(
            new Date(),
            selectedTimeZone,
            dateTimeFormat || "dd/MM/yyyy",
          )
        : "";
    // ES6+ Object shorthand property names
    this.output.emit({ selectedTimeZone, currentTime: this.currentTime });
  };

  // ES6+ Arrow function for simple method
  public readonly closeDropDown = (): void => {
    this.displayTZ = false;
  };

  // ES6+ Arrow function with optional chaining and early return
  @HostListener("document:click", ["$event"])
  public readonly onClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    // ES6+ Optional chaining with logical NOT
    const clickedInside = this.tref?.nativeElement?.contains(target);

    if (!clickedInside) this.closeDropDown();
  };
}
