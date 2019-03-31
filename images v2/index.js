const builder = require('xmlbuilder');
const fs = require('fs');
const { images } = require('./new.json');

images.map(async (d, i) => {
  let annotation = builder.create('annotation');
  annotation.ele('folder', 'images');
  annotation.ele('filename', d['filename']);
  annotation.ele('path', '../');
  annotation.ele('segmented', '0');
  let source = annotation.ele('source');
  source.ele('database', 'Unknown');
  let size = annotation.ele('size');
  size.ele('width', d.annotation[0].imageWidth);
  size.ele('height', d.annotation[0].imageHeight);
  size.ele('depth', 3);
  let object = annotation.ele('object');
  object.ele('name', 'plate');
  object.ele('pose', 'Unspecified');
  object.ele('truncated', '0');
  object.ele('difficult', '0');
  let bndbox = object.ele('bndbox');
  bndbox.ele(
    'xmin',
    parseInt(
      parseFloat(d.annotation[0].points[0].x) *
        parseFloat(d.annotation[0].imageWidth)
    )
  );
  bndbox.ele(
    'ymin',
    parseInt(
      parseFloat(d.annotation[0].points[0].y) *
        parseFloat(d.annotation[0].imageHeight)
    )
  );
  bndbox.ele(
    'xmax',
    parseInt(
      parseFloat(d.annotation[0].points[1].x) *
        parseFloat(d.annotation[0].imageWidth)
    )
  );
  bndbox.ele(
    'ymax',
    parseInt(
      parseFloat(d.annotation[0].points[1].y) *
        parseFloat(d.annotation[0].imageHeight)
    )
  );
  let ws = fs.createWriteStream(`./annotations/${i}.xml`);
  ws.write(annotation.end({ pretty: true }), 'utf-8');
  ws.end();
});
