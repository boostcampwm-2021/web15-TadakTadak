import { CANVAS } from './constant';

export const isEmail = (email: string): boolean => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const isNickname = (nickname: string): boolean => {
  const regExp = /^(?=[a-zA-Z가-힣])[-a-zA-Z가-힣0-9_.]{2,11}$/;
  return regExp.test(nickname);
};

export const isPassword = (password: string): boolean => {
  const regExp = /^(?=.*\d)(?=[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,20}$/;
  return regExp.test(password);
};

export const adminOptions = new Array(8).fill(0).map((_, i) => ({ value: i + 2, label: i + 2 }));

export const getPrevYear = (now: Date, number: number): Date => {
  const tomorrow = new Date(now.setDate(now.getDate() + 1));
  const prevYear = new Date(tomorrow.setFullYear(tomorrow.getFullYear() - number));
  return prevYear;
};

const dateToString = (date: Date): string => date.toISOString().split('T')[0];

export const getDateListFromStartToLast = (startDate: string, lastDate: string): string[] => {
  const dataList = [];
  const start = new Date(startDate);
  const last = new Date(lastDate);
  while (start <= last) {
    dataList.push(dateToString(start));
    start.setDate(start.getDate() + 1);
  }
  return dataList;
};

export const getGrassDateList = (year: number): string[] => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const currentDate = dateToString(new Date(Date.now() - tzoffset));
  const prevOneYearDate = dateToString(getPrevYear(new Date(), year));
  const grassDateList = getDateListFromStartToLast(prevOneYearDate, currentDate);
  return grassDateList;
};

export const chatTimeFormatting = (time?: string): string => {
  if (time) {
    const timeString = time.match(/\d{2}:\d{2}:\d{2}/);
    return Array.isArray(timeString) ? timeString[0] : '';
  }
  return '';
};

export const getWidths = (width: number): Array<number> => Array.from({ length: 12 }, (_, i) => (width / 12) * i);

export const getHeights = (months: Record<string, number>, maxMonths: number, height: number): Array<number> =>
  Object.values(months).map((cnt) => (cnt / maxMonths) * height * 0.8);

export const drawLineChartYaxis = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.fillStyle = CANVAS.YLine;
  for (let i = 2; i <= 24; i++) {
    ctx.moveTo(width - i * (width / 24) + 40, 0);
    ctx.lineTo(width - i * (width / 24) + 40, height - 30);
    ctx.stroke();
    if (i % 2 === 0) ctx.fillText((13 - i / 2).toString(), width - i * (width / 24) + 40, height);
  }
};

export const drawLineChartXaxis = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  ctx.strokeStyle = CANVAS.XLine;
  ctx.font = '12px Noto Sans KR';
  ctx.textAlign = 'center';
  for (let i = 1; i <= 15; i++) {
    ctx.moveTo(40, height - i * (height / 10) + 10);
    ctx.lineTo(width - 40, height - i * (height / 10) + 8);
    ctx.stroke();
  }
};

export const drawLineChartLines = (
  widths: Array<number>,
  ctx: CanvasRenderingContext2D,
  heights: Array<number>,
  height: number,
): void => {
  let currentX = 40,
    currentY = height - 30;

  widths.forEach(async (w: number, i: number) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    await new Promise((res) => setTimeout(res, 50 * i));
    ctx.moveTo(currentX, currentY);
    ctx.strokeStyle = CANVAS.resultLine;
    ctx.lineTo(w + 40, height - heights[i] - 30);
    ctx.stroke();
    currentX = w + 40;
    currentY = height - heights[i] - 30;
  });
};

export const drawLineChartDots = (
  ctx: CanvasRenderingContext2D,
  widths: Array<number>,
  heights: Array<number>,
  months: Record<string, number>,
  height: number,
): void => {
  ctx.beginPath();
  widths.forEach((w: number, i: number) => {
    ctx.fillStyle = CANVAS.resultLine;
    if (heights[i] > 0) {
      ctx.beginPath();
      ctx.arc(w + 40, height - heights[i] - 30, 6, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = CANVAS.resultLine;
      ctx.fillText(String(months[i + 1]), w + 40, height - heights[i] - 40);
    }
  });
  ctx.stroke();
};
