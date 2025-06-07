import fs from 'fs';
import path from 'path';

const baseDomain = 'https://gatorkeys.xyz';
const iframeBase = 'https://9da3c976-31ce-4c46-9e96-d389c3f8f1ff-00-3ugdmj2wcz2fn.sisko.replit.dev';

// List your paths here — root is '/', others no leading slash needed
const paths = [
  '/',
  'page1',
  'page2/subpage',
  // add more paths as needed
];

function generateHTML(urlPath) {
  const fullUrl = urlPath === '/' ? baseDomain + '/' : baseDomain + '/' + urlPath;
  const iframeSrc = iframeBase + (urlPath === '/' ? '/' : '/' + urlPath);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>discord.gg/phans${urlPath === '/' ? '' : ' - ' + urlPath}</title>
  <meta property="og:title" content="Hi${urlPath === '/' ? '' : ' - ' + urlPath}" />
  <meta property="og:description" content="Check out phans.bio embedded in this page${urlPath === '/' ? '' : ' ' + urlPath}." />
  <meta property="og:image" content="https://images.miona.bot/image/331cc61f-f989-45d1-a233-5267e58ec40a.png" />
  <meta property="og:url" content="${fullUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html, body {
      margin: 0; padding: 0; height: 100%;
    }
    iframe {
      width: 100%; height: 100%; border: none;
    }
  </style>
</head>
<body>
  <iframe id="embed" src="${iframeSrc}"></iframe>
</body>
</html>`;
}

// Ensure output directory exists
const outDir = path.resolve('./out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate files
paths.forEach(p => {
  // filename rules:
  // root '/' → index.html
  // others: path with slashes become folders + index.html inside them
  if (p === '/') {
    fs.writeFileSync(path.join(outDir, 'index.html'), generateHTML(p));
  } else {
    const fullDir = path.join(outDir, p);
    fs.mkdirSync(fullDir, { recursive: true });
    fs.writeFileSync(path.join(fullDir, 'index.html'), generateHTML(p));
  }
});

console.log('Static HTML files generated in ./out folder.');
