/*
DRK Gravitación -- JS
Copyright (C) 2011 Leandro Fernandez

Visit https://www.drk.com.ar/
Buenos Aires, Argentina

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var renderer;
var camera;
var scene;
var particles;
var particleSystem;

var G = 6.67428;
var particleCount = 500;
var WIDTH = 600, HEIGHT = 420;
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
var random_v0 = true;

jQuery(document).ready(function($) {
    var $container = $('#container');
    
    // @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
    })();
    
    // create a WebGL renderer, camera and a scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene = new THREE.Scene();
    
    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;
    
    // start the renderer - set the clear colour
    // to a full black
    renderer.setClearColor(new THREE.Color(0, 1));
    renderer.setSize(WIDTH, HEIGHT);
    
    // attach the render-supplied DOM element
    $container.append(renderer.domElement);
    
    var pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/2011/11/particle_1.png"
          ),
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    // create the particle variables
    particles = new THREE.Geometry();
    
    // now create the individual particles
    for(var p = 0; p < particleCount; p++) {
      
      // La partícula 0 es el sol
      if (p == 0) {
        var particle = new THREE.Vertex(
          new THREE.Vector3(30, 30, 30)
        );
      
        particle.velocity = new THREE.Vector3(0, 0, 0);
        particle.mass = 50000;
      }
      else {
        var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vertex(
          new THREE.Vector3(pX, pY, pZ)
        );
      
        // create a velocity vector
        if (random_v0) {
          particle.velocity = new THREE.Vector3(
            Math.random()*20-10, // x
            Math.random()*20-10, // y: start with random vel
            Math.random()*5-2.5);// z
        }
        else {
          particle.velocity = new THREE.Vector3(
            0,  // x
            0,  // y: start with random vel
            0); // z
        }
        particle.mass = Math.random()*1000+1;
      }
      
      // add it to the geometry
      particles.vertices.push(particle);
    }
    
    // create the particle system
    particleSystem = new THREE.ParticleSystem(
      particles,
      pMaterial);
    
    particleSystem.sortParticles = true; 
    
    // add it to the scene
    scene.add(camera); 
    scene.add(particleSystem); 
    
    requestAnimFrame(update);
});

function update() {
  var pCount = particleCount;
  while(pCount--) {
    // get the particle
    var particle = particles.vertices[pCount];
    
    var nextC;
    for(nextC = pCount - 1; nextC >=0; --nextC) {
      var next = particles.vertices[nextC];
      if (next) {
        var f = G * particle.mass * next.mass / particle.position.distanceToSquared(next.position);
        var a = new THREE.Vector3(particle.position.x - next.position.x,
          particle.position.y - next.position.y, 
          particle.position.z - next.position.z);
        a = a.normalize();
        a = a.multiplyScalar(f/50000);
        particle.velocity.subSelf(a);
        next.velocity.addSelf(a);
      }
    }
    
    // and the position
    if (pCount)
      particle.position.addSelf(particle.velocity);
  }
  
  // flag to the particle system that we've
  // changed its vertices. This is the
  // dirty little secret.
  particleSystem.geometry.__dirtyVertices = true;
  
  renderer.render(scene, camera);
  
  // set up the next call
  requestAnimFrame(update);
}

