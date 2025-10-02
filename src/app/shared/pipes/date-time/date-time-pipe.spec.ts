import { DateTimePipe } from './date-time-pipe';

describe('DateTimePipe', () => {
  let pipe: DateTimePipe;
  
  beforeEach(() => {
    pipe = new DateTimePipe();
  });

  it('create an instance', () => {
    const pipe = new DateTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null or empty input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });
  it('should return "Invalid date" for invalid date string', () => {
    expect(pipe.transform('not-a-date')).toBe('Invalid date');
    expect(pipe.transform('2025-13-99')).toBe('Invalid date');
  });
  it('should format valid date string correctly', () => {
    const input = '2025-10-01T08:30:00Z'; // UTC time
    const result = pipe.transform(input);
    // 15:30 01/10/2025
    expect(result).toBe('15:30 01/10/2025');
  });

});
