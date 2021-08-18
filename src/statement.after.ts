
import { Invoice, Plays, Performance, Play } from './types';
import createStatementData from './createStatementData';
export default function statement(invoice: Invoice, plays: Plays): string {
  const statementData: Invoice = createStatementData(invoice, plays);
  
  return renderPlainText(statementData, plays);

  function renderPlainText(data: Invoice, plays: Plays) {
    let result = `청구내역 (고객명: ${data.customer})\n`;
    for (let perf of data.performances) {
      result += `${perf.play.name} : ${usd(perf.amount)} (${
        perf.audience
      }석)\n`;
    }
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
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
