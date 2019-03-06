import { Component, OnInit, Input, Output, EventEmitter, OnChanges,  SimpleChanges,
 ChangeDetectionStrategy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-timezone-picker',
  templateUrl: './timezone-picker.component.html',
  styleUrls: ['./timezone-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimezonePickerComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() dateTimeFormat;
  @Input() dropdownColor;
  @Output() output: any = new EventEmitter();
  @ViewChild('timeZoneContainer', {read: ElementRef}) tref: ElementRef;

  public timezones: any;
  public filteredTimeZones = '';
  public search = '';
  public selectedTimeZone = '';
  public currentTime = '';
  public displayTZ = false;
  constructor() {
  }

  ngOnInit() {
    if (!this.dateTimeFormat) {
      this.dateTimeFormat = 'DD/MM/YYYY';
    }
  if (!this.dropdownColor) {
      this.dropdownColor = '#fffacd';
    }
  }

  ngAfterViewInit() {
    this.getDefaultValues();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.dateTimeFormat !== 'undefined') {
        const dateTimeFormatChange = changes['dateTimeFormat'];
        if (!dateTimeFormatChange.isFirstChange()) {
          this.returnTime(this.selectedTimeZone, dateTimeFormatChange.currentValue);
        }
    }
  }

  getDefaultValues() {
    this.timezones = moment.tz.names();
    this.filteredTimeZones = this.timezones;
  }

  updateList(search) {
    if (search === '') {
        this.selectedTimeZone = '';
        this.currentTime = '';
        this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
    }
    this.filteredTimeZones = this.timezones.filter((timezone) => {
      return (timezone.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    });
  }

  timezoneByName(index, timezone) {
    return timezone;
  }

  displayTime(timezone) {
    this.selectedTimeZone = timezone;
    this.search = this.selectedTimeZone;
    this.displayTZ = false;
    this.returnTime(this.selectedTimeZone, this.dateTimeFormat);
  }

  displayTimeZones() {
    if (this.filteredTimeZones.length > 0 && (this.search.length >= 0 || this.search !== this.selectedTimeZone)) {
      this.displayTZ = true;
    } else {
      this.displayTZ = false;
    }
  }

  returnTime(selectedTimeZone, dateTimeFormat) {
    if (selectedTimeZone !== '') {
      this.currentTime = moment.tz(selectedTimeZone).format(dateTimeFormat);
    }
    this.output.emit({ selectedTimeZone: selectedTimeZone, currentTime: this.currentTime});
  }

  closeDropDown() {
    this.displayTZ = false;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
      if (!targetElement) {
          return;
      }
      const clickedInside = this.tref.nativeElement.contains(targetElement);
      if (!clickedInside) {
           this.closeDropDown();
      }
  }
}
