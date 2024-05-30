interface ImageProps {
  onload: (() => void) | null;
  onerror: (() => void) | null;
  src: string;
  complete: boolean;
}

class Image implements ImageProps {
  onload: (() => void) | null;
  onerror: (() => void) | null;
  _src: string;
  complete: boolean;

  constructor() {
    this.onload = null;
    this.onerror = null;
    this._src = "";
    this.complete = false;
  }

  set src(url: string) {
    this._src = url;
    this.loadImage();
  }

  get src(): string {
    return this._src;
  }

  loadImage(): void {
    // Simulate loading the image asynchronously
    setTimeout(() => {
      // Simulate a successful image load
      this.complete = true;
      if (this.onload) {
        this.onload();
      }
    }, 10); // Simulating a delay of 1 second
  }
}

export default Image;
