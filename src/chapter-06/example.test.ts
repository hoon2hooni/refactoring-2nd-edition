


const RECEIPT = `청구내역 (고객명: BigCo)
  hamlet : $650.00 (55석)
  As You Like It : $580.00 (35석)
  Othello : $500.00 (40석)
  총액: $1,730.00
  적립 포인트: 47점`;

const HTML = `<h1>청구내역(고객명:BigCo)</h1><table><tr><th>연극</th><th>좌석수</th><th>금액</th></tr><tr><td>hamlet</tr></td>(55석)<tr><td>$650.00</tr></td><tr><td>AsYouLikeIt</tr></td>(35석)<tr><td>$580.00</tr></td><tr><td>Othello</tr></td>(40석)<tr><td>$500.00</tr></td><p>총액:<em>$1,730.00</em></p><p>적립포인트:<em>47</em>점</p>`;

describe("비디오 대여점에서 영수증을 출력하는 프로그램", () => {
  const [invoice] = JSON.parse(JSON.stringify(invoicesData));
  const plays = JSON.parse(JSON.stringify(playsData));

  it("첫 번째 예시", () => {
    expect(beforeStatement(invoice, plays).replace(/\s/g, "")).toMatch(
      RECEIPT.replace(/\s/g, "")
    );
  });

  it("첫 번째 예시 - 리팩토링 (Plain Text)", () => {
    expect(afterStatement(invoice, plays).replace(/\s/g, "")).toMatch(
      HTML.replace(/\s/g, "")
    );
  });

  // it('첫 번째 예시 - 리팩토링 (HTML)', () => {
  //   const htmlStateDom = htmlStatement(invoice, plays);

  //   expect(htmlStateDom.replace(/\s/g, '')).toMatch(
  //     RECEIPT_DOM_STRING.replace(/\s/g, ''),
  //   );
  // });
});
