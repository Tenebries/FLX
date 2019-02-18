let a = parseInt(prompt(`Input value A:`));
let b = parseInt(prompt(`Input value B:`));
let c = parseInt(prompt(`Input value C:`));
if (a === 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
    alert(`Invalid input data!`);
}

let discriminant = Math.pow(b, 2) - 4 * a * c;
if (discriminant > 0) {
    let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    alert(`x1 = ${x1} and x2 = ${x2}`);
} else if (discriminant === 0) {
    let discriminantX = -b / (2 * a);
    alert(`x = ${discriminantX}`);
} else if (discriminant < 0) {
    alert(`no solution`);
}
