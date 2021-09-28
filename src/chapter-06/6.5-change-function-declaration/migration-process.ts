/**
 * 함수 이름 바꾸기 (간단한 절차)
 */
function circle(radius) {
  return 2 * Math.PI * radius;
}

/**
 *
 * @param 리펙 과정
 *
 * @returns
 */

function circle(radius) {
  return circumference(radius);
}

function circumference(radius) {
  return 2 * Math.PI * radius;
}
