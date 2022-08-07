enum armorType {
  unarmored, light, medium, heavy, fortified, hero, divine
};
enum attackType {
  normal, piercing, magic, siege, chaos, hero
};
const creatures = [
  ["ghoul", 13, 340, 0, armorType.heavy, attackType.normal, 1.3],
  ["footman", 12.5, 420, 2, armorType.heavy, attackType.normal, 1.35],
];

const creatureSelected = (other: HTMLSelectElement) => (e:Event) => {
  div.textContent = (e.target as HTMLSelectElement).value;
};

const sel = document.createElement('select') as HTMLSelectElement;
creatures.forEach(([name, ...fields]) => {

  const opt = document.createElement('option');
  opt.textContent = (name as string);
  sel.appendChild(opt);

});

const div = document.createElement('div');

window.onload = () => {
  const rightSel = sel.cloneNode(true) as HTMLSelectElement;

  sel.addEventListener('change', creatureSelected(rightSel));
  rightSel.addEventListener('change', creatureSelected(sel));

  document.body.appendChild(sel);
  document.body.appendChild(rightSel);
  document.body.appendChild(div);
};
