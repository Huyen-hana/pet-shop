import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  const USER_KEY = 'currentUser';
  const mockUser = { userName: 'testName', avatar: 'avatar.png', role: 'admin' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set curent user', () => {
    const expectedUser = { userName: 'testName', avatar: 'testAva.jpg', role: 'customer' };
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.setCurrentUser(expectedUser.userName, expectedUser.avatar, expectedUser.role);
    expect(setItemSpy).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(expectedUser));  
  });

  it('should get current user correctly when valid data exists', () => {
    const myMockUser = { userName: 'testName', avatar: 'avatar.png' };
    localStorage.setItem(USER_KEY, JSON.stringify(myMockUser));
  
    const result = service.getCurrentUser();
    expect(result).toEqual({
      userName: 'testName',
      avatar: 'avatar.png'  
    });  
  });
  it('should return null when no user is stored', () => {
    const result = service.getCurrentUser();
    expect(result).toBeNull();
  });
  it('should return null and log error when JSON.parse throws', () => {
    const invalidJSON = 'invalid-json';
    localStorage.setItem(service['USER_KEY'], invalidJSON);
  
    const originalConsoleError = console.error;
    let errorMessage = '';
  
    console.error = (msg: string, detail?: string) => {
      errorMessage = `${msg} ${detail ?? ''}`;
    };
  
    const result = service.getCurrentUser();
  
    expect(result).toBeNull();
    expect(errorMessage).toContain('Lỗi khi đọc thông tin người dùng');
  
    console.error = originalConsoleError;
  });
  
  it('should return correct userName', (done) => {
    service['currentUserSubject'].next(mockUser);
    service.getUserName().subscribe(value => {
      expect(value).toBe('testName');
      done();
    });
  });
  it('should return null when user is null', (done) => {
    service['currentUserSubject'].next(null);
    service.getUserName().subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should return correct avatar when user exists', (done) => {
    service['currentUserSubject'].next(mockUser);
    service.getAvatar().subscribe(value => {
      expect(value).toBe('avatar.png');
      done();
    });
  });
  it('should return null when user is null', (done) => {
    service['currentUserSubject'].next(null);
    service.getAvatar().subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should return correct role when user exists', (done) => {
    service['currentUserSubject'].next(mockUser);
    service.getRole().subscribe(value => {
      expect(value).toBe('admin');
      done();
    });
  });
  it('should return null when user is null', (done) => {
    service['currentUserSubject'].next(null);
    service.getRole().subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });

  it('should load user from localStorage and update currentUserSubject', (done) => {
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    service.loadUserFromLocalStorage();

    service.getUserName().subscribe(value => {
      expect(value).toBe('testName');
      done();
    });
  });
  it('should not update currentUserSubject when localStorage is empty', (done) => {
    service.loadUserFromLocalStorage();
    service.getUserName().subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });
  it('should handle invalid JSON and not update currentUserSubject', (done) => {
    localStorage.setItem(USER_KEY, 'invalid-json');
    const originalConsoleError = console.error;
    let errorLogged = false;

    console.error = () => {
      errorLogged = true;
    };

    service.loadUserFromLocalStorage();

    service.getUserName().subscribe(value => {
      expect(value).toBeNull();
      expect(errorLogged).toBeTrue();
      console.error = originalConsoleError;
      done();
    });
  });

  it('should set isLoggedIn to false when login is called', (done) => {
    service.login();
    service.isLoggedIn$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });
  it('should remove user from localStorage and set isLoggedIn to true when logOut is called', (done) => {
    localStorage.setItem(USER_KEY, JSON.stringify({ userName: 'testName' }));
    service.logOut();

    expect(localStorage.getItem(USER_KEY)).toBeNull();

    service.isLoggedIn$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
});
