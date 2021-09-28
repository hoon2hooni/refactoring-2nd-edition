{/**
 * 리팩토링 전
 */
 function printOwing(invoice) {
  printBanner();

  let outstanding = calculatorOutstanding();

  // 세부 사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}


function printOwing(invoice) {
  printBanner();

  let outstanding = calculatorOutstanding();

  // 세부 사항 출력
  function printDetails(outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
  }
}}
