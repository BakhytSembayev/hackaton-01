import { Module } from '../core/module';
import { randomNumber } from '../utils';
import boomGif from '../img/boom.gif';

import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';
import image4 from '../img/image4.png';
import image5 from '../img/image5.png';
import image6 from '../img/image6.png';
import image7 from '../img/image7.png';
import image8 from '../img/image8.png';
import image9 from '../img/image9.png';
import image10 from '../img/image10.png';
import image11 from '../img/image11.png';
import image12 from '../img/image12.png';

export class ShapeModule extends Module {
  constructor() {
    super('shape-module', 'Случайная фигура');
    this.images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12];
    this.lastUsedImages = [];
  }

  trigger() {
    let availableImages = this.images.filter(img => !this.lastUsedImages.includes(img));
    const randomImageIndex = randomNumber(0, availableImages.length - 1);
    const randomImage = availableImages[randomImageIndex];
    this.lastUsedImages.push(randomImage);
    if (this.lastUsedImages.length > 3) {
      this.lastUsedImages.shift();
    }

    const imageElement = new Image();
    imageElement.src = randomImage;
    imageElement.style.position = 'absolute';
    const size = randomNumber(50, 200);
    imageElement.style.width = `${size}px`;
    imageElement.style.height = `${size}px`;
    let positionX = randomNumber(0, window.innerWidth - size);
    let positionY = randomNumber(0, window.innerHeight - size);
    imageElement.style.left = `${positionX}px`;
    imageElement.style.top = `${positionY}px`;

    document.body.appendChild(imageElement);

    let velocityX = randomNumber(-2, 2);
    let velocityY = randomNumber(-2, 2);
    let isDragging = false;
    let isMoving = true;

    let dragStartX = 0;
    let dragStartY = 0;

    const setPosition = (x, y) => {
      imageElement.style.left = `${x}px`;
      imageElement.style.top = `${y}px`;
    };

    const dragStart = (e) => {
      isMoving = false;
      isDragging = true;
      dragStartX = e.clientX - imageElement.offsetLeft;
      dragStartY = e.clientY - imageElement.offsetTop;
      document.addEventListener('mousemove', dragging);
      document.addEventListener('mouseup', dragEnd);
    };

    const dragging = (e) => {
      if (isDragging) {
        positionX = e.clientX - dragStartX;
        positionY = e.clientY - dragStartY;
        setPosition(positionX, positionY);
      }
    };

    const dragEnd = () => {
      isDragging = false;
      document.removeEventListener('mousemove', dragging);
      document.removeEventListener('mouseup', dragEnd);
      positionX = parseInt(imageElement.style.left, 10);
      positionY = parseInt(imageElement.style.top, 10);
    };

    imageElement.addEventListener('mousedown', dragStart);
    imageElement.addEventListener('click', () => {
      if (!isDragging) {
        isMoving = !isMoving;
        if (isMoving) {
          requestAnimationFrame(animate);
        }
      }
    });

    const animate = () => {
      if (isMoving) {
        positionX += velocityX;
        positionY += velocityY;

        if (positionX <= 0 || positionX >= window.innerWidth - size) {
          velocityX = -velocityX;
        }
        if (positionY <= 0 || positionY >= window.innerHeight - size) {
          velocityY = -velocityY;
        }

        setPosition(positionX, positionY);
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    setTimeout(() => {
      imageElement.remove();
      const boomImage = new Image();
      boomImage.src = boomGif;
      boomImage.style.position = 'absolute';
      boomImage.style.left = `${positionX}px`;
      boomImage.style.top = `${positionY}px`;
      boomImage.style.width = `${size}px`;
      boomImage.style.height = `${size}px`;

      document.body.appendChild(boomImage);

      setTimeout(() => {
        boomImage.remove();
      }, 1000);
    }, 5000);
  }
}