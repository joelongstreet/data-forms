function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function loadExample(settings, context) {
  Object.keys(settings).forEach((settingKey) => {
    const fn = `set${capitalize(settingKey)}`;
    context[fn](settings[settingKey]);
  });
}

export default loadExample;
