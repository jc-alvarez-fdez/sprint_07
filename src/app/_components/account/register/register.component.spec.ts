import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountService: jasmine.SpyObj<AccountService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home if user is already logged in', () => {
    spyOn(accountService.user, 'pipe').and.returnValue(of({})); // Mock user being logged in
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should register successfully', () => {
    const mockRegisterFormValue = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password' };
    accountService.register.and.returnValue(of({ /* objeto User válido */ }));

    component.form.patchValue(mockRegisterFormValue);
    component.onSubmit();

    expect(accountService.register).toHaveBeenCalledWith(mockRegisterFormValue);
    expect(router.navigate).toHaveBeenCalledWith(['/account/login'], { queryParams: { registered: true } });
  });

  it('should handle registration error', () => {
    const mockError = 'Registration failed';
    accountService.register.and.returnValue(throwError(mockError));

    component.onSubmit();

    expect(accountService.register).toHaveBeenCalled();
    expect(component.error).toEqual(mockError);
    expect(component.loading).toBeFalse();
  });
});
