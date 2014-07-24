var topOfTheScreen = 150
var bottomOfTheScreen = window.innerHeight - 250
var yradius = Math.round((bottomOfTheScreen - topOfTheScreen) / 2)
var leftOfTheScreen = 100
var rightOfTheScreen = window.innerWidth - 100
var xradius = Math.round((rightOfTheScreen - leftOfTheScreen) / 2)
var middleOfTheScreen = new Point(window.innerWidth / 2, window.innerHeight / 2)
var radius = Math.min(xradius, yradius)

function Point(x, y) {
  this.x = x
  this.y = y
}

Point.onUnitCircle = function (rad) {
  return (new Point(1,1)).rotate(rad)
}

Point.prototype.rotate = function (rad) {
  var x = Math.cos(rad) * this.x - Math.sin(rad) * this.y
  var y = Math.sin(rad) * this.x + Math.cos(rad) * this.y
  this.x = x
  this.y = y
  console.log('r', rad, this)
  return this
}

Point.prototype.scale = function (factor) {
  this.x = factor * this.x
  this.y = factor * this.y
  return this
}

Point.prototype.translate = function (offset) {
  this.x = this.x + offset.x
  this.y = this.y + offset.y
  return this
}


var members = shuffle([].slice.call(document.querySelectorAll('#squa img')))
var arc = Math.PI*2 / members.length

members.forEach(function (squaMember, i) {
  squaMember.position = (i-1) * arc

  var imgCenterpoint = new Point(
      Math.round(squaMember.width / -2),
      Math.round(squaMember.height / -2)
    )
  var point = Point.onUnitCircle(squaMember.position)
    .rotate(-Math.PI/2)
    .scale(radius)
    .translate(middleOfTheScreen)
    .translate(imgCenterpoint)

  squaMember.style.left = point.x + 'px'
  squaMember.style.top = point.y + 'px'
})

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};