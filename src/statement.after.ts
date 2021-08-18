import { Invoice, Plays, Performance, Play } from './types';
import createStatementData from './createStatementData';

export default function statement(invoice: Invoice, plays: Plays): string {
  const statementData: Invoice = createStatementData(invoice, plays);

  return renderHtml(statementData);

  function renderHtml(data: Invoice) {
    let result = `<h1>청구내역 (고객명: ${data.customer})</h1>\n`;
    result += `<table>\n`;
    result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>`;
    for (let perf of data.performances) {
      result += ` <tr><td>${perf.play.name}</tr></td>(${perf.audience}석)`;
      result += `<tr><td>${usd(perf.amount)}</tr></td>\n`;
    }
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
    return result;
  }

  // 중첩함수 시작

  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  //page 41쪽
}
