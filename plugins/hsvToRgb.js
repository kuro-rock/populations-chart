export default ({ app }, inject) => {
  inject('hsvToRgb', (H, S, V) => {
    const C = V * S
    const Hp = H / 60
    const X = C * (1 - Math.abs((Hp % 2) - 1))
    const m = V - C

    let R, G, B
    if (Hp >= 0 && Hp <= 1) {
      ;[R, G, B] = [C, X, 0]
    }
    if (Hp >= 1 && Hp <= 2) {
      ;[R, G, B] = [X, C, 0]
    }
    if (Hp >= 2 && Hp <= 3) {
      ;[R, G, B] = [0, C, X]
    }
    if (Hp >= 3 && Hp <= 4) {
      ;[R, G, B] = [0, X, C]
    }
    if (Hp >= 4 && Hp <= 5) {
      ;[R, G, B] = [X, 0, C]
    }
    if (Hp >= 5 && Hp <= 6) {
      ;[R, G, B] = [C, 0, X]
    }

    ;[R, G, B] = [R + m, G + m, B + m]

    R = Math.floor(R * 255)
    G = Math.floor(G * 255)
    B = Math.floor(B * 255)

    return [R, G, B]
  })
}
