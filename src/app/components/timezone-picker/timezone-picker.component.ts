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
import * as moment from "moment-timezone";

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
  @Output() output = new EventEmitter<any>();
  @ViewChild("timeZoneContainer", { read: ElementRef }) tref!: ElementRef;

  public timezones: string[] = [];
  public filteredTimeZones: string[] = [];
  public search = "";
  public selectedTimeZone = "";
  public currentTime = "";
  public displayTZ = false;

  constructor() {}

  ngOnInit() {
    if (!this.dateTimeFormat) this.dateTimeFormat = "DD/MM/YYYY";
    if (!this.dropdownColor) this.dropdownColor = "#fffacd";
  }

  ngAfterViewInit() {
    this.getDefaultValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dateTimeFormat) {
      const change = changes.dateTimeFormat;
      if (!change.isFirstChange()) {
        this.returnTime(this.selectedTimeZone, change.currentValue);
      }
    }
  }

  getDefaultValues() {
    this.timezones = moment.tz.names();
    this.filteredTimeZones = this.timezones;
  }

  updateList(search: string) {
    if (search === "") {
      this.selectedTimeZone = "";
      this.currentTime = "";
      this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
    }
    this.filteredTimeZones = this.timezones.filter((timezone: string) =>
      timezone.toLowerCase().includes(search.toLowerCase())
    );
  }

  displayTime(timezone: string) {
    this.selectedTimeZone = timezone;
    this.search = timezone;
    this.displayTZ = false;
    this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
  }

  displayTimeZones() {
    this.displayTZ =
      this.filteredTimeZones.length > 0 &&
      (this.search.length >= 0 || this.search !== this.selectedTimeZone);
  }

  returnTime(selectedTimeZone: string, dateTimeFormat?: string) {
    if (selectedTimeZone !== "") {
      this.currentTime = moment.tz(selectedTimeZone).format(dateTimeFormat);
    }
    this.output.emit({ selectedTimeZone, currentTime: this.currentTime });
  }

  closeDropDown() {
    this.displayTZ = false;
  }

  @HostListener("document:click", ["$event", "$event.target"])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) return;
    const clickedInside = this.tref.nativeElement.contains(targetElement);
    if (!clickedInside) this.closeDropDown();
  }
}
