import { PkrCurrencyPipe } from './pkr-currency.pipe';
import { CurrencyPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

describe('PkrCurrencyPipe', () => {
  let pipe: PkrCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe]
    });
    pipe = new PkrCurrencyPipe(TestBed.inject(CurrencyPipe));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a number to PKR currency format', () => {
    const value = 1234.56;
    expect(pipe.transform(value)).toBe('PKR 1,234.56');
  });
});
