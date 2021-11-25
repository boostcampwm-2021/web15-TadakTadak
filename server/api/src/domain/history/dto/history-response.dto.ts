export class HistoryResponseDto {
  readonly 1: number = 0;
  readonly 2: number = 0;
  readonly 3: number = 0;
  readonly 4: number = 0;
  readonly 5: number = 0;
  readonly 6: number = 0;
  readonly 7: number = 0;
  readonly 8: number = 0;
  readonly 9: number = 0;
  readonly 10: number = 0;
  readonly 11: number = 0;
  readonly 12: number = 0;

  constructor(counting) {
    counting.forEach((e) => {
      this[e.month] = e.count;
    });
  }
}
