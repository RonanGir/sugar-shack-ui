import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChangeQuantityComponent} from '@app/shared/components/change-quantity/change-quantity.component';


describe('ChangeQuantityComponent', () => {
  let component: ChangeQuantityComponent;
  let fixture: ComponentFixture<ChangeQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ChangeQuantityComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChangeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
