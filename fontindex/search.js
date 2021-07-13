/*
  TODO: customizable sample text
  TODO: font size slider with snapping for bitmap fonts
  TODO: show bold + italics
  TODO: font list in separate file
  TODO: add links to homepages
  TODO: images for prohibitively licensed fonts
  TODO: add feature for open licensed fonts and permissive fonts
  TODO: add ligature radio buttons
  TODO: serif feature
  TODO: nerd fonts feature

  TODO: fonts
  - SF family
  - droid sans
  - terminus
  - spleen
  - iosevka
  - victor mono
  - sarasa mono
  - cascadia code
*/

// features should appear in this order in the font array
const feature_types = ['monospace', 'bitmap', 'cjk', 'bold', 'italic', 'icons'];

const fonts = [
  // TODO: group by monospace/bitmap then sort alphabetically in this file to make it easier to manage
  {
    name: 'Cozette',
    scaling: '9pt',
    fontface: new FontFace('Cozette', 'url(fonts/CozetteVector.ttf)'),
    features: ['monospace', 'bitmap', 'icons']
  },
  /*{
    // TODO: show all sizes of terminus font
    name: 'Terminus',
    fontface: new FontFace('Terminus', 'url(fonts/CozetteVector.ttf)'),
    features: ['monospace', 'bitmap', 'bold']
  },*/
  {
    name: 'Go Mono',
    fontface: new FontFace('Go Mono', 'url(fonts/Go-Mono.ttf)'),
    features: ['monospace', 'bold', 'italic']
  },
  {
    name: 'IBM Plex Mono',
    fontface: new FontFace('IBM Plex Mono', 'url(fonts/IBMPlexMono-Regular.ttf)'),
    features: ['monospace', 'bold', 'italic']
  },
  {
    name: 'Fira Code',
    fontface: new FontFace('Fira Code', 'url(fonts/FiraCode-Regular.woff2)'),
    features: ['monospace', 'bold', 'italic', 'ligatures']
  },
  {
    name: 'JetBrains Mono',
    fontface: new FontFace('JetBrains Mono', 'url(fonts/JetBrainsMono-Regular.woff2)'),
    features: ['monospace', 'bold', 'italic', 'ligatures']
  },
  {
    // TODO: mushchlo patched azukifont
    name: 'AzukiFont Mono',
    url: 'http://azukifont.com/font/azuki.html',
    fontface: new FontFace('AzukiFont Mono', 'url(fonts/azukimono.ttf)'),
    features: ['monospace', 'bold', 'italic', 'cjk']
  },
  {
    name: 'AzukiFont',
    url: 'http://azukifont.com/font/azuki.html',
    fontface: new FontFace('AzukiFont', 'url(fonts/azuki.ttf)'),
    features: ['bold', 'italic', 'cjk']
  },
  {
    name: 'QuailFont',
    notes: 'also known as uzurafont',
    url: 'http://azukifont.com/font/uzura.html',
    fontface: new FontFace('QuailFont', 'url(fonts/quail.ttf)'),
    features: ['monospace', 'bold', 'italic', 'cjk']
  }
]

function update() {
  let formdata = {};
  let query = document.querySelector('#search').value; 

  for (const field of feature_types) {
    formdata[field] = document.querySelector(`input[name="${field}"]:checked`).value;
  }

  display_results(fonts.filter(
    font => {
      if (!font.name.toLowerCase().includes(query.toLowerCase())) return false;
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
        <p class="specimen" style="font-family: '${font.name}'; font-size: 18pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>`
  }

  document.querySelector("#results").innerHTML = html;
}

window.addEventListener('load', () => {
  // TODO: loading spinner while downloading fonts
  // TODO: handle promise
  fonts.forEach(font => font.fontface.load().then(face => document.fonts.add(face)));

  document.querySelectorAll('input[type=radio]').forEach(elem => elem.addEventListener('change', update));
  document.querySelector('#search').addEventListener('input', update);
  update();
});
