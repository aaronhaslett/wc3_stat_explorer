enum armorType {
  unarmored,
  light,
  medium,
  heavy,
  fortified,
  hero,
  //divine,
}
enum attackType {
  normal,
  piercing,
  magic,
  siege,
  hero,
  chaos,
  spell,
}

// Table of (armorType, attackType) => attack strength
const attackStrength = [
  [1,1.5,1,1.5,1,1,1],
  [1,2,1.25,1,1,1,1],
  [1.5,0.75,0.75,0.5,1,1,1],
  [1,1,2,1,1,1,1],
  [0.7,0.35,0.35,.5,0.5,1,1],
  [1,0.5,0.5,0.5,1,1,0.7],
]

// name, damage, hp, pop? (food?), armor type, attack type, cooldown
const creatures: Record<string, number[]> = {
  "ghoul": [13, 340, 0, armorType.heavy, attackType.normal, 1.3],
  "footman": [12.5, 420, 2, armorType.heavy, attackType.normal, 1.35],
};

const c = 0.06;

const creatureSelected = (other: HTMLSelectElement, results: Element) => (e: Event) => {
  const name = (e.target as HTMLSelectElement).value;
  const name2 = (other as HTMLSelectElement).value;
  const [dmg, hp, armor, armor_type, attack_type] = creatures[name];
  const [dmg2, hp2, armor2, armor_type2, attack_type2] = creatures[name2];
  const dr = (armor * c)/(1+armor*c);
  const dr2 = (armor2 * c)/(1+armor2*c);
  const atk = attackStrength[armor_type2][attack_type];
  const atk2 = attackStrength[armor_type][attack_type2];
  const s = `name: ${name} dmg: ${dmg} hp: ${hp} dr: ${dr} atk: ${atk}`;
  const s2 = `name: ${name2} dmg: ${dmg2} hp: ${hp2} dr: ${dr2} atk: ${atk2}`;
  results.textContent = s + " " + s2;
};

const sel = document.createElement("select") as HTMLSelectElement;
Object.keys(creatures).forEach((name) => {
  const opt = document.createElement("option");
  opt.textContent = name as string;
  sel.appendChild(opt);
});

const right_sel = sel.cloneNode(true) as HTMLSelectElement;

window.onload = () => {
    const left = document.querySelector(".left");
    left.appendChild(sel);

    const right = document.querySelector(".right");
    right.appendChild(right_sel);

    const result_div = document.querySelector(".result");
    sel.addEventListener("change", creatureSelected(right_sel, result_div));
    right_sel.addEventListener("change", creatureSelected(sel, result_div));
};
