export const loadLocal = (name, def) => {
  let value = localStorage.getItem(name) || def;
  value = JSON.parse(value);
  return value;
};

export const saveLocal = (name, def) => {
  def = JSON.stringify(def);
  localStorage.setItem(name, def);
};
