const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const elName   = document.getElementById("creature-name");
const elId     = document.getElementById("creature-id");
const elWeight = document.getElementById("weight");
const elHeight = document.getElementById("height");
const elTypes  = document.getElementById("types");

const elHP     = document.getElementById("hp");
const elAtk    = document.getElementById("attack");
const elDef    = document.getElementById("defense");
const elSpAtk  = document.getElementById("special-attack");
const elSpDef  = document.getElementById("special-defense");
const elSpeed  = document.getElementById("speed");


function getStat(creature, wanted) {
  const stats = creature?.stats || [];
  const target = stats.find(s => {
    const n = (s?.stat?.name || s?.name || "").toLowerCase().replace(/\s+/g, "-");
    return n === wanted;
  });
  return target?.base_stat ?? target?.value ?? "";
}

function getTypes(creature) {
  const types = creature?.types || [];
  return types.map(t => (t?.type?.name || t?.name || t || "").toString().toUpperCase())
              .filter(Boolean);
}
function render(creature) {
  elName.textContent = (creature.name || "").toUpperCase();
  elId.textContent = `#${creature.id}`;

  elWeight.textContent = `Weight: ${creature.weight}`;
  elHeight.textContent = `Height: ${creature.height}`;

  elTypes.innerHTML = "";
  for (const t of getTypes(creature)) {
    const pill = document.createElement("span");
    pill.className = "type-pill";
    pill.textContent = t;
    elTypes.appendChild(pill);
  }

  elHP.textContent    = getStat(creature, "hp");
  elAtk.textContent   = getStat(creature, "attack");
  elDef.textContent   = getStat(creature, "defense");
  elSpAtk.textContent = getStat(creature, "special-attack");
  elSpDef.textContent = getStat(creature, "special-defense");
  elSpeed.textContent = getStat(creature, "speed");
}

async function fetchCreature(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const url = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Creature not found");
    const data = await res.json();
    render(data);
  } catch (err) {
    alert("Creature not found");
  }
}

searchButton.addEventListener("click", () => {
  fetchCreature(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchCreature(searchInput.value);
  }
});
