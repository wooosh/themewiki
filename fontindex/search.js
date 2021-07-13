/*
  TODO: onclick live edit or button to enable live editing
*/

// features should appear in this order in the font array
const feature_types = ['monospace', 'bitmap', 'cjk', 'bold', 'italic', 'icons'];

const fonts = [
  {
    name: 'cozette',
    features: ['monospace', 'bitmap', 'icons']
  },
  {
    name: 'terminus',
    features: ['monospace', 'bitmap', 'bold']
  },
  {
    name: 'go mono',
    features: ['monospace', 'bold', 'italic']
  }
]

function update() {
  let formdata = {};
  
  for (const field of feature_types) {
    formdata[field] = document.querySelector(`input[name="${field}"]:checked`).value;
  }

  display_results(fonts.filter(
    font => {
      for (const feat in formdata) {
        switch (formdata[feat]) {
          case "exclude":
            if (font.features.includes(feat)) return false;
            break;
          case "required":
            if (!font.features.includes(feat)) return false;
            break;
        }
      }
      return true;
    }
  ))
}

function display_results(results) {
  // if (results.length == 0)
  let html = "";
  for (const font of results) {
    html = html + `
      <div id="results">
        <div class="result">
        <h2>${font.name}</h2>
        <div class="badges">
          ${font.features.map(feat => `<span>${feat}</span>`).join("\n")}
        </div>
        <p class="specimen">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p class="specimenbold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p class="specimenitalic">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>`
  }

  document.querySelector("#results").innerHTML = html;
}

window.addEventListener('load', () => {
  document.querySelectorAll('input[type=radio]').forEach(elem => elem.addEventListener('change', update));
  update();
});
