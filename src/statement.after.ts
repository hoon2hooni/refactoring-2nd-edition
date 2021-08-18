import { stat } from 'fs';
import { Invoice, Plays, Performance, Play } from './types';

export default function statement(invoice: Invoice, plays: Plays) {
  const statementData: Invoice = { ...invoice };
  statementData['customer'] = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  function totalAmount(data: Invoice) {
    return data.performances
      .reduce((total, p) => total + p.amount, 0)
  }
  
  function totalVolumeCredits(data: Invoice) {
    return data.performances
      .reduce((total, p) => total + p.volumeCredits, 0)
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
  function amountFor(aPerformance: Performance) {
    //초기화 해주기
    let result = 0;
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`);
    }
    return result;
  }
  function volumeCreditsFor(aPerformance: Performance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function enrichPerformance(aPerformance: Performance) {
    //Object.assign({}, aPerformance)
    const result = { ...aPerformance };
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

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
