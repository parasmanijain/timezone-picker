import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimezonePickerComponent } from './timezone-picker.component';
import * as moment from 'moment-timezone';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('TimezonePickerComponent', () => {
  let component: TimezonePickerComponent;
  let fixture: ComponentFixture<TimezonePickerComponent>;
  let timeZoneSearchTextboxEl;
  let output;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezonePickerComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezonePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    timeZoneSearchTextboxEl =  fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Intializing the datetimeformat to blank and chekcing the intial values of search and selected timezone', () => {
    component.dateTimeFormat = '';
    fixture.detectChanges();
    expect(component.search).toBe('');
    expect(timeZoneSearchTextboxEl.nativeElement.value).toEqual('');
    expect(component.selectedTimeZone).toBe('');
  });

  it('changing the dateTimeFormat to "YYYY-MM-DDTHH:mm:ss.SSS" and timezone to "Africa/Cairo"', () => {
    component.dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
    timeZoneSearchTextboxEl.nativeElement.value = 'Africa/Cairo';
    timeZoneSearchTextboxEl.nativeElement.dispatchEvent(new Event('input'));
    component.output.subscribe((value) => {
      output = value;
      expect(output.selectedTimeZone).toBe('Africa/Cairo');
      expect(output.currentTime).toBe(moment.tz(output.selectedTimeZone).format(timeZoneSearchTextboxEl.nativeElement.value));
    });
    expect(component.search).toBe('Africa/Cairo');
  });
});
