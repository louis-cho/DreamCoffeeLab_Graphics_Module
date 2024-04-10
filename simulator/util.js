import * as THREE from "three";

// 주어진 범위에서 랜덤 정수 생성
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// n ~ n+1 범위에서 랜덤 실수 생성
export function getRandomFloat(n) {
  return Math.random() + n; // Math.random()은 0 이상 1 미만의 값을 반환하므로 n을 더하여 n 이상 n+1 미만의 값을 반환합니다.
}

export function getRandomWithRatio3(ratio1, ratio2, ratio3) {
  // 0에서 1 사이의 랜덤한 값 생성
  const randomValue = Math.random();

  // 생성된 랜덤한 값에 따라 0, 1, 2를 반환
  if (randomValue < ratio1) {
    return 0;
  } else if (ratio1 <= randomValue && randomValue < ratio1 + ratio2) {
    return 1;
  } else if (
    ratio1 + ratio2 <= randomValue &&
    randomValue < ratio1 + ratio2 + ratio3
  ) {
    return 2;
  }
}

export function getRandomNumbers(maxNum, cntToPick) {
  if (maxNum < cntToPick) {
    throw new Error("maxNum는 cntToPick보다 같거나 커야 합니다.");
  }

  // 1부터 maxNum까지의 수를 배열에 저장
  const availableNumbers = Array.from(
    { length: maxNum },
    (_, index) => index + 1
  );

  // 배열을 섞기 위해 Fisher-Yates 알고리즘 사용
  for (let i = availableNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableNumbers[i], availableNumbers[j]] = [
      availableNumbers[j],
      availableNumbers[i],
    ];
  }

  // 처음부터 cntToPick 개의 수를 잘라내서 반환
  return availableNumbers.slice(0, cntToPick);
}

export function getNormalizedDeviceCoordinates(domElement, clientX, clientY) {
  const rect = domElement.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;
  return { x, y };
}

export function findRootParent(object) {
  while (object !== null && !(object.parent instanceof THREE.Scene)) {
    object = object.parent;
  }
  return object;
}

export function flattenArray(arr) {
  return arr.reduce(function (flat, toFlatten) {
    if (toFlatten === null) return flat; // null 값이면 무시
    return flat.concat(
      Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
    );
  }, []);
}
