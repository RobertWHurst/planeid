
class Game {

  constructor() {
    this._score        = 0;
    this._currentPlane = null;
    this._planes       = [];
  }

  start() {
    const $plane = $('.plane');
    $plane.hide();

    $.getJSON('/plane', (planes) => {
      this._planes = planes;

      $plane.fadeIn(200);
      
      this._nextPlane();
    });
  }

  resizeImage() {
    const $image    = $('.plane > .image');
    const $img      = $('.plane > .image > img');
    const imageSize = Math.min($image.width(), $image.height());

    $img.width(imageSize);
  }
  
  _nextPlane() {
    const index        = Math.round(Math.random() * (this._planes.length - 1));
    this._currentPlane = this._planes[index];

    this._setFactionButtons();
    this._updateScore();
    this._setPlaneImage();
  }

  _setPlaneImage() {
    const $image = $('.plane > .image');

    const $img = $('<img>')
      .prop('src', this._currentPlane.url)
      .hide()
      .fadeIn(200);
    $image.empty().append($img);

    this.resizeImage();
  }

  _setFactionButtons() {
    const $controls = $('.plane .controls');

    const $german = $('<div>')
      .addClass('btn')
      .text('German')
      .on('mouseup', () => this._checkFaction($german, 'German'));
    const $russian = $('<div>')
      .addClass('btn')
      .text('Russian')
      .on('mouseup', () => this._checkFaction($russian, 'Russian'));

    $controls.empty().append($german, $russian);
  }

  _setModelButtons() {
    const $controls = $('.plane .controls').empty();

    const factionPlanes = this._planes.filter(f => f.faction === this._currentPlane.faction);

    for (const plane of factionPlanes) {
      const $btn = $('<div>')
        .addClass('btn')
        .text(plane.model)
        .on('mouseup', () => this._checkModel($btn, plane.model));

      $controls.append($btn);
    }
  }

  _checkFaction($btn, faction) {
    if (this._currentPlane.faction !== faction) {
      return this._markFailure($btn);
    }

    $btn.css('background', 'green');
    setTimeout(() => this._setModelButtons(), 200);
  }

  _checkModel($btn, model) {
    if (this._currentPlane.model !== model) {
      return this._markFailure($btn);
    }
    this._markSuccess($btn);
  }

  _markFailure($btn) {
    this._score -= 1;
    $btn.css('background', 'red');
    setTimeout(() => this._nextPlane(), 200);
  }

  _markSuccess($btn) {
    this._score += 1;
    $btn.css('background', 'green');
    setTimeout(() => this._nextPlane(), 200);
  }

  _updateScore() {
    const $score = $('.plane > .score');
    $score.text(`Score: ${this._score}`);
  }
}

let game = new Game();

$(() => {
  game.start();
  $(window).on('resize', () => game.resizeImage());  
});
